import React from 'react';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
} from 'react-navigation';
import TrangChu from '../ManHinhChiTieu/TrangChu/TrangChu';
import MenuQuanLyChiTieu from '../ManHinhChiTieu/MenuQuanLyChiTieu/MenuQuanLyChiTieu';
import Thu from '../ManHinhChiTieu/Thu/Thu';
import Chi from '../ManHinhChiTieu/Chi/Chi';
import SoDuTaiKhoan from '../ManHinhChiTieu/SoDuTaiKhoan/SoDuTaiKhoan';
import DanhSachThuChi from '../ManHinhChiTieu/DanhSachThuChi/DanhSachThuChi';
import KeHoach from '../ManHinhChiTieu/KeHoach/KeHoach';
import ThongKe from '../ManHinhChiTieu/ThongKe/ThongKe';
import ThongTin from '../ManHinhChiTieu/ThongTin/ThongTin';
import ThayDoiThongTin from '../ManHinhChiTieu/ThayDoiThongTin/ThayDoiThongTin';
import ChiaSe from '../ManHinhChiTieu/ChiaSe/ChiaSe';
import TaiKhoanChiaSe from '../ManHinhChiTieu/TaiKhoanChiaSe/TaiKhoanChiaSe';
import Nhom from '../ManHinhChiTieu/Thu/Nhom';
import VoiAi from '../ManHinhChiTieu/Thu/VoiAi';
import NhomChi from '../ManHinhChiTieu/Chi/Nhom';
import VoiAiChi from '../ManHinhChiTieu/Chi/VoiAi';
import Lich from '../ManHinhChiTieu/Lich/Lich';
import DanhSachThu from '../ManHinhChiTieu/DanhSachThuChi/DanhSachThu';
import DanhSachChi from '../ManHinhChiTieu/DanhSachThuChi/DanhSachChi';
import ChiTietThu from '../ManHinhChiTieu/DanhSachThuChi/ChiTietThu';ChiTietChi
import ChiTietChi from '../ManHinhChiTieu/DanhSachThuChi/ChiTietChi';

export const StackTrangChu = StackNavigator({
    ManHinh_TrangChu: {
        screen: TrangChu,
        navigationOptions: {
            //    title: 'Trang chủ'
            header: null
        }
    },
    MenuQuanLyChiTieu: {
        screen: MenuQuanLyChiTieu,
    },
    ManHinh_Thu: {
        screen: Thu
    },
    ManHinh_Chi: {
        screen: Chi
    },
    ManHinh_SoDuTaiKhoan: {
        screen: SoDuTaiKhoan
    },
    ManHinh_DanhSachThuChi: {
        screen: DanhSachThuChi
    },
    ManHinh_DanhSachThu: {
        screen: DanhSachThu
    },
    ManHinh_DanhSachChi: {
        screen: DanhSachChi
    },
    ManHinh_ChiTietThu: {
        screen: ChiTietThu
    },
    ManHinh_ChiTietChi: {
        screen: ChiTietChi
    },
    ManHinh_KeHoach: {
        screen: KeHoach
    },
    ManHinh_ThongKe: {
        screen: ThongKe
    },
    ManHinh_ThongTin: {
        screen: ThongTin
    },
    ManHinh_ThayDoiThongTin: {
        screen: ThayDoiThongTin
    },
    ManHinh_ChiaSe: {
        screen: ChiaSe
    },
    ManHinh_TaiKhoanChiaSe: {
        screen: TaiKhoanChiaSe
    },
    ManHinh_Nhom: {
        screen: Nhom
    },
    ManHinh_VoiAi: {
        screen: VoiAi
    },
    ManHinh_NhomChi: {
        screen: NhomChi
    },
    ManHinh_VoiAiChi: {
        screen: VoiAiChi
    },
    ManHinh_Lich: {
        screen: Lich
    },
});

export const Drawer = DrawerNavigator({
    StackTrangChu: {
        screen: StackTrangChu,
    },

},
    {
        drawerWidth: 250,
        drawerPosition: 'left',

        contentComponent: props => <MenuQuanLyChiTieu  {...props} />
    });

