/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TextInput,
  UIManager,
  View,
  ViewStyle,
} from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { ETrangThaiPhieuDiemRL, popupCancel, popupOk, WIDTH } from '@common';
// import { DropDown, HelperText, TouchableScale } from '@components';
// import ItemIconSVG from '@components/icon-svg';
// import ItemTrong from '@components/item/ItemTrong';
// import LoadingComponent from '@components/loading/loading-component';
// import BaseButton from '@components/popup/base-button';
import ItemTrong from '@components/Item/ItemTrong';
import BaseButton from '@components/Popup/BaseButton';
import { HelperText, TouchableScale } from '@libcomponents';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  getChiTietPhieuDiem,
  getDiemCuaPhieu,
  getDiemCuaPhieuDaNhap,
  guiPhieuDiem,
  suaTrangThaiDaNhap,
  // luuDiemRenLuyen,
  // nopDiemRenLuyen,
} from '@networking/user';
import { selectAppConfig } from '@redux-selector/app';
import { KeyboardAvoidingView } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

const EnumTrangThaiPhieuDiem = {
  SAVE: 'save',
  SUBMIT: 'submit',
};

const FormPhieuDiem = ({
  duLieuDot,
  disabled = false,
  onRefresh,
  field,
  style,
}: {
  style?: ViewStyle;
  disabled?: boolean;
  field?: string;
  duLieuDot: any;
  onRefresh?: () => void;
}) => {
  const { account } = useSelector(selectAppConfig);

  const ssoId = account?.ssoId;

  const [idPhieu, setIdPhieu] = useState('');

  const [loading, setloading] = useState(false);

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const [infoPhieuDiem, setinfoPhieuDiem] = useState<any>();

  const [danhSachDiem, setDanhSachDiem] = useState<any>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setloading(true);

    try {
      const getDuLieu = await getChiTietPhieuDiem(duLieuDot?.idBieuMau);

      const getDiemHeThong = await getDiemCuaPhieu(duLieuDot?._id, ssoId);

      const getDiemDaNhap = await getDiemCuaPhieuDaNhap(duLieuDot?._id);

      setIdPhieu(getDiemDaNhap?.data?._id);

      const diemSvNhap =
        getDiemDaNhap?.data?.diemCham?.find(item => item?.nguoiTraLoi === field)
          ?.danhSachTraLoi ?? [];

      setDanhSachDiem([...getDiemHeThong?.data, ...diemSvNhap]);

      setinfoPhieuDiem(getDuLieu?.data?.danhSachKhoi);

      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const listMaNoiDung: any[] = [];

  infoPhieuDiem?.phieuDiem?.danhSachTieuChi?.forEach((item: any) => {
    listMaNoiDung.push(...(item?.danhSachNoiDung ?? []));
  });

  // const listNoiDungDiem = listMaNoiDung?.filter(item => {
  //   return item?.loaiNoiDung !== 'Hệ thống';
  // });

  const onSubmit = async (data: any, type: string) => {
    try {
      setloadingSubmit(true);

      const arr: any = [];

      for (const i in data) {
        arr?.push({ idCauHoi: i, traLoiText: data?.[i] });
      }

      const body = {
        danhSachTraLoi: arr,
        guiNgay: type === EnumTrangThaiPhieuDiem.SUBMIT,
        idDotChamDiemRenLuyen: duLieuDot?._id,
        idKhaoSat: duLieuDot?.idBieuMau,
        nguoiTraLoi: 'Sinh viên',
        ssoId: ssoId,
        trangThaiNopSV:
          type === EnumTrangThaiPhieuDiem.SUBMIT
            ? ETrangThaiPhieuDiemRL.DA_GUI
            : ETrangThaiPhieuDiemRL.LUU,
        // loai: 'Chấm điểm rèn luyện',
      };

      const bodyTrangThai = {
        ssoId: ssoId,
        trangThaiNopSV:
          type === EnumTrangThaiPhieuDiem.SUBMIT
            ? ETrangThaiPhieuDiemRL.DA_GUI
            : ETrangThaiPhieuDiemRL.LUU,
        idDotChamDiemRenLuyen: duLieuDot?._id,
      };

      const res = await guiPhieuDiem(body);

      const resTrangThai = await suaTrangThaiDaNhap(idPhieu, bodyTrangThai);

      if (res.success) {
        popupOk(
          'Thông báo',
          type === EnumTrangThaiPhieuDiem.SAVE
            ? 'Lưu phiếu điểm thành công'
            : 'Nộp phiếu điểm thành công',
          () => {
            type === EnumTrangThaiPhieuDiem.SAVE
              ? onAfterSave()
              : onAfterSubmit();
          },
        );
      } else {
        popupOk('Thông báo', res?.msg ?? 'Đã có lỗi xảy ra!');
      }
    } catch (error) {
      popupOk('Thông báo', 'Đã có lỗi xảy ra!');
    }

    setloadingSubmit(false);
  };

  const onAfterSave = () => {
    onRefresh && onRefresh();

    goBack();
  };

  const onAfterSubmit = () => {
    onRefresh && onRefresh();

    goBack();
  };

  const onSavePhieuDiem = (data: any) => {
    popupCancel(
      'Bạn có muốn lưu phiếu điểm rèn luyện không?',
      'Thông tin điểm đã chấm sẽ được lưu lại và gửi đi vào lần sau',
      () => onSubmit(data, EnumTrangThaiPhieuDiem.SAVE),
    );
  };

  const onSubmitPhieuDiem = (data: any) => {
    popupCancel(
      'Bạn có muốn gửi phiếu điểm rèn luyện không?',
      'Phiếu điểm sẽ được gửi đến cố vấn học tập để đánh giá và xét duyệt',
      () => onSubmit(data, EnumTrangThaiPhieuDiem.SUBMIT),
    );
  };

  if (loading) {
    return <LoadingComponent loading={loading} />;
  }

  // const paddingTop = disabled ? 0 : HEIGHT(24);

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <LoadingComponent loading={loadingSubmit} />

        <FlatList
          scrollEnabled={false}
          data={infoPhieuDiem}
          extraData={infoPhieuDiem}
          onEndReachedThreshold={0.01}
          ListEmptyComponent={<ItemTrong />}
          ListFooterComponent={
            <Footer
              disabled={disabled}
              onSave={handleSubmit(onSavePhieuDiem)}
              onSend={handleSubmit(onSubmitPhieuDiem)}
            />
          }
          contentContainerStyle={[styles.contentFlatlist, style]}
          renderItem={({ item, index }: any) => (
            <ViewForm
              disabled={disabled}
              field={field}
              getValues={getValues}
              listKetQua={infoPhieuDiem?.diemChamSinhVien}
              key={index}
              index={index}
              item={item}
              isLast={infoPhieuDiem?.length - 1 === index}
              control={control}
              errors={errors}
              danhSachDiem={danhSachDiem}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default FormPhieuDiem;
const Footer = (props: {
  disabled?: boolean;
  onSave: () => void;
  onSend: () => void;
}) => {
  const { onSave, onSend, disabled } = props;

  if (disabled) {
    return <></>;
  }

  return (
    <View style={styles.viewFooter}>
      <BaseButton
        onPress={onSave}
        style={styles.buttonSubmit}
        text={styles.textButton}
        title="Lưu & Gửi sau"
      />
      <BaseButton
        onPress={onSend}
        style={styles.buttonGui}
        text={styles.textButtonGui}
        title="Gửi phiếu"
      />
    </View>
  );
};

const ViewForm = (props: any) => {
  const {
    item,
    control,
    errors,
    isLast,
    // index,
    // listKetQua,
    // field,
    disabled,
    getValues,
    danhSachDiem,
  } = props;

  const [expand, setexpand] = useState(true);

  const [values, setvalues] = useState<any[]>([]);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const isFloat = (value: string) => {
    return /^[+-]?[0-9]+$/.test(value);
  };

  const showExpand = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleY,
        springDamping: 1.7,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 1.7,
      },
    });

    const listValue = getValues();

    setvalues(listValue);

    setexpand(!expand);
  };

  const borderBottomWidth = isLast ? 0 : 1;

  return (
    <View style={[styles.containerItem, { borderBottomWidth }]}>
      <TouchableScale containerStyle={styles.viewItem} onPress={showExpand}>
        <Text
          style={[
            styles.textTieuChi,
            {
              fontFamily: item?.isTieuDeDanhMuc
                ? R.fonts.BeVietnamProSemiBold
                : R.fonts.BeVietnamProRegular,
            },
          ]}>{`${item?.tieuDe ?? ''}`}</Text>
        {item?.danhSachCauHoi?.length !== 0 && (
          <Entypo
            color={R.colors.black0}
            size={WIDTH(22)}
            name={expand ? 'chevron-up' : 'chevron-down'}
          />
        )}
      </TouchableScale>
      {expand &&
        item?.danhSachCauHoi?.map((e: any, ind: number) => {
          // const defaultValue =
          //   listKetQua?.find(
          //     (data: { maNoiDung: string }) => data?.maNoiDung === e.maNoiDung,
          //   )?.diem ?? '';

          const diemMin = e?.gioiHanDuoiTuyenTinh;

          const diemMax = e?.gioiHanTrenTuyenTinh;

          const subText = `(${diemMin} - ${diemMax} điểm)`;

          const defaultValue = danhSachDiem?.find(
            i => e?._id === i?.idCauHoi,
          )?.traLoiText;

          return (
            <>
              <View key={ind} style={styles.viewForm}>
                <Text style={styles.tieuChiNho}>
                  {`${e?.noiDungCauHoi ?? ''} `}
                  <Text style={styles.text}>{subText}</Text>
                </Text>
                <View>
                  <Controller
                    control={control}
                    rules={{
                      ...{
                        min: {
                          value: e?.choPhepVuotKhung
                            ? -100000
                            : e?.gioiHanDuoiTuyenTinh,
                          message: `Yêu cầu nhập giá trị lớn hơn ${
                            e?.gioiHanDuoiTuyenTinh ?? '--'
                          }`,
                        },
                        max: {
                          value: e?.choPhepVuotKhung
                            ? 100000
                            : e?.gioiHanTrenTuyenTinh,
                          message: `Yêu cầu nhập giá trị nhỏ hơn ${
                            e?.gioiHanTrenTuyenTinh ?? '--'
                          }`,
                        },
                      },
                      validate: {
                        isFloat: value =>
                          value === '' ||
                          value === undefined ||
                          isFloat(value) ||
                          'Vui lòng nhập số thực hợp lệ',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <DynamicInput
                        disabled={disabled || e.loai === 'diemMinhChung'}
                        type={e?.loaiNhapTay}
                        onChange={onChange}
                        defaultValue={
                          defaultValue?.toString() || values?.[e?._id]
                        }
                        diemDanhGia={e?.diemHeThong}
                        value={value}
                        onBlur={onBlur}
                      />
                    )}
                    key={e?._id}
                    name={e?._id}
                  />
                  {/* )} */}
                </View>
              </View>
              <HelperText
                visible={errors?.[e?._id]?.message !== undefined}
                msg={errors?.[e?._id]?.message ?? ''}
                type={'error'}
              />
            </>
          );
        })}
    </View>
  );
};

const DynamicInput = (props: any) => {
  const { onChange, value, onBlur, disabled, defaultValue } = props;

  useEffect(() => {
    onChange && onChange(defaultValue);
  }, [defaultValue]);

  if (disabled) {
    return (
      <View style={styles.viewDiemDanhGia}>
        <Text style={styles.diemDanhGia}>{defaultValue ?? 0}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.viewInput}>
        <TextInput
          onChangeText={onChange}
          value={value}
          defaultValue={defaultValue}
          style={styles.input}
          placeholderTextColor={R.colors.black0}
          onBlur={onBlur}
          keyboardType="numeric"
          placeholder={''}
        />
      </View>
    );
  }

  // switch (type) {
  //   case 'Tập giá trị':
  //     return (
  //       <View>
  //         <DropDown
  //           data={data}
  //           defaultValue={defaultValue}
  //           style={{ flex: 0 }}
  //           placeholderStyle={styles.dropdown}
  //           placeHolder=""
  //           arrowColor={R.colors.gray6B}
  //           containerStyle={styles.containerDropdown}
  //           onChangeItem={val => {
  //             onChange(val);
  //           }}
  //         />
  //       </View>
  //     );
  //   case 'Phạm vi':
  //     return (
  //       <View style={styles.viewInput}>
  //         <TextInput
  //           onChangeText={onChange}
  //           value={value}
  //           defaultValue={defaultValue}
  //           style={styles.input}
  //           placeholderTextColor={R.colors.black0}
  //           onBlur={onBlur}
  //           keyboardType="numeric"
  //           placeholder={''}
  //         />
  //       </View>
  //     );

  //   default:
  //     return (
  //       <View style={styles.viewInput}>
  //         <TextInput
  //           onChangeText={onChange}
  //           value={value}
  //           defaultValue={defaultValue}
  //           style={styles.input}
  //           placeholderTextColor={R.colors.black0}
  //           onBlur={onBlur}
  //           keyboardType="numeric"
  //           placeholder={''}
  //         />
  //       </View>
  //     );
  // }
};
