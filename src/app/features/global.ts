import { CONFIG_SSO } from '@common';

/* eslint-disable import/no-anonymous-default-export */
export default {
  addList: null,
  addImage: null,
  outList: null,
  outImage: null,
  isOpened: false,
  appVersion: null,
  // chỉ hiện popup lần đầu mở app lên
  showPopupUpdateProfile: true,

  // gọi lại api phần lịch ở trang chủ
  getCalendarHome: null,

  // xử lý sự kiện BackHandler TabMain
  goToFirstTab: () => {
    null;
  },
  showTechSupport: null,
  config: CONFIG_SSO,

  // slink id
  handleLoginSlinkID: undefined,
  // tenant
  tenant: {
    colors: {
      MAIN_COLOR: '#081140',
    },
    logo: '',
    background: '',
    DOMAIN: {
      DOMAIN_ODOO: 'https://ais.aisenote.com',
    },
    dataSSOConfig: {
      authorizationEndpoint: '',
      buttonColor: '',
      clientId: '',
      discovery: '',
      enable: true,
      endSessionEndpoint: '',
      fieldMap: {
        email: '',
        familyName: '',
        fullname: '',
        givenName: '',
        username: '',
      },
      introspectionEndpoint: '',
      issuer: '',
      jwksUri: '',
      name: '',
      revocationEndpoint: '',
      scope: '',
      tokenEndpoint: '',
      userinfoEndpoint: '',
    },
    dataAddOnConfig: null,
    string: {
      SUB_APPNAME: '',
      MAIN_APPNAME: '',
    },
  },
};
