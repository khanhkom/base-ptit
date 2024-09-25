/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Chưa sửa theo biểu mẫu khảo sát mới

import React from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import { EQUESTION_TYPE, popupCancel, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import ChiTietBieuMauDanhGia from '@components/ChiTietBieuMauDanhGia';
import SkeletonTable from '@components/HoSoNhanSu/SkeletonTable';
import ItemLabel from '@components/Item/ItemLabel';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  bieuMauKhaoSatTrucTuyen,
  dapAnKhaoSatTrucTuyen,
  uploadDocument,
} from '@networking/user';
import { submitAssignment } from '@networking/user/BaiTapVeNha';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';
import moment from 'moment';
import { Box, FlatList } from 'native-base';

import styles from './styles';

const KhaoSatBaiTap = (props: any) => {
  const itemBaiTap = props?.route?.params?.itemBaiTap;

  const itemSinhVien = props?.route?.params?.itemSinhVien;

  const onRefresh = props?.route?.params?.onRefresh;

  const isSinhVien = props?.route?.params?.isSinhVien ?? false;

  console.log('🚀 ~ KhaoSatBaiTap ~ itemBaiTap:', itemBaiTap, itemSinhVien);

  const [loading, setLoading] = React.useState(false);

  const [listQuestion, setListQuestion] = React.useState<any[]>([]);

  const [defaultData, setDefaultData] = React.useState<any[]>([]);

  const disable = itemSinhVien?.trangThai === 'DA_NOP';

  React.useEffect(() => {
    if (disable) {
      getDefaultData();
    }

    getDataExamination();
  }, []);

  const getDefaultData = async () => {
    try {
      setLoading(true);

      const res: any = await dapAnKhaoSatTrucTuyen(itemSinhVien?.cauTraLoiId);

      setDefaultData(res?.data?.data?.danhSachTraLoi ?? []);

      getDataExamination();

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getDataExamination = async () => {
    try {
      setLoading(true);

      const res = await bieuMauKhaoSatTrucTuyen(itemBaiTap?.khaoSatId);

      setListQuestion(res?.data?.data?.danhSachKhoi ?? []);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onSendAnswer = async (dataSubmit?: any) => {
    try {
      setLoading(true);

      const dataTranform = await tranformData(dataSubmit);

      const danhSachTraLoi = await Promise.all(dataTranform);

      const listFile: any[] = await uploadDocument(dataSubmit?.urlImages);

      const bodyKhaoSat = {
        mode: 'submit',
        thongTinCauTraLoiQuiz: {
          danhSachTraLoi: danhSachTraLoi,
          idKhaoSat: itemBaiTap?.khaoSatId,
        },
        assignmentId: itemSinhVien?.assignmentId,
        noiDungTraLoi: dataSubmit?.noiDungTraLoi ?? '',
        urlImages: listFile?.map(item => item?.url) ?? [],
      };

      const res = await submitAssignment(bodyKhaoSat);

      if (res?.status) {
        onRefresh && onRefresh();

        setTimeout(goBack, 500);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const methods = useForm();

  const handleData = (dataSubmit: any) => {
    popupCancel(
      translate('slink:Notice_t'),
      'Bạn có chắc chắn muốn nộp bài tập này',
      () => onSendAnswer(dataSubmit),
    );
  };

  // if (!listQuestion?.length) {
  //   return (
  //     <Box style={styles.flex}>
  //       <HeaderReal title={translate('slink:Survey')} />
  //       <Box w={WIDTH(343)} alignSelf={'center'} mt={'4'}>
  //         <SkeletonTable />
  //       </Box>
  //     </Box>
  //   );
  // }

  const title = 'Nội dung phản hồi';

  const dsFile = [
    ...(itemSinhVien?.urlImages ?? []),
    ...(itemSinhVien?.urlVideos ?? []),
  ];

  console.log('🚀 ~ KhaoSatBaiTap ~ dsFile:', dsFile);

  const dsFileInfo = dsFile?.map(itemFile => {
    return {
      label: getNameFile(itemFile),
      value: 'Xem chi tiết',
      isLink: itemFile,
    };
  });

  const listInfo: any = [
    { label: 'Mã SV', value: itemSinhVien?.maSinhVien },
    { label: 'Họ tên', value: itemSinhVien?.hoTen },
    { label: 'Nội dung', value: itemSinhVien?.noiDungTraLoi },
    { label: 'Kết quả', value: String(itemSinhVien?.tongDiem ?? 0) },
    {
      label: 'Thời gian',
      value: itemSinhVien?.updatedAt
        ? moment(itemSinhVien?.updatedAt).format('HH:mm DD/MM/YYYY')
        : '--',
    },
    {
      label: 'Tệp đính kèm',
      value: String(dsFile?.length) + ' tài liệu',
    },

    ...dsFileInfo,
  ];

  // if (loading) {
  //   return (
  //     <Box style={styles.flex}>
  //       <HeaderReal title={title} /> <LoadingComponent loading={loading} />
  //     </Box>
  //   );
  // }

  return (
    <FormProvider {...methods}>
      <Box style={styles.flex}>
        <HeaderReal title={title} />
        <KeyboardAwareScrollView
          style={styles.viewContent}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          {isSinhVien ? (
            <Box style={styles.viewBox}>
              <InputNBForm
                label={'Nội dung trả lời'}
                name={'noiDungTraLoi'}
                error={''}
                control={methods.control}
                defaultValue={''}
                isDisabled={disable}
              />
              <UploadFileForm
                name={'urlImages'}
                arrayFile={[]}
                error={''}
                control={methods.control}
                label={'Tệp đính kèm'}
                disabled={disable}
              />
            </Box>
          ) : (
            <FlatList
              data={listInfo}
              scrollEnabled={false}
              nestedScrollEnabled={false}
              style={styles.viewBox}
              renderItem={({ item, index }: any) => (
                <ItemLabel
                  label={item?.label}
                  value={item?.value}
                  link={item?.isLink ?? false}
                  isLast={index === listInfo?.length - 1}
                />
              )}
            />
          )}

          {[...listQuestion]?.map((item, index) => (
            <ChiTietBieuMauDanhGia
              disabled={disable}
              initKetQua={defaultData}
              data={item}
              key={index}
              // errors={errors}
              // control={control}
            />
          ))}
          <BaseButtonNB
            onPress={methods?.handleSubmit(handleData)}
            isLoading={loading}
            isLoadingText={translate('slink:Sending')}
            width={WIDTH(100)}
            title={'Nộp bài'}
            hidden={disable}
          />
        </KeyboardAwareScrollView>
        <LoadingComponent loading={loading} />
      </Box>
    </FormProvider>
  );
};

export default KhaoSatBaiTap;

const tranformData = async (data: any) => {
  const listResult = _.map(data, (value, key) => ({ key, value }));

  const listAnswer = listResult.map(async item => {
    if (item?.value?.listUrlFile?.length > 0) {
      const transform = item?.value?.listUrlFile?.map(async (e: any) => {
        if (e?.type) {
          const listUrlFileResponse: any = await uploadDocument([e]);

          return listUrlFileResponse?.[0]?.url;
        } else {
          return e?.uri;
        }
      });

      const listUrlFile = await Promise.all(transform);

      return {
        ...item,
        value: {
          ...item?.value,
          listUrlFile,
        },
      };
    } else {
      return item;
    }
  });

  const listAnswerResult = await Promise.all(listAnswer);

  console.log('🚀 ~ tranformData ~ listAnswerResult:', listAnswerResult);

  //filter Các trường ko có giá trị
  const result = listAnswerResult
    ?.filter(
      itemDon =>
        itemDon?.key !== 'noiDungTraLoi' && itemDon?.key !== 'urlImages',
    )
    ?.map(item => {
      console.log('🚀 ~ tranformData ~ item:', item);

      const body = () => {
        switch (item?.value?.loai) {
          case EQUESTION_TYPE.SingleChoice:
          case EQUESTION_TYPE.MultipleChoice:
            return {
              listLuaChon: item?.value?.listLuaChon ?? [],
              traLoiKhac: item?.value?.traLoiKhac,
            };
          case EQUESTION_TYPE.GridSingleChoice:
          case EQUESTION_TYPE.GridMultipleChoice:
            return {
              listLuaChon: item?.value?.listLuaChon ?? [],
            };
          case EQUESTION_TYPE.NumbericRange:
            return { luaChonTuyenTinh: item?.value?.luaChonTuyenTinh || 0 };
          case EQUESTION_TYPE.Text:
            return { traLoiText: item?.value?.traLoiText || '' };
          case EQUESTION_TYPE.UploadFile:
            return { listUrlFile: item?.value?.listUrlFile || '' };

          default:
            return item?.value;
        }
      };

      return { idCauHoi: item?.key, ...body() };
    });

  return result;
};

function getNameFile(url: string): string {
  if (typeof url !== 'string') {
    return 'Đường dẫn không đúng';
  }

  return decodeURI(url.split('/')?.at(-1) ?? '');
}
