/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import RenderHTML from 'react-native-render-html';

import R from '@assets/R';
import { getLineHeight, htmlProps, WIDTH } from '@common';
import ItemTrong from '@components/Item/ItemTrong';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { getCauHoiThuongGap } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import {
  Box,
  Collapse,
  Divider,
  FlatList,
  Pressable,
  Text,
  useTheme,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';
import { ItemCauHoiThuongGapProps } from './type';

const CauHoiThuongGap = () => {
  const [loading, setLoading] = useState<any>(false);

  const [chuDeChoose, setchuDeChoose] = useState<any>();

  const [visible, setVisible] = useState(false);

  const [keySearch, setkeySearch] = useState('');

  const [listSearch, setlistSearch] = useState<ItemCauHoiThuongGapProps[]>([]);

  const [listCauHoi, setlistCauHoi] = useState<ItemCauHoiThuongGapProps[]>([]);

  const getData = async () => {
    setLoading(true);

    try {
      const res: any = await getCauHoiThuongGap();

      setlistCauHoi(res?.data?.data ?? []);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onFilter = (item: any) => {
    setchuDeChoose(item);
  };

  const gotoFilter = () => {
    navigateScreen(APP_SCREEN.FILTERCAUHOITHUONGGAP, {
      onFilter: onFilter,
      chuDeChoose,
      title: translate('slink:Frequently_asked_questions'),
    });
  };

  const listCauHoiFilter = listCauHoi?.filter(item => {
    if (chuDeChoose?._id) {
      return item?.idTopic === chuDeChoose?._id;
    }

    return true;
  });

  const onSearch = (value: string) => {
    setkeySearch(value);

    if (value !== '') {
      const listFilter: any[] =
        listCauHoiFilter?.filter((item: any) =>
          item?.cauHoi
            ?.trim()
            ?.toLowerCase()
            ?.includes(value?.trim()?.toLowerCase()),
        ) ?? [];

      setlistSearch(listFilter);
    } else {
      setlistSearch([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const listdataResult =
    listSearch?.length === 0 && keySearch === ''
      ? listCauHoiFilter
      : listSearch;

  if (loading) {
    <Box style={styles.container} testID="TabCauHoiThuongGap">
      <HeaderReal title={translate('slink:Frequently_asked_questions')} />
      <LoadingComponent loading={loading} />
    </Box>;
  }

  return (
    <Box style={styles.container} testID="TabCauHoiThuongGap">
      <HeaderReal
        title={translate('slink:Frequently_asked_questions')}
        childrenRight={
          <ChildrenRight
            onPressSearch={() => {
              setVisible(true);
            }}
            onPressFilter={gotoFilter}
          />
        }
      />
      <FlatList
        data={listdataResult}
        extraData={listdataResult}
        onRefresh={getData}
        refreshing={loading}
        ListEmptyComponent={
          <ItemTrong content={translate('slink:No_question')} />
        }
        contentContainerStyle={styles.content}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} key={index} />;
        }}
      />
      <SearchItem
        defaultValue={keySearch}
        placeholder={translate('slink:Input_question')}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);

          onSearch('');
        }}
        onChangeValue={onSearch}
      />
    </Box>
  );
};

export default CauHoiThuongGap;
const RenderItem = (props: { item: ItemCauHoiThuongGapProps }) => {
  const { item } = props;

  const [expand, setexpand] = useState(false);

  const source = { html: item?.cauTraLoi?.trim() ?? '' };

  const onPress = () => {
    setexpand(!expand);
  };

  const theme = useTheme();

  return (
    <Box style={[styles.containeritem]}>
      <Pressable onPress={onPress} style={styles.viewItem}>
        <ItemIconSVG title={translate('slink:Frequently_asked_questions')} />
        <Box
          marginLeft={WIDTH(12)}
          marginRight={WIDTH(16)}
          flexDirection={'column'}
          flex={1}>
          {item?.topic?.name?.trim() && (
            <Text style={[styles.textChuDe]} numberOfLines={1}>
              {item?.topic?.name?.trim() || translate('slink:Chua_cap_nhat')}
            </Text>
          )}
          <Text style={styles.textCauHoi}>{item?.cauHoi}</Text>
        </Box>
        <Entypo
          color={theme.colors.gray[400]}
          size={WIDTH(24)}
          name={expand ? 'chevron-up' : 'chevron-down'}
        />
      </Pressable>
      <Collapse isOpen={expand}>
        {expand && <Divider />}
        <RenderHTML
          {...htmlProps}
          renderersProps={{
            iframe: {
              scalesPageToFit: true,
              webViewProps: {
                /* Any prop you want to pass to iframe WebViews */
              },
            },
          }}
          baseStyle={{
            fontSize: theme.fontSizes.sm,
            fontWeight: '500',
            lineHeight: getLineHeight(24),
          }}
          contentWidth={WIDTH(343)}
          source={source}
        />
      </Collapse>
    </Box>
  );
};

const ChildrenRight = ({
  onPressSearch,
  onPressFilter,
}: {
  onPressSearch: () => void;
  onPressFilter: () => void;
}) => {
  return (
    <Box flexDirection={'row'}>
      <Pressable
        hitSlop={R.themes.hitSlop}
        _pressed={R.themes.pressed}
        marginRight={WIDTH(12)}
        onPress={onPressSearch}>
        <Icon name="search" size={WIDTH(24)} color={'white'} />
      </Pressable>
      <Pressable
        hitSlop={R.themes.hitSlop}
        _pressed={R.themes.pressed}
        onPress={onPressFilter}>
        <Icon name="filter" size={WIDTH(24)} color={'white'} />
      </Pressable>
    </Box>
  );
};
