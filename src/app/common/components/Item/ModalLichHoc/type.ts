/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ItemProps {
  isLast: boolean;
  item: { label: string; value: string };
  valueLong?: boolean;
}

export interface ModalProps {
  onPress?: () => void;
  itemData: any;
  isVisible: boolean;
  closeButton: () => void;
  onPressEdit?: () => void;
  giangVien?: boolean;
  visibleButtonLT?: boolean;
}
