/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import BaseTableComponent from '@components/BaseTableComponent';
import ButtonAdd from '@components/Item/componentQuyTrinhDong/ButtonAdd';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import ItemTrong from '@components/Item/ItemTrong';
import { HEIGHT, WIDTH } from '@config/function';
import { CauHinhLoaiHinhProps } from '@features/KhaiBaoQuyTrinh/type';
import { HelperText } from '@libcomponents';
import ItemInfor from '@libcomponents/ItemTable';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import styles from './styles';

import ItemTableQTD from '../ItemTableQTD';
interface Props {
  label?: string;
  error?: string;
  required?: boolean;
  defaultValue?: any[];
  onChange?: (e: any) => void;
  item: CauHinhLoaiHinhProps;
}
const TableQuyTrinh = (props: Props) => {
  const { label, required, defaultValue, item, error, onChange } = props;

  const [listdata, setListData] = useState<any[]>([]);

  useEffect(() => {
    defaultValue && setListData(defaultValue);
  }, [defaultValue]);

  const headerVisible = item?.danhSachCot?.filter(e => {
    if (item?.danhSachCotHienThi?.length === 0) {
      return true;
    } else {
      return item?.danhSachCotHienThi?.includes(e?.ma);
    }
  });

  const labelHeaderVisible = headerVisible?.map(e => e?.ten) ?? [];

  const tableahead = [translate('slink:No'), ...labelHeaderVisible];

  const widthArr = [
    WIDTH(43),
    ...Array(tableahead?.length - 1).fill(WIDTH(150)),
  ];

  const tableData = listdata?.map((data: any, index: number) => {
    const dataItem = headerVisible?.map(e => {
      return { ...e, value: data?.[e?.ma] };
    });

    const tableDataS =
      dataItem?.map(e => {
        return (
          <ItemTableQTD
            onPress={() => onAdd(data, index)}
            key={index}
            info={e}
          />
        );
      }) ?? [];

    return [
      <ItemInfor
        key={index}
        onPress={() => onAdd(data, index)}
        content={String(index + 1)}
      />,
      ...tableDataS,
    ];
  });

  const onAdd = (dataInit?: any, index?: number) => {
    navigateScreen(APP_SCREEN.ADDTABLE, {
      item,
      getData,
      dataInit,
      index,
      delItem: handleDelete,
    });
  };

  const handleDelete = (index: number) => {
    const fileList: any = [...listdata];

    fileList.splice(index, 1);

    setListData(fileList);

    onChange && onChange(fileList);
  };

  const getData = (data: any, indexItem: number | undefined) => {
    let newData = listdata;

    if (indexItem !== undefined) {
      newData.splice(indexItem, 1, data);
    } else {
      newData = [...listdata, data];
    }

    setListData(newData);

    onChange?.(newData);
  };

  return (
    <Box flex={1}>
      <Box marginBottom={HEIGHT(4)} style={styles.buttoncontainer}>
        <TextLabelQuyTrinh label={label} isRequired={required} />
        <ButtonAdd error={!!error} onAdd={() => onAdd()} />
      </Box>
      {tableData?.length > 0 ? (
        <BaseTableComponent
          tableHead={tableahead}
          tableData={tableData}
          widthArr={widthArr}
        />
      ) : (
        <ItemTrong customStyle={{ marginBottom: 0, marginTop: 0 }} />
      )}
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </Box>
  );
};

export default TableQuyTrinh;
