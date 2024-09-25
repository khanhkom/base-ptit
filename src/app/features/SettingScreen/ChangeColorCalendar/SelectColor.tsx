import { WIDTH } from '@common';
import { Box } from 'native-base';
import React, { useEffect, useState } from 'react';
import ColorPicker from 'react-native-wheel-color-picker';
interface Props {
  defaultValue: string;
  onChangeColor: (e: string) => void;
}
const ColorPickerComponent = (props: Props) => {
  const { defaultValue, onChangeColor } = props;
  const [selectedColor, setSelectedColor] = useState(defaultValue);
  useEffect(() => {
    setSelectedColor(defaultValue);
  }, [defaultValue]);
  const onColorChange = (color: string) => {
    setSelectedColor(color);
    onChangeColor && onChangeColor(color);
  };

  return (
    <Box
      alignItems={'center'}
      justifyContent="center"
      height={WIDTH(200)}
      width={WIDTH(200)}>
      <ColorPicker
        color={selectedColor}
        onColorChange={onColorChange}
        thumbSize={20}
        sliderSize={20}
        noSnap={true}
        row={true}
        swatches={false}
      />
    </Box>
  );
};

export default ColorPickerComponent;
