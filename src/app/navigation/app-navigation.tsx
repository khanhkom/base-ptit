import React from 'react';
import { StatusBar } from 'react-native';

import { useSelector } from 'react-redux';

import { RXStore } from '@common';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import NoInternetComponent from '@components/NoInternetComponent';
import CustomDialog from '@components/Popup/PopupOK';
import { Toast } from '@components/Toast';
import ViewMedia from '@components/ViewMedia';
import { PortalHost } from '@gorhom/portal';
import { ProgressDialog, SnackBar } from '@libcomponents';
import { ImageTransition } from '@libcomponents/light-box/image-transition';
import { navigationRef } from '@navigation/navigation-service';
import { RootNavigation } from '@navigation/root-navigator';
import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer } from '@react-navigation/native';
import { selectAppConfig } from '@redux-selector/app';
import { MyAppTheme } from '@theme';

import linking from './linking';

export const AppContainer = () => {
  // state
  const { loadingApp, theme } = useSelector(selectAppConfig);

  // effect

  if (__DEV__) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFlipper(navigationRef);
  }

  // render
  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      theme={MyAppTheme[theme]}>
      <>
        <ErrorBoundary name="MyApp">
          <StatusBar translucent backgroundColor={'transparent'} />
          {!loadingApp && (
            <>
              <RootNavigation />
              <PortalHost name={'AppModal'} />
              <ProgressDialog />
              <SnackBar />
              <Toast />
              <ViewMedia />
              <ImageTransition />
              <CustomDialog />
              <NoInternetComponent />
            </>
          )}
          <RXStore />
        </ErrorBoundary>
      </>
    </NavigationContainer>
  );
};
