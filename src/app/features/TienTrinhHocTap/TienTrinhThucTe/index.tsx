/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { HEIGHT, WIDTH } from '@common';
import { KhoaNganh } from '@components/HeaderSongNganh/type';
import ItemTrong from '@components/Item/ItemTrong';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { getTienTrinhThucTeSN } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import { VStack } from 'native-base';
import styles from '../styles';
import ItemSubject from '@components/Item/ItemSubject';
import { HTDGProps } from '@features/LopTinChi/component/ThongTinChung/type';

function TienTrinhThucTe({
  hinhThucDG,
  khoaNganhCurrent,
}: {
  hinhThucDG: HTDGProps[];
  khoaNganhCurrent: KhoaNganh | undefined;
}) {
  const [loading, setLoading] = useState(false);

  const [danhSachKyHoc, setdanhSachKyHoc] = useState<any>([]);

  const [listMonHoc, setListMonHoc] = useState<any[]>([]);

  const [listMonHocFilter, setlistMonHocFilter] = useState<any[]>([]);

  useEffect(() => {
    !!khoaNganhCurrent?.ma && getTienTrinhHocTap();
  }, [khoaNganhCurrent]);

  const getTienTrinhHocTap = async () => {
    setLoading(true);

    try {
      const result = await getTienTrinhThucTeSN(khoaNganhCurrent?.ma || '');

      setListMonHoc(result?.data || []);

      setlistMonHocFilter(result?.data || []);

      const gHocKy = _.groupBy(result?.data, item => item?.kyHoc?.ten);

      const listHKData = Object.entries(gHocKy);

      const pickerKyHocValue = [
        {
          label: translate('slink:All'),
          value: translate('slink:All'),
        },
        ...(listHKData?.map((item: any) => {
          const tongSoTin =
            item?.[1]?.reduce(
              (total: any, monHoc: any) => total + (monHoc?.soTinChi ?? 0),
              0,
            ) ?? 0;

          return {
            label: `${item?.[0]} (${tongSoTin} ${translate(
              'slink:Credits',
            )?.toLowerCase()})`,
            value: item?.[0],
          };
        }) ?? []),
      ];

      setdanhSachKyHoc(pickerKyHocValue);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onChangeKyHoc = (value: any) => {
    if (value === translate('slink:All')) {
      setlistMonHocFilter(listMonHoc);
    } else {
      const monHoc = listMonHoc?.filter(item => item?.kyHoc?.ten === value);
      setlistMonHocFilter(monHoc);
    }
  };

  return (
    <View style={styles.container}>
      <BoLoc data={danhSachKyHoc} onChange={onChangeKyHoc} />
      <VStack flex={1}>
        <FlatList
          data={listMonHocFilter}
          extraData={listMonHocFilter}
          refreshing={loading}
          onRefresh={getTienTrinhHocTap}
          numColumns={2}
          ListEmptyComponent={<ItemTrong />}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => {
            const visiblePoint = !!item?.diemHpSvHk?.diemChu;
            const listPoint = visiblePoint ? [item?.diemHpSvHk?.diemChu] : [];
            return (
              <ItemSubject
                tenMon={item?.ten || item?.hocPhan?.ten}
                soTinChi={item?.soTinChiTuChonPhaiHoc || item?.soTinChi}
                item={item}
                hinhThucDanhGia={hinhThucDG}
                listPoint={listPoint}
                visiblePoint={visiblePoint}
                key={index}
                hasModal
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </View>
  );
}

export default TienTrinhThucTe;
interface Props {
  onChange: (e: string) => void;
  data: { value: string; label: string }[];
}
const BoLoc = (props: Props) => {
  const { onChange, data } = props;
  return (
    <SingleSelect
      mb={HEIGHT(16)}
      width={WIDTH(343)}
      alignSelf="center"
      placeholder={translate('slink:Select_semester')}
      onChangeValue={onChange}
      defaultValue={data?.[0]?.value}
      data={data}
    />
  );
};
