/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Keyboard,
  TextInput as RNTextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import R from '@assets/R';
import { WIDTH } from '@common';
import BaseButton from '@components/Popup/BaseButton';
import { useErrorMessageTranslation } from '@hooks';
import { HelperText } from '@libcomponents/helper-text';
import ModalCustome from '@libcomponents/modal/modal-custome';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';
import { ModalProps } from './type';

const ModalMatKhau = (props: ModalProps) => {
  const { isVisible, closeButton, onPassWord } = props;

  const [hidePass, sethidePass] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (value: any) => {
    onPassWord && onPassWord(value?.matKhau);
  };

  const message = useErrorMessageTranslation(errors?.matKhau?.message);

  return (
    <ModalCustome
      closeButton={closeButton}
      style={styles.modal}
      isVisible={isVisible}>
      <Text style={styles.title}>{'Nhập mật khẩu'}</Text>
      <View style={{}}>
        <View style={[styles.viewContent]}>
          <Controller
            control={control}
            name="matKhau"
            render={({ field: { onChange } }) => (
              <RNTextInput
                numberOfLines={1}
                secureTextEntry={hidePass}
                autoCorrect={false}
                clearButtonMode={'never'}
                autoFocus
                onBlur={() => {
                  Keyboard.dismiss();
                }}
                underlineColorAndroid={'transparent'}
                placeholder={'Nhập mật khẩu'}
                style={[styles.input]}
                onChangeText={onChange}
              />
            )}
            rules={{ required: 'Vui lòng nhập mật khẩu' }}
          />
          <TouchableOpacity onPress={() => sethidePass(!hidePass)}>
            <Entypo
              name={hidePass ? 'eye' : 'eye-with-line'}
              size={WIDTH(18)}
              color={R.colors.colorMain}
            />
          </TouchableOpacity>
        </View>
        {message !== undefined && (
          <HelperText
            visible={message !== undefined}
            msg={message ?? ''}
            type={'error'}
          />
        )}
      </View>
      <BaseButton
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        text={styles.textButton}
        title="Xác nhận"
      />
    </ModalCustome>
  );
};

export default ModalMatKhau;
