import React from 'react';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator, 
} from 'react-navigation';
import TrangChu from '../ManHinh/TrangChu/TrangChu';
import TaiKhoan from '../ManHinh/TaiKhoan/TaiKhoan';
import NoiDung from '../ManHinh/NoiDung/NoiDung';
import Menu from '../ManHinh/Menu/Menu';
import TinTucThongBao from '../ManHinh/TinTucThongBao/TinTucThongBao';
import ThongTinTuyenSinh from '../ManHinh/ThongTinTuyenSinh/ThongTinTuyenSinh';
import Nganh from '../ManHinh/Nganh/Nganh';
import GioiThieu from '../ManHinh/GioiThieu/GioiThieu';
import HuongDan from '../ManHinh/HuongDan/HuongDan';
import HoiDap from '../ManHinh/HoiDap/HoiDap';

export const StackTinTucThongBao = StackNavigator({

    ManHinh_TinTucThongBao: {
        screen: TinTucThongBao,
        navigationOptions: {
        //    title: 'Trang chủ'
       
            
        }
    },
   ManHinh_NoiDung: {
    screen: NoiDung,
    // navigationOptions:{
    //     title: 'Noi Dung'
    // }
},
ManHinh_Nganh: {
    screen: Nganh,
    // navigationOptions:{
    //     title: 'Noi Dung'
    // }
},

});
export const StackThongTinTuyenSinh = StackNavigator({
    ManHinh_ThongTinTuyenSinh: {
        screen: ThongTinTuyenSinh,
        // navigationOptions:{
        //     title: 'Noi Dung'
        // }
    }
});

export const StackMenu = StackNavigator({
    ManHinh_Menu: {
        screen: Menu,
        // navigationOptions:{
        //     title: 'Menu'
        // }
    }
});


export const NganhTabBar = TabNavigator({
    Nganh1: {
        screen: Nganh,
        navigationOptions:{
            tabBarLabel: 'Đại học'
        },  
    },
    Nganh2:{
        screen: Nganh,
        navigationOptions:{
            tabBarLabel: 'Cao đẳng'
        },  
    }
},
{
    tabBarPosition: 'bottom',
    tabBarOptions:{
        style:{
            backgroundColor:'#3498db'
        },
        activeTintColor:'red',
        inactiveTintColor:'yellow',
   
    },

});

export const TabBar = TabNavigator({
    TinTuc: {
        screen: TinTucThongBao,
        navigationOptions:{
            tabBarLabel: 'TIN TỨC-THÔNG BÁO'
        },  
    },
    HoiDap: {
        screen: HoiDap,
        navigationOptions:{
            tabBarLabel: 'HỎI-ĐÁP',
        },
      
    },
    ThongTin: {
        screen: ThongTinTuyenSinh,
        navigationOptions:{
            tabBarLabel: 'THÔNG TIN TUYỂN SINH',
        },
      
    },
    Nganh: {
        screen: NganhTabBar,
        navigationOptions:{
            tabBarLabel: 'NGÀNH VÀ CHUYÊN NGHÀNH'
        },
      
    },
    HuongDan: {
        screen: HuongDan,
        navigationOptions:{
            tabBarLabel: 'HƯỚNG DẪN THỦ TỤC'
        },
      
    },
    GioiThieuTruong: {
        screen: GioiThieu,
        navigationOptions:{
            tabBarLabel: 'GIỚI THIỆU TRƯỜNG'
        },
      
    },
    
    
  
},
{
    tabBarPosition: 'top',
    tabBarOptions:{
        style:{
            backgroundColor:'#3498db'
        },
        activeTintColor:'red',
        inactiveTintColor:'yellow',
        scrollEnabled: true
    },

});

export const Drawer = DrawerNavigator({
    Tabbar:{
        screen: TabBar,
    },
    Trangchu:{
        screen: StackTinTucThongBao,
    },
    
//     ManHinh_TinTucThongBao: {
//         screen: TinTucThongBao,
//         navigationOptions: {
//         //    title: 'Trang chủ'
       
            
//         }
//     },
//    ManHinh_NoiDung: {
//     screen: NoiDung,
//     // navigationOptions:{
//     //     title: 'Noi Dung'
//     // }
// },
// ManHinh_Nganh: {
//     screen: Nganh,
//     // navigationOptions:{
//     //     title: 'Noi Dung'
//     // }
// },
},
{
    drawerWidth: 200,
    drawerPosition: 'left',
    
    contentComponent: props =><Menu/>
});