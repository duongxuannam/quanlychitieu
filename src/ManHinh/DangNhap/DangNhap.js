import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';

export default class DangNhap extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={{ flex: 1, justifyContent: 'center',
             backgroundColor: '#3498db' ,
             }}>
            
            <View style={{justifyContent: 'center', alignItems: 'center',

            }}>
            <Image style={{width:100,
            height: 100
            }} 
             source={require('./1.png')}  />
            </View>
            <View style={{ marginTop:10
                
            }}>
            <TextInput placeholder='địa chỉ email' 
            placeholderTextColor='rgba(255, 255, 255, 0.7)'
            returnKeyType='next'
            onSubmitEditing={()=>this.passwordInput.focus()}
            keyboardType='email-address'
             style={{height: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            margin: 10,
            color:'white',
            paddingHorizontal: 10,
            borderRadius: 15}}
            ></TextInput>
            <TextInput placeholder='mật khẩu' secureTextEntry
            placeholderTextColor='rgba(255, 255, 255, 0.7)'
            returnKeyType='go'
            ref={(input)=>{this.passwordInput = input}}
            style={{height: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                margin: 10,
                color:'white',
                paddingHorizontal: 10,
                borderRadius: 15}}
            ></TextInput>
            </View>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
          <TouchableOpacity style={{alignItems:'center', justifyContent:'center', margin: 10 }}>
              <Text style={{backgroundColor:'#304FFE', borderRadius: 15,
               padding:10, fontSize: 25, fontWeight:'700', color:'white'}}>Đăng kí</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center', justifyContent:'center',  margin: 10}}>
              <Text style={{backgroundColor:'#304FFE', borderRadius: 15,
               padding:10, fontSize: 25, fontWeight:'700', color:'white'}}>Đăng nhập</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={{alignItems:'center', justifyContent:'center', backgroundColor:'#304FFE',borderRadius: 15, margin:5}}>
              <Text style={{ borderRadius: 15,
               padding:10, fontSize: 25, fontWeight:'700', color:'white'}}>Đăng nhập với Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center', justifyContent:'center',  margin: 5,borderRadius: 15, backgroundColor:'#e74c3c',}}>
              <Text style={{ borderRadius: 15,
               padding:10, fontSize: 25, fontWeight:'700', color:'white'}}>Đăng nhập với Gmail</Text>
          </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}