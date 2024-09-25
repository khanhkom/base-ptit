/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Text, View } from 'react-native';

import R from '@assets/R';
import { CONG_VWA, dispatch, getVaiTroSlink, popupOk, WIDTH } from '@common';
import { TouchableScale } from '@libcomponents';
import ItemIconSVG from '@libcomponents/icon-svg';
import { replaceScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getUserMe, logOutSSO } from '@networking/user';
import { appActions } from '@redux-slice';
import { translate } from '@utils/i18n/translate';
import { KEY_STORAGE, save } from '@utils/storage';
import Icon from 'react-native-vector-icons/Entypo';

import styles from './styles';
interface ChucNangProps {
  scopes: string[];
  rsid: string;
  rsname: string;
  title: string;
}
interface Props {
  route?: {
    params: { infoUser: any; listChucNang: ChucNangProps[]; token: string };
  };
}

const SwitchRole = (props: Props) => {
  const listChucNang = props?.route?.params?.listChucNang ?? [];

  const [infoUser, setinfoUser] = useState();

  const getInfoUser = async () => {
    const responseUser: any = await getUserMe();

    setinfoUser(responseUser?.data?.data);
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  const token = props?.route?.params?.token ?? {};

  const list_Role =
    listChucNang?.map((item: ChucNangProps) => {
      return {
        ...item,
        title:
          item?.rsname === CONG_VWA.CONG_CAN_BO
            ? 'Cổng cán bộ'
            : 'Cổng học viên',
      };
    }) ?? [];

  const handleLoginSlink = async (response: any, phanQuyen?: any) => {
    if (
      ![CONG_VWA?.CONG_CAN_BO, CONG_VWA.CONG_HOC_VIEN].includes(
        phanQuyen?.rsname,
      )
    ) {
      popupOk(
        translate('slink:Notice_t'),
        translate('slink:Not_the_role'),
        logOutSSO,
      );

      return;
    }

    const mAccount = {
      HoVaTen: `${response?.family_name ?? ''} ${response?.given_name ?? ''}`,
      hoTen: `${response?.family_name ?? ''} ${response?.given_name ?? ''}`,
      token,
      vai_tro: phanQuyen?.rsname,
      ChucVu: getVaiTroSlink(phanQuyen?.rsname),
      vaiTro: getVaiTroSlink(phanQuyen?.rsname),
      role: phanQuyen?.rsname,
      isCanBo: phanQuyen?.rsname === CONG_VWA.CONG_CAN_BO,
      isGiaoVien: phanQuyen?.rsname === CONG_VWA.CONG_CAN_BO,
      language: 'vi',
      username: response?.preferred_username,
      accessToken: token,
      ...response,
    };

    save(KEY_STORAGE.ACCOUNT, mAccount);

    save(KEY_STORAGE.USER_NAME, mAccount?.username);

    dispatch(appActions.setAppAccount(mAccount));

    replaceScreen(APP_SCREEN.TABMAIN);
  };

  const onPress = (item: ChucNangProps) => {
    handleLoginSlink(infoUser, item);
  };

  return (
    <ImageBackground source={R.images.backgr} style={styles.container}>
      <View style={styles.viewImg}>
        <Image
          source={R.images.bannerMain}
          style={styles.img}
          resizeMode="contain"
        />
      </View>

      <View style={styles.viewPopup}>
        {/* <PersonInfo account={infoUser} /> */}
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.content}
          data={list_Role}
          renderItem={({ item, index }) => (
            <ItemRole onPress={() => onPress(item)} key={index} item={item} />
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default SwitchRole;

const ItemRole = ({
  item,
  onPress,
}: {
  item: { title: string };
  onPress: () => void;
}) => {
  return (
    <TouchableScale onPress={onPress} containerStyle={styles.containerItem}>
      <View style={styles.viewTitle}>
        <View style={styles.viewIcon}>
          <ItemIconSVG
            title={String(item?.title)}
            color={R.colors.white}
            width={WIDTH(21)}
            height={WIDTH(21)}
          />
        </View>
        <Text style={styles.textTitle}>{item?.title}</Text>
      </View>
      <View style={styles.iconChucNang}>
        <Icon
          name="chevron-right"
          size={WIDTH(24)}
          color={R.colors.primaryColor}
        />
      </View>
    </TouchableScale>
  );
};
