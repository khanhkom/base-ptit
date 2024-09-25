import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import ReactNativeBlobUtil from 'react-native-blob-util';
import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import {
  EDoiTuongLopHanhChinh,
  HEIGHT,
  isIos,
  showToastError,
  showToastSuccess,
  WIDTH,
} from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import { CongNoProps } from '@features/CongNo/type';
import { LopHanhChinhProps } from '@features/LopHanhChinhSV/type';
import HeaderReal from '@libcomponents/header-real';
import { getTransactionV2, svGetLopHC } from '@networking/user';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Clipboard from '@react-native-clipboard/clipboard';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import HuongDanThanhToan from './HuongDanThanhToan';
import MaQRThanhToan from './MaQRThanhToan';

import { TransactionProps } from '../type';

interface Props {
  route: { params: { infoDot: CongNoProps } };
}
const QRThanhToan: any = (props: Props) => {
  const infoDot = props?.route?.params?.infoDot;

  const [isPhanHieu, setisPhanHieu] = useState(false);

  const [transactionInfo, settransactionInfo] = useState<TransactionProps>();

  const [visible, setvisible] = useState(false);

  useEffect(() => {
    initCheck();
  }, []);

  const initCheck = async () => {
    const body = {
      condition: {
        status: 'pending',
        billIdentityCode: infoDot?.identityCode,
        fromAccount: 'external',
      },
    };

    const response = await svGetLopHC({ page: 1, limit: 10 });

    const isPH = response?.data?.data?.result?.some(
      (item: LopHanhChinhProps) => item.doiTuong === EDoiTuongLopHanhChinh.PH,
    );

    setisPhanHieu(isPH);

    const responseTranSaction = await getTransactionV2(body);

    settransactionInfo(responseTranSaction?.data?.data?.[0]);
  };

  const copyToClipboard = () => {
    Clipboard.setString(transactionInfo?.identityCode ?? '');

    showToastSuccess(translate('slink:Copied_payment_code'));
  };

  const qrThanhToanNormal = `https://img.vietqr.io/image/970405-v100098${transactionInfo?.identityCode}-compact2.png?amount=${transactionInfo?.amount}&addInfo=${infoDot?.userFullname}&accountName=${infoDot?.userFullname}`;

  const qrThanhToanPH = `https://img.vietqr.io/image/970415-1810071908-compact2.png?amount=${
    transactionInfo?.amount
  }&addInfo=${
    infoDot?.userFullname
  }&accountName=${'PHAN HIEU HOC VIEN PHU NU VIET NAM'}`;

  const qrThanhToan = isPhanHieu ? qrThanhToanPH : qrThanhToanNormal;

  const checkPermision = async () => {
    if (isIos) {
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

      const path = isIos
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
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Pay')} />
      <Box flex={1} w="full" px={WIDTH(16)} alignSelf="center">
        <ItemLabel
          label={translate('slink:Payment_guide')}
          value={translate('slink:See')}
          textValue={{ textDecorationLine: 'underline' }}
          isLast={false}
          onPress={() => setvisible(true)}
        />
        <ItemLabel
          label={translate('slink:Payment_code')}
          value={transactionInfo?.identityCode ?? ''}
          textValue={{ textDecorationLine: 'underline' }}
          isLast={false}
          onPress={copyToClipboard}
        />
        <MaQRThanhToan
          transactionInfo={transactionInfo}
          infoDot={infoDot}
          isPhanHieu={isPhanHieu}
        />
        {/* <ItemLabel
          label={translate('slink:QR_code')}
          onPress={() => checkPermision()}
          value={translate('slink:Download_QR')}
          isLast={true}
        />
        <Box alignSelf="center">
          <FastImage
            source={{ uri: qrThanhToan }}
            defaultSource={R.images.logoApp}
            resizeMode="contain"
            style={styles.image}
          />
        </Box> */}
      </Box>
      <HuongDanThanhToan
        codePayment={transactionInfo?.identityCode}
        isVisible={visible}
        isPhanHieu={isPhanHieu}
        closeButton={() => setvisible(false)}
      />
    </Box>
  );
};

export default QRThanhToan;

const styles = StyleSheet.create({
  image: {
    width: WIDTH(300),
    height: WIDTH(300),
  },
});
