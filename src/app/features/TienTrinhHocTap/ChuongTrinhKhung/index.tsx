/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';

import { HEIGHT, WIDTH } from '@common';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import {
  getChuongTrinhKhung,
  getKhoaNganh,
  getSongNganh,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';

import ItemChuyenNganh from './ItemChuyenNganh';

import styles from '../styles';
import { KhoaNganh } from '@components/HeaderSongNganh/type';
import ItemSubject from '@components/Item/ItemSubject';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { HTDGProps } from '@features/LopTinChi/component/ThongTinChung/type';
import ItemTrong from '@components/Item/ItemTrong';

function ChuongTrinhKhung({
  hinhThucDG,
  khoaNganhCurrent,
}: {
  hinhThucDG: HTDGProps[];
  khoaNganhCurrent: KhoaNganh | undefined;
}) {
  const [loading, setLoading] = useState(false);

  const [danhSachKyHoc, setdanhSachKyHoc] = useState<any>([]);

  const [listMonHocFilter, setlistMonHocFilter] = useState<any[]>([]);

  const [listTienTrinh, setlistTienTrinh] = useState([]);
  useEffect(() => {
    !!khoaNganhCurrent?.ma && getTienTrinhHocTap();
  }, [khoaNganhCurrent]);

  const getTienTrinhHocTap = async () => {
    setLoading(true);
    let result: any;
    const responseKhoaNganh = await getKhoaNganh();
    const khoaNganhChinh = responseKhoaNganh?.data?.data?.khoaNganhChinh;
    if (khoaNganhCurrent?.ma === khoaNganhChinh?.ma) {
      result = await getChuongTrinhKhung();
    } else {
      result = await getSongNganh();
    }
    setlistTienTrinh(result?.data ?? []);
    setlistMonHocFilter(result?.data ?? []);
    const gHocKy = _.groupBy(result?.data, item => item.soThuTuKy);
    const listHKData = Object.entries(gHocKy);
    const pickerKyHocValue = [
      {
        label: translate('slink:Toan_bo_chuong_trinh_dao_tao'),
        value: translate('slink:Toan_bo_chuong_trinh_dao_tao'),
      },
      ...(listHKData?.map((itemHK: any) => {
        const listSubjectNormalHK = itemHK?.[1]?.filter(
          (item: { chuyenNganh: any }) => item?.chuyenNganh === null,
        );
        const tongSoTinMonHocNormal =
          listSubjectNormalHK?.reduce(
            (total: any, monHoc: any) =>
              total + (monHoc?.soTinChi || monHoc?.soTinChiTuChonPhaiHoc || 0),
            0,
          ) ?? 0;

        const listSubjectCNHK = itemHK?.[1]?.filter(
          (item: { chuyenNganh: any }) => item?.chuyenNganh,
        );

        const listCNHK = _.groupBy(
          listSubjectCNHK,
          item => item.chuyenNganh?.ten,
        );

        const transformedDataHK = _.map(listCNHK, (data, key) => ({
          key,
          data,
        }));

        const tongSoTinMonHocCNHK =
          transformedDataHK?.[0]?.data?.reduce(
            (total: any, monHoc: any) =>
              total + (monHoc?.soTinChi || monHoc?.soTinChiTuChonPhaiHoc || 0),

            0,
          ) ?? 0;

        return {
          label: `${translate('slink:Semester')} ${itemHK?.[0]} (${
            tongSoTinMonHocNormal + tongSoTinMonHocCNHK
          } ${translate('slink:Credits')})`,
          value: itemHK?.[0],
          stc: tongSoTinMonHocNormal + tongSoTinMonHocCNHK,
        };
      }) ?? []),
    ];

    setdanhSachKyHoc(pickerKyHocValue);

    setLoading(false);
  };
  const onChangeKyHoc = (value: any) => {
    if (value === translate('slink:Toan_bo_chuong_trinh_dao_tao')) {
      setlistMonHocFilter(listTienTrinh);
    } else {
      const monHoc = listTienTrinh?.filter(
        (item: { soThuTuKy: number }) => item?.soThuTuKy === Number(value),
      );

      setlistMonHocFilter(monHoc);
    }
  };

  const listSubjectNormal = listMonHocFilter?.filter(
    item => item?.chuyenNganh === null,
  );
  const onPressSubject = item => {
    navigateScreen(APP_SCREEN.MONTUCHON, {
      data: item,
      hinhThucDanhGia: hinhThucDG,
    });
  };
  const listSubjectCN = listMonHocFilter?.filter(item => item?.chuyenNganh);
  const listCN = _.groupBy(listSubjectCN, item => item.chuyenNganh?.ten);
  const transformedData = _.map(listCN, (data, key) => ({ key, data }));
  if (listMonHocFilter?.length === 0) {
    return (
      <View style={styles.container}>
        <BoLoc data={danhSachKyHoc} setBuoi={onChangeKyHoc} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={getTienTrinhHocTap}
            />
          }
          contentContainerStyle={styles.content}>
          <ItemTrong />
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BoLoc data={danhSachKyHoc} setBuoi={onChangeKyHoc} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getTienTrinhHocTap} />
        }
        contentContainerStyle={styles.content}>
        <FlatList
          data={listSubjectNormal}
          extraData={listSubjectNormal}
          scrollEnabled={false}
          contentContainerStyle={styles.listCTK}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          bounces={false}
          numColumns={2}
          renderItem={({ item, index }) => {
            const hpTuChon = item?.loaiHocPhanCtdt === 'Tự chọn';
            const listDiem =
              item?.lichSuDiem?.map((e: { diemChu: string }) => e?.diemChu) ||
              [];
            return (
              <ItemSubject
                tenMon={item?.ten || item?.hocPhan?.ten}
                soTinChi={item?.soTinChiTuChonPhaiHoc || item?.soTinChi}
                listPoint={listDiem}
                visiblePoint={!hpTuChon}
                key={index}
                item={item}
                hinhThucDanhGia={hinhThucDG}
                hasModal={!hpTuChon}
                onPress={() => onPressSubject(item)}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
        <FlatList
          data={transformedData}
          contentContainerStyle={styles.listCTK}
          scrollEnabled={false}
          extraData={transformedData}
          bounces={false}
          renderItem={({ item, index }) => (
            <ItemChuyenNganh
              key={index}
              hinhThucDanhGia={hinhThucDG}
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
}

export default ChuongTrinhKhung;
interface BoLocProps {
  setBuoi: (e: string) => void;
  data: any;
}
const BoLoc = ({ setBuoi, data }: BoLocProps) => {
  return (
    <SingleSelect
      mb={HEIGHT(16)}
      width={WIDTH(343)}
      alignSelf="center"
      placeholder={translate('slink:Select_semester')}
      onChangeValue={setBuoi}
      defaultValue={data?.[0]?.value}
      data={data}
    />
  );
};
