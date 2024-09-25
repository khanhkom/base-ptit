import { Pressable, Text } from 'native-base';
import React from 'react';
import R from '@assets/R';
import { translate } from '@utils/i18n/translate';
const TextSaved = ({
  isSaved,
  visible,
  onPress,
}: {
  isSaved: boolean;
  visible: boolean;
  onPress: () => void;
}) => {
  if (visible) {
    return (
      <Pressable
        hitSlop={R.themes.hitSlop}
        _pressed={R.themes.pressed}
        onPress={onPress}>
        <Text
          color={isSaved ? 'red.600' : 'rgba(0, 132, 255, 1)'}
          fontFamily={R.fonts.BeVietnamProRegular}
          fontSize={'xs'}
          textDecorationLine="underline">
          {isSaved ? translate('slink:Un_save') : translate('slink:Save')}
        </Text>
      </Pressable>
    );
  }
  return null;
};

export default TextSaved;
