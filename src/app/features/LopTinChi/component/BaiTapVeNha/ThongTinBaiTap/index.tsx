/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { EKieuDuLieu, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import HTMLInputNBForm from '@components/QuyTrinhDong/component/HTMLInput/HTMLInputNBForm';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import MultiChoiceForm from '@components/QuyTrinhDong/component/MultiChoices/MultiChoiceForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { uploadDocument } from '@networking/user';
import { postBaiTap, putBaiTap } from '@networking/user/BaiTapVeNha';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { Box, Text, VStack } from 'native-base';

const ThongTinBaiTap = (props: any) => {
  const { account } = useSelector(selectAppConfig);

  const { lopTc, onRefresh, editValue } = props.route.params;

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const watchedValues = watch();

  useEffect(() => {
    initData();
  }, [editValue]);

  const initData = () => {
    const listId = [
      'tieuDe',
      'noiDung',
      'thoiGianKetThuc',
      'thoiGianLamBaiQuiz',
    ];

    listId?.forEach(id => setValue(id, editValue?.[id]));

    setValue('thoiHan', 'co_dinh');

    setValue(
      'choPhepCapNhatSauNop',
      editValue?.choPhepCapNhatSauNop
        ? ['Cho phép nộp bài sau thời gian hết hạn']
        : [],
    );

    setValue('isQuiz', editValue?.isQuiz ? ['Tạo quiz'] : []);

    setValue(
      'fileDinhKem',
      editValue?.urlTepDinhKem ? editValue?.urlTepDinhKem : [],
    );
  };

  const onSubmit = async (value: any) => {
    try {
      setloadingSubmit(true);

      const listFile: any[] = await uploadDocument(value?.fileDinhKem);

      const body = {
        noiDung: value?.noiDung,
        huongDanNop: value?.huongDanNop,
        choPhepCapNhatSauNop:
          value?.choPhepCapNhatSauNop?.length === 1 ? true : false,
        urlTepDinhKem: listFile?.map(item => item?.url) ?? [],
        isQuiz: value?.isQuiz?.length === 1 ? true : false,
        thoiGianKetThuc: value?.thoiGianKetThuc,
        thoiGianLamBaiQuiz: value?.thoiGianLamBaiQuiz,
        lopHocPhanId: lopTc?._id,
        tenLopHocPhan: lopTc?.ten,
        hoTenNguoiGiao: account?.hoTen,
        ssoIdNguoiGiao: account?.ssoId,
        maCanBoNguoiGiao: account?.maCanBo,
        active: false,
      };

      let res: { status: boolean };
      if (editValue) {
        res = await putBaiTap(body, editValue?._id);
      } else {
        res = await postBaiTap(body);
      }

      if (res?.status) {
        onRefresh && onRefresh();

        setTimeout(goBack, 700);
      }

      setloadingSubmit(false);
    } catch (error) {
      setloadingSubmit(false);
    }
  };

  return (
    <VStack flex={1} backgroundColor={R.colors.white100}>
      <HeaderReal title={editValue ? 'Cập nhật bài tập' : 'Thêm mới bài tập'} />
      <Box width={WIDTH(343)} alignSelf={'center'} mt="4">
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={'xs'}
          color={'gray.500'}>
          <Text color={R.colors.redColor}>{'* '}</Text>
          Tiêu đề bài tập
        </Text>
        <InputNBForm
          label="Tiêu đề bài tập"
          defaultValue={editValue?.noiDung}
          name={'noiDung'}
          control={control}
          error={errors?.noiDung?.message}
          required
        />
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={'xs'}
          color={'gray.500'}>
          Mô tả chi tiết, hướng dẫn nộp bài
        </Text>
        <HTMLInputNBForm
          label={'Nội dung chi tiết'}
          name={'huongDanNop'}
          error={errors?.huongDanNop?.message}
          placeholder={'Nhập nội dung chi tiết'}
          control={control}
          defaultValue={editValue?.huongDanNop}
        />
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={'xs'}
          color={'gray.500'}>
          Thời hạn làm bài
        </Text>
        <SingleSelectForm
          label="Thời hạn làm bài"
          defaultValue={'co_dinh'}
          data={[
            { label: 'Thời gian cố định', value: 'co_dinh' },
            { label: 'Số phút làm bài', value: 'so_phut' },
          ]}
          name={'thoiHan'}
          control={control}
          error={errors?.thoiHan?.message}
        />

        {watchedValues?.thoiHan === 'co_dinh' ? (
          <DatePickerForm
            defaultValue={editValue?.thoiGianKetThuc}
            label={translate('slink:Time_end')}
            error={errors?.thoiGianKetThuc?.message}
            mode="date"
            name={'thoiGianKetThuc'}
            control={control}
          />
        ) : (
          <InputNBForm
            label=""
            defaultValue={editValue?.thoiGianLamBaiQuiz}
            name={'thoiGianLamBaiQuiz'}
            control={control}
            error={errors?.thoiGianLamBaiQuiz?.message}
            required
            type={EKieuDuLieu.NUMBER}
          />
        )}
        <MultiChoiceForm
          error={errors?.choPhepCapNhatSauNop?.message}
          defaultValue={
            editValue?.choPhepCapNhatSauNop
              ? ['Cho phép nộp bài sau thời gian hết hạn']
              : []
          }
          name={'choPhepCapNhatSauNop'}
          control={control}
          data={[
            {
              label: 'Cho phép nộp bài sau thời gian hết hạn',
              value: 'Cho phép nộp bài sau thời gian hết hạn',
            },
          ]}
        />
        <MultiChoiceForm
          error={errors?.isQuiz?.message}
          defaultValue={editValue?.isQuiz ? ['Tạo quiz'] : []}
          name={'isQuiz'}
          isDisabled
          control={control}
          data={[{ label: 'Tạo quiz', value: 'Tạo quiz' }]}
        />

        <UploadFileForm
          name={'fileDinhKem'}
          arrayFile={editValue?.urlTepDinhKem ?? []}
          error={errors?.fileDinhKem?.message}
          control={control}
          label={'File đính kèm'}
        />
        <BaseButtonNB
          isLoading={loadingSubmit}
          isLoadingText={translate('slink:Loading')}
          width={WIDTH(140)}
          title={editValue ? 'Cập nhật' : 'Đăng bài'}
          onPress={handleSubmit(onSubmit)}
        />
      </Box>
    </VStack>
  );
};

export default ThongTinBaiTap;
