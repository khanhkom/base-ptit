/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import R from '@assets/R';
import { HEIGHT, WIDTH } from '@common';
import { WORD_PRESS_NEWS_URL } from '@env';
import ItemIconSVG from '@libcomponents/icon-svg';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import { Pressable, Text, useTheme } from 'native-base';

const ItemChucNangPB = (props: any) => {
  const { title, account } = props;

  const titleWord = title?.split(' ');

  let titleFormat = '';
  if (titleWord?.length === 4) {
    titleFormat = `${titleWord?.[0]} ${titleWord?.[1]}\n${titleWord?.[2]} ${titleWord?.[3]}`;
  } else {
    titleFormat = titleWord?.join(' ');
  }

  const goToDetail = () => {
    switch (title) {
      case translate('slink:Course_registration_results'):
        navigateScreen(APP_SCREEN.DANGKYTINCHI);

        break;
      case translate('slink:Lop_hanh_chinh'):
        trackEvent(MixPanelEvent.XEM_LOP_HANH_CHINH);

        account?.isGiaoVien
          ? navigateScreen(APP_SCREEN.LOPHANHCHINHGV)
          : navigateScreen(APP_SCREEN.LOPHANHCHINHSV);

        break;
      case translate('slink:Administrative_service'):
        navigateScreen(APP_SCREEN.KHAIBAOQUYTRINH);

        break;
      case translate('slink:TimeTable'):
      case translate('slink:Calendar'):
        navigateScreen(APP_SCREEN.THOIKHOABIEUV2);

        break;
      case translate('slink:Lop_tin_chi'):
        navigateScreen(APP_SCREEN.LOPTINCHI);

        break;
      case translate('slink:Library'):
        navigateScreen(APP_SCREEN.THUVIEN);

        break;
      case translate('slink:Debt'):
        navigateScreen(APP_SCREEN.CONGNO);

        break;
      case translate('slink:HR_records'):
        navigateScreen(APP_SCREEN.HOSONHANSU);

        break;
      case translate('slink:Personnel_organization'):
        navigateScreen(APP_SCREEN.TOCHUCNHANSU);

        break;

      case translate('slink:Statistics_lecture_hours'):
        navigateScreen(APP_SCREEN.THONGKEGIOGIANG);

        break;
      case translate('slink:Frequently_asked_questions'):
        navigateScreen(APP_SCREEN.CAUHOITHUONGGAP);

        break;
      case translate('slink:Guidelines_doc'):
        navigateScreen(APP_SCREEN.VANBANHUONGDAN);

        break;
      case translate('slink:Grade'):
        navigateScreen(APP_SCREEN.KETQUAHOCTAPMAIN);

        break;
      case translate('slink:News'):
        navigateScreen(
          WORD_PRESS_NEWS_URL ? APP_SCREEN.TINTUCV2 : APP_SCREEN.TINTUC,
        );

        break;
      case translate('slink:Academy_weekly_calender'):
        navigateScreen(APP_SCREEN.LICHTUANHOCVIEN);

        break;
      case translate('slink:BirthDayCal'):
        navigateScreen(APP_SCREEN.LICHSINHNHAT);

        break;
      case translate('slink:Feedback'):
        navigateScreen(APP_SCREEN.PHANHOI);

        break;

      default:
        break;
    }
  };

  const theme = useTheme();

  return (
    <Pressable
      _pressed={R.themes.pressed}
      alignItems="center"
      width={WIDTH(343) / 3}
      marginBottom={HEIGHT(20)}
      justifyContent="flex-start"
      onPress={goToDetail}>
      <View style={[styles.viewIcon]}>
        <ItemIconSVG
          title={title ?? ''}
          color={theme.colors.primary[500]}
          width={WIDTH(32)}
          height={WIDTH(32)}
        />
      </View>
      <Text
        fontSize="sm"
        fontFamily={R.fonts.BeVietnamProSemiBold}
        color={'black'}
        textAlign="center"
        marginTop={HEIGHT(8)}>
        {titleFormat}
      </Text>
    </Pressable>
  );
};

export default ItemChucNangPB;

const styles = StyleSheet.create({
  viewIcon: {
    width: WIDTH(60),
    height: WIDTH(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: WIDTH(8),
    backgroundColor: R.colors.white,
    ...R.themes.shadowOffset,
  },
});
