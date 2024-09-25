/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import DocumentPicker from 'react-native-document-picker';

import R from '@assets/R';
import {
  checkTypeFile,
  getAllowFileType,
  getFontSize,
  getLineHeight,
  getNameAllowFileType,
  HEIGHT,
  MAX_AMOUNT_FILE,
  MAX_SIZE_FILE_UPLOAD,
  REGEX_FILE_NAME_URL,
  showLink,
  showToastWarn,
  WIDTH,
} from '@common';
import ButtonAdd from '@components/Item/componentQuyTrinhDong/ButtonAdd';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { HelperText } from '@libcomponents';
import { translate } from '@utils/i18n/translate';
import { HStack, Pressable, Text, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

const UploadFileQuyTrinh = (props: any) => {
  const {
    label,
    style,
    error,
    changeListFile,
    hideButton,
    arrayFile,
    disableDelete,
    customStyle,
    isRequired,
    fileTypeAllow,
    hideNotice,
    singleType,
    noteUploadFile,
    maxFilesAllow,
    imageOnly,
  } = props;

  useEffect(() => {
    changeListFile(arrayFile);
  }, []);

  useEffect(() => {
    arrayFile && setListFile(arrayFile);
  }, []);

  const totalSize = useRef(0);

  const [listFile, setListFile] = useState([]);

  const handleSeeDocument = (item: any) => {
    showLink(item, label);
  };

  const handleDelete = (index: number) => {
    const fileList: any = [...listFile];

    totalSize.current -= fileList[index]?.size;

    fileList.splice(index, 1);

    setListFile(fileList);

    changeListFile && changeListFile(fileList);
  };

  const handlePickFile = async () => {
    let [allSize, fileList] = [0, []];

    if (listFile.length === maxFilesAllow) {
      showToastWarn(
        translate('slink:Chon_file_toi_da', {
          number: maxFilesAllow,
        }),
      );
    } else if (!maxFilesAllow && listFile.length === MAX_AMOUNT_FILE) {
      showToastWarn(
        translate('slink:Chon_file_toi_da', {
          number: MAX_AMOUNT_FILE,
        }),
      );
    } else if (totalSize.current > MAX_SIZE_FILE_UPLOAD) {
      showToastWarn(translate('slink:Qua_dung_luong_file'));
    } else {
      const onPickFile = singleType
        ? DocumentPicker.pickSingle
        : DocumentPicker.pickMultiple;

      const results = await onPickFile({
        type: getAllowFileType(fileTypeAllow),
      });

      const listFileSelected: any = singleType ? [results] : results;

      const result: any = [];

      listFileSelected.map((item: any) => {
        if (checkTypeFile(item?.type)) {
          result.push({
            uri: item?.uri || '',
            type: item?.type || 'application/pdf',
            name: item?.name || item?.uri,
            size: item?.size || 0,
          });
        } else {
          showToastWarn(translate('slink:File_khong_hop_le'));
        }

        return null;
      });

      fileList = singleType ? result : [...listFile, ...result];

      allSize = listFileSelected.reduce(
        (total: any, item: any) => total + item?.size,
        totalSize.current,
      );

      const eachFileSize = 8000000;

      const isFileOverSize = fileList.some(
        (item: any) => item?.size > eachFileSize,
      );

      if (isFileOverSize) {
        showToastWarn(translate('slink:Qua_dung_luong_file'));
      } else if (allSize > MAX_SIZE_FILE_UPLOAD) {
        showToastWarn(translate('slink:Qua_dung_luong_file'));
      } else if (fileList.length > maxFilesAllow) {
        showToastWarn(
          translate('slink:Chon_file_toi_da', {
            number: maxFilesAllow,
          }),
        );
      } else if (!maxFilesAllow && fileList.length > MAX_AMOUNT_FILE) {
        showToastWarn(
          translate('slink:Chon_file_toi_da', {
            number: MAX_AMOUNT_FILE,
          }),
        );
      } else {
        totalSize.current = allSize;

        setListFile(fileList);

        changeListFile && changeListFile(fileList);
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        overflow="hidden">
        <TextLabelQuyTrinh label={label} isRequired={isRequired} />
        <ButtonAdd
          error={!!error}
          visible={!hideButton}
          onAdd={handlePickFile}
        />
      </HStack>
      <ListFile
        disableDelete={disableDelete}
        handleDelete={handleDelete}
        data={listFile}
        handleSeeDocument={handleSeeDocument}
        customStyle={customStyle}
        imageOnly={imageOnly}
      />
      <Notice
        visible={!hideNotice}
        fileTypeAllow={fileTypeAllow}
        singleType={singleType}
        noteUploadFile={noteUploadFile}
        maxFilesAllow={maxFilesAllow}
        imageOnly={imageOnly}
      />
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </View>
  );
};

export default UploadFileQuyTrinh;

const ListFile = ({
  customStyle,
  data,
  handleDelete,
  disableDelete,
  handleSeeDocument,
}: any) => {
  if (data.length === 0) {
    return <></>;
  } else {
    return (
      <FlatList
        data={data}
        extraData={data}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.flatList}
        renderItem={({ item, index }) => (
          <ItemFile
            index={index}
            item={item}
            handleDelete={() => handleDelete(index)}
            handleSeeDocument={() => handleSeeDocument(item)}
            disableDelete={disableDelete}
            customStyle={customStyle}
          />
        )}
      />
    );
  }
};

const Notice = ({
  visible,
  fileTypeAllow,
  singleType,
  noteUploadFile,
  maxFilesAllow,
  imageOnly,
}: any) => {
  if (visible) {
    const allowTyeList = getNameAllowFileType(fileTypeAllow);

    return (
      <Text
        color={'blue.400'}
        mt="2"
        fontSize="xs"
        textAlign="left"
        fontStyle={'italic'}
        fontFamily={R.fonts.BeVietnamProThinItalic}
        flex={1}>
        {noteUploadFile ||
          (imageOnly
            ? translate('slink:Allow_upload_image', {
                type: allowTyeList,
                amount: maxFilesAllow || (singleType ? 1 : 5),
              })
            : translate('slink:Allow_upload_file', {
                type: allowTyeList,
                amount: maxFilesAllow || (singleType ? 1 : 5),
              }))}
      </Text>
    );
  } else {
    return null;
  }
};

const ItemFile = ({
  index,
  item,
  handleDelete,
  handleSeeDocument,
  customStyle,
  disableDelete,
}: any) => {
  return (
    <Pressable
      mt="2"
      alignItems="center"
      flexDirection="row"
      style={customStyle}
      _pressed={R.themes.pressed}
      onPress={handleSeeDocument}>
      <Text
        numberOfLines={1}
        color="blue.400"
        textDecorationLine="underline"
        fontFamily={R.fonts.BeVietnamProRegular}
        flex={1}
        fontSize={getFontSize(14)}>
        {`${
          item?.name
            ? item?.name
            : item?.filename ??
              item?.uri?.replace(REGEX_FILE_NAME_URL, '') ??
              item?.url?.replace(REGEX_FILE_NAME_URL, '') ??
              item?.replace(REGEX_FILE_NAME_URL, '') ??
              index + 1
        }`}
      </Text>
      <DeleteIcon disableDelete={disableDelete} handleDelete={handleDelete} />
    </Pressable>
  );
};

const DeleteIcon = ({ handleDelete, disableDelete }: any) => {
  const theme = useTheme();

  if (disableDelete) {
    return null;
  } else {
    return (
      <Pressable
        _pressed={R.themes.pressed}
        onPress={handleDelete}
        hitSlop={styles.hitSlop}
        right={0}
        alignItems="center"
        borderRadius={WIDTH(11)}
        height={WIDTH(22)}
        width={WIDTH(22)}
        borderWidth={1}
        justifyContent="center"
        borderColor="gray.400">
        <Icon size={WIDTH(10)} name="close" color={theme.colors.gray[400]} />
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  contentContainerStyle: {},
  flatList: {
    flexGrow: 0,
  },
  note: {
    color: R.colors.blue500,
    fontSize: getFontSize(12),
    textAlign: 'left',
    fontFamily: R.fonts.BeVietnamProThinItalic,
    width: WIDTH(320),
  },
  hitSlop: {
    bottom: 20,
    left: 20,
    right: 20,
    top: 20,
  },
  iconDelete: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    borderRadius: WIDTH(11),
    height: WIDTH(22),
    width: WIDTH(22),
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: '#ABABAB',
  },
  fileName: {
    color: R.colors.blueLight,
    textDecorationLine: 'underline',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(24),
    maxWidth: WIDTH(290),
  },
  containerFileView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    overflow: 'hidden',
    marginBottom: HEIGHT(16),
  },
  container: {
    zIndex: 10,
  },
});
