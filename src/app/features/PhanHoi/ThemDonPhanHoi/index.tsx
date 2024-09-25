/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import R from '@assets/R';
import { popupCancel, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import HeaderReal from '@libcomponents/header-real';
import LoadingComponent from '@libcomponents/loading/loading-component';
import { goBack } from '@navigation/navigation-service';
import {
  getCoCauToChuc,
  getLinhVucPhanHoi,
  guiPhanHoi,
  uploadDocument,
} from '@networking/user';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import { Box } from 'native-base';

import styles from './styles';

import SelectDonVi from '../component/SelectDonVi';
import NoiDungPhanHoi from '../component/NoiDungPhanHoi';
interface ChuDeProps {
  maDonVi: string;
  tenDonVi: string;
  tenLinhVuc: string;
}

const ThemDonPhanHoi = (props: any) => {
  const onRefresh = props?.route?.params?.onRefresh;

  const [loading, setloading] = useState(false);

  const [listDonVi, setlistDonVi] = useState<any[]>([]);

  const [listChuDe, setlistChuDe] = useState<ChuDeProps[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const responseChuDe = await getLinhVucPhanHoi();

      setlistChuDe(responseChuDe?.data?.data || []);

      const responseAPI: any = await getCoCauToChuc();

      setlistDonVi(
        responseAPI?.data?.data?.map(
          (donVi: { ten: string; maDonVi: string; _id: string }) => {
            const label = `${donVi?.ten ?? '--'} (${donVi?.maDonVi ?? '--'})`;

            return {
              label,
              value: donVi?.maDonVi ?? '',
            };
          },
        ),
      );
    } catch (error) {}
  };

  const onSend = async (data: any) => {
    try {
      setloading(true);

      let responseUpload: any[] = [];
      if (data?.dinhKem?.length > 0) {
        responseUpload = await uploadDocument(data?.dinhKem);
      }

      const body = {
        noiDungPhanHoi: data?.noiDung,
        maDonVi: data?.donVi,
        ...(responseUpload?.length === 1 && {
          urlPhanAnh: responseUpload?.[0]?.url,
        }),
        loaiPhanHoi: 'Khác',
      };

      const res = await guiPhanHoi(body);

      setloading(false);

      if (res?.status) {
        trackEvent(MixPanelEvent.GUI_PHAN_HOI);

        onRefresh();

        setTimeout(goBack, 500);
      } else {
        trackEvent(MixPanelEvent.GUI_PHAN_HOI, {
          errors:
            'User submit failt with message: ' + JSON.stringify(res?.msg ?? ''),
        });
      }
    } catch (error) {
      setloading(false);
    }
  };

  const onSubmit = async (data: any) => {
    popupCancel(
      translate('slink:Notice_t'),
      translate('slink:Want_to_send_response'),
      () => {
        onSend(data);
      },
    );
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const danhSachChuDe =
    listChuDe?.map(item => {
      return {
        label: item?.tenLinhVuc,
        value: `${item?.maDonVi}-${item?.tenLinhVuc}`,
      };
    }) || [];

  const watchValues = watch();

  if (loading) {
    <Box style={styles.container} testID="ThemDonPhanHoi">
      <HeaderReal title={translate('slink:Add_feedback')} />
      <LoadingComponent />
    </Box>;
  }
  const dataChuDe = [
    {
      label: translate('slink:Other'),
      value: translate('slink:Other'),
    },
    ...danhSachChuDe,
  ];
  return (
    <Box flex={1} backgroundColor={R.colors.backgroundColorNew}>
      <HeaderReal title={translate('slink:Add_feedback')} />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.content}>
        <SelectDonVi
          errors={errors}
          control={control}
          watchValues={watchValues}
          dataChuDe={dataChuDe}
          dataDonVi={listDonVi}
        />
        <NoiDungPhanHoi errors={errors} control={control} />
        <BaseButtonNB
          width={WIDTH(140)}
          isLoading={loading}
          isLoadingText={translate('slink:Sending')}
          onPress={handleSubmit(onSubmit)}
          title={translate('slink:Send_feedback')}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default ThemDonPhanHoi;
