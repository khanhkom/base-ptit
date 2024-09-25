import React from 'react';
import { FlatList, HStack, Pressable, Text, VStack } from 'native-base';
import { ELoaiHocPhanDangKyTinChi, formatVND, HEIGHT, WIDTH } from '@common';
import LabelBox from '../component/LabelBox';
import { DotDangKyTCProps, LopHocPhanDKTCProps, MucThuMeProps } from '../type';
import ItemLHPSelect from '../component/ItemLHPSelect';
import ItemTrong from '@components/Item/ItemTrong';
import BaseButtonNB from '@components/BaseButtonNB';
import { translate } from '@utils/i18n/translate';
import R from '@assets/R';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import LoadingComponent from '@libcomponents/loading/loading-component';

interface Props {
  listLHPRegistered: LopHocPhanDKTCProps[];
  onPressDel: (e: number) => void;
  mucThuMe: MucThuMeProps | undefined;
  dotDangKyTC: DotDangKyTCProps | undefined;
  loadingContainer: boolean;
}
const DanhSachSelect = (props: Props) => {
  const {
    listLHPRegistered,
    dotDangKyTC,
    onPressDel,
    loadingContainer,
    mucThuMe,
  } = props;

  const tinhHocPhi = (
    soTinChi?: number,
    loaiHocPhan?: ELoaiHocPhanDangKyTinChi,
    maNganh?: string,
  ): number => {
    if (!mucThuMe) return 0;
    let mucThu = Object.values(mucThuMe).find(
      item => item && item?.maNganh === maNganh,
    );
    if (!mucThu) mucThu = mucThuMe.mucThuKhoaNganhChinh;

    const due = (mucThu?.unitAmount ?? 0) * (soTinChi ?? 0);
    const heSo = {
      [ELoaiHocPhanDangKyTinChi.CAI_THIEN]: mucThu?.heSoHocCaiThien ?? 1,
      [ELoaiHocPhanDangKyTinChi.HOC_LAI]: mucThu?.heSoHocLai ?? 1,
    };
    const defaultHeSo = mucThu?.heSoTienTrinh ?? 1;

    return due * (heSo[loaiHocPhan as keyof typeof heSo] ?? defaultHeSo);
  };
  const tongHocPhi = _.sumBy(listLHPRegistered, lop =>
    tinhHocPhi(
      lop?.hocPhan?.soTinChi,
      lop?.hocPhan?.loai,
      lop?.hocPhan?.maNganh,
    ),
  );
  const tongSoTinChi = _.sumBy(
    listLHPRegistered,
    lop => lop?.hocPhan?.soTinChi,
  );
  const onNavigatePreview = () => {
    navigateScreen(APP_SCREEN.XEMTRUOCLICHLTC, {
      listMonHoc: listLHPRegistered,
    });
  };
  const isDiabled = true;
  return (
    <VStack>
      <LoadingComponent loading={loadingContainer} />
      <LabelBox label={`Danh sách lớp tín chỉ\nđã đăng ký / đã chọn`} />
      <FlatList
        data={listLHPRegistered}
        extraData={listLHPRegistered}
        ListEmptyComponent={
          <ItemTrong customStyle={{ marginTop: HEIGHT(12) }} />
        }
        renderItem={({ item, index }) => {
          const hocPhi = () => {
            const due = tinhHocPhi(
              item?.hocPhan?.soTinChi,
              item?.hocPhan?.loai,
              item?.hocPhan?.maKhoaNganh,
            );
            if (due) return `${formatVND(due)}`;
            return '--';
          };
          return (
            <ItemLHPSelect
              isVisibleDelete={!!dotDangKyTC}
              hocPhi={hocPhi()}
              onPressDel={() => onPressDel(index)}
              mucThuMe={mucThuMe}
              index={index}
              key={index}
              data={item}
            />
          );
        }}
      />
      <VStack mt={HEIGHT(24)} px={WIDTH(16)}>
        <Text flex={1} fontSize="sm" fontFamily={R.fonts.BeVietnamProMedium}>
          {translate('slink:Tong_so_tin_chi')}:{' '}
          <Text fontFamily={R.fonts.BeVietnamProExtraBold} color={'red.600'}>
            {tongSoTinChi} {translate('slink:Credits')}
          </Text>
        </Text>
        <Text
          mt={HEIGHT(4)}
          flex={1}
          fontSize="sm"
          fontFamily={R.fonts.BeVietnamProMedium}>
          {translate('slink:Hoc_phi_du_kien')}:{' '}
          <Text fontFamily={R.fonts.BeVietnamProExtraBold} color={'black'}>
            {formatVND(tongHocPhi)}
          </Text>
        </Text>
      </VStack>
      <HStack mt={HEIGHT(24)} px={WIDTH(16)}>
        <Pressable
          flex={1}
          onPress={onNavigatePreview}
          backgroundColor={'primary.500'}
          justifyContent="center"
          mr="2"
          _pressed={R.themes.pressed}
          alignItems="center"
          borderRadius={WIDTH(8)}
          hitSlop={R.themes.hitSlop}>
          <Icon name={'calendar'} size={WIDTH(20)} color={'white'} />
        </Pressable>
        <BaseButtonNB
          marginTop={0}
          isDisabled={isDiabled}
          isLoadingText={translate('slink:Loading')}
          width={WIDTH(295)}
          title={translate('slink:Register')}
          onPress={() => null}
        />
      </HStack>
    </VStack>
  );
};

export default DanhSachSelect;
