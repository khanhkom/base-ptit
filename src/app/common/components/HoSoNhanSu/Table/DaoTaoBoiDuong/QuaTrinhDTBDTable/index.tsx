/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import BaseButtonNB from '@components/BaseButtonNB';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import { EKieuDuLieu } from '@config/constant';
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  delCuDiDTBD,
  getHinhThucDaoTao,
  getLoaiBoiDuong,
  getQuocGia,
  postCuDiDTBD,
  putCuDiDTBD,
  uploadDocument,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import BtnXoa from '../../BtnXoa/BtnXoa';

const QuaTrinhDTBDTable = props => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const watchValues = watch();

  const [loading, setloading] = useState(false);

  const thongTinNhanSuId = props?.route?.params?.idUser;

  const onRefresh = props?.route?.params?.onRefresh;

  const defaultData = props?.route?.params?.item;

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const [listLoaiBoiDuong, setlistLoaiBoiDuong] = useState([]);

  const [listQuocGia, setListQuocGia] = useState<any>([]);

  const [listHTDT, setlistHTDT] = useState([]);

  const getData = async () => {
    setloading(true);

    const responseAPILoaiBD = await getLoaiBoiDuong();

    setlistLoaiBoiDuong(
      responseAPILoaiBD?.data?.data?.map((item: any) => {
        return {
          label: item?.ten ?? '',
          value: item?._id ?? '',
        };
      }) ?? [],
    );

    const resQuocGia: any = await getQuocGia();

    resQuocGia?.data?.data?.map(
      (i: { value: any; _id: any; label: any; tenQuocTich: any }) => {
        i.value = i?._id;

        i.label = i?.tenQuocTich;
      },
    );

    setListQuocGia(resQuocGia?.data?.data);

    const responseAPIHTDT = await getHinhThucDaoTao();

    setlistHTDT(
      responseAPIHTDT?.data.map((item: any) => {
        return {
          label: item?.ten ?? '',
          value: item?._id,
        };
      }) ?? [],
    );

    setloading(false);
  };

  useEffect(() => {
    getData();

    if (defaultData) {
      initData();
    }
  }, []);

  const initData = () => {
    const listId = [
      'chungChi',
      'denNgay',
      'diaDiemToChuc',
      'donViToChuc',
      'khoaBoiDuongTapHuan',
      'loaiBoiDuongId',
      'ngayCap',
      'nguonKinhPhi',
      'tuNgay',
      'ngayCap',
      'noiBoiDuong',
      'hinhThucDaoTaoId',
      'soQuyetDinh',
      'ngayQuyetDinh',
      'giaHanDenNgay',
      'quocGiaBoiDuongId',
      'kinhPhi',
    ];

    listId?.forEach(id => setValue(id, defaultData?.[id]));
  };

  const onSubmit = async (data: any) => {
    setloadingSubmit(true);

    let resuploadSoQuyetDinh: any;
    if (data?.fileDinhKemSoQuyetDinh?.length !== 0) {
      if (data?.fileDinhKemSoQuyetDinh?.[0]?.type) {
        resuploadSoQuyetDinh = await uploadDocument(
          data?.fileDinhKemSoQuyetDinh,
        );
      } else {
        resuploadSoQuyetDinh = data?.urlFileUpload;
      }
    }

    let resuploadKetQua: any;
    if (data?.fileDinhKemKetQua?.length !== 0) {
      if (data?.fileDinhKemKetQua?.[0]?.type) {
        resuploadKetQua = await uploadDocument(data?.fileDinhKemKetQua);
      } else {
        resuploadKetQua = data?.urlFileUpload;
      }
    }

    const body = {
      chungChi: data?.chungChi || null,
      ...(data?.denNgay && { denNgay: data?.denNgay }),
      ...(data?.tuNgay && { tuNgay: data?.tuNgay }),
      ...(data?.ngayQuyetDinh && { ngayQuyetDinh: data?.ngayQuyetDinh }),
      ...(data?.giaHanDenNgay && { giaHanDenNgay: data?.giaHanDenNgay }),
      ...(data?.ngayCap && { ngayCap: data?.ngayCap }),
      noiBoiDuong: data?.noiBoiDuong || null,
      quocGiaBoiDuongId: data?.quocGiaBoiDuongId || null,
      tenQuocTich: listQuocGia?.find(item => {
        item?.value === data?.quocGiaBoiDuongId;
      })?.label,
      hinhThucDaoTaoId: data?.hinhThucDaoTaoId || null,
      diaDiemToChuc: data?.diaDiemToChuc || null,
      soQuyetDinh: data?.soQuyetDinh || null,
      donViToChuc: data?.donViToChuc || null,
      khoaBoiDuongTapHuan: data?.khoaBoiDuongTapHuan || null,
      loaiBoiDuongId: data?.loaiBoiDuongId || null,
      nguonKinhPhi: data?.nguonKinhPhi || null,
      kinhPhi: data?.kinhPhi ? Number(data?.kinhPhi) : null,
      thongTinNhanSuId,
      ...(resuploadKetQua?.[0]?.url && {
        fileDinhKemKetQua: resuploadKetQua?.[0]?.url,
      }),
      ...(resuploadSoQuyetDinh?.[0]?.url && {
        fileDinhKemSoQuyetDinh: resuploadSoQuyetDinh?.[0]?.url,
      }),
    };

    let res: any;
    if (defaultData?._id) {
      res = await putCuDiDTBD(body, defaultData?._id);
    } else {
      res = await postCuDiDTBD(body);
    }

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delCuDiDTBD(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  const isNuocNgoai = watchValues?.noiBoiDuong === 'Nước ngoài';

  if (loading) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal title="Quá trình đào tạo, bồi dưỡng" />
        <Box flex={1}>
          <LoadingComponent />
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title="Quá trình đào tạo, bồi dưỡng"
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <SingleSelectForm
          label="Loại bồi dưỡng"
          defaultValue={defaultData?.loaiBoiDuongId}
          data={listLoaiBoiDuong}
          name={'loaiBoiDuongId'}
          control={control}
          error={errors?.loaiBoiDuongId?.message}
          required
        />
        <SingleSelectForm
          label={translate('slink:Country_study_in')}
          data={[
            {
              label: 'Trong nước',
              value: 'Trong nước',
            },
            {
              label: 'Nước ngoài',
              value: 'Nước ngoài',
            },
          ]}
          defaultValue={defaultData?.noiBoiDuong ?? 'Trong nước'}
          name="noiBoiDuong"
          placeholder={`Chọn ${translate(
            'slink:Country_study_in',
          ).toLowerCase()}`}
          control={control}
          error={errors?.noiBoiDuong?.message}
          required
        />
        {isNuocNgoai && (
          <SingleSelectForm
            label={translate('slink:Country')}
            data={listQuocGia}
            placeholder={`Chọn ${translate('slink:Country').toLowerCase()}`}
            name={'quocGiaBoiDuongId'}
            control={control}
            error={errors?.quocGiaBoiDuongId?.message}
            defaultValue={defaultData?.quocGiaBoiDuongId ?? null}
          />
        )}
        {/* <InputNBForm
          label="Tên khóa bồi dưỡng tập huấn"
          required
          defaultValue={defaultData?.khoaBoiDuongTapHuan}
          name={'khoaBoiDuongTapHuan'}
          control={control}
          error={errors?.khoaBoiDuongTapHuan?.message}
        /> */}
        <InputNBForm
          label="Đơn vị tổ chức"
          defaultValue={defaultData?.donViToChuc}
          name={'donViToChuc'}
          control={control}
          error={errors?.donViToChuc?.message}
        />
        <SingleSelectForm
          label="Hình thức đào tạo"
          defaultValue={defaultData?.hinhThucDaoTaoId}
          data={listHTDT}
          name={'hinhThucDaoTaoId'}
          control={control}
          error={errors?.hinhThucDaoTaoId?.message}
          required
        />
        <InputNBForm
          label={translate('hoSoNhanSu:diaDiemToChuc')}
          defaultValue={defaultData?.diaDiemToChuc}
          name={'diaDiemToChuc'}
          control={control}
          error={errors?.diaDiemToChuc?.message}
        />
        <InputNBForm
          label={'Chủ đề đào tạo, bồi dưỡng'}
          defaultValue={defaultData?.khoaBoiDuongTapHuan}
          name={'khoaBoiDuongTapHuan'}
          control={control}
          error={errors?.khoaBoiDuongTapHuan?.message}
          textArea
        />
        <InputNBForm
          label={'Số quyết định'}
          defaultValue={defaultData?.soQuyetDinh}
          name={'soQuyetDinh'}
          control={control}
          error={errors?.soQuyetDinh?.message}
          required
        />
        <DatePickerForm
          defaultValue={defaultData?.ngayQuyetDinh}
          label={'Ngày quyết định'}
          error={errors?.ngayQuyetDinh?.message}
          mode="date"
          name={'ngayQuyetDinh'}
          control={control}
          isRequired
        />
        <DatePickerForm
          label={translate('slink:FromDate')}
          defaultValue={defaultData?.tuNgay}
          error={errors?.tuNgay?.message}
          mode="date"
          name={'tuNgay'}
          control={control}
          isRequired
        />
        <DatePickerForm
          defaultValue={defaultData?.denNgay}
          label={translate('slink:ToDate')}
          error={errors?.denNgay?.message}
          mode="date"
          name={'denNgay'}
          control={control}
        />
        <DatePickerForm
          defaultValue={defaultData?.giaHanDenNgay}
          label={'Gia hạn đến ngày'}
          error={errors?.giaHanDenNgay?.message}
          mode="date"
          name={'giaHanDenNgay'}
          control={control}
        />
        <InputNBForm
          label="Nguồn kinh phí"
          defaultValue={defaultData?.nguonKinhPhi}
          name={'nguonKinhPhi'}
          control={control}
          error={errors?.nguonKinhPhi?.message}
        />
        <InputNBForm
          label={translate('slink:Expense')}
          name={'kinhPhi'}
          type={EKieuDuLieu.NUMBER}
          error={errors?.kinhPhi?.message}
          placeholder={`Nhập ${translate('slink:Expense').toLowerCase()}`}
          control={control}
          defaultValue={
            defaultData?.kinhPhi ? String(defaultData?.kinhPhi) : undefined
          }
        />
        <InputNBForm
          label="Chứng chỉ"
          defaultValue={defaultData?.chungChi}
          name={'chungChi'}
          control={control}
          error={errors?.chungChi?.message}
        />
        <DatePickerForm
          defaultValue={defaultData?.ngayCap}
          label="Ngày cấp"
          error={errors?.ngayCap?.message}
          mode="date"
          name={'ngayCap'}
          control={control}
        />
        <UploadFileForm
          name={'fileDinhKemKetQua'}
          arrayFile={
            defaultData?.fileDinhKemKetQua
              ? [{ url: defaultData?.fileDinhKemKetQua }]
              : []
          }
          singleType
          error={errors?.fileDinhKemKetQua?.message}
          control={control}
          label={translate('hoSoNhanSu:fileDinhKem') + ' kết quả'}
        />
        <UploadFileForm
          name={'fileDinhKemSoQuyetDinh'}
          arrayFile={
            defaultData?.fileDinhKemSoQuyetDinh
              ? [{ url: defaultData?.fileDinhKemSoQuyetDinh }]
              : []
          }
          singleType
          required
          error={errors?.fileDinhKemSoQuyetDinh?.message}
          control={control}
          label={translate('hoSoNhanSu:fileDinhKem') + ' số quyết định'}
        />
        <BaseButtonNB
          isLoading={loadingSubmit}
          isLoadingText={translate('slink:Loading')}
          width={WIDTH(140)}
          title={
            defaultData ? translate('slink:Update') : translate('slink:Add')
          }
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default QuaTrinhDTBDTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
