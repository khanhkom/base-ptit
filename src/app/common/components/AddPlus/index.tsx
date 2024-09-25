/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { HEIGHT, WIDTH } from '@config/function';
import { IconButton, useTheme } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
interface Props {
  onAdd: () => void;
  visible?: boolean;
  customIcon?: any;
}
const AddPlus = (props: Props) => {
  const { onAdd, visible = true, customIcon } = props;

  const theme = useTheme();

  if (visible) {
    return (
      <IconButton
        mb="4"
        bottom={HEIGHT(100)}
        right={WIDTH(16)}
        position={'absolute'}
        onPress={onAdd}
        variant="solid"
        bg="primary.500"
        colorScheme="indigo"
        borderRadius="full"
        icon={
          customIcon ? (
            customIcon
          ) : (
            <AntDesign
              size={WIDTH(22)}
              name={'plus'}
              color={theme.colors.white}
            />
          )
        }
      />
    );
  }

  return null;
};

export default AddPlus;
