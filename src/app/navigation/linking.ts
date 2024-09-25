import { APP_SCREEN } from './screen-types';

const config = {
  screens: {
    [APP_SCREEN.TRANGCANHAN]: {
      path: 'profile/:id',
      parse: {
        id: (id: string) => `${id}`,
      },
    },

    Notifications: 'notifications',
    Settings: 'settings',
  },
};

const linking = {
  prefixes: ['vwa://app'],
  config,
};

export default linking;
