/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ItemProps {
  isLast: boolean;
  item: { label: string; value: string };
}

export interface ModalProps {
  onPress?: () => void;
  itemData: any;
  isVisible: boolean;
  closeButton: () => void;
  hinhThucDanhGia?: any[];
  chuyenNganh?: string | undefined;
}
