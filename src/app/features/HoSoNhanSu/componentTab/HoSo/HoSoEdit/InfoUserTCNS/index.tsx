/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useSelector } from 'react-redux';

import { WIDTH } from '@common';
import InputNBForm from '@components/QuyTrinhDong/component/Input/InputNBForm';
import SingleSelectForm from '@components/QuyTrinhDong/component/SingleSelect/SingleSelectForm';
import DatePickerForm from '@components/QuyTrinhDong/component/Time/DatePickerForm';
import { infomationUserConfig } from '@redux-selector/infoUserTCNS';
import { translate } from '@utils/i18n/translate';
import { Box } from 'native-base';

const InfoUserTCNS = ({ control, errors, watchValues }: any) => {
  const { infoUserTCNS } = useSelector(infomationUserConfig);

  const danhSachDonVi =
    infoUserTCNS?.danhSachDonViCanBoViTri?.map(item => {
      return {
        label: item?.donVi?.ten,
        value: item?.donViId,
      };
    }) ?? [];

  const danhSachChucVu =
    infoUserTCNS?.danhSachDonViCanBoViTri?.map(item => {
      return {
        label: item?.donViViTri?.tenChucVu,
        value: item?.chucVuId,
      };
    }) ?? [];

  // const danhSachHocHam =
  //   infoUserTCNS?.danhSachHocHam?.map(item => {
  //     return {
  //       label: item?.danhHieu,
  //       value: item?._id,
  //     };
  //   }) ?? [];

  // const danhSachNganhDaoTao =
  //   infoUserTCNS?.danhSachThongTinTrinhDoDaoTao?.map(item => {
  //     return {
  //       label: item?.nganh,
  //       value: item?.idGoc,
  //     };
  //   }) ?? [];

  return (
    <Box width={WIDTH(351)} alignSelf="center">
      <InputNBForm
        label={translate('hoSoNhanSu:maCanBo')}
        name={'maCanBo'}
        error={errors?.maCanBo?.message}
        defaultValue={infoUserTCNS?.maCanBo}
        control={control}
        isDisabled={true}
      />
      <SingleSelectForm
        label={translate('hoSoNhanSu:donViQuanLy')}
        data={danhSachDonVi}
        defaultValue={infoUserTCNS?.donViChinhId}
        required
        name={'donViChinhId'}
        control={control}
        error={errors?.gioiTinh?.message}
        isDisabled={true}
      />
      <SingleSelectForm
        label={translate('hoSoNhanSu:viTriChucDanh')}
        data={danhSachChucVu}
        defaultValue={infoUserTCNS?.chucVuChinhId}
        required
        name={'chucVuChinhId'}
        control={control}
        error={errors?.gioiTinh?.message}
        isDisabled={true}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:hoDem')}
        required
        name={'hoDem'}
        error={errors?.hoDem?.message}
        defaultValue={infoUserTCNS?.hoDem}
        control={control}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:ten')}
        name={'ten'}
        required
        error={errors?.ten?.message}
        defaultValue={infoUserTCNS?.ten}
        control={control}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:tenGoiKhac')}
        name={'tenGoiKhac'}
        error={errors?.tenGoiKhac?.message}
        defaultValue={infoUserTCNS?.tenGoiKhac}
        control={control}
      />
      <DatePickerForm
        label={translate('slink:Date_of_birth')}
        error={errors?.ngaySinh?.message}
        mode="date"
        defaultValue={infoUserTCNS?.ngaySinh}
        name={'ngaySinh'}
        control={control}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:cccdCMND')}
        name={'cccdCMND'}
        required
        error={errors?.cccdCMND?.message}
        defaultValue={infoUserTCNS?.cccdCMND}
        control={control}
      />
      <DatePickerForm
        label={translate('hoSoNhanSu:ngayCap')}
        error={errors?.ngayCap?.message}
        mode="date"
        defaultValue={infoUserTCNS?.ngayCap}
        name={'ngayCap'}
        control={control}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:noiCap')}
        name={'noiCap'}
        error={errors?.noiCap?.message}
        defaultValue={infoUserTCNS?.noiCap}
        control={control}
      />
      <SingleSelectForm
        label={translate('slink:Gender')}
        data={[
          { label: translate('hoSoNhanSu:male'), value: 'Nam' },
          { label: translate('hoSoNhanSu:female'), value: 'Nữ' },
        ]}
        defaultValue={infoUserTCNS?.gioiTinh}
        required
        name={'gioiTinh'}
        control={control}
        error={errors?.gioiTinh?.message}
      />
      <InputNBForm
        label={`${translate('hoSoNhanSu:hocHam')} (${translate(
          'hoSoNhanSu:caoNhat',
        )})`}
        // data={danhSachHocHam}
        defaultValue={infoUserTCNS?.hocHam || undefined}
        name={'hocHam'}
        control={control}
        error={errors?.hocHam?.message}
        isDisabled={true}
      />
      <InputNBForm
        required
        label={`${translate('hoSoNhanSu:trinhDoDaoTao')} (${translate(
          'hoSoNhanSu:caoNhat',
        )})`}
        name={'chatLuongNhanSu'}
        error={errors?.chatLuongNhanSu?.message}
        defaultValue={infoUserTCNS?.trinhDoDaoTao}
        control={control}
        isDisabled={true}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:nganhDaoTao')}
        // data={danhSachNganhDaoTao}
        defaultValue={infoUserTCNS?.nganh || undefined}
        name={'trinhDoDaoTaoId'}
        control={control}
        error={errors?.trinhDoDaoTaoId?.message}
        isDisabled={true}
      />
      <InputNBForm
        required
        label={translate('hoSoNhanSu:emailCanBo')}
        name={'emailCanBo'}
        error={errors?.emailCanBo?.message}
        defaultValue={infoUserTCNS?.emailCanBo}
        control={control}
        isDisabled={true}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:email')}
        required
        name={'email'}
        error={errors?.email?.message}
        defaultValue={infoUserTCNS?.email}
        control={control}
      />
      <InputNBForm
        label={translate('slink:Phone_number')}
        name={'sdtCaNhan'}
        error={errors?.sdtCaNhan?.message}
        defaultValue={infoUserTCNS?.sdtCaNhan}
        control={control}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:trangThai')}
        defaultValue={infoUserTCNS?.trangThai || undefined}
        name={'trangThai'}
        control={control}
        error={errors?.trangThai?.message}
      />
      <SingleSelectForm
        label={translate('hoSoNhanSu:loaiCanBoGiangVien')}
        data={[
          {
            label: translate('hoSoNhanSu:congChuc'),
            value: 'Công chức',
          },
          { label: translate('hoSoNhanSu:vienChuc'), value: 'Viên chức' },
          {
            label: translate('hoSoNhanSu:nguoiLaoDong'),
            value: 'Người lao động',
          },
        ]}
        defaultValue={infoUserTCNS?.loaiCanBoGiangVien || undefined}
        name={'loaiCanBoGiangVien'}
        control={control}
        error={errors?.loaiCanBoGiangVien?.message}
      />
      <SingleSelectForm
        label={translate('hoSoNhanSu:nghiPhepTheoLuatLaoDong')}
        data={[
          {
            label: translate('hoSoNhanSu:khongDuocNghiPhep'),
            value: false,
          },
          { label: translate('hoSoNhanSu:duocNghiPhep'), value: true },
        ]}
        defaultValue={infoUserTCNS?.tinhNghiPhep || undefined}
        name={'tinhNghiPhep'}
        control={control}
        error={errors?.tinhNghiPhep?.message}
      />
      {/* Viên chức mới có số hiệu viên chức */}
      {watchValues?.loaiCanBoGiangVien === 'Viên chức' && (
        <InputNBForm
          label={translate('hoSoNhanSu:soHieuVienChuc')}
          name={'soHieuVienChuc'}
          error={errors?.soHieuVienChuc?.message}
          defaultValue={infoUserTCNS?.soHieuVienChuc}
          control={control}
        />
      )}
      <DatePickerForm
        label={translate('hoSoNhanSu:ngayTuyenDung')}
        error={errors?.ngayCap?.message}
        mode="date"
        defaultValue={infoUserTCNS?.ngayTuyenDung}
        name={'ngayTuyenDung'}
        control={control}
      />
      <InputNBForm
        label={translate('hoSoNhanSu:soSoBHXH')}
        name={'soSoBHXH'}
        required
        error={errors?.cccdCMND?.message}
        defaultValue={infoUserTCNS?.soSoBHXH}
        control={control}
      />
      <SingleSelectForm
        label={translate('hoSoNhanSu:isNganSach')}
        data={[
          { label: 'Tính theo ngân sách', value: true },
          { label: 'Không tính theo ngân sách', value: false },
        ]}
        defaultValue={infoUserTCNS?.isNganSach}
        required
        name={'isNganSach'}
        control={control}
        error={errors?.isNganSach?.message}
      />
      <SingleSelectForm
        label={translate('hoSoNhanSu:isThuocDienKeKhaiHangNam')}
        data={[
          { label: 'Thuộc diện kê khai', value: true },
          { label: 'Không thuộc diện kê khai', value: false },
        ]}
        defaultValue={infoUserTCNS?.isThuocDienKeKhaiHangNam}
        name={'isThuocDienKeKhaiHangNam'}
        control={control}
        error={errors?.isThuocDienKeKhaiHangNam?.message}
      />
    </Box>
  );
};

export default InfoUserTCNS;
