/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { EKieuDuLieu, popupCancel, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import HTMLInputNBForm from '@components/QuyTrinhDong/component/HTMLInput/HTMLInputNBForm';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  deleteQuaTrinhDaoTaoBoiDuongCaNhan,
  getBangCapChungChi,
  getHinhThucDaoTao,
  getLoaiBoiDuong,
  getQuocGia,
  postQuaTrinhDaoTaoBoiDuongCaNhan,
  uploadDocument,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

const ThemMoiQuaTrinhCuDiDTBD = props => {
  const { account } = useSelector(selectAppConfig);

  const onRefresh = props?.route?.params?.onRefresh;

  const itemData = props?.route?.params?.itemData;
  //   const [infoUserTCNS, setinfoUserTCNS] = useState<any>({});

  const [listLoaiBoiDuong, setListLoaiBoiDuong] = useState<any>([]);

  const [listBangCapChungChi, setListBangCapChungChi] = useState<any>([]);

  const [listHinhThucDaoTao, setListHinhThucDaoTao] = useState<any>([]);

  const [listQuocGia, setListQuocGia] = useState<any>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [loadingSend, setLoadingSend] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const watchValues = watch();

  const isNuocNgoai = watchValues?.noiBoiDuong === 'Nước ngoài';

  useEffect(() => {
    getData();

    initValue();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);

      const resLoaiBoiDuong = await getLoaiBoiDuong();

      resLoaiBoiDuong?.data?.data?.map(i => {
        i.value = i?._id;

        i.label = i?.ten;
      });

      const resBangCapChungChi = await getBangCapChungChi();

      resBangCapChungChi?.data?.data?.map(i => {
        i.value = i?._id;

        i.label = i?.ten;
      });

      const resHinhThucDaoTao = await getHinhThucDaoTao();

      resHinhThucDaoTao?.data?.map(i => {
        i.value = i?._id;

        i.label = i?.ten;
      });

      const resQuocGia: any = await getQuocGia();

      resQuocGia?.data?.data?.map(
        (i: { value: any; _id: any; label: any; tenQuocTich: any }) => {
          i.value = i?._id;

          i.label = i?.tenQuocTich;
        },
      );

      setListLoaiBoiDuong(resLoaiBoiDuong?.data?.data);

      setListBangCapChungChi(resBangCapChungChi?.data?.data);

      setListHinhThucDaoTao(resHinhThucDaoTao?.data);

      setListQuocGia(resQuocGia?.data?.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const initValue = async () => {
    try {
      setLoading(true);

      setValue('hoTen', account?.hoTen);

      setValue('donVi', account?.donViChinh?.ten);

      setValue('donViViTri', account?.donViViTri?.tenChucVu);

      setValue('noiBoiDuong', itemData?.noiBoiDuong ?? 'Trong nước');

      setValue('chungChi', itemData?.chungChi ?? null);

      setValue('denNgay', itemData?.chungChi ?? null);

      setValue('diaDiemToChuc', itemData?.diaDiemToChuc ?? null);

      setValue('donViToChuc', itemData?.donViToChuc ?? null);

      setValue('fileDinhKemKetQua', itemData?.fileDinhKemKetQua ?? null);

      setValue(
        'fileDinhKemSoQuyetDinh',
        itemData?.fileDinhKemSoQuyetDinh ?? null,
      );

      setValue('giaHanDenNgay', itemData?.giaHanDenNgay ?? null);

      setValue('hinhThucDaoTaoId', itemData?.hinhThucDaoTaoId ?? null);

      setValue('khoaBoiDuongTapHuan', itemData?.khoaBoiDuongTapHuan ?? null);

      setValue('loaiBoiDuong', itemData?.loaiBoiDuongId ?? null);

      setValue('ngayCap', itemData?.ngayCap ?? null);

      setValue('ngayQuyetDinh', itemData?.ngayQuyetDinh ?? null);

      setValue('nguonKinhPhi', itemData?.nguonKinhPhi ?? null);

      setValue('quocGia', itemData?.quocGiaBoiDuongId ?? null);

      setValue('soQuyetDinh', itemData?.soQuyetDinh ?? null);

      setValue('tuNgay', itemData?.tuNgay ?? null);

      setValue('tenBangCapChungChi', itemData?.bangCapChungChiId ?? null);

      setValue('canCu', itemData?.canCu ?? null);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    const quocGia = listQuocGia?.filter(i => i?._id === data?.quocGia)?.[0];

    try {
      setLoadingSend(true);

      let resUploadSoQuyetDinh: any;
      if (
        data?.fileDinhKemSoQuyetDinh?.length &&
        data?.fileDinhKemSoQuyetDinh?.length !== 0
      ) {
        if (data?.fileDinhKemSoQuyetDinh?.[0]?.type) {
          resUploadSoQuyetDinh = await uploadDocument(
            data?.fileDinhKemSoQuyetDinh,
          );
        } else {
          resUploadSoQuyetDinh = data?.fileDinhKemSoQuyetDinh;
        }
      }

      let resUploadKetQua: any;
      if (
        data?.fileDinhKemKetQua?.length &&
        data?.fileDinhKemKetQua?.length !== 0
      ) {
        if (data?.fileDinhKemKetQua?.[0]?.type) {
          resUploadKetQua = await uploadDocument(data?.fileDinhKemKetQua);
        } else {
          resUploadKetQua = data?.fileDinhKemKetQua;
        }
      }

      const body = {
        chungChi: data?.chungChi,
        diaDiemToChuc: data?.diaDiemToChuc,
        donViToChuc: data?.donViToChuc,
        fileDinhKemKetQua: resUploadKetQua?.[0]?.url ?? '',
        fileDinhKemSoQuyetDinh: resUploadSoQuyetDinh?.[0]?.url ?? '',
        hinhThucDaoTaoId: data?.hinhThucDaoTaoId,
        hoTen: data?.hoTen,
        isCaNhan: true,
        khoaBoiDuongTapHuan: data?.khoaBoiDuongTapHuan,
        kinhPhi: Number(data?.kinhPhi),
        loaiBoiDuong: listLoaiBoiDuong?.find(i => i._id === data?.loaiBoiDuong),
        loaiBoiDuongId: data?.loaiBoiDuong,
        ngayCap: data?.ngayCap ? new Date(data?.ngayCap)?.toISOString() : null,
        ngayQuyetDinh: data?.ngayQuyetDinh
          ? new Date(data?.ngayQuyetDinh)?.toISOString()
          : null,
        giaHanDenNgay: data?.giaHanDenNgay
          ? new Date(data?.giaHanDenNgay)?.toISOString()
          : null,
        tuNgay: data?.tuNgay ? new Date(data?.tuNgay)?.toISOString() : null,
        denNgay: data?.denNgay ? new Date(data?.denNgay)?.toISOString() : null,
        nguonKinhPhi: data?.nguonKinhPhi,
        noiBoiDuong: data?.noiBoiDuong,
        soQuyetDinh: data?.soQuyetDinh,
        maQuocTich: isNuocNgoai ? quocGia?.ma : '',
        tenQuocTich: isNuocNgoai ? quocGia?.tenQuocTich : '',
        quocGiaBoiDuongId: isNuocNgoai ? quocGia?._id : '',
        thongTinNhanSu: account,
        tenBangCapChungChi: listBangCapChungChi?.find(
          i => i._id === data?.tenBangCapChungChi,
        )?.ten,
        bangCapChungChiId: data?.tenBangCapChungChi,
        canCu: data?.canCu,
      };

      let res;
      if (itemData) {
        res = await postQuaTrinhDaoTaoBoiDuongCaNhan(body);

        // res = await putQuaTrinhDaoTaoBoiDuongCaNhan(body, itemData?._id);
      } else {
        res = await postQuaTrinhDaoTaoBoiDuongCaNhan(body);
      }

      if (res?.data?.success) {
        onRefresh && onRefresh();

        setTimeout(goBack, 500);
      }

      setLoadingSend(false);
    } catch (error) {
      setLoadingSend(false);
    }
  };

  if (loading) {
    return (
      <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
        <HeaderReal title={translate('slink:Add')} />
        <LoadingComponent loading />
      </Box>
    );
  }

  const onDelete = () => {
    popupCancel(
      translate('slink:Notice_t'),
      'Bạn có chắc chắn muốn xóa quá trình cử đi đào tạo, bồi dưỡng này?',
      () => {
        deletedDon();
      },
    );
  };

  const deletedDon = async () => {
    try {
      setLoading(true);

      const res = await deleteQuaTrinhDaoTaoBoiDuongCaNhan(itemData?._id);

      setLoading(false);

      if (res?.status) {
        onRefresh && onRefresh();

        setTimeout(goBack, 500);
      }
    } catch (error) {}
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={itemData ? 'Chỉnh sửa' : translate('slink:Add')}
        childrenRight={itemData ? <ChildrenRight onPress={onDelete} /> : <></>}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <InputNBForm
          label={translate('slink:Fullname')}
          name={'hoTen'}
          error={errors?.hoTen?.message}
          defaultValue={account?.hoTen}
          control={control}
          required
          isDisabled
        />
        <InputNBForm
          label={translate('slink:Unit')}
          name={'donVi'}
          error={errors?.donVi?.message}
          defaultValue={account?.donViChinh?.ten}
          control={control}
          isDisabled
        />
        <InputNBForm
          label={'Vị trí việc làm'}
          name={'donViViTri'}
          error={errors?.donViViTri?.message}
          defaultValue={account?.donViViTri?.tenChucVu}
          control={control}
          isDisabled
        />
        <SingleSelectForm
          label={translate('hoSoNhanSu:loaiBoiDuong')}
          data={listLoaiBoiDuong}
          placeholder={`Chọn ${translate(
            'hoSoNhanSu:loaiBoiDuong',
          ).toLowerCase()}`}
          name={'loaiBoiDuong'}
          control={control}
          error={errors?.loaiBoiDuong?.message}
          required
          defaultValue={itemData?.loaiBoiDuongId ?? null}
        />
        <SingleSelectForm
          label={translate('hoSoNhanSu:bangCapChungChi')}
          data={listBangCapChungChi}
          placeholder={`Chọn ${translate(
            'hoSoNhanSu:bangCapChungChi',
          ).toLowerCase()}`}
          name={'tenBangCapChungChi'}
          control={control}
          error={errors?.tenBangCapChungChi?.message}
          required
          defaultValue={itemData?.bangCapChungChiId ?? null}
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
          defaultValue={itemData?.noiBoiDuong ?? 'Trong nước'}
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
            name={'quocGia'}
            control={control}
            error={errors?.quocGia?.message}
            defaultValue={itemData?.quocGiaBoiDuongId ?? null}
          />
        )}
        <SingleSelectForm
          label={translate('hoSoNhanSu:hinhThucDaoTao')}
          data={listHinhThucDaoTao}
          placeholder={`Chọn ${translate(
            'hoSoNhanSu:hinhThucDaoTao',
          ).toLowerCase()}`}
          name={'hinhThucDaoTaoId'}
          control={control}
          error={errors?.hinhThucDaoTaoId?.message}
          defaultValue={itemData?.hinhThucDaoTaoId ?? null}
          required
        />
        <InputNBForm
          label={translate('hoSoNhanSu:donViToChuc')}
          name={'donViToChuc'}
          error={errors?.donViToChuc?.message}
          placeholder={`Nhập ${translate(
            'hoSoNhanSu:donViToChuc',
          ).toLowerCase()}`}
          control={control}
          defaultValue={itemData?.donViToChuc ?? null}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:diaDiemToChuc')}
          name={'diaDiemToChuc'}
          error={errors?.diaDiemToChuc?.message}
          placeholder={`Nhập ${translate(
            'hoSoNhanSu:diaDiemToChuc',
          ).toLowerCase()}`}
          control={control}
          defaultValue={itemData?.diaDiemToChuc ?? null}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:chuDeDaoTaoBoiDuong')}
          name={'khoaBoiDuongTapHuan'}
          error={errors?.khoaBoiDuongTapHuan?.message}
          placeholder={`Nhập ${translate(
            'hoSoNhanSu:chuDeDaoTaoBoiDuong',
          ).toLowerCase()}`}
          control={control}
          textArea
          defaultValue={itemData?.khoaBoiDuongTapHuan ?? null}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:soQuyetDinh')}
          name={'soQuyetDinh'}
          error={errors?.soQuyetDinh?.message}
          placeholder={`Nhập ${translate(
            'hoSoNhanSu:soQuyetDinh',
          ).toLowerCase()}`}
          control={control}
          defaultValue={itemData?.soQuyetDinh ?? null}
        />
        <DatePickerForm
          label={translate('hoSoNhanSu:ngayQuyetDinh')}
          error={errors?.ngayQuyetDinh?.message}
          mode="date"
          name={'ngayQuyetDinh'}
          control={control}
          defaultValue={itemData?.ngayQuyetDinh ?? null}
        />
        <DatePickerForm
          label={'Từ ngày'}
          error={errors?.tuNgay?.message}
          mode="date"
          name={'tuNgay'}
          control={control}
          isRequired
          defaultValue={itemData?.tuNgay ?? null}
        />
        <DatePickerForm
          label={'Đến ngày'}
          error={errors?.denNgay?.message}
          mode="date"
          name={'denNgay'}
          control={control}
          defaultValue={itemData?.denNgay ?? null}
        />
        <DatePickerForm
          label={translate('slink:Extended_to')}
          error={errors?.giaHanDenNgay?.message}
          mode="date"
          name={'giaHanDenNgay'}
          control={control}
          defaultValue={itemData?.giaHanDenNgay ?? null}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:nguonKinhPhi')}
          name={'nguonKinhPhi'}
          error={errors?.nguonKinhPhi?.message}
          placeholder={`Nhập ${translate(
            'hoSoNhanSu:nguonKinhPhi',
          ).toLowerCase()}`}
          control={control}
          defaultValue={itemData?.nguonKinhPhi ?? null}
        />
        <InputNBForm
          label={translate('slink:Expense')}
          name={'kinhPhi'}
          type={EKieuDuLieu.NUMBER}
          error={errors?.kinhPhi?.message}
          placeholder={`Nhập ${translate('slink:Expense').toLowerCase()}`}
          control={control}
          defaultValue={
            itemData?.kinhPhi ? String(itemData?.kinhPhi) : undefined
          }
        />
        <InputNBForm
          label={translate('hoSoNhanSu:chungChi')}
          name={'chungChi'}
          error={errors?.chungChi?.message}
          placeholder={`Nhập ${translate('hoSoNhanSu:chungChi').toLowerCase()}`}
          control={control}
          defaultValue={itemData?.chungChi ?? null}
        />

        <DatePickerForm
          label={translate('hoSoNhanSu:ngayCap')}
          error={errors?.ngayCap?.message}
          mode="date"
          // defaultValue={infoUserTCNS?.ngaySinh}
          name={'ngayCap'}
          control={control}
          defaultValue={itemData?.ngayCap ?? null}
        />
        <HTMLInputNBForm
          label={'Căn cứ'}
          name={'canCu'}
          error={errors?.chungChi?.message}
          placeholder={'Nhập căn cứ'}
          control={control}
          defaultValue={itemData?.canCu ?? null}
        />
        <UploadFileForm
          name={'fileDinhKemKetQua'}
          arrayFile={[]}
          singleType
          error={errors?.fileDinhKemKetQua?.message}
          control={control}
          label={translate('slink:Attach_result')}
          defaultValue={itemData?.fileDinhKemKetQua ?? null}
        />
        <UploadFileForm
          name={'fileDinhKemSoQuyetDinh'}
          arrayFile={[]}
          singleType
          error={errors?.fileDinhKemSoQuyetDinh?.message}
          control={control}
          label={translate('slink:Attach_decision_num')}
          defaultValue={itemData?.fileDinhKemSoQuyetDinh ?? null}
        />
        <BaseButtonNB
          // isLoading={loadingSubmit}
          isLoadingText={translate('slink:Loading')}
          width={WIDTH(140)}
          title={itemData ? 'Chỉnh sửa' : translate('slink:Add')}
          onPress={handleSubmit(onSubmit)}
          isLoading={loadingSend}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default ThemMoiQuaTrinhCuDiDTBD;
const ChildrenRight = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="trash" size={WIDTH(24)} color={'white'} />
    </TouchableOpacity>
  );
};
