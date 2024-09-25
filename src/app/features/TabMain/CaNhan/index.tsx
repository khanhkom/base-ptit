import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { authorize } from 'react-native-app-auth';
import FastImage from 'react-native-fast-image';
import RNFS from 'react-native-fs';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import {
  CONFIG_SSO,
  HEIGHT,
  isIos,
  openSlinkSupport,
  popupCancel,
  popupOk,
  showLink,
  showToastSuccess,
  showToastWarn,
  WIDTH,
} from '@common';
import ItemChucNang from '@components/Item/ItemChucNang';
import LoadingWithLogo from '@components/Loading/LoadingWithLogo';
import { showToast } from '@components/Toast';
import { DEFAULT_MOST_USED_FUNCTION_CONFIG } from '@config/module';
import { RATE_APP_STORE_LINK, RATE_GOOGLE_STORE_LINK } from '@env';
import ItemIconSVG from '@libcomponents/icon-svg';
import { navigateScreen, resetScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { logOutSSO } from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import { KEY_STORAGE, load } from '@utils/storage';
import { Pressable, Text, useDisclose, useTheme } from 'native-base';

// import ModalLanguage from './component/ModalLanguage';
import SettingModal from './component/SettingModal';
import ItemInfo from './ItemInfo';
import styles from './styles';

const CaNhan = () => {
  const [loading, setloading] = useState(false);

  const [listRole, setListRole] = useState([]);

  const { account } = useSelector(selectAppConfig);

  useEffect(() => {
    trackEvent(MixPanelEvent.BUTTON_CA_NHAN);

    getChucNang();
  }, []);

  const getChucNang = async () => {
    const res = await load(KEY_STORAGE.LIST_ROLE);

    setListRole(res);
  };

  // Đường dẫn đến thư mục cache
  const cachePath = RNFS.CachesDirectoryPath;

  // Hàm kiểm tra sự tồn tại của thư mục
  const isCacheExists = async () => {
    try {
      const isExists = await RNFS.exists(cachePath);

      return isExists;
    } catch (error) {
      return false;
    }
  };

  // Hàm xóa cache
  const clearCache = async () => {
    try {
      const cacheExists = await isCacheExists();

      if (cacheExists) {
        await RNFS.unlink(cachePath);

        showToastSuccess(translate('slink:Cache_cleared_successfully'));
      } else {
        showToastWarn(translate('slink:You_cleared_cache'));
      }
    } catch (error) {
      showToastWarn(translate('slink:Failed'));
    }
  };

  const listChucNang = [
    ...(account?.isGiaoVien
      ? [{ title: translate('slink:HR_records') }]
      : [{ title: translate('slink:Personal_information') }]),
    ...(listRole?.length === 2
      ? [{ title: translate('slink:Roles_change') }]
      : []),
    { title: translate('slink:Change_pass') },
    { title: translate('slink:Saved'), active: false },
    { title: translate('slink:Office_365') },
    { title: translate('slink:Language') },
    { title: translate('slink:Setting') },
    { title: translate('slink:Rating') },
    { title: translate('slink:Support') },
    { title: translate('slink:Clear_cache') },
    { title: translate('slink:Clear_cache') },
  ];

  const logOutSlink = async () => {
    setloading(true);

    try {
      await logOutSSO();

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const onNavigate = (title: string) => {
    switch (title) {
      case translate('slink:Personal_information'):
        navigateScreen(APP_SCREEN.TRANGCANHAN);

        break;
      case translate('slink:Saved'):
        navigateScreen(APP_SCREEN.DALUU);

        break;
      case translate('slink:Roles_change'):
        resetScreen(APP_SCREEN.SWITCHROLE, {
          listChucNang: listRole,
          token: account?.token,
        });

        break;
      case translate('slink:Guidelines_doc'):
        navigateScreen(APP_SCREEN.VANBANHUONGDAN);

        break;
      case translate('slink:HR_records'):
        navigateScreen(APP_SCREEN.HOSONHANSU);

        break;

      case translate('slink:Logout'): {
        popupCancel(
          translate('slink:Notice_t'),
          translate('slink:Sign_out_?'),
          () => {
            logOutSlink();
          },
        );

        break;
      }

      case translate('slink:Office_365'): {
        showLink('https://www.office.com/?auth=2');

        break;
      }

      case translate('slink:Rating'): {
        showLink(isIos ? RATE_APP_STORE_LINK : RATE_GOOGLE_STORE_LINK);

        break;
      }

      case translate('slink:Support'): {
        openSlinkSupport();

        break;
      }

      case translate('slink:Change_pass'):
        DoiMatKhauApp();

        break;
      case translate('slink:Clear_cache'):
        clearCache();

        break;
      // case translate('slink:Language'):
      //   onOpen();

      //   break;
      case translate('slink:Setting'):
        onOpen();

        break;

      default:
        popupOk(
          translate('slink:Notice_t'),
          translate('slink:On_working_func'),
        );

        break;
    }
  };

  const DoiMatKhauApp = async () => {
    const config = {
      ...CONFIG_SSO,
      additionalParameters: { kc_action: 'UPDATE_PASSWORD' },
    };

    const result = await authorize(config);

    if (result?.authorizeAdditionalParameters?.kc_action_status === 'success') {
      showToast({
        msg: translate('slink:Change_pass_success'),
        interval: 4000,
        type: 'success',
      });
    } else {
      showToast({
        msg: translate('slink:Change_pass_fail'),
        interval: 4000,
        type: 'error',
      });
    }
  };

  const { onOpen, isOpen, onClose } = useDisclose();

  const listFunc = listChucNang?.filter(item =>
    DEFAULT_MOST_USED_FUNCTION_CONFIG?.includes(item?.title),
  );

  return (
    <View style={styles.container}>
      <View style={styles.viewAva}>
        <FastImage
          style={styles.ava}
          resizeMode="cover"
          source={R.images.bgLogo}
        />
      </View>
      <ItemInfo />
      <FlatList
        style={styles.list}
        data={listFunc}
        extraData={listFunc}
        bounces={false}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          <DangXuat onPress={() => onNavigate(translate('slink:Logout'))} />
        }
        renderItem={({ item, index }) => (
          <ItemChucNang
            key={index}
            content={item?.title}
            icon={item?.title}
            onPress={() => onNavigate(item?.title)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      <SettingModal isOpen={isOpen} onClose={onClose} />
      {/* <ModalLanguage isOpen={isOpen} onClose={onClose} /> */}
      <LoadingWithLogo loading={loading} />
    </View>
  );
};

export default CaNhan;
const DangXuat = ({ onPress }: { onPress?: () => void }) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress && onPress}
      backgroundColor="white"
      borderRadius={WIDTH(8)}
      paddingX={WIDTH(16)}
      borderWidth={1}
      borderColor="red.600"
      paddingY={HEIGHT(12)}
      flexDirection="row"
      justifyContent={'center'}
      alignItems="center">
      <Text
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'md'}
        mr="2"
        color={'red.600'}>
        {translate('slink:Logout')}
      </Text>
      <ItemIconSVG
        color={theme.colors.red[600]}
        title={translate('slink:Logout')}
      />
    </Pressable>
  );
};
