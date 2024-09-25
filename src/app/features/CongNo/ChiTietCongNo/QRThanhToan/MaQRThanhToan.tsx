/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import ReactNativeBlobUtil from 'react-native-blob-util';
import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { HEIGHT, showToastError, showToastSuccess, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import { getSettingByKey } from '@networking/user';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { translate } from '@utils/i18n/translate';
import { VStack } from 'native-base';

const MaQRThanhToan = props => {
  const { transactionInfo, infoDot, isPhanHieu } = props;

  const [infobank, setinfobank] = useState<any>();

  const addInfo = `${infoDot?.userCode ?? ''} ${infoDot?.userFullname ?? ''} ${
    transactionInfo?.name ?? 'Nộp tiền'
  }`.toUpperCase();

  useEffect(() => {
    getInit();
  }, []);

  const getInit = async () => {
    try {
      const response = await getSettingByKey('THONG_TIN_THANH_TOAN');

      setinfobank(response?.data);
    } catch (error) {}
  };

  const qrThanhToanNormal = `https://img.vietqr.io/image/${infobank?.maNganHang}-${infobank?.tienToTaiKhoan}${transactionInfo?.identityCode}-compact2.png?amount=${transactionInfo?.amount}&addInfo=${addInfo}&accountName=${infoDot?.userFullname}`;

  const qrThanhToanPH = `https://img.vietqr.io/image/970415-1810071908-compact2.png?amount=${
    transactionInfo?.amount
  }&addInfo=${addInfo}&accountName=${'PHAN HIEU HOC VIEN PHU NU VIET NAM'}`;

  const qrThanhToan = isPhanHieu ? qrThanhToanPH : qrThanhToanNormal;

  const checkPermision = async () => {
    if (Platform.OS === 'ios') {
      try {
        await CameraRoll.save(qrThanhToan);

        showToastSuccess(translate('slink:Download_QR_payment_success'));
      } catch (error) {
        showToastError(translate('slink:Download_QR_payment_fail'));
      }
    } else {
      downloadImage();
    }
  };

  const downloadImage = async () => {
    try {
      const imgUrl = qrThanhToan;

      const newImgUri = imgUrl.lastIndexOf('/');

      const imageName = imgUrl.substring(newImgUri);

      const { dirs } = ReactNativeBlobUtil.fs;

      const date = new Date();

      const path =
        Platform.OS === 'ios'
          ? dirs.MainBundleDir + imageName
          : dirs.PictureDir + imageName;

      ReactNativeBlobUtil.config({
        fileCache: true,
        appendExt: 'png',
        indicator: true,
        IOSBackgroundTask: true,
        path: path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            dirs.PictureDir +
            '/image_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            '.png',
          title: translate('slink:Download_QR'),
          description: translate('slink:Your_picture_save'),
        },
      })
        .fetch('GET', imgUrl)
        .then(async res => {
          await CameraRoll.save(res?.data);

          showToastSuccess(translate('slink:Download_QR_payment_success'));
        })
        .catch(err => {
          showToastError(translate('slink:Download_QR_payment_fail'));

          return err;
        });
    } catch (error) {}
  };

  return (
    <ViewImage
      visible={!!infobank?.maNganHang && !!infobank?.tienToTaiKhoan}
      uri={qrThanhToan}
      onPress={checkPermision}
    />
  );
};

export default MaQRThanhToan;
const ViewImage = ({
  visible,
  uri,
  onPress,
}: {
  visible: boolean;
  uri: string;
  onPress: () => void;
}) => {
  if (visible) {
    return (
      <VStack mt={HEIGHT(24)} alignItems={'center'}>
        <FastImage
          source={{ uri }}
          defaultSource={R.images.logoApp}
          resizeMode="contain"
          style={{
            width: WIDTH(300),
            height: WIDTH(300),
          }}
        />
        <BaseButtonNB
          width={WIDTH(140)}
          title={translate('slink:Download_QR')}
          onPress={onPress}
        />
      </VStack>
    );
  }

  return null;
};
