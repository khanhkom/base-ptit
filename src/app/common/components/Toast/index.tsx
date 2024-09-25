/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text } from 'react-native';

import R from '@assets/R';
import { getFontSize, getLineHeight, HEIGHT } from '@common';
import { Alert, HStack, Slide, VStack } from 'native-base';

const DURATION_HIDE = 4000;

export type TYPE_MESSAGE = 'success' | 'error' | 'warning' | 'info';

type ToastProps = {
  show: (data: { msg: string; interval?: number; type?: TYPE_MESSAGE }) => void;
};

const ToastComponent = forwardRef((_, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      show: ({
        interval = DURATION_HIDE,
        msg,
        type = 'success',
      }: {
        msg: string;
        interval?: number;
        type?: TYPE_MESSAGE;
      }) => {
        intervalValue.current = interval;

        message.current = msg;

        typeMessage.current = type;

        setIsShow(true);
      },
    }),
    [],
  );

  const [isShow, setIsShow] = useState(false);

  const intervalValue = useRef(DURATION_HIDE);

  const message = useRef('');

  const typeMessage = useRef<TYPE_MESSAGE>('success');

  const timeOut = useRef<any>(null);

  useEffect(() => {
    if (isShow) {
      timeOut.current = setTimeout(() => {
        setIsShow(false);
      }, intervalValue.current);
    }

    return () => {
      clearTimeout(timeOut.current);
    };
  }, [isShow]);

  return (
    <Slide in={isShow} placement="top" top={HEIGHT(50)} duration={600}>
      <Alert
        w="95%"
        variant="left-accent"
        colorScheme={typeMessage.current}
        status={typeMessage.current}
        alignSelf="center">
        <VStack space={2} flexShrink={1} w="95%">
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between">
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text style={styles.content}>{message.current}</Text>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
    </Slide>
  );
});

export const toastRef = createRef<ToastProps>();

export const Toast = () => <ToastComponent ref={toastRef} />;

export const showToast = ({
  msg,
  interval,
  type,
}: {
  msg: string;
  interval?: number;
  type?: TYPE_MESSAGE;
}) => {
  toastRef.current?.show({ msg, interval, type });
};

const styles = StyleSheet.create({
  content: {
    fontFamily: R.fonts.BeVietnamProMedium,
    fontSize: getFontSize(15),
    lineHeight: getLineHeight(24),
    color: R.colors.black0,
    flex: 1,
  },
});
