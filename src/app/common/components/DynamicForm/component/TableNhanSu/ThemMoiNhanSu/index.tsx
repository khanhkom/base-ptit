/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useForm } from 'react-hook-form';

import { tenGiangVien } from '@common';
import DynamicForm from '@components/DynamicForm';
import BaseButton from '@components/Popup/BaseButton';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import { postLyLich } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import { styles } from './styles';

const ThemMoiNhanSu = (props: any) => {
  const [loading, setloading] = useState(false);

  const onAddItem = props?.route?.params?.onAddItem;

  const item = props?.route?.params?.item;

  const relatedElement = props?.route?.params?.relatedElement;

  const index = props?.route?.params?.index;

  const disabled = props?.route?.params?.disabled;

  const [formDynamic, setformDynamic] = useState<any[]>([]);

  const onSubmit = async (data: any) => {
    setloading(true);

    const inAcademy = data?.loai === 'Cán bộ / Giảng viên trong Học viện';

    let body: any = {};
    if (inAcademy) {
      body = {
        ssoId: data?.hoVaTen_1?.ssoId,
        hoVaTen: tenGiangVien(data?.hoVaTen_1),
      };
    } else {
      body = {
        tenDonVi: data?.donViCongTac_0 ?? '',
        email: data?.email ?? '',
        hoVaTen: data?.hoVaTen_0 ?? '',
        ...(data?.hocHam && { hocHam: data?.hocHam ?? '' }),
        ...(data?.hocVi && { hocVi: data?.hocVi ?? '' }),
        dienThoaiPersonal: data?.soDienThoai ?? '',
      };
    }

    const res = await postLyLich(body);

    onAddItem(
      converData(inAcademy ? 1 : 0, data, res?.data?.data?._id ?? ''),
      index,
    );

    setloading(false);

    if (res) {
      goBack();
    }
  };

  useEffect(() => {
    setformDynamic(form(relatedElement, item));
  }, []);

  const {
    control,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Add')} />
      <LoadingComponent loading={loading} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <DynamicForm
          errors={errors}
          unregister={unregister}
          disabled={disabled}
          control={control}
          formInput={formDynamic}
        />
        {!disabled && (
          <BaseButton
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            text={styles.textButton}
            title="Lưu"
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ThemMoiNhanSu;
const form = (listVaiTro: any[], data: any) => {
  return [
    {
      type: 'DROP_LIST_SINGLE',
      label: translate('slink:Loai'),
      value: data
        ? data?.maDinhDanh
          ? 'Cán bộ / Giảng viên trong Học viện'
          : 'Người ngoài Học viện'
        : 'Cán bộ / Giảng viên trong Học viện',
      dataSource: [
        {
          label: 'Cán bộ / Giảng viên trong Học viện',
          relatedElement: [
            {
              type: 'NHAN_SU',
              label: translate('slink:Fullname'),
              isRequired: true,
              value: data?.nguoiKhaiBao?.maDinhDanh ?? '',
              relatedElement: [],
              _id: 'hoVaTen_1',
            },
            {
              type: 'TEXT_INPUT',
              label: translate('slink:Place_of_work'),
              isRequired: true,
              value: data?.donViCongTac ?? '',
              relatedElement: [],
              _id: 'donViCongTac_1',
            },
          ],
        },
        {
          label: 'Người ngoài Học viện',
          relatedElement: [
            {
              type: 'TEXT_INPUT',
              label: translate('slink:Fullname'),
              value: data?.nguoiKhaiBao?.hoVaTen ?? '',
              isRequired: true,
              relatedElement: [],
              _id: 'hoVaTen_0',
            },
            {
              type: 'TEXT_AREA',
              value: data?.diaChiCongTac ?? '',
              label: 'Cơ quan công tác',
              isRequired: true,
              relatedElement: [],
              _id: 'donViCongTac_0',
            },
          ],
        },
      ],
      isRequired: true,
      relatedElement: [],
      _id: 'loai',
    },
    {
      type: 'INPUT_NUMBER',
      label: translate('slink:Phone_number'),
      isRequired: false,
      value: data?.nguoiKhaiBao?.dienThoaiPersonal ?? '',
      relatedElement: [],
      _id: 'soDienThoai',
    },
    {
      type: 'TEXT_INPUT',
      label: 'Email',
      value: data?.nguoiKhaiBao?.email ?? data?.email ?? '',
      isRequired: false,
      relatedElement: [],
      _id: 'email',
    },
    {
      type: 'DROP_LIST_SINGLE',
      label: 'Học hàm',
      value: data?.nguoiKhaiBao?.hocHam ?? '',
      dataSource: [
        {
          label: 'Giáo sư',
          relatedElement: [],
        },
        {
          label: 'Phó Giáo sư',
          relatedElement: [],
        },
      ],
      relatedElement: [],
      _id: 'hocHam',
    },
    {
      type: 'DROP_LIST_SINGLE',
      label: 'Học vị',
      value: data?.nguoiKhaiBao?.hocVi ?? '',
      dataSource: [
        {
          label: 'Cử nhân',
          relatedElement: [],
        },
        {
          label: 'Kỹ sư',
          relatedElement: [],
        },
        {
          label: 'Thạc sỹ',
          relatedElement: [],
        },
        {
          label: 'Tiến sỹ',
          relatedElement: [],
        },
        {
          label: 'Giảng viên chính',
          relatedElement: [],
        },
      ],
      relatedElement: [],
      _id: 'hocVi',
    },
    {
      type: 'DROP_LIST_SINGLE',
      label: translate('slink:Role'),
      value: data?.vaiTroKhcn ?? '',
      dataSource: listVaiTro,
      isRequired: true,
      relatedElement: [],
      _id: 'vaiTro',
    },
  ];
};

const converData = (loai: number, data: any, nguoiKhaiBaoid: string) => {
  if (loai === 0) {
    return {
      loai: 0,
      email: data?.email,
      diaChiCongTac: data?.donViCongTac_0 ?? '',
      vaiTroKhcn: data?.vaiTro ?? '',
      nguoiKhaiBao: {
        _id: nguoiKhaiBaoid,
        hoVaTen: data?.hoVaTen_0,
        hocHam: data?.hocHam,
        hocVi: data?.hocVi,
        dienThoaiPersonal: data?.soDienThoai,
      },
    };
  }

  return {
    loai: 1,
    email: data?.email ?? '',
    donViCongTac: data?.donViCongTac_1 ?? '',
    maDinhDanh: data?.hoVaTen_1?.maCanBo ?? '',
    vaiTroKhcn: data?.vaiTro ?? '',
    nguoiKhaiBao: {
      maDinhDanh: data?.hoVaTen_1?.maCanBo ?? '',
      _id: nguoiKhaiBaoid,
      hoVaTen: tenGiangVien(data?.hoVaTen_1),
      hocHam: data?.hocHam,
      hocVi: data?.hocVi,
      dienThoaiPersonal: data?.soDienThoai,
    },
  };
};
