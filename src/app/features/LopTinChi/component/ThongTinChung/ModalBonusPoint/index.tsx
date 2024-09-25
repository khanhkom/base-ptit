/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import R from '@assets/R';
import { EKieuDuLieu, WIDTH } from '@common';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  addBonusPoint,
  delBonusPoint,
  editBonusPoint,
} from '@networking/user/LopTinChiPoint';
import { translate } from '@utils/i18n/translate';
import { Button, HStack, Modal, Text, useTheme } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { BonusPointProps } from '../ThongTinSinhVien';
import { SinhVienProps } from '../type';
interface Props {
  turnOffModel: () => void;
  modalVisible: boolean;
  sinhVien: SinhVienProps | null;
  idLHP: string;
  objPoint?: BonusPointProps | null;
  onRefresh: () => void;
  hideDetail?: boolean;
}

const ModalBonusPoint = (props: Props) => {
  const {
    turnOffModel,
    hideDetail,
    modalVisible,
    objPoint,
    sinhVien,
    idLHP,
    onRefresh,
  } = props;

  const [disabled, setdisabled] = useState(false);

  const initialRef = React.useRef(null);

  const finalRef = React.useRef(null);

  const theme = useTheme();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (objPoint) {
      setValue('diemCong', objPoint?.diemCong);

      setValue('chuThich', objPoint?.chuThich);
    }
  }, []);

  const watchValues = watch();

  const onSave = async () => {
    setdisabled(true);

    const body = {
      sinhVienSsoId: sinhVien?.sinhVienSsoId || '',
      diemCong: Number(watchValues?.diemCong || 0),
      chuThich: watchValues?.chuThich || '',
    };

    let response: any;
    if (objPoint?._id) {
      response = await editBonusPoint(objPoint?._id, idLHP, body);
    } else {
      response = await addBonusPoint(idLHP, body);
    }

    setdisabled(false);

    if (response?.status) {
      turnOffModel();

      onRefresh();
    }
  };

  const onNavigateDetail = () => {
    turnOffModel();

    setTimeout(() => {
      navigateScreen(APP_SCREEN.THONGTINSINHVIEN, {
        idLHP,
        sinhVien,
        onRefresh,
      });
    }, 500);
  };

  const handleDel = async () => {
    turnOffModel();

    setdisabled(true);

    const response = await delBonusPoint(objPoint?._id || '', idLHP);

    setdisabled(false);

    if (response?.status) {
      turnOffModel();

      onRefresh();
    }
  };

  return (
    <Modal
      isOpen={modalVisible}
      avoidKeyboard
      onClose={turnOffModel}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}>
      <Modal.Content w={'full'}>
        <Modal.CloseButton />
        <Modal.Header>
          <Text
            fontSize="sm"
            fontFamily={R.fonts.BeVietnamProSemiBold}
            color="black">
            {sinhVien?.sinhVien?.ten || ''}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <InputNBForm
            label="Điểm"
            min={0}
            max={10}
            name={'diemCong'}
            defaultValue={objPoint?.diemCong ? `${objPoint?.diemCong}` : ''}
            type={EKieuDuLieu?.NUMBER}
            placeholder="Nhập điểm cộng cho sinh viên"
            required
            control={control}
            error={errors?.diemCong?.message}
          />
          <InputNBForm
            label={translate('slink:Note')}
            defaultValue={objPoint?.chuThich ? `${objPoint?.chuThich}` : ''}
            placeholder={translate('slink:Note')}
            name={'chuThich'}
            textArea
            control={control}
            error={errors?.chuThich?.message}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button.Group space={2}>
            {hideDetail ? (
              <></>
            ) : (
              <Button
                disabled={disabled}
                variant="outline"
                onPress={onNavigateDetail}>
                <HStack alignItems={'center'}>
                  <Entypo
                    size={WIDTH(14)}
                    name={'eye'}
                    color={theme.colors.black}
                  />
                  <Text
                    fontSize={'sm'}
                    fontFamily={R.fonts.BeVietnamProMedium}
                    ml="1">
                    {translate('slink:See_details')}
                  </Text>
                </HStack>
              </Button>
            )}
            <Button
              disabled={disabled}
              variant="solid"
              onPress={handleSubmit(onSave)}>
              <HStack alignItems={'center'}>
                <FontAwesome
                  size={WIDTH(14)}
                  name={'save'}
                  color={theme.colors.white}
                />
                <Text
                  color={'white'}
                  fontSize={'sm'}
                  fontFamily={R.fonts.BeVietnamProMedium}
                  ml="1">
                  Lưu
                </Text>
              </HStack>
            </Button>
            {objPoint ? (
              <Button
                disabled={disabled}
                borderColor={'red.500'}
                variant="outline"
                onPress={handleDel}>
                <HStack alignItems={'center'}>
                  <AntDesign
                    size={WIDTH(14)}
                    name={'delete'}
                    color={theme.colors.red[500]}
                  />
                  <Text
                    fontSize={'sm'}
                    fontFamily={R.fonts.BeVietnamProMedium}
                    color={'red.500'}
                    ml="1">
                    Xoá
                  </Text>
                </HStack>
              </Button>
            ) : (
              <></>
            )}
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalBonusPoint;
