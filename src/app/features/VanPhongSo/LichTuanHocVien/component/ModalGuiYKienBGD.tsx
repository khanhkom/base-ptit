import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import R from '@assets/R';
import { WIDTH } from '@common';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import ItemIconSVG from '@libcomponents/icon-svg';
import { Button, HStack, Modal, Text, useTheme } from 'native-base';

interface Props {
  turnOffModel: () => void;
  modalVisible: boolean;
}

const ModalGuiYKienBGD = (props: Props) => {
  const { turnOffModel, modalVisible } = props;

  const initialRef = React.useRef(null);

  const finalRef = React.useRef(null);

  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {}, []);

  const onSave = async () => {};

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
            {'Yêu cầu chỉnh sửa'}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <InputNBForm
            placeholder={'Gửi ý kiến'}
            name={'chuThich'}
            textArea
            control={control}
            error={errors?.chuThich?.message}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="solid" onPress={handleSubmit(onSave)}>
              <HStack alignItems={'center'}>
                <ItemIconSVG
                  color={theme.colors.white}
                  title={'send'}
                  width={WIDTH(24)}
                  height={WIDTH(24)}
                />
                <Text
                  color={'white'}
                  fontSize={'sm'}
                  fontFamily={R.fonts.BeVietnamProMedium}
                  ml="1">
                  Gửi
                </Text>
              </HStack>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalGuiYKienBGD;
