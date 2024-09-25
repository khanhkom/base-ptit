import React from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import { goBack } from '@navigation/navigation-service';
import Icon from 'react-native-vector-icons/Entypo';

import styles from './styles';
import { ItemProps, Props } from './type';

const HeaderReal = (props: ItemProps) => {
  const {
    title,
    hideBack = false,
    childrenRight,
    onButton,
    containerStyles,
    titleStyle,
    isStatusBarAndroidVisible,
    titleViewStyle,
    innerContainerStyles,
  } = props;

  const height = HEIGHT(70) + getStatusBarHeight(isStatusBarAndroidVisible);

  return (
    <View>
      <CustomStatusBar
        backgroundColor={R.colors.transparent}
        lightBarStyle={true}
        isStatusBarAndroidVisible={isStatusBarAndroidVisible}
      />
      <Image
        source={R.images.bgLogo}
        resizeMode="stretch"
        style={[styles.img, { height }]}
      />
      <View style={[styles.container, containerStyles && containerStyles]}>
        <View style={[styles.viewContent, innerContainerStyles]}>
          {!hideBack && (
            <TouchableOpacity
              hitSlop={R.themes.hitSlop}
              style={styles.btnBack}
              onPress={onButton || goBack}>
              <Icon
                size={WIDTH(28)}
                name="chevron-left"
                color={R.colors.white}
              />
            </TouchableOpacity>
          )}
          <View style={[styles.titleView, titleViewStyle]}>
            <Text numberOfLines={2} style={[styles.title, titleStyle]}>
              {title}
            </Text>
          </View>
          {childrenRight && (
            <View style={styles.viewRight}>{childrenRight}</View>
          )}
        </View>
      </View>
    </View>
  );
};

export default HeaderReal;

export const CustomStatusBar: React.FC<Props> = (props: Props) => {
  const { isStatusBarAndroidVisible, backgroundColor, lightBarStyle } = props;

  const color = backgroundColor || R.colors.transparent;

  const bar = lightBarStyle ? 'light-content' : 'dark-content';

  const height = getStatusBarHeight(isStatusBarAndroidVisible);

  return (
    <View style={{ height, backgroundColor: color }}>
      <StatusBar
        networkActivityIndicatorVisible={true}
        translucent
        backgroundColor={color}
        barStyle={bar}
      />
    </View>
  );
};
