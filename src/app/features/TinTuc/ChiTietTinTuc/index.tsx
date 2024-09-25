/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

import { EDaLuu, HEIGHT, MapKeyDaLuu } from '@common';
import TypeNew from '@components/Item/ItemTinTuc';
import RenderHTMLCustome from '@components/Item/RenderHTML';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { getAllTinTuc, getTinTucNoiBat } from '@networking/user';

import styles from './styles';
import { translate } from '@utils/i18n/translate';
import { getDSXemSauMany } from '@networking/user/DaLuu';

const ChiTietTinTuc = (props: any) => {
  const isFromNoticeScreen = props.route.params?.isFromNoticeScreen;

  const title = props.route.params?.content?.chuDe?.name;

  const [loading, setloading] = useState(false);

  const [content, setcontent] = useState<any>({});

  const [dataTinTuc, setdataTinTuc] = useState([]);

  const [listItemSaved, setlistItemSaved] = useState<any[]>([]);

  const scrollView = useRef<any>(null);

  const onChangeNews = (currentContent: any) => {
    setloading(true);

    setTimeout(() => {
      setcontent(currentContent);

      setloading(false);
    }, 100);
  };

  useEffect(() => {
    getData();
  }, []);
  const getListXemSau = async () => {
    try {
      const responseDaLuuTinTuc = await getDSXemSauMany(
        MapKeyDaLuu[EDaLuu.TIN_TUC],
      );
      setlistItemSaved(responseDaLuuTinTuc?.data?.data);
    } catch (error) {}
  };
  const getData = async () => {
    let currentContent: any;
    const resTinTuc: any = await getTinTucNoiBat();

    setdataTinTuc(resTinTuc?.data?.data ?? []);

    if (!isFromNoticeScreen) {
      currentContent = props.route.params?.content;
    } else {
      const idTinTuc = props.route.params?.idTinTuc;

      try {
        const body = {
          cond: {
            _id: idTinTuc,
          },
        };

        await getAllTinTuc(body);
      } catch (error) {}
    }

    onChangeNews(currentContent);
  };

  const listOtherNews =
    [...dataTinTuc]?.filter((item: any) => item?._id !== content?._id) ?? [];

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <HeaderReal title={title ?? translate('slink:Detail_t')} />
        <LoadingComponent />
      </View>
    );
  }

  const dataTinNoiBat = [...listOtherNews]?.splice(0, 5);

  return (
    <View style={styles.mainContainer}>
      <HeaderReal title={title ?? translate('slink:Detail_t')} />
      <ScrollView
        bounces={false}
        testID="ScrollViewDetailNews"
        ref={ref => {
          scrollView.current = ref;
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <RenderHTMLCustome
          content={content?.noiDung}
          title={content?.tieuDe}
          time={content?.ngayDang}
          nguoiGui={content?.nguoiDang?.hoTen ?? ''}
        />
        {dataTinNoiBat?.length > 0 && (
          <View style={styles.wrapper}>
            <View style={styles.cntText}>
              <Text style={styles.textNoiBat}>
                {translate('slink:Hot_news')}
              </Text>
            </View>
            <FlatList
              scrollEnabled={false}
              data={dataTinNoiBat}
              extraData={content}
              style={styles.list}
              renderItem={({ item, index }: any) => {
                const findSaved = listItemSaved?.find(
                  e => e?.sourceId === `${item?.id}`,
                );
                return (
                  <TypeNew
                    newsWP={false}
                    onRefresh={getListXemSau}
                    idSaved={findSaved?._id}
                    isSaved={!!findSaved}
                    onPress={() => {
                      onChangeNews(item);
                    }}
                    style={{ marginBottom: HEIGHT(16) }}
                    key={index}
                    content={item}
                    title={item?.tieuDe}
                    index={index}
                  />
                );
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ChiTietTinTuc;
