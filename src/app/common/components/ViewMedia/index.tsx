/* eslint-disable no-nested-ternary */
import React from 'react';

import ImageView from 'react-native-image-viewing';
import { useSelector } from 'react-redux';

import { showImageConfig } from '@redux-selector/showImage';
import { viewImageActions } from '@redux-slice';

import { dispatch } from '../../redux';

const ViewMedia = () => {
  const { isVisible, image, index } = useSelector(showImageConfig);

  if (!isVisible || image?.length === 0) {
    return null;
  }

  const images = image?.map(item => item?.source) || [];

  const onClose = () => {
    dispatch(
      viewImageActions.setviewImage({
        isVisible: false,
        image: [],
        index: 0,
      }),
    );
  };

  const soLuongAnh = images?.length;

  const indexImg = index ? (index > (soLuongAnh - 1 ?? 0) ? 0 : index) : 0;

  return (
    <ImageView
      images={images}
      animationType="fade"
      imageIndex={indexImg}
      onRequestClose={onClose}
      visible={isVisible}
    />
  );
};

export default ViewMedia;
