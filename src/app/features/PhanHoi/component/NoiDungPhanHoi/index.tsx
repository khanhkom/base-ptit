import { EKieuDuLieu, HEIGHT, openGallery, showImage, WIDTH } from '@common';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import { translate } from '@utils/i18n/translate';
import { Box, FlatList, Pressable, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import R from '@assets/R';
import FastImage from 'react-native-fast-image';
import { ImageSource } from 'react-native-image-viewing/dist/@types';
import { Controller } from 'react-hook-form';
const NoiDungPhanHoi = props => {
  const { control, errors } = props;
  return (
    <VStack
      backgroundColor={'white'}
      borderRadius={WIDTH(8)}
      mt="4"
      style={R.themes.shadowOffset}
      py={HEIGHT(16)}
      px={WIDTH(16)}>
      <VStack>
        <Text
          flex={1}
          mb="1"
          color={'black'}
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={'sm'}>
          {translate('slink:Mo_ta_chi_tiet')}
          <Text color={'red.800'}>{'*'}</Text>
        </Text>
        <InputNBForm
          type={EKieuDuLieu.TEXT}
          textArea
          required
          name={'noiDung'}
          control={control}
          error={errors?.noiDung?.message}
        />
      </VStack>
      <Controller
        control={control}
        name="dinhKem"
        render={({ field: { onChange } }) => (
          <ImportImage onChangeFile={onChange} />
        )}
      />
    </VStack>
  );
};

export default NoiDungPhanHoi;

const ImportImage = (props: { onChangeFile: (e: any) => void }) => {
  const { onChangeFile } = props;
  const [listImage, setlistImage] = useState<any[]>([]);

  const updateImage = async (value: any) => {
    try {
      const body = {
        uri:
          Platform.OS === 'android'
            ? value?.url
            : value?.url?.replace('file://', ''),
        type: value?.mimetype,
        name: value?.filename,
      };
      setlistImage([body]);
      onChangeFile && onChangeFile([body]);
    } catch (error) {}
  };
  //   onPress={() => openGallery(updateAnh)}
  const data = [...listImage, { isDisable: true }];
  const onPress = (isShowLink: boolean, source: ImageSource) => {
    if (isShowLink) {
      showImage([{ source, title: '' }]);
    } else {
      openGallery(updateImage);
    }
  };
  const handleDelete = (index: number) => {
    const fileList: any = [...listImage];

    fileList.splice(index, 1);

    setlistImage(fileList);

    onChangeFile && onChangeFile(fileList);
  };
  return (
    <>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{ paddingTop: HEIGHT(16) }}
        renderItem={({ item, index }) => {
          const source = item?.isDisable
            ? R.images.addImage
            : { uri: item?.uri };
          return (
            <Pressable
              key={index}
              _pressed={R.themes.pressed}
              borderWidth={1}
              onPress={() => onPress(!item?.isDisable, source)}
              borderColor={'gray.200'}
              borderRadius={WIDTH(8)}
              height={HEIGHT(100)}
              width={WIDTH(80)}
              alignItems="center"
              justifyContent={'center'}
              mr={'4'}>
              <DeleteIcon
                handleDelete={() => handleDelete(index)}
                disableDelete={item?.isDisable}
              />
              <FastImage
                source={source}
                resizeMode="contain"
                style={{
                  height: HEIGHT(item?.isDisable ? 60 : 90),
                  width: WIDTH(item?.isDisable ? 50 : 75),
                }}
              />
            </Pressable>
          );
        }}
      />
    </>
  );
};
const DeleteIcon = ({
  handleDelete,
  disableDelete,
}: {
  handleDelete: () => void;
  disableDelete: boolean;
}) => {
  if (disableDelete) {
    return null;
  } else {
    return (
      <Pressable
        zIndex={10}
        _pressed={R.themes.pressed}
        position="absolute"
        right={-WIDTH(8)}
        top={-WIDTH(8)}
        alignItems="center"
        borderRadius={WIDTH(8)}
        height={WIDTH(16)}
        width={WIDTH(16)}
        backgroundColor={'black'}
        justifyContent="center"
        onPress={handleDelete}
        hitSlop={R.themes.hitSlop}>
        <Icon size={WIDTH(12)} name="close" color={'white'} />
      </Pressable>
    );
  }
};
