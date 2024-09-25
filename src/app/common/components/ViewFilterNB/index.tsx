import React from 'react';

import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import { HEIGHT } from '@config/function';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { translate } from '@utils/i18n/translate';
import { Box, IBoxProps } from 'native-base';

export interface ViewFilterNBProps extends IBoxProps {
  data: { label: string; value: string }[];
  placeholder?: string;
  loading?: boolean;
  onChange: (e: string) => void;
  defaultValue?: any;
}
const ViewFilterNB = ({
  loading = false,
  data,
  onChange,
  placeholder,
  defaultValue,
  ...rest
}: ViewFilterNBProps) => {
  return (
    <Box marginBottom={HEIGHT(12)} {...rest}>
      <SingleSelect
        w={'full'}
        data={data}
        defaultValue={defaultValue ? defaultValue : data?.[0]?.value}
        onChangeValue={onChange}
        placeholder={placeholder || translate('slink:Select')}
      />
      <LoadingComponent size={'small'} loading={loading} />
    </Box>
  );
};

export default ViewFilterNB;
