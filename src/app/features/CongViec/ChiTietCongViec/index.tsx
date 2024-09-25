/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import { EKieuDuLieu, popupOk, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import ItemLabel from '@components/Item/ItemLabel';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import MultiChoicesNB from '@components/QuyTrinhDong/component/MultiChoices';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import HeaderReal from '@libcomponents/header-real';
import { goBack, navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { raSoatTienDoCongViec, uploadDocument } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, FlatList, Pressable, ScrollView, Text } from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';

import styles from './styles';
enum ETrangThaiToChucCongViec {
  DA_HOAN_THANH = 'DA_HOAN_THANH',
  CHUA_THUC_HIEN = 'CHUA_THUC_HIEN',
  DANG_THUC_HIEN = 'DANG_THUC_HIEN',
}
const ChiTietCongViec = props => {
  const itemCongViec = props?.route?.params?.item;

  const onRefresh = props?.route?.params?.onRefresh;

  const [isEdit, setIsEdit] = useState(true);

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={
          isEdit ? translate('slink:Work_check') : translate('slink:Work_info')
        }
        childrenRight={
          <RightComponent
            editVisible={isEdit}
            onPress={() => setIsEdit(!isEdit)}
            itemCongViec={itemCongViec}
          />
        }
      />
      <ScrollView>
        {isEdit ? (
          <RaSoatCongViec itemCongViec={itemCongViec} onRefresh={onRefresh} />
        ) : (
          <Box width={WIDTH(343)} alignSelf="center">
            <ThongTinCongViec itemCongViec={itemCongViec} />
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};

export default ChiTietCongViec;
const RaSoatCongViec = ({ itemCongViec, onRefresh }: any) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const watchValues = watch();

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const defaultData = {
    tienDoCongViec: itemCongViec?.tienDoCongViec ?? '',
    urlsDinhKem: itemCongViec?.urlsDinhKem ?? [],
    ketLuanTienDo: itemCongViec?.ketLuanTienDo,
    thoiGianHoanThanh: itemCongViec?.thoiGianHoanThanh,
    thongTinYeuCauCanDat:
      itemCongViec?.thongTinYeuCauCanDat
        ?.filter(item => item?.mucDoHoanThanh === 'DA_HOAN_THANH')
        ?.map(item => item?._id) || [],
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (Number(watchValues?.tienDoCongViec) !== 100) {
      setValue('thoiGianHoanThanh', undefined);

      setValue('ketLuanTienDo', undefined);
    }
  }, [watchValues?.tienDoCongViec]);

  const initData = () => {
    const listId = [
      'tienDoCongViec',
      'urlsDinhKem',
      'ketLuanTienDo',
      'thoiGianHoanThanh',
      'thongTinYeuCauCanDat',
    ];

    listId?.forEach(id => setValue(id, defaultData?.[id]));
  };

  const onSubmit = async (data: any) => {
    setloadingSubmit(true);

    try {
      let resupload: any;
      if (data?.urlsDinhKem?.length !== 0) {
        if (data?.urlsDinhKem?.[0]?.type) {
          const file: any = await uploadDocument(data?.urlsDinhKem);

          resupload = [file?.[0]?.url];
        } else {
          resupload = data?.urlsDinhKem;
        }
      }

      const thongTinYeuCauCanDat =
        itemCongViec?.thongTinYeuCauCanDat?.map(itemTienDo => {
          return {
            mucDoHoanThanh: data?.thongTinYeuCauCanDat?.find(
              itemPick => itemPick === itemTienDo?._id,
            )
              ? 'DA_HOAN_THANH'
              : 'KHONG_HOAN_THANH',
            yeuCauCanDat: itemTienDo?.yeuCauCanDat,
          };
        }) ?? [];

      const body = {
        ghiChu: data?.ghiChu ?? '',
        ketLuanTienDo: data?.ketLuanTienDo,
        thoiGianHoanThanh: data?.thoiGianHoanThanh,
        tienDoCongViec: data?.tienDoCongViec ? Number(data?.tienDoCongViec) : 0,
        trangThaiCongViec:
          Number(data?.tienDoCongViec) === 100
            ? ETrangThaiToChucCongViec?.DA_HOAN_THANH
            : ETrangThaiToChucCongViec.DANG_THUC_HIEN,
        trangThaiTienDoCongViec: data?.trangThaiTienDoCongViec,
        urlsDinhKem: resupload ?? [],
        thongTinYeuCauCanDat: thongTinYeuCauCanDat,
        ...(data?.trangThaiTienDoCongViec === 'CHAM_TIEN_DO' && {
          soNgayChamTienDo: data?.soNgayChamTienDo
            ? Number(data?.soNgayChamTienDo)
            : 0,
        }),
      };

      const res = await raSoatTienDoCongViec(itemCongViec?._id, body);

      setloadingSubmit(false);

      if (res?.success) {
        onRefresh && onRefresh();

        setTimeout(goBack, 500);
      }
    } catch (error) {
      popupOk(translate('slink:Notice_t'), translate('slink:Da_co_loi_xay_ra'));

      setloadingSubmit(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.content}>
      <Text
        flex={1}
        mb={'1'}
        fontFamily={R.fonts.BeVietnamProSemiBold}
        fontSize={'sm'}
        color={'black'}>
        Cập nhật thực hiện công việc
      </Text>
      <InputNBForm
        label={translate('slink:Work_percent')}
        type={EKieuDuLieu.NUMBER}
        defaultValue={String(defaultData?.tienDoCongViec)}
        name={'tienDoCongViec'}
        control={control}
        error={errors?.tienDoCongViec?.message}
        required
        min={0}
        max={100}
      />
      <SingleSelectForm
        label={translate('slink:Work_progress')}
        data={[
          {
            label: 'Đúng tiến độ',
            value: 'DUNG_TIEN_DO',
          },
          {
            label: 'Chậm tiến độ',
            value: 'CHAM_TIEN_DO',
          },
        ]}
        name={'trangThaiTienDoCongViec'}
        control={control}
        error={errors?.trangThaiTienDoCongViec?.message}
        required
      />
      {watchValues?.trangThaiTienDoCongViec === 'CHAM_TIEN_DO' && (
        <InputNBForm
          label={translate('slink:Day_delay')}
          type={EKieuDuLieu.NUMBER}
          name={'soNgayChamTienDo'}
          control={control}
          error={errors?.soNgayChamTienDo?.message}
          required
        />
      )}

      <UploadFileForm
        name={'urlsDinhKem'}
        arrayFile={defaultData?.urlsDinhKem ? defaultData?.urlsDinhKem : []}
        singleType
        error={errors?.urlsDinhKem?.message}
        control={control}
        label={translate('slink:File')}
      />
      <InputNBForm
        label={translate('slink:Note')}
        textArea
        name={'ghiChu'}
        control={control}
        error={errors?.ghiChu?.message}
      />
      <Text
        flex={1}
        my={'1'}
        fontFamily={R.fonts.BeVietnamProSemiBold}
        fontSize={'sm'}
        color={'black'}>
        Đánh giá kết quả hoàn thành công việc
      </Text>
      <DatePickerForm
        label={translate('slink:Time_done')}
        defaultValue={
          Number(watchValues?.tienDoCongViec) === 100
            ? watchValues?.thoiGianHoanThanh
            : undefined
        }
        error={errors?.ngayQĐ?.message}
        mode="date"
        name={'thoiGianHoanThanh'}
        control={control}
        isRequired={
          watchValues?.tienDoCongViec !== undefined &&
          Number(watchValues?.tienDoCongViec) >= 100
        }
        isDisabled={
          watchValues?.tienDoCongViec === undefined ||
          Number(watchValues?.tienDoCongViec) < 100
        }
      />
      <Controller
        name={'thongTinYeuCauCanDat'}
        control={control}
        render={({ field }) => {
          return (
            <MultiChoicesNB
              defaultValue={
                itemCongViec?.thongTinYeuCauCanDat
                  ?.filter(item => item?.mucDoHoanThanh === 'DA_HOAN_THANH')
                  ?.map(item => item?._id) || []
              }
              label={translate('slink:Percent_done')}
              data={itemCongViec?.thongTinYeuCauCanDat?.map(item => {
                return { label: item?.yeuCauCanDat || '', value: item?._id };
              })}
              onChangeValue={field?.onChange}
            />
          );
        }}
      />
      <InputNBForm
        label={translate('slink:Conclude')}
        textArea
        defaultValue={
          Number(watchValues?.tienDoCongViec) === 100
            ? defaultData?.ketLuanTienDo
            : ' '
        }
        name={'ketLuanTienDo'}
        control={control}
        error={errors?.ketLuanTienDo?.message}
        isDisabled={
          watchValues?.tienDoCongViec === undefined ||
          Number(watchValues?.tienDoCongViec) < 100
        }
      />
      <BaseButtonNB
        isLoading={loadingSubmit}
        isLoadingText={translate('slink:Loading')}
        width={WIDTH(140)}
        title={translate('slink:Save_work')}
        onPress={handleSubmit(onSubmit)}
      />
    </KeyboardAwareScrollView>
  );
};

const ThongTinCongViec = ({ itemCongViec }: any) => {
  const data = [
    {
      label: 'Mã hoạt động',
      value: itemCongViec?.keHoachHoatDongNam?.keHoachNam?.maHoatDong,
    },
    {
      label: 'Tên hoạt động theo Kế hoạch năm',
      value: itemCongViec?.keHoachHoatDongNam?.keHoachNam?.noiDung,
    },
    {
      label: 'Tên hoạt động thực tế',
      value: itemCongViec?.keHoachHoatDongNam?.ten,
    },
    {
      label: 'Tên công việc',
      value: itemCongViec?.ten,
    },
    {
      label: 'Cá nhân phụ trách',
      value: itemCongViec?.caNhanPhuTrach?.ten,
    },
    {
      label: 'Đơn vị đầu mối',
      value: itemCongViec?.donViDauMoi?.tenDonVi,
    },
    {
      label: 'Đơn vị phối hợp',
      value:
        itemCongViec?.donViPhoiHop && itemCongViec?.donViPhoiHop?.length !== 0
          ? itemCongViec?.donViPhoiHop
              ?.map(item => {
                return item?.tenDonVi ?? '--';
              })
              ?.join(', ')
          : '--',
    },
    {
      label: 'Cá nhân phối hợp',
      value:
        itemCongViec?.caNhanPhoiHop && itemCongViec?.caNhanPhoiHop?.length !== 0
          ? itemCongViec?.caNhanPhoiHop
              ?.map(item => {
                return item?.ten ?? '--';
              })
              ?.join(', ')
          : '--',
    },
    {
      label: 'Thời gian bắt đầu',
      value: itemCongViec?.thoiGianBatDau
        ? moment(itemCongViec?.thoiGianBatDau)?.format('DD/MM/YYYY')
        : '--',
    },
    {
      label: 'Thời gian kết thúc',
      value: itemCongViec?.thoiGianKetThuc
        ? moment(itemCongViec?.thoiGianKetThuc)?.format('DD/MM/YYYY')
        : '--',
    },
    {
      label: 'Yêu cầu, kết quả chính cần đạt',
      value:
        itemCongViec?.thongTinYeuCauCanDat &&
        itemCongViec?.thongTinYeuCauCanDat?.length !== 0
          ? itemCongViec?.thongTinYeuCauCanDat
              ?.map(item => {
                return item?.yeuCauCanDat ?? '--';
              })
              ?.join(', ')
          : '--',
      isLast: true,
    },
  ];

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <ItemLabel
          label={item?.label}
          value={item?.value}
          numberOfLines={10}
          isLast={item?.isLast ?? false}
        />
      )}
    />
  );
};

const RightComponent = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onPress, editVisible, itemCongViec } = props;

  const onNavigateLichSu = () => {
    navigateScreen(APP_SCREEN.LICHSUTIENDOCONGVIEC, {
      item: itemCongViec,
    });
  };

  // const listFunction = editVisible
  //   ? [
  //       { title: 'Chi tiết công việc', onPress: onPress },
  //       { title: 'Lịch sử công việc', onPress: onNavigateLichSu },
  //     ]
  //   : [
  //       { title: 'Rà soát công việc', onPress: onPress },
  //       { title: 'Lịch sử công việc', onPress: onNavigateLichSu },
  //     ];

  // return <MenuComponent listFunction={listFunction} />;
  return (
    <Pressable onPress={onNavigateLichSu}>
      <Octicons name={'history'} size={WIDTH(16)} color={'white'} />
    </Pressable>
  );
};
