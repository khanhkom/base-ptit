/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { ScrollView, Text, View, ViewStyle } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { HEIGHT } from '@config/function';

import styles from './styles';

const BaseTableComponent = (props: {
  contentContainerStyle?: ViewStyle;
  customeStyleData?: ViewStyle;
  tableHead: Array<any>;
  widthArr: Array<number>;
  tableData: Array<any>;
}) => {
  const {
    tableHead,
    widthArr,
    tableData,
    customeStyleData,
    contentContainerStyle,
  } = props;

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <Row data={tableHead} widthArr={widthArr} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={contentContainerStyle}
        nestedScrollEnabled>
        <View style={styles.viewContainerData}>
          {tableData?.map((rowData, index) => (
            <View
              key={index}
              style={[{ marginTop: HEIGHT(20) }, customeStyleData]}>
              <RowData data={rowData} widthArr={widthArr} />
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default BaseTableComponent;
const Row = (props: any) => {
  const { data, widthArr } = props;

  return (
    <View style={styles.viewHeader}>
      {data?.map((e: any, index: number) => {
        const typeString = typeof e === 'string';

        return (
          <View
            key={index}
            style={[styles.viewTextHeader, { width: widthArr?.[index] }]}>
            {typeString ? <Text style={styles.textHeader}>{e}</Text> : <>{e}</>}
          </View>
        );
      })}
    </View>
  );
};

const RowData = (props: any) => {
  const { data, widthArr } = props;

  return (
    <View style={styles.viewRowData}>
      {data?.map((e: any, index: number) => {
        const typeString = typeof e === 'string';

        return (
          <View
            key={index}
            style={[styles.viewData, { width: widthArr?.[index] }]}>
            {typeString ? <Text style={[styles.datatext]}>{e}</Text> : <>{e}</>}
          </View>
        );
      })}
    </View>
  );
};
