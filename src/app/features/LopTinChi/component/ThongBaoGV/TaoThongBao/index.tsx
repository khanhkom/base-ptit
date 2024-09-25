/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { TextInput as RNTextInput, ScrollView, Text, View } from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import { HEIGHT, LOAI_LOP, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import TempScreen from '@components/EditHTML';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import BoxTitle from '@features/PhanHoi/component/BoxTitle';
import { HelperText } from '@libcomponents';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { uploadDocument } from '@networking/user';
import {
  taoThongBaoLHC,
  taoThongBaoLTC,
} from '@networking/user/DanhGiaGiangVien';
import { translate } from '@utils/i18n/translate';
import { Box, useTheme } from 'native-base';

import styles from './styles';

const TaoThongBaoGiangVien = (props: any) => {
  const itemLopHC = props?.route?.params?.itemLopHC;

  const loaiLop = props?.route?.params?.loaiLop;

  const refreshData = props?.route?.params?.refreshData;

  const [loading, setloading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setloading(true);

    let responseUpload: any = null;

    if (data?.taiLieuDinhKem && data?.taiLieuDinhKem?.length > 0) {
      const listFile = await uploadDocument(data?.taiLieuDinhKem);

      responseUpload = listFile?.map(item => {
        return item?.url;
      });
    }

    const body =
      loaiLop === LOAI_LOP.LOP_HC
        ? {
            content: data?.content || '',
            description: data?.description || '',
            title: data?.title || '',
            ...(data?.taiLieuDinhKem?.length > 0 && {
              taiLieuDinhKem: responseUpload,
            }),
          }
        : {
            content: data?.content || '',
            description: data?.description || '',
            title: data?.title || '',
            ...(data?.taiLieuDinhKem?.length > 0 && {
              taiLieuDinhKem: responseUpload,
            }),
          };

    const res =
      loaiLop === LOAI_LOP.LOP_HC
        ? await taoThongBaoLHC(itemLopHC?._id, body)
        : await taoThongBaoLTC(itemLopHC?._id, body);

    setloading(false);

    if (res?.status) {
      refreshData && refreshData();

      setTimeout(goBack, 500);
    }
  };

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Create_notice')} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.content}>
        <BoxTitle isRequired title={translate('slink:Title')}>
          <Box
            backgroundColor="white"
            borderRadius={WIDTH(8)}
            px={WIDTH(16)}
            py={HEIGHT(18)}>
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <RNTextInput
                  autoCorrect={false}
                  clearButtonMode={'never'}
                  underlineColorAndroid={'transparent'}
                  placeholder={translate('slink:Enter_title')}
                  placeholderTextColor={theme.colors.gray[400]}
                  style={[styles.input]}
                  multiline={true}
                  onChangeText={onChange}
                />
              )}
            />
          </Box>
          <HelperText
            visible={!!errors?.title}
            msg={translate('slink:Required')}
            type={'error'}
          />
        </BoxTitle>
        <BoxTitle title={translate('slink:Mo_ta')}>
          <Box
            backgroundColor="white"
            borderRadius={WIDTH(8)}
            px={WIDTH(16)}
            py={HEIGHT(18)}>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange } }) => (
                <RNTextInput
                  autoCorrect={false}
                  clearButtonMode={'never'}
                  underlineColorAndroid={'transparent'}
                  placeholder={translate('slink:Enter_description_short')}
                  placeholderTextColor={theme.colors.gray[400]}
                  style={[styles.input]}
                  multiline={true}
                  onChangeText={onChange}
                />
              )}
            />
          </Box>
          <HelperText
            visible={!!errors?.description}
            msg={translate('slink:Required')}
            type={'error'}
          />
        </BoxTitle>
        <BoxTitle title={translate('slink:Detail_content')}>
          <Box
            justifyContent="space-between"
            backgroundColor="white"
            overflow="hidden"
            pt={HEIGHT(8)}
            borderRadius={WIDTH(8)}>
            <Controller
              control={control}
              name="content"
              render={({ field: { onChange } }) => (
                <TempScreen
                  placeholder={translate('slink:Enter_content_detail_notice')}
                  onChange={onChange}
                />
              )}
            />
          </Box>
          <HelperText
            visible={!!errors?.content}
            msg={translate('slink:Required')}
            type={'error'}
          />
        </BoxTitle>
        <UploadFileForm
          label={translate('slink:Attachments')}
          name={'taiLieuDinhKem'}
          control={control}
          error={errors?.taiLieuDinhKem?.message}
          arrayFile={[]}
        />
        <BaseButtonNB
          width={WIDTH(140)}
          isLoading={loading}
          isLoadingText={translate('slink:Sending')}
          onPress={handleSubmit(onSubmit)}
          title={translate('slink:Send_notice')}
        />
      </ScrollView>
    </View>
  );
};

export default TaoThongBaoGiangVien;
