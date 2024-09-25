/* eslint-disable react-native/split-platform-components */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-params */
import { bodauTiengViet, popupOk } from '@common';
import { Alert, PermissionsAndroid, Platform, Share } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

export const saveFile = (
  base64: string,
  titleDocument = 'TaiLieu',
  fileType = 'docx',
  isImage?: boolean,
) => {
  const { dirs } = ReactNativeBlobUtil.fs;

  const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;

  const path = `${dirToSave}/${bodauTiengViet(
    titleDocument,
  )}_${new Date().getTime()}.${fileType}`;

  try {
    const splitType = isImage ? ',' : 'data:application/docx;base64,';

    const mimeType = isImage ? 'image/png' : 'application/docx';

    let fileData: string | string[] = base64.split(splitType);
    fileData = fileData[1];

    ReactNativeBlobUtil.fs.writeFile(path, fileData, 'base64');

    if (Platform.OS === 'android') {
      popupOk('Thông báo', 'Lưu file thành công!');

      ReactNativeBlobUtil.android.actionViewIntent(path, mimeType);
    } else {
      if (isImage) {
        const shareContent = {
          url: base64,
          title: 'Chọn thư mục lưu trữ',
        };

        const shareOptions = {
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToFacebook',
            'com.apple.UIKit.activity.PostToTwitter',
          ],
        };

        Share.share(shareContent, shareOptions);
      } else {
        ReactNativeBlobUtil.ios.previewDocument(path);
      }
    }
  } catch (error) {
    popupOk('Lỗi', 'Lưu file không thành công.');
  }
};

export const saveFileFromBase64 = async (
  base64: string,
  titleDocument = 'Tai lieu khong co tieu de',
  fileType = 'docx',
  isImage?: boolean,
) => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      const grantedRead = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );

      if (
        granted === PermissionsAndroid.RESULTS.GRANTED &&
        grantedRead === PermissionsAndroid.RESULTS.GRANTED
      ) {
        saveFile(base64, titleDocument, fileType, isImage);
        
      } else {
        Alert.alert(
          'Quyền truy cập bị từ chối!',
          'Đồng chí cần cung cấp quyền truy cập bộ nhớ để download tài liệu',
        );
      }
    } else {
      saveFile(base64, titleDocument, fileType, isImage);
    }
  } catch (err) {
    popupOk('Lỗi', 'Lưu file không thành công.');
  }
};
