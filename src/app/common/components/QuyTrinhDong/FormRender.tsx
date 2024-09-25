/* eslint-disable no-case-declarations */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useSelector } from 'react-redux';

import { EKieuDuLieu } from '@config/constant';
import { CauHinhLoaiHinhProps } from '@features/KhaiBaoQuyTrinh/type';
import table from '@native-html/table-plugin';
import R from '@assets/R';
//Component
import WebView from 'react-native-webview';

import { selectAppConfig } from '@redux-selector/app';

import RenderHTML, { defaultSystemFonts } from 'react-native-render-html';
import DatePickerV2 from './component/Time/DatePicker';
import InputNB from './component/Input';
import MonthYear from './component/Time/MonthYear';
import RadioButtonNB from './component/RadioButton';
import SingleSelect from './component/SingleSelect';
import TableQuyTrinh from './component/Table';
import TCNSCanBo from './component/TCNSCanBo';
import UploadFileQuyTrinh from './component/UploadFileQuyTrinh';
import MultiChoicesNB from './component/MultiChoices';
import QLDTSinhVien from './component/SingleSelect/QLDTSinhVien';
import { getFontSize, getLineHeight, WIDTH } from '@config/function';
import HTMLInput from './component/HTMLInput';

const FormRender = (props: {
  cauHinh: CauHinhLoaiHinhProps;
  onChange: (e: any) => void;
  disabled?: boolean;
  error?: string;
  defaultValue: any;
}) => {
  const { cauHinh, disabled, onChange, defaultValue, error } = props;

  const { danhMucNCKH } = useSelector(selectAppConfig);

  let dataDanhMuc: { value: string; label: string }[] = [];
  if (cauHinh?.kieuDuLieu === EKieuDuLieu.DANHMUC) {
    const dataObject = danhMucNCKH?.find(
      item => item?.maDanhMuc === cauHinh?.maDanhMuc,
    );

    dataDanhMuc =
      dataObject?.danhSachGiaTri?.map((item: { value: string }) => {
        return { label: item?.value, value: item?.value };
      }) ?? [];
  }

  switch (cauHinh?.kieuDuLieu) {
    case EKieuDuLieu.TEXT:
    case EKieuDuLieu.NUMBER:
    case EKieuDuLieu.DECIMAL:
      if (cauHinh?.textDisplay === 'TEXT_EDITOR') {
        return (
          <HTMLInput
            defaultValue={defaultValue ? `${defaultValue}` : ''}
            placeholder={cauHinh?.ten}
            error={error}
            isDisabled={disabled}
            required={cauHinh?.batBuoc}
            label={cauHinh?.ten}
            onChangeValue={onChange}
          />
        );
      }

      return (
        <InputNB
          defaultValue={defaultValue ? `${defaultValue}` : ''}
          placeholder={cauHinh?.ten}
          textArea={cauHinh?.textarea || cauHinh?.textDisplay === 'TEXT_AREA'}
          error={error}
          isDisabled={disabled}
          required={cauHinh?.batBuoc}
          label={cauHinh?.ten}
          onChangeValue={onChange}
          type={cauHinh?.kieuDuLieu}
        />
      );
    case EKieuDuLieu.BOOLEAN:
      return (
        <RadioButtonNB
          defaultValue={defaultValue}
          isDisabled={disabled}
          error={error}
          data={[
            { value: true, label: 'Có' },
            { value: false, label: 'Không' },
          ]}
          required={cauHinh?.batBuoc}
          onChangeValue={onChange}
          label={cauHinh?.ten}
        />
      );
    case EKieuDuLieu.DATE:
    case EKieuDuLieu.HOUR:
      return (
        <DatePickerV2
          defaultValue={defaultValue}
          error={error}
          isDisabled={disabled}
          isRequired={cauHinh?.batBuoc}
          mode={cauHinh?.kieuDuLieu === EKieuDuLieu.DATE ? 'date' : 'datetime'}
          label={`${cauHinh?.ten}`}
          onDateChange={onChange}
        />
      );
    case EKieuDuLieu.MONTH: {
      return (
        <MonthYear
          defaultValue={defaultValue}
          isDisabled={disabled}
          error={error}
          isRequired={cauHinh?.batBuoc}
          label={cauHinh?.ten}
          onMonthChange={onChange}
        />
      );
    }

    case EKieuDuLieu.FILE:
      return (
        <UploadFileQuyTrinh
          disableDelete={disabled}
          error={error}
          singleType
          arrayFile={
            defaultValue?.map((item: any) => {
              if (typeof item === 'string') {
                return { uri: item };
              } else {
                return item;
              }
            }) ?? []
          }
          label={cauHinh?.ten}
          isRequired={cauHinh?.batBuoc}
          changeListFile={onChange}
        />
      );
    case EKieuDuLieu.CAN_BO:
      return (
        <TCNSCanBo
          defaultValue={defaultValue}
          error={error}
          label={cauHinh?.ten}
          onChange={onChange}
          required={cauHinh?.batBuoc}
        />
      );
    case EKieuDuLieu.SINH_VIEN:
      return (
        <QLDTSinhVien
          defaultValue={defaultValue}
          error={error}
          label={cauHinh?.ten}
          onChange={onChange}
          required={cauHinh?.batBuoc}
        />
      );
    case EKieuDuLieu.TABLE:
      return (
        <TableQuyTrinh
          error={error}
          defaultValue={defaultValue}
          onChange={onChange}
          required={cauHinh?.batBuoc}
          label={cauHinh?.ten}
          item={cauHinh}
        />
      );
    case EKieuDuLieu.DANHMUC:
      if (cauHinh?.laDangMang) {
        return (
          <MultiChoicesNB
            defaultValue={defaultValue}
            data={dataDanhMuc}
            isDisabled={disabled}
            onChangeValue={onChange}
            required={cauHinh?.batBuoc}
            label={cauHinh?.ten}
            error={error}
          />
        );
      }

      return (
        <SingleSelect
          data={dataDanhMuc}
          defaultValue={defaultValue}
          isDisabled={disabled}
          error={error}
          onChangeValue={onChange}
          required={cauHinh?.batBuoc}
          label={cauHinh?.ten}
          placeholder={cauHinh?.ten}
        />
      );
    case EKieuDuLieu.DOAN_VAN_BAN:
      const systemFonts = [...defaultSystemFonts, R.fonts.BeVietnamProRegular];

      const html = `${cauHinh?.customDefaultValue}`;

      return (
        <RenderHTML
          baseStyle={{
            textAlign: 'left',
            maxWidth: WIDTH(300),
            fontFamily: R.fonts.BeVietnamProRegular,
            fontSize: getFontSize(16),
            color: R.colors.grayText,
            // maxHeight: HEIGHT(100),
          }}
          // defaultTextProps={{ selectable: true }}// Để hiển thị tooltip
          systemFonts={systemFonts}
          {...htmlConfig}
          renderersProps={{
            // a: { onPress: () => {} },
            ...htmlConfig.renderersProps,
          }}
          debug={false}
          contentWidth={WIDTH(343)}
          source={{ html }}
        />
      );

    default:
      return <></>;
  }
};

export default FormRender;
const renderers = {
  table,
};

const htmlConfig = {
  renderers,
  WebView,
  renderersProps: {
    table: {
      animationType: 'animated',
      tableStyleSpecs: {
        outerBorderWidthPx: 0,
        rowsBorderWidthPx: 0,
        columnsBorderWidthPx: 0,
        trOddBackground: R.colors.white100,
        thOddColor: R.colors.white0,
      },
    },
    body: { fontSize: '2rem', textAlign: 'left' },
  },
  tagsStyles: {
    table: {
      width: WIDTH(343),
    },
    p: {
      fontFamily: R.fonts.BeVietnamProRegular,
      fontSize: getFontSize(14),
      lineHeight: getLineHeight(24),
      color: R.colors.grayText,
    },
  },
  defaultWebViewProps: {},
};
