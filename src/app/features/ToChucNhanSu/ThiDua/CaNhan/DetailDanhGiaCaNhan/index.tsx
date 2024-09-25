/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import TextTitleTCNS from '@components/HoSoNhanSu/component/TextLabelTCNS';
import MenuComponent from '@components/MenuNativeBase/MenuComponent';
import HeaderReal from '@libcomponents/header-real';
import { AccountProps } from '@model/app';
import { goBack } from '@navigation/navigation-service';
import {
  getBieuMauDGNS,
  getDetailBieuMau,
  onDGNhanSu,
} from '@networking/user/DanhGiaNhanSu';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import { Box, Collapse, Text, VStack } from 'native-base';

import {
  BieuMauDanhGiaProps,
  DanhSachKhoi,
  DataDGDonViProps,
  InfoPhieuProps,
} from './type';

import InputDanhGia from '../../component/InputDanhGia';
import InputNhanXet from '../../component/InputNhanXet';
import SekeletonKhoi from '../../component/SkeletonKhoi';
import ThongTinChung from '../../component/ThongTinChung';
import TuPhanLoai from '../../component/TuPhanLoai';
import { DotDanhGiaProps } from '../type';
interface Props {
  route: {
    params: {
      data: DotDanhGiaProps;
      isDisabled: boolean;
      onRefresh: () => void;
      dataDonVi?: DataDGDonViProps;
      donVi?: boolean;
      thongTinNhanSu?: AccountProps;
      bieuMau?: any;
    };
  };
}
const DetailDanhGiaCaNhan = (props: Props) => {
  const thongTinNhanSu = props?.route?.params?.thongTinNhanSu;

  const dataDonVi = props?.route?.params?.dataDonVi;

  const bieuMau = props?.route?.params?.bieuMau;

  const onRefresh = props?.route?.params?.onRefresh;

  const { account } = useSelector(selectAppConfig);

  const nhanSu = thongTinNhanSu || account;

  const data = props?.route?.params?.data;

  const isDisabled = props?.route?.params?.isDisabled;

  const isDonVi = props?.route?.params?.donVi;

  const [bieuMauData, setbieuMauData] = useState<BieuMauDanhGiaProps>();

  const [refreshing, setRefreshing] = useState(false);

  const [listInfoResponse, setlistInfoResponse] = useState<InfoPhieuProps[]>(
    [],
  );

  const [expandMucI, setexpandMucI] = useState(true);

  useEffect(() => {
    getInitAPI();
  }, []);

  const getInitAPI = async () => {
    setRefreshing(true);

    const responseBieuMau: any = await getBieuMauDGNS(
      bieuMau?._id ?? data?.idBieuMau ?? dataDonVi?.data[0]?.idKhaoSat,
    );

    setbieuMauData(responseBieuMau?.data?.data);

    const responseData: any = await getDetailBieuMau(
      nhanSu?.ssoId || '',
      data?._id,
    );

    const infoTraLoi: InfoPhieuProps[] = responseData?.data?.data?.data?.filter(
      (item: InfoPhieuProps) => item?.ssoId === nhanSu?.ssoId,
    );

    setlistInfoResponse(infoTraLoi);

    setRefreshing(false);
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const danhSachKhoi = bieuMauData?.danhSachKhoi || [];

  const watchValues = watch();

  const listIdCauHoi = getAllQuestionIds(danhSachKhoi);

  const fieldSubmit = isDonVi ? 'donVi' : 'caNhan';

  const resultArray = _.map(watchValues, (value, key) => ({
    idCauHoi: key,
    traLoiText: value,
  }));

  const danhSachTraLoi =
    resultArray?.filter(item => listIdCauHoi?.includes(item?.idCauHoi)) || [];

  const tongDiem = danhSachTraLoi?.reduce(
    (total: number, item) => total + Number(item?.traLoiText?.caNhan || 0),
    0,
  );

  const body = {
    danhSachTraLoi: danhSachTraLoi?.map(item => {
      return {
        idCauHoi: item?.idCauHoi,
        traLoiText: item?.traLoiText?.[fieldSubmit] || '',
      };
    }),
    guiNgay: false,
    idDot: data?._id,
    idKhaoSat: bieuMau?._id ?? data?.idBieuMau,
    nguoiTraLoi: isDonVi ? 'Lãnh đạo phòng ban' : 'Cá nhân',
    ssoId: nhanSu?.ssoId,
  };

  const onSave = async (value: any) => {
    const bodyDonVi = {
      yKienDonVi: value?.yKienDonVi || '',
      ketQuaKetLuan: value?.ketQuaKetLuan || '',
    };

    const bodySubmit = {
      ...body,
      ...(isDonVi && bodyDonVi),
    };

    const responseAPI = await onDGNhanSu(bodySubmit);

    if (responseAPI?.status) {
      setTimeout(goBack, 500);

      onRefresh && onRefresh();
    }
  };

  const onSubmit = async value => {
    const bodyDonVi = {
      yKienDonVi: value?.yKienDonVi || '',
      ketQuaKetLuan: value?.ketQuaKetLuan || '',
    };

    const bodySubmit = { ...body, guiNgay: true, ...(isDonVi && bodyDonVi) };

    const responseAPI = await onDGNhanSu(bodySubmit, true);

    if (responseAPI?.status) {
      setTimeout(goBack, 500);

      onRefresh && onRefresh();
    }
  };

  const infoCaNhan = listInfoResponse?.find(e => e?.nguoiTraLoi === 'Cá nhân');

  const infoDonVi = listInfoResponse?.find(e => e?.nguoiTraLoi !== 'Cá nhân');

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={data?.tenDot || translate('slink:Personal_review')}
        childrenRight={
          <RightComponent
            visible={!isDisabled}
            onSave={handleSubmit(onSave)}
            onSend={handleSubmit(onSubmit)}
          />
        }
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <ThongTinChung nhanSu={nhanSu} />
        <VStack>
          <TextTitleTCNS
            label={
              'I. ĐÁNH GIÁ KẾT QUẢ CÔNG TÁC, TU DƯỠNG, RÈN LUYỆN CỦA VIÊN CHỨC'
            }
            onPress={() => {
              setexpandMucI(!expandMucI);
            }}
            expand={expandMucI}
          />
          <Collapse isOpen={expandMucI}>
            <Box px={WIDTH(16)} mb={'2'}>
              {refreshing ? (
                <SekeletonKhoi />
              ) : (
                danhSachKhoi?.map(khoi => {
                  const maxValue = khoi.danhSachCauHoi?.reduce(
                    (total: number, item) =>
                      total + (item?.gioiHanTrenTuyenTinh || 0),
                    0,
                  );

                  return (
                    <VStack key={khoi?._id}>
                      <Text
                        fontFamily={R.fonts.BeVietnamProMedium}
                        fontSize={'xs'}
                        color={'black'}>
                        {khoi?.tieuDe}
                        <Text color={'primary.500'}>
                          {maxValue ? ` (${maxValue} điểm)` : ''}
                        </Text>
                      </Text>
                      {khoi?.danhSachCauHoi?.map(cauHoi => {
                        const defaultValueCaNhan =
                          infoCaNhan?.danhSachTraLoi?.find(
                            e => e?.idCauHoi === cauHoi?._id,
                          )?.traLoiText || '';

                        const defaultValueDonVi =
                          infoDonVi?.danhSachTraLoi?.find(
                            e => e?.idCauHoi === cauHoi?._id,
                          )?.traLoiText || '';

                        return (
                          <InputDanhGia
                            defaultValueCaNhan={defaultValueCaNhan}
                            defaultValueDonVi={defaultValueDonVi}
                            error={errors?.[cauHoi?._id]}
                            isDisabled={isDisabled}
                            setValue={setValue}
                            isDonVi={isDonVi}
                            label={cauHoi.noiDungCauHoi}
                            name={cauHoi?._id}
                            maxValue={cauHoi?.gioiHanTrenTuyenTinh}
                            minValue={cauHoi?.gioiHanDuoiTuyenTinh}
                            key={cauHoi?._id}
                            isRequired={cauHoi?.batBuoc}
                            control={control}
                          />
                        );
                      })}
                    </VStack>
                  );
                })
              )}
            </Box>
          </Collapse>
        </VStack>
        <TuPhanLoai label={'II. TỰ PHÂN LOẠI CỦA VIÊN CHỨC'} val={tongDiem} />
        <InputNhanXet
          name="yKienDonVi"
          setValue={setValue}
          control={control}
          label={
            'III. Ý KIẾN CỦA TẬP THỂ ĐƠN VỊ (kết quả họp toàn thể viên chức của đơn vị)'
          }
          isDisabled={!isDonVi || isDisabled}
          defaultValue={dataDonVi?.yKienDonVi || ''}
        />
        <InputNhanXet
          name="ketQuaKetLuan"
          setValue={setValue}
          control={control}
          label={
            'IV. KẾT QUẢ TỔNG HỢP ĐỂ XẾP LOẠI VIÊN CHỨC (phần này do Trưởng hoặc Phó phụ trách đơn vị đề xuất đánh giá, phân loại)'
          }
          isDisabled={!isDonVi || isDisabled}
          defaultValue={dataDonVi?.ketQuaKetLuan || ''}
        />
        <InputNhanXet
          name="lanhDaoHocVien"
          setValue={setValue}
          control={control}
          label={'V. LÃNH ĐẠO HỌC VIỆN KẾT LUẬN ĐÁNH GIÁ, PHÂN TÍCH'}
          isDisabled={true}
          defaultValue={undefined}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default DetailDanhGiaCaNhan;

const styles = StyleSheet.create({
  content: {
    paddingBottom: HEIGHT(30),
    paddingTop: HEIGHT(24),
  },
});

interface RightComponentProps {
  onSave?: () => void;
  onSend?: () => void;
  visible?: boolean;
}
const RightComponent = (props: RightComponentProps) => {
  const { onSave, onSend, visible = true } = props;

  const listFunction = [
    { title: translate('slink:Send_now'), onPress: onSend },
    { title: translate('slink:Save_to_send_later'), onPress: onSave },
  ];

  if (visible) {
    return <MenuComponent listFunction={listFunction} />;
  }

  return null;
};

function getAllQuestionIds(data: DanhSachKhoi[]) {
  const questionIds: string[] = [];

  // Lặp qua mỗi phần tử trong mảng data
  data.forEach(function (item) {
    // Kiểm tra xem có thuộc tính danhSachCauHoi không
    if (item.danhSachCauHoi && Array.isArray(item.danhSachCauHoi)) {
      // Lặp qua mỗi câu hỏi trong danh sách câu hỏi
      item.danhSachCauHoi.forEach(function (question) {
        // Kiểm tra xem có thuộc tính _id không
        if (question._id) {
          // Thêm giá trị _id vào mảng questionIds
          questionIds.push(question._id);
        }
      });
    }
  });

  return questionIds;
}
