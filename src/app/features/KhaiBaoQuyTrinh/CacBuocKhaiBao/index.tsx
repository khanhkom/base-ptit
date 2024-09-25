/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inline-comments */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Control, Controller, FieldValues, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import {
  CallRatingApp,
  dispatch,
  EDoiTuongDieuPhoi,
  EKieuDuLieu,
  ETrangThaiTT,
  filterObject,
  getStatusPaymentColorByValue,
  getWidth,
  HEIGHT,
  MapColorTrangThaiTiepNhanDon,
  popupOk,
  showToastError,
  TrangThaiTiepNhanDon,
  TrangThaiTT,
  WIDTH,
} from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import ItemLabel from '@components/Item/ItemLabel';
import TextLink from '@components/Item/TextLink';
import QuyTrinhDong from '@components/QuyTrinhDong';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import { DEFAULT_MOST_USED_FUNCTION_LIST_SV } from '@config/module';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack, navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getChiTietOne, uploadDocument } from '@networking/user';
import {
  updateQuyTrinh,
  validateQuyTrinh,
} from '@networking/user/KhaiBaoQuyTrinh';
import {
  getDanhMucQLQT,
  getThongTinChinhSuaDonHanhChinh,
  getThongTinMacDinhDonHanhChinh,
} from '@networking/user/QuanLyKhoaHoc';
import { appActions } from '@redux-slice';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import { Badge, Box, FlatList, Pressable, VStack } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

import ModalCacBuocXuLy from '../component/ModalCacBuocXuLy';
import PreviewQuyTrinh from '../component/PreviewQuyTrinh';
import {
  BoPhanProp,
  CauHinhLoaiHinhProps,
  DanhSachBuocXuLy,
  DSKhaiBaoProps,
  LichSuKhaiBaoProps,
} from '../type';
interface Props {
  route: {
    params: {
      data?: DSKhaiBaoProps;
      banGhiDon: LichSuKhaiBaoProps;
      onIndexChange?: (e: number) => void;
      refreshLichSu?: () => void;
    };
  };
}
const keyBoPhan = 'boPhanId';

const CacBuocKhaiBao = (props: Props) => {
  const banGhiDon = props?.route?.params?.banGhiDon;

  const data = props?.route?.params?.data || banGhiDon?.quyTrinh;

  const refreshing = props?.route?.params?.refreshLichSu;

  const onIndexChange = props?.route?.params?.onIndexChange;

  useEffect(() => {
    getDanhMuc();

    getDefaultValue();

    getFormDataInit();
  }, []);

  const getDefaultValue = async () => {
    setloadingForm(true);

    const res: any = await getThongTinMacDinhDonHanhChinh(
      banGhiDon?.quyTrinhId,
      formKhaiBao?.ma,
    );

    setDefaultValue(res?.data?.data);

    setloadingForm(false);
  };

  const getFormDataInit = async () => {
    setloadingForm(true);

    const res: any = await getThongTinChinhSuaDonHanhChinh(banGhiDon?._id);

    const maCurBuocXuLy = res?.data?.data?.danhSachBuocXuLy?.find(
      (item: DanhSachBuocXuLy) => item?.laBuocHienTai === true,
    )?.maFormKhaiBao;

    if (maCurBuocXuLy) {
      const thongTinKhaiBao = res?.data?.data?.danhSachKhaiBao?.find(
        item => item?.ma === maCurBuocXuLy,
      )?.thongTinKhaiBao;

      setFormInitData(thongTinKhaiBao);
    }

    setloadingForm(false);
  };

  const getDanhMuc = async () => {
    const responseDanhMuc = await getDanhMucQLQT(banGhiDon?._id);

    dispatch(appActions.setdanhMucNCKH(responseDanhMuc?.data?.data ?? []));
  };

  const [visible, setvisible] = useState(false);

  const [loading, setloading] = useState(false);

  const [loadingForm, setloadingForm] = useState(false);

  const [defaultValue, setDefaultValue] = useState({}); //Thông tin cơ bản

  const [formInitData, setFormInitData] = useState({}); //Thông tin đơn chỉnh sửa

  const index = banGhiDon?.danhSachBuocXuLy?.findIndex(
    item => item?.laBuocHienTai,
  );

  const [indexBuocXuLy, setindexBuocXuLy] = useState(index > 0 ? index : 0);

  const cacBuocXuLy = data
    ? data?.danhSachBuocXuLy?.map((obj: DanhSachBuocXuLy) => {
        const objBanGhi = banGhiDon?.danhSachBuocXuLy?.find(
          e => e.ma === obj.ma,
        );

        return objBanGhi ? { ...obj, ...objBanGhi } : obj;
      })
    : banGhiDon?.danhSachBuocXuLy;

  const {
    control,
    handleSubmit,
    unregister,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onvalidateData = async (formValue: any) => {
    try {
      if (buocXuLyCurrent?.cauHinhValidateDon?.isValidate) {
        const bodyValidate: any = {
          info: formValue,
          maBuoc: buocXuLyCurrent?.ma,
          quyTrinhId: banGhiDon?.quyTrinhId,
        };

        const responseValidate = await validateQuyTrinh(bodyValidate);

        if (responseValidate?.data?.data?.allowed) {
          handleSubmitData(formValue);
        } else {
          popupOk(
            translate('slink:Notice_t'),
            responseValidate?.data?.data?.reason ??
              translate('slink:Don_khong_hop_le'),
          );
        }
      } else {
        handleSubmitData(formValue);
      }
    } catch (error) {}
  };

  const handleSubmitData = async (formValue: any) => {
    let valueFile: string[] = [];
    const filterIDFileHasValue =
      listIDFile?.filter((item: CauHinhLoaiHinhProps) => {
        return formValue?.[item?.ma]?.length > 0;
      }) ?? [];

    if (listIDFile?.length > 0) {
      const listValue = filterIDFileHasValue?.map(
        async (e: CauHinhLoaiHinhProps) => {
          const res = await uploadDocument(formValue?.[e?.ma]);

          const listFile = res?.map((file: any) => file?.url);

          return { id: e.ma, value: listFile };
        },
      );

      valueFile = await Promise.all(listValue);
    }

    setloading(true);

    const dataKhaiBao = {
      ...filterObject(formValue, listIDKhaiBao),
      ...(valueFile?.length !== 0 && arrayToObj(valueFile)),
    };

    const thongTinKhaiBao = Object.fromEntries(
      Object.entries(dataKhaiBao).map(([key, value]) => {
        const newValue = { value };

        return [key, newValue];
      }),
    );

    const body = {
      ...(visibleDieuPhoi && { maBoPhanXuLy: formValue?.[keyBoPhan] }),
      thongTinKhaiBao,
    };

    const responseSubmit = await updateQuyTrinh(
      banGhiDon?._id,
      buocXuLyCurrent?.ma,
      body,
    );

    if (responseSubmit?.status) {
      trackEvent(MixPanelEvent.SU_DUNG_DICH_VU_HANH_CHINH);

      setTimeout(() => {
        goBack();

        onIndexChange?.(1); // Chuyển sang tab Lịch sử sau khi gửi đơn thành công

        refreshing && refreshing(); // reload lại lịch sử sau khi sửa

        setTimeout(() => {
          CallRatingApp();
        }, 1000);
      }, 500);
    }

    setloading(false);
  };

  const buocXuLyCurrent = cacBuocXuLy?.[indexBuocXuLy];

  const boPhanXuLy = data?.danhSachBoPhanXuLy?.find(
    item => item?.ma === buocXuLyCurrent?.maBoPhanXuLy,
  );

  const formKhaiBao: any =
    data?.danhSachFormKhaiBao?.find(
      obj => obj?.ma === buocXuLyCurrent?.maFormKhaiBao,
    ) ?? [];

  const listIDKhaiBao = formKhaiBao?.cauHinhLoaiHinh?.map(
    (item: CauHinhLoaiHinhProps) => item?.ma,
  );

  const visibleDieuPhoi =
    buocXuLyCurrent?.doiTuongDieuPhoi === EDoiTuongDieuPhoi.NGUOI_CU_THE;

  const listIDFile = formKhaiBao?.cauHinhLoaiHinh?.filter?.(
    item => item?.kieuDuLieu === EKieuDuLieu.FILE,
  );

  if (loadingForm) {
    return (
      <Box backgroundColor={R.colors.white} style={styles.container}>
        <HeaderReal
          title={data?.ten || translate('slink:Administrative_service')}
        />
        <LoadingComponent loading={loadingForm} />
      </Box>
    );
  }

  return (
    <Box backgroundColor={R.colors.white} style={styles.container}>
      <HeaderReal
        childrenRight={<ChildrenRight onPress={() => setvisible(true)} />}
        title={data?.ten || translate('slink:Administrative_service')}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <ViewHeader
          giaiDoan={buocXuLyCurrent?.ten}
          trangThaiTiepNhan={buocXuLyCurrent?.trangThaiTiepNhan}
          boPhanXuLy={boPhanXuLy?.ten ?? ''}
          ghiChu={buocXuLyCurrent?.ghiChu ?? data?.ghiChu}
          trangThaiThanhToan={banGhiDon?.trangThaiThanhToan}
          identityCode={banGhiDon?.identityCode}
        />
        {buocXuLyCurrent?.coKhaiBao &&
        buocXuLyCurrent?.trangThaiTiepNhan !==
          TrangThaiTiepNhanDon.CHINH_SUA_LAI &&
        buocXuLyCurrent?.trangThaiTiepNhan !== TrangThaiTiepNhanDon.CHUA_CO ? (
          <PreviewQuyTrinh buocHienTai={buocXuLyCurrent} data={banGhiDon} />
        ) : (
          <QuyTrinhDong
            defaultValue={defaultValue}
            formData={formInitData}
            control={control}
            watch={watch}
            setValue={setValue}
            invisible
            unregister={unregister}
            errors={errors}
            children={
              <>
                <BoPhanXuLy
                  visible={visibleDieuPhoi}
                  errors={errors}
                  control={control}
                  dsBoPhan={data?.danhSachBoPhanXuLy}
                />
                <BaseButtonNB
                  width={WIDTH(140)}
                  isLoading={loading}
                  isLoadingText={translate('slink:Sending')}
                  title={translate('slink:Declare')}
                  onPress={handleSubmit(onvalidateData)}
                />
              </>
            }
            formKhaiBao={formKhaiBao?.cauHinhLoaiHinh}
          />
        )}
      </KeyboardAwareScrollView>
      <ModalCacBuocXuLy
        buocHienTai={index}
        onChangeIndex={setindexBuocXuLy}
        cacBuocXuLy={cacBuocXuLy}
        modalVisible={visible}
        turnOffModel={() => setvisible(false)}
      />
    </Box>
  );
};

export default CacBuocKhaiBao;
const ChildrenRight = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      _pressed={R.themes.pressed}
      hitSlop={R.themes.hitSlop}>
      <MaterialCommunityIcons
        name={'format-list-numbered'}
        size={WIDTH(24)}
        color={R.colors.white}
      />
    </Pressable>
  );
};

interface BoPhanXuLyProps {
  errors?: any;
  visible: boolean;
  dsBoPhan: BoPhanProp[];
  control?: Control<FieldValues, any> | undefined;
}
const BoPhanXuLy = (props: BoPhanXuLyProps) => {
  const { dsBoPhan, control, errors, visible } = props;

  if (!visible) {
    return null;
  }

  const data = dsBoPhan?.map((item: BoPhanProp) => {
    return { label: item?.ten, value: item?.ma };
  });

  return (
    <Box width={WIDTH(343)} alignSelf="center">
      <Controller
        name={keyBoPhan}
        control={control}
        rules={{ required: translate('slink:Required') }} // Quy tắc kiểm tra
        render={({ field }) => {
          return (
            <SingleSelect
              error={errors?.[keyBoPhan]?.message}
              required
              onChangeValue={field.onChange}
              data={data}
              placeholder={translate('slink:Select_processing_unit')}
              label={translate('slink:Processing_unit')}
            />
          );
        }}
      />
    </Box>
  );
};

const ViewHeader = ({
  trangThaiTiepNhan,
  boPhanXuLy,
  giaiDoan,
  ghiChu,
  trangThaiThanhToan,
  identityCode,
}: {
  trangThaiTiepNhan: TrangThaiTiepNhanDon;
  boPhanXuLy: string;
  giaiDoan: string;
  ghiChu: string;
  trangThaiThanhToan: ETrangThaiTT;
  identityCode: string;
}) => {
  const visibleThanhToan =
    DEFAULT_MOST_USED_FUNCTION_LIST_SV?.includes(translate('slink:Debt')) &&
    [ETrangThaiTT.OPEN, ETrangThaiTT.OVERPAID]?.includes(trangThaiThanhToan);

  const onPress = async () => {
    if (identityCode) {
      try {
        const response = await getChiTietOne(identityCode);

        if (response?.status) {
          navigateScreen(APP_SCREEN.CHITIETCONGNO, {
            itemInfo: response?.data?.data,
            onRefreshList: () => null,
          });
        }
      } catch (error) {}
    } else {
      showToastError(translate('slink:Da_co_loi_xay_ra'));
    }
  };

  const listData = [
    {
      label: 'Giai đoạn',
      value: giaiDoan || translate('slink:Chua_cap_nhat'),
      multiLine: giaiDoan?.length > 40,
    },
    {
      label: translate('slink:Status'),
      value: (
        <Badge
          colorScheme={
            MapColorTrangThaiTiepNhanDon?.[
              trangThaiTiepNhan
                ? trangThaiTiepNhan
                : translate('slink:Chua_cap_nhat')
            ]
          }>
          {trangThaiTiepNhan
            ? trangThaiTiepNhan
            : translate('slink:Chua_cap_nhat')}
        </Badge>
      ),
      badge: trangThaiTiepNhan ? true : false,
    },
    ...(boPhanXuLy
      ? [{ label: translate('slink:Processing_unit'), value: boPhanXuLy || '' }]
      : []),
    ...(ghiChu
      ? [
          {
            label: translate('slink:Note'),
            value: ghiChu || '',
            multiLine: ghiChu?.length > 40,
            typeHtml: true,
          },
        ]
      : []),
    ...(trangThaiThanhToan
      ? [
          {
            label: translate('slink:Status'),
            value: (
              <VStack alignItems={'flex-end'}>
                <Badge
                  colorScheme={getStatusPaymentColorByValue(
                    TrangThaiTT?.[trangThaiThanhToan],
                  )}>
                  {TrangThaiTT?.[trangThaiThanhToan]}
                </Badge>
                {visibleThanhToan && (
                  <TextLink mt="2" onPress={onPress} label="Thanh toán ngay" />
                )}
              </VStack>
            ),
            badge: !!trangThaiThanhToan,
          },
        ]
      : []),
  ];

  return (
    <Box
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      width={getWidth()}
      backgroundColor={R.colors.white}
      marginBottom={HEIGHT(24)}
      style={{ ...R.themes.shadowOffset }}
      alignSelf="center">
      <FlatList
        data={listData}
        key={'ghiChu'}
        renderItem={({ item, index }) => {
          return (
            <ItemLabel
              label={item?.label}
              value={item?.value}
              isLast={index === listData?.length - 1}
              multiLine={item?.multiLine}
              badge={item?.badge}
              typeHTML={item?.typeHtml && !!item?.value}
            />
          );
        }}
      />
    </Box>
  );
};

function arrayToObj(arr) {
  return arr.reduce((result, item) => {
    result[item.id] = item.value;

    return result;
  }, {});
}
