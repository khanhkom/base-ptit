/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TabBar, TabView } from 'react-native-tab-view';

// import NavigationService from "../../../routers/NavigationService";
import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT, WIDTH } from '@common';
import HeaderReal from '@libcomponents/header-real';
import { translate } from '@utils/i18n/translate';

import HeaderBelow from './Item/HeaderBelow';
import TaoThongBao from './Tabs/TaoThongBao';
import ThongBaoDaGui from './Tabs/ThongBaoDaGui';
import ThongBaoSVNhan from './Tabs/ThongBaoSVNhan';

const NotificationContent = ({
  isCanBo,
  onIndexChange,
  index,
  routes,
  renderScene,
  renderTabBar,
  itemLopHC,
  loaiLop,
}: any) => {
  if (isCanBo) {
    return (
      <TabView
        onIndexChange={onIndexChange}
        navigationState={{
          index: index,
          routes: routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
      />
    );
  }

  return <ThongBaoSVNhan itemLopHC={itemLopHC} loaiLop={loaiLop} />;
};

const GuiThongBao = (props: any) => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 0, title: 'Tạo thông báo' },
    { key: 1, title: 'Thông báo đã gửi' },
  ]);

  const onIndexChange = (index: number) => {
    setIndex(index);
  };

  const renderLabel = ({ route, focused }: any) => (
    <Text
      style={[
        styles.labelStyle,
        {
          color: focused ? R.colors.black0 : R.colors.gray82,
        },
      ]}>
      {route.title}
    </Text>
  );

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicatorStyle}
      renderLabel={renderLabel}
    />
  );

  const renderScene = ({ route }: any) => {
    const itemLopHC = props.navigation?.getParam?.('item');

    const loaiLop = props.navigation?.getParam?.('loaiLop');

    switch (route.key) {
      case 0:
        return <TaoThongBao />;
      case 1:
        return <ThongBaoDaGui itemLopHC={itemLopHC} loaiLop={loaiLop} />;

      default:
        return null;
    }
  };

  const itemLopHC = props?.route?.params?.item;

  const loaiLop = props?.route?.params.loaiLop;

  const dataGiangVien = {
    chucVu: props.Account?.chucVu || '',
    hoTen: props.Account?.hoTen || translate('slink:Null_t'),
    sdt: props.Account?.soDienThoai || translate('slink:Null_t'),
  };

  const { Account } = props;

  return (
    <View style={styles.container} testID="TabThongBaoLopHC">
      <HeaderReal title={translate('slink:Notice_t')} />
      <HeaderBelow data={dataGiangVien} isGiaoVien={Account?.isCanBo} />
      <NotificationContent
        isCanBo={Account?.isCanBo}
        onIndexChange={onIndexChange}
        index={index}
        routes={routes}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        itemLopHC={itemLopHC}
        loaiLop={loaiLop}
      />
    </View>
  );
};

export default GuiThongBao;
const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.backgroundColorNew,
    flex: 1,
  },
  labelStyle: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(24),
    textTransform: 'uppercase',
  },
  tabBar: {
    backgroundColor: R.colors.white,
    borderTopWidth: WIDTH(1),
    borderTopColor: R.colors.colorf8f8f8,
    overflow: 'hidden',
  },
  indicatorStyle: {
    height: HEIGHT(2),
    backgroundColor: R.colors.colorPink,
  },
});
