/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-inline-comments */
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { DVMC_TYPE } from '@common';
import TempScreen from '@components/EditHTML';
import { useErrorMessageTranslation } from '@hooks';
import { HelperText } from '@libcomponents/helper-text';
import {
  donViNhanSu,
  donViViTri,
  dotTuyenDung,
  getBacLuong,
  getCapKhenThuong,
  getCapKyLuat,
  getCapSangKien,
  getDanToc,
  getDotKhaiBao,
  getDSChucDanh,
  getDSTrinhDoLyLuan,
  getDSTrinhDoQuanLyHC,
  getDSTrinhDoQuanLyNN,
  getHinhThucDaoTao,
  getHinhThucKhenThuong,
  getHinhThucKyLuat,
  getKyHocSinhVien,
  getListTinHoc,
  getLoaiBoiDuong,
  getLoaiKhenThuong,
  getLoaiPhuCap,
  getLoaiSangKien,
  getMyCourse,
  getMyCredit,
  getMyYear,
  getNganh,
  getPhuongThuocKhenThuong,
  getQuocGia,
  getTinhTrangHonNhan,
  getTonGiao,
  getTrinhDoDTNS,
  hinhThucTuyenDung,
  loaiHopDong,
  ngachLuong,
} from '@networking/user';

import CheckBoxDynamicForm from './component/CheckBox';
import DatePickerV2 from './component/DatePickerV2';
import DonViHanhChinh from './component/DonViHanhChinh';
import DonViViTriChucDanh from './component/DonViViTri';
import DropdownV2 from './component/DropDownV2';
import { TextInputV2 } from './component/InputV2';
import MonthYear from './component/MonthYear';
import NhanSuDynamicForm from './component/NhanSu';
import RadioButtonDynamicForm from './component/RadioButton';
import Table from './component/Table';
import TableLyLich from './component/TableLyLich';
import TableMinhChung from './component/TableMinhChung';
import TableNhanSu from './component/TableNhanSu';
import UploadFileV2 from './component/UploadFileV2';
import YearPicker from './component/YearPicker';
import { styles } from './styles';
import { Props } from './type';
import { translate } from '@utils/i18n/translate';

const ItemInput = (props: Props) => {
  const {
    control,
    errors,
    idPhuongThucKhenThuong,
    itemData,
    onChange,
    ref,
    onBlur,
    disabled,
    relatedElement,
    valueChuongSach,
    unregister,
    pickerData,
    dataSourceElement,
    ...rest
  } = props;

  const [pickerDataAPI, setpickerDataAPI] = useState<any>([]);

  useEffect(() => {
    getDataFromAPI();
  }, [itemData]);

  const [heSoLuongCurrent, setheSoLuongCurrent] = useState(
    itemData?.value?.heSo ?? '',
  );

  useEffect(() => {
    itemData?.type === DVMC_TYPE.HINH_THUC_KHEN_THUONG && getHTKT();
  }, [idPhuongThucKhenThuong]);

  const [bacLuongList, setbacLuongList] = useState<any[]>([]);

  const getHTKT = async () => {
    const bodyHinhThuc = idPhuongThucKhenThuong
      ? {
          condition: {
            loaiKhenThuongId: idPhuongThucKhenThuong,
          },
        }
      : {};

    const responseAPI = await getHinhThucKhenThuong(bodyHinhThuc);

    setpickerDataAPI(
      responseAPI?.data?.data?.map((item: any) => {
        return {
          label: item?.ten ?? '',
          value: item?._id ?? '',
        };
      }) ?? [],
    );
  };

  const [loading, setloading] = useState(false);

  const getDataFromAPI = async () => {
    setloading(true);

    try {
      let responseAPI: any;

      switch (itemData?.type) {
        case DVMC_TYPE.MY_SEMESTER:
          responseAPI = await getKyHocSinhVien();

          setpickerDataAPI(
            responseAPI?.data?.data.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?.ma,
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.QUOC_GIA:
          responseAPI = await getQuocGia();

          setpickerDataAPI(
            responseAPI?.data?.data.map((item: any) => {
              return {
                label: item?.tenQuocTich ?? '',
                value: item?._id,
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.HINH_THUC_DAO_TAO:
          responseAPI = await getHinhThucDaoTao();

          setpickerDataAPI(
            responseAPI?.data.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id,
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.TIN_HOC:
          responseAPI = await getListTinHoc();

          setpickerDataAPI(
            responseAPI?.data.map((item: any) => {
              return {
                label: item?.trinhDoTinHoc ?? '',
                value: item?._id,
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.MY_YEAR:
          responseAPI = await getMyYear();

          setpickerDataAPI(
            responseAPI?.data?.data.map((item: any) => {
              const value = `${item.ten}`;

              return {
                label: value,
                value,
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.HINH_THUC_TUYEN_DUNG:
          responseAPI = await hinhThucTuyenDung();

          setpickerDataAPI(
            responseAPI?.data?.data.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.TINH_TRANG_HON_NHAN:
          responseAPI = await getTinhTrangHonNhan();

          setpickerDataAPI(
            responseAPI?.data?.data.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.TRINH_DO_QUAN_LY_HANH_CHINH:
          responseAPI = await getDSTrinhDoQuanLyHC();

          setpickerDataAPI(
            responseAPI?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.LOAI_HOP_DONG:
          responseAPI = await loaiHopDong();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.TRINH_DO_LY_LUAN_CHINH_TRI:
          responseAPI = await getDSTrinhDoLyLuan();

          setpickerDataAPI(
            responseAPI?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.TRINH_DO_QUAN_LY_NHA_NUOC:
          responseAPI = await getDSTrinhDoQuanLyNN();

          setpickerDataAPI(
            responseAPI?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;

        case DVMC_TYPE.TRINH_DO_DAO_TAO:
          responseAPI = await getTrinhDoDTNS();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.LOAI_PHU_CAP:
          responseAPI = await getLoaiPhuCap();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.CAP_KY_LUAT:
          responseAPI = await getCapKyLuat();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.HINH_THUC_KY_LUAT:
          responseAPI = await getHinhThucKyLuat();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.LOAI_BOI_DUONG:
          responseAPI = await getLoaiBoiDuong();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.CAP_KHEN_THUONG:
          responseAPI = await getCapKhenThuong();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.LOAI_KHEN_THUONG:
          responseAPI = await getLoaiKhenThuong();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.PHUONG_THUC_KHEN_THUONG:
          responseAPI = await getPhuongThuocKhenThuong();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.NGANH:
          responseAPI = await getNganh();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?.ma ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.BAC_LUONG:
          responseAPI = await getBacLuong();

          setbacLuongList(responseAPI?.data?.data ?? []);

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return {
                label: item?.bacLuong ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.CHUC_DANH:
          responseAPI = await getDSChucDanh();

          setpickerDataAPI(
            responseAPI?.data?.map((item: any) => {
              return {
                label: item?.ten ?? '',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.DOT_TUYEN_DUNG:
          responseAPI = await dotTuyenDung();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              const label = `${item?.tenDotTuyenDung ?? '--'} (${
                item?.nam ?? '--'
              })`;

              return {
                label,
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.NGACH_LUONG:
          responseAPI = await ngachLuong();

          setpickerDataAPI(
            responseAPI?.data?.data.map((item: any) => {
              return {
                label: item?.ten ?? '--',
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.DON_VI_NHAN_SU:
          responseAPI = await donViNhanSu();

          setpickerDataAPI(
            responseAPI?.data?.data.map((item: any) => {
              const label = `${item?.ten ?? '--'} (${item?.maDonVi ?? '--'})`;

              return {
                label,
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.DON_VI_VI_TRI:
          responseAPI = await donViViTri();

          setpickerDataAPI(
            responseAPI?.data?.data.map((item: any) => {
              const label = `${item?.tenChucVu ?? '--'}`;

              return {
                label,
                value: item?._id ?? '',
              };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.MY_CREDIT:
          responseAPI = await getMyCredit({});

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              const value = `${item.ten_hoc_phan} (${item.ma_hoc_phan_moi})`;

              return { label: value, value };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.MY_COURSE:
          responseAPI = await getMyCourse();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              const value = `${item.ten_hoc_phan} (${item.ma_lop})`;

              return { label: value, value };
            }),
          );

          break;
        case DVMC_TYPE.DOT_KHAI_BAO: {
          responseAPI = await getDotKhaiBao();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              const value = `${item._id ?? ''}`;

              return { label: item?.tenDotKhaiBao ?? '--', value };
            }),
          );

          break;
        }

        case DVMC_TYPE.DAN_TOC:
          responseAPI = await getDanToc();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return { label: item?.tenDanToc, value: item?._id };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.CAP_SANG_KIEN:
          responseAPI = await getCapSangKien();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return { label: item?.ten, value: item?._id };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.LOAI_SANG_KIEN:
          responseAPI = await getLoaiSangKien();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return { label: item?.tenSangKien, value: item?._id };
            }) ?? [],
          );

          break;
        case DVMC_TYPE.TON_GIAO:
          responseAPI = await getTonGiao();

          setpickerDataAPI(
            responseAPI?.data?.data?.map((item: any) => {
              return {
                label: item?.tenTonGiao,
                value: item?._id,
              };
            }),
          );

          break;

        default:
          break;
      }

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const message = useErrorMessageTranslation(errors?.[itemData?._id]?.message);

  const onChangeBacLuong = (value: string) => {
    const objValue = bacLuongList?.filter(item => item?._id === value);

    setheSoLuongCurrent(objValue?.[0]?.heSo);

    onChange && onChange({ bacLuongId: value, heSo: objValue?.[0]?.heSo });
  };

  if (loading) {
    return <></>;
  }

  switch (itemData?.type) {
    case DVMC_TYPE.TEXT_INPUT:
    case DVMC_TYPE.TEXT_AREA:
    case DVMC_TYPE.INPUT_NUMBER:
      return (
        <TextInputV2
          ref={ref}
          editable={!disabled}
          keyboardType={
            itemData?.type === DVMC_TYPE.INPUT_NUMBER ? 'numeric' : 'default'
          }
          multiline={itemData?.type === DVMC_TYPE.TEXT_AREA}
          key={itemData?._id}
          placeholder={!disabled ? translate('slink:Enter_here') : ''}
          required={itemData?.isRequired}
          error={message}
          label={itemData?.label}
          maxLength={itemData?.max || 255}
          onChangeText={onChange}
          onBlur={onBlur}
          {...rest}
        />
      );
    case DVMC_TYPE.DROP_LIST_SINGLE:
    case DVMC_TYPE.DROP_LIST_MULTI:
    case DVMC_TYPE.CHECKLIST:
      return (
        <>
          <DropdownV2
            itemData={itemData}
            required={itemData?.isRequired}
            label={itemData?.label}
            onBlur={onBlur}
            control={control}
            disabled={disabled}
            errors={errors}
            unregister={unregister}
            error={message} //true | false
            onChange={onChange}
            data={pickerData}
            isLast={itemData?.isLast && message === undefined}
            dataSourceElement={dataSourceElement}
            multiple={
              itemData?.type === DVMC_TYPE.DROP_LIST_MULTI ||
              itemData?.type === DVMC_TYPE.CHECKLIST
            }
            multipleText="%d - Đã chọn"
            {...rest}
          />
        </>
      );
    case DVMC_TYPE.RADIO_BUTTON:
      return (
        <>
          <RadioButtonDynamicForm
            itemData={itemData}
            disabled={disabled}
            control={control}
            label={itemData?.label}
            errors={errors}
            error={message}
            required={itemData?.isRequired}
            unregister={unregister}
            onChange={onChange}
            pickerData={pickerData}
            message={message}
            dataSourceElement={dataSourceElement}
            {...rest}
          />
        </>
      );
    case DVMC_TYPE.DATE_TIME_PICKER:
    case DVMC_TYPE.DATE_PICKER: {
      return (
        <DatePickerV2
          isRequired={itemData?.isRequired}
          label={itemData?.label}
          minDate={itemData?.minDate}
          maxDate={itemData?.maxDate}
          isDisabled={disabled}
          error={message} //true | false
          onDateChange={value => {
            onChange(value);
          }}
          mode={
            itemData?.type === DVMC_TYPE.DATE_TIME_PICKER ? 'datetime' : 'date'
          }
          {...rest}
        />
      );
    }

    case DVMC_TYPE.MONTH_YEAR: {
      return (
        <MonthYear
          defaultValue={itemData?.value}
          isRequired={itemData?.isRequired}
          label={itemData?.label}
          minDate={itemData?.minDate}
          maxDate={itemData?.maxDate}
          isDisabled={disabled}
          error={message} //true | false
          onMonthChange={(value: string) => {
            onChange(value);
          }}
        />
      );
    }

    case DVMC_TYPE.YEAR_PICKER: {
      return (
        <YearPicker
          defaultValue={itemData?.value}
          isRequired={itemData?.isRequired}
          label={itemData?.label}
          minDate={itemData?.minDate}
          maxDate={itemData?.maxDate}
          isDisabled={disabled}
          error={message} //true | false
          onMonthChange={(value: string) => {
            onChange(value);
          }}
        />
      );
    }

    case DVMC_TYPE.CHECK_BOX: {
      return (
        <CheckBoxDynamicForm
          label={itemData?.label}
          control={control}
          disabled={disabled}
          defaultValue={itemData?.value}
          errors={errors}
          unregister={unregister}
          error={message} //true | false
          onChange={onChange}
          dataSourceElement={relatedElement}
        />
      );
    }

    case DVMC_TYPE.DON_VI_HANH_CHINH:
      return (
        <>
          <DonViHanhChinh
            label={itemData?.label}
            disabled={disabled}
            error={message} //true | false
            isRequired={itemData?.isRequired}
            onChangeValue={onChange}
            capDonViHanhChinh={itemData?.level}
            {...rest}
          />
        </>
      );
    case DVMC_TYPE.UPLOAD_SINGLE:
    case DVMC_TYPE.UPLOAD_MULTI: {
      return (
        <View style={styles.viewupload}>
          <UploadFileV2
            style={styles.upload}
            singleType={itemData?.type === DVMC_TYPE.UPLOAD_SINGLE}
            label={itemData?.label}
            isRequired={itemData?.isRequired}
            disableDelete={disabled}
            arrayFile={itemData?.value}
            error={errors?.[itemData?._id]?.message !== undefined} //true | false
            hideButton={itemData?.disabled}
            changeListFile={onChange}
            testID={`${itemData?.label}`}
            descriptionText={itemData?.descriptionText}
            fileTypeAllow={itemData?.fileType}
            hideNotice={itemData?.hideNotice}
          />
          <HelperText
            visible={message !== undefined}
            msg={message ?? ''}
            type={'error'}
          />
        </View>
      );
    }

    case DVMC_TYPE.TABLE:
    case DVMC_TYPE.TABLE_CHUONG_SACH:
      return (
        <Table
          changeListFile={onChange}
          disableDelete={disabled}
          subType={itemData.subType}
          arrayFile={
            itemData?.type === DVMC_TYPE.TABLE_CHUONG_SACH
              ? valueChuongSach
              : itemData?.value
          }
          error={message}
          label={itemData?.label}
          isRequired={itemData?.isRequired}
          relatedElement={relatedElement}
        />
      );
    case DVMC_TYPE.TABLE_LY_LICH:
      return (
        <TableLyLich
          tableHeader={itemData?.tableHeader}
          changeListFile={onChange}
          disableDelete={disabled}
          arrayFile={itemData?.value}
          error={message}
          itemData={itemData}
          label={itemData?.label}
          isRequired={itemData?.isRequired}
          relatedElement={relatedElement}
        />
      );
    case DVMC_TYPE.TABLE_NHAN_SU:
      return (
        <TableNhanSu
          changeListFile={(value: any) => {
            onChange(value);
          }}
          disableDelete={disabled}
          arrayFile={itemData?.value}
          error={message}
          label={itemData?.label}
          isRequired={itemData?.isRequired}
          relatedElement={relatedElement}
        />
      );
    case DVMC_TYPE.TABLE_MINH_CHUNG:
      return (
        <TableMinhChung
          changeListFile={onChange}
          disableDelete={disabled}
          arrayFile={itemData?.value}
          error={message}
          label={itemData?.label}
          isRequired={itemData?.isRequired}
          relatedElement={relatedElement}
        />
      );
    case DVMC_TYPE.NHAN_SU:
      return (
        <NhanSuDynamicForm
          required={itemData?.isRequired}
          label={itemData?.label}
          onBlur={onBlur}
          control={control}
          disabled={disabled}
          errors={errors}
          unregister={unregister}
          error={message} //true | false
          onChange={onChange}
          data={pickerDataAPI}
          {...rest}
        />
      );
    case DVMC_TYPE.DAN_TOC:
    case DVMC_TYPE.TON_GIAO:
    case DVMC_TYPE.MY_CREDIT:
    case DVMC_TYPE.MY_COURSE:
    case DVMC_TYPE.MY_YEAR:
    case DVMC_TYPE.MY_SEMESTER:
    case DVMC_TYPE.DOT_KHAI_BAO:
    case DVMC_TYPE.HINH_THUC_TUYEN_DUNG:
    case DVMC_TYPE.DOT_TUYEN_DUNG:
    case DVMC_TYPE.LOAI_HOP_DONG:
    case DVMC_TYPE.NGACH_LUONG:
    case DVMC_TYPE.DON_VI_NHAN_SU:
    case DVMC_TYPE.DON_VI_VI_TRI:
    case DVMC_TYPE.TRINH_DO_LY_LUAN_CHINH_TRI:
    case DVMC_TYPE.TRINH_DO_QUAN_LY_HANH_CHINH:
    case DVMC_TYPE.TRINH_DO_QUAN_LY_NHA_NUOC:
    case DVMC_TYPE.CHUC_DANH:
    case DVMC_TYPE.NGANH:
    case DVMC_TYPE.TRINH_DO_DAO_TAO:
    case DVMC_TYPE.HINH_THUC_KHEN_THUONG:
    case DVMC_TYPE.LOAI_PHU_CAP:
    case DVMC_TYPE.LOAI_BOI_DUONG:
    case DVMC_TYPE.CAP_KHEN_THUONG:
    case DVMC_TYPE.LOAI_KHEN_THUONG:
    case DVMC_TYPE.PHUONG_THUC_KHEN_THUONG:
    case DVMC_TYPE.CAP_KY_LUAT:
    case DVMC_TYPE.HINH_THUC_KY_LUAT:
    case DVMC_TYPE.QUOC_GIA:
    case DVMC_TYPE.LOAI_SANG_KIEN:
    case DVMC_TYPE.CAP_SANG_KIEN:
    case DVMC_TYPE.HINH_THUC_DAO_TAO:
    case DVMC_TYPE.TIN_HOC:
    case DVMC_TYPE.TINH_TRANG_HON_NHAN:
      return (
        <>
          <DropdownV2
            required={itemData?.isRequired}
            label={itemData?.label}
            onBlur={onBlur}
            control={control}
            disabled={disabled}
            errors={errors}
            unregister={unregister}
            error={message} //true | false
            onChange={onChange}
            data={pickerDataAPI}
            {...rest}
          />
        </>
      );
    case DVMC_TYPE.BAC_LUONG:
      return (
        <>
          <DropdownV2
            required={itemData?.isRequired}
            label={itemData?.label}
            onBlur={onBlur}
            control={control}
            disabled={disabled}
            errors={errors}
            defaultValue={itemData?.value?.bacLuongId}
            unregister={unregister}
            error={message} //true | false
            onChange={onChangeBacLuong}
            data={pickerDataAPI}
          />
          <TextInputV2
            ref={ref}
            defaultValue={heSoLuongCurrent}
            editable={false}
            placeholder={''}
            label={'Hệ số lương'}
          />
        </>
      );
    case DVMC_TYPE.TEST:
      return (
        <DonViViTriChucDanh
          required={itemData?.isRequired}
          label={itemData?.label}
          onBlur={onBlur}
          control={control}
          disabled={disabled}
          errors={errors}
          unregister={unregister}
          error={message} //true | false
          onChange={onChange}
          {...rest}
        />
      );
    case DVMC_TYPE.HTML:
      return (
        <View style={styles.item}>
          <Text style={[styles.label]}>
            {`${itemData?.label ?? ''}`}
            {itemData?.isRequired && <Text style={styles.dot}>{' * '}</Text>}
          </Text>
          <View style={styles.viewHTML}>
            <TempScreen onChange={onChange} {...rest} />
          </View>
          <HelperText
            visible={message !== undefined}
            msg={message ?? ''}
            type={'error'}
          />
        </View>
      );

    default:
      return <View />;
  }
};

export default ItemInput;
