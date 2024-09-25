/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { SceneRendererProps, TabView } from 'react-native-tab-view';

import R from '@assets/R';
import { getFontSize, WIDTH } from '@common';

import styles from './styles';
interface Props {
  navigationState: any;
  onIndexChange: (e: number) => void;
  renderScene: (props: SceneRendererProps & { route: any }) => React.ReactNode;
  lazy?: boolean;
}
const TabbarCustome = (props: Props) => {
  const { navigationState, onIndexChange, renderScene, lazy = true } = props;

  return (
    <>
      <View style={styles.container}>
        <Tabbar
          data={navigationState.routes}
          onChangeIndex={onIndexChange}
          curIndex={navigationState.index}
        />
      </View>
      <TabView
        navigationState={navigationState}
        onIndexChange={onIndexChange}
        renderScene={renderScene}
        renderTabBar={() => null}
        lazy={lazy}
      />
    </>
  );
};

export default TabbarCustome;

const Tabbar = ({ data, onChangeIndex, curIndex }: any) => {
  const textStyleHightLight = {
    fontFamily: R.fonts.BeVietnamProSemiBold,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  };

  const textStyleNonHightLight = {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: '#6F6F6F',
  };

  return (
    <FlatList
      bounces={false}
      style={styles.viewTabbar}
      contentContainerStyle={styles.contentContainer}
      data={data}
      horizontal
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => {
        const hightLight = index === curIndex ? true : false;

        const isLast = data?.length - 1 === index;

        return (
          <TouchableOpacity
            onPress={() => onChangeIndex(index)}
            activeOpacity={0.6}
            style={[
              styles.viewButton,
              {
                marginLeft: isLast ? WIDTH(12) : 0,
                backgroundColor: hightLight
                  ? R.colors.white
                  : R.colors.transparent,
              },
            ]}>
            <Text
              style={hightLight ? textStyleHightLight : textStyleNonHightLight}>
              {item?.title ?? ''}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};
