import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';
import { useSelector } from 'react-redux';

import SearchNS from '@components/DynamicForm/component/NhanSu/SearchNS';
import ThemMoiTable from '@components/DynamicForm/component/Table/ThemMoi';
import ThemMoiTCNS from '@components/DynamicForm/component/Table/ThemMoiTCNS';
import AddFromLib from '@components/DynamicForm/component/TableLyLich/AddFromLib';
import ThemMoiLyLich from '@components/DynamicForm/component/TableLyLich/ThemMoi';
import ThemMoiMinhChung from '@components/DynamicForm/component/TableMinhChung/ThemMoiMinhChung';
import ThemMoiNhanSu from '@components/DynamicForm/component/TableNhanSu/ThemMoiNhanSu';
import HocHamTable from '@components/HoSoNhanSu/Table/DaoTaoBoiDuong/HocHamTable';
import LyLuanChinhTriTable from '@components/HoSoNhanSu/Table/DaoTaoBoiDuong/LyLuanChinhTriTable';
import NgoaiNguTable from '@components/HoSoNhanSu/Table/DaoTaoBoiDuong/NgoaiNguTable';
import QuanLyHanhChinhTable from '@components/HoSoNhanSu/Table/DaoTaoBoiDuong/QuanLyHanhChinhTable';
import QuanLyNhaNuocTable from '@components/HoSoNhanSu/Table/DaoTaoBoiDuong/QuanLyNhaNuocTable';
import QuaTrinhDTBDTable from '@components/HoSoNhanSu/Table/DaoTaoBoiDuong/QuaTrinhDTBDTable';
import QuocPhongAnNinhTable from '@components/HoSoNhanSu/Table/DaoTaoBoiDuong/QuocPhongAnNinhTable';
import ThongTinTrinhDoTable from '@components/HoSoNhanSu/Table/DaoTaoBoiDuong/ThongTinTrinhDoTable';
import TinHocTable from '@components/HoSoNhanSu/Table/DaoTaoBoiDuong/TinHocTable';
import DienBienKhoanTable from '@components/HoSoNhanSu/Table/DienBienLuong/DienBienKhoan';
import DienBienLuongTable from '@components/HoSoNhanSu/Table/DienBienLuong/DienBienLuong';
import DienBienPhuCapTable from '@components/HoSoNhanSu/Table/DienBienLuong/DienBienPhuCap';
import DienBienPhuCapTangThemTable from '@components/HoSoNhanSu/Table/DienBienLuong/DienBienPhuCapTangThem';
import GiaDinhMeTable from '@components/HoSoNhanSu/Table/GiaDinh/GiaDinhMe';
import GiaDinhVoTable from '@components/HoSoNhanSu/Table/GiaDinh/GiaDinhVo';
import KhenThuongTable from '@components/HoSoNhanSu/Table/KhenThuongKyLuat/KhenThuongTable';
import KyLuatTable from '@components/HoSoNhanSu/Table/KhenThuongKyLuat/KyLuatTable';
import DoiTuongChinhSachTable from '@components/HoSoNhanSu/Table/Other/DoiTuongChinhSach';
import QuaTrinhCongTacTable from '@components/HoSoNhanSu/Table/TuyenDung/QuyTrinhCongTac';
import ViTriChucDanhTable from '@components/HoSoNhanSu/Table/TuyenDung/ViTriChucDanhTable';
import ViTriQuyHoachTable from '@components/HoSoNhanSu/Table/TuyenDung/ViTriQuyHoachTable';
import SearchQLDTSinhVien from '@components/QuyTrinhDong/component/SingleSelect/QLDTSinhVien/SearchQLDTSinhVien';
import AddTable from '@components/QuyTrinhDong/component/Table/AddTable';
import ViewTable from '@components/QuyTrinhDong/component/Table/ViewTable';
import AddMemberNCKH from '@components/QuyTrinhDong/component/TableThanhVien/AddMemberNCKH';
import SearchTCNSCanBo from '@components/QuyTrinhDong/component/TCNSCanBo/SearchTCNSCanBo';
import SeePDF from '@components/ViewPdf';
import BangChamCong from '@features/BangChamCong';
import CauHoiThuongGap from '@features/CauHoiThuongGap';
import FilterCauHoiThuongGap from '@features/CauHoiThuongGap/Filter';
import CongNo from '@features/CongNo';
import ChiTietCongNo from '@features/CongNo/ChiTietCongNo';
import QRThanhToan from '@features/CongNo/ChiTietCongNo/QRThanhToan';
import CongViec from '@features/CongViec';
import ChiTietCongViec from '@features/CongViec/ChiTietCongViec';
import LichSuTienDoCongViec from '@features/CongViec/LichSuTienDoCongViec';
import CoSoVatChat from '@features/CoSoVatChat';
import TaiSanVatTu from '@features/CoSoVatChat/TaiSanVatTu';
import ChiTietTaiSanVatTu from '@features/CoSoVatChat/TaiSanVatTu/ChiTietTaiSanVatTu';
import DaLuu from '@features/DaLuu';
import DangKyTinChiSinhVien from '@features/DangKyTinChi/DangKy';
import ChiTietHocPhan from '@features/DangKyTinChi/DangKy/ChiTietHocPhan';
import XemTruocLichLTC from '@features/DangKyTinChi/DangKy/XemTruocLich';
import DangKyTinChi from '@features/DangKyTinChi/KetQuaDangKyTinChi';
import LichHocTinChi from '@features/DangKyTinChi/KetQuaDangKyTinChi/component/LichHocTinChi';
import DiemRenLuyen from '@features/DiemRenLuyen';
import ChiTietPhieuDiem from '@features/DiemRenLuyenNew/DanhSachPhieuDiemRenLuyen/ChiTietPhieuDiem';
import ThemMoiMinhChungRenLuyen from '@features/DiemRenLuyenNew/KhaiBaoMinhChung/DanhSachMinhChung/ThemMoiMinhChung';
import GioiThieu from '@features/GioiThieu';
import HoSoNhanSu from '@features/HoSoNhanSu';
import GuiBanChinhSua from '@features/HoSoNhanSu/GuiBanChinhSua';
import Intro from '@features/Intro';
import Welcome from '@features/Intro/Welcome';
import KeHoachHoatDong from '@features/KeHoachHoatDong';
import DanhSachKeHoachHoatDong from '@features/KeHoachHoatDong/DanhSachKeHoachHoatDong';
import ChiTietKeHoachHoatDong from '@features/KeHoachHoatDong/DanhSachKeHoachHoatDong/ChiTietKeHoachHoatDong';
import KeHoachNam from '@features/KeHoachHoatDong/KeHoachNam';
import KetQuaHocTapMain from '@features/KetQuaHocTap';
import KhaiBaoQuyTrinh from '@features/KhaiBaoQuyTrinh';
import CacBuocKhaiBao from '@features/KhaiBaoQuyTrinh/CacBuocKhaiBao';
import KhaoSatTrucTuyen from '@features/KhaoSatTrucTuyen';
import KiemKeTaiSan from '@features/KiemKeTaiSan';
import PhongKiemKeTaiSan from '@features/KiemKeTaiSan/PhongKiemKeTaiSan';
import DanhSachTaiSanKiemKe from '@features/KiemKeTaiSan/PhongKiemKeTaiSan/DanhSachTaiSanKiemKe';
import KyTucXa from '@features/KyTucXa';
import DangKyKyTucXa from '@features/KyTucXa/DangKyKyTucXa';
import ThemMoiDangKyKTX from '@features/KyTucXa/DangKyKyTucXa/ThemMoiDangKyKTX';
import LichThi from '@features/LichThi';
import LopHanhChinhGV from '@features/LopHanhChinhGV';
import ChiTietLopHC from '@features/LopHanhChinhGV/ChiTietLopHC';
import ThongTinChungLopHC from '@features/LopHanhChinhGV/ChiTietLopHC/ThongTinChung';
import LopHanhChinhSV from '@features/LopHanhChinhSV';
import ThongTinSinhVienLHC from '@features/LopHanhChinhSV/component/ThongTinSinhVien';
import GuiThongBao from '@features/LopHanhChinhSV/GuiThongBao';
import DetailNoti from '@features/LopHanhChinhSV/GuiThongBao/ChiTietThongBao';
import ThongTinChungSV from '@features/LopHanhChinhSV/ThongTinChungSV';
import LopTinChi from '@features/LopTinChi';
import ChiTietLopTinChi from '@features/LopTinChi/ChiTietLopTinChi';
import BaiTapVeNha from '@features/LopTinChi/component/BaiTapVeNha';
import ChiTietBaiTapVeNha from '@features/LopTinChi/component/BaiTapVeNha/ChiTietBaiTapVeNha';
import KhaoSatBaiTap from '@features/LopTinChi/component/BaiTapVeNha/KhaoSatBaiTap';
import ThongTinBaiTap from '@features/LopTinChi/component/BaiTapVeNha/ThongTinBaiTap';
import BaiTapVeNhaSinhVien from '@features/LopTinChi/component/BaiTapVeNhaSinhVien';
import DanhGiaGiangVien from '@features/LopTinChi/component/DanhGiaGiangVien';
import DeCuongHocPhan from '@features/LopTinChi/component/DeCuongHocPhan';
import DienDanLopTinChi from '@features/LopTinChi/component/DienDan';
import BinhLuanLopTinChi from '@features/LopTinChi/component/DienDan/BinhLuan';
import ChiTietBaiDang from '@features/LopTinChi/component/DienDan/ChiTietBaiDang';
import GioiThieuLopTinChi from '@features/LopTinChi/component/GioiThieu';
import KetQuaHocTap from '@features/LopTinChi/component/KetQuaHocTap';
import ThacMacDiemLTC from '@features/LopTinChi/component/KetQuaHocTap/ThacMacDiem';
import KetQuaHocTapSV from '@features/LopTinChi/component/KetQuaHocTapSV';
import ChiTietDiemCong from '@features/LopTinChi/component/KetQuaHocTapSV/ChiTietDiemCong';
import LichSuDiemDanh from '@features/LopTinChi/component/LichSuDiemDanh';
import LopThucHanh from '@features/LopTinChi/component/LopThucHanh';
import ThongBaoGV from '@features/LopTinChi/component/ThongBaoGV';
import TaoThongBaoGiangVien from '@features/LopTinChi/component/ThongBaoGV/TaoThongBao';
import ThongTinBuoiHoc from '@features/LopTinChi/component/ThongTinBuoiHoc';
import ChiTietBuoiHoc from '@features/LopTinChi/component/ThongTinBuoiHoc/ChiTiet';
import BuoiHocGiangVien from '@features/LopTinChi/component/ThongTinBuoiHoc/ChiTiet/BuoiHocGiangVien';
import DangKyDayBu from '@features/LopTinChi/component/ThongTinBuoiHoc/ChiTiet/BuoiHocGiangVien/DangKyDayBu';
import NoiDungBuoiHoc from '@features/LopTinChi/component/ThongTinBuoiHoc/ChiTiet/BuoiHocGiangVien/NoiDungBuoiHoc';
import ThemMoiDanhSachHocLieu from '@features/LopTinChi/component/ThongTinBuoiHoc/ChiTiet/BuoiHocGiangVien/NoiDungBuoiHoc/DanhSachHocLieu/ThemMoiDanhSachHocLieu';
import LichSuDayBu from '@features/LopTinChi/component/ThongTinBuoiHoc/LichSuDayBu';
import ThongTinChungLTC from '@features/LopTinChi/component/ThongTinChung';
import ThongTinSinhVien from '@features/LopTinChi/component/ThongTinChung/ThongTinSinhVien';
import MayTinhThongMinh from '@features/MayTinhThongMinh';
import PhanHoi from '@features/PhanHoi';
import ThemDonPhanHoi from '@features/PhanHoi/ThemDonPhanHoi';
import ThongTinPhanHoi from '@features/PhanHoi/ThongTinPhanHoi';
import QRScanner from '@features/QRScanner';
import QuanLyKhoaHocV2 from '@features/QuanLyKhoaHocV2';
import DanhSachKhaiBaoNCKH from '@features/QuanLyKhoaHocV2/DanhSachKhaiBao';
import DetailSanPham from '@features/QuanLyKhoaHocV2/DetailSanPham';
import SanPhamHoatDong from '@features/QuanLyKhoaHocV2/LoaiHinhSanPhamHoatDong';
import ThongKeNCKH from '@features/QuanLyKhoaHocV2/ThongKe';
import ViewRenderNCKH from '@features/QuanLyKhoaHocV2/ViewRenderNCKH';
import SearchScreen from '@features/SearchScreen';
import ChangeColorCalendar from '@features/SettingScreen/ChangeColorCalendar';
import SignIn from '@features/SignIn';
import SuKienDaThamGia from '@features/SuKienDaThamGiaNew';
import KhaoSatSuKien from '@features/SuKienDaThamGiaNew/KhaoSatSuKien';
import SuKienThamGia from '@features/SuKienThamGia';
import SwitchRole from '@features/SwitchRole';
import TabMain from '@features/TabMain';
import TrangCaNhan from '@features/TabMain/CaNhan/ChiTiet';
import ThoiKhoaBieuV2 from '@features/ThoiKhoaBieuV2';
import AddEventCalendar from '@features/ThoiKhoaBieuV2/AddEvent';
import ThongBao from '@features/ThongBao';
import ChiTietThongBao from '@features/ThongBao/ChiTietThongBao';
import ThongKeGioGiang from '@features/ThongKeGioGiang';
import ThuVien from '@features/ThuVien';
import TienTrinhHocTap from '@features/TienTrinhHocTap';
import MonTuChon from '@features/TienTrinhHocTap/MonTuChon';
import TinTucSK from '@features/TinTuc';
import ChiTietTinTuc from '@features/TinTuc/ChiTietTinTuc';
import FilterTinTuc from '@features/TinTuc/Filter';
import TinTucSKV2 from '@features/TinTucV2';
import ChiTietTinTucV2 from '@features/TinTucV2/ChiTietTinTuc';
import DanhSachTinTucV2 from '@features/TinTucV2/DanhSachTinTuc';
import FilterTinTucV2 from '@features/TinTucV2/Filter';
import ToChucNhanSu from '@features/ToChucNhanSu';
import BangLamThemGio from '@features/ToChucNhanSu/BangLamThemGio';
import ThemMoiLichLamThemGio from '@features/ToChucNhanSu/BangLamThemGio/ThemMoiLichLamThemGio';
import ThemMoiDanhSachLamThem from '@features/ToChucNhanSu/BangLamThemGio/ThemMoiLichLamThemGio/ThemMoiDanhSachLamThem';
import HopDong from '@features/ToChucNhanSu/HopDong';
import ChiTietHopDong from '@features/ToChucNhanSu/HopDong/ChiTietHopDong';
import KeKhaiTaiSan from '@features/ToChucNhanSu/KeKhaiTaiSan';
import DetailKeKhai from '@features/ToChucNhanSu/KeKhaiTaiSan/DetailKeKhai';
import ViewAddKeKhai from '@features/ToChucNhanSu/KeKhaiTaiSan/DetailKeKhai/MoTaVeTaiSan/component/Table/ViewAddKeKhai';
import QuaTrinhCuDiCongTac from '@features/ToChucNhanSu/QuaTrinhCuDiCongTac';
import QuaTrinhCuDiDTBD from '@features/ToChucNhanSu/QuaTrinhCuDiDTBD';
import ThemMoiQuaTrinhCuDiDTBD from '@features/ToChucNhanSu/QuaTrinhCuDiDTBD/ThemMoiQuaTrinhCuDiDTBD';
import DanhGiaCaNhan from '@features/ToChucNhanSu/ThiDua/CaNhan';
import DetailDanhGiaCaNhan from '@features/ToChucNhanSu/ThiDua/CaNhan/DetailDanhGiaCaNhan';
import DanhGiaDonVi from '@features/ToChucNhanSu/ThiDua/DonVi';
import PhieuTongHopDG from '@features/ToChucNhanSu/ThiDua/DonVi/PhieuTongHop';
import VanBanHuongDan from '@features/VanBanHuongDan';
import DanhSachChiTietVanBanHuongDan from '@features/VanBanHuongDan/DanhSachChiTietVanBanHuongDan';
import LichSinhNhat from '@features/VanPhongSo/LichSinhNhat';
import LichTuanHocVien from '@features/VanPhongSo/LichTuanHocVien';
import DanhSachDonXinNghi from '@features/VanPhongSo/LichTuanHocVien/DanhSachDonXinNghi';
import AddNewCalendar from '@features/VanPhongSo/LichTuanHocVien/Tab/AddNewCalendar';
import XetTotNghiep from '@features/XetTotNghiep';
import ChiTietCDR from '@features/XetTotNghiep/ChiTietCDR';
import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectAppToken } from '@redux-selector/app';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  // state

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  const token = useSelector(selectAppToken);

  // render
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {token === undefined ? (
        <RootStack.Group
          screenOptions={{
            freezeOnBlur: true,
          }}>
          <RootStack.Screen name={APP_SCREEN.INTRO} component={Intro} />
          <RootStack.Screen name={APP_SCREEN.SIGNIN} component={SignIn} />
        </RootStack.Group>
      ) : (
        <RootStack.Group
          screenOptions={{
            freezeOnBlur: true,
            animationTypeForReplace: 'push',
            gestureEnabled: true,
          }}>
          <RootStack.Screen name={APP_SCREEN.INTRO} component={Intro} />
          <RootStack.Screen
            name={APP_SCREEN.SWITCHROLE}
            component={SwitchRole}
          />
          <RootStack.Screen name={APP_SCREEN.SIGNIN} component={SignIn} />
          <RootStack.Screen name={APP_SCREEN.TABMAIN} component={TabMain} />
          <RootStack.Screen name={APP_SCREEN.TINTUC} component={TinTucSK} />
          <RootStack.Screen name={APP_SCREEN.TINTUCV2} component={TinTucSKV2} />
          <RootStack.Screen
            name={APP_SCREEN.QUATRINHCONGTACTABLE}
            component={QuaTrinhCongTacTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.DIENBIENLUONGTABLE}
            component={DienBienLuongTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.LOPHANHCHINHGV}
            component={LopHanhChinhGV}
          />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETDIEMCONG}
            component={ChiTietDiemCong}
          />
          <RootStack.Screen
            name={APP_SCREEN.KYLUATTABLE}
            component={KyLuatTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.THONGTINSINHVIEN}
            component={ThongTinSinhVien}
          />
          <RootStack.Screen name={APP_SCREEN.WELCOME} component={Welcome} />
          <RootStack.Screen name={APP_SCREEN.SEEPDF} component={SeePDF} />
          <RootStack.Screen name={APP_SCREEN.CONGNO} component={CongNo} />
          <RootStack.Screen
            name={APP_SCREEN.THEMMOITCNS}
            component={ThemMoiTCNS}
          />
          <RootStack.Screen
            name={APP_SCREEN.THACMACDIEMLTC}
            component={ThacMacDiemLTC}
          />
          <RootStack.Screen
            name={APP_SCREEN.VIEWADDKEKHAI}
            component={ViewAddKeKhai}
          />
          <RootStack.Screen name={APP_SCREEN.THUVIEN} component={ThuVien} />
          <RootStack.Screen
            name={APP_SCREEN.LICHTUANHOCVIEN}
            component={LichTuanHocVien}
          />
          <RootStack.Screen
            name={APP_SCREEN.THONGTINCHUNGLOPHC}
            component={ThongTinChungLopHC}
          />
          <RootStack.Screen
            name={APP_SCREEN.DANGKYDAYBU}
            component={DangKyDayBu}
          />
          <RootStack.Screen
            name={APP_SCREEN.DIENBIENPHUCAPTABLE}
            component={DienBienPhuCapTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.DIENBIENKHOANTABLE}
            component={DienBienKhoanTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.DIENBIENPHUCAPTANGTHEMTABLE}
            component={DienBienPhuCapTangThemTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.THONGBAOGV}
            component={ThongBaoGV}
          />
          <RootStack.Screen
            name={APP_SCREEN.KETQUAHOCTAPSV}
            component={KetQuaHocTapSV}
          />
          {/* TABLE */}
          <RootStack.Screen
            name={APP_SCREEN.HOCHAMTABLE}
            component={HocHamTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.TRINHDODAOTAOTABLE}
            component={ThongTinTrinhDoTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.THEMMOIDANHSACHHOCLIEU}
            component={ThemMoiDanhSachHocLieu}
          />
          <RootStack.Screen
            name={APP_SCREEN.THIETLAPMAULICH}
            component={ChangeColorCalendar}
          />
          <RootStack.Screen
            name={APP_SCREEN.LYLUANCHINHTRITABLE}
            component={LyLuanChinhTriTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.QUANLYHANHCHINHTABLE}
            component={QuanLyHanhChinhTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.QUANLYNHANUOCTABLE}
            component={QuanLyNhaNuocTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.NGOAINGUTABLE}
            component={NgoaiNguTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.SUKIENTHAMGIA}
            component={SuKienThamGia}
          />
          <RootStack.Screen
            name={APP_SCREEN.TINHOCTABLE}
            component={TinHocTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.DETAILDANHGIACANHAN}
            component={DetailDanhGiaCaNhan}
          />
          <RootStack.Screen
            name={APP_SCREEN.QUOCPHONGANNINHTABLE}
            component={QuocPhongAnNinhTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.QUATRINHDTBDTABLE}
            component={QuaTrinhDTBDTable}
          />
          <RootStack.Screen name={APP_SCREEN.LICHTHI} component={LichThi} />
          {/* TABLE */}
          <RootStack.Screen
            name={APP_SCREEN.SEARCHSCREEN}
            component={SearchScreen}
          />
          <RootStack.Screen
            name={APP_SCREEN.DIEMRENLUYEN}
            component={DiemRenLuyen}
          />
          <RootStack.Screen
            name={APP_SCREEN.TAOTHONGBAOGIANGVIEN}
            component={TaoThongBaoGiangVien}
          />
          <RootStack.Screen
            name={APP_SCREEN.LICHSINHNHAT}
            component={LichSinhNhat}
          />
          <RootStack.Screen
            name={APP_SCREEN.ADDEVENTCALENDAR}
            component={AddEventCalendar}
          />
          <RootStack.Screen
            name={APP_SCREEN.PHIEUTONGHOPKETQUA}
            component={PhieuTongHopDG}
          />
          <RootStack.Screen
            name={APP_SCREEN.THONGKENCKH}
            component={ThongKeNCKH}
          />
          <RootStack.Screen
            name={APP_SCREEN.DANHGIACANHAN}
            component={DanhGiaCaNhan}
          />
          <RootStack.Screen
            name={APP_SCREEN.DANHGIADONVI}
            component={DanhGiaDonVi}
          />
          <RootStack.Screen
            name={APP_SCREEN.DANGKYTINCHISINHVIEN}
            component={DangKyTinChiSinhVien}
          />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETHOCPHAN}
            component={ChiTietHocPhan}
          />
          <RootStack.Screen
            name={APP_SCREEN.DANHSACHKHAIBAONCKH}
            component={DanhSachKhaiBaoNCKH}
          />
          <RootStack.Screen
            name={APP_SCREEN.SANPHAMHOATDONG}
            component={SanPhamHoatDong}
          />
          <RootStack.Screen
            name={APP_SCREEN.VIEWRENDERNCKH}
            component={ViewRenderNCKH}
          />
          <RootStack.Screen
            name={APP_SCREEN.ADDMEMBERNCKH}
            component={AddMemberNCKH}
          />
          <RootStack.Screen
            name={APP_SCREEN.SEARCHTCNSCANBO}
            component={SearchTCNSCanBo}
          />
          <RootStack.Screen
            name={APP_SCREEN.SEARCHQLDTSINHVIEN}
            component={SearchQLDTSinhVien}
          />
          <RootStack.Screen
            name={APP_SCREEN.LICHHOCTINCHI}
            component={LichHocTinChi}
          />
          <RootStack.Screen
            name={APP_SCREEN.XEMTRUOCLICHLTC}
            component={XemTruocLichLTC}
          />
          <RootStack.Screen
            name={APP_SCREEN.DIENDAN}
            component={DienDanLopTinChi}
          />
          <RootStack.Screen
            name={APP_SCREEN.NOIDUNGBUOIHOC}
            component={NoiDungBuoiHoc}
          />
          <RootStack.Screen
            name={APP_SCREEN.QUANLYKHOAHOCV2}
            component={QuanLyKhoaHocV2}
          />
          <RootStack.Screen
            name={APP_SCREEN.DETAILKEKHAI}
            component={DetailKeKhai}
          />
          <RootStack.Screen
            name={APP_SCREEN.KHAOSATTRUCTUYEN}
            component={KhaoSatTrucTuyen}
          />
          <RootStack.Screen
            name={APP_SCREEN.FILTERCAUHOITHUONGGAP}
            component={FilterCauHoiThuongGap}
          />
          <RootStack.Screen
            name={APP_SCREEN.THANHTOANCONGNO}
            component={QRThanhToan}
          />
          <RootStack.Screen
            name={APP_SCREEN.VITRICHUCDANHTABLE}
            component={ViTriChucDanhTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.VITRIQUYHOACHTABLE}
            component={ViTriQuyHoachTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.GIOITHIEULOPTINCHI}
            component={GioiThieuLopTinChi}
          />
          <RootStack.Screen
            name={APP_SCREEN.GIADINHMETABLE}
            component={GiaDinhMeTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.ADDFROMLIB}
            component={AddFromLib}
          />
          <RootStack.Screen
            name={APP_SCREEN.THEMMOILYLICH}
            component={ThemMoiLyLich}
          />
          <RootStack.Screen
            name={APP_SCREEN.DOITUONGCHINHSACHTABLE}
            component={DoiTuongChinhSachTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.LOPTHUCHANH}
            component={LopThucHanh}
          />
          <RootStack.Screen
            name={APP_SCREEN.DECUONGHOCPHAN}
            component={DeCuongHocPhan}
          />
          <RootStack.Screen
            name={APP_SCREEN.THEMMOINS}
            component={ThemMoiNhanSu}
          />
          <RootStack.Screen
            name={APP_SCREEN.ADDNEWCALENDAR}
            component={AddNewCalendar}
          />
          <RootStack.Screen
            name={APP_SCREEN.XETTOTNGHIEP}
            component={XetTotNghiep}
          />
          <RootStack.Screen
            name={APP_SCREEN.KHENTHUONGTABLE}
            component={KhenThuongTable}
          />
          <RootStack.Screen name={APP_SCREEN.MONTUCHON} component={MonTuChon} />
          <RootStack.Screen
            name={APP_SCREEN.HOSONHANSU}
            component={HoSoNhanSu}
          />
          <RootStack.Screen
            name={APP_SCREEN.THOIKHOABIEUV2}
            component={ThoiKhoaBieuV2}
          />
          <RootStack.Screen
            name={APP_SCREEN.BAITAPVENHA}
            component={BaiTapVeNha}
          />
          <RootStack.Screen
            name={APP_SCREEN.THEMMOIMC}
            component={ThemMoiMinhChung}
          />
          <RootStack.Screen
            name={APP_SCREEN.KHAIBAOQUYTRINH}
            component={KhaiBaoQuyTrinh}
          />
          <RootStack.Screen
            name={APP_SCREEN.MAYTINHTHONGMINH}
            component={MayTinhThongMinh}
          />
          <RootStack.Screen
            name={APP_SCREEN.DANGKYTINCHI}
            component={DangKyTinChi}
          />
          <RootStack.Screen name={APP_SCREEN.SEARCHNS} component={SearchNS} />
          <RootStack.Screen
            name={APP_SCREEN.CAUHOITHUONGGAP}
            component={CauHoiThuongGap}
          />
          <RootStack.Screen name={APP_SCREEN.QRSCANNER} component={QRScanner} />
          <RootStack.Screen
            name={APP_SCREEN.CACBUOCKHAIBAO}
            component={CacBuocKhaiBao}
          />
          <RootStack.Screen
            name={APP_SCREEN.DANHGIAGIANGVIEN}
            component={DanhGiaGiangVien}
          />
          <RootStack.Screen
            name={APP_SCREEN.TIENTRINHHOCTAP}
            component={TienTrinhHocTap}
          />
          <RootStack.Screen
            name={APP_SCREEN.THEMDONPHANHOI}
            component={ThemDonPhanHoi}
          />
          <RootStack.Screen
            name={APP_SCREEN.GUIBANCHINHSUA}
            component={GuiBanChinhSua}
          />
          <RootStack.Screen
            name={APP_SCREEN.THONGTINPHANHOI}
            component={ThongTinPhanHoi}
          />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETCONGNO}
            component={ChiTietCongNo}
          />
          <RootStack.Screen
            name={APP_SCREEN.THEMMOITABLE}
            component={ThemMoiTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.DANHSACHTINTUCV2}
            component={DanhSachTinTucV2}
          />
          <RootStack.Screen
            name={APP_SCREEN.GIADINHVOTABLE}
            component={GiaDinhVoTable}
          />
          <RootStack.Screen
            name={APP_SCREEN.LICHSUDIEMDANH}
            component={LichSuDiemDanh}
          />
          <RootStack.Screen
            name={APP_SCREEN.DETAILTSANPHAM}
            component={DetailSanPham}
          />
          <RootStack.Screen name={APP_SCREEN.ADDTABLE} component={AddTable} />
          <RootStack.Screen name={APP_SCREEN.VIEWTABLE} component={ViewTable} />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETTINTUC}
            component={ChiTietTinTuc}
          />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETTINTUCV2}
            component={ChiTietTinTucV2}
          />
          <RootStack.Screen
            name={APP_SCREEN.LOPHANHCHINHSV}
            component={LopHanhChinhSV}
          />
          <RootStack.Screen
            name={APP_SCREEN.THONGTINCHUNGSV}
            component={ThongTinChungSV}
          />
          <RootStack.Screen
            name={APP_SCREEN.TRANGCANHAN}
            component={TrangCaNhan}
          />
          <RootStack.Screen
            name={APP_SCREEN.GUITHONGBAO}
            component={GuiThongBao}
          />
          <RootStack.Screen
            name={APP_SCREEN.THONGTINSINHVIENLHC}
            component={ThongTinSinhVienLHC}
          />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETLOPTINCHI}
            component={ChiTietLopTinChi}
          />
          <RootStack.Screen
            name={APP_SCREEN.THONGTINCHUNGLTC}
            component={ThongTinChungLTC}
          />
          <RootStack.Screen
            name={APP_SCREEN.THONGTINBUOIHOC}
            component={ThongTinBuoiHoc}
          />
          <RootStack.Screen
            name={APP_SCREEN.FILTERTINTUC}
            component={FilterTinTuc}
          />
          <RootStack.Screen
            name={APP_SCREEN.FILTERTINTUCV2}
            component={FilterTinTucV2}
          />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETBUOIHOC}
            component={ChiTietBuoiHoc}
          />
          <RootStack.Screen
            name={APP_SCREEN.BUOIHOCGIANGVIEN}
            component={BuoiHocGiangVien}
          />
          <RootStack.Screen
            name={APP_SCREEN.KETQUAHOCTAP}
            component={KetQuaHocTap}
          />
          <RootStack.Screen
            name={APP_SCREEN.KETQUAHOCTAPMAIN}
            component={KetQuaHocTapMain}
          />
          <RootStack.Screen
            name={APP_SCREEN.VANBANHUONGDAN}
            component={VanBanHuongDan}
          />
          <RootStack.Screen
            name={APP_SCREEN.DSCHITIETVANBANHUONGDAN}
            component={DanhSachChiTietVanBanHuongDan}
          />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETCDR}
            component={ChiTietCDR}
          />
          <RootStack.Screen name={APP_SCREEN.GIOITHIEU} component={GioiThieu} />
          <RootStack.Screen name={APP_SCREEN.PHANHOI} component={PhanHoi} />
          <RootStack.Screen name={APP_SCREEN.LOPTINCHI} component={LopTinChi} />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETLOPHC}
            component={ChiTietLopHC}
          />
          <RootStack.Screen
            name={APP_SCREEN.DETAILNOTI}
            component={DetailNoti}
          />
          <RootStack.Screen name={APP_SCREEN.THONGBAO} component={ThongBao} />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETTHONGBAO}
            component={ChiTietThongBao}
          />
          <RootStack.Screen
            name={APP_SCREEN.THONGKEGIOGIANG}
            component={ThongKeGioGiang}
          />
          <RootStack.Screen
            name={APP_SCREEN.TOCHUCNHANSU}
            component={ToChucNhanSu}
          />
          <RootStack.Screen
            name={APP_SCREEN.QUATRINHCUDICONGTAC}
            component={QuaTrinhCuDiCongTac}
          />
          <RootStack.Screen
            name={APP_SCREEN.QUATRINHCUDIDTBD}
            component={QuaTrinhCuDiDTBD}
          />
          <RootStack.Screen
            name={APP_SCREEN.KEKHAITAISAN}
            component={KeKhaiTaiSan}
          />
          <RootStack.Screen
            name={APP_SCREEN.LICHSUDAYBU}
            component={LichSuDayBu}
          />
          <RootStack.Screen
            name={APP_SCREEN.BANGCHAMCONG}
            component={BangChamCong}
          />
          <RootStack.Screen
            name={APP_SCREEN.KEHOACHNAM}
            component={KeHoachNam}
          />
          <RootStack.Screen
            name={APP_SCREEN.DANGKYKYTUCXA}
            component={DangKyKyTucXa}
          />
          <RootStack.Screen
            name={APP_SCREEN.ADDDANGKYKYTUCXA}
            component={ThemMoiDangKyKTX}
          />
          <RootStack.Screen name={APP_SCREEN.KYTUCXA} component={KyTucXa} />
          <RootStack.Screen
            name={APP_SCREEN.COSOVATCHAT}
            component={CoSoVatChat}
          />
          <RootStack.Screen
            name={APP_SCREEN.TAISANVATTU}
            component={TaiSanVatTu}
          />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETTAISANVATTU}
            component={ChiTietTaiSanVatTu}
          />
          <RootStack.Screen
            name={APP_SCREEN.KIEMKETAISAN}
            component={KiemKeTaiSan}
          />
          <RootStack.Screen
            name={APP_SCREEN.PHONGKIEMKETAISAN}
            component={PhongKiemKeTaiSan}
          />
          <RootStack.Screen
            name={APP_SCREEN.KEHOACHHOATDONG}
            component={KeHoachHoatDong}
          />
          <RootStack.Screen
            name={APP_SCREEN.DSKEHOACHHOATDONG}
            component={DanhSachKeHoachHoatDong}
          />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETKEHOACHHOATDONG}
            component={ChiTietKeHoachHoatDong}
          />
          <RootStack.Screen
            name={APP_SCREEN.DSTAISANKIEMKE}
            component={DanhSachTaiSanKiemKe}
          />
          <RootStack.Screen name={APP_SCREEN.CONGVIEC} component={CongViec} />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETCONGVIEC}
            component={ChiTietCongViec}
          />
          <RootStack.Screen
            name={APP_SCREEN.LICHSUTIENDOCONGVIEC}
            component={LichSuTienDoCongViec}
          />
          <RootStack.Screen
            name={APP_SCREEN.THEMMOIQUATRINHCUDIDTBD}
            component={ThemMoiQuaTrinhCuDiDTBD}
          />
          <RootStack.Screen name={APP_SCREEN.HOPDONG} component={HopDong} />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETHOPDONG}
            component={ChiTietHopDong}
          />
          <RootStack.Screen
            name={APP_SCREEN.BANGLAMTHEMGIO}
            component={BangLamThemGio}
          />
          <RootStack.Screen name={APP_SCREEN.DALUU} component={DaLuu} />
          <RootStack.Screen
            name={APP_SCREEN.DANHSACHDONXINNGHI}
            component={DanhSachDonXinNghi}
          />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETPHIEUDIEM}
            component={ChiTietPhieuDiem}
          />
          <RootStack.Screen
            name={APP_SCREEN.THEMMOIMINHCHUNG}
            component={ThemMoiMinhChungRenLuyen}
          />
          <RootStack.Screen
            name={APP_SCREEN.SUKIENDATHAMGIA}
            component={SuKienDaThamGia}
          />
          <RootStack.Screen
            name={APP_SCREEN.KHAOSATSUKIEN}
            component={KhaoSatSuKien}
          />
          <RootStack.Screen
            name={APP_SCREEN.THEMMOILICHLAMTHEMGIO}
            component={ThemMoiLichLamThemGio}
          />
          <RootStack.Screen
            name={APP_SCREEN.THEMMOIDANHSACHLAMTHEM}
            component={ThemMoiDanhSachLamThem}
          />
          <RootStack.Screen
            name={APP_SCREEN.BINHLUAN}
            component={BinhLuanLopTinChi}
          />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETBAIDANG}
            component={ChiTietBaiDang}
          />
          <RootStack.Screen
            name={APP_SCREEN.CHITIETBAITAP}
            component={ChiTietBaiTapVeNha}
          />
          <RootStack.Screen
            name={APP_SCREEN.KHAOSATBAITAP}
            component={KhaoSatBaiTap}
          />
          <RootStack.Screen
            name={APP_SCREEN.BAITAPVENHASINHVIEN}
            component={BaiTapVeNhaSinhVien}
          />
          <RootStack.Screen
            name={APP_SCREEN.THONGTINBAITAP}
            component={ThongTinBaiTap}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};
