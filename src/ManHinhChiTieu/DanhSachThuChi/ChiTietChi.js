import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
    Dimensions,
    TextInput
} from 'react-native';
import global from '../../global/global';


const { height, width } = Dimensions.get('window');

export default class ChiTietChi extends Component {
    static navigationOptions = {
        title: 'Chỉnh sửa khoản chi'
    }
    constructor(props){
        super(props);
        this.state = {
            nhom: 'Vui lòng chọn nhóm',
            voiAi: 'Vui lòng chọn với ai'
        };
        global.chonNhomChi = this.chonNhom.bind(this);
        global.chonNguoiChi = this.chonNguoi.bind(this)
    }
    componentDidMount() {
        console.log('aa', this.props.navigation.state.params.id)
     }
    chonNhom(nhom) {
        this.setState({
            nhom: nhom
        })
    }
    chonNguoi(nguoi) {
        this.setState({
            voiAi: nguoi
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ flex: 1,width:width, justifyContent:'center', alignItems:'center', flexDirection:'row', backgroundColor: '#3499e1', margin: 5, borderRadius: 5, width:width-20}}
                onPress={() => { this.props.navigation.navigate('ManHinh_NhomChi',{ nhom: this.state.nhom }) }}>
                    <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 1}}>Thuộc nhóm</Text>
                    <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 3}}>{this.state.nhom}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1,width:width , justifyContent:'center', alignItems:'center' , flexDirection:'row' , backgroundColor: '#08cad6', margin: 5, borderRadius: 5, width:width-20}}
                    onPress={() => { this.props.navigation.navigate('ManHinh_VoiAiChi',{ voiAi: this.state.voiAi }) }}>
                <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 1}}>Với</Text>
                    <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 3}}>{this.state.voiAi}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1,width:width , justifyContent:'center', alignItems:'center' , flexDirection:'row', backgroundColor: '#fd6a60' , margin: 5, borderRadius: 5, width:width-20}}>
                <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 1}}>Thời gian</Text>
                    <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 3}}>Hôm nay</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1,width:width , justifyContent:'center', alignItems:'center', flexDirection:'row', backgroundColor: '#f06090' , margin: 5 , borderRadius: 5, width:width-20}}>
                <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 1}}>Ghi chú</Text>
                    {/* <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 2}}>Ghi chú</Text> */}
                    <TextInput placeholder='Nhập ghi chú' 
            placeholderTextColor='rgba(255, 255, 255, 0.7)'
            returnKeyType='go'
            ref={(input)=>{this.passwordInput = input}}
            underlineColorAndroid='transparent'
            style={{
                paddingLeft: 20,
             marginLeft:10, flex: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                margin: 10,
                color:'white',
                
                borderRadius: 15}}
            ></TextInput>
                </TouchableOpacity>
                
                   
                <TouchableOpacity style={{ flex: 1,width:width , justifyContent:'center', alignItems:'center', flexDirection:'row' , backgroundColor: '#8974b9' , margin: 5, borderRadius: 5, width:width-20}}>
                <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 1}}>Số tiền</Text>
                    {/* <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 3}}>Số tiền</Text> */}
                    <TextInput placeholder='Nhập số tiền' 
            placeholderTextColor='rgba(255, 255, 255, 0.7)'
            underlineColorAndroid='transparent'
            returnKeyType='go' keyboardType='numeric'
            ref={(input)=>{this.passwordInput = input}}
            style={{
                paddingLeft: 20,
             marginLeft:10, flex: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                margin: 10,
                color:'white',
                
                borderRadius: 15}}
            ></TextInput>
                </TouchableOpacity>
                    {/* <TouchableOpacity style={{  backgroundColor: '#4dce96', justifyContent:'center', alignItems:'center' , borderRadius: 10, margin:20, padding: 20 }}>
               
                    <Text style={{fontSize: 20, fontWeight:'200',}}>Lưu</Text>
                    </TouchableOpacity> */}
            </View>
        );
    }
}