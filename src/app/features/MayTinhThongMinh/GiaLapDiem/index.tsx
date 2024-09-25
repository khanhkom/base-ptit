/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import {
  TextInput as RNTextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  convertDiemHe10SangHe4,
  deepCloneObject,
  popupOk,
  WIDTH,
} from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemLabel from '@components/Item/ItemLabel';
import ItemTrong from '@components/Item/ItemTrong';
import BaseButton from '@components/Popup/BaseButton';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { getDSMonGiaLap } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';

import styles from './styles';

const LOAI_DIEM = {
  DIEM_HE_10: 1,
  DIEM_HE_4: 0,
};

const GiaLapDiem = () => {
  const [listValueDiem, setListValueDiem] = useState([]);

  const [loading, setloading] = useState(false);

  const [dSMon, setDSMon] = useState<any>([]);

  const valueTemp = useRef<any>([]);

  const getDanhSachMon = async () => {
    try {
      setloading(true);

      const responseDSMon: any = await getDSMonGiaLap();

      setDSMon(responseDSMon?.data?.data?.dsDiem ?? []);

      valueTemp.current = (responseDSMon?.data?.data?.dsDiem ?? []).map(
        (item: any) => ['', item?.diemTongKet ?? ''],
      );

      setloading(false);

      setListValueDiem(
        (responseDSMon?.data?.data?.dsDiem ?? []).map((item: any) => [
          '',
          item?.diemTongKet ?? '',
        ]),
      );
    } catch (error) {}
  };

  useEffect(() => {
    getDanhSachMon();
  }, []);

  const tableHead = [
    translate('slink:No'),
    translate('slink:Course_name'),
    translate('slink:Number_of_credits_short'),
    <Text style={[styles.datatext]}>
      {translate('slink:Summary_expected')}
    </Text>,
  ];

  const widthArr = [WIDTH(35), WIDTH(343 - 35 - 150), WIDTH(60), WIDTH(90)];

  const tableData = dSMon?.map((item: any, index: number) => {
    return [
      <ItemInfor key={index} content={String(index + 1)} />,
      <ItemInfor key={index} content={item?.ten ?? ''} />,
      <ItemInfor key={index} content={String(item?.soTinChi ?? '')} />,
      <ItemInfor
        key={index}
        content={String(valueTemp.current[index]?.[LOAI_DIEM.DIEM_HE_10]) ?? ''}
        type={2}
        onChangeText={val => onChangeDiem(val, index)}
      />,
    ];
  });

  const onChangeDiem = (value: string, row: number) => {
    const valueConvert =
      Number(value) < 4 ? '4' : Number(value) > 10 ? '10' : value;

    valueTemp.current[row][LOAI_DIEM.DIEM_HE_10] = Number(valueConvert);

    valueTemp.current[row][LOAI_DIEM.DIEM_HE_4] =
      valueConvert !== ''
        ? convertDiemHe10SangHe4(
            valueConvert?.includes(',')
              ? valueConvert?.replace(',', '.')
              : valueConvert,
          )
        : dSMon?.[row]?.diemThang4
        ? dSMon?.[row]?.diemThang4
        : '';
  };

  const onCalculateCPA = () => {
    const isInvalid = valueTemp.current.some(checkIsInvalid);

    if (isInvalid) {
      popupOk(translate('slink:Notice_t'), translate('slink:From_1_to_10'));
    } else {
      if (JSON.stringify(listValueDiem) === JSON.stringify(valueTemp.current)) {
        setListValueDiem(deepCloneObject(valueTemp.current));

        setloading(true);

        setTimeout(() => {
          setloading(false);
        }, 200);
      } else {
        setListValueDiem(deepCloneObject(valueTemp.current));
      }
    }
  };

  const tongTC = dSMon?.reduce(
    (total: any, monHoc: any, indexMonHoc: number) =>
      total +
      ((!_.isNil(monHoc?.diemThang4) && monHoc?.diemThang4 !== 0) ||
      (listValueDiem?.[indexMonHoc]?.[LOAI_DIEM.DIEM_HE_4] &&
        listValueDiem?.[indexMonHoc]?.[LOAI_DIEM.DIEM_HE_4] !== '')
        ? monHoc?.soTinChi
        : 0),
    0,
  );

  const tongGPA = dSMon?.reduce(
    (total: any, monHoc: any, indexMonHoc: number) =>
      total +
      (listValueDiem?.[indexMonHoc]?.[LOAI_DIEM.DIEM_HE_4] &&
      listValueDiem?.[indexMonHoc]?.[LOAI_DIEM.DIEM_HE_4] !== ''
        ? Number(listValueDiem?.[indexMonHoc]?.[LOAI_DIEM.DIEM_HE_4])
        : monHoc?.diemThang4 ?? 0) *
        (monHoc?.soTinChi ?? 0),
    0,
  );

  const CPA =
    tongTC !== 0 ? Number((tongGPA ?? 0) / (tongTC ?? 1))?.toFixed(2) ?? 0 : 0;

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.ketQua}>
        <ItemLabel
          label={translate('slink:CPA')}
          value={CPA?.toString()}
          isLast={true}
          textValue={styles.textKetQua}
        />
      </View>
      <BaseButton
        title={translate('slink:Expect_score')}
        style={styles.btn}
        onPress={onCalculateCPA}
      />
      {dSMon?.length > 0 ? (
        <BaseTableComponent
          tableHead={tableHead}
          widthArr={widthArr}
          contentContainerStyle={styles.content}
          tableData={tableData}
        />
      ) : (
        <ItemTrong />
      )}
    </View>
  );
};

export default GiaLapDiem;
const ItemInfor = ({
  content,
  type,
  onChangeText,
}: {
  content: string;
  type?: string | number;
  onChangeText?: (e: string) => void;
}) => {
  return type === 2 ? (
    <TouchableOpacity activeOpacity={0.6} style={styles.containerInfo}>
      <RNTextInput
        defaultValue={content}
        autoCorrect={false}
        clearButtonMode={'never'}
        underlineColorAndroid={'transparent'}
        placeholderTextColor={'rgba(171, 171, 171, 1)'}
        placeholder={''}
        keyboardType="numeric"
        style={[styles.textInput]}
        onChangeText={onChangeText}
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity activeOpacity={0.6} style={styles.containerInfo}>
      <Text style={[styles.textDiem]}>{content}</Text>
    </TouchableOpacity>
  );
};

const checkIsInvalid = (item: Array<any>) => {
  const diem = Number(
    item?.[LOAI_DIEM.DIEM_HE_10]?.toString()?.includes(',')
      ? item?.[LOAI_DIEM.DIEM_HE_10]?.replace(',', '.')
      : item?.[LOAI_DIEM.DIEM_HE_10],
  );

  if (
    item?.[LOAI_DIEM.DIEM_HE_10] !== '' &&
    (Number.isNaN(diem) || diem < 0 || diem > 10)
  ) {
    return true;
  }

  return false;
};
