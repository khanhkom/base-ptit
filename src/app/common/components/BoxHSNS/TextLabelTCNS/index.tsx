import React from 'react';

import R from '@assets/R';
import { Box, Heading, Text } from 'native-base';
interface Props {
  label?: string;
  isRequired?: boolean;
}
const TextLabelTCNS = (props: Props) => {
  const { label, isRequired } = props;

  if (label) {
    return (
      <Box mt={'2'} mb={'1'} flexDirection={'row'}>
        <Heading size={'xs'} fontFamily={R.fonts.BeVietnamProSemiBold}>
          {isRequired && <Text color={'red.500'}>{'* '}</Text>}
          {label}
        </Heading>
      </Box>
    );
  }

  return null;
};

export default TextLabelTCNS;
