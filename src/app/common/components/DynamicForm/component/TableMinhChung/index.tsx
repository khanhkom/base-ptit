/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemTrong from '@components/Item/ItemTrong';
import { HelperText } from '@libcomponents/helper-text';
import ItemInfor from '@libcomponents/ItemTable';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';

const TableMinhChung = (props: any) => {
  const { label, changeListFile, arrayFile, disableDelete, isRequired, error } =
    props;

  const [tableData, setTableData] = React.useState<any>(arrayFile ?? []);

  const handleSeeDocument = (item: any, index?: number) => {
    navigateScreen(APP_SCREEN.THEMMOIMC, {
      item,
      disabled: disableDelete,
      onAddItem,
      index,
    });
  };

  const handleDelete = (index: number) => {
    const newData = tableData;

    newData.splice(index, 1);

    changeListFile && changeListFile(newData);

    setTableData(JSON.parse(JSON.stringify(newData)));
  };

  const ongoToAdd = () => {
    navigateScreen(APP_SCREEN.THEMMOIMC, {
      onAddItem,
    });
  };

  const onAddItem = async (item: any, index: number | undefined) => {
    let newData = tableData;

    if (index !== undefined) {
      newData.splice(index, 1, item);
    } else {
      newData = [...tableData, item];
    }

    changeListFile && changeListFile(newData);

    setTableData(newData);
  };

  const tableahead = [
    translate('slink:No'),
    'Tên minh chứng',
    translate('hoSoNhanSu:fileDinhKem'),
  ];

  const widthArr = [WIDTH(60), WIDTH(140), WIDTH(311 - 140 - 60)];

  return (
    <View style={styles.container}>
      <View style={styles.textLabel}>
        <Text style={styles.label}>
          {`${label ?? ''}`}
          {isRequired && <Text style={styles.dot}>{' * '}</Text>}
        </Text>
      </View>
      <ListFile
        ongoToAdd={ongoToAdd}
        tableahead={tableahead}
        widthArr={widthArr}
        disableDelete={disableDelete}
        handleDelete={handleDelete}
        data={tableData}
        handleSeeDocument={handleSeeDocument}
      />
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </View>
  );
};

export default TableMinhChung;

const ListFile = ({
  tableahead,
  widthArr,
  data,
  ongoToAdd,
  disableDelete,
  handleSeeDocument,
}: any) => {
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
        content={item?.tenMinhChung ?? '--'}
      />,
      <ItemInfor
        textStyle={styles.textLink}
        link={item?.url}
        key={index}
        content={translate('slink:See_details')}
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
      {!disableDelete && (
        <Text
          disabled={disableDelete}
          onPress={ongoToAdd}
          style={styles.textThemMoi}>
          {translate('slink:Add')}
        </Text>
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
    color: 'rgba(129, 153, 215, 1)',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    marginLeft: WIDTH(8),
    textDecorationLine: 'underline',
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
  textThemMoi: {
    color: '#8199D7',
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(13),
    textDecorationLine: 'underline',
    textAlign: 'right',
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
    zIndex: 10,
    paddingVertical: HEIGHT(8),
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
