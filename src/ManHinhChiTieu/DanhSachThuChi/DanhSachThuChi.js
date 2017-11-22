import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
    Dimensions,
    Image
} from 'react-native';

import t from '../../Hinh/t.png';
import c from '../../Hinh/c.png';

const { height, width } = Dimensions.get('window');

export default class DanhSachThuChi extends Component {
    static navigationOptions = {
        title: 'Danh sách thu chi'
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              
              <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#8974b9', width:width-20, borderRadius: 10, marginTop:10 }}
              onPress={() => { this.props.navigation.navigate('ManHinh_DanhSachThu', {id:this.props.navigation.state.params.id}) }}>
              <Image source={t} style={{ width: 40, height: 40 }} />
              <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Danh Sách Thu</Text>
               
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fd6a60', width:width-20, borderRadius: 10  , marginTop:10, marginBottom:10 }}
            onPress={() => { this.props.navigation.navigate('ManHinh_DanhSachChi', {id:this.props.navigation.state.params.id}) }}>
            <Image source={c} style={{ width: 40, height: 40 }} />
            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Danh sách Chi</Text>
            </TouchableOpacity>
            </View>
        );
    }
}