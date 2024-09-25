/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import R from '@assets/R';
import { HEIGHT, popupOk, WIDTH } from '@common';
import BaseButtonNB from '@components/BaseButtonNB';
import HTMLInputNBForm from '@components/QuyTrinhDong/component/HTMLInput/HTMLInputNBForm';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import UploadFileForm from '@components/QuyTrinhDong/component/UploadFileQuyTrinh/UploadfileForm';
import ModalCustome from '@libcomponents/modal/modal-custome';
import { postBaiDang, putBaiDang } from '@networking/user/DienDanBinhLuan';
import { translate } from '@utils/i18n/translate';
import { Text } from 'native-base';

const ModalBaiDang = (props: {
  visible: any;
  onClose: () => void;
  idLopTc: any;
  editValue: any;
  onRefresh: () => void;
}) => {
  const { visible, onClose, idLopTc, onRefresh, editValue } = props;

  const [loadingSubmit, setloadingSubmit] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    initData();
  }, [editValue]);

  const initData = () => {
    const listId = ['tieuDe', 'noiDung'];

    listId?.forEach(id => setValue(id, editValue?.[id] ?? ''));

    setValue(
      'fileDinhKem',
      editValue?.fileDinhKem ? editValue?.fileDinhKem : [],
    );
  };

  const onSubmit = async (value: any) => {
    try {
      setloadingSubmit(true);

      if (editValue) {
        await putBaiDang(
          {
            ...value,
            lopHocPhanId: idLopTc,
          },
          editValue?._id,
        );
      } else {
        await postBaiDang({
          ...value,
          lopHocPhanId: idLopTc,
        });
      }

      onRefresh();

      onClose();

      popupOk(
        translate('slink:Notice_t'),
        editValue ? 'Cập nhật thành công' : 'Đăng bài thành công',
      );

      setloadingSubmit(false);
    } catch (error) {
      setloadingSubmit(false);
    }
  };

  return (
    <ModalCustome
      closeButton={onClose}
      style={{ paddingVertical: HEIGHT(24) }}
      isVisible={visible}>
      <Text fontSize={'lg'} alignSelf={'center'} bold>
        {editValue ? 'Cập nhật bài viết' : 'Thêm mới bài viết'}
      </Text>
      <Text
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize={'xs'}
        color={'gray.500'}>
        <Text color={R.colors.redColor}>{'* '}</Text>
        Tiêu đề bài đăng
      </Text>
      <InputNBForm
        label="Tiêu đề bài đăng"
        defaultValue={editValue?.tieuDe}
        name={'tieuDe'}
        control={control}
        error={errors?.tieuDe?.message}
        required
      />
      <Text
        fontFamily={R.fonts.BeVietnamProRegular}
        fontSize={'xs'}
        color={'gray.500'}>
        <Text color={R.colors.redColor}>{'* '}</Text>
        Nội dung chi tiết
      </Text>
      <HTMLInputNBForm
        label={'Nội dung chi tiết'}
        name={'noiDung'}
        error={errors?.noiDung?.message}
        placeholder={'Nhập nội dung chi tiết'}
        control={control}
        defaultValue={editValue?.noiDung}
      />
      <UploadFileForm
        name={'fileDinhKem'}
        arrayFile={editValue?.fileDinhKem ?? []}
        error={errors?.fileDinhKem?.message}
        control={control}
        label={'File đính kèm'}
      />
      <BaseButtonNB
        isLoading={loadingSubmit}
        isLoadingText={translate('slink:Loading')}
        width={WIDTH(140)}
        title={editValue ? 'Cập nhật' : 'Đăng bài'}
        onPress={handleSubmit(onSubmit)}
      />
    </ModalCustome>
  );
};

export default ModalBaiDang;
