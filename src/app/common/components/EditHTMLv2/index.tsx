/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
} from 'react-native';

import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

import R from '@assets/R';
import { getFontSize, HEIGHT, WIDTH } from '@common';
import { translate } from '@utils/i18n/translate';
import { theme, View } from 'native-base';

const handleHead = ({ tintColor }: any) => (
  <Text style={{ color: tintColor }}>H1</Text>
);

const TempScreen = (props: {
  placeholder?: string;
  defaultValue?: string;
  onChange: (e: string) => void;
  height?: number;
}) => {
  const { defaultValue, onChange, placeholder, height = HEIGHT(100) } = props;

  useEffect(() => {
    defaultValue && onChange(defaultValue);
  }, []);

  const richText: any = useRef();

  // const insertPlaceholder = () => {
  //   // Thêm một thẻ div chứa placeholder vào trình soạn thảo
  //   richText.current?.insertHTML(
  //     '<div style="color: #999; font-style: italic;">Enter your text here</div>',
  //   );
  // };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ minHeight: height + HEIGHT(40) }}>
        <View style={{ maxHeight: HEIGHT(300) }}>
          <RichEditor
            ref={richText}
            initialContentHTML={defaultValue ?? ''}
            hideKeyboardAccessoryView
            initialHeight={HEIGHT(100)}
            containerStyle={{ minHeight: height }}
            androidHardwareAccelerationDisabled
            useContainer={false}
            // androidHardwareAccelerationDisabled={true}
            placeholder={placeholder || translate('slink:Enter_here')}
            editorStyle={{
              backgroundColor: R.colors.white,
              placeholderColor: theme.colors.gray[300],
              contentCSSText: `font-size: ${getFontSize(
                16,
              )}px; padding: ${WIDTH(16)}px;
               ::placeholder {
              font-family:'BeVietnamProRegular';
              }`,
            }}
            androidLayerType="software"
            onChange={onChange}
            // onKeyUp={key => {
            //   if (key.key === 'Enter') {
            //     richText.current.blurContentEditor(); // This will hide dismiss the keyboard
            //   }
            // }}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={{ position: 'absolute', bottom: 0 }}>
        <RichToolbar
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.heading1,
            actions.keyboard,
          ]}
          iconMap={{ [actions.heading1]: handleHead }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TempScreen;
