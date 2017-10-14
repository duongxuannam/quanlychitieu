import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
    Dimensions,
    TextInput,
   
} from 'react-native';
import global from '../../global/global';


const { height, width } = Dimensions.get('window');

export default class ChiTietThu extends Component {
    static navigationOptions = {
        title: 'Chỉnh sửa khoản thu'
    }
    constructor(props){
        super(props);
        this.state = {
            nhom: 'Vui lòng chọn nhóm',
            voiAi: 'Vui lòng chọn với ai',
            lich: '',
            ghiChu:'',
            soTien:''
        };
        global.chonNhom = this.chonNhom.bind(this);
        global.chonNguoi = this.chonNguoi.bind(this);
        global.chonNgay = this.chonNgay.bind(this);
    }
    componentDidMount() {
        console.log('aa', this.props.navigation.state.params.id);
        fetch('http://192.168.215.2:8080/APIQuanLyChiTieu/chiTietThu.php',
        {
            "method": "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": this.props.navigation.state.params.id

            })
        }
    )
        .then(res => res.json())
        .then(resjson => {
            console.log('hiêp sỹ trong tay có kiếm',resjson)
            this.setState({
                nhom: resjson.TenLoaiThu,
                voiAi: resjson.VoiAi,
                lich: resjson.Ngay,
                ghiChu: resjson.GhiChu,
                soTien: resjson.Tien
            });
        })
        .catch(e => console.log(e));
     }
    chonNgay(ngay) {
        this.setState({
            lich: ngay
        })
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
        
        const hienThiThoiGian = this.state.lich == '' ? 'Mời chọn ngày' : this.state.lich;
        return (
   
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ flex: 1,width:width, justifyContent:'center', alignItems:'center', flexDirection:'row', backgroundColor: '#3499e1', margin: 5, borderRadius: 5, width:width-20}}
                onPress={() => { this.props.navigation.navigate('ManHinh_Nhom',{ nhom: this.state.nhom }) }}>
                    <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 1}}>Thuộc nhóm</Text>
                    <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 3}}>{this.state.nhom}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1,width:width , justifyContent:'center', alignItems:'center' , flexDirection:'row' , backgroundColor: '#08cad6', margin: 5, borderRadius: 5, width:width-20}}
                    onPress={() => { this.props.navigation.navigate('ManHinh_VoiAi',{ voiAi: this.state.voiAi }) }}>
                <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 1}}>Với</Text>
                    <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 3}}>{this.state.voiAi}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1,width:width , justifyContent:'center', alignItems:'center' , flexDirection:'row', backgroundColor: '#fd6a60' , margin: 5, borderRadius: 5, width:width-20}}
                    onPress={() => { this.props.navigation.navigate('ManHinh_Lich',{ nhom: this.state.lich }) }}>
                <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 1}}>Thời gian</Text>
                    <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 3}}>{hienThiThoiGian}</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1,width:width , justifyContent:'center', alignItems:'center', flexDirection:'row', backgroundColor: '#f06090' , margin: 5 , borderRadius: 5, width:width-20}}>
                <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 1}}>Ghi chú</Text>
                    {/* <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 2}}>Ghi chú</Text> */}
                    <TextInput placeholder='Nhập ghi chú'   
                    value={this.state.ghiChu} 
            placeholderTextColor='rgba(255, 255, 255, 0.7)'
            returnKeyType='go'
            underlineColorAndroid='transparent'
            onSubmitEditing={()=>this.passwordInput.focus()}
            ref={(input)=>{this.passwordInput = input}}
            /* onChangeText={(value)=>{this.setState({})}} */
            style={{
                paddingLeft: 20,
                marginLeft:10, flex: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                margin: 10,
                color:'white',
                
                borderRadius: 15}}
                onChangeText={(value) => this.setState({
                        ghiChu: value
                    }
                    )}
            ></TextInput>
                </TouchableOpacity>
                
                   
                <TouchableOpacity style={{ flex: 1,width:width , justifyContent:'center', alignItems:'center', flexDirection:'row' , backgroundColor: '#8974b9' , margin: 5, borderRadius: 5, width:width-20}}>
                <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 1}}>Số tiền</Text>
                    {/* <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 3}}>Số tiền</Text> */}
                    <TextInput placeholder='Nhập số tiền' 
                    value={this.state.soTien} 
            placeholderTextColor='rgba(255, 255, 255, 0.7)'
            returnKeyType='go' keyboardType='numeric'
            underlineColorAndroid='transparent'
            
            style={{
                paddingLeft: 20,
                marginLeft:10, flex: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                margin: 10,
                color:'white',
                
                borderRadius: 15}}
                onChangeText={(value) => {this.setState({
                        soTien: value
                    }
                    )
                    console.log(this.state)}
                    }
            ></TextInput>
                </TouchableOpacity>
                    {/* <TouchableOpacity style={{  backgroundColor: '#4dce96', justifyContent:'center', alignItems:'center' , borderRadius: 10, margin:20, padding: 20 }}>
               
                    <Text style={{fontSize: 20, fontWeight:'200',}}>Lưu</Text>
                    </TouchableOpacity> */}
            </View>
       
        );
    }
}