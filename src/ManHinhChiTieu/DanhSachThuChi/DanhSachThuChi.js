import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
    Dimensions,
} from 'react-native';

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
              <Text>Danh sách thu
                </Text>
               
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fd6a60', width:width-20, borderRadius: 10  , marginTop:10, marginBottom:10 }}
            onPress={() => { this.props.navigation.navigate('ManHinh_DanhSachChi', {id:this.props.navigation.state.params.id}) }}>
            <Text>Danh sách chi
                </Text>
            </TouchableOpacity>
            </View>
        );
    }
}