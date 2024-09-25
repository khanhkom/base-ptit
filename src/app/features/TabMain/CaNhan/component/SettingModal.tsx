import React from 'react';
import { Actionsheet, Text } from 'native-base';
import { WIDTH } from '@common';
import R from '@assets/R';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const CHUC_NANG = [{ title: translate('slink:Thiet_lap_mau_lich') }];
const SettingModal = (props: Props) => {
  const { isOpen, onClose } = props;
  const onNavigate = (title: string) => {
    onClose();
    switch (title) {
      case translate('slink:Thiet_lap_mau_lich'):
        navigateScreen(APP_SCREEN.THIETLAPMAULICH);
        break;

      default:
        break;
    }
  };
  const onButton = (title: string) => {
    onClose();
    setTimeout(() => {
      onNavigate(title);
    }, 500);
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
      <Actionsheet.Content
        _dragIndicatorWrapperOffSet={{
          py: '10',
        }}>
        {CHUC_NANG?.map((item, index) => (
          <Actionsheet.Item
            key={index}
            onPress={() => onButton(item?.title)}
            alignSelf={'flex-start'}
            width={WIDTH(343)}>
            <Text
              fontFamily={R.fonts.BeVietnamProMedium}
              fontSize={'md'}
              color="black">
              {item?.title}
            </Text>
          </Actionsheet.Item>
        ))}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SettingModal;
