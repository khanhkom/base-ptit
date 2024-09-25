/* eslint-disable no-inline-comments */

/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-params */

import { Alert, Dimensions, Linking, Platform } from 'react-native';

import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from 'react-native-image-picker';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import R from '@assets/R';
import { showToast } from '@components/Toast';
import { ValidateMessageObject } from '@config/type';
import {
  APP_DISPLAY_NAME,
  FB_SLINK_SUPPORT,
  RATE_APP_STORE_LINK,
  RATE_GOOGLE_STORE_LINK,
} from '@env';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions, popupActions, viewImageActions } from '@redux-slice';
import { I18nKeys } from '@utils/i18n/locales';
import { translate } from '@utils/i18n/translate';
import { KEY_STORAGE, load, save } from '@utils/storage';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import { ImageSource } from 'react-native-image-viewing/dist/@types';

import { dispatch } from '../../common/redux';
import {
  CONG_VWA,
  DAY_BY_MILLISECONDS,
  DAY_IN_WEEK,
  ENhaXuatBan,
  EPhaseDeTai,
  ETrangThaiDiemDanh,
  ETrangThaiDoiLichHoc,
  FILE_TYPE,
  FILE_TYPE_ALLOW,
  FORM_FILE_TYPE,
  IS_IMAGE,
  IS_PDF,
  LOAI_SU_KIEN,
  MIME_TYPE,
  REGEX_FILE_TYPE_URL,
  STORAGE_KEY_TOKEN,
  TT_THANH_TOAN_TS,
  VAI_TRO,
} from '../constant';
// import { LoaiDoiTuongChuTri } from '@features/VanPhongSo/LichTuanHocVien/constant';

/**
 * Return list days between 2 date.
 */

const { width, height } = Dimensions.get('window');

const { width: widthScreen, height: heightScreen } = Dimensions.get('screen');

const deviceHeight = height - (initialWindowMetrics?.insets.top ?? 0);

export const responsiveHeight = (h: number): number => height * (h / 100);

export const WIDTH = (w: number): number => width * (w / 375);

export const HEIGHT = (h: number): number => deviceHeight * (h / 812);

export const WIDTH_SCREEN = (w: number): number => widthScreen * (w / 375);

export const HEIGHT_SCREEN = (h: number): number => heightScreen * (h / 812);

export const getWidth = (): number => width;

export const getHeight = (): number => height;

export const getLineHeight = (f: number): number => f;

export const getFontSize = (fontSize: number) => fontSize;

export const getHighAbsolute = (h: number): number => height * (h / 812);

export const pad2 = (number: number) => String(number).padStart(2, '0');

export const getInsetVertical = (): number =>
  (initialWindowMetrics?.insets.top || 0) +
  (initialWindowMetrics?.insets.bottom || 0);

export const FuntionAler = (
  notice?: any,
  content?: string,
  onPressCan?: () => void,
  onPressOk?: () => void,
  textCancel?: string,
  textOK?: string,
  styleCancel?: 'default' | 'cancel' | 'destructive' | undefined,
  styleOK?: 'default' | 'cancel' | 'destructive' | undefined,
) => {
  Alert.alert(
    notice,
    content,
    [
      {
        style: styleCancel,
        text: textCancel || translate('slink:Cancel'),
        onPress: () => {
          onPressCan && onPressCan();
        },
      },
      {
        style: styleOK,
        text: textOK || translate('slink:Agree'),
        onPress: () => {
          onPressOk && onPressOk();
        },
      },
    ],
    { cancelable: false },
  );
};

function daysFromTo(a: Moment | Date, b: Moment | Date) {
  const days: any = [];

  // convert moment to time. moment().getTime()
  let localFrom = +a;
  const localTo = +b;

  for (
    ;
    localFrom <= localTo;
    localFrom = moment(localFrom).add(1, 'day').toDate().getTime()
  ) {
    days.push(moment(localFrom));
  }

  return days;
}

/**
 * Return list days in month
 */
function daysInMonth(_date: string | Date | Moment | number) {
  const date = moment(_date).toDate();

  const year = date.getFullYear();

  const month = date.getMonth();

  const days = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1, 0, 0, 0);

  const lastDay = new Date(year, month, days, 0, 0, 0);

  return daysFromTo(firstDay, lastDay);
}

/**
 * Get list days by month. Maybe has pre month, next month.
 */
export function getDaysByMonth(
  mDate: string | Date | Moment | number,
  firstDayOfWeek: number,
  showSixWeeks?: boolean,
) {
  const days = daysInMonth(mDate);

  let before: Moment[] = [];
  let after: Moment[] = [];
  // calculate first day of week(ex: firstDayOfWeek > 7)
  const fdow = (7 + firstDayOfWeek) % 7 || 7;

  // calculate last day of week by first day of week
  const ldow = (fdow + 6) % 7;

  const from = moment(days[0]);

  const daysBefore = from.day();

  if (from.day() !== fdow) {
    // subtract if current date not equals first day of week
    from.add(-(from.day() + 7 - fdow) % 7, 'day');
  }

  const to = moment(days[days.length - 1]);

  const day = to.day();

  if (day !== ldow) {
    // add if lasted date not equals last day of week
    to.add((ldow + 7 - day) % 7, 'day');
  }

  const daysForSixWeeks = (daysBefore + days.length) / 6 >= 6;

  // check size days pluss days before divide 6 enough or not 6 weeks
  if (showSixWeeks && !daysForSixWeeks) {
    to.add(7, 'day');
  }

  if (from.isBefore(moment(days[0]), 'days')) {
    before = daysFromTo(from, days[0]);
  }

  // eslint-disable-next-line no-constant-condition
  if ((to.isAfter(days[days.length - 1]), 'days')) {
    after = daysFromTo(days[days.length - 1], to);
  }

  return before.concat(
    days.slice(before.length > 0 ? 1 : 0, days.length - 1),
    after,
  );
}

/**
 * Get time ago like facebook. (ex: a day ago).
 */
export function getTimeDifference(date: Date | string): {
  count: number | null;
  tx: string;
} {
  const timeDifference = moment().diff(moment.utc(date).local(), 'seconds');

  const yearTime = 60 * 60 * 24 * 365;

  const monthTime = 60 * 60 * 24 * 30;

  const dayTime = 60 * 60 * 24;

  const hourTime = 60 * 60;

  const minutesTime = 60;

  const yearCalculator = Math.floor(timeDifference / yearTime);

  const monthCalculator = Math.floor(timeDifference / monthTime);

  const dayCalculator = Math.floor(timeDifference / dayTime);

  const hourCalculator = Math.floor(timeDifference / hourTime);

  const minutesCalculator = Math.floor(timeDifference / minutesTime);

  switch (true) {
    case yearCalculator > 1:
      return { count: yearCalculator, tx: 'txYearsAgo' };
    case yearCalculator > 0:
      return { count: yearCalculator, tx: 'txYearAgo' };

    case monthCalculator > 1:
      return { count: monthCalculator, tx: 'txMonthsAgo' };
    case monthCalculator > 0:
      return { count: monthCalculator, tx: 'txMonthAgo' };

    case dayCalculator > 1:
      return { count: dayCalculator, tx: 'txDaysAgo' };
    case dayCalculator > 0:
      return { count: dayCalculator, tx: 'txDayAgo' };

    case hourCalculator > 1:
      return { count: hourCalculator, tx: 'txHoursAgo' };
    case hourCalculator > 0:
      return { count: hourCalculator, tx: 'txHourAgo' };

    case minutesCalculator > 1:
      return { count: minutesCalculator, tx: 'txMinutesAgo' };
    case minutesCalculator > 0:
      return { count: minutesCalculator, tx: 'txMinuteAgo' };

    case timeDifference > 1:
      return { count: timeDifference, tx: 'txSecondsAgo' };

    default:
      return { count: null, tx: 'txFewSecondsAgo' };
  }
}

export const dayBetweenRange = ({
  endDate,
  startDate,
  format = 'DD/MM/YYYY',
}: {
  startDate?: string;
  endDate?: string;
  format?: string;
}) => {
  const mStartDate = moment(startDate, format);

  const mEndDate = moment(endDate, format);

  return mEndDate.diff(mStartDate, 'days') + 1;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const createWithPhoto = (photo: Array<any>, body: any) => {
  const data = new FormData();

  if (Array.isArray(photo)) {
    photo.forEach(element => {
      data.append('image[]', {
        name: element.node.image.filename,
        uri: element.node.image.uri,
        type: element.node.type,
      } as any);
    });
  }

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export { createWithPhoto };

type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export const onShowErrorBase = (msg: string) => {
  Alert.alert(msg);
};

export const onCheckType = (
  source: any,
  type: TypesBase,
): source is TypesBase => {
  return typeof source === type;
};

export const checkKeyInObject = (T: Record<string, unknown>, key: string) => {
  return Object.keys(T).includes(key);
};

export const propsToStyle = (arrStyle: Array<any>) => {
  return arrStyle.filter(
    x => x !== undefined && !Object.values(x).some(v => v === undefined),
  );
};

/**
 * return true when success and false when error
 */
export const validResponse = (
  response: ResponseBase<any>,
): response is ResponseBase<any, true> => {
  if (!response.status) {
    // TODO: handle error
    return false;
  }

  return true;
};

export const execFunc = <Fn extends (...args: any[]) => any>(
  func?: Fn,
  ...args: Parameters<Fn>
) => {
  if (onCheckType(func, 'function')) {
    func(...args);
  }
};

export const isIos = Platform.OS === 'ios';

export const logout = async () => {
  save(STORAGE_KEY_TOKEN, null);

  save(KEY_STORAGE.ACCOUNT, null);

  save(KEY_STORAGE.BIRTH_DAY, null);

  dispatch(appActions.logout());
};

export const handleErrorApi = (response: any) => {
  const result = {
    status: false,
    code: response?.status,
    msg: '',
    errorCode: response?.data?.errorCode,
  };

  if (response?.status > 505) {
    result.msg =
      response?.data?.errorDescription ?? translate('error:server_error');

    return result;
  }

  if (response?.status < 500 && response?.status >= 418) {
    result.msg =
      response?.data?.errorDescription ?? translate('error:error_on_request');

    return result;
  }

  result.msg =
    response?.data?.message ??
    response?.data?.errorDescription ??
    translate(('error:' + response?.status) as I18nKeys);

  return result;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const rxEmail = new RegExp(
  '^[a-zA-Z0-9]+([%\\^&\\-\\=\\+\\,\\.]?[a-zA-Z0-9]+)@[a-zA-Z]+([\\.]?[a-zA-Z]+)*(\\.[a-zA-Z]{2,3})+$',
);

export const rxPassword =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])(?!.*['"]).{8,}$/;

export const rxNumber = /[^\d]+/g;

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;

const guidelineBaseHeight = 812;

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;

export const sizeScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const sizeVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const trimArray = (sourceArr: Array<unknown> = []): Array<unknown> => {
  return sourceArr.map((element: any) => {
    if (Array.isArray(element)) {
      return trimArray(element);
    }

    switch (typeof element) {
      case 'string':
        return element.trim();
      case 'object':
        return trimObject(element);

      default:
        return element;
    }
  });
};

export const trimObject = (source: any) => {
  if (!source) {
    return source;
  }

  const newObject = source;

  Object.keys(newObject).forEach((key: string) => {
    if (Array.isArray(newObject[key])) {
      newObject[key] = trimArray(newObject[key]);
    }

    if (typeof newObject[key] === 'string') {
      newObject[key] = newObject[key].trim();
    }

    if (typeof newObject[key] === 'object') {
      newObject[key] = trimObject(newObject[key]);
    }
  });

  return newObject;
};

interface ResultHandleTagToArrayText {
  text: string;
  bold: boolean;
}

export const onHandleTagToArrayText = (
  source = '',
  char = '#',
): Array<ResultHandleTagToArrayText> => {
  const textSplit = source.split(' ');

  const arrText: ResultHandleTagToArrayText[] = [];

  textSplit.forEach((text: string, i: number) => {
    const textData = { text: text, bold: false };

    if (text[0] === char) {
      textData.bold = true;

      arrText.push(textData);
    } else {
      arrText.push({ text: text, bold: false });
    }

    if (
      (text === '' && i !== textSplit.length - 1) ||
      i !== textSplit.length - 1
    ) {
      arrText.push({ text: ' ', bold: false });
    }
  });

  return arrText;
};

export const checkPasswordContainUserName = (
  username: string,
  password: string,
) => {
  const numConsecutiveChars = 3;

  // first find all combinations that should not be found in password
  const invalidCombinations: any[] = [];

  for (let i = 0; i < username.length - numConsecutiveChars; i++) {
    const curCombination = username[i] + username[i + 1] + username[i + 2];

    invalidCombinations.push(curCombination);
  }

  // now check all invalidCombinations
  let invalid = false;
  for (const curCombination of invalidCombinations) {
    if (password.indexOf(curCombination) !== -1) {
      invalid = true;

      break;
    }
  }

  return invalid;
};

/**
 * @param keyT key of i18n
 * @param options object translate parameter
 * @param optionsTx object translate parameter will translate before set to option base. see detail bellow
 * ex: json file : {"field":{"email":"Email"},"msg":{"msg1":"{{fieldName}} is required"}}
 * => optionsTx = {fieldName:"field:email"}
 * fieldName must translate with i18n
 * so fieldName option will be push on optionsTx
 * This will support translate Option on translate
 * Read hook useErrorMessageTranslation
 */
export const stringifyObjectValidate = ({
  keyT,
  options,
  optionsTx,
}: ValidateMessageObject) => {
  return JSON.stringify({
    keyT,
    options,
    optionsTx,
  });
};

export const getBookmarkColorByGrade = (grade: string | number) => {
  switch (grade) {
    case 'A+':
    case 'A':
    case 'B+':
    case 'B':
    case 'P':
      return 'rgba(57, 149, 0, 1)';
    case 'C+':
    case 'C':
    case 'D+':
    case 'D':
      return 'rgba(255, 175, 11, 1)';
    case 'F':
      return 'rgba(169, 11, 0, 1)';

    default:
      return 'rgba(171, 171, 171, 0.4)';
  }
};

export const compareFunction = (a: any, b: any) => {
  const timeA = new Date(a.thoiGianBatDau).getTime();

  const timeB = new Date(b.thoiGianBatDau).getTime();

  if (
    moment(a.thoiGianBatDau).format('HH:mm DD/MM/YYYY') ===
    moment(b.thoiGianBatDau).format('HH:mm DD/MM/YYYY')
  ) {
    return (
      new Date(a.thoiGianKetThuc).getTime() -
      new Date(b.thoiGianKetThuc).getTime()
    );
  } else {
    return timeA - timeB;
  }
};

export const tenGiangVien = (account: { hoDem?: string; ten?: string }) => {
  if (account?.hoDem && account?.ten) {
    return `${account?.hoDem} ${account?.ten}`;
  }

  if (account?.ten) {
    return `${account?.ten}`;
  }

  if (account?.hoDem) {
    return `${account?.hoDem}`;
  }

  return translate('slink:Chua_cap_nhat');
};

export const tenNguoiDung = (account: any) => {
  if (account?.isGiaoVien) {
    return tenGiangVien(account);
  }

  return account?.ten ?? '--';
};

export const avatarUser = (account: any) => {
  if (account?.isGiaoVien) {
    if (account?.urlAnhDaiDien) {
      return { uri: account?.urlAnhDaiDien };
    }

    if (account?.gioiTinh === 'Nữ') {
      return R.images.giangVienNu;
    }

    return R.images.giangVienNam;
  }

  if (account?.anhDaiDienUrl) {
    return { uri: account?.anhDaiDienUrl };
  }

  if (account?.gioiTinh === 'Nữ') {
    return R.images.sinhVienNu;
  }

  return R.images.sinhVienNam;
};

export const convertDiemHe10SangHe4 = (score: string | number) => {
  const scoreValue = Number(score);

  if (scoreValue >= 9.0 && scoreValue <= 10) {
    return '4';
  } else if (scoreValue >= 8.5 && scoreValue <= 8.9) {
    return '3.7';
  } else if (scoreValue >= 8.0 && scoreValue <= 8.4) {
    return '3.5';
  } else if (scoreValue >= 7.0 && scoreValue <= 7.9) {
    return '3';
  } else if (scoreValue >= 6.5 && scoreValue <= 6.9) {
    return '2.5';
  } else if (scoreValue >= 5.5 && scoreValue <= 6.4) {
    return '2';
  } else if (scoreValue >= 5.0 && scoreValue <= 5.4) {
    return '1.5';
  } else if (scoreValue >= 4.0 && scoreValue <= 4.9) {
    return '1';
  } else if (scoreValue >= 0 && scoreValue < 4) {
    return '0';
  } else {
    return '--';
  }
};

export const getStatusColorByTrangThaiTT = (status: string) => {
  switch (status) {
    case TT_THANH_TOAN_TS.CHUA_THANH_TOAN_DU:
      return R.colors.primaryColor;
    case TT_THANH_TOAN_TS.DA_THANH_TOAN_DU:
      return R.colors.color219653;
    case TT_THANH_TOAN_TS.THANH_TOAN_THUA:
      return R.colors.color219653;

    default:
      return R.colors.primaryColor;
  }
};

export const sortName = (a: string, b: string) => {
  const lastnameA = _.get(a, 'sinhVien.hoTen', '')
    .toLowerCase()
    .split(' ')
    .slice(-1)
    .join(' ');

  const lastnameB = _.get(b, 'sinhVien.hoTen', '')
    .toLowerCase()
    .split(' ')
    .slice(-1)
    .join(' ');

  const compare = lastnameA.localeCompare(lastnameB, 'en', {
    sensitivity: 'base',
  });

  return compare;
};

export const deepCloneObject = (data: any) => JSON.parse(JSON.stringify(data));

export function sortDay(a: { ngaySinh: string }, b: { ngaySinh: string }) {
  const [ngayA, thangA] = a.ngaySinh.split('-').slice(2);

  const [ngayB, thangB] = b.ngaySinh.split('-').slice(2);

  if (thangA < thangB || (thangA === thangB && ngayA < ngayB)) {
    return -1;
  }

  if (thangB < thangA || (thangA === thangB && ngayB < ngayA)) {
    return 1;
  }

  return 0;
}

export const getVaiTroSlink = (role: string) => {
  switch (role) {
    case CONG_VWA.CONG_HOC_VIEN:
      return VAI_TRO.SINH_VIEN;
    case CONG_VWA.CONG_CAN_BO:
      return VAI_TRO.CAN_BO;

    default:
      return VAI_TRO.SINH_VIEN;
  }
};

export function convertEventsToList(events: any[]) {
  const eventList: any = {};

  events.forEach(event => {
    const startDate = new Date(
      moment(event.thoiGianBatDau).startOf('date').toString(),
    );

    const endDate = new Date(
      moment(event.thoiGianKetThuc).endOf('date').toString(),
    );

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const dateString = moment(date).format('YYYY-MM-DD');

      if (!eventList[dateString]) {
        eventList[dateString] = [];
      }

      eventList[dateString].push(event);
    }
  });

  return eventList;
}

export const checkError = (str: string) => {
  if (_.isUndefined(str) || _.isNull(str)) {
    return true;
  } else if (str.length === 0) {
    return true;
  } else {
    return false;
  }
};

export const validatePhone = (str: any) => {
  let valid = false;
  for (let i = 0; i < str.length - 1; i++) {
    if (str.charAt(i) !== str.charAt(i + 1)) {
      valid = true;

      break;
    }
  }

  const reg = /^0[3-9]{1}\d{8}/;

  if (reg.test(str) && valid) {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z+\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const validateCMND = (cmnd: string) => {
  const re = new RegExp('^[0-9]{9}$|^[0-9]{12}$');

  return re.test(String(cmnd).toLowerCase());
};

const DAY: Array<number> = [];

DAY[1] = 0;

DAY[2] = 1;

DAY[3] = 2;

DAY[4] = 3;

DAY[5] = 4;

DAY[6] = 5;

DAY[0] = 6;

export function countDistinctID(arr: any[]) {
  const count: any = {};

  let distinctCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (!count[arr[i].idHang]) {
      count[arr[i].idHang] = 1;

      distinctCount++;
    }
  }

  return distinctCount;
}

export const getFileExtension = (filePath = ''): string | undefined => {
  return getFileName(filePath)?.split('.').pop();
};

export const getFileName = (
  filePath = '',
  withoutExtension = false,
  defaultName = 'file',
): string | undefined => {
  const fileName = filePath?.split(/(\\|\/)/g).pop() || defaultName;

  if (withoutExtension) {
    if (fileName.lastIndexOf('.') > -1) {
      return fileName.substr(0, fileName.lastIndexOf('.'));
    }
  }

  return fileName;
};

export const getExtensionFromMime = (mime: string) => {
  const ext = '';

  for (const mimeTypesObj of Object.values(MIME_TYPE)) {
    for (const mimeType of Object.values(mimeTypesObj)) {
      if (mime === mimeType.type) {
        return mimeType.ext;
      }
    }
  }

  return ext;
};

export const formatCurrency = (price: number) =>
  price?.toFixed(0)?.replace(/(\d)(?=(\d{3})+$)/g, '$1.');

export const formatVND = (price: number) => {
  const vnd = price?.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$1.');

  return `${vnd} VNĐ`;
};

export const formatTien = (price: number) => {
  const vnd = price?.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$1.');

  return `${vnd}`;
};

export const popupOk = (title: string, msg: string, onPress?: () => void) => {
  dispatch(
    popupActions.setPopupOK({
      isVisible: true,
      title,
      content: msg,
      onPress,
      type: true,
    }),
  );
};

export const popupCancel = (
  title: string,
  msg: string,
  onPress: () => void = () => null,
  onPressCancel: () => void = () => null,
) => {
  dispatch(
    popupActions.setPopupCancel({
      isVisible: true,
      title,
      content: msg ?? '',
      onPress,
      onPressCancel,
      type: false,
    }),
  );
};

export const showImage = (
  image: {
    source: ImageSource;
    title: string;
  }[],
  index?: number,
) => {
  dispatch(
    viewImageActions.setviewImage({
      isVisible: true,
      image,
      index,
    }),
  );
};

export const getNameAllowFileType = (typeList = []) => {
  typeList = typeList?.filter(
    item => item === FORM_FILE_TYPE.IMAGE || item === FORM_FILE_TYPE.pdf,
  );

  if (typeList.length > 0) {
    return typeList.map(type => {
      switch (type) {
        case FORM_FILE_TYPE.IMAGE:
          return FILE_TYPE_ALLOW.IMAGE;
        case FORM_FILE_TYPE.pdf:
          return FILE_TYPE_ALLOW.DOCUMENT;

        default:
          return FILE_TYPE_ALLOW.ALL;
      }
    });
  }

  return FILE_TYPE_ALLOW.ALL;
};

export const getAllowFileType = (typeList = []) => {
  if (typeList.length > 0) {
    return typeList
      .map(type => {
        switch (type) {
          case FORM_FILE_TYPE.IMAGE:
            return DocumentPicker.types.images;
          case FORM_FILE_TYPE.pdf:
            return DocumentPicker.types.pdf;
          case FORM_FILE_TYPE.doc:
          case FORM_FILE_TYPE.docx:
            return [DocumentPicker.types.docx, DocumentPicker.types.doc];

          default:
            return [
              DocumentPicker.types.images,
              DocumentPicker.types.pdf,
              DocumentPicker.types.xlsx,
              DocumentPicker.types.pptx,
              DocumentPicker.types.docx,
            ];
        }
      })
      ?.flat();
  }

  return [
    DocumentPicker.types.images,
    DocumentPicker.types.pdf,
    DocumentPicker.types.xlsx,
    DocumentPicker.types.pptx,
    DocumentPicker.types.docx,
  ];
};

export const checkTypeFile = (type: string) => {
  if (
    type.replace(REGEX_FILE_TYPE_URL, '') === FILE_TYPE.JPEG ||
    type.replace(REGEX_FILE_TYPE_URL, '') === FILE_TYPE.PNG ||
    type.replace(REGEX_FILE_TYPE_URL, '') === FILE_TYPE.PDF ||
    type.replace(REGEX_FILE_TYPE_URL, '') === FILE_TYPE.JPG ||
    type.replace(REGEX_FILE_TYPE_URL, '') === FILE_TYPE.DOCX ||
    type.replace(REGEX_FILE_TYPE_URL, '') === FILE_TYPE.DOC ||
    type.replace(REGEX_FILE_TYPE_URL, '') === FILE_TYPE.EXCEL ||
    type.replace(REGEX_FILE_TYPE_URL, '') === FILE_TYPE.POWERPOINT
  ) {
    return true;
  } else {
    return false;
  }
};

export const getFileType = (mimeType: any) => {
  const type = mimeType?.split('/');

  return type?.[1] ?? '';
};

export const checkDVHC = (value: any, level: number) => {
  switch (level) {
    case 1:
      return value?.maTinh !== '' && value?.tenTinh !== '';
    case 2:
      return (
        value?.maTinh !== '' &&
        value?.tenTinh !== '' &&
        value?.maQuanHuyen !== '' &&
        value?.tenQuanHuyen !== ''
      );
    case 3:
      return (
        value?.maTinh !== '' &&
        value?.tenTinh !== '' &&
        value?.maQuanHuyen !== '' &&
        value?.tenQuanHuyen !== '' &&
        value?.maPhuongXa !== '' &&
        value?.tenPhuongXa !== ''
      );
    case 4:
      return (
        value?.maTinh !== '' &&
        value?.tenTinh !== '' &&
        value?.maQuanHuyen !== '' &&
        value?.tenQuanHuyen !== '' &&
        value?.maPhuongXa !== '' &&
        value?.tenPhuongXa !== '' &&
        !_.isNil(value?.soNhaTenDuong) &&
        value?.soNhaTenDuong !== ''
      );

    default:
      return value?.maTinh !== '' && value?.tenTinh !== '';
  }
};

export const convertNumberScoreToAlphabet = (score: string | number) => {
  const scoreValue = Number(score);

  if (scoreValue >= 9.0 && scoreValue <= 10) {
    return 'A+';
  } else if (scoreValue >= 8.5 && scoreValue <= 8.9) {
    return 'A';
  } else if (scoreValue >= 8.0 && scoreValue <= 8.4) {
    return 'B+';
  } else if (scoreValue >= 7.0 && scoreValue <= 7.9) {
    return 'B';
  } else if (scoreValue >= 6.5 && scoreValue <= 6.9) {
    return 'C+';
  } else if (scoreValue >= 5.5 && scoreValue <= 6.4) {
    return 'C';
  } else if (scoreValue >= 5.0 && scoreValue <= 5.4) {
    return 'D+';
  } else if (scoreValue >= 4.0 && scoreValue <= 4.9) {
    return 'D';
  } else if (scoreValue >= 0 && scoreValue < 4) {
    return 'F';
  } else {
    return '--';
  }
};

export const findArraryObject = (
  entireObj: any[],
  keyToFind: string,
  valToFind: string,
) => {
  const arrFoundObj: any = [];

  JSON.stringify(entireObj, (_, nestedValue) => {
    if (nestedValue && nestedValue?.[keyToFind] === valToFind) {
      arrFoundObj.push(nestedValue);
    }

    return nestedValue;
  });

  return arrFoundObj;
};

export const getStatusPaymentColorByValue = (status: string) => {
  switch (status) {
    case TT_THANH_TOAN_TS.CHUA_THANH_TOAN_DU:
      return 'yellow';
    case TT_THANH_TOAN_TS.THANH_TOAN_THIEU:
    case TT_THANH_TOAN_TS.CHUA_THANH_TOAN:
    case TT_THANH_TOAN_TS.DONG_THANH_TOAN:
      return 'red';
    case TT_THANH_TOAN_TS.DA_THANH_TOAN_DU:
      return 'green';
    case TT_THANH_TOAN_TS.THANH_TOAN_THUA:
      return 'default';

    default:
      return 'green';
  }
};

export function toTitleCase(sentence: string) {
  const words = sentence.split(' ');

  const capitalizedWords = words.map(word => {
    if (word.length > 0) {
      const firstLetter = word.charAt(0).toUpperCase();

      const restOfString = word.slice(1).toLowerCase();

      return firstLetter + restOfString;
    } else {
      return word;
    }
  });

  return capitalizedWords.join(' ');
}

export const findObject = (
  entireObj: any,
  keyToFind: string,
  valToFind: string,
) => {
  let foundObj: any;
  JSON.stringify(entireObj, (_, nestedValue) => {
    if (nestedValue && nestedValue[keyToFind] === valToFind) {
      foundObj = nestedValue;
    }

    return nestedValue;
  });

  return foundObj ?? null;
};

// return day in milliseconds
export const getFirstDayAndLastDayInWeek = () => {
  const currentDayStart = new Date(
    `${moment(new Date()).format('YYYY-MM-DD')} 00:00`,
  );

  const currentDayEnd = new Date(
    `${moment(new Date()).format('YYYY-MM-DD')} 23:59`,
  );

  const firstDayInWeek =
    currentDayStart.getTime() -
    (currentDayStart.getDay() - DAY_IN_WEEK.MON) * DAY_BY_MILLISECONDS;

  const lastDayInWeek =
    currentDayEnd.getTime() +
    (DAY_IN_WEEK.SUN - currentDayEnd.getDay()) * DAY_BY_MILLISECONDS;

  return {
    firstDayInWeek,
    lastDayInWeek,
  };
};

export function decodeHTMLEntities(text: string) {
  return text.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
}

export const openGallery = (funcCallBack: any) => {
  const options: any = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
      img: [
        {
          url: '',
          freeHeight: true,
        },
      ],
    },
    selectionLimit: 1,
    quality: 0.8,
    mediaType: 'photo',
  };

  ImagePicker.launchImageLibrary(options, (response: any) => {
    if (response?.didCancel) {
    } else if (response?.errorMessage) {
    } else {
      const imageType = response?.assets[0].type;

      if (isImageTypeSupported(imageType)) {
        const itemImage = {
          url:
            Platform.OS === 'android'
              ? response?.assets[0].uri
              : response?.assets[0].uri?.replace('file://', ''),
          mimetype: response?.assets[0].type,
          filename: response?.assets[0].fileName || response?.assets[0].uri,
        };

        funcCallBack && funcCallBack(itemImage);
      } else {
        popupOk(
          translate('slink:Notice_t'),
          translate('slink:Da_co_loi_xay_ra'),
        );
      }
    }
  });
};

export const isImageTypeSupported = (mimeType?: string) => {
  const mediaTypesSupported = Object.values(MIME_TYPE.image).map(
    item => item.type,
  );

  return !!mimeType && mediaTypesSupported.includes(mimeType);
};

export const popupCancelThanhToan = (
  title: string,
  msg: string,
  onPress?: () => void,
  onCancel?: () => void,
) => {
  Alert.alert(
    title,
    msg,
    [
      {
        text: 'Chưa thanh toán',
        style: 'cancel',
        onPress: onCancel || (() => null),
      },
      {
        text: 'Đã thanh toán',
        onPress: onPress || (() => null),
      },
    ],
    { cancelable: false },
  );
};

export const roundNumberWith2DigitsAfterComma = (number: number) => {
  const numPart = String(number)?.split('.');

  return numPart?.[1]?.length > 2 ? Number(number).toFixed(2) : number;
};

//Quản lý khoa học
export const getTrangThaiPhase = (data: any) => {
  switch (data?.phaseDeTaiKhcn) {
    case EPhaseDeTai.DANG_KY:
      return data?.trangThaiDangKy ?? '';
    case EPhaseDeTai.XET_DUYET_DANG_KY:
      return data?.trangThaiXetDuyetDangKy ?? '';
    case EPhaseDeTai.NOP_DE_CUONG:
      return data?.trangThaiNopDeCuong ?? '';
    case EPhaseDeTai.XET_DUYET_DE_CUONG:
      return data?.trangThaiXetDuyetDeCuong ?? '';
    case EPhaseDeTai.THUC_HIEN:
      return data?.trangThaiThucHien ?? '';
    case EPhaseDeTai.NGHIEM_THU:
      return data?.trangThaiNghiemThu ?? '';
    case EPhaseDeTai.SAU_NGHIEM_THU:
      return data?.hoanThanh ? 'Đã hoàn thành' : 'Chưa hoàn thành';

    default:
      return '--';
  }
};

export const bodyNXB = (type: string) => {
  switch (type) {
    case ENhaXuatBan.TRONG_NUOC:
      return {
        isNxbQuocTe: false,
        loaiNXB: 'TRONG_NUOC',
      };
    case ENhaXuatBan.QUOC_TE:
      return {
        isNxbQuocTe: true,
        isNxbUyTin: false,
        loaiNXB: 'QUOC_TE',
      };
    case ENhaXuatBan.QUOC_TE_UY_TIN:
      return {
        isNxbQuocTe: true,
        isNxbUyTin: true,
        loaiNXB: 'QUOC_TE_UY_TIN',
      };

    default:
      break;
  }
};

export const loaiNXB = (data: {
  isNxbQuocTe: boolean;
  isNxbUyTin: boolean;
}) => {
  if (data?.isNxbQuocTe && data?.isNxbUyTin) {
    return ENhaXuatBan.QUOC_TE_UY_TIN;
  }

  if (data?.isNxbQuocTe) {
    return ENhaXuatBan.QUOC_TE;
  }

  return ENhaXuatBan.TRONG_NUOC;
};

export const infoDiemDanh = (type: ETrangThaiDiemDanh) => {
  switch (type) {
    case ETrangThaiDiemDanh.CHUA_DIEM_DANH:
      return { label: translate('slink:No_attendance_yet'), type: 'red' };
    case ETrangThaiDiemDanh.CO_MAT:
      return { label: translate('slink:Attendance'), type: 'green' };
    case ETrangThaiDiemDanh.DA_DIEM_DANH:
      return {
        label: translate('slink:Attendance_has_been_taken'),
        type: 'green',
      };
    case ETrangThaiDiemDanh.VANG_CO_PHEP:
      return {
        label: translate('slink:Absence_with_permission'),
        type: 'yellow',
      };
    case ETrangThaiDiemDanh.VANG_KHONG_PHEP:
      return {
        label: translate('slink:Absence_without_permission'),
        type: 'yellow',
      };
    case ETrangThaiDiemDanh.MUON_VE_SOM:
      return {
        label: translate('slink:Back_early'),
        type: 'blue',
      };

    default:
      return { label: translate('slink:No_attendance_yet'), type: 'red' };
  }
};

export const infoDoiLichHoc = (type: ETrangThaiDoiLichHoc) => {
  switch (type) {
    case ETrangThaiDoiLichHoc.CHAP_NHAN:
      return {
        label: 'Chấp nhận',
        type: 'success',
      };
    case ETrangThaiDoiLichHoc.CHUA_DUYET:
      return {
        label: 'Chưa duyệt',
        type: 'info',
      };
    case ETrangThaiDoiLichHoc.TU_CHOI:
      return {
        label: 'Từ chối',
        type: 'error',
      };

    default:
      return { label: 'Chưa duyệt', type: 'info' };
  }
};

export function filterObject(
  originalObject: { [key: string]: string },
  keysToKeep: string[],
) {
  return Object.fromEntries(
    Object.entries(originalObject).filter(([key]) => keysToKeep.includes(key)),
  );
}

export const showLink = (item: any, title?: string) => {
  let fileType: string;
  if (typeof item === 'string') {
    fileType = item?.replace(REGEX_FILE_TYPE_URL, '');
  } else {
    fileType = item?.type
      ? item?.type
      : item?.mimetype
      ? getFileType(item?.mimetype)
      : item?.uri?.replace(REGEX_FILE_TYPE_URL, '') ||
        item?.url?.replace(REGEX_FILE_TYPE_URL, '');
  }

  const link = item?.uri || item?.url || item || '';

  if (IS_PDF?.includes(fileType)) {
    navigateScreen(APP_SCREEN.SEEPDF, {
      content: {
        title: translate('slink:See_details'),
        sourcePDF: link,
      },
    });
  } else if (IS_IMAGE?.includes(fileType)) {
    showImage([{ source: { uri: link }, title: title || '' }]);
  } else {
    Linking.canOpenURL(link)
      .then(supported => {
        if (supported) {
          Linking.openURL(link);
        } else {
          showToast({
            msg: translate('slink:Cannot_open_file'),
            interval: 4000,
            type: 'warning',
          });
        }
      })
      .catch(() => {
        showToast({
          msg: translate('slink:Cannot_open_file'),
          interval: 4000,
          type: 'warning',
        });
      });
  }
};

export const showToastError = (msg: string) => {
  if (msg) {
    showToast({
      msg,
      interval: 4000,
      type: 'error',
    });

    return;
  }

  return;
};

export const showToastWarn = (msg: string) => {
  if (msg) {
    showToast({
      msg,
      interval: 4000,
      type: 'warning',
    });

    return;
  }

  return;
};

export const showToastSuccess = (msg: string) => {
  if (msg) {
    showToast({
      msg,
      interval: 4000,
      type: 'success',
    });

    return;
  }

  return;
};

export const renderAvaSV = (user: {
  urlAnhDaiDien?: string;
  anhDaiDienUrl?: string;
  gioiTinh?: string;
}) => {
  const urlAnhSever = user?.anhDaiDienUrl || user?.urlAnhDaiDien;

  const ava = urlAnhSever
    ? { uri: urlAnhSever }
    : user?.gioiTinh === 'Nam'
    ? R.images.sinhVienNam
    : R.images.sinhVienNu;

  return ava;
};

export const renderAvaGV = (user: {
  urlAnhDaiDien?: string;
  anhDaiDienUrl?: string;
  gioiTinh: 'Nam' | 'Nữ';
}) => {
  const urlAnhSever = user?.anhDaiDienUrl || user?.urlAnhDaiDien;

  const ava = urlAnhSever
    ? { uri: urlAnhSever }
    : user?.gioiTinh === 'Nam'
    ? R.images.giangVienNam
    : R.images.giangVienNu;

  return ava;
};

export const openSlinkSupport = () => {
  Linking.canOpenURL(FB_SLINK_SUPPORT)
    .then(() => {
      Linking.openURL(FB_SLINK_SUPPORT);
    })
    .catch(() => {
      showToastError(translate('slink:Cannot_open_file'));
    });
};

export function objectToArray(obj: any) {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
}

export function sortByDate(arr: any) {
  arr.sort(function (a: any, b: any) {
    const dateA = new Date(a.key);

    const dateB = new Date(b.key);

    return dateA > dateB;
  });

  return arr;
}

export function getDayOfWeek(number: number) {
  const DaysOfWeek = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ];

  return DaysOfWeek?.[number] ?? '';
}

export const CallRatingApp = async () => {
  const thisMonth = moment().format('MM-YYYY');

  const listMonthRating: string[] = load(KEY_STORAGE.RATING_APP);

  const isHasRate = !listMonthRating?.includes(thisMonth);

  if (isHasRate) {
    const listMonthNew = [...(listMonthRating || []), thisMonth];

    save(KEY_STORAGE.RATING_APP, listMonthNew);

    FuntionAler(
      translate('slink:Do_you_like_this_app', { name: APP_DISPLAY_NAME }),
      translate('slink:Please_rating_app', {
        name: isIos ? 'App Store' : 'Google Play',
      }),
      () => null,
      () => showLink(isIos ? RATE_APP_STORE_LINK : RATE_GOOGLE_STORE_LINK),
      translate('slink:Cancel'),
      translate('slink:Continue'),
      'default',
      'destructive',
    );
  }
};

export function getStartAndEndOfMonth(position: boolean, datePress: string) {
  const [year, month] = datePress.split('-');

  //Theo tháng
  if (position) {
    // Tạo đối tượng Date với ngày đầu tháng
    const startDate = new Date(`${year}-${month}-01T00:00:00Z`);

    // Tạo đối tượng Date với ngày cuối tháng bằng cách đặt ngày là 0 của tháng tiếp theo
    const nextMonthDate = new Date(startDate);

    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

    nextMonthDate.setDate(0);

    // Lấy thời gian cuối ngày trong tháng
    const endDate = new Date(
      nextMonthDate.getFullYear(),
      nextMonthDate.getMonth(),
      nextMonthDate.getDate(),
      23,
      59,
      59,
      999,
    );

    // Chuyển đổi thành chuỗi ISOString
    const startISOString = startDate.toISOString();

    const endISOString = endDate.toISOString();

    return { start: startISOString, end: endISOString };
  } else {
    // Xác định ngày đầu tiên của tuần (thứ Hai)
    const startDate = new Date(datePress);

    startDate.setDate(
      startDate.getDate() -
        startDate.getDay() +
        (startDate.getDay() === 0 ? -6 : 1),
    ); // Nếu ngày bắt đầu là Chủ Nhật, ta trừ 6 ngày

    // Xác định ngày kết thúc của tuần (Chủ Nhật)
    const endDate = new Date(startDate);

    endDate.setDate(endDate.getDate() + 6);

    endDate.setHours(23);

    endDate.setMinutes(59);

    endDate.setSeconds(59);

    endDate.setMilliseconds(999); // Đặt millisecond về 999 để chắc chắn là 23:59:59.999

    return {
      start: startDate?.toISOString(),
      end: endDate?.toISOString(),
    };
  }
}

export const bodauTiengViet = (text = '') => {
  let str = text;
  str = str.toLowerCase();

  // bỏ ký tự / vì nó là ký tự đường dẫn file
  str = str.split('/')?.[0];

  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');

  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');

  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');

  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');

  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');

  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');

  str = str.replace(/đ/g, 'd');

  str = str.replace(/[^a-zA-Z0-9/]/g, ' ');

  str = str.replace(/\s+/g, ' ');

  // str = str.replace(/\W+/g, ' ');
  return str;
};

export function removeAccents(str: string) {
  const AccentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ',
    'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ];

  for (let i = 0; i < AccentsMap.length; i++) {
    const re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');

    const char = AccentsMap?.[i][0];

    str = str.replace(re, char);
  }

  return str;
}

const renderLocate = (item: any) => {
  if (item?.diaDiem?.soPhong) {
    return `P.${item?.diaDiem?.soPhong} - ${item?.diaDiem?.value ?? ''}`;
  }

  if (item?.diaDiem?.value) {
    return item?.diaDiem?.value ?? '';
  }

  if (item?.diaDiemKhac) {
    return item?.diaDiemKhac;
  }

  return '--';
};

export const renderDiaDiemLT = (item: any) => {
  return item?.thietBiCNC
    ? `${renderLocate(item)} & ${translate('slink:Truc_tuyen')}`
    : renderLocate(item);
};

export const renderCalendar = (item: any) => {
  switch (item?.loaiSuKien) {
    case LOAI_SU_KIEN.CA_NHAN:
    case LOAI_SU_KIEN.CHUNG:
      return { noiDung: item?.tenSuKien, diaDiem: item?.diaDiem };
    case LOAI_SU_KIEN.LICH_TUAN:
    case LOAI_SU_KIEN.LICH_LAM_VIEC_TUAN:
      return {
        noiDung: item?.noiDungCongViec,
        diaDiem: renderDiaDiemLT(item),
      };
    case LOAI_SU_KIEN.LICH_THI:
    case LOAI_SU_KIEN.LICH_COI_THI: {
      const dsTenHP =
        item?.danhSachHocPhan?.map((e: { ten: string }) => e?.ten) || [];

      return {
        noiDung: dsTenHP?.join(', '),
        diaDiem: item?.phong?.ten,
      };
    }

    case LOAI_SU_KIEN.LICH_HOC:
    case LOAI_SU_KIEN.LICH_GIANG_DAY:
      return {
        noiDung: item?.lopHocPhan?.hocPhan?.ten,
        diaDiem: item?.phongHoc,
      };
    case LOAI_SU_KIEN.LICH_LAM_THEM:
      return {
        noiDung: item?.congViecLamThem,
        diaDiem: item?.tenDonVi,
      };

    default:
      break;
  }
};

export function decodeHtmlEntities(text: string) {
  const entities = {
    '&ocirc;': 'ô',
    '&aacute;': 'á',
    '&ecirc;': 'ê',
    '&ugrave;': 'ù',
    '&agrave;': 'à',
    '&ucirc;': 'û',
    '&eacute;': 'é',
    '&igrave;': 'ì',
    '&ograve;': 'ò',
    '&atilde;': 'ã',
    '&auml;': 'ä',
    '&uuml;': 'ü',
    '&ouml;': 'ö',
    '&ccedil;': 'ç',
    '&ntilde;': 'ñ',
    '&iacute;': 'í',
    '&oacute;': 'ó',
    '&egrave;': 'è',
    '&acirc;': 'â',
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&apos;': "'",
    '&uacute;': 'ú',
    // Add more entities if needed
  };

  return text.replace(/&[^;]+;/g, function (match) {
    return entities[match] || match;
  });
}

export function removeHtmlTags(text: string) {
  return text.replace(/<[^>]*>/g, '');
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const removeStyles = (htmlString: string) => {
  // Regex để xóa thuộc tính style
  const regex = /style="[^"]*"/gi;

  return htmlString.replace(regex, '');
};
