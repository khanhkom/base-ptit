/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import BaseButtonNB from '@components/BaseButtonNB';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  delKhenThuong,
  getCapKhenThuong,
  getHinhThucKhenThuong,
  getLoaiKhenThuong,
  getPhuongThuocKhenThuong,
  getQuyetDinhKhenThuong,
  postKhenThuong,
  putKhenThuong,
  uploadDocument,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { Box, Checkbox, Text } from 'native-base';

import BtnXoa from '../../BtnXoa/BtnXoa';

interface QuyetDinhKhenThuongProps {
  noiDung: string;
  soQuyetDinh: string;
  coQuanQuyetDinh: string;
  nguoiKy: string;
  ngayQuyetDinh: Date;
  ngayKy: Date;
  fileDinhKem: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
interface CapKhenThuongProps {
  _id: string;
  ma: string;
  ten: string;
  soThuTu: null;
  moTa: string;
  suDung: null;
  maCapKhenThuongHemis: null;
  createdAt: Date;
  updatedAt: Date;
  capKhenThuongHemis: null;
}
interface LoaiKhenThuongProps {
  _id: string;
  ma: string;
  ten: string;
  soThuTu: null;
  moTa: null;
  suDung: null;
  createdAt: Date;
  updatedAt: Date;
  maLoaiKhenThuongHemis: null;
  loaiKhenThuongHemis: null;
}
interface HinhThucKhenThuongProps {
  _id: string;
  ma: string;
  ten: string;
  soThuTu: null;
  thoiGianDieuChinh: Date;
  anhHuongThoiGianKhenThuong: boolean;
  moTa: string;
  suDung: null;
  loaiKhenThuongId: string;
  maHinhThucKhenThuongHemis: null;
  anhHuongThoiGianEnum: string;
  createdAt: Date;
  updatedAt: Date;
  loaiKhenThuong: {
    ma: string;
    ten: string;
  };
  hinhThucKhenThuongHemis: null;
}

const KhenThuongTable = props => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const { account } = useSelector(selectAppConfig);

  const thongTinNhanSuId = props?.route?.params?.idUser;

  const onRefresh = props?.route?.params?.onRefresh;

  const defaultData = props?.route?.params?.item;

  const watchValues = watch();

  const [loading, setloading] = useState(false);

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const [isMacDinh, setIsMacDinh] = useState(true);

  const [listCapKhenThuong, setlistCapKhenThuong] = useState([]);

  const [listHTKhenThuong, setlistHTKhenThuong] = useState<
    HinhThucKhenThuongProps[]
  >([]);

  const [listQDKhenThuong, setlistQDKhenThuong] = useState<
    QuyetDinhKhenThuongProps[]
  >([]);

  const [listLoaiKhenThuong, setlistLoaiKhenThuong] = useState([]);

  const [listPTKhenThuong, setlistPTKhenThuong] = useState([]);

  useEffect(() => {
    getData();

    if (defaultData) {
      initData();
    }
  }, []);

  const initData = () => {
    setValue('soQuyetDinh', defaultData?.soQuyetDinh);

    setValue('coQuanQuyetDinh', defaultData?.coQuanQuyetDinh);

    setValue('ngayQuyetDinh', defaultData?.ngayQuyetDinh);

    setValue('nguoiKy', defaultData?.nguoiKy);

    setValue('ngayKy', defaultData?.ngayKy);

    setValue('capKhenThuongId', defaultData?.capKhenThuongId);

    setValue('hinhThucKhenThuongId', defaultData?.hinhThucKhenThuongId);

    setValue('loaiKhenThuongId', defaultData?.loaiKhenThuongId);

    setValue('phuongThucKhenThuongId', defaultData?.phuongThucKhenThuongId);

    setValue('noiDung', defaultData?.noiDung);

    setValue('urlFileBangKhen', [{ url: defaultData?.urlFileBangKhen }]);

    setValue('urlFileCacTaiLieuKhac', [
      { url: defaultData?.urlFileCacTaiLieuKhac },
    ]);

    setValue('urlFileHoSoDeXuat', [{ url: defaultData?.urlFileHoSoDeXuat }]);

    setValue('urlFileQuyetDinh', [{ url: defaultData?.urlFileQuyetDinh }]);
  };

  const getData = async () => {
    setloading(true);

    const responseQuyetDinh = await getQuyetDinhKhenThuong();

    const responseCapKhenThuong = await getCapKhenThuong();

    if (
      responseQuyetDinh?.data?.data?.filter(
        item => item?.soQuyetDinh === defaultData?.soQuyetDinh,
      )?.length === 0 &&
      responseQuyetDinh?.data?.data?.length > 0 &&
      defaultData?.soQuyetDinh
    ) {
      setIsMacDinh(false);
    }

    setlistQDKhenThuong(responseQuyetDinh?.data?.data || []);

    setlistCapKhenThuong(
      responseCapKhenThuong?.data?.data.map((item: CapKhenThuongProps) => {
        return {
          label: item?.ten ?? '',
          value: item?._id ?? '',
        };
      }) ?? [],
    );

    const responseLoaiKhenThuong = await getLoaiKhenThuong();

    const responsePTKhenThuong = await getPhuongThuocKhenThuong();

    setlistPTKhenThuong(
      responsePTKhenThuong?.data?.data?.map((item: any) => {
        return {
          label: item?.ten ?? '',
          value: item?._id ?? '',
        };
      }) ?? [],
    );

    setlistLoaiKhenThuong(
      responseLoaiKhenThuong?.data?.data?.map((item: LoaiKhenThuongProps) => {
        return {
          label: item?.ten ?? '',
          value: item?._id ?? '',
        };
      }) ?? [],
    );

    setloading(false);
  };

  useEffect(() => {
    if (watchValues?.loaiKhenThuongId) {
      getHTKT();
    } else {
      setlistHTKhenThuong([]);
    }
  }, [watchValues?.loaiKhenThuongId]);

  const getHTKT = async () => {
    const bodyHinhThuc = {
      condition: {
        loaiKhenThuongId: watchValues?.loaiKhenThuongId,
      },
    };

    const responseAPI = await getHinhThucKhenThuong(bodyHinhThuc);

    setlistHTKhenThuong(responseAPI?.data?.data || []);
  };

  const onSubmit = async (data: any) => {
    setloadingSubmit(true);

    let resupload: any;
    if (data?.urlFileBangKhen?.length !== 0) {
      if (data?.urlFileBangKhen?.[0]?.type) {
        resupload = await uploadDocument(data?.urlFileBangKhen);
      } else {
        resupload = data?.urlFileBangKhen;
      }
    }

    let resuploadCacTaiLieuKhac: any;
    if (data?.urlFileCacTaiLieuKhac?.length !== 0) {
      if (data?.urlFileCacTaiLieuKhac?.[0]?.type) {
        resuploadCacTaiLieuKhac = await uploadDocument(
          data?.urlFileCacTaiLieuKhac,
        );
      } else {
        resuploadCacTaiLieuKhac = data?.urlFileCacTaiLieuKhac;
      }
    }

    let resuploadHoSoDeXuat: any;
    if (data?.urlFileHoSoDeXuat?.length !== 0) {
      if (data?.urlFileHoSoDeXuat?.[0]?.type) {
        resuploadHoSoDeXuat = await uploadDocument(data?.urlFileHoSoDeXuat);
      } else {
        resuploadHoSoDeXuat = data?.urlFileHoSoDeXuat;
      }
    }

    let resuploadQuyetDinh: any;
    if (data?.urlFileQuyetDinh?.length !== 0) {
      if (data?.urlFileQuyetDinh?.[0]?.type) {
        resuploadQuyetDinh = await uploadDocument(data?.urlFileQuyetDinh);
      } else {
        resuploadQuyetDinh = data?.urlFileQuyetDinh;
      }
    }

    const body = {
      anhHuongThoiGianKhenThuong:
        typeof isAnhHuong === 'boolean' ? isAnhHuong : null,
      capKhenThuongId: data?.capKhenThuongId,
      coQuanQuyetDinh: data?.coQuanQuyetDinh || null,
      hinhThucKhenThuongId: data?.hinhThucKhenThuongId,
      daXetDieuChinhTangLuong:
        typeof isAnhHuong === 'boolean' && isAnhHuong === true ? true : null,
      idQuyetDinhKhenThuong: objectQDKT?._id || null,
      loaiKhenThuongId: data?.loaiKhenThuongId,
      ...(data?.ngayKy && { ngayKy: data?.ngayKy }),
      ...(data?.ngayQuyetDinh && {
        ngayQuyetDinh: new Date(data?.ngayQuyetDinh).toISOString(),
      }),
      nguoiKy: data?.nguoiKy || null,
      noiDung: data?.noiDung || null,
      phuongThucKhenThuongId: data?.phuongThucKhenThuongId,
      soQuyetDinh: data?.soQuyetDinh,
      ssoId: account?.ssoId || '',
      thongTinNhanSuId,
      ...(resupload?.[0]?.url && { urlFileBangKhen: resupload?.[0]?.url }),
      ...(resuploadQuyetDinh?.[0]?.url && {
        urlFileQuyetDinh: resuploadQuyetDinh?.[0]?.url,
      }),
      ...(resuploadHoSoDeXuat?.[0]?.url && {
        urlFileHoSoDeXuat: resuploadHoSoDeXuat?.[0]?.url,
      }),
      ...(resuploadCacTaiLieuKhac?.[0]?.url && {
        urlFileCacTaiLieuKhac: resuploadCacTaiLieuKhac?.[0]?.url,
      }),
    };

    let res: any;
    if (defaultData?._id) {
      res = await putKhenThuong(body, defaultData?._id);
    } else {
      res = await postKhenThuong(body);
    }

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  const objectHTKT = listHTKhenThuong?.find(
    item => item?._id === watchValues?.hinhThucKhenThuongId,
  );

  const isAnhHuong = objectHTKT?.anhHuongThoiGianKhenThuong;

  const objectQDKT = listQDKhenThuong?.find(
    item => item?.soQuyetDinh === watchValues?.soQuyetDinh,
  );

  useEffect(() => {
    if (typeof objectQDKT === 'object') {
      setValue('coQuanQuyetDinh', objectQDKT?.coQuanQuyetDinh);

      setValue('ngayQuyetDinh', objectQDKT?.ngayQuyetDinh);

      setValue('nguoiKy', objectQDKT?.nguoiKy);

      setValue('ngayKy', objectQDKT?.ngayKy);
    }
  }, [objectQDKT]);

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delKhenThuong(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  if (loading) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal title="Khen thưởng" />
        <Box flex={1}>
          <LoadingComponent />
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title="Khen thưởng"
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <Checkbox
          my="2"
          isChecked={isMacDinh}
          value={translate('hoSoNhanSu:Da_co_so_QD')}
          onChange={() => setIsMacDinh(!isMacDinh)}>
          <Text maxWidth={WIDTH(343)} fontSize={'xs'}>
            {translate('hoSoNhanSu:Da_co_so_QD')}
          </Text>
        </Checkbox>
        {isMacDinh ? (
          <SingleSelectForm
            defaultValue={defaultData?.soQuyetDinh}
            label={translate('hoSoNhanSu:soQuyetDinh')}
            data={listQDKhenThuong?.map(item => {
              return { label: item?.soQuyetDinh, value: item?.soQuyetDinh };
            })}
            name={'soQuyetDinh'}
            control={control}
            error={errors?.soQuyetDinh?.message}
            required
          />
        ) : (
          <InputNBForm
            required
            label={translate('hoSoNhanSu:soQuyetDinh')}
            name={'soQuyetDinh'}
            defaultValue={defaultData?.soQuyetDinh}
            control={control}
            error={errors?.coQuanQuyetDinh?.message}
          />
        )}

        <InputNBForm
          isDisabled={!!objectQDKT}
          label={translate('hoSoNhanSu:coQuanQuyetDinh')}
          name={'coQuanQuyetDinh'}
          defaultValue={objectQDKT?.coQuanQuyetDinh}
          control={control}
          error={errors?.coQuanQuyetDinh?.message}
        />
        <DatePickerForm
          isDisabled={!!objectQDKT}
          label={translate('hoSoNhanSu:ngayQuyetDinh')}
          mode="date"
          isRequired
          error={errors?.ngayQuyetDinh?.message}
          defaultValue={objectQDKT?.ngayQuyetDinh || undefined}
          name={'ngayQuyetDinh'}
          control={control}
        />
        <InputNBForm
          isDisabled={!!objectQDKT}
          label={translate('hoSoNhanSu:nguoiKy')}
          name={'nguoiKy'}
          defaultValue={objectQDKT?.nguoiKy}
          control={control}
          error={errors?.nguoiKy?.message}
        />
        <DatePickerForm
          isDisabled={!!objectQDKT}
          mode="date"
          label={translate('hoSoNhanSu:ngayKy')}
          error={errors?.ngayKy?.message}
          defaultValue={objectQDKT?.ngayKy || undefined}
          name={'ngayKy'}
          control={control}
        />
        <SingleSelectForm
          label={translate('hoSoNhanSu:capKhenThuong')}
          defaultValue={defaultData?.capKhenThuongId}
          data={listCapKhenThuong}
          name={'capKhenThuongId'}
          control={control}
          error={errors?.capKhenThuongId?.message}
          required
        />
        <SingleSelectForm
          label={translate('hoSoNhanSu:loaiKhenThuong')}
          data={listLoaiKhenThuong}
          defaultValue={defaultData?.loaiKhenThuongId}
          name={'loaiKhenThuongId'}
          control={control}
          error={errors?.loaiKhenThuongId?.message}
          required
        />
        <SingleSelectForm
          label={translate('hoSoNhanSu:phuongThucKhenThuong')}
          defaultValue={defaultData?.phuongThucKhenThuongId}
          data={listPTKhenThuong}
          name={'phuongThucKhenThuongId'}
          control={control}
          error={errors?.phuongThucKhenThuongId?.message}
          required
        />
        <SingleSelectForm
          label={translate('hoSoNhanSu:hinhThucKhenThuong')}
          data={
            listHTKhenThuong?.map(item => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) || []
          }
          isDisabled={!watchValues?.loaiKhenThuongId}
          defaultValue={defaultData?.hinhThucKhenThuongId}
          name={'hinhThucKhenThuongId'}
          control={control}
          error={errors?.hinhThucKhenThuongId?.message}
          required
        />
        <Checkbox
          isDisabled
          my="2"
          isChecked={isAnhHuong}
          value={translate('hoSoNhanSu:anhHuongThoiGianKhenThuong')}>
          <Text maxWidth={WIDTH(343)} fontSize={'xs'}>
            {translate('hoSoNhanSu:anhHuongThoiGianKhenThuong')}
          </Text>
        </Checkbox>
        <InputNBForm
          label={translate('slink:Content')}
          name={'noiDung'}
          defaultValue={defaultData?.noiDung}
          textArea
          control={control}
          error={errors?.noiDung?.message}
        />
        <UploadFileForm
          name={'urlFileQuyetDinh'}
          arrayFile={
            defaultData?.urlFileQuyetDinh
              ? [{ url: defaultData?.urlFileQuyetDinh }]
              : []
          }
          singleType
          error={errors?.urlFileQuyetDinh?.message}
          control={control}
          label={translate('hoSoNhanSu:urlFileQuyetDinh')}
          required
        />
        <UploadFileForm
          name={'urlFileHoSoDeXuat'}
          arrayFile={
            defaultData?.urlFileHoSoDeXuat
              ? [{ url: defaultData?.urlFileHoSoDeXuat }]
              : []
          }
          singleType
          error={errors?.urlFileHoSoDeXuat?.message}
          control={control}
          label={translate('hoSoNhanSu:urlFileHoSoDeXuat')}
          required
        />
        <UploadFileForm
          name={'urlFileBangKhen'}
          arrayFile={
            defaultData?.urlFileBangKhen
              ? [{ url: defaultData?.urlFileBangKhen }]
              : []
          }
          singleType
          error={errors?.urlFileBangKhen?.message}
          control={control}
          label={translate('hoSoNhanSu:urlFileBangKhen')}
          required
        />
        <UploadFileForm
          name={'urlFileCacTaiLieuKhac'}
          arrayFile={
            defaultData?.urlFileCacTaiLieuKhac
              ? [{ url: defaultData?.urlFileCacTaiLieuKhac }]
              : []
          }
          singleType
          error={errors?.urlFileCacTaiLieuKhac?.message}
          control={control}
          label={translate('hoSoNhanSu:urlFileCacTaiLieuKhac')}
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

export default KhenThuongTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
