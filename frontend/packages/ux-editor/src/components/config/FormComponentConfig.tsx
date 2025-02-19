import React from 'react';
import { Alert, Heading, Paragraph } from '@digdir/design-system-react';
import type { FormComponent } from '../../types/FormComponent';
import { EditBooleanValue } from './editModal/EditBooleanValue';
import { EditNumberValue } from './editModal/EditNumberValue';
import { EditStringValue } from './editModal/EditStringValue';
import { useText } from '../../hooks';
import { getUnsupportedPropertyTypes } from '../../utils/component';
import { EditGrid } from './editModal/EditGrid';
import { useComponentPropertyLabel } from '../../hooks/useComponentPropertyLabel';

export interface IEditFormComponentProps {
  editFormId: string;
  component: FormComponent;
  handleComponentUpdate: (component: FormComponent) => void;
}

export interface FormComponentConfigProps extends IEditFormComponentProps {
  schema: any;
  hideUnsupported?: boolean;
}
export const FormComponentConfig = ({
  schema,
  editFormId,
  component,
  handleComponentUpdate,
  hideUnsupported,
}: FormComponentConfigProps) => {
  const t = useText();
  const componentPropertyLabel = useComponentPropertyLabel();

  if (!schema?.properties) return null;

  const {
    dataModelBindings,
    required,
    readOnly,
    id,
    textResourceBindings,
    type,
    options,
    optionsId,
    hasCustomFileEndings,
    validFileEndings,
    children,
    grid,
    ...rest
  } = schema.properties;

  // children property is not supported in component config - it should be part of container config.
  const unsupportedPropertyKeys: string[] = getUnsupportedPropertyTypes(
    rest,
    children ? ['children'] : undefined,
  );
  return (
    <>
      {grid && (
        <div>
          <Heading level={3} size='xxsmall'>
            {t('ux_editor.component_properties.grid')}
          </Heading>
          <EditGrid
            key={component.id}
            component={component}
            handleComponentChange={handleComponentUpdate}
          />
        </div>
      )}
      {!hideUnsupported && (
        <Heading level={3} size='xxsmall'>
          {'Andre innstillinger'}
        </Heading>
      )}

      {hasCustomFileEndings && (
        <>
          <EditBooleanValue
            propertyKey='hasCustomFileEndings'
            helpText={hasCustomFileEndings.description}
            component={component}
            handleComponentChange={(updatedComponent: FormComponent) => {
              if (!updatedComponent.hasCustomFileEndings) {
                handleComponentUpdate({
                  ...updatedComponent,
                  validFileEndings: undefined,
                });
                return;
              }
              handleComponentUpdate(updatedComponent);
            }}
          />
          {component['hasCustomFileEndings'] && (
            <EditStringValue
              component={component}
              handleComponentChange={handleComponentUpdate}
              propertyKey='validFileEndings'
              helpText={validFileEndings?.description}
            />
          )}
        </>
      )}

      {readOnly && (
        <EditBooleanValue
          propertyKey='readOnly'
          helpText={readOnly.description}
          component={component}
          handleComponentChange={handleComponentUpdate}
        />
      )}
      {required && (
        <EditBooleanValue
          propertyKey='required'
          helpText={required.description}
          component={component}
          handleComponentChange={handleComponentUpdate}
        />
      )}

      {Object.keys(rest).map((propertyKey) => {
        if (!rest[propertyKey]) return null;
        if (
          rest[propertyKey].type === 'boolean' ||
          rest[propertyKey].$ref?.endsWith('layout/expression.schema.v1.json#/definitions/boolean')
        ) {
          return (
            <EditBooleanValue
              component={component}
              handleComponentChange={handleComponentUpdate}
              propertyKey={propertyKey}
              key={propertyKey}
              helpText={rest[propertyKey]?.description}
            />
          );
        }
        if (rest[propertyKey].type === 'number' || rest[propertyKey].type === 'integer') {
          return (
            <EditNumberValue
              component={component}
              handleComponentChange={handleComponentUpdate}
              propertyKey={propertyKey}
              key={propertyKey}
              helpText={rest[propertyKey]?.description}
            />
          );
        }
        if (rest[propertyKey].type === 'string') {
          return (
            <EditStringValue
              component={component}
              handleComponentChange={handleComponentUpdate}
              propertyKey={propertyKey}
              key={propertyKey}
              helpText={rest[propertyKey]?.description}
              enumValues={rest[propertyKey]?.enum}
            />
          );
        }
        if (rest[propertyKey].type === 'array' && rest[propertyKey].items?.type === 'string') {
          return (
            <EditStringValue
              component={component}
              handleComponentChange={handleComponentUpdate}
              propertyKey={propertyKey}
              key={propertyKey}
              helpText={rest[propertyKey]?.description}
              enumValues={rest[propertyKey]?.items?.enum}
              multiple={true}
            />
          );
        }
        if (rest[propertyKey].type === 'object' && rest[propertyKey].properties) {
          return (
            <React.Fragment key={propertyKey}>
              <Heading level={3} size='xxsmall'>
                {componentPropertyLabel(propertyKey)}
              </Heading>
              {rest[propertyKey]?.description && (
                <Paragraph size='small'>{rest[propertyKey].description}</Paragraph>
              )}
              <FormComponentConfig
                key={propertyKey}
                schema={rest[propertyKey]}
                component={component[propertyKey] || {}}
                handleComponentUpdate={(updatedComponent: FormComponent) => {
                  handleComponentUpdate({
                    ...component,
                    [propertyKey]: updatedComponent,
                  });
                }}
                editFormId={editFormId}
                hideUnsupported
              />
            </React.Fragment>
          );
        }
        return null;
      })}
      {/* Show information about unsupported properties if there are any */}
      {unsupportedPropertyKeys.length > 0 && !hideUnsupported && (
        <Alert severity='info'>
          {t('ux_editor.edit_component.unsupported_properties_message')}
          <ul>
            {unsupportedPropertyKeys.length > 0 &&
              unsupportedPropertyKeys.map((propertyKey) => (
                <li key={propertyKey}>{propertyKey}</li>
              ))}
          </ul>
        </Alert>
      )}
    </>
  );
};
