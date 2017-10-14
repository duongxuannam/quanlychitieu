import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
// import {HomeStack, TabBar, SideMenu} from './Router';
import {StackTrangChu, Drawer} from './Router/Router2';
// import { StackTrangChu, Drawer } from './Router/Router2';
// import Splash from './ManHinh/Splash/Splash';
// import DangNhap from './ManHinh/DangNhap/DangNhap';
import DangNhap from './ManHinh/DangNhap/DangNhap'

export default class App extends Component {
    render() {
        return (
            //<HomeStack/>
            // <TabBar/>
            //    <SideMenu/>
            // <View>
          //  <View style={{flexDirection: 'row-reverse'}}>
                    <Drawer />
                
          //      <View style={{ flex: 1 }}>
            //        <Text>aaaa</Text>
             //   </View> 
               
           //  </View>




            //  <TabBar/>

            // <Drawer/>

            // <Splash/>
            // <DangNhap/>

        );
    }
}