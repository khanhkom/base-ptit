/* eslint-disable @typescript-eslint/no-explicit-any */
import { Colors } from '@theme';

export interface HelperTextProps {
  /**
   * Show text or not
   * @default false
   */
  visible: boolean;

  /**
   * Type of helper text
   */
  type: 'info' | 'error';

  /**
   * Text for text component
   */
  msg: string;

  /**
   * Overwrite color error with theme
   * @default undefined
   */
  colorThemeError?: keyof Colors;

  /**
   * Overwrite color info with theme
   * @default undefined
   */
  colorThemeInfo?: keyof Colors;
}

export interface ELementInput {
  subType?: string;
  min?: number;
  isLast?: boolean;
  max?: number;
  width?: number;
  minDate?: Date;
  maxDate?: Date;
  descriptionText?: string;
  disabled?: boolean;
  numColumns?: number;
  note?: string;
  level?: number;
  fileType: string[];
  isRequired: boolean;
  label: string;
  type: string;
  _id: string;
  dataSource: ELementInput[];
  relatedElement: ELementInput[];
  value?: any;
  hideNotice?: boolean;
  fileTypeAllow?: Array<string>;
  dataFile?: Array<[any]>;
  errorContent?: string;
  position?: ['auto', 'top', 'bottom'];
  tableHeader?: string[];
}

export interface Props {
  idPhuongThucKhenThuong?: string;
  placeholder?: string;
  onChange: (value: any) => void;
  pickerData: string[];
  dataSourceElement: Array<Array<ELementInput>>;
  relatedElement: Array<Array<ELementInput>>;
  disabled?: boolean;
  defaultValue: any;
  errors?: any;
  itemData: ELementInput;
  ref?: any;
  onBlur?: () => void;
  onFocus?: () => void;
  control?: any;
  unregister?: any;
  valueChuongSach?: any[];
}
