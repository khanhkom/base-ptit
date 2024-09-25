import React from 'react';
import { View } from 'react-native';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { dispatch, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import { Modal } from '@libcomponents/modal';
import { popupConfig } from '@redux-selector/popup';
import { popupActions } from '@redux-slice';
import { translate } from '@utils/i18n/translate';
import { Text } from 'native-base';

import styles from './styles';

const CustomDialog = () => {
  const { isVisible, title, content, onPress, onPressCancel, type } =
    useSelector(popupConfig);

  const onPressButton = () => {
    dispatch(
      popupActions.setPopupOK({
        isVisible: false,
        title: '',
        content: '',
        onPress: () => null,
        ...(!type && { onPressCancel: null }),
      }),
    );

    setTimeout(() => {
      onPress && onPress();
    }, 300);
  };

  const onCancelPress = () => {
    dispatch(
      popupActions.setPopupCancel({
        isVisible: false,
        title: '',
        content: '',
        onPress: () => null,
        onPressCancel: () => null,
        onCancelPressCallback: () => null,
      }),
    );

    setTimeout(() => {
      onPressCancel && onPressCancel();
    }, 300);
  };

  if (!isVisible) {
    return <></>;
  }

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.content}>
        <View style={styles.viewContent}>
          <Text
            color="black"
            textAlign="center"
            fontFamily={R.fonts.BeVietnamProSemiBold}
            fontSize="md">
            {title || translate('slink:Notice_t')}
          </Text>
          {content && (
            <Text
              alignSelf="center"
              fontFamily={R.fonts.BeVietnamProRegular}
              marginTop={'2'}
              textAlign="center"
              fontSize={'sm'}
              color={'gray.500'}>
              {content || ''}
            </Text>
          )}
        </View>
        {type ? (
          <BaseButtonNB
            backgroundColor={'primary.500'}
            borderWidth={1}
            borderColor={'primary.500'}
            width={WIDTH(140)}
            title={translate('slink:Agree')}
            onPress={onPressButton}
          />
        ) : (
          <View style={styles.row}>
            <BaseButtonNB
              backgroundColor={'white'}
              borderWidth={1}
              borderColor={'primary.500'}
              width={WIDTH(140)}
              text={styles.text}
              title={translate('slink:Cancel')}
              onPress={onCancelPress}
            />
            <BaseButtonNB
              backgroundColor={'primary.500'}
              borderWidth={1}
              borderColor={'primary.500'}
              width={WIDTH(140)}
              title={translate('slink:Agree')}
              onPress={onPressButton}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default CustomDialog;
