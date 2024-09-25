/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { FlatList, Text, View } from 'react-native';

import { TabView } from 'react-native-tab-view';

import R from '@assets/R';
import { getFontSize, WIDTH } from '@common';
import { TouchableScale } from '@libcomponents';

import styles from './styles';
interface Props {
  onIndexChange: (e: number) => void;
  renderScene: any;
  navigationState: any;
}
const TabbarLong = (props: Props) => {
  const { navigationState, onIndexChange, renderScene } = props;
  if (navigationState.routes?.length === 0) {
    return null;
  }
  return (
    <>
      <View style={styles.container2}>
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
        lazy
      />
    </>
  );
};

const Tabbar = ({ data, onChangeIndex, curIndex }: any) => {
  const flatListRef = useRef<any>(null);

  const scrollToIndex = () => {
    flatListRef.current.scrollToIndex({ index: curIndex });
  };

  useEffect(() => {
    scrollToIndex();
  }, [curIndex]);

  const textStyleHightLight = {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(14),
    color: R.colors.white,
  };

  const textStyleNonHightLight = {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.colorMain,
  };

  return (
    <FlatList
      ref={flatListRef}
      bounces={false}
      style={styles.viewTabbar}
      contentContainerStyle={styles.contentContainer}
      data={data}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item, index }) => {
        const hightLight = index === curIndex ? true : false;

        const isLast = data?.length - 1 === index;

        return (
          <TouchableScale
            onPress={() => {
              onChangeIndex(index);
            }}
            containerStyle={[
              styles.viewButton,
              {
                marginLeft: WIDTH(15),
                marginRight: isLast ? WIDTH(15) : 0,
                backgroundColor: hightLight
                  ? R.colors.colorMain
                  : R.colors.white,
              },
              hightLight && styles.shadow,
            ]}>
            <Text
              style={hightLight ? textStyleHightLight : textStyleNonHightLight}>
              {item?.title ?? ''}
            </Text>
          </TouchableScale>
        );
      }}
    />
  );
};

export default TabbarLong;
