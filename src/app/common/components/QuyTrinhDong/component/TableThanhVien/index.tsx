/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import BaseTableComponent from '@components/BaseTableComponent';
import ButtonAdd from '@components/Item/componentQuyTrinhDong/ButtonAdd';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import ItemTrong from '@components/Item/ItemTrong';
import { HEIGHT, WIDTH } from '@config/function';
import { LoaiHinhNCKHProps } from '@features/QuanLyKhoaHocV2/type';
import { HelperText } from '@libcomponents';
import ItemInfor from '@libcomponents/ItemTable';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import styles from './styles';
interface Props {
  label?: string;
  error?: string;
  loaiHinh?: LoaiHinhNCKHProps;
  required?: boolean;
  defaultValue?: any;
  onChange?: (e: any) => void;
}
const TableThanhVien = (props: Props) => {
  const { label, required, error, onChange, defaultValue, loaiHinh } = props;

  const tinhDiem = loaiHinh?.tinhDiem;

  const tinhTheoTungNam = loaiHinh?.tinhTheoTungNam;

  const [listdata, setListData] = useState<any[]>([]);

  useEffect(() => {
    defaultValue && setListData(defaultValue);
  }, [defaultValue]);

  const onAdd = (dataInit?: any, index?: number) => {
    navigateScreen(APP_SCREEN.ADDMEMBERNCKH, {
      index,
      getData,
      loaiHinh,
      dataInit,
      delItem: handleDelete,
    });
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

  const handleDelete = (index: number) => {
    const fileList: any = [...listdata];

    fileList.splice(index, 1);

    setListData(fileList);

    onChange && onChange(fileList);
  };

  const widthArr = [
    WIDTH(43),
    WIDTH(150),
    WIDTH(150),
    WIDTH(150),
    ...(tinhDiem ? [WIDTH(150)] : []),
    ...(!tinhTheoTungNam ? [WIDTH(150)] : []),
  ];

  const tableahead = [
    translate('slink:No'),
    translate('slink:Fullname'),
    translate('slink:Place_of_work'),
    translate('slink:Role'),
    ...(tinhDiem ? [translate('slink:Diem_san_pham_NCKH')] : []),
    ...(!tinhTheoTungNam ? [translate('slink:Gio_chuan_NCKH')] : []),
  ];

  const tableData = listdata?.map((data: any, index: number) => {
    return [
      <ItemInfor
        onPress={() => onAdd(data, index)}
        key={index}
        content={index + 1}
      />,
      <ItemInfor
        onPress={() => onAdd(data, index)}
        key={index}
        content={data?.hoVaTen}
      />,
      <ItemInfor
        onPress={() => onAdd(data, index)}
        key={index}
        content={data?.donVi}
      />,
      <ItemInfor
        onPress={() => onAdd(data, index)}
        key={index}
        content={data?.danhSachVaiTro?.join(', ')}
      />,
      ...(tinhDiem
        ? [
            <ItemInfor
              onPress={() => onAdd(data, index)}
              key={index}
              content={data?.tongDiem}
            />,
          ]
        : []),
      ...(!tinhTheoTungNam
        ? [
            <ItemInfor
              onPress={() => onAdd(data, index)}
              key={index}
              content={data?.tongGio}
            />,
          ]
        : []),
    ];
  });

  return (
    <Box flex={1}>
      <Box marginBottom={HEIGHT(4)} style={styles.buttoncontainer}>
        <TextLabelQuyTrinh label={label} isRequired={required} />
        <ButtonAdd error={!!error} onAdd={() => onAdd()} />
      </Box>

      {listdata?.length > 0 ? (
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

export default TableThanhVien;
