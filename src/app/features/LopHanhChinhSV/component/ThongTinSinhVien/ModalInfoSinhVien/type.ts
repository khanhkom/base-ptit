import { SinhVienLHCProps } from '@features/LopHanhChinhSV/ThongTinChungSV/type';

export interface ItemProps {
  isLast: boolean;
  item: { label: string; value: string };
}

export interface ModalProps {
  dataSinhVien: SinhVienLHCProps | null;
  isVisible: boolean;
  closeButton: () => void;
}
