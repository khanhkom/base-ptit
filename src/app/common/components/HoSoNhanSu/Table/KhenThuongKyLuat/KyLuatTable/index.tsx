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
import MultiChoiceForm from '@components/QuyTrinhDong/component/MultiChoices/MultiChoiceForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import { EKieuDuLieu } from '@config/constant';
import { HEIGHT, WIDTH } from '@config/function';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  delKyLuat,
  getCapKyLuat,
  getHinhThucKyLuat,
  postKyLuat,
  putKyLuat,
  uploadDocument,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { Box, Checkbox, Text } from 'native-base';

import BtnXoa from '../../BtnXoa/BtnXoa';

const TEXT_ANH_HUONG = 'Ảnh hưởng đến thời gian điều chỉnh lương';

const KyLuatTable = props => {
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

  const [listCapKyLuat, setlistCapKyLuat] = useState([]);

  const [listHTKyLuat, setlistHTKyLuat] = useState<any[]>([]);

  useEffect(() => {
    getData();

    if (defaultData) {
      initData();
    }
  }, []);

  const initData = () => {
    setValue('soQuyetDinh', defaultData?.soQuyetDinh);

    setValue('coQuanQuyetDinh', defaultData?.coQuanQuyetDinh);

    setValue('capKyLuatId', defaultData?.capKyLuatId);

    setValue('ngayQuyetDinh', defaultData?.ngayQuyetDinh);

    setValue('nguoiKy', defaultData?.nguoiKy);

    setValue('ngayKy', defaultData?.ngayKy);

    setValue('hinhThucKyLuatId', defaultData?.hinhThucKyLuatId);

    setValue('noiDung', defaultData?.noiDung);

    setValue(
      'anhHuongThoiGianKyLuat',
      defaultData?.hinhThucKyLuat?.anhHuongThoiGianKyLuat
        ? [TEXT_ANH_HUONG]
        : [],
    );

    setValue(
      'thoiGianDieuChinh',
      String(defaultData?.hinhThucKyLuat?.thoiGianDieuChinh),
    );
  };

  const getData = async () => {
    setloading(true);

    const responseCapKhenThuong = await getCapKyLuat();

    setlistCapKyLuat(
      responseCapKhenThuong?.data?.data.map(item => {
        return {
          label: item?.ten ?? '',
          value: item?._id ?? '',
        };
      }) ?? [],
    );

    setloading(false);
  };

  useEffect(() => {
    if (watchValues?.capKyLuatId) {
      getHTKT();
    } else {
      setlistHTKyLuat([]);
    }
  }, [watchValues?.capKyLuatId]);

  const getHTKT = async () => {
    const bodyHinhThuc = {
      condition: {
        capKyLuatId: watchValues?.capKyLuatId,
      },
    };

    const responseAPI = await getHinhThucKyLuat(bodyHinhThuc);

    setlistHTKyLuat(responseAPI?.data?.data || []);
  };

  const onSubmit = async (data: any) => {
    setloadingSubmit(true);

    let resupload: any;
    if (data?.urlFileUpload?.length !== 0) {
      if (data?.urlFileUpload?.[0]?.type) {
        resupload = await uploadDocument(data?.urlFileUpload);
      } else {
        resupload = data?.urlFileUpload;
      }
    }

    const body = {
      anhHuongThoiGianKyLuat:
        data?.anhHuongThoiGianKyLuat === undefined ||
        data?.anhHuongThoiGianKyLuat?.length === 0
          ? false
          : true,
      capKyLuatId: data?.capKyLuatId ?? '',
      coQuanQuyetDinh: data?.coQuanQuyetDinh || null,
      hinhThucKyLuatId: data?.hinhThucKyLuatId,
      daXetDieuChinhTangLuong:
        typeof isAnhHuong === 'boolean' && isAnhHuong === true ? true : null,
      ...(data?.ngayKy && { ngayKy: data?.ngayKy }),
      ngayQuyetDinh: data?.ngayQuyetDinh,
      nguoiKy: data?.nguoiKy || null,
      noiDung: data?.noiDung || null,
      ...(data?.thoiGianDieuChinh && {
        thoiGianDieuChinh: Number(data?.thoiGianDieuChinh),
      }),
      soQuyetDinh: data?.soQuyetDinh,
      ssoId: account?.ssoId || '',
      thongTinNhanSuId,
      ...(resupload?.[0]?.url && { urlFileUpload: resupload?.[0]?.url }),
    };

    let res: any;
    if (defaultData?._id) {
      res = await putKyLuat(body, defaultData?._id);
    } else {
      res = await postKyLuat(body);
    }

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  const objectHTKT = listHTKyLuat?.find(
    item => item?._id === watchValues?.hinhThucKhenThuongId,
  );

  const isAnhHuong = objectHTKT?.anhHuongThoiGianKyLuat;

  const onDel = async () => {
    setloadingSubmit(true);

    const res = await delKyLuat(defaultData?._id);

    setloadingSubmit(false);

    if (res?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  if (loading) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal title="Kỷ Luật" />
        <Box flex={1}>
          <LoadingComponent />
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title="Kỷ Luật"
        childrenRight={defaultData && <BtnXoa onPress={onDel} />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <InputNBForm
          label="Số quyết định"
          required
          defaultValue={defaultData?.soQuyetDinh}
          name={'soQuyetDinh'}
          control={control}
          error={errors?.soQuyetDinh?.message}
        />
        <DatePickerForm
          label={translate('slink:Decision_date')}
          defaultValue={defaultData?.ngayQuyetDinh}
          isRequired
          error={errors?.ngayQuyetDinh?.message}
          mode="date"
          name={'ngayQuyetDinh'}
          control={control}
        />
        <DatePickerForm
          defaultValue={defaultData?.ngayKy}
          label="Ngày ký"
          error={errors?.ngayKy?.message}
          mode="date"
          name={'ngayKy'}
          control={control}
        />
        <InputNBForm
          label="Cơ quan quyết định"
          name={'coQuanQuyetDinh'}
          defaultValue={defaultData?.coQuanQuyetDinh}
          control={control}
          error={errors?.coQuanQuyetDinh?.message}
        />
        <InputNBForm
          label="Người ký"
          name={'nguoiKy'}
          defaultValue={defaultData?.nguoiKy}
          control={control}
          error={errors?.nguoiKy?.message}
        />
        <SingleSelectForm
          label="Cấp kỷ luật"
          defaultValue={defaultData?.capKyLuatId}
          data={listCapKyLuat}
          name={'capKyLuatId'}
          control={control}
          error={errors?.capKyLuatId?.message}
          required
        />
        <SingleSelectForm
          label="Hình thức kỷ luật"
          data={
            listHTKyLuat?.map(item => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) || []
          }
          isDisabled={!watchValues?.capKyLuatId}
          defaultValue={defaultData?.hinhThucKyLuatId}
          name={'hinhThucKyLuatId'}
          control={control}
          error={errors?.hinhThucKyLuatId?.message}
          required
        />
        <MultiChoiceForm
          name={'anhHuongThoiGianKyLuat'}
          error={errors?.anhHuongThoiGianKyLuat?.message}
          defaultValue={
            defaultData?.hinhThucKyLuat?.anhHuongThoiGianKyLuat
              ? [TEXT_ANH_HUONG]
              : []
          }
          control={control}
          data={[
            {
              label: TEXT_ANH_HUONG,
              value: TEXT_ANH_HUONG,
            },
          ]}
        />
        {watchValues?.anhHuongThoiGianKyLuat?.includes(TEXT_ANH_HUONG) && (
          <>
            <InputNBForm
              label="Thời gian điều chỉnh lương trước thời hạn (Tháng)"
              name={'thoiGianDieuChinh'}
              // textArea
              defaultValue={String(
                defaultData?.hinhThucKyLuat?.thoiGianDieuChinh,
              )}
              control={control}
              error={errors?.thoiGianDieuChinh?.message}
              type={EKieuDuLieu.NUMBER}
            />
            <Checkbox
              isDisabled
              my="2"
              isChecked={true}
              value="Đã xét điều chỉnh lưởng">
              <Text maxWidth={WIDTH(343)} fontSize={'xs'}>
                Đã xét điều chỉnh lưởng
              </Text>
            </Checkbox>
          </>
        )}
        <InputNBForm
          label={translate('slink:Content')}
          name={'noiDung'}
          defaultValue={defaultData?.noiDung}
          textArea
          control={control}
          error={errors?.noiDung?.message}
        />
        <UploadFileForm
          name={'urlFileUpload'}
          arrayFile={
            defaultData?.urlFileUpload
              ? [{ url: defaultData?.urlFileUpload }]
              : []
          }
          singleType
          error={errors?.urlFileUpload?.message}
          control={control}
          label={translate('hoSoNhanSu:fileDinhKem')}
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

export default KyLuatTable;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: WIDTH(12),
    paddingTop: HEIGHT(24),
    paddingBottom: HEIGHT(30),
  },
});
