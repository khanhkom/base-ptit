/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Animated, FlatList, Image, Text, View } from 'react-native';

import R from '@assets/R';
import { HEIGHT, TAB_MAIN, WIDTH } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { Pressable } from 'native-base';

import styles from './styles';

const CustomTabbar = (props: {
  onChangeTab: (e: number) => void;
  currentIndex: number;
  menuTabBar: { title: string }[];
}) => {
  const { onChangeTab, currentIndex, menuTabBar } = props;

  const onChangeIndex = (index: number) => {
    if (index === TAB_MAIN.WALL) {
      onNavigateWall();

      return;
    }

    onChangeTab && onChangeTab(index);
  };

  const onNavigateWall = () => {
    navigateScreen(APP_SCREEN.THOIKHOABIEUV2);
  };

  return (
    <Animated.View style={styles.tabbarBg}>
      <CirCleBtn onPress={onNavigateWall} />
      <FlatList
        data={menuTabBar}
        extraData={currentIndex}
        keyExtractor={item => item?.title}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        horizontal
        renderItem={({ item, index }) => (
          <ItemTabBar
            item={item}
            index={index}
            onChange={() => onChangeIndex(index)}
            currentIndex={currentIndex}
          />
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Animated.View>
  );
};

export default CustomTabbar;
const ItemTabBar = ({ item, index, onChange, currentIndex }: any) => {
  const color = index === currentIndex ? R.colors.colorMain : R.colors.borderCE;

  const colorIcon =
    index !== TAB_MAIN.WALL
      ? index === currentIndex
        ? R.colors.colorMain
        : R.colors.borderCE
      : R.colors.transparent;

  return (
    <Pressable _pressed={R.themes.pressed} onPress={onChange}>
      <View style={styles.itemContainer}>
        <View style={styles.viewIcon}>
          <ItemIconSVG title={item?.title} color={colorIcon} />
        </View>
        <View style={styles.text}>
          <Text style={[styles.title, { color }]}>{item?.title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const CirCleBtn = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      hitSlop={R.themes.hitSlop}
      _pressed={R.themes.pressed}
      style={R.themes.shadowGray}
      width={WIDTH(54)}
      height={WIDTH(54)}
      borderRadius={WIDTH(54) / 2}
      justifyContent="center"
      alignItems="center"
      backgroundColor="white"
      bottom={HEIGHT(51)}
      alignSelf="center"
      position="absolute"
      onPress={onPress}>
      <View style={[styles.viewCircleBtnInside]}>
        <Image
          source={R.images.logowithoutbackground}
          resizeMode="contain"
          style={styles.circleBtnIcon}
        />
      </View>
    </Pressable>
  );
};
