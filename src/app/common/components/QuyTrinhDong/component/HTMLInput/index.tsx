/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';

import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

import R from '@assets/R';
import TextLabelQuyTrinh from '@components/Item/componentQuyTrinhDong/TextLabelQuyTrinh';
import { EKieuDuLieu } from '@config/constant';
import { getFontSize, HEIGHT, WIDTH } from '@config/function';
import { HelperText } from '@libcomponents';
import { translate } from '@utils/i18n/translate';
import {
  Box,
  FormControl,
  IFormControlProps,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  theme,
} from 'native-base';

export interface InputNBProps extends IFormControlProps {
  error?: any;
  label?: string;
  onChangeValue?: (e: string) => void;
  defaultValue?: string | undefined;
  placeholder?: string;
  isDisabled?: boolean;
  required?: boolean;
  type?: EKieuDuLieu;
}
const HTMLInput = (props: InputNBProps) => {
  const {
    error,
    onChangeValue,
    label,
    defaultValue,
    placeholder,
    isDisabled,
    required,
    ...rest
  } = props;

  const richText: any = useRef();

  const [valueChange, setvalueChange] = useState('');

  useEffect(() => {
    if (defaultValue) {
      if (defaultValue !== valueChange) {
        richText.current.setContentHTML(defaultValue);
      }
    }
  }, [defaultValue]);

  const onChange = (value: string) => {
    const val = value;

    setvalueChange(val);

    onChangeValue?.(val);
  };

  return (
    <FormControl isInvalid={!!error} w="full" {...rest}>
      <TextLabelQuyTrinh label={label} isRequired={required} />
      <Box style={styles.viewHTML}>
        <ScrollView nestedScrollEnabled>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <RichEditor
              // usecontainer={true}
              disabled={isDisabled}
              ref={richText}
              initialContentHTML={defaultValue ?? ''}
              // hideKeyboardAccessoryView
              // scrollEnabled
              // androidHardwareAccelerationDisabled={true}
              placeholder={
                isDisabled ? '' : placeholder || translate('slink:Enter_here')
              }
              editorStyle={{
                backgroundColor: isDisabled ? R.colors.gray30 : R.colors.white,
                placeholderColor: theme.colors.gray[400],
                contentCSSText: `font-size: ${getFontSize(
                  14,
                )}px; padding: ${WIDTH(8)}px`,
              }}
              initialHeight={HEIGHT(100)}
              androidLayerType="software"
              onChange={onChange}
            />
          </KeyboardAvoidingView>
        </ScrollView>
        <RichToolbar
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.keyboard,
          ]}
          iconMap={{ [actions.heading1]: handleHead }}
        />
      </Box>
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </FormControl>
  );
};

export default HTMLInput;
const handleHead = ({ tintColor }: any) => (
  <Text style={{ color: tintColor }}>H1</Text>
);

const styles = StyleSheet.create({
  viewHTML: {
    justifyContent: 'space-between',
    backgroundColor: R.colors.white,
    overflow: 'hidden',
    borderRadius: WIDTH(8),
    marginTop: HEIGHT(8),
    borderWidth: 1,
    borderColor: R.colors.gray30,
  },
});
