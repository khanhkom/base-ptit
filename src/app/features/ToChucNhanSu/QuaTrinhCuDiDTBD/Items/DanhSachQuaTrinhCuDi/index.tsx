/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import { EQuaTrinhDaoTaoBoiDuong, formatVND } from '@common';
import AddPlus from '@components/AddPlus';
import ItemTrong from '@components/Item/ItemTrong';
import ModalChiTietNhanSu from '@features/HoSoNhanSu/componentTab/ModalChiTiet';
import LoadMore from '@libcomponents/loading/loadmore-component';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getQuaTrinhCuDiDaoTao,
  getQuaTrinhDaoTaoBoiDuongCaNhan,
  getQuocGia,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';

import styles from './styles';

import ItemQuaTrinhCuDi from '../ItemQuaTrinhCuDi';

const DanhSachQuaTrinhCuDi = ({ type }: any) => {
  const [listCongViec, setlistCongViec] = useState<Array<any>>([]);

  const [loading, setloading] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(1);

  const maxData = useRef(false);

  const beginScroll = useRef<boolean>(false);

  const [listQuocGia, setlistQuocGia] = useState<any[]>([]);

  const [dataShow, setdataShow] = useState<any>({});

  const [isVisible, setisVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    initExtraData();
  }, []);

  const initExtraData = async () => {
    try {
      setloading(true);

      const res: any = await getQuocGia();

      setlistQuocGia(res?.data?.data ?? []);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const handleShow = (item: any) => {
    setdataShow(item);

    setisVisible(true);
  };

  const getData = async () => {
    try {
      setloading(true);

      const body = {
        page: 1,
        limit: 10,
      };

      let res;
      if (type === EQuaTrinhDaoTaoBoiDuong.TRUONG) {
        res = await getQuaTrinhCuDiDaoTao(body);
      } else {
        res = await getQuaTrinhDaoTaoBoiDuongCaNhan(body);
      }

      setlistCongViec(res?.data?.result ?? []);

      page.current = 1;

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const loadMoreData = async () => {
    if (!maxData.current) {
      setLoadMore(true);

      page.current += 1;

      try {
        const body = {
          page: page.current,
          limit: 10,
        };

        let res;
        if (type === EQuaTrinhDaoTaoBoiDuong.TRUONG) {
          res = await getQuaTrinhCuDiDaoTao(body);
        } else {
          res = await getQuaTrinhDaoTaoBoiDuongCaNhan(body);
        }

        setlistCongViec([...listCongViec, ...(res?.data?.result ?? [])]);

        maxData.current = res?.data?.result?.length < 10;

        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const getMore = () => {
    if (beginScroll.current && !maxData.current) {
      loadMoreData();

      beginScroll.current = false;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listCongViec}
        extraData={listCongViec}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        ListEmptyComponent={<ItemTrong />}
        bounces={false}
        onRefresh={() => getData()}
        renderItem={({ item }) => (
          <ItemQuaTrinhCuDi
            item={item}
            onPress={() => {
              if (item?.trangThaiDuyet === 'Duyệt') {
                handleShow(item);
              } else {
                navigateScreen(APP_SCREEN.THEMMOIQUATRINHCUDIDTBD, {
                  onRefresh: () => getData(),
                  itemData: item,
                });
              }
            }}
          />
        )}
        onEndReached={getMore}
        onEndReachedThreshold={0.01}
        ListFooterComponent={loadMore ? <LoadMore /> : <View />}
        onMomentumScrollBegin={() => {
          beginScroll.current = true;
        }}
      />
      <ModalChiTietNhanSu
        isVisible={isVisible}
        data={modalFormat(dataShow, listQuocGia)}
        closeButton={() => {
          setisVisible(false);
        }}
      />
      <AddPlus
        onAdd={() => {
          navigateScreen(APP_SCREEN.THEMMOIQUATRINHCUDIDTBD, {
            onRefresh: () => getData(),
          });
        }}
        visible={type === EQuaTrinhDaoTaoBoiDuong.CA_NHAN}
      />
    </View>
  );
};

export default DanhSachQuaTrinhCuDi;
const modalFormat = (item, listQuocGia) => [
  { value: item?.hoTen ?? '--', label: translate('slink:Ho_ten') },
  {
    value: item?.thongTinNhanSu?.donViChinh?.ten ?? '--',
    label: translate('slink:Unit'),
  },
  {
    value: item?.thongTinNhanSu?.donViViTri?.tenChucVu ?? '--',
    label: 'Vị trí việc làm',
  },
  {
    value: item?.loaiBoiDuong?.ten ?? '--',
    label: 'Loại bồi dưỡng',
  },
  {
    value: item?.tenBangCapChungChi ?? '--',
    label: translate('hoSoNhanSu:bangCapChungChi'),
  },
  {
    value: item?.noiBoiDuong ?? '--',
    label: translate('slink:Country_study_in'),
  },
  item?.noiBoiDuong === 'Nước ngoài'
    ? {
        value: item?.quocGiaBoiDuongId
          ? listQuocGia?.find(
              quocGia => item?.quocGiaBoiDuongId === quocGia?._id,
            )?.tenQuocTich ?? '--'
          : '--',
        label: translate('slink:Country'),
      }
    : null,
  {
    value: item?.hinhThucDaoTao?.ten ?? '--',
    label: translate('slink:Forms_of_training'),
  },
  {
    value: item?.donViToChuc ?? '--',
    label: translate('slink:Organizational_units'),
  },

  {
    value: item?.diaDiemToChuc ?? '--',
    label: translate('hoSoNhanSu:diaDiemToChuc'),
  },
  {
    value: item?.khoaBoiDuongTapHuan ?? '--',
    label: translate('hoSoNhanSu:chuDeDaoTaoBoiDuong'),
    mutiline: true,
  },
  {
    value: item?.ngayQuyetDinh
      ? moment(item?.ngayQuyetDinh).format('DD/MM/YYYY')
      : '--',
    label: translate('slink:Decision_date'),
  },
  {
    value: item?.tuNgay ? moment(item?.tuNgay).format('DD/MM/YYYY') : '--',
    label: translate('slink:FromDate'),
  },
  {
    value: item?.denNgay ? moment(item?.denNgay).format('DD/MM/YYYY') : '--',
    label: translate('slink:ToDate'),
  },
  {
    value: item?.soQuyetDinh ?? '--',
    label: translate('slink:Decision_number'),
  },
  {
    value: item?.giaHanDenNgay
      ? moment(item?.giaHanDenNgay).format('DD/MM/YYYY')
      : '--',
    label: translate('slink:Extended_to'),
  },

  {
    value: item?.nguonKinhPhi ?? '--',
    label: translate('slink:Expense_source'),
  },
  {
    value: item?.kinhPhi ? formatVND(item?.kinhPhi) : '--',
    label: translate('slink:Expense'),
  },
  {
    value: item?.chungChi ?? '--',
    label: 'Chứng chỉ',
  },
  {
    value: item?.canCu ?? '--',
    label: 'Căn cứ',
    isHtml: true,
  },
  {
    link: item?.fileDinhKemKetQua,
    value: item?.fileDinhKemKetQua ? translate('slink:See_details') : '--',
    label: translate('slink:Attach_work_result'),
  },
  {
    link: item?.fileDinhKemSoQuyetDinh,
    value: item?.fileDinhKemSoQuyetDinh ? translate('slink:See_details') : '--',
    label: translate('slink:Attach_decision_num'),
  },
];
