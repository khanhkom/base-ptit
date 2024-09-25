/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
import Icon from 'react-native-vector-icons/AntDesign';

const UploadFileV2 = (props: any) => {
  const {
    styleLabel,
    labelLong,
    label,
    style,
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
    backgroundColorItemFile,
  } = props;

  useEffect(() => {
    changeListFile(arrayFile);
  }, []);

  useEffect(() => {
    if (arrayFile) {
      setListFile(arrayFile);
    }
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
      showToastWarn('Bạn đã chọn tối đa file');
    } else if (!maxFilesAllow && listFile.length === MAX_AMOUNT_FILE) {
      showToastWarn('Bạn đã chọn tối đa file');
    } else if (totalSize.current > MAX_SIZE_FILE_UPLOAD) {
      showToastWarn('Dung lượng file đã vượt quá giới hạn');
    } else {
      try {
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
            showToastWarn('File không hợp lệ');
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
          showToastWarn('Quá dung lượng file');
        } else if (allSize > MAX_SIZE_FILE_UPLOAD) {
          showToastWarn('Quá dung lượng file');
        } else if (fileList.length > maxFilesAllow) {
          showToastWarn('Chọn quá số file quy định');
        } else if (!maxFilesAllow && fileList.length > MAX_AMOUNT_FILE) {
          showToastWarn('Chọn quá số file quy định');
        } else {
          totalSize.current = allSize;

          setListFile(fileList);

          changeListFile && changeListFile(fileList);
        }
      } catch (error) {}
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.viewLabel, labelLong && styles.viewLabelLong]}>
        {label && (
          <Text
            style={[
              styles.label,
              labelLong && { marginBottom: HEIGHT(16), maxWidth: WIDTH(343) },
              styleLabel,
            ]}>
            {`${label}`}
            {isRequired && <Text style={styles.dot}>{' * '}</Text>}
          </Text>
        )}
        {!hideButton && (
          <Text
            disabled={disableDelete}
            onPress={handlePickFile}
            style={styles.textTaiLen}>
            {' Tải lên'}
          </Text>
        )}
      </View>
      <ListFile
        disableDelete={disableDelete}
        handleDelete={handleDelete}
        data={listFile}
        handleSeeDocument={handleSeeDocument}
        customStyle={customStyle}
        imageOnly={imageOnly}
        backgroundColorItemFile={backgroundColorItemFile}
      />
      <Notice
        visible={!hideNotice}
        fileTypeAllow={fileTypeAllow}
        singleType={singleType}
        noteUploadFile={noteUploadFile}
        maxFilesAllow={maxFilesAllow}
        imageOnly={imageOnly}
      />
    </View>
  );
};

export default UploadFileV2;

const ListFile = ({
  customStyle,
  data,
  handleDelete,
  disableDelete,
  handleSeeDocument,
  backgroundColorItemFile,
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
            isLast={index === data?.length - 1}
            handleDelete={() => handleDelete(index)}
            handleSeeDocument={() => handleSeeDocument(item)}
            disableDelete={disableDelete}
            customStyle={customStyle}
            backgroundColorItemFile={backgroundColorItemFile}
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
      <Text style={styles.note}>
        {noteUploadFile ||
          (imageOnly
            ? `Chỉ nhận tối đa ${
                maxFilesAllow || (singleType ? 1 : 5)
              } ảnh (định dạng ${allowTyeList}). Tổng dung lượng tất cả các ảnh không vượt quá 20MB.`
            : `Chỉ nhận tối đa ${
                maxFilesAllow || (singleType ? 1 : 5)
              } tệp (định dạng ${allowTyeList}). Tổng dung lượng tất cả các tệp không vượt quá 20MB.`)}
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
    <TouchableOpacity
      style={[styles.containerFileView, customStyle]}
      activeOpacity={0.6}
      onPress={handleSeeDocument}>
      <Text numberOfLines={1} style={styles.fileName}>
        {`${
          item?.name
            ? item?.name
            : item?.filename ??
              item?.uri?.replace(REGEX_FILE_NAME_URL, '') ??
              item?.url?.replace(REGEX_FILE_NAME_URL, '') ??
              index + 1
        }`}
      </Text>
      <DeleteIcon disableDelete={disableDelete} handleDelete={handleDelete} />
    </TouchableOpacity>
  );
};

const DeleteIcon = ({ handleDelete, disableDelete }: any) => {
  if (disableDelete) {
    return <View />;
  } else {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.iconDelete}
        onPress={handleDelete}
        hitSlop={styles.hitSlop}>
        <Icon size={WIDTH(10)} name="close" color={'#ABABAB'} />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  dot: {
    color: R.colors.redColor,
  },
  label: {
    maxWidth: WIDTH(250),
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },

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
    flex: 1,
  },
  containerFileView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: HEIGHT(16),
  },
  textTaiLen: {
    color: '#8199D7',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    textDecorationLine: 'underline',
  },
  viewLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    overflow: 'hidden',
    marginBottom: HEIGHT(16),
  },
  viewLabelLong: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: HEIGHT(16),
  },
  container: {
    zIndex: 10,
    paddingVertical: HEIGHT(18),
  },
});
