import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class Menu extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Em là cái menu
                </Text>
                <TouchableOpacity style={{backgroundColor: 'red' }}
                
                onPress={()=>{this.props.navigation.navigate('ManHinh_TrangChu')}}
                >
                    <Text style={{color:'black', fontSize:20, padding:10}}>Gọi đường dây nóng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'red' }}
                
                onPress={()=>{this.props.navigation.navigate('ManHinh_TrangChu')}}
                >
                    <Text style={{color:'black', fontSize:20, padding:10}}>Nhắn tin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'red' }}
                
                onPress={()=>{this.props.navigation.navigate('ManHinh_TrangChu')}}
                >
                    <Text style={{color:'black', fontSize:20, padding:10}}>Chi tiết liên hệ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'red' }}
                
                onPress={()=>{this.props.navigation.navigate('ManHinh_TrangChu')}}
                >
                    <Text style={{color:'black', fontSize:20, padding:10}}>Website</Text>
                </TouchableOpacity>
             
            </View>
        );
    }
}