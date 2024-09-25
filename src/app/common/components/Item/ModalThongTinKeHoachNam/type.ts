import { KeHoachNamProps } from '@features/KeHoachHoatDong/KeHoachNam/type';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ItemProps {
  isLast: boolean;
  item: { label: string; value: string };
}

export interface ModalProps {
  account?: any;
  data: KeHoachNamProps | undefined;
  isVisible: boolean;
  closeButton: () => void;
  onPress?: () => void;
}
