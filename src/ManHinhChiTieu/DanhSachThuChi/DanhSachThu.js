import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Image,
    Alert
} from 'react-native';
import moment from 'moment';
import global from '../../global/global';
const { height, width } = Dimensions.get('window');
import daux from '../../daux.png';

export default class DanhSachThu extends Component {
    static navigationOptions = {
        title: 'Danh sách thu'
    }
    constructor(props) {
        super(props);
        this.state = {
            mang: [

            ],
            refresh: false,
        }
        global.loadDanhSachThu = this.loadDanhSachThu.bind(this);
    }
    componentDidMount() {

        fetch(global.urlAPI + 'layTatCaThu.php',
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
                console.log('load danh sách thu', resjson)
                this.setState({
                    mang: resjson
                });
            })
            .catch(e => console.log(e));
    }
    loadDanhSachThu(resjson) {
        this.setState({
            mang: resjson
        });
    }
    thongbao(id){
        Alert.alert(
            'Thông báo',
            'Bạn chắc chắn muốn xóa?',
            [
              {text: 'OK', onPress: () => this.xoa(id)},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          )
    }
    xoa(id){
        fetch(global.urlAPI + 'xoaThu.php',
            {
                "method": "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": id,
                })
            }
        )
            .then((res) => fetch(global.urlAPI + 'layTatCaThu.php',
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
            ))
            .then(res => res.json())
            .then(resjson => {
                console.log('reload danh sách Thu', resjson)
                // this.setState({
                //     mang: resjson
                // });
                global.loadDanhSachThu(resjson);
            })
            .catch(e => console.log(e));

    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <FlatList
                    data={this.state.mang}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', width: width - 20, backgroundColor: '#08cad6', margin: 5, borderRadius: 10 }}>
                            <TouchableOpacity style={{ padding: 10, flexDirection: 'row', flex: 6 }}
                                onPress={() => { this.props.navigation.navigate('ManHinh_ChiTietThu', { id: item.key, idTaiKhoan: this.props.navigation.state.params.id }) }}>

                                <View style={{ flex: 1 }}>
                                    <Text>hinh</Text>
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Text>Ngày: {moment(item.NGAY).format('DD-MM-YYYY')}</Text>
                                    <Text>Số tiền: {item.TIEN} đồng</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={ () => this.thongbao(item.key) }>
                                <Image source={daux} style={{ width: 17, height: 17 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }

                />
            </View>
        );
    }
}