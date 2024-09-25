/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// libs
import {
  ARRAY_FILTER,
  ARRAY_TIME_FILTER_VALUE,
  getFontSize,
  getLineHeight,
  getWidth,
  HEIGHT,
  WIDTH,
} from '@common';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// configs
import R from '../../../assets/R';

const ANIMATION_DURATION = 200;

const SelectModeView = ({
  data,
  filterType,
  onChangeFilterType,
}: {
  data: string[];
  filterType: string;
  onChangeFilterType: (value: string, index: number) => void;
}) => {
  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onChangeFilterType(item, index)}>
        <Text style={styles.text}>{item}</Text>
        {item === filterType && (
          <Entypo name="check" size={WIDTH(18)} color={R.colors.colorMain} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      extraData={filterType}
      renderItem={renderItem}
      scrollEnabled={false}
      style={styles.flatlist}
    />
  );
};

interface Props {
  onChangeTimeFilter: (value: number) => void;
  onShowNotificationModal: () => void;
  isMute: boolean;
  onReadAllNotif: () => void;
}

const FilterView: FunctionComponent<Props> = (props: Props) => {
  const {
    onChangeTimeFilter,
    onShowNotificationModal,
    isMute,
    onReadAllNotif,
  } = props;

  const [filterType, setFilterType] = useState<string>(ARRAY_FILTER[0]);

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const animationHeight = useRef(new Animated.Value(0)).current;

  const isCalled = useRef<boolean>(false);

  const timer = useRef<any>(null);

  const onShowFilterMode = () => {
    setCollapsed(!collapsed);
  };

  const onChangeFilterType = (value: string, index: number) => {
    onChangeTimeFilter(ARRAY_TIME_FILTER_VALUE[index]);

    setFilterType(value);

    setCollapsed(true);
  };

  const collapseView = () => {
    Animated.spring(animationHeight, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const expandView = () => {
    Animated.spring(animationHeight, {
      toValue: HEIGHT(200),
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    collapsed ? collapseView() : expandView();
  }, [collapsed]);

  const preventDoublePress = (
    functionTriggerd: () => void,
    interval = ANIMATION_DURATION,
  ) => {
    if (!isCalled.current) {
      isCalled.current = true;

      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        isCalled.current = false;
      }, interval);

      return functionTriggerd();
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => preventDoublePress(onShowFilterMode)}>
          <Icon name="filter" size={WIDTH(16)} color={R.colors.grey500} />
          <Text style={styles.label}>{`${filterType}`}</Text>
          <Entypo
            name="chevron-down"
            size={WIDTH(10)}
            color={R.colors.grey500}
          />
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <TouchableOpacity onPress={onReadAllNotif}>
            <Icon
              name="playlist-check"
              color={R.colors.lightBlack}
              size={WIDTH(21)}
              style={{ marginRight: WIDTH(8) }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShowNotificationModal}>
            <Icon
              name={isMute ? 'bell-off' : 'bell'}
              color={R.colors.lightBlack}
              size={WIDTH(18)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View style={{ maxHeight: animationHeight }}>
        <SelectModeView
          data={ARRAY_FILTER}
          filterType={filterType}
          onChangeFilterType={onChangeFilterType}
        />
      </Animated.View>
    </View>
  );
};

export default FilterView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.white,
    zIndex: 2,
  },
  content: {
    width: getWidth(),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(10),
    paddingVertical: HEIGHT(8),
    backgroundColor: R.colors.white,
    ...R.themes.shadowOffset,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: getFontSize(14),
    color: R.colors.textGray,
    marginHorizontal: WIDTH(4),
    fontFamily: R.fonts.BeVietnamProRegular,
    lineHeight: getLineHeight(22),
  },
  text: {
    fontSize: getFontSize(14),
    color: R.colors.black0,
    lineHeight: getLineHeight(24),
    fontFamily: R.fonts.BeVietnamProRegular,
  },
  itemContainer: {
    width: getWidth(),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(10),
    paddingVertical: HEIGHT(8),
  },
  flatlist: {
    marginTop: HEIGHT(6),
  },
});
