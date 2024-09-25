import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

// import { useTranslation } from 'react-i18next';
import CodePush from 'react-native-code-push';
import FastImage from 'react-native-fast-image';

import R from '@assets/R';
import { LIST_LANGUAGE, popupCancel, WIDTH } from '@common';
import { DEFAULT_FALLBACK_LNG_I18n } from '@env';
import { translate } from '@utils/i18n/translate';
import { KEY_STORAGE, load, save } from '@utils/storage';
import { Actionsheet, HStack, Text } from 'native-base';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const ModalLanguage = (props: Props) => {
  const { isOpen, onClose } = props;

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
      translate('slink:New_language_apply'),
      () => {
        CodePush?.restartApp?.();
      },
    );

    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
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
              onPress={() => languageKey !== item?.key && onSelect(item?.key)}>
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
  );
};

export default ModalLanguage;

const styles = StyleSheet.create({
  img: {
    height: WIDTH(20),
    width: WIDTH(20),
  },
});
