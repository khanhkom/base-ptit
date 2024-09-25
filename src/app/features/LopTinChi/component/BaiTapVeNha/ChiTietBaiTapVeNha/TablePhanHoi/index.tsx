/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemTrong from '@components/Item/ItemTrong';
import ItemInfor from '@libcomponents/ItemTable';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import { ScrollView } from 'native-base';

const TablePhanHoi = (props: any) => {
  const { label, changeListFile, arrayFile, isRequired } = props;

  const handleSeeDocument = (item: any, index?: number) => {
    navigateScreen(APP_SCREEN.THEMMOIMC, {
      item,
      index,
    });
  };

  const tableahead = [
    translate('slink:No'),
    'Tên minh chứng',
    'Nội dung',
    'Thời gian',
    'Trạng thái',
  ];

  const widthArr = [
    WIDTH(40),
    WIDTH(140),
    WIDTH(100),
    WIDTH(100),
    WIDTH(311 - 140 - 60),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.textLabel}>
        <Text style={styles.label}>
          {`${label ?? ''}`}
          {isRequired && <Text style={styles.dot}>{' * '}</Text>}
        </Text>
      </View>
      <ListFile
        tableahead={tableahead}
        widthArr={widthArr}
        data={arrayFile}
        handleSeeDocument={handleSeeDocument}
      />
    </View>
  );
};

export default TablePhanHoi;

const ListFile = ({ tableahead, widthArr, data, handleSeeDocument }: any) => {
  const tableData = data?.map((item: any, index: number) => {
    return [
      <ItemInfor
        onPress={() => handleSeeDocument(item, index)}
        key={index}
        content={String(index + 1)}
      />,
      <ItemInfor
        onPress={() => handleSeeDocument(item, index)}
        key={index}
        content={item?.hoTen ?? '--'}
      />,
      <ItemInfor
        onPress={() => handleSeeDocument(item, index)}
        key={index}
        content={item?.noiDungTraLoi ?? '--'}
      />,
      <ItemInfor
        onPress={() => handleSeeDocument(item, index)}
        key={index}
        content={
          item?.updatedAt
            ? moment(item?.updatedAt).format('HH:mm DD/MM/YYYY')
            : '--'
        }
      />,
      <ItemInfor
        textStyle={[
          styles.textLink,
          {
            color:
              item?.trangThai === 'DA_NOP'
                ? R.colors.green007F3E
                : R.colors.red,
          },
        ]}
        link={item?.url}
        key={index}
        content={item?.trangThai === 'DA_NOP' ? 'Đã nộp' : 'Chưa nộp'}
      />,
    ];
  }) ?? [[]];

  return (
    <View style={styles.viewTable}>
      {data?.length === 0 ? (
        <ItemTrong customStyle={styles.viewtrong} />
      ) : (
        <BaseTableComponent
          tableHead={tableahead}
          widthArr={widthArr}
          tableData={tableData}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewtrong: {
    marginTop: 0,
    marginBottom: 0,
  },
  textLink: {
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    marginLeft: WIDTH(8),
  },
  viewTable: {
    marginTop: HEIGHT(8),
  },
  contentContainer: {
    paddingBottom: HEIGHT(20),
  },
  textLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    overflow: 'hidden',
  },

  dot: {
    color: R.colors.redColor,
  },
  label: {
    flex: 1,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    color: R.colors.black0,
  },
  // containerItem: {
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   marginTop: HEIGHT(18),
  // },

  // contentContainerStyle: {},
  // flatList: {
  //   flexGrow: 0,
  // },
  container: {
    // zIndex: 10,
    paddingVertical: HEIGHT(8),
    // alignItems: 'center',
  },

  // hitSlop: {
  //   bottom: 20,
  //   left: 20,
  //   right: 20,
  //   top: 20,
  // },
  // iconDelete: {
  //   position: 'absolute',
  //   right: 0,
  //   alignItems: 'center',
  //   borderRadius: WIDTH(11),
  //   height: HEIGHT(22),
  //   width: HEIGHT(22),
  //   borderWidth: 1,
  //   justifyContent: 'center',
  //   borderColor: '#ABABAB',
  // },
  // fileName: {
  //   color: R.colors.black3,
  //   fontFamily: R.fonts.BeVietnamProRegular,
  //   fontSize: getFontSize(14),
  //   maxWidth: WIDTH(290),
  //   lineHeight: getLineHeight(24),
  // },
});
