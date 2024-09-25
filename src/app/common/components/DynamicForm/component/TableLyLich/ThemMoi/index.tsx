/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useForm } from 'react-hook-form';

import { DVMC_TYPE } from '@common';
import DynamicForm from '@components/DynamicForm';
import BaseButton from '@components/Popup/BaseButton';
import HeaderReal from '@libcomponents/header-real';
import { goBack } from '@navigation/navigation-service';

import { styles } from './styles';
import { translate } from '@utils/i18n/translate';

const ThemMoiLyLich = (props: any) => {
  const onAddItem = props?.route?.params?.onAddItem;

  const [formDynamic, setformDynamic] = useState<any[]>([]);

  const id = props?.route?.params?.id;

  const item = props?.route?.params?.item;

  const disabled = props?.route?.params?.disabled;

  const index = props?.route?.params?.index;

  useEffect(() => {
    setformDynamic(formThemMoi(id, index, item));
  }, []);

  const onSubmit = (data: any) => {
    onAddItem({ ...data, idType: id, ...(index > 0 && { index }) }, index);

    goBack();
  };

  const {
    control,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('slink:Add')} />
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

export default ThemMoiLyLich;
const formThemMoi = (id: string, index: number, data: any) => {
  switch (id) {
    case 'quaTrinhDaoTao':
      return [
        {
          type: DVMC_TYPE.DROP_LIST_SINGLE,
          label: 'Bậc đào tạo',
          disabled: true,
          value: valueTrinhDo(index),
          dataSource: [
            {
              label: 'Đại học',
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
              label: 'Thực tập sinh khoa học',
              relatedElement: [],
            },
          ],
          relatedElement: [],
          _id: 'tenTrinhDo',
        },
        {
          type: DVMC_TYPE.INPUT_NUMBER,
          label: 'Năm tốt nghiệp',
          value: data?.namTotNghiep || '',
          relatedElement: [],
          _id: 'namTotNghiep',
        },
        {
          type: DVMC_TYPE.TEXT_INPUT,
          label: 'Nơi đào tạo',
          value: data?.noiDaoTao || '',
          relatedElement: [],
          _id: 'noiDaoTao',
        },
        {
          type: DVMC_TYPE.TEXT_INPUT,
          label: 'Chuyên môn',
          value: data?.chuyenMon || '',
          relatedElement: [],
          _id: 'chuyenMon',
        },
      ];
    case 'quaTrinhCongTac':
      return [
        {
          type: DVMC_TYPE.INPUT_NUMBER,
          isRequired: true,
          label: 'Công tác từ năm',
          value: data?.tuNam || '',
          relatedElement: [],
          _id: 'tuNam',
        },
        {
          type: DVMC_TYPE.INPUT_NUMBER,
          isRequired: true,
          value: data?.denNam || '',
          label: 'Công tác đến năm',
          relatedElement: [],
          _id: 'denNam',
        },
        {
          type: DVMC_TYPE.TEXT_INPUT,
          value: data?.viTriCongTac || '',
          isRequired: true,
          label: 'Vị trí công tác',
          relatedElement: [],
          _id: 'viTriCongTac',
        },
        {
          type: DVMC_TYPE.TEXT_INPUT,
          value: data?.toChucCongTac || '',
          isRequired: true,
          label: 'Tổ chức công tác',
          relatedElement: [],
          _id: 'toChucCongTac',
        },
        {
          type: DVMC_TYPE.TEXT_INPUT,
          isRequired: true,
          value: data?.diaChiToChuc || '',
          label: translate('slink:Dia_chi_to_chuc'),
          relatedElement: [],
          _id: 'diaChiToChuc',
        },
      ];
    case 'noiDungVanBang':
      return [
        {
          type: DVMC_TYPE.TEXT_INPUT,
          value: data?.tenVaNoiDung || '',
          label: 'Tên và nội dung văn bằng',
          isRequired: true,
          relatedElement: [],
          _id: 'tenVaNoiDung',
        },
        {
          type: DVMC_TYPE.INPUT_NUMBER,
          value: data?.namCap || '',
          isRequired: true,
          label: 'Năm cấp',
          relatedElement: [],
          _id: 'namCap',
        },
      ];
    case 'congTrinhApDung':
      return [
        {
          type: DVMC_TYPE.TEXT_INPUT,
          value: data?.tenCongTrinh || '',
          isRequired: true,
          label: 'Tên công trình',
          relatedElement: [],
          _id: 'tenCongTrinh',
        },
        {
          isRequired: true,
          value: data?.hinhThucQuyMo || '',
          type: DVMC_TYPE.TEXT_INPUT,
          label: 'Hình thức, quy mô, địa chỉ áp dụng',
          relatedElement: [],
          _id: 'hinhThucQuyMo',
        },
        {
          type: DVMC_TYPE.DATE_PICKER,
          value: data?.thoiGianBatDau || '',
          isRequired: true,
          label: 'Thời gian bắt đầu',
          relatedElement: [],
          _id: 'thoiGianBatDau',
        },
        {
          type: DVMC_TYPE.DATE_PICKER,
          value: data?.thoiGianKetThuc || '',
          isRequired: true,
          label: 'Thời gian kết thúc',
          relatedElement: [],
          _id: 'thoiGianKetThuc',
        },
      ];
    case 'duAnChuTri':
    case 'duAnThamGia':
      return [
        {
          type: DVMC_TYPE.TEXT_AREA,
          isRequired: true,
          value: data?.tenCongTrinh || '',
          label: 'Tên công trình',
          relatedElement: [],
          _id: 'tenCongTrinh',
        },
        {
          value: data?.thuocChuongTrinh || '',
          type: DVMC_TYPE.TEXT_AREA,
          label: 'Thuộc chương trình (nếu có)',
          relatedElement: [],
          _id: 'thuocChuongTrinh',
        },
        {
          type: DVMC_TYPE.DATE_PICKER,
          value: data?.thoiGianBatDau || '',
          label: 'Thời gian bắt đầu',
          isRequired: true,
          relatedElement: [],
          _id: 'thoiGianBatDau',
        },
        {
          value: data?.thoiGianKetThuc || '',
          type: DVMC_TYPE.DATE_PICKER,
          label: 'Thời gian kết thúc',
          isRequired: true,
          relatedElement: [],
          _id: 'thoiGianKetThuc',
        },
        {
          type: DVMC_TYPE.RADIO_BUTTON,
          value:
            data && !data?.daNghiemThu ? 'Chưa nghiệm thu' : 'Đã nghiệm thu',
          label: 'Tình trạng đề tài',
          dataSource: [
            {
              label: 'Đã nghiệm thu',
              relatedElement: [],
            },
            {
              label: 'Chưa nghiệm thu',
              relatedElement: [],
            },
          ],
          isRequired: true,
          relatedElement: [],
          _id: 'daNghiemThu',
        },
      ];
    case 'giaiThuong':
      return [
        {
          type: DVMC_TYPE.TEXT_AREA,
          isRequired: true,
          label: 'Hình thức và nội dung giải thưởng',
          value: data?.hinhThucVaNoiDung || '',
          relatedElement: [],
          _id: 'hinhThucVaNoiDung',
        },
        {
          type: DVMC_TYPE.INPUT_NUMBER,
          label: 'Năm tặng thưởng',
          value: data?.namTangThuong || '',
          isRequired: true,
          relatedElement: [],
          _id: 'namTangThuong',
        },
      ];

    default:
      return [];
  }
};

const valueTrinhDo = (index: number) => {
  switch (index) {
    case 0:
      return 'Đại học';
    case 1:
      return 'Thạc sỹ';
    case 2:
      return 'Tiến sỹ';
    case 3:
      return 'Thực tập sinh khoa học';

    default:
      return '';
  }
};
