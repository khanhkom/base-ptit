/* eslint-disable no-inline-comments */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { EKieuDuLieu, filterObject, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import QuyTrinhDong from '@components/QuyTrinhDong';
import { CauHinhLoaiHinhProps } from '@features/KhaiBaoQuyTrinh/type';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';
import { guiKhaiBaoMinhChung, uploadDocument } from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import styles from './styles';

import PreviewQuyTrinh from '../Items/PreviewQuyTrinh';

const ThemMoiMinhChungRenLuyen = props => {
  const { account } = useSelector(selectAppConfig);

  const itemDon = props?.route?.params?.item;

  const formDon = itemDon?.isDanhMucDiemQuyDoi
    ? [
        {
          batBuoc: true,
          ma: 'diemQuyDoi',
          ten: itemDon?.tenDanhMucQuyDoi,
          kieuDuLieu: EKieuDuLieu.DANHMUC,
          data: itemDon?.danhMucDiemQuyDoi?.map(item => {
            return {
              label: item?.tieuDe,
              value: item?.diemQuyDoi,
            };
          }),
        },
        ...itemDon?.danhSachCauHinhMinhChung,
      ]
    : itemDon?.danhSachCauHinhMinhChung;

  const idDot = props?.route?.params?.dot;

  const refreshing = props?.route?.params?.refreshing;

  const disable = props?.route?.params?.disable;

  const [loading, setLoading] = useState(false);

  const viewDiemQuyDoi = {
    ten: itemDon?.cauHinhMinhChung?.tenDanhMucQuyDoi,
    value: itemDon?.cauHinhMinhChung?.danhMucDiemQuyDoi?.find(
      item => item?.diemQuyDoi === itemDon?.diemQuyDoi,
    )?.tieuDe,
  };

  const viewThongTin = itemDon?.cauHinhMinhChung?.danhSachCauHinhMinhChung?.map(
    (item: { ma: string }) => {
      return {
        ...item,
        value: itemDon?.thongTinKhaiBao?.[item?.ma]?.value,
      };
    },
  );

  const dataView = itemDon?.cauHinhMinhChung?.isDanhMucDiemQuyDoi
    ? [viewDiemQuyDoi, ...viewThongTin]
    : viewThongTin;

  const listIDFile = itemDon?.danhSachCauHinhMinhChung?.filter?.(
    item => item?.kieuDuLieu === EKieuDuLieu.FILE,
  );

  const listIDKhaiBao = itemDon?.danhSachCauHinhMinhChung?.map(
    (item: CauHinhLoaiHinhProps) => item?.ma,
  );

  const {
    control,
    handleSubmit,
    unregister,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSend = async formValue => {
    let valueFile: string[] = [];
    const filterIDFileHasValue =
      listIDFile?.filter((item: CauHinhLoaiHinhProps) => {
        return formValue?.[item?.ma]?.length > 0;
      }) ?? [];

    if (listIDFile?.length > 0) {
      const listValue = filterIDFileHasValue?.map(
        async (e: CauHinhLoaiHinhProps) => {
          const res = await uploadDocument(formValue?.[e?.ma]);

          const listFile = res?.map((file: any) => file?.url);

          return { id: e.ma, value: listFile };
        },
      );

      valueFile = await Promise.all(listValue);
    }

    setLoading(true);

    try {
      const dataKhaiBao = {
        ...filterObject(formValue, listIDKhaiBao),
        ...(valueFile?.length !== 0 && arrayToObj(valueFile)),
      };

      const thongTinKhaiBao = Object.fromEntries(
        Object.entries(dataKhaiBao)
          .filter(([key, value]) => key !== 'diemQuyDoi')
          .map(([key, value]) => {
            const newValue = { value };

            return [key, newValue];
          }),
      );

      const body = {
        cauHinhMinhChungId: itemDon?._id,
        diemQuyDoi: itemDon?.diemQuyDoi ?? formValue?.diemQuyDoi,
        dotChamDiemId: idDot,
        thongTinKhaiBao,
        ssoId: account?.ssoId,
      };

      const res = await guiKhaiBaoMinhChung(body);

      if (res?.success) {
        setTimeout(() => {
          goBack();

          refreshing && refreshing(); // reload lại lịch sử sau khi sửa
        }, 500);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box backgroundColor={R.colors.white} style={styles.container}>
      <HeaderReal
        title={disable ? 'Chi tiết minh chứng' : 'Thêm mới minh chứng'}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        {disable ? (
          <PreviewQuyTrinh dataNew={dataView} />
        ) : (
          <QuyTrinhDong
            defaultValue={''}
            formData={''}
            control={control}
            watch={watch}
            setValue={setValue}
            invisible
            unregister={unregister}
            errors={errors}
            children={
              <BaseButtonNB
                width={WIDTH(140)}
                isLoading={loading}
                isLoadingText={translate('slink:Sending')}
                title={translate('slink:Declare')}
                onPress={handleSubmit(onSend)}
              />
            }
            formKhaiBao={formDon}
          />
        )}
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default ThemMoiMinhChungRenLuyen;
function arrayToObj(arr) {
  return arr.reduce((result, item) => {
    result[item.id] = item.value;

    return result;
  }, {});
}
