import React, { useEffect, useState } from 'react';

import ViewFilterNB from '@components/ViewFilterNB';
import { HEIGHT, WIDTH } from '@config/function';
import { getDSKyHoc } from '@networking/user/DangKyTinChi';

import { HocKyProps } from './type';
interface Props {
  onChangeObject?: (e: HocKyProps | undefined) => void;
  onChange?: (e: string) => void;
  width?: number;
  marginBottom?: number;
}
const SelectHocKy = (props: Props) => {
  const { onChange, onChangeObject, width, marginBottom } = props;

  const [refreshing, setRefreshing] = useState(false);

  const [listHocKy, setlistHocKy] = useState<HocKyProps[]>([]);

  useEffect(() => {
    getHocKy();
  }, []);

  const onChangeValue = (value: string) => {
    onChange && onChange(value);

    if (onChangeObject) {
      const ObjectValue = listHocKy?.find(item => item?.ma === value);

      onChangeObject && onChangeObject(ObjectValue);
    }
  };

  const getHocKy = async () => {
    try {
      setRefreshing(true);

      const bodyKyHoc = { condition: { active: true }, sort: { ma: -1 } };

      const responseKyHoc = await getDSKyHoc(bodyKyHoc);

      const listKyHoc = responseKyHoc?.data?.data;

      setlistHocKy(listKyHoc);

      const ObjectValue = responseKyHoc?.data?.data?.find(
        (item: HocKyProps) => item?.ma === listKyHoc?.[0]?.ma,
      );

      onChange && onChange(listKyHoc?.[0]?.ma);

      onChangeObject && onChangeObject(ObjectValue);

      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };

  return (
    <ViewFilterNB
      loading={refreshing}
      width={width ?? WIDTH(343)}
      marginBottom={marginBottom ?? HEIGHT(16)}
      alignSelf="center"
      data={listHocKy?.map(item => {
        return { value: item?.ma, label: item?.ten };
      })}
      onChange={onChangeValue}
    />
  );
};

export default SelectHocKy;
