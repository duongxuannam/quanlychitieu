import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
    Dimensions,
} from 'react-native';
import global from '../../global/global';

const { height, width } = Dimensions.get('window');

export default class SoDuTaiKhoan extends Component {
    static navigationOptions = {
        title: 'Số dư tài khoản'
    }
    constructor(props){
        super(props);
        this.state = {
        //    tongThu :'',
        //    tongChi:'',
           soDuTaiKhoan:''
        };

    }
    componentDidMount() {
        console.log('aa', this.props.navigation.state.params.id);
        fetch(global.urlAPI + 'soDuTaiKhoan.php',
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
            console.log('số dư tài khoản',resjson);
            this.setState({
                tongThu: resjson.TongThu,
                tongChi: resjson.TongChi,
                soDuTaiKhoan: resjson.TongThu-resjson.TongChi,
            })
        })
        .catch(e => console.log(e));
     }
    render() {
        tongthu = this.state.tongThu !== null ? this.state.tongThu : 0;
        tongchi = this.state.tongChi !== null ? this.state.tongChi : 0;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{flex: 1,width: width- 20 , justifyContent: 'center', alignItems: 'center', backgroundColor:'#fd6a60', borderRadius:10, margin:10}}>
                <Text>Số dư tài khoản
                </Text>
                <Text>{this.state.soDuTaiKhoan !== null ? this.state.soDuTaiKhoan : 0} đồng
                </Text>
                </View>
                <View style={{ flex: 2, width:width, flexDirection:'row' , borderRadius:10}}>
                
                <View  style={{ flex: 2, backgroundColor:'#8974b9', justifyContent: 'center', alignItems: 'center', borderRadius:10, marginLeft:10, marginBottom:10}}>
                    <Text>Tổng số tiền thu
                </Text>
                <Text>{tongthu} đồng
                </Text>
                </View>
                <View style={{ flex: 2, backgroundColor:'#08cad6', justifyContent: 'center', alignItems: 'center', borderRadius:10, marginLeft:10, marginBottom:10, marginRight:10}}>
                <Text>Tổng số tiền chi
                </Text>
                <Text>{tongchi} đồng
                </Text>

                </View>
                
                
                </View>
                
               
            </View>
        );
    }
}