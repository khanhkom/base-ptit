/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Props {
  error?: string;
  isRequired?: boolean;
  label: string;
  placeholder?: string;
  type: 'year' | 'month' | 'date';
  format: 'YYYY' | 'MM/YYYY' | 'DD/MM/YYYY';
  minDate?: any;
  maxDate?: any;
  defaultValue?: string | undefined;
  onChangeValue: (props: string | Date) => void;
}
