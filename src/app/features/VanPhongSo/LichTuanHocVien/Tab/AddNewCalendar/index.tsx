import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import { EKieuDuLieu, HEIGHT, showToastError, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import TextLabelTCNS from '@components/BoxHSNS/TextLabelTCNS';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import MultiSelectForm from '@components/QuyTrinhDong/component/MultiSelectForm';
import NhanSuMultiSelect from '@components/QuyTrinhDong/component/MultiSelectForm/ElementSelect';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { AccountProps } from '@model/app';
import { goBack } from '@navigation/navigation-service';
import { uploadDocument } from '@networking/user';
import {
  dangKyLichTuan,
  getChucVu,
  getDonViMany,
  getPhongHopMany,
  getTruongPhongMany,
  updateLichTuan,
} from '@networking/user/LichTuan';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { Box, Checkbox, Text } from 'native-base';

import { ChucVuUserProps, DonViProps, PhongHopProps } from './type';

import { DataCalendarProps } from '../../component/ModalCalendarWeekProps';
import { LoaiDoiTuongChuTri } from '../../constant';

const DATA_CNC = ['Có', 'Không'];

const DON_VI = ['Trong học viện', 'Khác'];

interface Props {
  route: {
    params: { onRefresh?: () => void; dataDefault?: DataCalendarProps };
  };
}
const AddNewCalendar = (props: Props) => {
  const onRefresh = props?.route?.params?.onRefresh;

  const dataDefault = props?.route?.params?.dataDefault;

  const {
    control,
    handleSubmit,
    watch,
    setValue,

    formState: { errors },
  } = useForm();

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const watchValues = watch();

  const { account } = useSelector(selectAppConfig);

  const [listDonVi, setlistDonVi] = useState<DonViProps[]>([]);

  const [chucVuUser, setchucVuUser] = useState<ChucVuUserProps>({
    isBanGiamDoc: false,
    isTruongPhongPhoPhong: false,
  });

  const [listPhong, setlistPhong] = useState<PhongHopProps[]>([]);

  const [listTruongPhong, setlistTruongPhong] = useState<any[]>([]);

  const [dsTruongPhong, setDsTruongPhong] = useState<any[]>([]);

  const [loading, setloading] = useState(false);

  const [isAll, setisAll] = useState(dataDefault?.tatCaCanBo || false);

  const [isPublishDoc, setisPublishDoc] = useState(false);

  useEffect(() => {
    initAPI();
  }, []);

  const hasThietBiCNC = dataDefault?.thietBiCNC ? DATA_CNC[0] : DATA_CNC[1];

  const initAPI = async () => {
    setloading(true);

    const responseChucVu = await getChucVu();

    setchucVuUser(responseChucVu?.data?.data);

    const responseDonVi = await getDonViMany();

    setlistDonVi(responseDonVi?.data?.data || []);

    const body = {
      condition: { loaiPhong: 'Phòng họp', trangThai: 'Hoạt động' },
    };

    const responsePhongHop = await getPhongHopMany(body);

    setlistPhong(responsePhongHop?.data?.data || []);

    const bodyTruongPhong = {
      condition: {
        donViChinhId: account?.donViChinhId,
      },
    };

    const responseTruongPhong = await getTruongPhongMany(bodyTruongPhong);

    const listTruongPhongMe =
      responseTruongPhong?.data?.data?.map(item => {
        return {
          label: item?.hoTen,
          value: item?.ssoId,
        };
      }) ?? [];

    setDsTruongPhong(responseTruongPhong?.data?.data ?? []);

    setlistTruongPhong(listTruongPhongMe ?? []);

    setloading(false);
  };

  const defaultLoaiLich =
    dataDefault?.loaiDoiTuong ||
    (chucVuUser?.isBanGiamDoc
      ? LoaiDoiTuongChuTri?.LANH_DAO
      : chucVuUser?.isTruongPhongPhoPhong
      ? LoaiDoiTuongChuTri?.TRUONG_DON_VI
      : LoaiDoiTuongChuTri?.CHUNG);

  useEffect(() => {
    initData();
  }, [defaultLoaiLich]);

  const initData = async () => {
    setValue('loaiLich', defaultLoaiLich);

    setValue('location', DON_VI[0]);

    // setValue('thietBiCNC', hasThietBiCNC);

    if (dataDefault) {
      setValue('noiDungCongViec', dataDefault?.noiDungCongViec);

      setValue(
        'chuTriPhongBan',
        dataDefault?.chuTri
          ?.filter(item => item?.loaiChuTri === 'Đơn vị')
          ?.map(item => item?.maDonVi),
      );

      setValue(
        'chuTriKhac',
        dataDefault?.chuTri?.find(item => item?.loaiChuTri === 'Khác')?.ten,
      );

      setValue('thoiGianBatDau', dataDefault?.thoiGianBatDau);

      setValue('thoiGianKetThuc', dataDefault?.thoiGianKetThuc);

      setValue('donVi', dataDefault?.chuTri?.[0]?.maDonVi);

      setValue(
        'donViChuanBi',
        dataDefault?.donViChuanBi?.maDonVi ||
          dataDefault?.donViChuanBi?.tenDonVi,
      );

      setValue('thanhPhanThamDuKhac', dataDefault?.thanhPhanThamDuKhac);

      setValue('sucChua', dataDefault?.sucChua);

      setValue('diaDiemKhac', dataDefault?.diaDiemKhac);

      setValue('donViPhoiHopKhac', dataDefault?.donViPhoiHopKhac);

      setValue('ghiChu', dataDefault?.ghiChu);

      setValue('chuTri', dataDefault?.chuTri?.[0]?.ssoId);
    }
  };

  const donViChuTri = transformValueChuTri(
    watchValues?.loaiLich,
    watchValues?.chuTri,
    account,
    watchValues,
    listDonVi,
    dsTruongPhong,
  );

  const onSubmit = async () => {
    let responseUploadTaiLieu: any[] = [];
    let responseUploadVanBan: any[] = [];
    if (watchValues?.taiLieu?.length > 0) {
      const listTaiLieu = await uploadDocument(watchValues?.taiLieu);

      responseUploadTaiLieu = listTaiLieu?.map((item, index) => {
        return {
          public: isPublishDoc,
          url: item?.url ?? watchValues?.taiLieu?.[index]?.url,
        };
      });
    }

    if (watchValues?.vanBan?.length > 0) {
      const listVanBan = await uploadDocument(watchValues?.vanBan);

      responseUploadVanBan = listVanBan?.map((item, index) => {
        return item?.url ?? watchValues?.vanBan?.[index];
      });
    }

    const thanhPhanThamDu =
      listDonVi
        ?.filter(item => watchValues?.thanhPhanThamDu?.includes(item?.maDonVi))

        ?.map(item => {
          return {
            maDonVi: item?.maDonVi || '',
            id: item?._id || '',
            tenDonVi: item?.ten || '',
            tenVietTat: item?.tenVietTat || '',
          };
        }) || [];

    if (
      watchValues?.thoiGianKetThuc !== undefined &&
      new Date(watchValues?.thoiGianBatDau) >
        new Date(watchValues?.thoiGianKetThuc)
    ) {
      showToastError(translate('slink:Time_end_greater_time_start'));

      return;
    }

    if (
      watchValues?.loaiLich === LoaiDoiTuongChuTri.CHUNG &&
      donViChuTri?.length === 0
    ) {
      showToastError('Vui lòng điền đơn vị thực hiện');

      return;
    }

    if (
      !isAll &&
      thanhPhanThamDu?.length === 0 &&
      (watchValues?.thanhPhanNguoiThamDu?.length === 0 ||
        watchValues?.thanhPhanNguoiThamDu == undefined) &&
      watchValues?.thanhPhanThamDuKhac === ''
    ) {
      showToastError('Vui lòng điền thành phần tham dự');

      return;
    }

    setloadingSubmit(true);

    const body = {
      noiDungCongViec: watchValues?.noiDungCongViec || '',
      ...(watchValues?.thoiGianBatDau && {
        thoiGianBatDau: watchValues?.thoiGianBatDau,
      }),
      ...(watchValues?.thoiGianKetThuc && {
        thoiGianKetThuc: watchValues?.thoiGianKetThuc,
      }),
      loaiDoiTuong: watchValues?.loaiLich,
      diaDiemKhac: watchValues?.diaDiemKhac || '',
      ghiChu: watchValues?.ghiChu || '',
      tatCaCanBo: isAll,
      ...(!!watchValues?.sucChua && { sucChua: Number(watchValues?.sucChua) }),
      chuTri: donViChuTri,
      thanhPhanThamDu,
      thanhPhanNguoiThamDu: watchValues?.thanhPhanNguoiThamDu || [],
      thanhPhanThamDuKhac: watchValues?.thanhPhanThamDuKhac || '',
      ...(responseUploadTaiLieu?.length > 0 && {
        taiLieu: responseUploadTaiLieu,
      }),
      ...(responseUploadVanBan?.length > 0 && {
        vanBan: responseUploadVanBan,
      }),
    };

    let responseDangKy;
    if (dataDefault?._id) {
      responseDangKy = await updateLichTuan(dataDefault?._id, body);
    } else {
      responseDangKy = await dangKyLichTuan(body);
    }

    if (responseDangKy?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }

    setloadingSubmit(false);
  };

  const thanhPhanThamDuDefault =
    dataDefault?.thanhPhanThamDu?.map(item => item?.maDonVi) || [];

  const isLichCaNhan =
    watchValues?.loaiLich === LoaiDoiTuongChuTri.LANH_DAO ||
    watchValues?.loaiLich === LoaiDoiTuongChuTri.TRUONG_DON_VI;

  const DATA_LOAI_LICH = [
    ...(chucVuUser?.isBanGiamDoc
      ? [
          {
            label: 'Lịch Ban Giám đốc',
            value: LoaiDoiTuongChuTri.LANH_DAO,
          },
        ]
      : [
          {
            label: 'Lịch trưởng, phó, phụ trách đơn vị',
            value: LoaiDoiTuongChuTri.TRUONG_DON_VI,
          },
        ]),
    { label: 'Lịch chung', value: LoaiDoiTuongChuTri.CHUNG },
    { label: 'Lịch đơn vị', value: LoaiDoiTuongChuTri.DON_VI },
  ];

  if (loading) {
    return (
      <Box flex={1} backgroundColor="white">
        <HeaderReal
          title={
            dataDefault?._id
              ? translate('slink:Edit_meeting')
              : translate('slink:Create_meeting')
          }
        />
        <Box flex={1}>
          <LoadingComponent />
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor="white">
      <HeaderReal
        title={
          dataDefault?._id
            ? translate('slink:Edit_meeting')
            : translate('slink:Create_meeting')
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingTop: HEIGHT(24),
          paddingBottom: HEIGHT(30),
          paddingHorizontal: WIDTH(12),
        }}>
        <InputNBForm
          label={translate('slink:Work_detail')}
          placeholder={translate('slink:Work_detail')}
          required
          defaultValue={dataDefault?.noiDungCongViec}
          name={'noiDungCongViec'}
          textArea
          control={control}
          error={errors?.noiDungCongViec?.message}
        />
        <DatePickerForm
          isRequired
          defaultValue={dataDefault?.thoiGianBatDau}
          label={translate('slink:Time_start')}
          error={errors?.thoiGianBatDau?.message}
          mode="datetime"
          name={'thoiGianBatDau'}
          control={control}
        />
        <DatePickerForm
          isRequired
          label={translate('slink:Time_end')}
          error={errors?.thoiGianKetThuc?.message}
          defaultValue={dataDefault?.thoiGianKetThuc}
          mode="datetime"
          name={'thoiGianKetThuc'}
          control={control}
        />
        <SingleSelectForm
          label="Loại lịch"
          defaultValue={defaultLoaiLich}
          data={DATA_LOAI_LICH}
          name={'loaiLich'}
          control={control}
          error={errors?.loaiLich?.message}
          required
        />
        {watchValues?.loaiLich === LoaiDoiTuongChuTri.CHUNG && (
          <>
            <TextLabelTCNS isRequired label="Đơn vị thực hiện" />
            <MultiSelectForm
              defaultValue={
                dataDefault?.chuTri
                  ?.filter(item => item?.loaiChuTri === 'Đơn vị')
                  ?.map(item => item?.maDonVi) || []
              }
              label={translate('slink:Department')}
              data={listDonVi?.map(item => {
                return { label: item?.ten || '', value: item?.maDonVi };
              })}
              placeHolder="Chọn đơn vị"
              name={'chuTriPhongBan'}
              control={control}
            />
            <InputNBForm
              label="Khác"
              textArea
              defaultValue={
                dataDefault?.chuTri?.find(item => item?.loaiChuTri === 'Khác')
                  ?.ten
              }
              name={'chuTriKhac'}
              control={control}
              error={errors?.chuTriKhac?.message}
            />
          </>
        )}
        {watchValues?.loaiLich === LoaiDoiTuongChuTri.DON_VI && (
          <InputNBForm
            defaultValue={account?.donViChinh?.ten || ''}
            isDisabled
            label={translate('slink:Department')}
            name={'donVi'}
            control={control}
            error={undefined}
          />
        )}
        {isLichCaNhan && (
          <SingleSelectForm
            label={translate('slink:Ho_ten')}
            defaultValue={dataDefault?.chuTri?.[0]?.ssoId}
            data={listTruongPhong}
            name={'chuTri'}
            control={control}
            error={errors?.hoTen?.message}
          />
        )}
        {!isLichCaNhan && (
          <>
            <TextLabelTCNS isRequired label={translate('slink:Participants')} />
            <Checkbox
              my="2"
              isChecked={isAll}
              value={translate('slink:All_can_bo')}
              onChange={() => {
                setisAll(!isAll);
              }}>
              <Text maxWidth={WIDTH(343)} fontSize={'xs'}>
                {translate('slink:All_can_bo')}
              </Text>
            </Checkbox>
            {!isAll && (
              <>
                <MultiSelectForm
                  defaultValue={thanhPhanThamDuDefault}
                  label={translate('slink:Department')}
                  data={listDonVi?.map(item => {
                    return { label: item?.ten || '', value: item?.maDonVi };
                  })}
                  placeHolder="Chọn đơn vị"
                  name={'thanhPhanThamDu'}
                  control={control}
                />
                <NhanSuMultiSelect
                  defaultValue={dataDefault?.thanhPhanNguoiThamDu}
                  label={translate('slink:Personal')}
                  placeholder="Chọn cán bộ, giảng viên (tìm kiếm theo họ tên)"
                  name={'thanhPhanNguoiThamDu'}
                  control={control}
                />
                <InputNBForm
                  defaultValue={dataDefault?.thanhPhanThamDuKhac}
                  label="Khác"
                  textArea
                  placeholder={translate('slink:Participants_other')}
                  name={'thanhPhanThamDuKhac'}
                  control={control}
                  error={errors?.thanhPhanThamDuKhac?.message}
                />
              </>
            )}
          </>
        )}
        <TextLabelTCNS label={translate('slink:Document')} />
        <Checkbox
          my="2"
          isChecked={isPublishDoc}
          value={translate('slink:Publish')}
          onChange={() => {
            setisPublishDoc(!isPublishDoc);
          }}>
          <Text maxWidth={WIDTH(343)} fontSize={'xs'}>
            {translate('slink:Publish')}
          </Text>
        </Checkbox>
        <UploadFileForm
          label={translate('slink:Add_document')}
          name={'taiLieu'}
          control={control}
          error={errors?.taiLieu?.message}
          arrayFile={dataDefault?.taiLieu ?? []}
        />
        <TextLabelTCNS label={translate('slink:Location')} />
        <SingleSelectForm
          defaultValue={DON_VI?.[0]}
          data={DON_VI?.map(item => {
            return { label: item, value: item };
          })}
          name={'location'}
          control={control}
          error={errors?.location?.message}
          required
        />
        {watchValues?.location === DON_VI?.[0] ? (
          chucVuUser?.isBanGiamDoc ? (
            <SingleSelectForm
              label="Phòng họp"
              defaultValue={hasThietBiCNC}
              data={listPhong?.map(item => {
                return { label: item?.ten, value: item?._id };
              })}
              placeholder="Chọn phòng họp"
              name={'thietBiCNC'}
              control={control}
              error={errors?.thietBiCNC?.message}
            />
          ) : (
            <>
              <InputNBForm
                defaultValue={
                  dataDefault?.sucChua ? `${dataDefault?.sucChua}` : undefined
                }
                label="Sức chứa yêu cầu"
                placeholder="Nhập sức chứa yêu cầu"
                name={'sucChua'}
                type={EKieuDuLieu.NUMBER}
                control={control}
                error={errors?.sucChua?.message}
              />
              {/* <SingleSelectForm
                label="Thiết bị CNC"
                defaultValue={hasThietBiCNC}
                data={DATA_CNC?.map(item => {
                  return { label: item, value: item };
                })}
                name={'thietBiCNC'}
                control={control}
                error={errors?.thietBiCNC?.message}
              />
              {watchValues?.thietBiCNC === DATA_CNC[0] && (
                <InputNBForm
                  label="Tên thiết bị CNC"
                  defaultValue={dataDefault?.tenThietBiCNC}
                  name={'tenThietBiCNC'}
                  control={control}
                  error={errors?.tenThietBiCNC?.message}
                />
              )} */}
            </>
          )
        ) : (
          <InputNBForm
            label={translate('slink:Other_location')}
            defaultValue={dataDefault?.diaDiemKhac}
            placeholder={translate('slink:Enter_other_location')}
            name={'diaDiemKhac'}
            control={control}
            error={errors?.diaDiemKhac?.message}
          />
        )}
        <TextLabelTCNS label={translate('slink:Attach_doc')} />
        <UploadFileForm
          label={translate('slink:Add_attach_doc')}
          name={'vanBan'}
          control={control}
          error={errors?.vanBan?.message}
          arrayFile={dataDefault?.vanBan ?? []}
        />
        <TextLabelTCNS label={translate('slink:Other_notes')} />
        <InputNBForm
          defaultValue={dataDefault?.ghiChu}
          textArea
          placeholder={translate('slink:Other_notes_if_any')}
          name={'ghiChu'}
          control={control}
          error={errors?.ghiChu?.message}
        />
        <BaseButtonNB
          isLoading={loadingSubmit}
          isLoadingText={
            dataDefault?._id
              ? translate('slink:Updating')
              : translate('slink:Loading')
          }
          width={WIDTH(140)}
          title={
            dataDefault?._id ? translate('slink:Save') : translate('slink:Add')
          }
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default AddNewCalendar;
const transformValueChuTri = (
  loaiLich: string,
  value: any,
  account: AccountProps | null,
  watchValues: any,
  listDonVi: DonViProps[],
  listTruongPhong: any[],
) => {
  switch (loaiLich) {
    case LoaiDoiTuongChuTri.CHUNG:
      const donVi =
        watchValues?.chuTriPhongBan?.map((item: string) => {
          const findObj = listDonVi?.find(e => e.maDonVi === item);

          return {
            loaiChuTri: 'Đơn vị',
            maDonVi: item || '',
            ten: findObj?.ten || '',
          };
        }) || [];

      const chuTriKhac = !watchValues?.chuTriKhac
        ? []
        : [
            {
              id: -1,
              loaiChuTri: 'Khác',
              maDinhDanh: '',
              ten: watchValues?.chuTriKhac || '',
              tenDonVi: '',
              tenGoi: '',
            },
          ];

      return [...donVi, ...chuTriKhac];
    case LoaiDoiTuongChuTri.LANH_DAO: {
      return [
        {
          maDinhDanh: account?.maCanBo || '',
          maDonVi: account?.donViChinh?.maDonVi || '',
          ssoId: account?.ssoId || '',
          ten: account?.hoTen || '',
          tenDonVi: account?.donViChinh?.ten || '',
        },
      ];
    }

    case LoaiDoiTuongChuTri.DON_VI: {
      return [
        {
          maDonVi: account?.donViChinh?.maDonVi || '',
          ssoId: account?.donViChinh?.maDonVi || '',
          ten: account?.donViChinh?.ten || '',
          tenVietTat: '',
        },
      ];
    }

    case LoaiDoiTuongChuTri.TRUONG_DON_VI:
      const pickVal = listTruongPhong?.find(item => value === item?.ssoId);

      return [
        {
          maDinhDanh: pickVal?.maCanBo || '',
          maDonVi: pickVal?.donViChinh?.maDonVi || '',
          ssoId: pickVal?.ssoId || '',
          ten: pickVal?.hoTen || '',
          tenDonVi: pickVal?.donViChinh?.ten || '',
          tenVietTat: pickVal?.ten || '',
        },
      ];

    default:
      return [];
  }
};
