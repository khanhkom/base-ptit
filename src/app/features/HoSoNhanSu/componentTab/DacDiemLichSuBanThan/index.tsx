/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ItemLabel from '@components/Item/ItemLabel';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import { infomationUserConfig } from '@redux-selector/infoUserTCNS';
import { translate } from '@utils/i18n/translate';
import { FlatList, ScrollView } from 'native-base';

const DacDiemLichSuBanThan = ({
  editVisible,
  control,
  errors,
  setValue,
}: any) => {
  const { infoUserTCNS } = useSelector(infomationUserConfig);

  useEffect(() => {
    initValue();
  }, [infoUserTCNS]);

  const initValue = async () => {
    const listID = [
      'lichSuBanThanKhaiRo',
      'lichSuBanThanThamGia',
      'lichSuBanThanCoThanNhan',
    ];

    listID?.forEach(id => {
      setValue(id, infoUserTCNS?.[id]);
    });
  };

  const listData = [
    {
      label: translate('hoSoNhanSu:lichSuBanThanKhaiRo'),
      value: infoUserTCNS?.lichSuBanThanKhaiRo || '--',
      multiLine: true,
    },
    {
      label: translate('hoSoNhanSu:lichSuBanThanThamGia'),
      value: infoUserTCNS?.lichSuBanThanThamGia || '--',
      multiLine: true,
    },
    {
      label: translate('hoSoNhanSu:lichSuBanThanCoThanNhan'),
      value: infoUserTCNS?.lichSuBanThanCoThanNhan || '--',
      multiLine: true,
    },
  ];

  if (editVisible) {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.viewInfo}>
        <InputNBForm
          label={translate('hoSoNhanSu:lichSuBanThanKhaiRo')}
          textArea
          name={'lichSuBanThanKhaiRo'}
          error={errors?.lichSuBanThanKhaiRo?.message}
          defaultValue={infoUserTCNS?.lichSuBanThanKhaiRo}
          control={control}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:lichSuBanThanThamGia')}
          textArea
          name={'lichSuBanThanThamGia'}
          error={errors?.lichSuBanThanThamGia?.message}
          defaultValue={infoUserTCNS?.lichSuBanThanThamGia}
          control={control}
        />
        <InputNBForm
          label={translate('hoSoNhanSu:lichSuBanThanCoThanNhan')}
          textArea
          name={'lichSuBanThanCoThanNhan'}
          error={errors?.lichSuBanThanCoThanNhan?.message}
          defaultValue={infoUserTCNS?.lichSuBanThanCoThanNhan}
          control={control}
        />
      </KeyboardAwareScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        style={styles.lichSu}
        data={listData}
        scrollEnabled={false}
        bounces={false}
        nestedScrollEnabled={false}
        renderItem={({ item, index }) => (
          <ItemLabel
            label={item?.label}
            value={item?.value}
            multiLine={item?.multiLine}
            numberOfLines={10}
            isLast={index === listData?.length - 1}
          />
        )}
      />
    </ScrollView>
  );
};

export default DacDiemLichSuBanThan;

const styles = StyleSheet.create({
  viewInfo: { paddingBottom: HEIGHT(30), paddingHorizontal: WIDTH(12) },
  lichSu: {
    overflow: 'hidden',
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(16),
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    alignSelf: 'center',
    marginBottom: HEIGHT(20),
  },
  container: {
    paddingBottom: HEIGHT(30),
  },
});
