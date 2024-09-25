/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ItemProps {
  isLast: boolean;
  item: { label: string; value: string };
}

export interface ModalProps {
  data: any;
  isVisible: boolean;
  closeButton: () => void;
  onPress?: () => void;
}