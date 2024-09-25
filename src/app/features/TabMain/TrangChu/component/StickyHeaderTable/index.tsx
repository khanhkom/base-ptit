import { getFontSize, HEIGHT } from '@common';
import _ from 'lodash';
import { Text } from 'native-base';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import R from '@assets/R';
const borderColor = '#C1C0B9';
const primaryColor = 'dodgerblue';
const backgroundColor = '#F7F6E7';
const tableHead = [
  'Head1',
  'Head2',
  'Head3',
  'Head4',
  'Head5',
  'Head6',
  'Head7',
  'Head8',
  'Head9',
];
const widthArr = [50, 60, 80, 100, 120, 140, 160, 180, 200];
const tableData = [
  [
    'Head1',
    'Head2',
    'Head3',
    'Head4',
    'Head5',
    'Head6',
    'Head7',
    'Head8',
    'Head9',
  ],
  [
    'Head21',
    'Head22',
    'Head33',
    'Head44',
    'Head45',
    'Head1236',
    'Head1237',
    'Head1238',
    'Head1239',
  ],
];
export default function StickyHeaderTable() {
  const leftRef = useRef<ScrollView>(null);
  const rightRef = useRef<ScrollView>(null);
  const newData = _.map(tableData, array => _.tail(array));
  const headerHeight = HEIGHT(42);
  const leftColumnWidth = 100;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#eee',
      }}>
      {/* Left Column */}
      <View
        style={{
          width: leftColumnWidth,
          // borderRightWidth: 1,
          borderRightColor: borderColor,
        }}>
        {/* Blank Cell */}
        <View
          style={{
            minHeight: headerHeight,
            backgroundColor: primaryColor,
            // borderBottomWidth: 1,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomColor: borderColor,
            overflow: 'hidden',
          }}>
          <Table>
            <Row
              data={[tableHead?.[0]]}
              widthArr={[leftColumnWidth]}
              style={[styles.head]}
              textStyle={{ ...styles.textHeader, color: 'white' }}
            />
          </Table>
        </View>

        {/* Left Container : scroll synced */}
        <ScrollView
          ref={leftRef}
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}>
          <Table>
            {tableData.map((rowData, index) => {
              return (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={[leftColumnWidth]}
                  textStyle={styles.text}
                />
              );
            })}
          </Table>
        </ScrollView>
      </View>
      {/* Right Column */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <ScrollView horizontal={true} bounces={false}>
          <View>
            <Table>
              <Row
                data={_.tail(tableHead)}
                widthArr={_.tail(widthArr)}
                style={[
                  styles.head,
                  { borderTopRightRadius: 20, borderBottomRightRadius: 20 },
                ]}
                textStyle={{ ...styles.textHeader, color: 'white' }}
              />
            </Table>
            <ScrollView
              ref={rightRef}
              style={styles.dataWrapper}
              scrollEventThrottle={16}
              bounces={false}
              onScroll={e => {
                const { y } = e.nativeEvent.contentOffset;
                leftRef.current?.scrollTo({ y, animated: false });
              }}>
              <Table>
                {newData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={_.tail(widthArr)}
                    // style={index % 2 ? styles.row : { backgroundColor }}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#eee' },
  head: { minHeight: HEIGHT(42), backgroundColor: primaryColor },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  // row: { height: 28 },
  text: {
    color: R.colors.black0,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    marginTop: HEIGHT(20),
    textAlign: 'center',
  },
  textHeader: {
    color: R.colors.black0,
    fontFamily: R.fonts.BeVietnamProRegular,
    fontSize: getFontSize(14),
    textAlign: 'center',
  },
  dataWrapper: { marginTop: -1 },
});
