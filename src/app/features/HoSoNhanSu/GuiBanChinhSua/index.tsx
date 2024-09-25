/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { View } from 'react-native';

import R from '@assets/R';
import { popupOk, WIDTH } from '@common';
import UploadFileV2 from '@components/DynamicForm/component/UploadFileV2';
import BaseButton from '@components/Popup/BaseButton';
import HeaderReal from '@libcomponents/header-real';
import ItemIconSVG from '@libcomponents/icon-svg';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import { khoaChinhSua, uploadDocument } from '@networking/user';
import { translate } from '@utils/i18n/translate';

import styles from './styles';

const GuiBanChinhSua = (props: any) => {
  const setEdit = props?.route?.params?.setEdit;

  const infoUser = props?.route?.params?.infoUser;

  const onRefresh = props?.route?.params?.onRefresh;

  const [loading, setloading] = useState(false);

  const [listFile, setlistFile] = useState<any[]>([]);

  const onSubmit = async () => {
    try {
      setloading(true);

      const resupload: any = await uploadDocument(listFile);

      const body = { listFileUrl: [resupload?.[0]?.url] };

      const response = await khoaChinhSua(body, infoUser?._id);

      setloading(false);

      if (response?.status) {
        popupOk(
          translate('slink:Notice_t'),
          translate('hoSoNhanSu:khoaChinhSuaThanhCong'),
          () => {
            setEdit(false);

            onRefresh && onRefresh();
          },
        );
      } else {
        popupOk(
          translate('slink:Notice_t'),
          response?.msg || translate('slink:Da_co_loi_xay_ra'),
          goBack,
        );
      }
    } catch (error) {
      setloading(false);
    }
  };

  const onChange = (value: any[]) => {
    setlistFile(value);
  };

  return (
    <View style={styles.container}>
      <HeaderReal title={translate('hoSoNhanSu:guiBanChinhSua')} />
      <View style={styles.content}>
        <UploadFileV2
          isRequired
          label={translate('slink:Select_attachments')}
          singleType={true}
          changeListFile={onChange}
        />
        <BaseButton
          icon={
            <ItemIconSVG
              color={R.colors.white}
              title={'send'}
              width={WIDTH(24)}
              height={WIDTH(24)}
            />
          }
          onPress={onSubmit}
          style={styles.button}
          text={styles.textButton}
          title={translate('slink:Send')}
        />
        <LoadingComponent loading={loading} />
      </View>
    </View>
  );
};

export default GuiBanChinhSua;
