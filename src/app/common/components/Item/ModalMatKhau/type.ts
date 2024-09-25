export interface ItemProps {
  isLast: boolean;
  item: { label: string; value: string };
}

export interface ModalProps {
  isVisible: boolean;
  closeButton: () => void;
  onPassWord?: (e: string) => void;
}
