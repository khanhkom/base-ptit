import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import CodePush from 'react-native-code-push';
import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { HEIGHT, LIST_LANGUAGE, popupCancel, WIDTH } from '@common';
import { APP_DISPLAY_NAME, DEFAULT_FALLBACK_LNG_I18n } from '@env';
import { translate } from '@utils/i18n/translate';
import { KEY_STORAGE, load, save } from '@utils/storage';
import { Actionsheet, HStack, Pressable, Text, useTheme } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import { DEFAULT_MOST_USED_FUNCTION_CONFIG } from '@config/module';

const ChangeLanguage = () => {
  const theme = useTheme();

  const [visible, setvisible] = useState(false);

  const [languageKey, setlanguageKey] = useState(DEFAULT_FALLBACK_LNG_I18n);

  useEffect(() => {
    getLanguage();
  }, []);

  const getLanguage = async () => {
    const savedLanguage = await load(KEY_STORAGE.LANGUAGUE);

    if (savedLanguage) {
      setlanguageKey(savedLanguage);
    }
  };

  const onSelect = (key: string) => {
    setlanguageKey(key);

    save(KEY_STORAGE.LANGUAGUE, key);

    popupCancel(
      translate('slink:Success'),
      translate('slink:New_language_apply', { name: APP_DISPLAY_NAME }),
      () => {
        CodePush?.restartApp?.();
      },
    );

    setvisible(false);
  };

  const source = LIST_LANGUAGE?.find(item => item?.key === languageKey)?.image;
  const visibleLanguage = DEFAULT_MOST_USED_FUNCTION_CONFIG?.includes(
    translate('slink:Language'),
  );
  if (visibleLanguage) {
    return (
      <>
        <Pressable
          flexDirection={'row'}
          alignItems="center"
          onPress={() => setvisible(true)}
          position={'absolute'}
          top={HEIGHT(50)}
          right={WIDTH(0)}
          padding={'1'}>
          <FastImage style={styles.img} resizeMode="contain" source={source} />
          <Entypo
            style={styles.iconDown}
            color={theme.colors.gray[400]}
            size={WIDTH(20)}
            name="chevron-down"
          />
        </Pressable>
        <Actionsheet isOpen={visible} onClose={() => setvisible(false)}>
          <Actionsheet.Content
            _dragIndicatorWrapperOffSet={{
              py: '10',
            }}>
            {LIST_LANGUAGE?.map(item => {
              return (
                <Actionsheet.Item
                  key={item?.key}
                  backgroundColor={
                    languageKey === item?.key ? 'primary.500' : undefined
                  }
                  onPress={() =>
                    languageKey !== item?.key && onSelect(item?.key)
                  }>
                  <HStack alignItems={'center'}>
                    <FastImage
                      style={styles.img}
                      resizeMode="contain"
                      source={item?.image}
                    />
                    <Text
                      fontSize={'sm'}
                      color={languageKey === item?.key ? 'white' : 'black'}
                      fontFamily={R.fonts.BeVietnamProMedium}
                      ml={'4'}>
                      {item?.name}
                    </Text>
                  </HStack>
                </Actionsheet.Item>
              );
            })}
          </Actionsheet.Content>
        </Actionsheet>
      </>
    );
  }
  return null;
};

export default ChangeLanguage;

const styles = StyleSheet.create({
  img: {
    height: WIDTH(20),
    width: WIDTH(20),
  },
  iconDown: { marginLeft: HEIGHT(4) },
});
