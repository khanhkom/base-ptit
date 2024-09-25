import React from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import BaseButtonNB from '@components/BaseButtonNB';
import { getFontSize, WIDTH } from '@config/function';
import { Box } from 'native-base';

const ViewTwoButton = ({
  leftButton,
  rightButton,
  leftButtonTitle,
  rigthButtonTitle,
}: {
  leftButton?: () => void;
  rightButton?: () => void;
  leftButtonTitle: string;
  rigthButtonTitle: string;
}) => {
  return (
    <Box style={styles.containerButton}>
      <BaseButtonNB
        onPress={leftButton}
        style={styles.buttonEdit}
        backgroundColor={R.colors.white}
        borderColor={R.colors.primaryColor}
        text={styles.textEdit}
        title={leftButtonTitle}
      />
      <BaseButtonNB
        onPress={rightButton}
        style={styles.buttonView}
        text={styles.textButton}
        title={rigthButtonTitle}
      />
    </Box>
  );
};

export default ViewTwoButton;
const styles = StyleSheet.create({
  textButton: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textEdit: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(16),
    color: R.colors.primaryColor,
  },
  buttonEdit: {
    width: WIDTH(140),
    borderWidth: 1,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH(140),
  },
});
