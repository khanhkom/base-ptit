/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import R from '@assets/R';
import {
  ETrangThaiThamGia,
  HEIGHT,
  popupCancel,
  popupOk,
  WIDTH,
} from '@common';
import BaseButton from '@components/Popup/BaseButton';
import { Modal } from '@libcomponents/modal';
import { xacNhanLichTuan } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

const ModalLichTuanHocVien = (props: any) => {
  const { isVisible, onClose, data, onRefresh } = props;

  const [loading, setloading] = useState(false);

  const titleButton =
    data?.trangThaiThamGia === ETrangThaiThamGia.XAC_NHAN
      ? ETrangThaiThamGia.KHONG_THAM_GIA
      : ETrangThaiThamGia.XAC_NHAN;

  const time = `${moment(data?.thoiGianBatDau).format(
    'HH:mm DD/MM/YYYY',
  )} - ${moment(data?.thoiGianKetThuc).format('HH:mm DD/MM/YYYY')}`;

  const dataThamDu = [
    ...(data?.thanhPhanThamDu?.length > 0
      ? [{ title: translate('slink:Department'), data: data?.thanhPhanThamDu }]
      : []),
    ...(data?.thanhPhanNguoiThamDu?.length > 0
      ? [
          {
            title: translate('slink:Personal'),
            data: data?.thanhPhanNguoiThamDu,
          },
        ]
      : []),
    {
      title: translate('slink:Other'),
      data: data?.thanhPhanThamDuKhac
        ? data?.thanhPhanThamDuKhac
        : translate('slink:Null_t'),
    },
  ];

  const dataDonViPhoiHop = [
    ...(data?.donViPhoiHop?.length > 0
      ? [{ title: translate('slink:Inside_academy'), data: data?.donViPhoiHop }]
      : []),

    {
      title: translate('slink:Other'),
      data: data?.donViPhoiHopKhac
        ? data?.donViPhoiHopKhac
        : translate('slink:Null_t'),
    },
  ];

  const visibleDVPH = data?.donViPhoiHopKhac || data?.donViPhoiHop?.length > 0;

  const confirmXacNhan = () => {
    popupCancel(
      translate('slink:Notice_t'),
      `${translate('slink:Confirm')} ${
        data?.trangThaiThamGia === ETrangThaiThamGia.XAC_NHAN
          ? translate('slink:not_paticipate')
          : translate('slink:paticipate')
      } ?`,
      () => {
        handleXacNhan();
      },
    );
  };

  const handleXacNhan = async () => {
    setloading(true);

    const trangThai = {
      thamGia:
        data?.trangThaiThamGia === ETrangThaiThamGia.XAC_NHAN
          ? ETrangThaiThamGia.KHONG_THAM_GIA
          : ETrangThaiThamGia.XAC_NHAN,
    };

    const res = await xacNhanLichTuan(data?._id, trangThai);

    if (res?.status) {
      popupOk(
        translate('slink:Notice_t'),
        `Bạn đã xác nhận ${
          data?.trangThaiThamGia === ETrangThaiThamGia.XAC_NHAN
            ? translate('slink:not_paticipate')
            : translate('slink:paticipate')
        }`,
        () => {
          onClose();

          setTimeout(() => {
            onRefresh();
          }, 500);
        },
      );
    } else {
      popupOk(
        translate('slink:Notice_t'),
        `${translate('slink:Confirm')} ${
          data?.trangThaiThamGia === ETrangThaiThamGia.XAC_NHAN
            ? translate('slink:not_paticipate')
            : translate('slink:paticipate')
        } thất bại`,
      );
    }

    setloading(false);
  };

  return (
    <Modal isVisible={isVisible} style={styles.viewContent}>
      <View style={styles.viewThe}>
        <ViewTitle closeButton={onClose} />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.viewNoiDung}
          contentContainerStyle={styles.contentContainer}>
          <ContentLong label="Thời gian" value={time} />
          <ContentLong
            label={translate('slink:Work_detail')}
            value={data?.noiDungCongViec}
          />
          <ContentLong
            label="Chủ trì cuộc họp"
            value={
              <FlatList
                data={data?.chuTri}
                renderItem={({ item, index }) => (
                  <Text
                    key={index}
                    style={styles.value}>{`• ${item?.ten}`}</Text>
                )}
              />
            }
          />
          <ContentLong
            label={translate('slink:Participants')}
            value={
              <View>
                {dataThamDu?.map((ite: any, ind) => {
                  return (
                    <View key={ind} style={{ marginBottom: HEIGHT(4) }}>
                      <Text style={styles.value}>{ite?.title}</Text>
                      {ite?.title === 'Khác' ? (
                        <Text style={styles.value}>{`• ${
                          ite?.data ?? ''
                        }`}</Text>
                      ) : (
                        <FlatList
                          data={ite?.data}
                          renderItem={({ item, index }) => (
                            <Text key={index} style={styles.value}>{`• ${
                              item?.ten ?? item ?? ''
                            }`}</Text>
                          )}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            }
          />
          <ContentLong
            label={translate('slink:Location')}
            value={data?.diaDiem?.value}
          />
          <ContentLong
            label="Đơn vị chủ trì"
            value={data?.donViChuanBi?.value}
            typeLong={false}
          />
          {visibleDVPH && (
            <ContentLong
              label="Đơn vị phối hợp"
              value={
                <View>
                  {dataDonViPhoiHop?.map((ite: any, ind) => {
                    return (
                      <View key={ind} style={{ marginBottom: HEIGHT(4) }}>
                        <Text style={styles.value}>{ite?.title}</Text>
                        {ite?.title === 'Khác' ? (
                          <Text style={styles.value}>{`• ${
                            ite?.data ?? ''
                          }`}</Text>
                        ) : (
                          <FlatList
                            data={ite?.data}
                            renderItem={({ item, index }) => (
                              <Text key={index} style={styles.value}>{`• ${
                                item?.ten ?? item ?? ''
                              }`}</Text>
                            )}
                          />
                        )}
                      </View>
                    );
                  })}
                </View>
              }
            />
          )}
          <ContentLong
            label={translate('slink:Note')}
            isLast={true}
            value={data?.ghiChu}
          />
          <ContentLong
            label={translate('slink:Status')}
            typeLong={false}
            value={
              <View
                style={{
                  paddingVertical: HEIGHT(2),
                  paddingHorizontal: WIDTH(4),

                  backgroundColor: data?.hoan
                    ? 'rgba(225, 192 ,62, 1)'
                    : 'rgba(57, 149, 0, 1)',
                  borderRadius: WIDTH(2),
                }}>
                <Text style={[styles.value, { color: R.colors.white }]}>
                  {data?.hoan ? 'Đã hoãn' : 'Đã phát hành'}
                </Text>
              </View>
            }
          />
          <ContentLong
            label="Người tạo"
            isLast={true}
            typeLong={false}
            value={data?.info?.nguoiTao?.fullname}
          />
          {data?.thamDu && (
            <BaseButton
              loading={loading}
              title={titleButton}
              onPress={confirmXacNhan}
              style={styles.styleBtn}
            />
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalLichTuanHocVien;
const ViewTitle = ({ closeButton }: { closeButton?: () => void }) => {
  return (
    <View style={styles.viewTitle}>
      <Text style={styles.title}>
        {translate('slink:Academy_weekly_calender')}
      </Text>
      <TouchableOpacity onPress={closeButton} style={styles.closeButton}>
        <Icon size={WIDTH(16)} name="close" color={R.colors.black0} />
      </TouchableOpacity>
    </View>
  );
};

const ContentLong = ({
  value,
  label,
  typeLong = true,
  isLast,
}: {
  value?: string | ReactNode;
  label: string;
  typeLong?: boolean;
  isLast?: boolean;
}) => {
  const styleShortType = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const styleLongType = {
    flexDirection: 'column',
  };

  return (
    <ViewContent
      isLast={isLast}
      style={typeLong ? styleLongType : styleShortType}>
      <Text style={[styles.label, { marginBottom: typeLong ? HEIGHT(8) : 0 }]}>
        {label}
      </Text>
      {typeof value === 'string' ? (
        <Text style={styles.value}>{value}</Text>
      ) : (
        <View>{value}</View>
      )}
    </ViewContent>
  );
};

const ViewContent = ({
  children,
  isLast,
  style,
}: {
  children?: ReactNode;
  isLast?: boolean;
  style?: any;
}) => {
  const borderBottomWidth = isLast ? 0 : 0.5;

  return (
    <View
      style={[
        {
          paddingVertical: HEIGHT(16),
          borderColor: 'rgba(171, 171, 171, 0.4)',
        },
        { borderBottomWidth },
        style,
      ]}>
      {children}
    </View>
  );
};
