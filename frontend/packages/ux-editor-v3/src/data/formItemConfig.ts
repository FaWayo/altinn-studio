import { ComponentType } from 'app-shared/types/ComponentType';
import type { FormItem } from '../types/FormItem';
import { FormPanelVariant } from 'app-shared/types/FormPanelVariant';
import type { RefAttributes, SVGProps } from 'react';
import type React from 'react';
import ActionButtonSchema from '../testing/schemas/json/component/ActionButton.schema.v1.json';
import {
  AccordionIcon,
  CalendarIcon,
  CheckboxIcon,
  ChevronDownDoubleIcon,
  ExclamationmarkTriangleIcon,
  FileTextIcon,
  FingerButtonIcon,
  GroupIcon,
  HouseIcon,
  ImageIcon,
  InformationSquareIcon,
  LikertIcon,
  LinkIcon,
  LongTextIcon,
  NavBarIcon,
  PaperclipIcon,
  ParagraphIcon,
  PinIcon,
  PresentationIcon,
  RadioButtonIcon,
  SelectIcon,
  ShortTextIcon,
  TableIcon,
  TasklistIcon,
  TitleIcon,
} from '@studio/icons';
import type { ContainerComponentType } from '../types/ContainerComponent';
import { LayoutItemType } from '../types/global';

export type FormItemConfig<T extends ComponentType = ComponentType> = {
  name: T;
  itemType: LayoutItemType;
  defaultProperties: FormItem<T>;
  icon?: React.ComponentType<SVGProps<SVGSVGElement> & { title?: string; titleId?: string }> &
    RefAttributes<SVGSVGElement>;
} & (T extends ContainerComponentType ? { validChildTypes: ComponentType[] } : {});

export type FormItemConfigs = { [T in ComponentType]: FormItemConfig<T> };

export const formItemConfigs: FormItemConfigs = {
  [ComponentType.Alert]: {
    name: ComponentType.Alert,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Alert,
      severity: 'info',
      propertyPath: 'definitions/alertComponent',
    },
    icon: ExclamationmarkTriangleIcon,
  },
  [ComponentType.Accordion]: {
    name: ComponentType.Accordion,
    itemType: LayoutItemType.Container,
    defaultProperties: {
      id: '',
      itemType: 'CONTAINER',
      type: ComponentType.Accordion,
      propertyPath: 'definitions/accordionComponent',
    },
    icon: AccordionIcon,
    validChildTypes: [ComponentType.Paragraph],
  },
  [ComponentType.AccordionGroup]: {
    name: ComponentType.AccordionGroup,
    itemType: LayoutItemType.Container,
    defaultProperties: {
      id: '',
      itemType: 'CONTAINER',
      type: ComponentType.AccordionGroup,
      propertyPath: 'definitions/accordionGroupComponent',
    },
    icon: ChevronDownDoubleIcon,
    validChildTypes: [ComponentType.Accordion],
  },
  [ComponentType.ActionButton]: {
    name: ComponentType.ActionButton,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.ActionButton,
      textResourceBindings: {
        title: '', // To avoid undefined as text when previewing default component
      },
      buttonStyle: ActionButtonSchema.properties.buttonStyle.enum[0], // To avoid rendering error in app-frontend when previewing default component
    },
    icon: FingerButtonIcon,
  },
  [ComponentType.AddressComponent]: {
    name: ComponentType.AddressComponent,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.AddressComponent,
      dataModelBindings: {},
      simplified: true,
      propertyPath: 'definitions/addressComponent',
    },
    icon: HouseIcon,
  },
  [ComponentType.AttachmentList]: {
    name: ComponentType.AttachmentList,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.AttachmentList,
      maxNumberOfAttachments: 1,
      minNumberOfAttachments: 0,
      propertyPath: 'definitions/attachmentListComponent',
    },
    icon: PaperclipIcon,
  },
  [ComponentType.Button]: {
    name: ComponentType.Button,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Button,
      onClickAction: () => {},
      propertyPath: 'definitions/actionButtonComponent',
    },
    icon: FingerButtonIcon,
  },
  [ComponentType.ButtonGroup]: {
    name: ComponentType.ButtonGroup,
    itemType: LayoutItemType.Container,
    defaultProperties: {
      id: '',
      itemType: 'CONTAINER',
      type: ComponentType.ButtonGroup,
      propertyPath: 'definitions/buttonGroupComponent',
    },
    icon: FingerButtonIcon,
    validChildTypes: [ComponentType.Button],
  },
  [ComponentType.Checkboxes]: {
    name: ComponentType.Checkboxes,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Checkboxes,
      dataModelBindings: {},
      required: true,
      propertyPath: 'definitions/radioAndCheckboxComponents',
    },
    icon: CheckboxIcon,
  },
  [ComponentType.Custom]: {
    name: ComponentType.Custom,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Custom,
      tagName: 'tag',
      framework: 'framework',
    },
  },
  [ComponentType.Datepicker]: {
    name: ComponentType.Datepicker,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      dataModelBindings: {},
      type: ComponentType.Datepicker,
      minDate: '1900-01-01T12:00:00.000Z',
      maxDate: '2100-01-01T12:00:00.000Z',
      timeStamp: false,
      required: true,
      propertyPath: 'definitions/datepickerComponent',
    },
    icon: CalendarIcon,
  },
  [ComponentType.Dropdown]: {
    name: ComponentType.Dropdown,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Dropdown,
      dataModelBindings: {},
      optionsId: '',
      required: true,
      propertyPath: 'definitions/selectionComponents',
    },
    icon: SelectIcon,
  },
  [ComponentType.FileUpload]: {
    name: ComponentType.FileUpload,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.FileUpload,
      description: '',
      displayMode: 'list',
      hasCustomFileEndings: false,
      maxFileSizeInMB: 25,
      maxNumberOfAttachments: 1,
      minNumberOfAttachments: 1,
      propertyPath: 'definitions/fileUploadComponent',
    },
    icon: PaperclipIcon,
  },
  [ComponentType.FileUploadWithTag]: {
    name: ComponentType.FileUploadWithTag,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.FileUploadWithTag,
      description: '',
      displayMode: 'list',
      hasCustomFileEndings: false,
      maxFileSizeInMB: 25,
      maxNumberOfAttachments: 1,
      minNumberOfAttachments: 1,
      optionsId: '',
      propertyPath: 'definitions/fileUploadWithTagComponent',
    },
    icon: PaperclipIcon,
  },
  [ComponentType.Grid]: {
    name: ComponentType.Grid,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Grid,
      propertyPath: 'definitions/gridComponent',
      rows: [],
    },
    icon: TableIcon,
  },
  [ComponentType.Group]: {
    name: ComponentType.Group,
    itemType: LayoutItemType.Container,
    defaultProperties: {
      id: '',
      itemType: 'CONTAINER',
      type: ComponentType.Group,
      propertyPath: 'definitions/groupComponent',
    },
    icon: GroupIcon,
    validChildTypes: Object.values(ComponentType),
  },
  [ComponentType.Header]: {
    name: ComponentType.Header,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Header,
      size: 'L',
      propertyPath: 'definitions/headerComponent',
    },
    icon: TitleIcon,
  },
  [ComponentType.IFrame]: {
    name: ComponentType.IFrame,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.IFrame,
      sandbox: {},
    },
    icon: PresentationIcon,
  },
  [ComponentType.Image]: {
    name: ComponentType.Image,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Image,
      image: {
        src: {},
        width: '100%',
        align: 'center',
      },
      propertyPath: 'definitions/imageComponent',
    },
    icon: ImageIcon,
  },
  [ComponentType.Input]: {
    name: ComponentType.Input,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Input,
      dataModelBindings: {},
      required: true,
      propertyPath: 'definitions/inputComponent',
    },
    icon: ShortTextIcon,
  },
  [ComponentType.InstanceInformation]: {
    name: ComponentType.InstanceInformation,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.InstanceInformation,
      propertyPath: 'definitions/instanceInformationComponent',
    },
    icon: InformationSquareIcon,
  },
  [ComponentType.InstantiationButton]: {
    name: ComponentType.InstantiationButton,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.InstantiationButton,
    },
    icon: FingerButtonIcon,
  },
  [ComponentType.Likert]: {
    name: ComponentType.Likert,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Likert,
      dataModelBindings: {},
      propertyPath: 'definitions/radioAndCheckboxComponents',
    },
    icon: LikertIcon,
  },
  [ComponentType.Link]: {
    name: ComponentType.Link,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Link,
    },
    icon: LinkIcon,
  },
  [ComponentType.List]: {
    name: ComponentType.List,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.List,
      propertyPath: 'definitions/listComponent',
    },
    icon: TasklistIcon,
  },
  [ComponentType.Map]: {
    name: ComponentType.Map,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Map,
      dataModelBindings: {},
      centerLocation: {
        latitude: 0,
        longitude: 0,
      },
      zoom: 1,
      required: true,
      propertyPath: 'definitions/mapComponent',
    },
    icon: PinIcon,
  },
  [ComponentType.MultipleSelect]: {
    name: ComponentType.MultipleSelect,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.MultipleSelect,
      dataModelBindings: {},
      optionsId: '',
      required: true,
      propertyPath: 'definitions/selectionComponents',
    },
    icon: SelectIcon,
  },
  [ComponentType.NavigationBar]: {
    name: ComponentType.NavigationBar,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.NavigationBar,
      propertyPath: 'definitions/navigationBarComponent',
    },
    icon: NavBarIcon,
  },
  [ComponentType.NavigationButtons]: {
    name: ComponentType.NavigationButtons,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.NavigationButtons,
      onClickAction: () => {},
      propertyPath: 'definitions/navigationButtonsComponent',
    },
    icon: FingerButtonIcon,
  },
  [ComponentType.Panel]: {
    name: ComponentType.Panel,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Panel,
      variant: FormPanelVariant.Info,
      showIcon: true,
      propertyPath: 'definitions/panelComponent',
    },
    icon: FileTextIcon,
  },
  [ComponentType.Paragraph]: {
    name: ComponentType.Paragraph,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Paragraph,
    },
    icon: ParagraphIcon,
  },
  [ComponentType.PrintButton]: {
    name: ComponentType.PrintButton,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.PrintButton,
    },
    icon: FingerButtonIcon,
  },
  [ComponentType.RadioButtons]: {
    name: ComponentType.RadioButtons,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.RadioButtons,
      dataModelBindings: {},
      required: true,
      propertyPath: 'definitions/radioAndCheckboxComponents',
    },
    icon: RadioButtonIcon,
  },
  [ComponentType.Summary]: {
    name: ComponentType.Summary,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.Summary,
      propertyPath: 'definitions/summaryComponent',
    },
    icon: FileTextIcon,
  },
  [ComponentType.TextArea]: {
    name: ComponentType.TextArea,
    itemType: LayoutItemType.Component,
    defaultProperties: {
      id: '',
      itemType: 'COMPONENT',
      type: ComponentType.TextArea,
      dataModelBindings: {},
      required: true,
      propertyPath: 'definitions/textAreaComponent',
    },
    icon: LongTextIcon,
  },
};

export const advancedItems: FormItemConfigs[ComponentType][] = [
  formItemConfigs[ComponentType.AddressComponent],
  formItemConfigs[ComponentType.AttachmentList],
  formItemConfigs[ComponentType.Group],
  formItemConfigs[ComponentType.Grid],
  formItemConfigs[ComponentType.NavigationBar],
  formItemConfigs[ComponentType.Map],
  formItemConfigs[ComponentType.ButtonGroup],
  formItemConfigs[ComponentType.Accordion],
  formItemConfigs[ComponentType.AccordionGroup],
  formItemConfigs[ComponentType.List],
];

export const schemaComponents: FormItemConfigs[ComponentType][] = [
  formItemConfigs[ComponentType.Input],
  formItemConfigs[ComponentType.TextArea],
  formItemConfigs[ComponentType.Checkboxes],
  formItemConfigs[ComponentType.RadioButtons],
  formItemConfigs[ComponentType.Dropdown],
  formItemConfigs[ComponentType.MultipleSelect],
  formItemConfigs[ComponentType.Likert],
  formItemConfigs[ComponentType.Datepicker],
  formItemConfigs[ComponentType.FileUpload],
  formItemConfigs[ComponentType.FileUploadWithTag],
  formItemConfigs[ComponentType.Button],
  formItemConfigs[ComponentType.NavigationButtons],
  formItemConfigs[ComponentType.PrintButton],
  formItemConfigs[ComponentType.InstantiationButton],
  formItemConfigs[ComponentType.ActionButton],
  formItemConfigs[ComponentType.Image],
  formItemConfigs[ComponentType.Link],
  formItemConfigs[ComponentType.IFrame],
  formItemConfigs[ComponentType.InstanceInformation],
  formItemConfigs[ComponentType.Summary],
];

export const textComponents: FormItemConfigs[ComponentType][] = [
  formItemConfigs[ComponentType.Header],
  formItemConfigs[ComponentType.Paragraph],
  formItemConfigs[ComponentType.Panel],
  formItemConfigs[ComponentType.Alert],
];

export const confOnScreenComponents: FormItemConfigs[ComponentType][] = [
  formItemConfigs[ComponentType.Header],
  formItemConfigs[ComponentType.Paragraph],
  formItemConfigs[ComponentType.AttachmentList],
  formItemConfigs[ComponentType.Image],
];
