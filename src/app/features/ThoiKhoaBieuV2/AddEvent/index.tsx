/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { View } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { DVMC_TYPE, HEIGHT, popupCancel, popupOk, WIDTH } from '@common';
import DynamicForm from '@components/DynamicForm';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import { deleteSuKien, postTaoMoiSuKien, putSuKien } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import styles from './styles';
import BaseButtonNB from '@components/BaseButtonNB';

const AddEventCalendar = (props: any) => {
  const onRefresh = props?.route?.params?.onRefresh;

  const dataInit = props?.route?.params?.item;

  const xemChiTiet = props?.route?.params?.xemChiTiet;

  const [loading, setloading] = useState(false);

  const listTitle = () => {
    return [
      {
        type: DVMC_TYPE.TEXT_INPUT,
        disabled: xemChiTiet ?? false,
        isRequired: true,
        value: dataInit?.tenSuKien ?? '',
        label: 'Tên sự kiện',
        _id: 'tenSuKien',
      },
      {
        type: DVMC_TYPE.TEXT_INPUT,
        disabled: xemChiTiet ?? false,
        value: dataInit?.diaDiem ?? '',
        label: translate('slink:Location'),
        _id: 'diaDiem',
        isLast: true,
      },
    ];
  };
  let currentDate = new Date();

  // Thêm 30 phút vào thời gian hiện tại
  currentDate.setMinutes(currentDate.getMinutes() + 30);

  const listTime = () => {
    return [
      {
        type: DVMC_TYPE.DATE_TIME_PICKER,
        disabled: xemChiTiet ?? false,
        isRequired: true,
        label: 'Bắt đầu',
        value: dataInit?.thoiGianBatDau ?? new Date(),
        _id: 'batDau',
      },
      {
        type: DVMC_TYPE.DATE_TIME_PICKER,
        disabled: xemChiTiet ?? false,
        isRequired: true,
        label: 'Kết thúc',
        value: dataInit?.thoiGianKetThuc ?? currentDate,
        _id: 'ketThuc',
        isLast: true,
      },
    ];
  };

  const listGhiChu = () => {
    return [
      {
        type: DVMC_TYPE.TEXT_AREA,
        disabled: xemChiTiet ?? false,
        label: translate('slink:Note'),
        value: dataInit?.ghiChu ?? '',
        _id: 'ghiChu',
        isLast: true,
      },
    ];
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (body: any) => {
    setloading(true);

    try {
      const res = dataInit
        ? await putSuKien(dataInit?._id, body)
        : await postTaoMoiSuKien(body);

      setloading(false);

      if (res?.status) {
        onRefresh && onRefresh();

        setTimeout(() => {
          goBack();
        }, 500);
      }
    } catch (error) {
      setloading(false);
    }
  };

  const onDel = () => {
    popupCancel(
      translate('slink:Notice_t'),
      translate('slink:Confirm_delete'),
      () => {
        delSuKien();
      },
    );
  };

  const delSuKien = async () => {
    try {
      setloading(true);

      const res = await deleteSuKien(dataInit?._id);

      if (res?.status) {
        onRefresh && onRefresh();

        setTimeout(goBack, 500);
      }

      setloading(false);
    } catch (error) {}
  };

  const onSubmit = (data: any) => {
    if (data?.batDau > data?.ketThuc) {
      popupOk(
        translate('slink:Notice_t'),
        translate('slink:Time_end_greater_time_start'),
      );

      return;
    }

    const content = {
      thoiGianBatDau: data?.batDau,
      thoiGianKetThuc: data?.ketThuc,
      tenSuKien: data?.tenSuKien?.trim() ?? '',
      diaDiem: data?.diaDiem?.trim() ?? '',
      ghiChu: data?.ghiChu?.trim() ?? '',
      loaiSuKien: 'Cá nhân',
    };

    popupCancel(
      translate('slink:Notice_t'),
      dataInit
        ? translate('slink:Confirm_edit_event')
        : translate('slink:Do_you_want_to_add_this_event'),
      () => {
        submit(content);
      },
    );
  };

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Personal_event')} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.content}>
        <DynamicForm
          errors={errors}
          control={control}
          style={{ marginBottom: HEIGHT(24) }}
          formInput={listTitle()}
        />
        <DynamicForm
          errors={errors}
          control={control}
          style={{ marginBottom: HEIGHT(24) }}
          formInput={listTime()}
        />
        <DynamicForm
          errors={errors}
          control={control}
          formInput={listGhiChu()}
        />
        <BaseButtonNB
          isLoading={loading}
          isLoadingText={translate('slink:Loading')}
          width={WIDTH(140)}
          title={
            xemChiTiet ? translate('slink:Delete') : translate('slink:Save')
          }
          onPress={xemChiTiet ? onDel : handleSubmit(onSubmit)}
        />
      </KeyboardAwareScrollView>
      <LoadingComponent loading={loading} />
    </View>
  );
};

export default AddEventCalendar;
