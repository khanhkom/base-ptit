import React, { useEffect, useRef, useState } from 'react';
import { Box, FlatList } from 'native-base';
import { translate } from '@utils/i18n/translate';
import { ETrangThaiSinhVienDKTinChi, HEIGHT, WIDTH } from '@common';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import ItemTrong from '@components/Item/ItemTrong';
import LoadMore from '@libcomponents/loading/loadmore-component';
import ItemHocPhan from '../component/ItemHocPhan';
import LabelBox from '../component/LabelBox';
import {
  DotDangKyTCProps,
  DotDKTCMeProps,
  HocPhanProps,
  LopHocPhanDKTCProps,
} from '../type';
import { APP_SCREEN } from '@navigation/screen-types';
import { navigateScreen } from '@navigation/navigation-service';
import { getDSHocPhan } from '@networking/user/DangKyTinChi';
import { DSKhoaNganhProps } from '@components/HeaderSongNganh/type';

interface Props {
  dotDangKyMe: DotDKTCMeProps | undefined;
  maHocKy: string;
  onChangeLHP: (e: LopHocPhanDKTCProps) => void;
  listLHPRegistered: LopHocPhanDKTCProps[];
  khoaNganhSV: DSKhoaNganhProps | undefined;
  loadingContainer?: boolean;
}
const ThongTinDangKyTinChi = (props: Props) => {
  const {
    maHocKy,
    dotDangKyMe,
    onChangeLHP,
    listLHPRegistered,
    khoaNganhSV,
    loadingContainer,
  } = props;
  if (
    !dotDangKyMe ||
    dotDangKyMe?.trangThaiSvDangKyTinChi ===
      ETrangThaiSinhVienDKTinChi.KHONG_DUOC_DK
  ) {
    return (
      <ItemTrong
        customStyle={{ marginTop: HEIGHT(12) }}
        content={
          dotDangKyMe?.trangThaiSvDangKyTinChi
            ? `${dotDangKyMe?.trangThaiSvDangKyTinChi}${
                dotDangKyMe?.ghiChu ? `\n${dotDangKyMe?.ghiChu}` : ''
              }`
            : `Không có đợt đăng ký tín chỉ\ntrong học kỳ này !`
        }
      />
    );
  }
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setloading] = useState(false);
  const beginScroll = useRef<boolean>(false);
  const page = useRef(1);
  const maxData = useRef(false);
  const DANH_SACH_CHUONG_TRINH = [
    { label: 'Lớp theo kế hoạch giảng dạy', value: 'lop_hanh_chinh' },
    { label: 'Theo chương trình đào tạo', value: 'khoa-nganh' },
    ...(!!khoaNganhSV?.khoaNganhPhu
      ? [
          {
            label: 'Theo chương trình ngành 2',
            value: 'khoa-nganh-2',
          },
        ]
      : []),
    { label: 'Tất cả học phần', value: 'tat-ca' },
  ];
  const [maChuongTrinh, setmaChuongTrinh] = useState(
    DANH_SACH_CHUONG_TRINH[0].value,
  );
  const [dsHocPhan, setdsHocPhan] = useState<HocPhanProps[]>([]);

  const onChangeChuongTrinh = (maChuongTrinh: string) => {
    setmaChuongTrinh(maChuongTrinh);
  };
  useEffect(() => {
    !loadingContainer && !!maChuongTrinh && !!maHocKy && getInit();
  }, [maHocKy, maChuongTrinh, loadingContainer]);

  const getInit = async () => {
    setloading(true);
    try {
      const body = {
        limit: 10,
        page: 1,
        condition: {},
      };
      const resHocPhan = await getDSHocPhan(maHocKy, maChuongTrinh, body);
      setdsHocPhan(resHocPhan?.data?.data?.result || []);
      maxData.current = resHocPhan?.data?.data?.result?.length < 10;
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
          condition: {},
        };
        const resHocPhan = await getDSHocPhan(maHocKy, maChuongTrinh, body);
        maxData.current = resHocPhan?.data?.data?.result?.length < 10;
        setdsHocPhan([...dsHocPhan, ...(resHocPhan?.data?.data?.result ?? [])]);
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
  const onRefresh = () => getInit();

  const onPressHP = (data: HocPhanProps) => {
    navigateScreen(APP_SCREEN.CHITIETHOCPHAN, {
      onChangeLHP,
      data,
      maHocKy,
      maChuongTrinh,
      listLHPRegistered,
    });
  };
  return (
    <Box>
      <LabelBox label="Thông tin đăng ký" />
      <SingleSelect
        width={WIDTH(343)}
        mb={HEIGHT(16)}
        alignSelf="center"
        placeholder={translate('slink:Select_semester')}
        onChangeValue={onChangeChuongTrinh}
        defaultValue={DANH_SACH_CHUONG_TRINH[0].value}
        data={DANH_SACH_CHUONG_TRINH}
      />
      <Box maxHeight={HEIGHT(400)}>
        <FlatList
          data={dsHocPhan}
          extraData={dsHocPhan}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const isHas = listLHPRegistered?.some(
              e => e?.maHocPhan === item?.ma,
            );

            return (
              <ItemHocPhan
                index={index}
                isHas={isHas}
                key={index}
                onPress={() => onPressHP(item)}
                data={item}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={getMore}
          ListEmptyComponent={
            <ItemTrong customStyle={{ marginTop: HEIGHT(12) }} />
          }
          ListFooterComponent={loadMore ? <LoadMore /> : null}
          onEndReachedThreshold={0.01}
          onRefresh={onRefresh}
          refreshing={loading}
          onMomentumScrollBegin={() => {
            beginScroll.current = true;
          }}
        />
      </Box>
    </Box>
  );
};

export default ThongTinDangKyTinChi;
