/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Controller, useController } from 'react-hook-form';

import R from '@assets/R';
import { getWidth, WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemTrong from '@components/Item/ItemTrong';
import ItemInfor from '@libcomponents/ItemTable';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import { Link, Text, VStack } from 'native-base';

const TableKeKhai = props => {
  const {
    level = 1,
    defaultValue,
    label,
    form,
    control,
    name,
    isDisabled,
    setValue,
  } = props;

  const [listResult, setlistResult] = useState<any[]>([]);

  useEffect(() => {
    if (defaultValue) {
      setlistResult(defaultValue);

      initValue();
    }
  }, [defaultValue]);

  const country = useController({
    name,
    control,
  });

  const {
    field: { onChange },
  } = country;

  const initValue = async () => {
    setValue(name, defaultValue);
  };

  const tableHead = form?.map(item => item?.label) || [];

  const widthArrGV = [
    WIDTH(61),
    ...(form?.length <= 2
      ? Array(form?.length)?.fill(
          (getWidth() - WIDTH(61)) / (form?.length - 1),
        ) || []
      : Array(form?.length)?.fill(WIDTH(130)) || []),
  ];

  const tableData =
    listResult?.map((itemSV: any, indexSV: number) => {
      const onDetail = () => {
        navigateScreen(APP_SCREEN.VIEWADDKEKHAI, {
          itemSV,
          form,
          onAddItem,
          handleDelete,
          indexSV,
        });
      };

      const tableDataValue =
        form?.map(e => {
          return (
            <ItemInfor
              disabled={isDisabled}
              onPress={onDetail}
              content={itemSV?.[e?.name] || '--'}
              key={`${indexSV}-${name}`}
            />
          );
        }) || [];

      const dataRow = [
        // <ItemInfor
        //   disabled={isDisabled}
        //   onPress={onDetail}
        //   content={indexSV + 1}
        //   key={`${indexSV}-${name}`}
        // />,
        ...tableDataValue,
      ];

      return dataRow;
    }) || [];

  const handleDelete = (index: number) => {
    const fileList: any = [...listResult];

    fileList.splice(index, 1);

    setlistResult(fileList);

    onChange(fileList);
  };

  const onAddItem = (obj: any, index?: number | undefined) => {
    let newData: any = [...listResult];

    if (index !== undefined) {
      newData.splice(index, 1, obj);
    } else {
      newData = [...newData, obj];
    }

    setlistResult(newData);

    onChange(newData);
  };

  const navigate = () => {
    navigateScreen(APP_SCREEN.VIEWADDKEKHAI, { form, onAddItem });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={() => {
        return (
          <VStack alignItems={'center'}>
            <Text
              mt={level === 0 ? '2' : '0'}
              mb={'2'}
              width={WIDTH(343)}
              flex={1}
              fontFamily={
                level === 0
                  ? R.fonts.BeVietnamProMedium
                  : R.fonts.BeVietnamProRegular
              }
              fontSize={'xs'}
              color={level === 0 ? 'black' : 'gray.500'}>
              {label}
            </Text>
            {!isDisabled && (
              <Link
                width={WIDTH(343)}
                onPress={navigate}
                _text={{
                  color: 'cyan.600',
                }}
                isUnderlined>
                {translate('slink:Add')}
              </Link>
            )}
            {listResult?.length === 0 ? (
              <ItemTrong customStyle={{ marginTop: 0, marginBottom: 0 }} />
            ) : (
              <BaseTableComponent
                tableHead={tableHead}
                widthArr={widthArrGV}
                tableData={tableData}
              />
            )}
          </VStack>
        );
      }}
    />
  );
};

export default TableKeKhai;
