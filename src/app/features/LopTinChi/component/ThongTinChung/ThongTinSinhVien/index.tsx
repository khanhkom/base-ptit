/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import ItemInfor from '@libcomponents/ItemTable';
import { fetchDiemLHP } from '@networking/user/LopTinChiPoint';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, Center, IconButton, useTheme } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ModalBonusPoint from '../ModalBonusPoint';
import { SinhVienProps } from '../type';
interface Props {
  route: {
    params: { sinhVien: SinhVienProps; idLHP: string; onRefresh: () => void };
  };
}

export interface BonusPointProps {
  _id: string;
  lopHocPhanId: string;
  sinhVienSsoId: string;
  chuThich: string;
  diemCong: number;
  createdAt: Date;
  updatedAt: Date;
  sinhVien: { [key: string]: null | string };
}

const ThongTinSinhVien = (props: Props) => {
  const onRefresh = props?.route?.params?.onRefresh;

  const infoSV = props?.route?.params?.sinhVien;

  const idLHP = props?.route?.params?.idLHP;

  const [visible, setvisible] = useState(false);

  const [objPoint, setobjPoint] = useState<BonusPointProps | null>(null);

  const [listBonusPoint, setlistBonusPoint] = useState<BonusPointProps[]>([]);

  useEffect(() => {
    initAPI();
  }, []);

  const initAPI = async () => {
    const body = {
      page: 1,
      limit: 100,
      condition: { sinhVienSsoId: infoSV?.sinhVienSsoId },
    };

    const responseBonusPoint = await fetchDiemLHP(idLHP, body);

    setlistBonusPoint(responseBonusPoint?.data?.data?.result || []);
  };

  const tableHead = [
    translate('slink:No'),
    translate('slink:Diem_cong'),
    translate('slink:Note'),
    translate('slink:time'),
  ];

  const widthArr = [WIDTH(50), WIDTH(90), WIDTH(120), WIDTH(115)];

  const onViewBonusPoint = (obj: BonusPointProps) => {
    setobjPoint(obj);

    setvisible(true);
  };

  const tableData =
    listBonusPoint?.map((point, indexSV: number) => {
      const onTouch = () => onViewBonusPoint(point);

      const dataRow = [
        <ItemInfor
          onPress={onTouch}
          content={String(indexSV + 1)}
          key={indexSV}
        />,
        <ItemInfor
          onPress={onTouch}
          content={point?.diemCong || ''}
          key={indexSV}
        />,
        <ItemInfor
          onPress={onTouch}
          content={point?.chuThich || ''}
          key={indexSV}
        />,
        <ItemInfor
          onPress={onTouch}
          content={moment(point?.updatedAt).format('HH:mm DD/MM/YYYY')}
          key={indexSV}
        />,
      ];

      return dataRow;
    }) ?? [];

  const onAdd = () => {
    setobjPoint(null);

    setvisible(true);
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={infoSV?.sinhVien?.ten || translate('slink:Student')} />
      <Box flex={1} paddingTop={HEIGHT(24)}>
        {listBonusPoint?.length === 0 ? (
          <ItemTrong />
        ) : (
          <BaseTableComponent
            tableHead={tableHead}
            widthArr={widthArr}
            tableData={tableData}
          />
        )}
      </Box>
      {visible && (
        <ModalBonusPoint
          objPoint={objPoint}
          onRefresh={() => {
            initAPI();

            onRefresh();
          }}
          idLHP={idLHP}
          hideDetail
          sinhVien={infoSV}
          modalVisible={visible}
          turnOffModel={() => setvisible(false)}
        />
      )}
      <ViewPlus onAdd={onAdd} />
    </Box>
  );
};

export default ThongTinSinhVien;
const ViewPlus = (props: { onAdd: () => void }) => {
  const { onAdd } = props;

  const theme = useTheme();

  return (
    <Center bottom={HEIGHT(100)} right={WIDTH(16)} position={'absolute'}>
      <IconButton
        mb="4"
        onPress={onAdd}
        variant="solid"
        bg="indigo.500"
        colorScheme="indigo"
        borderRadius="full"
        icon={
          <AntDesign
            size={WIDTH(22)}
            name={'plus'}
            color={theme.colors.white}
          />
        }
      />
    </Center>
  );
};
