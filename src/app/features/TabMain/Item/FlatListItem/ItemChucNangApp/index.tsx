import React from 'react';
import { View } from 'react-native';

import R from '@assets/R';
import { HEIGHT, showToastWarn, WIDTH } from '@common';
import { SUB_NAME_UPPERCASE, WORD_PRESS_NEWS_URL } from '@env';
import ItemIconSVG from '@libcomponents/icon-svg';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { translate } from '@utils/i18n/translate';
import { MixPanelEvent, trackEvent } from '@utils/Mixpanel';
import { Pressable, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

import styles from './styles';
import { ItemTrongProps } from './type';

const ItemChucNangApp = (props: ItemTrongProps) => {
  const { customStyle, content, icon, account, item } = props;

  const onNavigate = () => {
    switch (content) {
      case translate('slink:Course_registration_results'):
        navigateScreen(APP_SCREEN.DANGKYTINCHI);

        break;
      case translate('slink:Debt'):
        navigateScreen(APP_SCREEN.CONGNO);

        break;
      case translate('slink:Product'):
        trackEvent(MixPanelEvent.SAN_PHAM_QLKH);

        navigateScreen(APP_SCREEN.SANPHAMHOATDONG, { item });

        break;
      case translate('slink:Work'):
        trackEvent(MixPanelEvent.HOAT_DONG_QLKH);

        navigateScreen(APP_SCREEN.SANPHAMHOATDONG, { item });

        break;

      case translate('slink:Smart_computer'):
        navigateScreen(APP_SCREEN.MAYTINHTHONGMINH);

        break;
      case translate('slink:HR_records'):
        navigateScreen(APP_SCREEN.HOSONHANSU);

        break;
      case translate('slink:Frequently_asked_questions'):
        navigateScreen(APP_SCREEN.CAUHOITHUONGGAP);

        break;

      case translate('slink:Overview'):
        trackEvent(MixPanelEvent.TONG_QUAN_QLKH);

        navigateScreen(APP_SCREEN.THONGKENCKH);

        break;
      case translate('slink:Statistical'):
        navigateScreen(APP_SCREEN.THONGKEQLKH);

        break;
      case translate('slink:Administrative_service'):
        navigateScreen(APP_SCREEN.KHAIBAOQUYTRINH);

        break;
      case translate('slink:Implement_the_topic'):
        navigateScreen(APP_SCREEN.THUCHIENDETAI);

        break;
      case translate('slink:BirthDayCal'):
        navigateScreen(APP_SCREEN.LICHSINHNHAT);

        break;
      case translate('slink:Library'):
        navigateScreen(APP_SCREEN.THUVIEN);

        break;
      case translate('slink:Lich_thi'):
        navigateScreen(APP_SCREEN.LICHTHI);

        break;
      case translate('slink:Feedback'):
        navigateScreen(APP_SCREEN.PHANHOI);

        break;
      case translate('slink:Scientific_and_technological_results'):
        navigateScreen(APP_SCREEN.QUANLYKHOAHOCV2);

        break;
      case translate('slink:Graduation'):
        navigateScreen(APP_SCREEN.XETTOTNGHIEP);

        break;
      case translate('slink:Personnel_organization'):
        navigateScreen(APP_SCREEN.TOCHUCNHANSU);

        break;
      case translate('slink:News'):
        navigateScreen(
          WORD_PRESS_NEWS_URL ? APP_SCREEN.TINTUCV2 : APP_SCREEN.TINTUC,
        );

        break;
      case translate('slink:Online_survey'):
        navigateScreen(APP_SCREEN.KHAOSATTRUCTUYEN);

        break;
      case translate('slink:Diem_ren_luyen'):
        navigateScreen(APP_SCREEN.DIEMRENLUYEN);

        break;
      case translate('slink:Introduce_about', {
        name: SUB_NAME_UPPERCASE,
      }):
        navigateScreen(APP_SCREEN.GIOITHIEU);

        break;

      case translate('slink:Guidelines_doc'):
        navigateScreen(APP_SCREEN.VANBANHUONGDAN);

        break;
      case translate('slink:Lop_hanh_chinh'):
        trackEvent(MixPanelEvent.XEM_LOP_HANH_CHINH);

        account?.isGiaoVien
          ? navigateScreen(APP_SCREEN.LOPHANHCHINHGV)
          : navigateScreen(APP_SCREEN.LOPHANHCHINHSV);

        break;
      case translate('slink:Learning_process'):
        navigateScreen(APP_SCREEN.TIENTRINHHOCTAP);

        break;
      case translate('slink:Lop_tin_chi'):
        navigateScreen(APP_SCREEN.LOPTINCHI);

        break;
      case translate('slink:Grade'):
        navigateScreen(APP_SCREEN.KETQUAHOCTAPMAIN);

        break;

      case translate('slink:Academy_weekly_calender'):
        navigateScreen(APP_SCREEN.LICHTUANHOCVIEN);

        break;

      case translate('slink:TimeTable'):
      case translate('slink:Calendar'):
        navigateScreen(APP_SCREEN.THOIKHOABIEUV2);

        break;
      case translate('slink:Statistics_lecture_hours'):
        navigateScreen(APP_SCREEN.THONGKEGIOGIANG);

        break;

      case translate('slink:Process_sending_for_business_trip'):
        navigateScreen(APP_SCREEN.QUATRINHCUDICONGTAC);

        break;
      case translate('slink:Process_sending_for_training'):
        navigateScreen(APP_SCREEN.QUATRINHCUDIDTBD);

        break;
      case translate('slink:Asset_declaration'):
        navigateScreen(APP_SCREEN.KEKHAITAISAN);

        break;
      case translate('slink:Year_work_plan'):
        navigateScreen(APP_SCREEN.KEHOACHNAM);

        break;
      case translate('slink:Attendance_sheet'):
        navigateScreen(APP_SCREEN.BANGCHAMCONG);

        break;
      case translate('slink:Dormitory'):
        navigateScreen(APP_SCREEN.KYTUCXA);

        break;
      case translate('slink:Dorm_register'):
        navigateScreen(APP_SCREEN.DANGKYKYTUCXA);

        break;
      case translate('slink:Infrastructure'):
        navigateScreen(APP_SCREEN.COSOVATCHAT);

        break;
      case translate('slink:Assets_and_supplies'):
        navigateScreen(APP_SCREEN.TAISANVATTU);

        break;
      case translate('slink:Asset_inventory'):
        navigateScreen(APP_SCREEN.KIEMKETAISAN);

        break;
      case translate('slink:Activity_plan'):
        navigateScreen(APP_SCREEN.KEHOACHHOATDONG);

        break;
      case translate('slink:Activity_plan_list'):
        navigateScreen(APP_SCREEN.DSKEHOACHHOATDONG);

        break;
      case translate('slink:Job'):
        navigateScreen(APP_SCREEN.CONGVIEC);

        break;
      case translate('slink:Contract'):
        navigateScreen(APP_SCREEN.HOPDONG);

        break;
      case translate('slink:Ot_table'):
        navigateScreen(APP_SCREEN.BANGLAMTHEMGIO);

        break;
      case translate('slink:Course_registration'):
        navigateScreen(APP_SCREEN.DANGKYTINCHISINHVIEN);

        break;
      case translate('slink:Su_kien'):
        navigateScreen(APP_SCREEN.SUKIENTHAMGIA);

        break;

      default:
        showToastWarn(translate('slink:On_working_func'));

        break;
    }
  };

  return (
    <Pressable
      _pressed={R.themes.pressed}
      onPress={onNavigate}
      hitSlop={R.themes.hitSlop}
      marginBottom={HEIGHT(12)}
      backgroundColor={R.colors.white}
      paddingTop={HEIGHT(16)}
      paddingBottom={HEIGHT(16)}
      borderRadius={WIDTH(8)}
      paddingRight={WIDTH(16)}
      paddingLeft={WIDTH(16)}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      style={[R.themes.shadowOffset, customStyle]}>
      <View style={styles.viewTen}>
        <ItemIconSVG
          title={String(icon)}
          color={R.colors.primaryColor}
          width={WIDTH(21)}
          height={WIDTH(21)}
        />
        <Text
          fontFamily={R.fonts.BeVietnamProMedium}
          fontSize={'md'}
          marginLeft={WIDTH(16)}
          color="black">
          {content}
        </Text>
      </View>
      <Icon name="chevron-right" size={WIDTH(24)} color={'#848A95'} />
    </Pressable>
  );
};

export default ItemChucNangApp;
