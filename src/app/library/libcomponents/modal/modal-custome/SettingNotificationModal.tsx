import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import OneSignal from 'react-native-onesignal';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import R from '@assets/R';
import {
  getFontSize,
  getWidth,
  HEIGHT,
  MUTE_NOTIFICATION_OPTIONS,
  UNMUTE_NOTIFICATION_OPTIONS,
  WIDTH,
} from '@common';
import { Modal } from '@libcomponents/modal';
import * as AsyncStorageUtils from '@utils/storage';

interface Props {
  visible: boolean;
  onCloseModal: () => void;
  isMute: boolean;
  onChangeStatus: (value: boolean) => void;
}

interface ItemOption {
  title: string;
  value: number;
}

const ModalCustome: FunctionComponent<Props> = (props: Props) => {
  const { visible, onCloseModal, isMute, onChangeStatus } = props;

  const [optionList, setOptionList] = useState(MUTE_NOTIFICATION_OPTIONS);

  useEffect(() => {
    setOptionList(
      isMute ? UNMUTE_NOTIFICATION_OPTIONS : MUTE_NOTIFICATION_OPTIONS,
    );
  }, [isMute]);

  const onChangeSettingNotification = (item: ItemOption) => {
    if (isMute) {
      OneSignal.disablePush(false);

      AsyncStorageUtils.save(AsyncStorageUtils.KEY.MUTE_NOTI, 'null');

      onChangeStatus?.(false);
    } else {
      const timeEnd = `${new Date().getTime() + item?.value * 60000}`;

      AsyncStorageUtils.save(AsyncStorageUtils.KEY.MUTE_NOTI, timeEnd);

      OneSignal.setNotificationWillShowInForegroundHandler(
        notifReceivedEvent => {
          notifReceivedEvent.complete();
        },
      );

      OneSignal.disablePush(true);

      onChangeStatus?.(true);
    }

    onCloseModal?.();
  };

  const renderItem = ({ item }: { item: ItemOption }) => (
    <TouchableOpacity
      style={styles.flexRow}
      onPress={() => onChangeSettingNotification(item)}>
      <Text style={styles.text}>{item?.title}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCloseModal}
      entering={SlideInDown.duration(200)}
      exiting={SlideOutDown.duration(200)}
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.line} />
        <Text style={styles.title}>
          {isMute ? 'Thông báo đã được tắt' : 'Tắt thông báo cho ứng dụng'}
        </Text>
        <FlatList
          data={optionList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.flatlist}
        />
      </View>
    </Modal>
  );
};

export default ModalCustome;

const styles = StyleSheet.create({
  modal: { position: 'absolute', bottom: 0 },
  title: {
    fontWeight: 'bold',
    color: R.colors.textGray,
    alignSelf: 'flex-start',
    marginLeft: WIDTH(16),
    marginTop: HEIGHT(20),
    marginBottom: HEIGHT(10),
  },
  container: {
    width: getWidth(),
    borderTopLeftRadius: WIDTH(16),
    borderTopRightRadius: WIDTH(16),
    backgroundColor: R.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: HEIGHT(4),
    borderRadius: WIDTH(12),
    backgroundColor: R.colors.gray50,
    width: WIDTH(50),
    marginTop: HEIGHT(12),
  },
  flexRow: {
    paddingVertical: HEIGHT(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: getWidth(),
    borderTopWidth: 0.5,
    borderColor: R.colors.gray30,
  },
  text: {
    fontSize: getFontSize(14),
    marginLeft: WIDTH(16),
    fontFamily: R.fonts.BeVietnamProRegular,
    color: R.colors.black0,
  },
  flatlist: {
    marginBottom: HEIGHT(20),
  },
});
