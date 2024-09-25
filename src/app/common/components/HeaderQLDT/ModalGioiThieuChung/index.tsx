/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Linking, StyleSheet } from 'react-native';

import HTML from 'react-native-render-html';

import { getLineHeight, HEIGHT } from '@common';
import TextChuaCapNhat from '@components/Item/TextChuaCapNhat';
import { htmlProps } from '@config/constant';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { ScrollView } from 'native-base';

const DEFAULT_PROPS = {
  onLinkPress: (evt: any, href: any) => {
    Linking.openURL(href);
  },
};

interface Props {
  closeButton: () => void;
  isVisible: boolean;
  gioiThieuChung?: string;
  id?: string;
  onRefresh?: () => void;
}
const ModalGioiThieuChung = (props: Props) => {
  const { closeButton, isVisible, gioiThieuChung } = props;

  // const { account } = useSelector(selectAppConfig);

  // const [isEdit, setisEdit] = useState(false);

  // const [contentGioiThieu, setcontentGioiThieu] = useState(gioiThieuChung);

  // const onPress = () => {
  //   if (isEdit) {
  //     onSave();
  //   } else {
  //     setisEdit(true);
  //   }
  // };

  // const onChange = (val: string) => {
  //   setcontentGioiThieu(val);
  // };

  // const onSave = async () => {
  //   try {
  //     const response = await capNhatGioiThieuChung(
  //       id || '',
  //       contentGioiThieu || '',
  //     );

  //     if (response?.status) {
  //       setisEdit(false);
  //     }

  //     onRefresh && onRefresh();
  //   } catch (error) {}
  // };

  return (
    <ModalCustome
      closeButton={() => {
        closeButton();

        // setisEdit(false);
      }}
      style={styles.modal}
      isVisible={isVisible}>
      {/* {isEdit ? (
        <Box borderWidth={1} borderColor={'gray.300'}>
          <TempScreen
            defaultValue={gioiThieuChung}
            placeholder={translate('slink:Enter_here')}
            onChange={onChange}
            height={HEIGHT(300)}
          />
        </Box>
      ) : gioiThieuChung ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <HTML
            {...htmlProps}
            {...DEFAULT_PROPS}
            source={{ html: gioiThieuChung || '--' }}
            baseStyle={{
              fontWeight: '600',
              lineHeight: getLineHeight(24),
            }}
          />
        </ScrollView>
      ) : (
        <TextChuaCapNhat />
      )}
      <BaseButtonNB
        hidden={!account?.isGiaoVien}
        isLoading={false}
        isLoadingText={translate('slink:Loading')}
        width={WIDTH(140)}
        onPress={onPress}
        title={isEdit ? translate('slink:Save') : translate('slink:Update')}
      /> */}
      {gioiThieuChung ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <HTML
            {...htmlProps}
            {...DEFAULT_PROPS}
            source={{ html: gioiThieuChung || '--' }}
            baseStyle={{
              fontWeight: '600',
              lineHeight: getLineHeight(24),
            }}
          />
        </ScrollView>
      ) : (
        <TextChuaCapNhat />
      )}
    </ModalCustome>
  );
};

export default ModalGioiThieuChung;

const styles = StyleSheet.create({
  modal: { paddingVertical: HEIGHT(40) },
});
