/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Row, Table } from 'react-native-table-component';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';

export const PRESS_TYPE = {
  HEADER: 'HEADER',
  CELL: 'CELL',
};

const TableBaseComponent = (props: any) => {
  const {
    tableHead,
    widthArr,
    tableData,
    customBorderStyle,
    customTextStyle,
    customRowStyle,
  } = props;

  return (
    <ScrollView bounces={false} nestedScrollEnabled>
      <ScrollView horizontal bounces={false}>
        <View>
          <Table borderStyle={{ ...styles.borderStyle, ...customBorderStyle }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={[styles.text, customTextStyle]}
            />
          </Table>
          <Table borderStyle={{ ...styles.borderStyle, ...customBorderStyle }}>
            {tableData.map((rowData: any, index: number) => (
              <Row
                data={rowData}
                key={index}
                widthArr={widthArr}
                style={{ ...styles.row, ...customRowStyle }}
                textStyle={[styles.text, customTextStyle]}
              />
            ))}
          </Table>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default TableBaseComponent;

const styles = StyleSheet.create({
  header: { minHeight: HEIGHT(40), backgroundColor: R.colors.colorMain },
  text: {
    textAlign: 'center',
    color: R.colors.white,
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  row: { minHeight: WIDTH(100), backgroundColor: R.colors.white },
  borderStyle: {
    borderWidth: 2,
    borderColor: R.colors.white,
  },
});
