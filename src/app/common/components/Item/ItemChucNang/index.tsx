import React from 'react';
import { View } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemIconSVG from '@libcomponents/icon-svg';
import { Pressable, Progress, Skeleton, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

import styles from './styles';
import { ItemTrongProps } from './type';

const ItemChucNang = (props: ItemTrongProps) => {
  const {
    customStyle,
    isLoaded = true,
    content,
    subText,
    icon,
    onPress,
    chidren,
    percent,
    colorIcon,
  } = props;

  return (
    <Skeleton
      rounded={'xl'}
      isLoaded={isLoaded}
      height={'16'}
      marginBottom={HEIGHT(12)}>
      <Pressable
        hitSlop={R.themes.hitSlop}
        _pressed={R.themes.pressed}
        onPress={onPress && onPress}
        marginBottom={HEIGHT(12)}
        backgroundColor={'white'}
        paddingTop={HEIGHT(16)}
        paddingBottom={HEIGHT(16)}
        borderRadius={WIDTH(8)}
        paddingRight={WIDTH(16)}
        paddingLeft={WIDTH(16)}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        style={[R.themes.shadowOffset, customStyle]}>
        <View style={styles.viewTen}>
          <View style={styles.iconChucNang}>
            {chidren ? (
              chidren
            ) : (
              <ItemIconSVG
                title={String(icon)}
                color={colorIcon || R.colors.primaryColor}
                width={WIDTH(21)}
                height={WIDTH(21)}
              />
            )}
          </View>
          <View style={styles.viewText}>
            <Text
              fontFamily={R.fonts.BeVietnamProMedium}
              fontSize={'md'}
              color="black">
              {content}
            </Text>
            {!!subText && (
              <Text
                fontFamily={R.fonts.BeVietnamProRegular}
                fontSize={'sm'}
                color="gray.400">
                {subText}
              </Text>
            )}
            {typeof percent === 'number' && (
              <Progress mt={HEIGHT(12)} value={percent} color={'primary.500'} />
            )}
          </View>
        </View>
        <View style={styles.iconChucNang}>
          <Icon name="chevron-right" size={WIDTH(24)} color={'#848A95'} />
        </View>
      </Pressable>
    </Skeleton>
  );
};

export default ItemChucNang;
