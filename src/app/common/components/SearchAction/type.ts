export const TYPE_MESSAGE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARN: 'warn',
  LINK: 'link',
} as const;

export type TypeMessage = (typeof TYPE_MESSAGE)[keyof typeof TYPE_MESSAGE];

export type Item = {
  id: string;
  msg: string;
  type: TypeMessage;
  interval: number;
};

export interface SnackBarItemProps {
  defaultValue?: string;
  placeholder?: string;
  visible?: boolean;
  item?: Item;
  onPop?: (item: Item) => void;
  onClose?: () => void;
  onCancel?: () => void;
  onChangeValue: (value: string) => void;
}

export type DataShowMessage = {
  msg: string;
  type: TypeMessage;
  interval?: number;
};
