/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Animated from 'react-native-reanimated';

import { sharedTiming } from '@animated';
import R from '@assets/R';
import { WIDTH } from '@common';
import { TextInput } from '@libcomponents/text-input';
import { translate } from '@utils/i18n/translate';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';

import { DURATION_ANIMATED } from './constants';
import { styles } from './styles';
import { SnackBarItemProps } from './type';

import { Text } from '../../../library/libcomponents/text';

export const SearchItem = ({
  defaultValue,
  placeholder,
  onChangeValue,
  visible,
  onClose,
  onCancel,
  ...rest
}: SnackBarItemProps) => {
  const CustomEnteringAnimation = (values: any) => {
    'worklet';
    const animations = {
      // your animations
      transform: [
        { translateY: sharedTiming(0, { duration: DURATION_ANIMATED }) },
      ],
    };

    const initialValues = {
      // initial values for animations
      transform: [{ translateY: -values.targetHeight }],
    };

    return {
      initialValues,
      animations,
    };
  };

  const CustomExitAnimation = (values: any) => {
    'worklet';
    const animations = {
      // your animations
      transform: [
        {
          translateY: sharedTiming(-values.currentHeight, {
            duration: DURATION_ANIMATED,
          }),
        },
      ],
    };

    const initialValues = {
      // initial values for animations
      transform: [{ translateY: 0 }],
    };

    return {
      initialValues,
      animations,
    };
  };

  return visible ? (
    <View pointerEvents={'box-none'} style={[styles.container]}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onClose && onClose}
        style={{ backgroundColor: 'black', flex: 1, zIndex: 10, opacity: 0.5 }}
      />
      <Animated.View
        entering={CustomEnteringAnimation}
        exiting={CustomExitAnimation}
        style={[styles.itemBar]}>
        <View style={styles.content}>
          <TextInput
            rightChildren={
              defaultValue ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.del}
                  onPress={() => onChangeValue('')}>
                  <AntDesign name="close" size={WIDTH(12)} color={'#ABABAB'} />
                </TouchableOpacity>
              ) : (
                <View />
              )
            }
            defaultValue={defaultValue}
            placeholder={placeholder}
            placeholderTextColor={R.colors.grayba}
            onChangeText={onChangeValue}
            autoFocus={visible}
            hasAnimation={false}
            styleView={styles.view}
            leftChildren={
              <Icon name="search" size={WIDTH(20)} color={R.colors.black0} />
            }
            {...rest}
          />
          <Text onPress={onCancel && onCancel} style={styles.textHuy}>
            {translate('slink:Cancel')}
          </Text>
        </View>
      </Animated.View>
    </View>
  ) : null;
};
