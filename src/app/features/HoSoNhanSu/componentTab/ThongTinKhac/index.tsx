/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import { EKieuDuLieu, WIDTH } from '@common';
import BoxHSNS from '@components/BoxHSNS';
import TextLabelTCNS from '@components/BoxHSNS/TextLabelTCNS';
import ItemLabel from '@components/Item/ItemLabel';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import { infomationUserConfig } from '@redux-selector/infoUserTCNS';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

import styles from './styles';

import DoiTuongChinhSach from '../../Table/DoiTuongChinhSach';

const ThongTinKhac = ({
  onShowDetail,
  editVisible,
  errors,
  control,
  setValue,
}: any) => {
  const { infoUserTCNS } = useSelector(infomationUserConfig);

  useEffect(() => {
    initValue();
  }, [infoUserTCNS]);

  const initValue = async () => {
    const listID = [
      'canNang',
      'tinhTrangSucKhoe',
      'nhomMau',
      'chieuCao',
      'tenNganHang',
      'chiNhanh',
      'soTaiKhoan',
      'soSoBHXH',
      'maSoThue',
    ];

    listID?.forEach(id => setValue(id, infoUserTCNS?.[id]));
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <ThongTinChung
        editVisible={editVisible}
        errors={errors}
        control={control}
        infoUser={infoUserTCNS}
      />
      <DoiTuongChinhSach
        editVisible={editVisible}
        infoUser={infoUserTCNS}
        onShowDetail={onShowDetail}
      />
    </KeyboardAwareScrollView>
  );
};

export default ThongTinKhac;

const ThongTinChung = ({ infoUser, errors, control, editVisible }: any) => {
  const listData = [
    {
      label: translate('hoSoNhanSu:sucKhoe'),
      data: [
        {
          label: translate('hoSoNhanSu:chieuCao'),
          value: infoUser?.chieuCao ? String(infoUser?.chieuCao) : '--',
        },
        {
          label: translate('hoSoNhanSu:canNang'),
          value: infoUser?.canNang ? String(infoUser?.canNang) : '--',
        },
        {
          label: translate('hoSoNhanSu:nhomMau'),
          value: infoUser?.nhomMau || '--',
        },
        {
          label: translate('hoSoNhanSu:tinhTrangSucKhoe'),
          value: infoUser?.tinhTrangSucKhoe || '--',
        },
      ],
    },
    {
      label: translate('hoSoNhanSu:tkNganHang'),
      data: [
        {
          label: translate('hoSoNhanSu:tenNganHang'),
          value: infoUser?.tenNganHang || '--',
        },
        {
          label: translate('hoSoNhanSu:chiNhanh'),
          value: infoUser?.chiNhanh || '--',
        },
        {
          label: translate('hoSoNhanSu:soTaiKhoan'),
          value: infoUser?.soTaiKhoan || '--',
        },
      ],
    },
    {
      label: translate('hoSoNhanSu:bhxh'),
      data: [
        {
          label: translate('hoSoNhanSu:soSoBHXH'),
          value: infoUser?.soSoBHXH || '--',
        },
        {
          label: translate('hoSoNhanSu:maSoThue'),
          value: infoUser?.maSoThue || '--',
        },
      ],
    },
  ];

  if (editVisible) {
    return (
      <Box width={WIDTH(351)} alignSelf="center">
        <TextLabelTCNS label={translate('hoSoNhanSu:sucKhoe')} />
        <InputNBForm
          label={translate('hoSoNhanSu:chieuCao')}
          name={'chieuCao'}
          error={errors?.chieuCao?.message}
          defaultValue={
            infoUser?.chieuCao ? `${infoUser?.chieuCao}` : undefined
          }
          control={control}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:canNang')}
          name={'canNang'}
          type={EKieuDuLieu.NUMBER}
          error={errors?.canNang?.message}
          defaultValue={infoUser?.canNang ? `${infoUser?.canNang}` : undefined}
          control={control}
        />
        <SingleSelectForm
          label={translate('hoSoNhanSu:nhomMau')}
          data={[
            {
              label: 'A',
              value: 'A',
            },
            {
              label: 'B',
              value: 'B',
            },
            {
              label: 'O',
              value: 'O',
            },
            {
              label: 'AB',
              value: 'AB',
            },
          ]}
          defaultValue={infoUser?.nhomMau}
          name={'nhomMau'}
          control={control}
          error={errors?.nhomMau?.message}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:tinhTrangSucKhoe')}
          name={'tinhTrangSucKhoe'}
          error={errors?.tinhTrangSucKhoe?.message}
          defaultValue={infoUser?.tinhTrangSucKhoe}
          control={control}
        />
        <TextLabelTCNS label={translate('hoSoNhanSu:tkNganHang')} />
        <InputNBForm
          label={translate('hoSoNhanSu:tenNganHang')}
          name={'tenNganHang'}
          error={errors?.tenNganHang?.message}
          defaultValue={infoUser?.tenNganHang}
          control={control}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:chiNhanh')}
          name={'chiNhanh'}
          error={errors?.chiNhanh?.message}
          defaultValue={infoUser?.chiNhanh}
          control={control}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:soTaiKhoan')}
          name={'soTaiKhoan'}
          error={errors?.soTaiKhoan?.message}
          defaultValue={infoUser?.soTaiKhoan}
          control={control}
        />
        <TextLabelTCNS label={translate('hoSoNhanSu:bhxh')} />
        <InputNBForm
          label={translate('hoSoNhanSu:soSoBHXH')}
          name={'soSoBHXH'}
          error={errors?.soSoBHXH?.message}
          defaultValue={infoUser?.soSoBHXH}
          control={control}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:maSoThue')}
          name={'maSoThue'}
          error={errors?.maSoThue?.message}
          defaultValue={infoUser?.maSoThue}
          control={control}
        />
      </Box>
    );
  }

  return (
    <>
      {listData?.map((e: { label: string; data: any[] }) => {
        return (
          <BoxHSNS title={e?.label} visibleAdd={false}>
            <FlatList
              scrollEnabled={false}
              style={styles.contentBox2}
              data={e?.data}
              bounces={false}
              nestedScrollEnabled={false}
              renderItem={({ item, index }) => (
                <ItemLabel
                  label={item?.label}
                  value={item?.value}
                  isLast={index === e?.data?.length - 1}
                />
              )}
            />
          </BoxHSNS>
        );
      })}
    </>
  );
};
