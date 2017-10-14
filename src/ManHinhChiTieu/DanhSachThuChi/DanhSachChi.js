import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';
import moment from 'moment';
import global from '../../global/global';
const { height, width } = Dimensions.get('window');

export default class DanhSachChi extends Component {
    static navigationOptions = {
        title: 'Danh sách chi'
    }
    constructor(props) {
        super(props);
        this.state = {
            mang: [

            ],
            refresh: false,
        }
        global.loadDanhSachChi = this.loadDanhSachChi.bind(this);
    }
    componentDidMount() {
       
        fetch(global.urlAPI +'layTatCaChi.php',
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
                console.log('load danh sách chi',resjson)
                this.setState({
                    mang: resjson
                });
            })
            .catch(e => console.log(e));
    }
    loadDanhSachChi(resjson){
        this.setState({
            mang: resjson
        });
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <FlatList 
                    data={this.state.mang}
                    renderItem={({ item }) =>
                    <TouchableOpacity style={{ padding: 10 , margin: 5, width:width-20, backgroundColor: '#08cad6', borderRadius: 10, flexDirection:'row'}}
                    onPress={() => { this.props.navigation.navigate('ManHinh_ChiTietChi', {id:item.key, idTaiKhoan:this.props.navigation.state.params.id})  }}>

                    <View style={{flex:1}}>
                        <Text>hinh</Text>
                        </View>
                       <View style={{flex:3}}>
                        <Text>Ngày: {moment(item.NGAY).format('DD-MM-YYYY')}</Text>
                        <Text>Số tiền: {item.TIEN} đồng</Text>
                        </View>
                    </TouchableOpacity>
                    }
         
                />
            </View>
        );
    }
}