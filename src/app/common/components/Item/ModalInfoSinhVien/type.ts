import { SinhVienProps } from '@features/LopTinChi/component/ThongTinChung/type';

export interface ItemProps {
  isLast: boolean;
  item: { label: string; value: string };
}

export interface ModalProps {
  dataSinhVien: any | null;
  isVisible: boolean;
  closeButton: () => void;
}
