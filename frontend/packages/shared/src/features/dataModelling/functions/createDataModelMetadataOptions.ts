import type { IDataModelMetadataItem } from '../sagas/metadata';
import type { GroupedOption } from '../components/SchemaSelect';
import type { IMetadataOption } from './types';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app-development/store';

export const createDataModelMetadataOptions = createSelector
(
  (state: RootState) => state.dataModelsMetadataState.dataModelsMetadata,
  (dataModelsMetadata: IDataModelMetadataItem[]): GroupedOption[] => {
  if (!dataModelsMetadata?.length) {
    return makeGroupedOptions({ jsonOptions: [], xsdOptions: [] });
  }

  const jsonOptions = mapModelsMetadataToOptions(
    dataModelsMetadata.filter((option) => option.fileType === '.json')
  );
  const xsdOptions = mapModelsMetadataToOptions(
    dataModelsMetadata.filter((option) => option.fileType === '.xsd')
  );
  return makeGroupedOptions({ jsonOptions, xsdOptions });
});

const mapModelsMetadataToOptions = (metadata: IDataModelMetadataItem[]): IMetadataOption[] => {
  if (!metadata?.length) {
    return [];
  }

  return metadata.flatMap((value: IDataModelMetadataItem) => {
    let label;
    if (value?.fileType === '.xsd') {
      label = `${value.fileName?.split('.xsd')[0]}  (XSD)`;
    } else {
      label = value?.fileName?.split('.schema')[0];
    }
    return label ? [{ value, label }] : [];
  });
};

const makeGroupedOptions = ({
  jsonOptions,
  xsdOptions,
}: {
  jsonOptions: IMetadataOption[];
  xsdOptions: IMetadataOption[];
}): GroupedOption[] => {
  return [
    {
      label: 'JSONSchema',
      options: jsonOptions,
    },
    {
      label: 'XSD',
      options: xsdOptions,
    },
  ];
};
