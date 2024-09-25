/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { useForm } from 'react-hook-form';

import R from '@assets/R';
import { popupCancel, popupOk, TCNS_TYPE, WIDTH } from '@common';
import DynamicForm from '@components/DynamicForm';
import BaseButton from '@components/Popup/BaseButton';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  delDBLuong,
  delDBPhuCap,
  delDoiTuongChinhSach,
  delHocHam,
  delKhenThuong,
  delKyLuat,
  delLyLuanChinhTri,
  delQuanHeGiaDinh,
  delQuanHeVoChong,
  delQuanLyHanhChinh,
  delQuanLyNhaNuoc,
  delQuaTrinhCongTac,
  delQuaTrinhCuDiCongTac,
  delQuaTrinhCuDiDaoTao,
  delQuocPhong,
  delSangKien,
  delThongTinHopDong,
  delTinHoc,
  delTrinhDoDaoTao,
  delViTriChucDanh,
  postDBLuong,
  postDBPhuCap,
  postDoiTuongChinhSach,
  postHocHam,
  postKhenThuong,
  postKyLuat,
  postLyLuanChinhTri,
  postQuanHeGiaDinh,
  postQuanHeVoChong,
  postQuanLyHanhChinh,
  postQuanLyNhaNuoc,
  postQuaTrinhCongTac,
  postQuaTrinhCuDiCongTac,
  postQuaTrinhCuDiDaoTao,
  postQuocPhong,
  postSangKien,
  postThongTinHopDong,
  postTinHoc,
  postTrinhDoDaoTao,
  postViTriChucDanh,
  putDBLuong,
  putDBPhuCap,
  putDoiTuongChinhSach,
  putHocHam,
  putKhenThuong,
  putKyLuat,
  putLyLuanChinhTri,
  putQuanHeGiaDinh,
  putQuanHeVoChong,
  putQuanLyHanhChinh,
  putQuanLyNhaNuoc,
  putQuaTrinhCongTac,
  putQuaTrinhCuDiCongTac,
  putQuaTrinhCuDiDaoTao,
  putQuocPhong,
  putSangKien,
  putThongTinHopDong,
  putTinHoc,
  putTrinhDoDaoTao,
  putViTriChucDanh,
  uploadDocument,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';

import { styles } from './styles';

const RightChildren = ({
  onPress,
  visible,
}: {
  onPress: () => void;
  visible: boolean;
}) => {
  if (visible) {
    return (
      <TouchableOpacity onPress={onPress}>
        <ItemIconSVG
          color={R.colors.white}
          title="Xoá"
          width={WIDTH(24)}
          height={WIDTH(24)}
        />
      </TouchableOpacity>
    );
  }

  return <></>;
};

const ThemMoiTCNS = (props: any) => {
  const [loading, setloading] = useState(false);

  const onAddItem = props?.route?.params?.onAddItem;

  const idUser = props?.route?.params?.idUser;

  const item = props?.route?.params?.item;

  const type = props?.route?.params?.type;

  const relatedElement = props?.route?.params?.relatedElement;

  const listId = {
    thongTinNhanSuId: idUser,
    idItem: item?._id,
  };

  const onSubmit = async (data: any) => {
    setloading(true);

    const response = await submitSever(data, type, listId);

    setloading(false);

    if (response?.code === 200) {
      popupOk(
        translate('slink:Success'),
        translate('slink:Add_success'),
        () => {
          onAddItem();

          goBack();
        },
      );
    } else {
      popupOk(
        translate('slink:Notice_t'),
        response?.msg || translate('slink:Da_co_loi_xay_ra'),
      );
    }
  };

  const {
    control,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();

  const handleDel = () => {
    popupCancel(
      translate('slink:Notice_t'),
      translate('slink:Confirm_delete'),
      onDel,
    );
  };

  const onDel = async () => {
    setloading(true);

    const response = await delData(type, item?._id);

    setloading(false);

    if (response?.code === 200) {
      await onAddItem();

      goBack();
    } else {
      popupOk(
        translate('slink:Notice_t'),
        response?.msg || translate('slink:Da_co_loi_xay_ra'),
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderReal
        title={item?._id ? translate('slink:Edit') : translate('slink:Add')}
        childrenRight={
          <RightChildren visible={!!item?._id} onPress={handleDel} />
        }
      />
      <LoadingComponent loading={loading} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <DynamicForm
          errors={errors}
          unregister={unregister}
          control={control}
          formInput={relatedElement}
        />
        <BaseButton
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          text={styles.textButton}
          title="Lưu"
        />
      </ScrollView>
    </View>
  );
};

export default ThemMoiTCNS;
const delData = async (type: string, id: string) => {
  let res;
  switch (type) {
    case TCNS_TYPE.MOI_QUAN_HE_BAN_THAN:
      res = await delQuanHeGiaDinh(id);

      break;
    case TCNS_TYPE.MOI_QUAN_HE_BEN_VO_CHONG:
      res = await delQuanHeVoChong(id);

      break;
    case TCNS_TYPE.VI_TRI_CHUC_DANH:
      res = await delViTriChucDanh(id);

      break;
    case TCNS_TYPE.HOC_HAM:
      res = await delHocHam(id);

      break;
    case TCNS_TYPE.TRINH_DO_DAO_TAO:
      res = await delTrinhDoDaoTao(id);

      break;
    case TCNS_TYPE.THONG_TIN_HOP_DONG:
      res = await delThongTinHopDong(id);

      break;
    case TCNS_TYPE.DIEN_BIEN_LUONG:
      res = await delDBLuong(id);

      break;
    case TCNS_TYPE.DIEN_BIEN_PHU_CAP:
      res = await delDBPhuCap(id);

      break;
    case TCNS_TYPE.QUA_TRINH_CONG_TAC:
      res = await delQuaTrinhCongTac(id);

      break;
    case TCNS_TYPE.QUA_TRINH_CU_DI_CONG_TAC:
      res = await delQuaTrinhCuDiCongTac(id);

      break;
    case TCNS_TYPE.CU_DI_DAO_TAO_BOI_DUONG:
      res = await delQuaTrinhCuDiDaoTao(id);

      break;
    case TCNS_TYPE.KHEN_THUONG:
      res = await delKhenThuong(id);

      break;
    case TCNS_TYPE.SANG_KIEN:
      res = await delSangKien(id);

      break;
    case TCNS_TYPE.KY_LUAT:
      res = await delKyLuat(id);

      break;
    case TCNS_TYPE.DOI_TUONG_CHINH_SACH:
      res = await delDoiTuongChinhSach(id);

      break;
    case TCNS_TYPE.BOI_DUONG_QUOC_PHONG:
      res = await delQuocPhong(id);

      break;
    case TCNS_TYPE.TIN_HOC:
      res = await delTinHoc(id);

      break;
    case TCNS_TYPE.QUAN_LY_NHA_NUOC:
      res = await delQuanLyNhaNuoc(id);

      break;
    case TCNS_TYPE.QUAN_LY_HANH_CHINH:
      res = await delQuanLyHanhChinh(id);

      break;
    case TCNS_TYPE.LY_LUAN_CHINH_TRI:
      res = await delLyLuanChinhTri(id);

      break;

    default:
      break;
  }

  return res;
};

const submitSever = async (
  data: any,
  type: string,
  listId: { thongTinNhanSuId: string; idItem?: string | undefined },
) => {
  let res;
  let body;
  switch (type) {
    case TCNS_TYPE.MOI_QUAN_HE_BAN_THAN:
    case TCNS_TYPE.MOI_QUAN_HE_BEN_VO_CHONG:
      {
        body = {
          hoVaTen: data?.hoVaTen,
          moiQuanHe: data?.moiQuanHe,
          namSinh: Number(data?.namSinh),
          ...(data?.ngaySinh && { ngaySinh: Number(data?.ngaySinh) }),
          ngheNghiep: data?.ngheNghiep,
          nguoiPhuThuoc: data?.nguoiPhuThuoc || false,
          noiCongTac: data?.noiCongTac,
          ...(data?.thangSinh && { thangSinh: Number(data?.thangSinh) }),
          thongTinNhanSuId: listId.thongTinNhanSuId,
        };

        if (listId.idItem) {
          if (type === TCNS_TYPE.MOI_QUAN_HE_BAN_THAN) {
            await putQuanHeGiaDinh(body, listId.idItem);
          } else {
            await putQuanHeVoChong(body, listId.idItem);
          }
        } else {
          if (type === TCNS_TYPE.MOI_QUAN_HE_BAN_THAN) {
            res = await postQuanHeGiaDinh(body);
          } else {
            res = await postQuanHeVoChong(body);
          }
        }
      }

      break;
    case TCNS_TYPE.VI_TRI_CHUC_DANH:
      {
        let resupload: any;
        if (data?.urlFileUpload && !data?.urlFileUpload?.[0]?.url) {
          resupload = await onUploadFile(data?.urlFileUpload);
        }

        body = {
          conHieuLuc: data?.conHieuLuc || false,
          donViId: data?.donViViTri?.donViId,
          donViViTriId: data?.donViViTri?.donViViTriId,
          hieuLucDenNgay: data?.hieuLucDenNgay,
          hieuLucTuNgay: data?.hieuLucTuNgay,
          loaiQuyetDinh: data?.loaiQuyetDinh,
          laDonViChinh: data?.laDonViChinh || false,
          ngayQuyetDinh: data?.ngayQuyetDinh,
          soQuyetDinh: data?.soQuyetDinh,
          thongTinNhanSuId: listId.thongTinNhanSuId,
          ...(resupload?.[0]?.url && { urlFileUpload: resupload?.[0]?.url }),
        };

        if (listId.idItem) {
          res = await putViTriChucDanh(body, listId.idItem);
        } else {
          res = await postViTriChucDanh(body);
        }
      }

      break;
    case TCNS_TYPE.HOC_HAM:
      {
        body = {
          danhHieu: data?.danhHieu,
          loaiQuyetDinh: data?.loaiQuyetDinh,
          ...(data?.nam && { nam: Number(data?.nam) }),
          ngayCoHieuLuc: data?.ngayCoHieuLuc,
          ngayQĐ: data?.ngayQĐ,
          noiDung: data?.noiDung,
          soQĐ: data?.soQĐ,
          thongTinNhanSuId: listId.thongTinNhanSuId,
        };

        if (listId?.idItem) {
          res = await putHocHam(body, listId.idItem);
        } else {
          res = await postHocHam(body);
        }
      }

      break;
    case TCNS_TYPE.TRINH_DO_DAO_TAO:
      {
        body = {
          maNganh: data?.maNganh,
          ...(data?.namTotNghiep && {
            namTotNghiep: Number(data?.namTotNghiep),
          }),
          noiDaoTao: data?.noiDaoTao,
          trinhDoDaoTaoId: data?.trinhDoDaoTaoId,
          thongTinNhanSuId: listId.thongTinNhanSuId,
        };

        if (listId?.idItem) {
          res = await putTrinhDoDaoTao(body, listId.idItem);
        } else {
          res = await postTrinhDoDaoTao(body);
        }
      }

      break;
    case TCNS_TYPE.THONG_TIN_HOP_DONG:
      {
        body = {
          chucVuNguoiKyQuyetDinh: data?.chucVuNguoiKyQuyetDinh,
          coQuanQuyetDinh: data?.coQuanQuyetDinh,
          loaiHopDongId: data?.loaiHopDongId,
          ngayBatDau: data?.ngayBatDau,
          ngayHieuLuc: data?.ngayHieuLuc,
          ngayKetThuc: data?.ngayKetThuc,
          ...(data?.tapSu && {
            ngayKetThucTapSu: data?.ngayKetThucTapSu,
            ngayBatDauTapSu: data?.ngayBatDauTapSu,
          }),
          ngayQuyetDinh: data?.ngayQuyetDinh,
          nguoiKyQuyetDinh: data?.nguoiKyQuyetDinh,
          soHopDong: data?.soHopDong,
          soQuyetDinh: data?.soQuyetDinh,
          tapSu: data?.tapSu || false,
          trangThaiHopDong: data?.trangThaiHopDong,
          thongTinNhanSuId: listId.thongTinNhanSuId,
        };

        if (listId?.idItem) {
          res = await putThongTinHopDong(body, listId.idItem);
        } else {
          res = await postThongTinHopDong(body);
        }
      }

      break;
    case TCNS_TYPE.DIEN_BIEN_PHU_CAP:
      {
        body = {
          denNgay: data?.denNgay,
          ...(data?.heSoPhuCap && {
            heSoPhuCap: Number(data?.heSoPhuCap),
          }),
          loaiPhuCapId: data?.loaiPhuCapId,
          tuNgay: data?.tuNgay,
          thongTinNhanSuId: listId.thongTinNhanSuId,
        };

        if (listId?.idItem) {
          res = await putDBPhuCap(body, listId.idItem);
        } else {
          res = await postDBPhuCap(body);
        }
      }

      break;
    case TCNS_TYPE.DIEN_BIEN_LUONG:
      {
        body = {
          bacLuongId: data?.bacLuong?.bacLuongId,
          denNgay: data?.denNgay,
          ...(data?.bacLuong?.heSo && {
            heSo: Number(data?.bacLuong?.heSo),
          }),
          mocXetNangLuong: data?.mocXetNangLuong,
          ngachLuongId: data?.ngachLuongId,
          ngayQuyetDinh: data?.ngayQuyetDinh || null,
          phanTramHuong: data?.phanTramHuong || null,
          ...(data?.phuCapVuotKhung && {
            phuCapVuotKhung: Number(data?.phuCapVuotKhung),
          }),
          soQuyetDinh: data?.soQuyetDinh || null,
          tuNgay: data?.tuNgay || null,
          thongTinNhanSuId: listId.thongTinNhanSuId,
        };

        if (listId?.idItem) {
          res = await putDBLuong(body, listId.idItem);
        } else {
          res = await postDBLuong(body);
        }
      }

      break;
    case TCNS_TYPE.QUA_TRINH_CONG_TAC:
      {
        let resupload: any;
        if (data?.urlFileUpload && !data?.urlFileUpload?.[0]?.url) {
          resupload = await onUploadFile(data?.urlFileUpload);
        }

        body = {
          chucDanh: data?.chucDanh,
          chucVu: data?.chucVu,
          loaiQuyetDinh: data?.loaiQuyetDinh,
          denThangNam: data?.denThangNam,
          donViCongTac: data?.donViCongTac,
          noiDung: data?.noiDung,
          thongTinNhanSuId: listId.thongTinNhanSuId,
          tuThagNam: data?.tuThagNam,
          ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
        };

        if (listId?.idItem) {
          res = await putQuaTrinhCongTac(body, listId.idItem);
        } else {
          res = await postQuaTrinhCongTac(body);
        }
      }

      break;
    case TCNS_TYPE.QUA_TRINH_CU_DI_CONG_TAC:
      {
        let resupload: any;
        if (data?.urlFileUpload && !data?.urlFileUpload?.[0]?.url) {
          resupload = await onUploadFile(data?.urlFileUpload);
        }

        body = {
          denNgay: data?.denNgay,
          donViCongTac: data?.donViCongTac,
          diaChi: data?.diaChi,
          giaHanDenNgay: data?.giaHanDenNgay,
          loaiCongTac: data?.loaiCongTac,
          ngayQuyeDinh: data?.ngayQuyeDinh,
          nguonKinhPhi: data?.nguonKinhPhi,
          noiDungCongTac: data?.noiDungCongTac,
          ...(data?.quocGiaCongTacId && {
            quocGiaCongTacId: data?.quocGiaCongTacId,
          }),
          soQuyetDinh: data?.soQuyetDinh,
          tuNgay: data?.tuNgay,
          thongTinNhanSuId: listId.thongTinNhanSuId,
          ...(resupload?.[0]?.url && { urlFileUpload: resupload?.[0]?.url }),
        };

        if (listId?.idItem) {
          res = await putQuaTrinhCuDiCongTac(body, listId.idItem);
        } else {
          res = await postQuaTrinhCuDiCongTac(body);
        }
      }

      break;
    case TCNS_TYPE.CU_DI_DAO_TAO_BOI_DUONG:
      {
        let resupload: any;
        if (data?.urlFileUpload && !data?.urlFileUpload?.[0]?.url) {
          resupload = await onUploadFile(data?.urlFileUpload);
        }

        body = {
          chungChi: data?.chungChi,
          denNgay: data?.denNgay,
          diaDiemToChuc: data?.diaDiemToChuc,
          donViToChuc: data?.donViToChuc,
          khoaBoiDuongTapHuan: data?.khoaBoiDuongTapHuan,
          loaiBoiDuongId: data?.loaiBoiDuongId,
          ngayCap: data?.ngayCap,
          nguonKinhPhi: data?.nguonKinhPhi,
          tuNgay: data?.tuNgay,
          thongTinNhanSuId: listId.thongTinNhanSuId,
          ...(resupload?.[0]?.url && { urlFileUpload: resupload?.[0]?.url }),
        };

        if (listId?.idItem) {
          res = await putQuaTrinhCuDiDaoTao(body, listId.idItem);
        } else {
          res = await postQuaTrinhCuDiDaoTao(body);
        }
      }

      break;
    case TCNS_TYPE.KHEN_THUONG:
      {
        let resupload: any;
        if (data?.urlFileUpload && !data?.urlFileUpload?.[0]?.url) {
          resupload = await onUploadFile(data?.urlFileUpload);
        }

        body = {
          capKhenThuongId: data?.capKhenThuongId,
          coQuanQuyetDinh: data?.coQuanQuyetDinh,
          hinhThucKhenThuongId: data?.hinhThucKhenThuongId,
          loaiKhenThuongId: data?.loaiKhenThuongId,
          ngayKy: data?.ngayKy,
          ngayQuyetDinh: data?.ngayQuyetDinh,
          nguoiKy: data?.nguoiKy,
          noiDung: data?.noiDung,
          phuongThucKhenThuongId: data?.phuongThucKhenThuongId,
          soQuyetDinh: data?.soQuyetDinh,
          thongTinNhanSuId: listId.thongTinNhanSuId,
          ...(resupload?.[0]?.url && { urlFileUpload: resupload?.[0]?.url }),
        };

        if (listId?.idItem) {
          res = await putKhenThuong(body, listId.idItem);
        } else {
          res = await postKhenThuong(body);
        }
      }

      break;
    case TCNS_TYPE.SANG_KIEN:
      {
        body = {
          capSangKienId: data?.capSangKienId,
          coQuanQuyetDinh: data?.coQuanQuyetDinh,
          linhVuc: data?.linhVuc,
          ngayKy: data?.ngayKy,
          ngayQuyetDinh: data?.ngayQuyetDinh,
          nguoiKy: data?.nguoiKy,
          noiDung: data?.noiDung,
          sangKienId: data?.sangKienId,
          tenSangKien: data?.tenSangKien,
          soQuyetDinh: data?.soQuyetDinh,
          thongTinNhanSuId: listId.thongTinNhanSuId,
        };

        if (listId?.idItem) {
          res = await putSangKien(body, listId.idItem);
        } else {
          res = await postSangKien(body);
        }
      }

      break;
    case TCNS_TYPE.KY_LUAT:
      {
        let resupload: any;
        if (data?.urlFileUpload && !data?.urlFileUpload?.[0]?.url) {
          resupload = await onUploadFile(data?.urlFileUpload);
        }

        body = {
          capKyLuatId: data?.capKyLuatId,
          coQuanQuyetDinh: data?.coQuanQuyetDinh,
          hinhThucKyLuatId: data?.hinhThucKyLuatId,
          ngayKy: data?.ngayKy,
          ngayQuyetDinh: data?.ngayQuyetDinh,
          noiDung: data?.noiDung,
          soQuyetDinh: data?.soQuyetDinh,
          thongTinNhanSuId: listId.thongTinNhanSuId,
          ...(resupload?.[0]?.url && { urlFileUpload: resupload?.[0]?.url }),
        };

        if (listId?.idItem) {
          res = await putKyLuat(body, listId.idItem);
        } else {
          res = await postKyLuat(body);
        }
      }

      break;
    case TCNS_TYPE.BOI_DUONG_QUOC_PHONG:
      {
        let resupload: any;
        if (data?.urlFileUpload && !data?.urlFileUpload?.[0]?.url) {
          resupload = await onUploadFile(data?.urlFileUpload);
        }

        body = {
          thoiGianBatDau: data?.thoiGianBatDau,
          thoiGianKetThuc: data?.thoiGianKetThuc,
          coSoDaoTao: data?.coSoDaoTao,
          vanBangChungChi: data?.vanBangChungChi,
          hinhThucDaoTaoId: data?.hinhThucDaoTaoId,
          thongTinNhanSuId: listId.thongTinNhanSuId,
          ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
        };

        if (listId?.idItem) {
          res = await putQuocPhong(body, listId.idItem);
        } else {
          res = await postQuocPhong(body);
        }
      }

      break;
    case TCNS_TYPE.TIN_HOC:
      {
        let resupload: any;
        if (data?.urlFileUpload && !data?.urlFileUpload?.[0]?.url) {
          resupload = await onUploadFile(data?.urlFileUpload);
        }

        body = {
          thoiGianBatDau: data?.thoiGianBatDau,
          thoiGianKetThuc: data?.thoiGianKetThuc,
          coSoDaoTao: data?.coSoDaoTao,
          apDung: data?.apDung || false,
          tinHocId: data?.tinHocId,
          vanBangChungChi: data?.vanBangChungChi,
          hinhThucDaoTaoId: data?.hinhThucDaoTaoId,
          thongTinNhanSuId: listId.thongTinNhanSuId,
          ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
        };

        if (listId?.idItem) {
          res = await putTinHoc(body, listId.idItem);
        } else {
          res = await postTinHoc(body);
        }
      }

      break;
    case TCNS_TYPE.QUAN_LY_NHA_NUOC:
      {
        let resupload: any;
        if (data?.urlFileUpload && !data?.urlFileUpload?.[0]?.url) {
          resupload = await onUploadFile(data?.urlFileUpload);
        }

        body = {
          thoiGianBatDau: data?.thoiGianBatDau,
          thoiGianKetThuc: data?.thoiGianKetThuc,
          coSoDaoTao: data?.coSoDaoTao,
          apDung: data?.apDung || false,
          trinhDoQuanLyNhaNuocId: data?.trinhDoQuanLyNhaNuocId,
          vanBangChungChi: data?.vanBangChungChi,
          hinhThucDaoTaoId: data?.hinhThucDaoTaoId,
          thongTinNhanSuId: listId.thongTinNhanSuId,
          ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
        };

        if (listId?.idItem) {
          res = await putQuanLyNhaNuoc(body, listId.idItem);
        } else {
          res = await postQuanLyNhaNuoc(body);
        }
      }

      break;
    case TCNS_TYPE.QUAN_LY_HANH_CHINH:
      {
        let resupload: any;
        if (data?.urlFileUpload && !data?.urlFileUpload?.[0]?.url) {
          resupload = await onUploadFile(data?.urlFileUpload);
        }

        body = {
          thoiGianBatDau: data?.thoiGianBatDau,
          thoiGianKetThuc: data?.thoiGianKetThuc,
          coSoDaoTao: data?.coSoDaoTao,
          apDung: data?.apDung || false,
          trinhDoQuanLyHanhChinhId: data?.trinhDoQuanLyHanhChinhId,
          vanBangChungChi: data?.vanBangChungChi,
          hinhThucDaoTaoId: data?.hinhThucDaoTaoId,
          thongTinNhanSuId: listId.thongTinNhanSuId,
          ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
        };

        if (listId?.idItem) {
          res = await putQuanLyHanhChinh(body, listId.idItem);
        } else {
          res = await postQuanLyHanhChinh(body);
        }
      }

      break;
    case TCNS_TYPE.LY_LUAN_CHINH_TRI:
      {
        let resupload: any;
        if (data?.urlFileUpload && !data?.urlFileUpload?.[0]?.url) {
          resupload = await onUploadFile(data?.urlFileUpload);
        }

        body = {
          thoiGianBatDau: data?.thoiGianBatDau,
          thoiGianKetThuc: data?.thoiGianKetThuc,
          coSoDaoTao: data?.coSoDaoTao,
          apDung: data?.apDung || false,
          trinhDoLyLuanChinhTriId: data?.trinhDoLyLuanChinhTriId,
          vanBangChungChi: data?.vanBangChungChi,
          hinhThucDaoTaoId: data?.hinhThucDaoTaoId,
          thongTinNhanSuId: listId.thongTinNhanSuId,
          ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
        };

        if (listId?.idItem) {
          res = await putLyLuanChinhTri(body, listId.idItem);
        } else {
          res = await postLyLuanChinhTri(body);
        }
      }

      break;
    case TCNS_TYPE.DOI_TUONG_CHINH_SACH:
      {
        let resupload: any;
        if (data?.urlFileUpload && !data?.urlFileUpload?.[0]?.url) {
          resupload = await onUploadFile(data?.urlFileUpload);
        }

        body = {
          denNgay: data?.denNgay,
          doiTuongChinhSach: data?.doiTuongChinhSach,
          ghiChu: data?.ghiChu,
          tuNgay: data?.tuNgay,
          thongTinNhanSuId: listId.thongTinNhanSuId,
          ...(resupload?.[0]?.url && { urlFileUpload: resupload?.[0]?.url }),
        };

        if (listId?.idItem) {
          res = await putDoiTuongChinhSach(body, listId.idItem);
        } else {
          res = await postDoiTuongChinhSach(body);
        }
      }

      break;

    default:
      break;
  }

  return res;
};

const onUploadFile = async (url: any) => {
  const listFile = await uploadDocument(url);

  return listFile;
};
