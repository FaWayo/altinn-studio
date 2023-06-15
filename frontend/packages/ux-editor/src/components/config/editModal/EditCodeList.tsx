import React, { useState } from 'react';
import { Select, TextField } from '@digdir/design-system-react';
import { IGenericEditComponent } from '../componentConfig';
import { useOptionListIdsQuery } from '../../../hooks/queries/useOptionListIdsQuery';
import { useParams } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { AltinnSpinner } from 'app-shared/components';
import { ErrorMessage, Button, ButtonVariant } from '@digdir/design-system-react';
import { altinnDocsUrl } from 'app-shared/ext-urls';

export function EditCodeList({ component, handleComponentChange }: IGenericEditComponent) {
  const { t } = useTranslation();
  const { org, app } = useParams();

  const { data: optionListIds, isLoading, isError, error } = useOptionListIdsQuery(org, app);
  const [useCustomCodeList, setUseCustomCodeList] = useState<boolean>(optionListIds.length === 0);
  const handleOptionsIdChange = (optionsId: string) => {
    handleComponentChange({
      ...component,
      optionsId,
    });
  };

  return (
    <div>
      {isLoading ? (
        <AltinnSpinner/>
      ) : isError ? (
        <ErrorMessage>
          {error instanceof Error ? error.message : t('ux_editor.modal_properties_error_message')}
        </ErrorMessage>
      ) : optionListIds.length === 0 ? (
        <ErrorMessage>
          {t('ux_editor.modal_properties_no_options_found_message')}
        </ErrorMessage>
      ) : (
        <>
          <p>
            <Button variant={ButtonVariant.Quiet} onClick={() => setUseCustomCodeList(!useCustomCodeList)}>
              {optionListIds.length > 0 && useCustomCodeList && <>Bytt til statisk kodeliste</>}
              {!useCustomCodeList && <>Bytt til egendefinert kodeliste</>}
            </Button>
          </p>
          {!useCustomCodeList &&
            <Select
              options={optionListIds.map((option) => ({
                label: option,
                value: option,
              }))}
              label={t('ux_editor.modal_properties_code_list_id')}
              onChange={handleOptionsIdChange}
              value={component.optionsId}
            />}
        </>
      )}
      {<>
        {useCustomCodeList &&
          <TextField
            displayType="input"
            label={t('ux_editor.modal_properties_custom_code_list_id')}
            onChange={event => handleOptionsIdChange(event.target.value)}
            value={component.optionsId}
          />
        }
      </>
      }
      <p>
        <Trans i18nKey={'ux_editor.modal_properties_code_list_read_more'}>
          <a
            href={altinnDocsUrl('app/development/data/options/')}
            target='_newTab'
            rel='noopener noreferrer'
          />
        </Trans>
      </p>
    </div>
  );
}
