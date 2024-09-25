/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import R from '@assets/R';
import { getWidth, HEIGHT, popupOk, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import BaseTableComponent from '@components/BaseTableComponent';
import BoxHSNS from '@components/BoxHSNS';
import ItemLabel from '@components/Item/ItemLabel';
import ItemTrong from '@components/Item/ItemTrong';
import HeaderReal from '@libcomponents/header-real';
import ItemInfor from '@libcomponents/ItemTable';
import { goBack, navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  postLichLamThemGioDuKien,
  postLichLamThemGioThucTe,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { Box, FlatList } from 'native-base';

import styles from './styles';

const ThemMoiLichLamThemGio = props => {
  const { account } = useSelector(selectAppConfig);

  const isThucTe = props?.route?.params?.isThucTe;

  const onRefresh = props?.route?.params?.onRefresh;

  const [listData, setListData] = useState<any>([]);

  const [loading, setLoading] = useState<any>(false);

  const onAdd = data => {
    setListData([...listData, data]);
  };

  const onEdit = (data, index) => {
    const newData = listData;

    newData[index] = data;

    setListData([...newData]);
  };

  const onDel = index => {
    const newData = listData;

    if (index > -1) {
      newData.splice(index, 1);
    }

    setListData([...newData]);
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.THEMMOIDANHSACHLAMTHEM, {
      onSubmitData: onAdd,
    });
  };

  const goToEdit = (item, indexSV) => {
    navigateScreen(APP_SCREEN.THEMMOIDANHSACHLAMTHEM, {
      item,
      onSubmitData: data => onEdit(data, indexSV),
      onDelete: () => onDel(indexSV),
    });
  };

  const onSubmit = async () => {
    if (listData?.length === 0) {
      popupOk('Thông báo', 'Vui lòng thêm mới ít nhất 1 công việc');

      return;
    }

    try {
      setLoading(true);

      const body = {
        maCanBo: {
          value: account?.maCanBo,
        },
        hoTen: {
          value: account?.hoTen,
        },
        tenDonVi: {
          value: account?.donViChinh?.ten,
        },
        danhSachLamThem: {
          value: listData?.map(item => {
            return {
              ...item,
              ngayLamThem: new Date(item?.ngayLamThem)?.toISOString(),
            };
          }),
        },
        ssoId: {
          value: account?.ssoId,
        },
      };

      let res;
      if (isThucTe) {
        res = await postLichLamThemGioThucTe(body);
      } else {
        res = await postLichLamThemGioDuKien(body);
      }

      if (res?.status) {
        onRefresh && onRefresh?.();

        setTimeout(goBack, 500);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const tableHead = ['CV làm thêm', 'Làm thêm vào lúc', 'Ngày làm'];

  const widthArr = [WIDTH(123), WIDTH(120), WIDTH(100)];

  const tableData =
    listData?.map((itemSV: any, indexSV: number) => {
      console.log('🚀 ~ listData?.map ~ itemSV:', itemSV);

      const dataRow = [
        <ItemInfor
          onPress={() => goToEdit(itemSV, indexSV)}
          content={itemSV?.congViecLamThem ?? '--'}
          key={indexSV + 1}
        />,
        <ItemInfor
          onPress={() => goToEdit(itemSV, indexSV)}
          content={itemSV?.lamThemVaoLuc?.toString() ?? '--'}
          key={indexSV + 1}
        />,
        <ItemInfor
          onPress={() => goToEdit(itemSV, indexSV)}
          content={
            itemSV?.ngayLamThem
              ? moment(itemSV?.ngayLamThem)?.format('DD/MM/YYYY')
              : '--'
          }
          key={indexSV + 1}
        />,
      ];

      return dataRow;
    }) ?? [];

  return (
    <Box backgroundColor={R.colors.white} style={styles.container}>
      <HeaderReal title="Thêm mới" />
      <ViewHeader account={account} />
      <BoxHSNS
        title={'Danh sách làm thêm'}
        visibleAdd={true}
        onPress={() => goToAdd()}>
        {listData?.length > 0 ? (
          <BaseTableComponent
            tableHead={tableHead}
            widthArr={widthArr}
            tableData={tableData}
            contentContainerStyle={styles.content}
          />
        ) : (
          <ItemTrong customStyle={styles.itemtrong} />
        )}
      </BoxHSNS>
      <BaseButtonNB
        isLoading={loading}
        isLoadingText={translate('slink:Loading')}
        width={WIDTH(140)}
        title={'Lưu lại'}
        onPress={onSubmit}
      />
    </Box>
  );
};

export default ThemMoiLichLamThemGio;
const ViewHeader = ({ account }) => {
  const listData = [
    {
      label: 'Mã cán bộ',
      value: account?.maCanBo,
    },
    {
      label: 'Họ và tên',
      value: account?.hoTen,
    },
    {
      label: 'Đơn vị',
      value: account?.donViChinh?.ten,
    },
  ];

  return (
    <Box
      paddingLeft={WIDTH(16)}
      paddingRight={WIDTH(16)}
      width={getWidth()}
      backgroundColor={R.colors.white}
      marginBottom={HEIGHT(24)}
      style={{ ...R.themes.shadowOffset }}
      alignSelf="center">
      <FlatList
        data={listData}
        key={'ghiChu'}
        renderItem={({ item, index }) => {
          return (
            <ItemLabel
              label={item?.label}
              value={item?.value}
              isLast={index === listData?.length - 1}
            />
          );
        }}
      />
    </Box>
  );
};
