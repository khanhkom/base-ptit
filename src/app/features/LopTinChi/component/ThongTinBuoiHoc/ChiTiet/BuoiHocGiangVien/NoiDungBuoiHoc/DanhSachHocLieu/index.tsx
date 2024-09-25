/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Linking } from 'react-native';

import R from '@assets/R';
import { popupOk, WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import BoxHSNS from '@components/BoxHSNS';
import ItemTrong from '@components/Item/ItemTrong';
import ItemInfor from '@libcomponents/ItemTable';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import styles from './styles';

const DanhSachHocLieu = ({
  onChange,
  defaultData,
  disable = false,
}: {
  disable?: boolean;
  defaultData?: any[];
  onChange: (value) => void;
}) => {
  const [listData, setListData] = useState<any[]>(defaultData ?? []);

  const onAdd = data => {
    setListData([...listData, data]);

    onChange([...listData, data]);
  };

  const onEdit = (data, index) => {
    const newData = listData;

    newData[index] = data;

    setListData([...newData]);

    onChange([...newData]);
  };

  const onDel = index => {
    const newData = listData;

    if (index > -1) {
      newData.splice(index, 1);
    }

    setListData([...newData]);

    onChange([...newData]);
  };

  const goToAdd = () => {
    navigateScreen(APP_SCREEN.THEMMOIDANHSACHHOCLIEU, {
      onSubmitData: onAdd,
    });
  };

  const goToEdit = (item, indexSV) => {
    if (!disable) {
      navigateScreen(APP_SCREEN.THEMMOIDANHSACHHOCLIEU, {
        item,
        onSubmitData: data => onEdit(data, indexSV),
        onDelete: () => onDel(indexSV),
      });
    }
  };

  const tableHead = ['Tên học liệu', 'Đường dẫn'];

  const widthArr = [WIDTH(173), WIDTH(170)];

  const tableData =
    listData?.map((itemSV: any, indexSV: number) => {
      const dataRow = [
        <ItemInfor
          onPress={() => goToEdit(itemSV, indexSV)}
          content={itemSV?.ten ?? '--'}
          key={indexSV + 1}
        />,
        <ItemInfor
          onPress={() => goToWebSite(itemSV?.url)}
          content={'Xem chi tiết'}
          key={indexSV + 1}
          textStyle={{ color: R.colors.textLink }}
        />,
      ];

      return dataRow;
    }) ?? [];

  return (
    <Box>
      <BoxHSNS
        title={'Danh sách học liệu'}
        visibleAdd={!disable}
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
    </Box>
  );
};

export default DanhSachHocLieu;
const goToWebSite = (link: string) => {
  Linking.canOpenURL(link).then(supported => {
    if (supported) {
      Linking.openURL(link);
    } else {
      popupOk(translate('slink:Notice_t'), `Không thể mở đường dẫn: ${link}`);
    }
  });
};
