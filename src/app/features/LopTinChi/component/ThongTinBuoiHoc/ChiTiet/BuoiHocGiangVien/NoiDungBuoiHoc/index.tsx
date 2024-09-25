/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */

import React, { useState } from 'react';
import { TextInput as RNTextInput, ScrollView, View } from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import TempScreen from '@components/EditHTML';
import { HelperText } from '@libcomponents';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { updateNoiDungCB } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box, Text, VStack } from 'native-base';

import DanhSachHocLieu from './DanhSachHocLieu';
import styles from './styles';

const NoiDungBuoiHoc = (props: any) => {
  const { noiDungBaiHoc, tieuDeBaiHoc, _id, hocLieuList } =
    props?.route?.params?.dataBuoiHoc;

  console.log(
    '🚀 ~ NoiDungBuoiHoc ~ props?.route?.params?.dataBuoiHoc:',
    props?.route?.params?.dataBuoiHoc,
  );

  const onEdit = props?.route?.params?.onEdit;

  const funGoBack = props?.route?.params?.funGoBack;

  const [loading, setloading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      tieuDeBaiHoc,
      noiDungBaiHoc,
      hocLieuList,
    },
  });

  const onSubmit = async (data: any) => {
    setloading(true);

    try {
      const body = {
        noiDungBaiHoc: data?.noiDungBaiHoc?.trim(),
        tieuDeBaiHoc: data?.tieuDeBaiHoc?.trim(),
        hocLieuList: data?.hocLieuList,
      };

      const res = await updateNoiDungCB(_id, body);

      if (res?.status) {
        onEdit && onEdit(body);

        funGoBack && funGoBack();

        setTimeout(goBack, 500);
      }

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Noi_dung_chuan_bi')} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.content}>
        <NoiDung
          name={'tieuDeBaiHoc'}
          title={translate('slink:Bai_hoc')}
          control={control}
          errors={errors}
          value={tieuDeBaiHoc}
        />
        <NoiDung
          name={'noiDungBaiHoc'}
          title={translate('slink:Content')}
          control={control}
          errors={errors}
          value={noiDungBaiHoc}
        />
        <DanhSachHocLieu
          onChange={value => {
            setValue('hocLieuList', value);
          }}
          defaultData={hocLieuList}
        />
        {/* <TepDinhKem value={defaultValueDinhKem} control={control} /> */}
        <BaseButtonNB
          isLoading={loading}
          isLoadingText={translate('slink:Loading')}
          width={WIDTH(140)}
          title={translate('slink:Update')}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </View>
  );
};

export default NoiDungBuoiHoc;
const NoiDung = ({ name, control, errors, title, value }: any) => {
  return (
    <VStack mb={HEIGHT(24)}>
      <Text
        flex={1}
        mb="1"
        color={'black'}
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize={'sm'}>
        {title}
        <Text color={'red.800'}>{'*'}</Text>
      </Text>
      <Box
        backgroundColor="white"
        borderRadius={WIDTH(8)}
        style={R.themes.shadowOffset}
        marginTop={HEIGHT(8)}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange } }) =>
            name !== 'tieuDeBaiHoc' ? (
              <TempScreen defaultValue={value} onChange={onChange} />
            ) : (
              <RNTextInput
                defaultValue={value}
                autoCorrect={false}
                clearButtonMode={'never'}
                underlineColorAndroid={'transparent'}
                placeholder={translate('slink:Enter_here')}
                style={[
                  styles.input,
                  name !== 'tieuDeBaiHoc' && styles.multiline,
                ]}
                multiline={name === 'tieuDeBaiHoc' ? false : true}
                onChangeText={onChange}
              />
            )
          }
          rules={{ required: true }}
        />
      </Box>
      <HelperText
        visible={errors?.[name] !== undefined}
        msg={translate('slink:Required')}
        type={'error'}
      />
    </VStack>
  );
};

// const TepDinhKem = ({ control, value }: any) => {
//   return (
//     <Box
//       style={R.themes.shadowOffset}
//       backgroundColor="white"
//       px={WIDTH(16)}
//       borderRadius={WIDTH(8)}>
//       <Controller
//         control={control}
//         name="dinhKem"
//         render={({ field: { onChange } }) => (
//           <UploadFileV2
//             arrayFile={value}
//             label={translate('slink:Attachments')}
//             singleType
//             changeListFile={onChange}
//             style={styles.uploadFile}
//           />
//         )}
//       />
//     </Box>
//   );
// };
