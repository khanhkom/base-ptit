/* eslint-disable no-inline-comments */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import BaseButtonNB from '@components/BaseButtonNB';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import MultiChoiceForm from '@components/QuyTrinhDong/component/MultiChoices/MultiChoiceForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import {
  EKieuDuLieu,
  MOI_QUAN_HE_VO,
  MONTH_OPTIONS_NS,
} from '@config/constant';
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import {
  delQuanHeVoChong,
  postQuanHeVoChong,
  putQuanHeVoChong,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import BtnXoa from '../../BtnXoa/BtnXoa';

const GiaDinhVoTable = props => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const watchValues = watch();

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const thongTinNhanSuId = props?.route?.params?.idUser;

  const onRefresh = props?.route?.params?.onRefresh;

  const defaultData = props?.route?.params?.item;

  useEffect(() => {
    if (defaultData) {
      initData();
    }
  }, []);

  const initData = () => {
    setValue('hoVaTen', defaultData?.hoVaTen);

    setValue('namSinh', defaultData?.namSinh);

    setValue('thangSinh', defaultData?.thangSinh);

    setValue('ngaySinh', defaultData?.ngaySinh);

    setValue('moiQuanHe', defaultData?.moiQuanHe);

    setValue('ngheNghiep', defaultData?.ngheNghiep);

    setValue('noiCongTac', defaultData?.noiCongTac);

    setValue('noiDung', defaultData?.noiDung);

    setValue(
      'nguoiPhuThuoc',
      defaultData?.defaultData?.nguoiPhuThuoc ? ['Người phụ thuộc'] : [],
    );
  };

  const onSubmit = async (data: any) => {
    setloadingSubmit(true);

    const body = {
      hoVaTen: data?.hoVaTen || null,
      moiQuanHe: data?.moiQuanHe || null,
      ...(data?.namSinh && { namSinh: Number(data?.namSinh) }),
      ...(data?.thangSinh && { thangSinh: Number(data?.thangSinh) }),
      ...(data?.ngaySinh && { ngaySinh: Number(data?.ngaySinh) }),
      ngheNghiep: data?.ngheNghiep || null,
      nguoiPhuThuoc: data?.nguoiPhuThuoc?.includes('Người phụ thuộc'), //boolean
      noiCongTac: data?.noiCongTac || null,
      noiDung: data?.noiDung || null,
      thongTinNhanSuId,
    };

    let res: any;
    if (defaultData?._id) {
      res = await putQuanHeVoChong(body, defaultData?._id);
    } else {
      res = await postQuanHeVoChong(body);
    }

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh?.();

      setTimeout(goBack, 500);
    }
  };

  const dsDayinMonth = getDaysInMonth(
    watchValues?.thangSinh,
    watchValues?.namSinh,
  );

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delQuanHeVoChong(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title="Mối quan hệ trong gia đình về bên vợ/chồng"
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <InputNBForm
          label={translate('slink:Fullname')}
          error={errors?.hoVaTen?.message}
          defaultValue={defaultData?.hoVaTen}
          name={'hoVaTen'}
          required
          control={control}
        />
        <InputNBForm
          label="Năm sinh"
          name={'namSinh'}
          error={errors?.namSinh?.message}
          defaultValue={
            defaultData?.namSinh ? `${defaultData?.namSinh}` : undefined
          }
          required
          type={EKieuDuLieu.NUMBER}
          control={control}
        />
        <SingleSelectForm
          label="Tháng sinh"
          data={MONTH_OPTIONS_NS}
          defaultValue={
            defaultData?.thangSinh ? `${defaultData?.thangSinh}` : undefined
          }
          name={'thangSinh'}
          control={control}
          error={errors?.thangSinh?.message}
        />
        <SingleSelectForm
          label={translate('slink:Date_of_birth')}
          data={dsDayinMonth?.map(item => {
            return { label: item, value: item };
          })}
          defaultValue={
            defaultData?.ngaySinh ? `${defaultData?.ngaySinh}` : undefined
          }
          name={'ngaySinh'}
          control={control}
          error={errors?.ngaySinh?.message}
        />
        <SingleSelectForm
          label="Mối quan hệ"
          data={MOI_QUAN_HE_VO?.map(item => {
            return { label: item, value: item };
          })}
          defaultValue={defaultData?.moiQuanHe}
          name={'moiQuanHe'}
          control={control}
          error={errors?.moiQuanHe?.message}
          required
        />
        <InputNBForm
          error={errors?.ngheNghiep?.message}
          defaultValue={defaultData?.ngheNghiep}
          label="Nghề nghiệp"
          name={'ngheNghiep'}
          control={control}
        />
        <InputNBForm
          error={errors?.noiCongTac?.message}
          defaultValue={defaultData?.noiCongTac}
          label="Nơi công tác"
          name={'noiCongTac'}
          control={control}
        />
        <InputNBForm
          label={translate('slink:Content')}
          textArea
          error={errors?.noiDung?.message}
          defaultValue={defaultData?.noiDung}
          name={'noiDung'}
          control={control}
        />
        <MultiChoiceForm
          name={'nguoiPhuThuoc'}
          error={errors?.nguoiPhuThuoc?.message}
          defaultValue={defaultData?.nguoiPhuThuoc ? ['Người phụ thuộc'] : []}
          control={control}
          data={[{ label: 'Người phụ thuộc', value: 'Người phụ thuộc' }]}
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

export default GiaDinhVoTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});

function getDaysInMonth(month: number, year: number) {
  if (!month || !year) {
    // Nếu không có giá trị, hoặc giá trị không hợp lệ, trả về mảng từ 1 đến 30
    return Array.from({ length: 30 }, (_, index) => `${index + 1}`);
  }

  // Sử dụng hàm Date để lấy số ngày trong tháng
  const daysInMonth = new Date(year, month, 0).getDate();

  // Tạo mảng chứa các ngày trong tháng
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => `${index + 1}`,
  );

  return daysArray;
}
