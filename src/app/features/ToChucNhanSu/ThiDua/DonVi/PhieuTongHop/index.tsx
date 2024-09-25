import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import R from '@assets/R';
import { HEIGHT, showToastError, showToastSuccess, WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import MenuComponent from '@components/MenuNativeBase/MenuComponent';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import { SearchItem } from '@components/SearchAction/snack-bar-item';
import HeaderReal from '@libcomponents/header-real';
import ItemInfor from '@libcomponents/ItemTable';
import { goBack } from '@navigation/navigation-service';
import {
  donViGuiDanhGia,
  postGhiChuDonVi,
  postGhiChuNhanSu,
} from '@networking/user/DanhGiaNhanSu';
import { selectAppConfig } from '@redux-selector/app';
import { translate } from '@utils/i18n/translate';
import {
  Box,
  Collapse,
  HStack,
  Input,
  Pressable,
  Text,
  useTheme,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';

import { NhanSuProps } from '../type';
interface Props {
  route: {
    params: { dsNhanSu: NhanSuProps[]; idDot: string; onRefresh: () => void };
  };
}
interface Note {
  ghiChu?: string;
  idDot?: string;
  ssoId?: string;
}
const PhieuTongHopDG = (props: Props) => {
  const dsNhanSu = props?.route?.params?.dsNhanSu || [];

  const onRefresh = props?.route?.params?.onRefresh;

  const idDot = props?.route?.params?.idDot || '';

  const { account } = useSelector(selectAppConfig);

  const defaultValueNoteForm =
    dsNhanSu?.map(ns => {
      return { ssoId: ns?.ssoId, ghiChu: ns?.ghiChu, idDot };
    }) || [];

  const noteForm = useRef<Note[]>(defaultValueNoteForm);

  const [expand, setexpand] = useState(false);

  const [dsFilter, setDsFilter] = useState<NhanSuProps[]>(dsNhanSu);

  const [keySearch, setkeySearch] = useState('');

  const [visible, setVisible] = useState(false);

  const { control, watch } = useForm();

  const watchValues = watch();

  const tableHead = [
    translate('slink:No'),
    translate('slink:Fullname'),
    translate('slink:Self_assessment_score'),
    translate('slink:Self_assessment_classificatione'),
    translate('slink:Assessment_score'),
    translate('slink:Assessment_classificatione'),
    translate('slink:Note'),
  ];

  const widthArr = [
    WIDTH(60),
    WIDTH(120),
    WIDTH(120),
    WIDTH(120),
    WIDTH(120),
    WIDTH(120),
    WIDTH(200),
  ];

  const tableData =
    dsFilter?.map((nhanSu, ind) => {
      const dataRow = [
        <ItemInfor content={ind + 1 || '--'} key={ind} style={styles.noMg} />,
        <ItemInfor
          content={nhanSu?.hoTen || '--'}
          key={ind}
          style={styles.noMg}
        />,
        <ItemInfor
          content={nhanSu?.tongDiemCaNhan || '--'}
          key={ind}
          style={styles.noMg}
        />,
        <ItemInfor
          content={nhanSu?.phanLoaiCaNhan || '--'}
          key={ind}
          style={styles.noMg}
        />,
        <ItemInfor
          content={nhanSu?.tongDiemDonVi || '--'}
          key={ind}
          style={styles.noMg}
        />,
        <ItemInfor
          content={nhanSu?.phanLoaiDonVi || '--'}
          key={ind}
          style={styles.noMg}
        />,
        <Input
          key={ind}
          defaultValue={nhanSu?.ghiChu}
          disableFullscreenUI
          placeholder={translate('slink:Note')}
          w="90%"
          my="1"
          onChangeText={val => onConFirm(val, nhanSu?.ssoId)}
        />,
      ];

      return dataRow;
    }) || [];

  const onConFirm = (val: string, ssoId: string) => {
    const newIndex = noteForm.current?.findIndex((item: Note) => {
      return item?.ssoId === ssoId;
    });

    if (newIndex === -1) {
      noteForm.current.push({
        ghiChu: val,
        idDot,
        ssoId: ssoId,
      });
    } else {
      noteForm.current[newIndex] = {
        ghiChu: val,
        idDot,
        ssoId: ssoId,
      };
    }
  };

  const theme = useTheme();

  const onSave = async () => {
    const body = {
      ghiChu: watchValues?.ghiChu || '',
      idDot,
      ssoId: account?.ssoId,
    };

    const responseNoteNS = await postGhiChuNhanSu(noteForm);

    const responseNoteDV = await postGhiChuDonVi(body);

    if (responseNoteDV?.status && responseNoteNS?.status) {
      showToastSuccess(translate('slink:Save_success'));

      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    } else {
      showToastError(translate('slink:Send_failed'));
    }
  };

  const onSend = async () => {
    const responseSend = await donViGuiDanhGia(idDot);

    if (responseSend?.status) {
      onRefresh && onRefresh();

      setTimeout(goBack, 500);
    }
  };

  const onChangeValueSearch = async (value: string) => {
    setkeySearch(value);

    if (value?.trim() === '') {
      setDsFilter(dsNhanSu);
    } else {
      const listFilterNhanSu = dsNhanSu?.filter(item =>
        item?.hoTen
          ?.trim()
          ?.toLowerCase()
          ?.includes(value?.trim()?.toLowerCase()),
      );

      setDsFilter(listFilterNhanSu);
    }
  };

  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal
        title={translate('slink:Results_summary')}
        childrenRight={
          <RightComponent
            onSave={onSave}
            onSend={onSend}
            setVisible={setVisible}
          />
        }
      />
      <Box flex={1} paddingTop={HEIGHT(24)}>
        <Box width={WIDTH(343)} alignSelf="center" mb="4">
          <Pressable
            flexDirection={'row'}
            _pressed={R.themes.pressed}
            hitSlop={R.themes.hitSlop}
            alignItems={'center'}
            justifyContent="space-between"
            onPress={() => setexpand(!expand)}>
            <Text
              mb="2"
              fontFamily={R.fonts.BeVietnamProMedium}
              fontSize={'xs'}
              color={'black'}>
              {translate('slink:Note')}
            </Text>
            <Entypo
              style={{ marginLeft: WIDTH(16) }}
              color={theme.colors.gray[400]}
              size={WIDTH(20)}
              name={expand ? 'chevron-up' : 'chevron-down'}
            />
          </Pressable>
          <Collapse isOpen={expand}>
            <InputNBForm
              textArea
              placeholder={translate('slink:Note')}
              defaultValue={''}
              name={'ghiChu'}
              control={control}
            />
          </Collapse>
        </Box>
        <BaseTableComponent
          tableHead={tableHead}
          widthArr={widthArr}
          tableData={tableData}
          contentContainerStyle={styles.content}
        />
      </Box>
      <SearchItem
        defaultValue={keySearch}
        placeholder={translate('slink:Search')}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);

          onChangeValueSearch('');
        }}
        onChangeValue={onChangeValueSearch}
      />
    </Box>
  );
};

export default PhieuTongHopDG;
const styles = StyleSheet.create({
  content: { paddingBottom: HEIGHT(20) },
  noMg: { marginTop: 0 },
});

interface RightComponentProps {
  onSave?: () => void;
  onSend?: () => void;
  visible?: boolean;
  setVisible: (val: boolean) => void;
}
const RightComponent = (props: RightComponentProps) => {
  const { onSave, onSend, visible = true, setVisible } = props;

  const listFunction = [
    { title: translate('slink:Send_now'), onPress: onSend },
    { title: translate('slink:Save_to_send_later'), onPress: onSave },
  ];

  if (visible) {
    return (
      <HStack alignItems={'center'}>
        <Box mr={'1'}>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}>
            <Icon name="search" size={WIDTH(18)} color={'white'} />
          </TouchableOpacity>
        </Box>
        <MenuComponent listFunction={listFunction} />
      </HStack>
    );
  }

  return null;
};
