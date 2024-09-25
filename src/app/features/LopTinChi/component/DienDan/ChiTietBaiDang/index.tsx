/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import R from '@assets/R';
import { WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import HTMLInputNBForm from '@components/QuyTrinhDong/component/HTMLInput/HTMLInputNBForm';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { postBaiDang, putBaiDang } from '@networking/user/DienDanBinhLuan';
import { translate } from '@utils/i18n/translate';
import { Box, Text, VStack } from 'native-base';

const ChiTietBaiDang = (props: any) => {
  const { idLopTc, onRefresh, editValue } = props.route.params;

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    initData();
  }, [editValue]);

  const initData = () => {
    const listId = ['tieuDe', 'noiDung'];

    listId?.forEach(id => setValue(id, editValue?.[id] ?? ''));

    setValue(
      'fileDinhKem',
      editValue?.fileDinhKem ? editValue?.fileDinhKem : [],
    );
  };

  const onSubmit = async (value: any) => {
    try {
      setloadingSubmit(true);

      let res: { status: boolean };
      if (editValue) {
        res = await putBaiDang(
          {
            ...value,
            lopHocPhanId: idLopTc,
          },
          editValue?._id,
        );
      } else {
        res = await postBaiDang({
          ...value,
          lopHocPhanId: idLopTc,
        });
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
      <HeaderReal
        title={editValue ? 'Cập nhật bài viết' : 'Thêm mới bài viết'}
      />
      <Box width={WIDTH(343)} alignSelf={'center'} mt="4">
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={'xs'}
          color={'gray.500'}>
          <Text color={R.colors.redColor}>{'* '}</Text>
          Tiêu đề bài đăng
        </Text>
        <InputNBForm
          label="Tiêu đề bài đăng"
          defaultValue={editValue?.tieuDe}
          name={'tieuDe'}
          control={control}
          error={errors?.tieuDe?.message}
          required
        />
        <Text
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={'xs'}
          color={'gray.500'}>
          <Text color={R.colors.redColor}>{'* '}</Text>
          Nội dung chi tiết
        </Text>
        <HTMLInputNBForm
          label={'Nội dung chi tiết'}
          name={'noiDung'}
          error={errors?.noiDung?.message}
          placeholder={'Nhập nội dung chi tiết'}
          control={control}
          defaultValue={editValue?.noiDung}
        />
        <UploadFileForm
          name={'fileDinhKem'}
          arrayFile={editValue?.fileDinhKem ?? []}
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

export default ChiTietBaiDang;
