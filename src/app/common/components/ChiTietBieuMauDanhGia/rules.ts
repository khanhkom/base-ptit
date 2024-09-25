/* eslint-disable @typescript-eslint/no-explicit-any */

import { translate } from '@utils/i18n/translate';

export const rules = (value: any) => {
  if (!value?.hoanThanh) {
    return translate('slink:Required');
  }
};
