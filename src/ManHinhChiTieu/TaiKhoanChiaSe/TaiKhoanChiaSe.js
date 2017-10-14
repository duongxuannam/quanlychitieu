import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default class TaiKhoanChiaSe extends Component { 
    
    static navigationOptions = ({navigation})=>( {
        title: `tài khoản ${navigation.state.params.tenhienthi}`
    })

  
    render() {
        return (
            <View style={{ flex:1 , flexDirection: 'column'}}>
                {/* <Text>{this.props.navigation.state.params.id}</Text>
                <Text>{this.props.navigation.state.params.tenhienthi}</Text> */}
                <View style={{flex: 1, flexDirection: 'row', }}>
           <TouchableOpacity style={{flex: 1 , backgroundColor:'#8974b9',alignItems:'center', justifyContent:'center', margin: 5 , borderRadius:10, marginTop:10}}
           onPress={() => { this.props.navigation.navigate('ManHinh_DanhSachThu', {id:this.props.navigation.state.params.id}) }}>
           <Text style={{ fontSize: 15, fontWeight: '200', marginLeft: 10 }}>Danh sách thu
                   </Text>
               </TouchableOpacity>
               <TouchableOpacity style={{flex: 1 , backgroundColor:'#08cad6',alignItems:'center', justifyContent:'center', margin: 5 , borderRadius:10,marginTop:10}}
               onPress={() => { this.props.navigation.navigate('ManHinh_DanhSachChi', {id:this.props.navigation.state.params.id}) }}>

               <Text style={{ fontSize: 15, fontWeight: '200', marginLeft: 10 }}>Danh sách chi
                   </Text>
               </TouchableOpacity>
            </View>
             <View style={{flex: 1 , flexDirection: 'row'}}>
             <TouchableOpacity style={{flex: 1 , backgroundColor:'#3499e1',alignItems:'center', justifyContent:'center', margin: 5 , borderRadius:10, marginBottom:10}}
             onPress={() => { this.props.navigation.navigate('ManHinh_Thu', {id:this.props.navigation.state.params.id})}}>

             <Text style={{ fontSize: 15, fontWeight: '200', marginLeft: 10 }}>Thêm khoản thu
                   </Text>
               </TouchableOpacity>
               <TouchableOpacity style={{flex: 1 , backgroundColor:'#fd6a60',alignItems:'center', justifyContent:'center', margin: 5 , borderRadius:10, marginBottom:10}}
               onPress={() => { this.props.navigation.navigate('ManHinh_Chi', {id:this.props.navigation.state.params.id})}}>

               <Text style={{ fontSize: 15, fontWeight: '200', marginLeft: 10 }}>Thêm khoản chi
                   </Text>
               </TouchableOpacity>
            </View>
            </View>
        );
    }
}