import React from 'react';
import { useSelector } from 'react-redux';
import { TextResource } from '../../TextResource';
import type { TranslationKey } from 'language/type';
import type { IAppState } from '../../../types/global';
import { useTranslation } from 'react-i18next';
import type { EditTextResourceBindingBase } from './EditTextResourceBindings';

export interface EditTextResourceBindingProps extends EditTextResourceBindingBase {
  textKey: string;
  labelKey: TranslationKey;
  descriptionKey?: TranslationKey;
  placeholderKey?: TranslationKey;
  removeTextResourceBinding?: () => void;
}

export const EditTextResourceBinding = ({
  component,
  handleComponentChange,
  removeTextResourceBinding,
  textKey,
  labelKey,
  descriptionKey,
  placeholderKey,
}: EditTextResourceBindingProps) => {
  const { t } = useTranslation();
  const selectedLayout = useSelector(
    (state: IAppState) => state.formDesigner?.layout?.selectedLayout,
  );

  const handleTextResourceChange = (value: string) =>
    handleComponentChange({
      ...component,
      textResourceBindings: {
        ...component.textResourceBindings,
        [textKey]: value,
      },
    });

  const handleRemoveTextResourceBinding = () => {
    const componentCopy = { ...component };
    delete componentCopy.textResourceBindings?.[textKey];
    handleComponentChange(componentCopy);
    removeTextResourceBinding?.();
  };
  return (
    <TextResource
      handleIdChange={handleTextResourceChange}
      handleRemoveTextResource={handleRemoveTextResourceBinding}
      label={t(labelKey)}
      description={t(descriptionKey)}
      placeholder={t(placeholderKey)}
      textResourceId={
        component.textResourceBindings ? component.textResourceBindings[textKey] : undefined
      }
      generateIdOptions={{
        componentId: component.id,
        layoutId: selectedLayout,
        textResourceKey: textKey,
      }}
    />
  );
};
