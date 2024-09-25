import { Platform } from 'react-native';

export const themeColor = R.colors.primaryColor;
import R from '@assets/R';

export const lightThemeColor = '#f2f7f7';

export function getTheme() {
  const disabledColor = 'grey';

  return {
    // arrows
    arrowColor: 'black',
    arrowStyle: { padding: 0 },
    // knob
    expandableKnobColor: disabledColor,
    // month
    monthTextColor: 'black',
    textMonthFontSize: 16,
    textMonthFontFamily: R.fonts.BeVietnamProMedium,
    textMonthFontWeight: 'bold' as const,
    // day names
    textSectionTitleColor: 'black',
    textDayHeaderFontSize: 15,
    textDayHeaderFontFamily: R.fonts.BeVietnamProMedium,
    textDayHeaderFontWeight: 'normal' as const,
    // dates
    dayTextColor: R.colors.black0,
    todayTextColor: themeColor,
    textDayFontSize: 15,
    textDayFontFamily: R.fonts.BeVietnamProMedium,
    textDayFontWeight: '500' as const,
    textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
    // selected date
    selectedDayBackgroundColor: themeColor,
    selectedDayTextColor: 'white',
    // disabled date
    textDisabledColor: disabledColor,
    // dot (marked date)
    dotColor: R.colors.primaryColor,
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: { marginTop: 2 },
  };
}
