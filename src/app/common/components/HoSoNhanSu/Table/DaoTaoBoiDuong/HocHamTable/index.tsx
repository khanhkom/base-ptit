/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import BaseButtonNB from '@components/BaseButtonNB';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import { EKieuDuLieu } from '@config/constant';
import { HEIGHT, popupOk, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import {
  delHocHam,
  postHocHam,
  putHocHam,
  uploadDocument,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import BtnXoa from '../../BtnXoa/BtnXoa';

const HocHamTable = props => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const thongTinNhanSuId = props?.route?.params?.idUser;

  const onRefresh = props?.route?.params?.onRefresh;

  const defaultData = props?.route?.params?.item;

  const [loadingSubmit, setloadingSubmit] = useState(false);

  useEffect(() => {
    if (defaultData) {
      initData();
    }
  }, []);

  const initData = () => {
    const listId = [
      'noiDung',
      'ngayCoHieuLuc',
      'ngayQĐ',
      'danhHieu',
      'nam',
      'soQĐ',
      'loaiQuyetDinh',
    ];

    listId?.forEach(id => setValue(id, defaultData?.[id]));
  };

  const onSubmit = async (data: any) => {
    setloadingSubmit(true);

    try {
      let resupload: any;
      if (data?.fileDinhKem?.length !== 0) {
        if (data?.fileDinhKem?.[0]?.type) {
          resupload = await uploadDocument(data?.fileDinhKem);
        } else {
          resupload = data?.fileDinhKem;
        }
      }

      const body = {
        ...(data?.nam && {
          nam: Number(data?.nam),
        }),
        ...(data?.danhHieu && {
          danhHieu: data?.danhHieu,
        }),
        loaiQuyetDinh: data?.loaiQuyetDinh || null,
        ngayCoHieuLuc: data?.ngayCoHieuLuc || null,
        ngayQĐ: data?.ngayQĐ || null,
        noiDung: data?.noiDung || null,
        soQĐ: data?.soQĐ || null,
        thongTinNhanSuId,
        ...(resupload?.[0]?.url && { fileDinhKem: resupload?.[0]?.url }),
      };

      let res: any;
      if (defaultData?._id) {
        res = await putHocHam(body, defaultData?._id);
      } else {
        res = await postHocHam(body);
      }

      setloadingSubmit(false);

      if (res?.status) {
        onRefresh && onRefresh();

        setTimeout(goBack, 500);
      }
    } catch (error) {
      popupOk(translate('slink:Notice_t'), translate('slink:Da_co_loi_xay_ra'));

      setloadingSubmit(false);
    }
  };

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delHocHam(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title="Học hàm"
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <SingleSelectForm
          label="Danh hiệu"
          defaultValue={defaultData?.danhHieu}
          data={[
            {
              label: 'Giáo sư',
              value: 'Giáo sư',
            },
            {
              label: 'Phó giáo sư',
              value: 'Phó giáo sư',
            },
          ]}
          name={'danhHieu'}
          control={control}
          error={errors?.danhHieu?.message}
          required
        />
        <InputNBForm
          label="Năm đạt được"
          type={EKieuDuLieu.NUMBER}
          defaultValue={defaultData?.nam ? `${defaultData?.nam}` : undefined}
          name={'nam'}
          control={control}
          error={errors?.nam?.message}
        />
        <InputNBForm
          label="Số quyết định"
          type={EKieuDuLieu.TEXT}
          defaultValue={defaultData?.soQĐ}
          name={'soQĐ'}
          control={control}
          error={errors?.soQĐ?.message}
        />
        <InputNBForm
          label={translate('slink:Type_of_decision')}
          type={EKieuDuLieu.TEXT}
          defaultValue={defaultData?.loaiQuyetDinh}
          name={'loaiQuyetDinh'}
          control={control}
          error={errors?.loaiQuyetDinh?.message}
        />
        <DatePickerForm
          label={translate('slink:Decision_date')}
          defaultValue={defaultData?.ngayQĐ}
          error={errors?.ngayQĐ?.message}
          mode="date"
          name={'ngayQĐ'}
          control={control}
        />
        <DatePickerForm
          defaultValue={defaultData?.ngayCoHieuLuc}
          label={translate('hoSoNhanSu:ngayCoHieuLuc')}
          error={errors?.ngayCoHieuLuc?.message}
          mode="date"
          name={'ngayCoHieuLuc'}
          control={control}
        />
        <UploadFileForm
          name={'fileDinhKem'}
          arrayFile={
            defaultData?.fileDinhKem ? [{ url: defaultData?.fileDinhKem }] : []
          }
          singleType
          error={errors?.fileDinhKem?.message}
          control={control}
          label={translate('hoSoNhanSu:fileDinhKem')}
        />
        <InputNBForm
          label={translate('slink:Content')}
          textArea
          defaultValue={defaultData?.noiDung}
          name={'noiDung'}
          control={control}
          error={errors?.noiDung?.message}
        />
        <BaseButtonNB
          isLoading={loadingSubmit}
          isLoadingText={translate('slink:Loading')}
          width={WIDTH(140)}
          title={
            defaultData ? translate('slink:Update') : translate('slink:Add')
          }
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default HocHamTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
