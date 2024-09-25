import React from 'react';

import R from '@assets/R';
import { WIDTH } from '@common';
import { Text, VStack } from 'native-base';

import InputTaiSanForm from './Input/InputTaiSanForm';

const TongThuNhapComponent = props => {
  const { item, index, detailKeKhai, control, isDisabled } = props;

  return (
    <VStack paddingX={WIDTH(16)}>
      <Text
        fontFamily={R.fonts.BeVietnamProMedium}
        fontSize={'xs'}
        color={'black'}>
        {`${index + 1}. ${item?.title}`}
      </Text>
      {item?.listInput?.map((e, ind) => {
        return (
          <VStack key={`${index + 1}.${ind + 1}`}>
            <Text
              width={WIDTH(343)}
              flex={1}
              fontFamily={R.fonts.BeVietnamProRegular}
              fontSize={'xs'}
              color={'gray.500'}>
              {`${index + 1}.${ind + 1}. ${e?.label}`}
            </Text>
            <InputTaiSanForm
              isDisabled={isDisabled}
              required
              defaultValue={
                detailKeKhai?.tongThuNhapGiuaHaiLanKeKhai?.[e?.name]
                  ? String(detailKeKhai?.tongThuNhapGiuaHaiLanKeKhai?.[e?.name])
                  : ''
              }
              name={e.name}
              control={control}
              error={undefined}
              type={e.type}
            />
          </VStack>
        );
      })}
    </VStack>
  );
};

export default TongThuNhapComponent;
