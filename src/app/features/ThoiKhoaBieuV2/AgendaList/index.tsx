/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';

import { useSelector } from 'react-redux';

import { LOAI_SU_KIEN, popupCancel } from '@common';
import ItemEvenInDay from '@components/Item/ItemEvenInDay';
import ItemPindDay from '@components/Item/ItemPinDay';
import ItemTrong from '@components/Item/ItemTrong';
import ModalLichHoc from '@components/Item/ModalLichHoc';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { deleteSuKien } from '@networking/user';
import { deleteLichTuan } from '@networking/user/LichTuan';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import _, { debounce } from 'lodash';
import moment from 'moment';

import styles from './styles';

import { findClosestIndexGreaterThan } from '../LichLamCalendar/agendaItems';
import { LichProp } from '../type';
interface Props {
  dataTKB: { data: any[]; title: string }[];
  datePress?: string;
  onDayScroll?: (e: string) => void;
  onRefresh?: () => void;
  isWeekCalendar?: boolean;
  visibleButtonLT?: boolean;
}

export const thu = [
  'Chủ nhật',
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
];
const AgendaList = (props: Props) => {
  const { dataTKB, datePress, onRefresh } = props;

  const [isVisible, setisVisible] = useState(false);

  const { account } = useSelector(selectAppConfig);

  const [itemData, setitemData] = useState<any>();

  const scrollRef = useRef<any>(null);

  const [toDay, settoDay] = useState('');

  const result = useRef<number[]>([]);

  const onLayout = (event: LayoutChangeEvent) => {
    result.current.push(event?.nativeEvent?.layout?.y);

    if (result.current.length === dataTKB?.length) {
      const positions = result.current.sort((a, b) => a - b);

      scrollToCurrent(positions);
    }
  };

  useEffect(() => {
    if (result.current.length === dataTKB?.length) {
      const positions = result.current.sort((a, b) => a - b);

      scrollToCurrent(positions);
    }
  }, [datePress]);

  const scrollToCurrent = (positions: number[]) => {
    const index = dataTKB?.findIndex(
      (item: { data: LichProp[]; title: string }) => item?.title === datePress,
    );

    if (index !== -1) {
      scrollRef.current?.scrollTo({
        x: 0,
        y: positions?.[index],
        animated: true,
      });
    }
  };

  const handleRef = (ref: any) => {
    scrollRef.current = ref;
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    const index = findClosestIndexGreaterThan(result.current, offsetY);

    const currentDay = dataTKB?.[index]?.title;

    handleScrollDebounced(currentDay);
  };

  const handleScrollDebounced = debounce(currentPosition => {
    requestAnimationFrame(() => {
      settoDay(currentPosition);
    });
  }, 100);

  const showModal = (item: any) => {
    setitemData(item);

    setisVisible(true);
  };

  const gotoEdit = () => {
    setisVisible(false);

    setTimeout(() => {
      if (
        [LOAI_SU_KIEN.LICH_LAM_VIEC_TUAN, LOAI_SU_KIEN?.LICH_TUAN]?.includes(
          itemData?.loaiSuKien,
        )
      ) {
        onEditLichTuan();

        return;
      }

      navigateScreen(APP_SCREEN.ADDEVENTCALENDAR, {
        item: itemData,
        onRefresh: onRefresh,
      });
    }, 500);
  };

  const goToLTC = () => {
    setisVisible(false);

    setTimeout(() => {
      if (
        [LOAI_SU_KIEN.LICH_LAM_VIEC_TUAN, LOAI_SU_KIEN?.LICH_TUAN]?.includes(
          itemData?.loaiSuKien,
        )
      ) {
        handleDelLichTuan();

        return;
      }

      if (itemData?.loaiSuKien === LOAI_SU_KIEN.CA_NHAN) {
        popupCancel(
          translate('slink:Notice_t'),
          translate('slink:Confirm_delete'),
          () => {
            delSuKien(itemData?._id);
          },
        );
      } else {
        if (itemData?.lopHocPhan?.loai === 'TH') {
          navigateScreen(APP_SCREEN.THONGTINCHUNGLTC, {
            nhomTH: true,
            infoClass: itemData?.lopHocPhan,
          });
        } else {
          const ngayHoc = moment(itemData?.ngay ?? new Date()).format(
            'DD/MM/YYYY',
          );

          const nhomTH =
            !_.isNil(itemData?.nhom_lop_tin_chi_id?.[1]) &&
            itemData?.nhom_lop_tin_chi_id?.[1] !== false
              ? `(Nhóm TH: ${itemData?.nhom_lop_tin_chi_id?.[1]})`
              : '';

          const thuHoc = moment(itemData?.ngay).toDate().getDay() ?? 0;

          const title = `${thu?.[thuHoc]}, ngày ${ngayHoc} ${nhomTH}`;

          navigateScreen(
            account?.isGiaoVien
              ? APP_SCREEN.BUOIHOCGIANGVIEN
              : APP_SCREEN.CHITIETBUOIHOC,
            {
              infoCard: itemData,
              title: title,
            },
          );
        }
      }
    }, 500);
  };

  const delSuKien = async (id: string) => {
    try {
      const res = await deleteSuKien(id);

      if (res?.status) {
        onRefresh && onRefresh();
      }
    } catch (error) {}
  };

  //Lịch tuần
  const onEditLichTuan = () => {
    setTimeout(() => {
      navigateScreen(APP_SCREEN.ADDNEWCALENDAR, {
        dataDefault: itemData,
        onRefresh: onRefresh,
      });
    }, 300);
  };

  const handleDelLichTuan = () => {
    setTimeout(() => {
      popupCancel(
        translate('slink:Notice_t'),
        translate('slink:Confirm_delete'),
        () => onDel(),
      );
    }, 300);
  };

  const onDel = async () => {
    const responseDel = await deleteLichTuan(itemData?._id);

    if (responseDel?.status) {
      onRefresh && onRefresh();
    }
  };

  //Lịch tuần

  return (
    <View style={styles.content}>
      <ItemPindDay isVisible={!!toDay} ngayPindCur={toDay} />
      <ScrollView
        ref={handleRef}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={20}
        onScroll={onScroll}
        nestedScrollEnabled
        contentContainerStyle={styles.contentContainer}
        style={styles.list}>
        {dataTKB?.length === 0 ? (
          <ItemTrong />
        ) : (
          dataTKB?.map((item, index) => (
            <ItemEvenInDay
              key={`${index}-${item?.title}`}
              onRefresh={onRefresh}
              onLayout={onLayout}
              itemKeys={item}
              indexKeys={index}
              showDetail={showModal}
              {...props}
            />
          ))
        )}
      </ScrollView>
      <ModalLichHoc
        visibleButtonLT={props?.visibleButtonLT}
        onPress={goToLTC}
        isVisible={isVisible}
        itemData={itemData}
        closeButton={() => {
          setisVisible(false);
        }}
        onPressEdit={gotoEdit}
      />
    </View>
  );
};

export default AgendaList;
