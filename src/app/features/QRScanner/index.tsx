/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inline-comments */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Animated, Easing, View } from 'react-native';

import { BarCodeReadEvent } from 'react-native-camera';
import FastImage from 'react-native-fast-image';
import QRCodeScanner from 'react-native-qrcode-scanner';

import R from '@assets/R';
import { EQuetQR, showToastError, showToastSuccess, WIDTH } from '@common';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import { checkInThuVien } from '@networking/user';
import { diemDanhTKB } from '@networking/user/QuetQR';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import { useTheme } from 'native-base';

import styles from './styles';

const QRScanner = () => {
  const [loading, setLoading] = useState(false);

  // const [scanner, setScanner] = useState<QRCodeScanner | null>(null);

  const onSuccess = async (responseQR: BarCodeReadEvent) => {
    setLoading(true);

    const module = responseQR?.data?.split('|')?.[2];

    const maNhomQr = responseQR?.data?.split('|')?.[3];

    const otp = responseQR?.data?.split('|')?.[4];

    trackEvent(MixPanelEvent.QUET_MA_QR);

    let response: any;
    switch (module) {
      case EQuetQR.TKB: {
        const body = { otp, maNhomQr };

        response = await diemDanhTKB(body);

        if (response?.status) {
          setTimeout(goBack, 1000);
        } else {
          setTimeout(goBack, 1000);
        }

        break;
      }

      case EQuetQR.SLINK_THU_VIEN: {
        try {
          const body = {
            qrCode: responseQR?.data || '',
          };

          const res: any = await checkInThuVien(body);

          const loaiCheck = res?.data?.data?.trangThaiCheckOut;

          setLoading(false);

          if (res?.status) {
            showToastSuccess(
              loaiCheck
                ? translate('slink:Check_out_success')
                : translate('slink:Check_in_success'),
            );
          } else {
            showToastError(res?.msg || translate('slink:QR_fail'));
          }

          setTimeout(goBack, 500);
        } catch (error) {
          setLoading(false);

          showToastError(translate('slink:QR_fail'));

          setTimeout(goBack, 500);
        }

        break;
      }
      // case EQuetQR.KIEM_KE:
      //   if (extraData) {
      //     const infoTaiSanKiemKe = await getTaiSanKiemKe(
      //       extraData?._id,
      //       responseQR?.data,
      //     );

      //     setvisibleKiemKe(infoTaiSanKiemKe?.status);

      //     setinfoTaiSanKiemKe(infoTaiSanKiemKe?.data?.data);

      //     if (!infoTaiSanKiemKe?.status) {
      //       setreactive(true);
      //     }
      //   } else {
      //     replaceScreen(APP_SCREEN.CHITIETTAISANVATTU, {
      //       id: responseQR?.data,
      //     });
      //   }

      //   break;

      default:
        // popupOk(translate('slink:Notice_t'), translate('slink:QR_fail'), () => {
        //   setTimeout(startScan, 1000);
        // });

        break;
    }

    setLoading(false);
  };

  // const startScan = () => {
  //   if (scanner) {
  //     scanner._setScanning(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Scan_QR')} />
      <View style={styles.containerQR}>
        <QRCodeScanner
          // ref={camera => setScanner(camera)}
          fadeIn={false}
          onRead={onSuccess}
          showMarker={true}
          containerStyle={styles.qr}
          cameraStyle={styles.camera}
          customMarker={<CustomeMaker visible={true} />}
          // reactivate={reactive}
          reactivateTimeout={1000}
        />
        {/* <ModalKiemKeTaiSan
          isVisible={visibleKiemKe}
          closeButton={() => {
            setvisibleKiemKe(false);

            setTimeout(startScan, 1000);
          }}
          infoTaiSanKiemKe={infoTaiSanKiemKe}
        /> */}
        <LoadingComponent loading={loading} />
      </View>
    </View>
  );
};

export default QRScanner;
const CustomeMaker = ({ visible }: { visible: boolean }) => {
  const [animation] = useState(new Animated.Value(0));

  const [moveUp, setMoveUp] = useState(true);

  const move = () => {
    Animated.timing(animation, {
      toValue: moveUp ? 1 : 0,
      duration: 2000, // Thời gian di chuyển 1 giây
      easing: Easing.linear,
      useNativeDriver: false, // Không sử dụng native driver để sử dụng translateY
    }).start(() => {
      setMoveUp(!moveUp); // Đảo ngược giá trị để di chuyển ngược lại
    });
  };

  useEffect(() => {
    visible && move(); // Bắt đầu di chuyển khi component được render
  }, [animation, moveUp]);

  const theme = useTheme();

  return (
    <View style={styles.rectangleContainer}>
      <View style={styles.rectangle}>
        <FastImage source={R.images.khungQR} style={styles.img} />
        <Animated.View
          style={[
            styles.ani,
            {
              backgroundColor: theme.colors.primary[500],
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [WIDTH(20), WIDTH(246)], // Di chuyển từ 0 đến 300 pixel theo trục y
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};
