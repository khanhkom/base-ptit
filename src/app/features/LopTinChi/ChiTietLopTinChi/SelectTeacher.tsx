/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inline-comments */
import React, { useEffect, useState } from 'react';

import { showToastWarn } from '@common';
import SelectActionSheet from '@components/SelectActionSheet';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { bieuMauKhaoSatTrucTuyen } from '@networking/user';
import {
  getDotDGGVV2,
  getGiangVienDG,
} from '@networking/user/DanhGiaGiangVien';
import { translate } from '@utils/i18n/translate';
import _ from 'lodash';

import { BieuMauKhaoSatProps, DotDGGVProps, GiangVienProps } from './type';

interface Props {
  turnOffModel: () => void;
  modalVisible: boolean;
  idLop: string;
  maLop: string;
  idKyHoc: string;
  lopHocPhanId: string;
  listTeacher: GiangVienProps[];
}

const SelectTeacher = (props: Props) => {
  const {
    turnOffModel,
    modalVisible,
    idLop,
    listTeacher,
    idKyHoc,
    maLop,
    lopHocPhanId,
  } = props;

  const [listGV, setlistGV] = useState<GiangVienProps[]>([]);

  useEffect(() => {
    idLop && getInitApi();
  }, [idLop]);

  const getInitApi = async () => {
    try {
      const giangVienList = await getGiangVienDG(idLop);

      setlistGV(giangVienList?.data?.data || []);
    } catch (error) {}
  };

  const onChange = (ssoId: string) => {
    turnOffModel && turnOffModel();

    setTimeout(() => {
      onDanhGiaGV(ssoId);
    }, 0);
  };

  const onDanhGiaGV = async (ssoId: string) => {
    const giangVien = listTeacher?.find(item => item?.nhanSuSsoId === ssoId);

    const infoTeacherSubmit = {
      maLop, //Mã lớp
      lopHocPhanId, //Mã lớp
      giangVienSsoId: ssoId || '',
      maGiangVien: giangVien?.maNhanSu || '',
      hoTenGiangVien: giangVien?.tenNhanSu || '',
      vaiTroNguoiKhaoSat: 'sinh_vien',
    };

    const responseDot = await getDotDGGVV2(idKyHoc);

    const dotDGGVLastest: DotDGGVProps = responseDot?.data?.data;

    const responseBieuMau = await bieuMauKhaoSatTrucTuyen(
      dotDGGVLastest?.idKhaoSat,
    );

    //Get câu trả lời
    const listGiangVien = listGV?.filter(
      item => item?.giangVienSsoId === ssoId,
    );

    const infoTeacher = _.orderBy(listGiangVien, ['createdAt'], ['desc']);
    //Get câu trả lời

    const bieuMau: BieuMauKhaoSatProps = responseBieuMau?.data?.data;

    if (!dotDGGVLastest?.kichHoat) {
      showToastWarn(translate('slink:Khong_co_khao_sat'));
    } else {
      navigateScreen(APP_SCREEN.DANHGIAGIANGVIEN, {
        data: bieuMau,
        idDot: dotDGGVLastest?._id ?? '',
        idKhaoSat: dotDGGVLastest?.idKhaoSat,
        refreshData: getInitApi,
        giangVien: infoTeacherSubmit,
        initKetQua: { danhSachTraLoi: infoTeacher?.[0]?.danhSachTraLoi || [] },
        dot: dotDGGVLastest,
      });
    }
  };

  const data = listTeacher?.map(item => {
    return {
      label: `${item?.tenNhanSu || '--'} (${item?.maNhanSu || '--'})`,
      value: item?.nhanSuSsoId || '',
    };
  });

  if (!modalVisible) {
    return null;
  }

  return (
    <SelectActionSheet
      onChange={onChange}
      isEmpty={data?.length === 0}
      data={data}
      isOpen={modalVisible}
      onClose={turnOffModel}
    />
  );
};

export default SelectTeacher;
