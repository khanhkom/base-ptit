/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { EQUESTION_TYPE } from '@common';
import { Box } from 'native-base';

import styles from './styles';

import GridMultipleChoice from '../component/GridMultipleChoice';
import GridSingleChoice from '../component/GridSingleChoice';
import MultipleChoice from '../component/MultipleChoice';
import NumbericRange from '../component/NumbericRange';
import SingleChoice from '../component/SingleChoice';
import TextQuestion from '../component/TextQuestion';
import UploadFileKS from '../component/UploadFile';
import { CauHoiProps } from '../type';

const RenderItemServey = ({
  initKetQua,
  item,
  disabled,
  index,
}: {
  initKetQua: any;
  disabled?: boolean;
  item: CauHoiProps;
  index: number;
}) => {
  const defaultValueobj = initKetQua?.find(
    (e: { idCauHoi: string }) => e?.idCauHoi === item?._id,
  );
  switch (item?.loai) {
    case EQUESTION_TYPE.SingleChoice: {
      return (
        <Box style={styles.item}>
          <SingleChoice
            defaultValue={defaultValueobj}
            disabled={disabled}
            data={item}
            indexs={index}
          />
        </Box>
      );
    }
    case EQUESTION_TYPE.MultipleChoice:
      return (
        <Box style={styles.item}>
          <MultipleChoice
            defaultValue={defaultValueobj?.listLuaChon ?? []}
            disabled={disabled}
            data={item}
            indexs={index}
          />
        </Box>
      );
    case EQUESTION_TYPE.GridSingleChoice:
      return (
        <Box style={styles.item}>
          <GridSingleChoice
            disabled={disabled}
            defaultValue={defaultValueobj?.listLuaChonBang ?? []}
            data={item}
            indexs={index}
          />
        </Box>
      );
    case EQUESTION_TYPE.GridMultipleChoice:
      return (
        <Box style={styles.item}>
          <GridMultipleChoice
            defaultValue={defaultValueobj?.listLuaChonBang ?? []}
            disabled={disabled}
            data={item}
            indexs={index}
          />
        </Box>
      );
    case EQUESTION_TYPE.NumbericRange:
      return (
        <Box style={styles.item}>
          <NumbericRange
            defaultValue={defaultValueobj}
            disabled={disabled}
            data={item}
            indexs={index}
          />
        </Box>
      );
    case EQUESTION_TYPE.Text:
      return (
        <Box style={styles.item}>
          <TextQuestion
            defaultValue={defaultValueobj}
            data={item}
            disabled={disabled}
            indexs={index}
          />
        </Box>
      );
    case EQUESTION_TYPE.UploadFile:
      return (
        <UploadFileKS
          defaultValue={defaultValueobj?.listUrlFile}
          data={item}
          disabled={disabled}
          indexs={index}
        />
      );

    default:
      return null;
  }
};

export default RenderItemServey;
