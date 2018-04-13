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
import c from '../../Hinh/c.png';
import f5 from '../../Hinh/f5.png';
import daux from '../../Hinh/daux.png';

export default class DanhSachChi extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Danh sách chi',
        headerRight: <TouchableOpacity onPress={() => {
            navigation.navigate('ManHinh_Chi', { id: navigation.state.params.id })
        }}>
            <Text style={{ marginRight: 20, fontSize: 18, color: 'black', fontWeight: 'bold' }}>Thêm</Text>
        </TouchableOpacity>
    })
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
        this.layTatCaChi();

    }
    layTatCaChi() {
        fetch(global.urlAPI + 'layTatCaChi.php',
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
                console.log('load danh sách chi', resjson)
                this.setState({
                    mang: resjson
                });
            })
            .catch(e => console.log(e));
    }
    loadDanhSachChi(resjson) {
        this.setState({
            mang: resjson
        });
    }

    thongbao(id) {
        Alert.alert(
            'Thông báo',
            'Bạn chắc chắn muốn xóa?',
            [
                { text: 'OK', onPress: () => this.xoa(id) },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
        )
    }
    xoa(id) {
        fetch(global.urlAPI + 'xoaChi.php',
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
            .then((res) => fetch(global.urlAPI + 'layTatCaChi.php',
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
                console.log('reload danh sách Chi', resjson)
                // this.setState({
                //     mang: resjson
                // });
                global.loadDanhSachChi(resjson);
            })
            .catch(e => console.log(e));

    }
    refresh() {
        this.setState({
            refresh: true
        });
        fetch(global.urlAPI + 'layTatCaChi.php', {
            "method": "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": this.props.navigation.state.params.id

            })
        })
            .then(res => res.json())
            .then(resjson => {
                this.setState({
                    mang: resjson,
                    refresh: false,
                });
            })
            .catch(e => console.log(e));
    }
    render() {
        const rong = (
            <View style={{ justifyContent: 'center', alignItems: "center" }}>
                <Text style={{ fontSize: 30, color: '#8974b9' }}>Danh sách rỗng</Text>

                <TouchableOpacity
                    onPress={() => { this.layTatCaChi() }}>


                    <Image source={f5} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
            </View>
        );
        const danhsach = (
            <FlatList
                refreshing={this.state.refresh}
                onRefresh={() => this.refresh()}
                data={this.state.mang}
                renderItem={(item, i) => 
                    
                        <View id={i} style={{ flexDirection: 'row', width: width - 20, backgroundColor: '#08cad6', margin: 5, borderRadius: 10 }}>
                            <TouchableOpacity style={{ padding: 10, flexDirection: 'row', flex: 6 }}
                                onPress={() => { this.props.navigation.navigate('ManHinh_ChiTietChi', { id: item.key, idTaiKhoan: this.props.navigation.state.params.id }) }}>

                                <View style={{ flex: 1, backgroundColor: '#08cad6', flex: 1, justifyContent: 'center', }}>
                                    <Image source={c} style={{ width: 40, height: 40 }} />
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Text>Ngày: {moment(item.NGAY).format('DD-MM-YYYY')}</Text>
                                    <Text>Số tiền: {item.TIEN} đồng</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.thongbao(item.key)}>
                                    <Image source={daux} style={{ width: 17, height: 17 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
               
                }

            />
        );
        const hienthi = this.state.mang.length === 0 ? rong : danhsach;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {hienthi}
            </View>
        );
    }
}