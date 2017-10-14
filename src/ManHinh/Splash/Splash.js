import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

export default class Splash extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',
             backgroundColor: '#3498db' }}>
             <View style={{justifyContent:'center', flex:1}}>
             <Text style={{ fontSize: 35,
                color: 'white',
                fontWeight:'bold'
             }}>TƯ VẤN TUYỂN SINH
                </Text>
             </View>
             <View>
             <Text style={{ 
                 padding:10,
                color: 'white',
                fontWeight: '200'
             }}>ĐẠI HỌC THỦ DẦU MỘT
                </Text>
             </View>
            
            
                
            </View>
        );
    }
}