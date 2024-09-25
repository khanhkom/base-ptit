/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { TabView } from 'react-native-tab-view';

import R from '@assets/R';
import { getFontSize } from '@common';

import styles from './styles';

const TabbarDRL = (props: any) => {
  const {
    navigationState,
    onIndexChange,
    renderScene,
    lazy = true,
    containerStyle,
  } = props;

  return (
    <>
      <View style={[styles.container, containerStyle]}>
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

export default TabbarDRL;

const Tabbar = ({ data, onChangeIndex, curIndex }: any) => {
  const textStyleHightLight = {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(10),
    color: R.colors.colorMain,
  };

  const textStyleNonHightLight = {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(10),
    color: R.colors.grayText,
  };

  return (
    <FlatList
      bounces={false}
      style={styles.viewTabbar}
      contentContainerStyle={styles.contentContainer}
      data={data}
      horizontal
      renderItem={({ item, index }) => {
        const hightLight = index === curIndex ? true : false;

        const colorDot =
          index <= curIndex ? R.colors.colorMain : R.colors.grayText;

        const colorLine1 =
          index === 0
            ? R.colors.transparent
            : index <= curIndex
            ? R.colors.colorMain
            : 'rgba(171, 171, 171, 1)';

        const colorLine2 =
          index === 2
            ? R.colors.transparent
            : index <= curIndex - 1
            ? R.colors.colorMain
            : 'rgba(171, 171, 171, 1)';

        return (
          <TouchableOpacity
            onPress={() => onChangeIndex(index)}
            activeOpacity={0.6}
            style={styles.viewButton}>
            <View style={styles.viewLine}>
              <View style={[styles.line, { backgroundColor: colorLine1 }]} />
              <View
                style={[
                  index === curIndex ? styles.dotHighLight : styles.dot,
                  { backgroundColor: colorDot },
                ]}
              />
              <View style={[styles.line, { backgroundColor: colorLine2 }]} />
            </View>
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
