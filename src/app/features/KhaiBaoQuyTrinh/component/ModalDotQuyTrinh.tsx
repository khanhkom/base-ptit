/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import ViewTwoButton from '@components/Item/ViewTwoButton';
import SingleSelect from '@components/QuyTrinhDong/component/SingleSelect';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  createQuyTrinh,
  getQuyTrinhDong,
} from '@networking/user/KhaiBaoQuyTrinh';
import { translate } from '@utils/i18n/translate';
import { Box, Modal } from 'native-base';

import { DSKhaiBaoProps } from '../type';

const ModalDotQuyTrinh = ({
  visible,
  onClose,
  itemQuyTrinh,
  listDotQTDong,
}: {
  visible: boolean;
  itemQuyTrinh: DSKhaiBaoProps | undefined;
  onClose: () => void;
  listDotQTDong: any[];
}) => {
  useEffect(() => {
    getDataAPI();

    setidDot('');
  }, [itemQuyTrinh]);

  const [listQTDong, setlistQTDong] = useState([]);

  const [idDot, setidDot] = useState('');

  const getDataAPI = async () => {
    const responseQTDong: any = await getQuyTrinhDong();

    setlistQTDong(
      responseQTDong?.data?.data?.map((item: DSKhaiBaoProps) => {
        return { label: item?.ten, value: item?._id };
      }),
    );
  };

  const navigateChiTiet = async () => {
    const responseCreateDon: any = await createQuyTrinh(
      itemQuyTrinh?._id,
      idDot,
    );

    if (responseCreateDon?.status) {
      onClose();

      setTimeout(() => {
        navigateScreen(APP_SCREEN.CACBUOCKHAIBAO, {
          data: itemQuyTrinh,
          banGhiDon: responseCreateDon?.data?.data,
        });
      }, 500);
    }
  };

  const listDot = listDotQTDong?.map((item: any) => {
    return { label: item?.ten, value: item?._id };
  });

  return (
    <Modal isOpen={visible} backdropVisible onClose={onClose}>
      <Box backgroundColor={R.colors.white} style={[styles.containerModal]}>
        <SingleSelect
          mb={'4'}
          data={listQTDong}
          label={translate('slink:Procedure')}
          placeholder={translate('slink:Select_procedure')}
          isDisabled
          defaultValue={itemQuyTrinh?._id}
        />
        <SingleSelect
          onChangeValue={setidDot}
          data={listDot}
          label={translate('slink:Declaration_period')}
          placeholder={translate('slink:Select_declaration_period')}
        />
        <ViewTwoButton
          leftButton={onClose}
          rightButton={navigateChiTiet}
          leftButtonTitle={translate('slink:Cancel')}
          rigthButtonTitle={translate('slink:Confirm')}
        />
      </Box>
    </Modal>
  );
};

export default ModalDotQuyTrinh;

const styles = StyleSheet.create({
  containerModal: {
    borderRadius: WIDTH(8),
    width: WIDTH(343),
    alignSelf: 'center',
    paddingHorizontal: WIDTH(17),
    paddingVertical: HEIGHT(40),
    maxHeight: HEIGHT(640),
  },
});
