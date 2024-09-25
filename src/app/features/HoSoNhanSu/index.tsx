/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

// import R from '@assets/R';
import { useForm } from 'react-hook-form';

import R from '@assets/R';
import { dispatch, popupCancel, popupOk, WIDTH } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import MenuComponent from '@components/MenuNativeBase/MenuComponent';
import TabbarLong from '@components/TabbarCustome/TabbarLong';
import HeaderReal from '@libcomponents/header-real';
import { InfoUserTCNSProps } from '@model/infoUserTCNS';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  downloadHoSoNhanSu,
  getThongTinChinhSua,
  lichSuChinhSuaNhanSu,
  thongTinNhanSuMe,
  updateChinhSuaNS,
} from '@networking/user';
import { infoUserTCNSActions } from '@redux-slice';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import { saveFileFromBase64 } from '@utils/Utils';
import moment from 'moment';
import { Box, FlatList, Modal } from 'native-base';

import DacDiemLichSuBanThan from './componentTab/DacDiemLichSuBanThan';
import HoSo from './componentTab/HoSo';
import HoSoEdit from './componentTab/HoSo/HoSoEdit';
import KhenThuongSangKienKyLuat from './componentTab/KhenThuongSangKienKyLuat';
import LuongPhuCapBaoHiem from './componentTab/LuongPhuCapBaoHiem';
import ModalChiTietNhanSu from './componentTab/ModalChiTiet';
import MoiQuanHeGiaDinh from './componentTab/MoiQuanHeGiaDinh';
import ThongTinCoBan from './componentTab/ThongTinCoBan';
import ThongTinCoBanEdit from './componentTab/ThongTinCoBan/ThongTinCoBanEdit';
import ThongTinDangDoan from './componentTab/ThongTinDangDoan';
import ThongTinDangDoanEdit from './componentTab/ThongTinDangDoan/ThongTinDangDoanEdit';
import ThongTinDaoTao from './componentTab/ThongTinDaoTao';
import ThongTinDaoTaoEdit from './componentTab/ThongTinDaoTao/ThongTinDaoTaoEdit';
import ThongTinKhac from './componentTab/ThongTinKhac';
import ThongTinTuyenDung from './componentTab/ThongTinTuyenDung';
import ThongTinTuyenDungEdit from './componentTab/ThongTinTuyenDung/ThongTinTuyenDungEdit';
import styles from './styles';
import LoadingWithLogo from '@components/Loading/LoadingWithLogo';

const HoSoNhanSu = () => {
  const [infoUser, setinfoUser] = useState<any>();

  const [isVisible, setisVisible] = useState(false);

  const [visibleEdit, setvisibleEdit] = useState(false);

  const [visibleListChinhSua, setvisibleListChinhSua] = useState(false);

  const [dataShow, setdataShow] = useState<
    { value: string; label: string; required: boolean }[]
  >([]);

  const [loading, setloading] = useState(false);

  const [listLichSuChinhSua, setListLichSuChinhSua] = useState<any>([]);

  useEffect(() => {
    trackEvent(MixPanelEvent.VAO_HO_SO_NHAN_SU);
  }, []);

  useEffect(() => {
    getData();

    setIndex(0);
  }, [visibleEdit]);

  const onRefresh = () => {
    getData();

    setIndex(0);
  };

  const getData = async () => {
    setloading(true);

    let res: { data: InfoUserTCNSProps };
    if (visibleEdit) {
      res = await getThongTinChinhSua();
    } else {
      res = await thongTinNhanSuMe();
    }

    const lichSuChinhSua = await lichSuChinhSuaNhanSu();

    setloading(false);

    // setinfoUser(res?.data);
    setinfoUser(lichSuChinhSua?.data[0]);

    setListLichSuChinhSua(lichSuChinhSua?.data || []);

    dispatch(infoUserTCNSActions.setInfoUserTCNS({ infoUserTCNS: res?.data }));
  };

  const [routes] = useState<any>([
    { key: 0, title: translate('slink:General_information') },
    { key: 1, title: translate('slink:Basic_Information') },
    { key: 2, title: translate('slink:Training_and_Development') },
    { key: 3, title: translate('slink:Recruitment_Employment_History') },
    { key: 4, title: translate('slink:Salary_Allowances') },
    { key: 5, title: translate('slink:Party_and_Youth_Union_Information') },
    { key: 6, title: translate('slink:Rewards_Disciplinary_Actions') },
    { key: 7, title: translate('slink:Family_Relations') },
    { key: 8, title: translate('slink:Personal_Historical_Characteristics') },
    { key: 9, title: translate('slink:Other_Information') },
  ]);

  const [index, setIndex] = React.useState(0);

  const onIndexChange = (curindex: number) => {
    setIndex(curindex);
  };

  const onShowDetail = (
    item: { label: string; value: string; required: boolean }[],
  ) => {
    setdataShow(item);

    setisVisible(true);
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const watchValues = watch();

  const onHandleSave = async (data: any) => {
    const bodyUpdate = {
      ...infoUser,
      maCanBo: data?.maCanBo || null,
      hoDem: data?.hoDem || null,
      ten: data?.ten || null,
      tenGoiKhac: data?.tenGoiKhac || null,
      ngaySinh: data?.ngaySinh || null,
      gioiTinh: data?.gioiTinh || null,
      emailCanBo: data?.emailCanBo || null,
      email: data?.email || null,
      sdtCaNhan: data?.sdtCaNhan || null,
      trangThai: data?.trangThai || null,
      cccdCMND: data?.cccdCMND || null,
      ngayCap: data?.ngayCap || null,
      noiCap: data?.noiCap || null,
      loaiCanBoGiangVien: data?.loaiCanBoGiangVien || null,
      soHieuVienChuc: data?.soHieuVienChuc || null,
      //Tab2
      ...(data?.hoKhau?.maQuanHuyen && {
        hoKhauQuanMa: data?.hoKhau?.maQuanHuyen,
      }),
      ...(data?.hoKhau?.tenQuanHuyen && {
        hoKhauQuanTen: data?.hoKhau?.tenQuanHuyen,
      }),
      ...(data?.hoKhau?.soNhaTenDuong && {
        hoKhauSoNha: data?.hoKhau?.soNhaTenDuong,
      }),
      ...(data?.hoKhau?.maTinh && {
        hoKhauThanhPhoMa: data?.hoKhau?.maTinh,
      }),
      ...(data?.hoKhau?.tenTinh && {
        hoKhauThanhPhoTen: data?.hoKhau?.tenTinh,
      }),
      ...(data?.hoKhau?.maPhuongXa && {
        hoKhauXaMa: data?.hoKhau?.maPhuongXa,
      }),
      ...(data?.hoKhau?.tenPhuongXa && {
        hoKhauXaTen: data?.hoKhau?.tenPhuongXa,
      }),
      ...(data?.noiOHienNay?.maQuanHuyen && {
        noiOQuanMa: data?.noiOHienNay?.maQuanHuyen,
      }),
      ...(data?.noiOHienNay?.tenQuanHuyen && {
        noiOQuanTen: data?.noiOHienNay?.tenQuanHuyen,
      }),
      ...(data?.noiOHienNay?.soNhaTenDuong && {
        noiOSoNha: data?.noiOHienNay?.soNhaTenDuong,
      }),
      //
      ...(data?.noiOHienNay?.maTinh && {
        noiOThanhPhoMa: data?.noiOHienNay?.maTinh,
      }),
      ...(data?.noiOHienNay?.tenTinh && {
        noiOThanhPhoTen: data?.noiOHienNay?.tenTinh,
      }),
      ...(data?.noiOHienNay?.maPhuongXa && {
        noiOXaMa: data?.noiOHienNay?.maPhuongXa,
      }),
      ...(data?.noiOHienNay?.tenPhuongXa && {
        noiOXaTen: data?.noiOHienNay?.tenPhuongXa,
      }),
      ...(data?.noiSinh?.maQuanHuyen && {
        noiSinhQuanMa: data?.noiSinh?.maQuanHuyen,
      }),
      ...(data?.noiSinh?.tenQuanHuyen && {
        noiSinhQuanTen: data?.noiSinh?.tenQuanHuyen,
      }),
      ...(data?.noiSinh?.maTinh && {
        noiSinhThanhPhoMa: data?.noiSinh?.maTinh,
      }),
      ...(data?.noiSinh?.tenTinh && {
        noiSinhThanhPhoTen: data?.noiSinh?.tenTinh,
      }),
      ...(data?.noiSinh?.maPhuongXa && {
        noiSinhXaMa: data?.noiSinh?.maPhuongXa,
      }),
      ...(data?.noiSinh?.tenPhuongXa && {
        noiSinhXaTen: data?.noiSinh?.tenPhuongXa,
      }),
      //
      ...(data?.queQuan?.maQuanHuyen && {
        queQuanQuanMa: data?.queQuan?.maQuanHuyen,
      }),
      ...(data?.noiSinh?.tenQuanHuyen && {
        queQuanQuanTen: data?.queQuan?.tenQuanHuyen,
      }),
      ...(data?.queQuan?.maTinh && {
        queQuanThanhPhoMa: data?.queQuan?.maTinh,
      }),
      ...(data?.queQuan?.tenTinh && {
        queQuanThanhPhoTen: data?.queQuan?.tenTinh,
      }),
      ...(data?.queQuan?.maPhuongXa && {
        queQuanXaMa: data?.queQuan?.maPhuongXa,
      }),
      ...(data?.queQuan?.tenPhuongXa && {
        queQuanXaTen: data?.queQuan?.tenPhuongXa,
      }),
      ...(data?.tonGiaoId && {
        tonGiaoId: data?.tonGiaoId,
      }),
      ...(data?.quocTichId && {
        quocTichId: data?.quocTichId,
      }),
      ...(data?.maTonGiao && {
        maTonGiao: data?.maTonGiao,
      }),
      ...(data?.tinhTrangHonNhanId && {
        tinhTrangHonNhanId: data?.tinhTrangHonNhanId,
      }),
      //Tab 3
      ...(data?.trinhDoGiaoDucPhoThongId && {
        trinhDoGiaoDucPhoThongId: data?.trinhDoGiaoDucPhoThongId,
      }),
      ...(data?.soTruongCongTac && {
        soTruongCongTac: data?.soTruongCongTac,
      }),
      //Tab 4
      ...(data?.ngayTuyenDung && {
        ngayTuyenDung: data?.ngayTuyenDung,
      }),
      ...(data?.ngayBatDauLamViecTaiTruong && {
        ngayBatDauLamViecTaiTruong: data?.ngayBatDauLamViecTaiTruong,
      }),
      donViTuyenDungId: data?.tuyenDungTrongHocVien
        ? data?.donViTuyenDungId || null
        : null,
      donViViTriTuyenDungId: data?.tuyenDungTrongHocVien
        ? data?.donViViTriTuyenDungId || null
        : null,
      tenDonViTuyenDung: data?.tuyenDungTrongHocVien
        ? null
        : data?.tenDonViTuyenDung || null,
      tenDonViViTriTuyenDung: data?.tuyenDungTrongHocVien
        ? null
        : data?.tenDonViViTriTuyenDung || null,
      ...(data?.hinhThucTuyenDungId && {
        hinhThucTuyenDungId: data?.hinhThucTuyenDungId,
      }),
      ...(data?.dotTuyenDungId && {
        dotTuyenDungId: data?.dotTuyenDungId,
      }),
      ...(data?.soBaoDanh && {
        soBaoDanh: data?.soBaoDanh,
      }),
      ...(data?.ngayVaoNganh && {
        ngayVaoNganh: data?.ngayVaoNganh,
      }),
      //Đảng đoàn
      ...(data?.soTheDang && {
        soTheDang: data?.soTheDang,
      }),
      ...(data?.noiVaoDang && {
        noiVaoDang: data?.noiVaoDang,
      }),
      ...(data?.ngayVaoDangDuBi && {
        ngayVaoDangDuBi: data?.ngayVaoDangDuBi,
      }),
      ...(data?.ngayChinhThuc && {
        ngayChinhThuc: data?.ngayChinhThuc,
      }),
      ...(data?.noiVaoDoan && {
        noiVaoDoan: data?.noiVaoDoan,
      }),
      ...(data?.ngayVaoDoan && {
        ngayVaoDoan: data?.ngayVaoDoan,
      }),
      ...(data?.ngayNhapNgu && {
        ngayNhapNgu: data?.ngayNhapNgu,
      }),
      ...(data?.ngayXuatNgu && {
        ngayXuatNgu: data?.ngayXuatNgu,
      }),
      ...(data?.donViQuanDoi && {
        donViQuanDoi: data?.donViQuanDoi,
      }),
      ...(data?.chucVuQuanDoi && {
        chucVuQuanDoi: data?.chucVuQuanDoi,
      }),
      ...(data?.ngayKetNapDanQuanTuVe && {
        ngayKetNapDanQuanTuVe: data?.ngayKetNapDanQuanTuVe,
      }),
      ...(data?.ngayHoanThanhNghiaVu && {
        ngayHoanThanhNghiaVu: data?.ngayHoanThanhNghiaVu,
      }),
      ...(data?.chucDanhDanQuanTuVe && {
        chucDanhDanQuanTuVe: data?.chucDanhDanQuanTuVe,
      }),
      ...(data?.soQuyetDinhHoanThanh && {
        soQuyetDinhHoanThanh: data?.soQuyetDinhHoanThanh,
      }),
      ...(data?.nguoiKyQuyetDinh && {
        nguoiKyQuyetDinh: data?.nguoiKyQuyetDinh,
      }),
      //Đặc điểm bản thân
      ...(data?.lichSuBanThanKhaiRo && {
        lichSuBanThanKhaiRo: data?.lichSuBanThanKhaiRo,
      }),
      ...(data?.lichSuBanThanThamGia && {
        lichSuBanThanThamGia: data?.lichSuBanThanThamGia,
      }),
      ...(data?.lichSuBanThanCoThanNhan && {
        lichSuBanThanCoThanNhan: data?.lichSuBanThanCoThanNhan,
      }),
      //Tình trạng sức khoẻ
      ...(data?.canNang && { canNang: Number(data?.canNang) }),
      ...(data?.chieuCao && { chieuCao: Number(data?.chieuCao) }),
      ...(data?.nhomMau && { nhomMau: data?.nhomMau }),
      ...(data?.tinhTrangSucKhoe && {
        tinhTrangSucKhoe: data?.tinhTrangSucKhoe,
      }),
      ...(data?.tenNganHang && {
        tenNganHang: data?.tenNganHang,
      }),
      ...(data?.chiNhanh && {
        chiNhanh: data?.chiNhanh,
      }),
      ...(data?.soTaiKhoan && {
        soTaiKhoan: data?.soTaiKhoan,
      }),
      ...(data?.soSoBHXH && {
        soSoBHXH: data?.soSoBHXH,
      }),
      ...(data?.maSoThue && {
        maSoThue: data?.maSoThue,
      }),
    };

    const res = await updateChinhSuaNS(infoUser?._id, bodyUpdate);

    if (res?.status) {
      dispatch(
        infoUserTCNSActions.setInfoUserTCNS({ infoUserTCNS: bodyUpdate }),
      );
    }
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 0:
        return visibleEdit ? (
          <HoSoEdit
            control={control}
            errors={errors}
            setValue={setValue}
            watchValues={watchValues}
            key={route.key}
            infoUser={infoUser}
          />
        ) : (
          <HoSo
            infoUser={infoUser}
            onShowDetail={onShowDetail}
            getColor={getColor}
          />
        );
      case 1:
        return visibleEdit ? (
          <ThongTinCoBanEdit
            control={control}
            errors={errors}
            setValue={setValue}
            key={route.key}
          />
        ) : (
          <ThongTinCoBan infoUser={infoUser} onShowDetail={onShowDetail} />
        );

      case 2:
        return visibleEdit ? (
          <ThongTinDaoTaoEdit
            control={control}
            errors={errors}
            setValue={setValue}
            key={route.key}
          />
        ) : (
          <ThongTinDaoTao infoUser={infoUser} onShowDetail={onShowDetail} />
        );

      case 3:
        return visibleEdit ? (
          <ThongTinTuyenDungEdit
            watchValues={watchValues}
            control={control}
            errors={errors}
            setValue={setValue}
            key={route.key}
          />
        ) : (
          <ThongTinTuyenDung onShowDetail={onShowDetail} infoUser={infoUser} />
        );
      case 4:
        return (
          <LuongPhuCapBaoHiem
            key={route.key}
            editVisible={visibleEdit}
            onShowDetail={onShowDetail}
          />
        );
      case 5:
        return visibleEdit ? (
          <ThongTinDangDoanEdit
            control={control}
            errors={errors}
            setValue={setValue}
          />
        ) : (
          <ThongTinDangDoan infoUser={infoUser} onShowDetail={onShowDetail} />
        );
      case 6:
        return (
          <KhenThuongSangKienKyLuat
            key={route.key}
            editVisible={visibleEdit}
            onShowDetail={onShowDetail}
          />
        );
      case 7:
        return (
          <MoiQuanHeGiaDinh
            key={route.key}
            editVisible={visibleEdit}
            onShowDetail={onShowDetail}
          />
        );
      case 8:
        return (
          <DacDiemLichSuBanThan
            control={control}
            errors={errors}
            setValue={setValue}
            key={route.key}
            editVisible={visibleEdit}
          />
        );
      case 9:
        return (
          <ThongTinKhac
            control={control}
            errors={errors}
            setValue={setValue}
            editVisible={visibleEdit}
            onShowDetail={onShowDetail}
          />
        );

      default:
        return null;
    }
  };

  const setEdit = (value: boolean) => {
    setvisibleEdit(value);
  };

  const getColor = (status: string) => {
    switch (status) {
      case 'Duyệt':
        return R.colors.blue;
      case 'Duyệt - đang áp dụng':
        return R.colors.green008;

      default:
        return R.colors.black0;
    }
  };

  const onPress = () => {
    if (visibleEdit) {
      popupCancel(
        translate('slink:Notice_t'),
        'Bạn có chắc chắn muốn gửi bản yêu cầu chỉnh sửa này?',
        () =>
          navigateScreen(APP_SCREEN.GUIBANCHINHSUA, {
            setEdit,
            infoUser,
            onRefresh,
          }),
      );
    } else {
      setvisibleEdit(!visibleEdit);
    }
  };

  const handleDownload = async () => {
    try {
      setloading(true);

      const res = await downloadHoSoNhanSu(infoUser?._id);

      const base64Url = `data:application/docx;base64,${res.url}`;

      const res2 = await saveFileFromBase64(base64Url, 'Hồ sơ nhân sự');

      // if (res?.status) {
      //   popupOk(translate('slink:Notice_t'), 'Tải hồ sơ thành công');
      // }
      setloading(false);
    } catch (error) {
      setloading(false);

      popupOk(translate('slink:Notice_t'), 'Tải hồ sơ thất bại');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:HR_records')}
        childrenRight={
          <RightComponent
            onPressSave={handleSubmit(onHandleSave)}
            editVisible={visibleEdit}
            onPress={onPress}
            onDownLoad={handleDownload}
            onShowListEdit={() => {
              setvisibleListChinhSua(true);
            }}
            infoUser={infoUser}
          />
        }
      />
      <Box flex={1}>
        {loading ? (
          <LoadingWithLogo />
        ) : (
          <TabbarLong
            renderScene={renderScene}
            onIndexChange={onIndexChange}
            navigationState={{ index, routes }}
          />
        )}
      </Box>
      <ModalChiTietNhanSu
        isVisible={isVisible}
        data={dataShow}
        closeButton={() => {
          setisVisible(false);
        }}
      />

      <ModalListLichSuChinhSua
        visibleListChinhSua={visibleListChinhSua}
        setvisibleListChinhSua={setvisibleListChinhSua}
        listLichSuChinhSua={listLichSuChinhSua}
        setinfoUser={setinfoUser}
        getColor={getColor}
      />
    </View>
  );
};

export default HoSoNhanSu;

interface RightChildProps {
  onPress: () => void;
  onPressSave: () => void;
  editVisible: boolean;
  onDownLoad: () => void;
  onShowListEdit: () => void;
  infoUser: any;
}
const RightComponent = (props: RightChildProps) => {
  const {
    onPress,
    editVisible,
    onPressSave,
    onDownLoad,
    onShowListEdit,
    infoUser,
  } = props;

  const viewMode =
    infoUser?.trangThaiChinhSua === 'Duyệt'
      ? [
          { title: translate('slink:Tai_xuong_ho_so'), onPress: onDownLoad },
          {
            title: translate('slink:Lich_su_chinh_sua'),
            onPress: onShowListEdit,
          },
        ]
      : [
          { title: translate('slink:Edit'), onPress: onPress },
          { title: translate('slink:Tai_xuong_ho_so'), onPress: onDownLoad },
          {
            title: translate('slink:Lich_su_chinh_sua'),
            onPress: onShowListEdit,
          },
        ];

  const listFunction = editVisible
    ? [
        { title: translate('slink:Send_now'), onPress: onPress },
        { title: translate('slink:Save_to_send_later'), onPress: onPressSave },
      ]
    : viewMode;

  return <MenuComponent listFunction={listFunction} />;
};

const ModalListLichSuChinhSua = (props: any) => {
  const {
    visibleListChinhSua,
    setvisibleListChinhSua,
    listLichSuChinhSua,
    setinfoUser,
    getColor,
  } = props;

  return (
    <Modal
      isOpen={visibleListChinhSua}
      onClose={() => setvisibleListChinhSua(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <FlatList
          mt={4}
          data={listLichSuChinhSua}
          extraData={listLichSuChinhSua}
          p={WIDTH(12)}
          renderItem={({ item, index }: { item: any; index: number }) => {
            const handleChange = async () => {
              setinfoUser(item);

              setvisibleListChinhSua(false);
            };

            return (
              <TouchableOpacity onPress={handleChange}>
                <ItemLabel
                  label={moment(item?.updatedAt).format('DD/MM/YYYY HH:mm')}
                  value={item?.trangThaiChinhSua}
                  textValue={{ color: getColor(item?.trangThaiChinhSua) }}
                  isLast={item?.length - 1 === index}
                />
              </TouchableOpacity>
            );
          }}
        />
      </Modal.Content>
    </Modal>
  );
};
