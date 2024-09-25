/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

// styles
import { DropDown } from '@libcomponents';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import * as NavigationService from '@navigation/navigation-service';
import { getAllNamHoc, getTKGioGiang } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import TableThongKeChiTiet from './Item/TableThongKeChiTiet';
import ViewChart from './Item/ViewChart';
import styles from './styles';

const ViewDropList = ({
  title,
  defaultValue,
  data,
  onChangeItem,
}: {
  title: string;
  defaultValue: string;
  data: any[];
  onChangeItem: (val: any) => void;
}) => (
  <View style={styles.viewLine}>
    <Text style={styles.title}>{title}</Text>
    <DropDown
      defaultValue={defaultValue}
      data={data}
      placeHolder={title}
      onChangeItem={onChangeItem}
      style={styles.dropList}
      placeholderStyle={styles.text}
    />
  </View>
);

const ThongKeGioGiang = () => {
  const [listHeDaoTaoPicker, setListHeDaoTaoPicker] = useState<any[]>([]);

  const [heDaoTaoSelected, setHeDaoTaoSelected] = useState<string>('');

  const [listGioGiang, setListGioGiang] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [listNamHocPicker, setListNamHocPicker] = useState<any[]>([]);

  const [namHocSelected, setNamHocSelected] = useState<string>('');

  const listNamHoc = useRef<any[]>([]);

  const tongGioGiang = useRef<number>(0);

  const goBack = () => {
    NavigationService.goBack();
  };

  const onChangeHeDaoTao = (val?: any) => {
    setHeDaoTaoSelected(val);
  };

  const onChangeNamHoc = (val: any) => {
    setNamHocSelected(val);

    let indexNamHoc = 0;
    listNamHocPicker.reduce((_total: any, valueNamHoc: any, ind: number) => {
      if (valueNamHoc?.value === val) {
        indexNamHoc = ind;
      }

      return null;
    }, 0);

    const namHoc = listNamHoc.current?.[indexNamHoc];

    setHeDaoTaoSelected(translate('slink:All'));

    getDataGioGiang(namHoc?.id ?? 0);
  };

  const getDataGioGiang = async (idNamHoc: number) => {
    setLoading(true);

    try {
      let idNamHocValue = 0;
      if (idNamHoc) {
        idNamHocValue = idNamHoc;
      } else {
        let indexNamHoc = 0;
        listNamHocPicker.reduce((_total: any, val: any, ind: number) => {
          if (val?.value === namHocSelected) {
            indexNamHoc = ind;
          }

          return null;
        }, 0);

        const namHoc = listNamHoc.current?.[indexNamHoc];

        idNamHocValue = namHoc?.id ?? 0;
      }

      const responseGioGiang: any = await getTKGioGiang(idNamHocValue);

      tongGioGiang.current =
        responseGioGiang?.data?.data?.reduce(
          (total: number, item: any) => total + item?.gio,
          0,
        ) ?? 0;

      setListGioGiang(responseGioGiang?.data?.data ?? []);

      const listHeDaoTao = [
        translate('slink:All'),
        ...(responseGioGiang?.data?.data?.map((item: any) => item?.hinhThuc) ??
          []),
      ];

      setListHeDaoTaoPicker(
        listHeDaoTao.map(item => ({ label: item, value: item })),
      );

      setHeDaoTaoSelected(listHeDaoTao?.[0]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const initData = async () => {
    try {
      const responseNamhoc: any = await getAllNamHoc();

      listNamHoc.current = responseNamhoc?.data?.data;

      const namHocPicker =
        responseNamhoc?.data?.data?.map((item: any) => ({
          label: `${item?.ten_nam_hoc ?? ''}`,
          value: `${item?.ten_nam_hoc ?? ''}`,
        })) ?? [];

      setListNamHocPicker(namHocPicker);

      setNamHocSelected(namHocPicker?.[0]?.value);

      getDataGioGiang(responseNamhoc?.data?.data?.[0]?.id ?? 0);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:Statistics_lecture_hours')}
        onButton={goBack}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.viewDroplist}>
          <ViewDropList
            title={translate('slink:Training_system')}
            defaultValue={heDaoTaoSelected}
            data={listHeDaoTaoPicker}
            onChangeItem={onChangeHeDaoTao}
          />
          <View style={styles.line} />
          <ViewDropList
            title={translate('slink:School_year')}
            defaultValue={namHocSelected}
            data={listNamHocPicker}
            onChangeItem={onChangeNamHoc}
          />
        </View>
        <ViewChart
          listGioGiang={listGioGiang}
          tongGioGiang={tongGioGiang.current}
        />
        <TableThongKeChiTiet
          namHocSelected={namHocSelected}
          heDaoTaoSelected={heDaoTaoSelected}
          listGioGiang={listGioGiang}
          listNamHoc={listNamHoc.current}
          listNamHocPicker={listNamHocPicker}
          listHeDaoTaoPicker={listHeDaoTaoPicker}
        />
      </ScrollView>
      <LoadingComponent loading={loading} />
    </View>
  );
};

export default ThongKeGioGiang;
