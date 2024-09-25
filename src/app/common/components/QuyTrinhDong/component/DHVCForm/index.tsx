/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import { Controller, useController } from 'react-hook-form';

import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { CAP_DON_VI_HANH_CHINH } from '@config/constant';
import { HelperText } from '@libcomponents';
import { getPhuongXa, getQuanHuyen, getTinhTP } from '@networking/user';
import { Box } from 'native-base';

import InputNB from '../Input';
import SingleSelect from '../SingleSelect';
import { translate } from '@utils/i18n/translate';
interface Props {
  error: any;
  name: string;
  control: any;
  defaultValue?: any;
  capDonViHanhChinh?: number;
  isRequired?: boolean;
  disabled?: boolean;
  label?: string;
  showInput?: boolean;
}
const DVHCForm = (props: Props) => {
  const {
    error,
    name,
    control,
    defaultValue,
    capDonViHanhChinh = 4,
    isRequired,
    disabled,
    label,
    showInput,
  } = props;

  const country = useController({
    name,
    control,
  });

  const {
    field: { onChange },
  } = country;

  const [listTP, setlistTP] = useState([]);

  const [listQH, setlistQH] = useState([]);

  const [listPX, setlistPX] = useState([]);

  const donViHanhChinh = useRef({
    maTinh: '',
    tenTinh: '',
    maQuanHuyen: '',
    tenQuanHuyen: '',
    maPhuongXa: '',
    tenPhuongXa: '',
  });

  useEffect(() => {
    getData();

    getAPIQuanHuyen(defaultValue?.maTinh);

    getAPIPhuongXa(defaultValue?.maQuanHuyen);

    if (defaultValue) {
      onChange(defaultValue);

      donViHanhChinh.current = defaultValue;
    }
  }, []);

  const getData = async () => {
    const res: any = await getTinhTP();

    const listData =
      res?.data?.data?.map((item: any) => {
        return {
          label: item?.tenDonVi,
          value: item?.ma,
        };
      }) ?? [];

    setlistTP(listData);
  };

  const getAPIQuanHuyen = async (idTP: string) => {
    if (idTP) {
      const resQH: any = await getQuanHuyen(idTP);

      const listData =
        resQH?.data?.data?.map((item: any) => {
          return {
            label: item?.tenDonVi,
            value: item?.ma,
          };
        }) ?? [];

      setlistQH(listData);
    }
  };

  const onChangeTP = async (value: string) => {
    getAPIQuanHuyen(value);

    setlistPX([]);

    const objTinhTP: any = listTP?.find((e: any) => e?.value === value);

    const newDVHC = {
      ...donViHanhChinh.current,
      maTinh: value,
      tenTinh: objTinhTP?.label,
      maQuanHuyen: '',
      tenQuanHuyen: '',
      maPhuongXa: '',
      tenPhuongXa: '',
    };

    donViHanhChinh.current = newDVHC;

    onChange(donViHanhChinh.current);
  };

  const getAPIPhuongXa = async (idQH: string) => {
    if (idQH) {
      const resPX: any = await getPhuongXa(idQH);

      const listData =
        resPX?.data?.data?.map((item: any) => {
          return {
            label: item?.tenDonVi,
            value: item?.ma,
          };
        }) ?? [];

      setlistPX(listData);
    }
  };

  const onChangeQH = async (value: string) => {
    getAPIPhuongXa(value);

    const objQH: any = listQH?.find((e: any) => e?.value === value);

    const newDVHC = {
      ...donViHanhChinh.current,
      maQuanHuyen: value,
      tenQuanHuyen: objQH?.label,
      maPhuongXa: '',
      tenPhuongXa: '',
    };

    donViHanhChinh.current = newDVHC;

    onChange(donViHanhChinh.current);
  };

  const onChangePX = async (value: string) => {
    const objPX: any = listPX?.find((e: any) => e?.value === value);

    const newDVHC = {
      ...donViHanhChinh.current,
      maPhuongXa: value,
      tenPhuongXa: objPX?.label,
    };

    donViHanhChinh.current = newDVHC;

    onChange(donViHanhChinh.current);
  };

  const onChangeDCCT = (value: string) => {
    const newDVHC = {
      ...donViHanhChinh.current,
      soNhaTenDuong: value,
    };

    donViHanhChinh.current = newDVHC;

    onChange(donViHanhChinh.current);
  };

  const hiddenTP = capDonViHanhChinh < CAP_DON_VI_HANH_CHINH.TINH;

  const hiddenQH = capDonViHanhChinh < CAP_DON_VI_HANH_CHINH.HUYEN;

  const hiddenPX = capDonViHanhChinh < CAP_DON_VI_HANH_CHINH.XA;

  const visibleDCCT =
    capDonViHanhChinh >= CAP_DON_VI_HANH_CHINH.SO_NHA || showInput;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value: any) => {
          if (isRequired && !value) {
            return translate('slink:Required');
          }

          return true;
        },
      }}
      render={() => {
        return (
          <Box>
            <TextLabelQuyTrinh label={label} isRequired={isRequired} />
            {!hiddenTP && (
              <SingleSelect
                data={listTP}
                defaultValue={defaultValue?.maTinh}
                placeholder={'Chọn Tỉnh/TP'}
                onChangeValue={onChangeTP}
              />
            )}
            {!hiddenQH && (
              <SingleSelect
                data={listQH}
                defaultValue={defaultValue?.maQuanHuyen}
                placeholder={'Chọn Quận/Huyện'}
                onChangeValue={onChangeQH}
                isDisabled={listQH?.length === 0 || disabled}
              />
            )}
            {!hiddenPX && (
              <SingleSelect
                data={listPX}
                placeholder={'Chọn Phường/Xã'}
                defaultValue={defaultValue?.maPhuongXa}
                onChangeValue={onChangePX}
                isDisabled={listPX?.length === 0 || disabled}
              />
            )}
            {visibleDCCT && (
              <InputNB
                isDisabled={disabled}
                placeholder={translate('hoSoNhanSu:diaChiCuThe')}
                defaultValue={defaultValue?.soNhaTenDuong ?? ''}
                onChangeValue={onChangeDCCT}
              />
            )}
            <HelperText
              visible={error !== undefined}
              msg={error ?? ''}
              type={'error'}
            />
          </Box>
        );
      }}
    />
  );
};

export default DVHCForm;
