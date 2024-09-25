/* eslint-disable no-unsafe-optional-chaining */

import React, { useState } from 'react';

import R from '@assets/R';
import { ETrangThaiDiemDanh, HEIGHT, popupCancel, WIDTH } from '@common';
import ItemInfoStudents from '@components/Item/ItemStudents/ItemInfoStudent';
import ItemTrong from '@components/Item/ItemTrong';
import ViewTwoButton from '@components/Item/ViewTwoButton';
import ViewDiemDanhSV from '@components/ViewDiemDanh';
import { goBack } from '@navigation/navigation-service';
import {
  checkAllDiemDanh,
  diemDanhNguoiDay,
  ketThucDiemDanh,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import moment from 'moment';
import {
  Box,
  Center,
  FlatList,
  HStack,
  IconButton,
  Modal,
  Stagger,
  Text,
  useDisclose,
  useTheme,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import { SinhVienDiemDanhProps } from './type';

import ViewChuaBatDau from '../../BuoiHocGiangVien/ViewChuaBatDau';
import HeaderBuoiHoc from '../HeaderBuoiHoc';
interface Props {
  id: string;
  title: string;
  dataBuoiHoc: any;
  loading: boolean;
  onRefresh?: (e?: boolean) => void;
  funGoBack?: () => void;
  chuaKhoiTao: boolean;
  listResult: SinhVienDiemDanhProps[];
  onRefreshKhoiTao: (val: boolean) => void;
}

const DiemDanh = (props: Props) => {
  const {
    id,
    onRefresh,
    listResult,
    onRefreshKhoiTao,
    chuaKhoiTao,
    dataBuoiHoc,
    funGoBack,
  } = props;

  const [visible, setvisible] = useState(false);

  const ngay = moment(dataBuoiHoc?.thoiGianBatDau).format('DD/MM/YYYY');

  const visibleEndDD =
    dataBuoiHoc?.trangThaiDiemDanh === ETrangThaiDiemDanh.CHUA_DIEM_DANH;

  const handleRadioButtonChange = async (
    index: number,
    value: ETrangThaiDiemDanh,
  ) => {
    try {
      const { hoTenUser, idUser, maUser } = listResult?.[index];

      const body = {
        hoTenUser,
        idUser,
        maUser,
        trangThai: value || ETrangThaiDiemDanh.CHUA_DIEM_DANH,
      };

      await diemDanhNguoiDay(id, body);

      onRefresh && onRefresh(true);
    } catch (error) {}
  };

  const checkAllCoMat = async () => {
    popupCancel(
      translate('slink:Notice_t'),
      translate('slink:Danh_dau_all'),
      async () => {
        await checkAllDiemDanh(id);

        onRefresh && onRefresh();
      },
    );
  };

  const endDiemDanh = async () => {
    await ketThucDiemDanh(id);

    setvisible(false);

    funGoBack && funGoBack();

    setTimeout(goBack, 500);
  };

  const soHocSinhChuaDiemDanh =
    listResult?.length -
    demSoPhanTu(listResult, ETrangThaiDiemDanh.CO_MAT) -
    demSoPhanTu(listResult, ETrangThaiDiemDanh.VANG_CO_PHEP) -
    demSoPhanTu(listResult, ETrangThaiDiemDanh.VANG_KHONG_PHEP);

  if (chuaKhoiTao) {
    return (
      <Box flex={1}>
        <HeaderBuoiHoc infoCard={dataBuoiHoc} title={props?.title} />
        <ViewChuaBatDau
          id={id}
          onRefresh={() => {
            onRefresh && onRefresh();

            onRefreshKhoiTao(false);
          }}
        />
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <FlatList
        data={listResult}
        refreshing={props?.loading}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <HeaderBuoiHoc infoCard={dataBuoiHoc} title={props?.title} />
        }
        contentContainerStyle={{ paddingBottom: HEIGHT(30) }}
        extraData={listResult}
        ListEmptyComponent={<ItemTrong />}
        renderItem={({ item, index }) => (
          <HStack
            px={WIDTH(8)}
            key={index}
            justifyContent={'space-between'}
            mt="4">
            <ItemInfoStudents
              indexVisible
              index={index}
              key={index}
              hoVaTen={`${item?.hoTenUser}` || '--'}
              maSinhVien={item?.maUser || '--'}
            />
            <ViewDiemDanhSV
              value={item?.trangThai}
              onChangeKyHoc={value => {
                handleRadioButtonChange(index, value);
              }}
            />
          </HStack>
        )}
      />
      <ModalKetThucDiemDanh
        handleEnd={endDiemDanh}
        visible={visible}
        onClose={() => setvisible(false)}
        name={dataBuoiHoc?.tenLopHocPhan}
        ngay={ngay}
        listResult={listResult}
      />
      {visibleEndDD && (
        <ViewStagger
          onCheckAll={checkAllCoMat}
          onOpen={() => setvisible(true)}
          enableCheckAll={soHocSinhChuaDiemDanh !== 0}
        />
      )}
    </Box>
  );
};

export default DiemDanh;

const ModalKetThucDiemDanh = ({
  listResult,
  handleEnd,
  visible,
  onClose,
  ngay,
  name,
}: {
  ngay: string;
  name: string;
  visible: boolean;
  onClose: () => void;
  handleEnd: () => void;
  listResult: SinhVienDiemDanhProps[];
}) => {
  const listKhaiBao = [
    {
      label: translate('slink:Attendance'),
      value: demSoPhanTu(listResult, ETrangThaiDiemDanh.CO_MAT),
    },
    {
      label: translate('slink:Absence_with_permission'),
      value: demSoPhanTu(listResult, ETrangThaiDiemDanh.VANG_CO_PHEP),
    },
    {
      label: translate('slink:Absence_without_permission'),
      value: demSoPhanTu(listResult, ETrangThaiDiemDanh.VANG_KHONG_PHEP),
    },
    {
      label: translate('slink:No_attendance_yet'),
      value: demSoPhanTu(listResult, ETrangThaiDiemDanh.CHUA_DIEM_DANH),
    },
  ];

  return (
    <Modal isOpen={visible} backdropVisible onClose={onClose}>
      <Box style={[styles.containerModal]}>
        <TieuDeLop ngay={ngay} name={name} />
        <FlatList
          data={listKhaiBao}
          numColumns={2}
          scrollEnabled={false}
          style={styles.info}
          columnWrapperStyle={styles.wrap}
          renderItem={({ item, index }) => (
            <Text key={index} style={styles.textLabel}>
              {item?.label}: <Text style={styles.name}>{item?.value}</Text>
            </Text>
          )}
        />
        <TextCaution />
        <ViewTwoButton
          leftButton={onClose}
          rightButton={handleEnd}
          leftButtonTitle={translate('slink:Cancel')}
          rigthButtonTitle={translate('slink:Confirm')}
        />
      </Box>
    </Modal>
  );
};

const TieuDeLop = ({ ngay, name }: { ngay: string; name: string }) => (
  <>
    <Text style={styles.titleMain}>
      {`Xác nhận kết thúc điểm danh buổi học\nngày ${ngay}`}
    </Text>
    <Text style={styles.titleConfirm}>
      {`${translate('slink:Lop_tin_chi')}: `}
      <Text color={R.colors.colorMain} style={styles.name}>
        {name}
      </Text>
    </Text>
  </>
);

const TextCaution = () => (
  <Text style={styles.textLuuY}>{translate('slink:Notes_attendance')}</Text>
);

const ViewStagger = props => {
  const { onCheckAll, onOpen, enableCheckAll } = props;

  const { isOpen, onToggle } = useDisclose();

  const theme = useTheme();

  return (
    <Center bottom={HEIGHT(100)} right={WIDTH(16)} position={'absolute'}>
      <Box alignItems="center">
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}>
          {enableCheckAll ? (
            <IconButton
              mb="4"
              onPress={onCheckAll}
              variant="solid"
              bg="indigo.500"
              colorScheme="indigo"
              borderRadius="full"
              icon={
                <Icon
                  size={WIDTH(22)}
                  name={'playlist-check'}
                  color={theme.colors.white}
                />
              }
            />
          ) : (
            <></>
          )}

          <IconButton
            onPress={onOpen}
            mb="4"
            variant="solid"
            bg="yellow.400"
            colorScheme="yellow"
            borderRadius="full"
            icon={
              <Icon
                name="page-next-outline"
                size={WIDTH(24)}
                color={R.colors.white100}
              />
            }
          />
        </Stagger>
      </Box>
      <HStack alignItems="center">
        <IconButton
          variant="solid"
          borderRadius="full"
          size="lg"
          onPress={onToggle}
          bg="cyan.400"
          icon={
            <AntDesign
              size={WIDTH(22)}
              name={isOpen ? 'menufold' : 'menuunfold'}
              color={theme.colors.white}
            />
          }
        />
      </HStack>
    </Center>
  );
};

const demSoPhanTu = (list: SinhVienDiemDanhProps[], key: string) => {
  const listPhanTu =
    list?.filter((item: SinhVienDiemDanhProps) => item?.trangThai === key) ??
    [];

  return listPhanTu?.length ?? 0;
};
