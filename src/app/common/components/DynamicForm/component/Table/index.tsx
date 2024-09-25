/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import R from '@assets/R';
import { DVMC_TYPE, getFontSize, HEIGHT, WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemTrong from '@components/Item/ItemTrong';
import { HelperText } from '@libcomponents/helper-text';
import ItemInfor from '@libcomponents/ItemTable';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

const Table = (props: any) => {
  const {
    label,
    relatedElement,
    changeListFile,
    arrayFile,
    disableDelete,
    isRequired,
    error,
  } = props;

  const [tableData, setTableData] = React.useState<any>([]);

  useEffect(() => {
    changeListFile(arrayFile);

    setTableData(arrayFile ?? []);
  }, []);

  const handleSeeDocument = (item: any, index?: number) => {
    navigateScreen(APP_SCREEN.THEMMOITABLE, {
      relatedElement: item,
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
    navigateScreen(APP_SCREEN.THEMMOITABLE, {
      onAddItem,
      relatedElement,
    });
  };

  const onAddItem = (item: any, index: number | undefined) => {
    let newData = tableData;

    if (index) {
      newData.splice(index, 1, item);
    } else {
      newData = [...tableData, item];
    }

    changeListFile && changeListFile(newData);

    setTableData(newData);
  };

  const tableahead = [
    translate('slink:No'),
    ...(relatedElement?.length >= 1 ? [relatedElement?.[0]?.label] : []),
    ...(relatedElement?.length >= 2 ? [relatedElement?.[1]?.label] : []),
  ];

  const widthArr = [
    WIDTH(60),
    ...(relatedElement?.length === 1
      ? [WIDTH(311 - 60)]
      : relatedElement?.length < 1
      ? []
      : [WIDTH(140)]),
    ...(relatedElement?.length > 1 ? [WIDTH(311 - 140 - 60)] : []),
  ];

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.textLabel}>
          <Text style={styles.label}>
            {`${label ?? ''}`}
            {isRequired && <Text style={styles.dot}>{' * '}</Text>}
          </Text>
        </View>
      )}
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

export default Table;

const ListFile = ({
  tableahead,
  widthArr,
  data,
  ongoToAdd,
  disableDelete,
  handleSeeDocument,
}: any) => {
  const tableData = data?.map((item: any, index: number) => {
    const value1 =
      item?.[0]?.type === DVMC_TYPE.DATE_PICKER
        ? moment(item?.[0]?.value).format('DD/MM/YYYY')
        : item?.[0]?.type === DVMC_TYPE.DATE_TIME_PICKER
        ? moment(item?.[0]?.value).format('HH:mm DD/MM/YYYY')
        : typeof item?.[0]?.value === 'string' ||
          typeof item?.[1]?.value === 'number'
        ? item?.[0]?.value
        : '--';

    const value2 =
      item?.[1]?.type === DVMC_TYPE.DATE_PICKER
        ? moment(item?.[1]?.value).format('DD/MM/YYYY')
        : item?.[1]?.type === DVMC_TYPE.DATE_TIME_PICKER
        ? moment(item?.[1]?.value).format('HH:mm DD/MM/YYYY')
        : typeof item?.[1]?.value === 'string' ||
          typeof item?.[1]?.value === 'number'
        ? item?.[1]?.value
        : '--';

    return [
      <ItemInfor
        onPress={() => handleSeeDocument(item, index)}
        key={index}
        content={String(index + 1)}
      />,
      ...(tableahead?.length >= 2
        ? [
            <ItemInfor
              onPress={() => handleSeeDocument(item, index)}
              key={index}
              content={value1}
            />,
          ]
        : []),
      ...(tableahead?.length >= 3
        ? [
            <ItemInfor
              onPress={() => handleSeeDocument(item, index)}
              key={index}
              content={value2}
            />,
          ]
        : []),
    ];
  });

  return (
    <View style={styles.viewTable}>
      {data?.length > 0 ? (
        <BaseTableComponent
          tableHead={tableahead}
          widthArr={widthArr}
          tableData={tableData}
          contentContainerStyle={styles.contentContainer}
        />
      ) : (
        <ItemTrong customStyle={styles.viewtrong} />
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
  container: {
    zIndex: 10,
    paddingVertical: HEIGHT(8),
  },
});
