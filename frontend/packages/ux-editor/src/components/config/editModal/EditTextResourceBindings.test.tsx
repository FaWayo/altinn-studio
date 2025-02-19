import React from 'react';
import type { EditTextResourceBindingsProps } from './EditTextResourceBindings';
import { EditTextResourceBindings } from './EditTextResourceBindings';
import { screen, waitFor } from '@testing-library/react';
import {
  renderHookWithMockStore,
  renderWithMockStore,
  textLanguagesMock,
} from '../../../testing/mocks';
import { useLayoutSchemaQuery } from '../../../hooks/queries/useLayoutSchemaQuery';
import type { ITextResource } from 'app-shared/types/global';
import { textMock } from '../../../../../../testing/mocks/i18nMock';
import { ComponentType } from 'app-shared/types/ComponentType';
import type { ITextResourcesWithLanguage } from 'app-shared/types/global';
import { useTextResourcesQuery } from 'app-shared/hooks/queries/useTextResourcesQuery';
import type { FormComponent } from '../../../types/FormComponent';

// Test data:
const org = 'org';
const app = 'app';

describe('EditTextResourceBindings component', () => {
  const mockComponent: FormComponent = {
    id: 'test-id',
    textResourceBindings: {
      title: 'test-title-text-id',
      description: 'test-desc-text-id',
      help: 'test-help-text-id',
    },
    type: ComponentType.Input,
    itemType: 'COMPONENT',
    dataModelBindings: {},
  };

  const textResources: ITextResource[] = [
    {
      id: 'test-title-text-id',
      value: 'This is a test title',
    },
    {
      id: 'test-desc-text-id',
      value: 'This is a test description ',
    },
    {
      id: 'test-help-text-id',
      value: 'This is a test help text',
    },
  ];

  test('that it renders with expected text resource binding keys', async () => {
    const textResourceBindingKeys = ['title', 'description', 'help'];
    await renderEditTextResourceBindingsComponent({ textResourceBindingKeys });

    textResourceBindingKeys.forEach((key) => {
      expect(
        screen.getByText(textMock(`ux_editor.modal_properties_textResourceBindings_${key}`)),
      ).toBeInTheDocument();
    });

    const labelText = screen.getByText('This is a test title');
    expect(labelText).toBeInTheDocument();
    const descText = screen.getByText('This is a test description');
    expect(descText).toBeInTheDocument();
    const helpText = screen.getByText('This is a test help text');
    expect(helpText).toBeInTheDocument();
  });

  test('that it renders no text resource bindings if no keys are provided', async () => {
    await renderEditTextResourceBindingsComponent({
      textResourceBindingKeys: [],
      component: { ...mockComponent, textResourceBindings: {} },
    });
    expect(
      screen.queryByText(textMock('ux_editor.modal_properties_textResourceBindings_title')),
    ).not.toBeInTheDocument();
    const searchTextButton = screen.queryByRole('button', { name: textMock('general.search') });
    expect(searchTextButton).not.toBeInTheDocument();
  });

  test('that it renders empty text resource bindings if component has no text resource bindings', async () => {
    const textResourceBindingKeys = ['title', 'description', 'help'];
    await renderEditTextResourceBindingsComponent({
      textResourceBindingKeys,
      component: { ...mockComponent, textResourceBindings: {} },
    });

    textResourceBindingKeys.forEach((key) => {
      expect(
        screen.getByText(textMock(`ux_editor.modal_properties_textResourceBindings_${key}_add`)),
      ).toBeInTheDocument();
    });
  });

  const waitForData = async () => {
    const layoutSchemaResult = renderHookWithMockStore()(() => useLayoutSchemaQuery())
      .renderHookResult.result;
    const { result } = renderHookWithMockStore(
      {},
      {
        getTextLanguages: jest.fn().mockImplementation(() => Promise.resolve(textLanguagesMock)),
        getTextResources: (_o, _a, lang) =>
          Promise.resolve<ITextResourcesWithLanguage>({
            language: lang,
            resources: textResources,
          }),
      },
    )(() => useTextResourcesQuery(org, app)).renderHookResult;
    await waitFor(() => expect(layoutSchemaResult.current[0].isSuccess).toBe(true));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  };

  const renderEditTextResourceBindingsComponent = async ({
    component = mockComponent,
    handleComponentChange = () => {},
    textResourceBindingKeys = [],
  }: Partial<EditTextResourceBindingsProps>) => {
    await waitForData();

    return renderWithMockStore()(
      <EditTextResourceBindings
        component={component}
        handleComponentChange={handleComponentChange}
        textResourceBindingKeys={textResourceBindingKeys}
      />,
    );
  };
});
