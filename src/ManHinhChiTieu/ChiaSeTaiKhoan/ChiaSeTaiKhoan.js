import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
    Image,
    FlatList,
    Alert,
    TouchableHighlight
} from 'react-native';
import Collapsible from 'react-native-collapsible';

import timkiem from '../../Hinh/timkiem.png';
import daux from '../../Hinh/daux.png';
import n from '../../Hinh/n.png';
import global from '../../global/global';

const { height, width } = Dimensions.get('window');

export default class ChiaSeTaiKhoan extends Component {
    static navigationOptions = {
        title: 'Chia sẽ với tài khoản khác'
    }
    constructor(props) {
        super(props);
        this.state = {
            mangdachiase: [

            ],
            mang: [

            ],
            refresh: false,
            tukhoa: '',
            collapsed: true,
            collapsed2: true
        }
    }
    componentDidMount() {
        this.layTatCaChiaSe();
    }
    layTatCaChiaSe() {
        fetch(global.urlAPI + 'layTatCaChiaSe.php',
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
                console.log('tat ca tai khoan chia se', resjson)
                this.setState({
                    mangdachiase: resjson
                });

            })
            .catch(e => console.log(e));
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
        fetch(global.urlAPI + 'xoaChiaSe.php',
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
            .then((res) => this.layTatCaChiaSe())
            .catch(e => console.log(e));

    }
    _toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }
    _toggleExpanded2 = () => {
        this.setState({ collapsed2: !this.state.collapsed2 });
    }

    timkiem(tukhoa) {
        fetch(global.urlAPI + 'timKiemTaiKhoan.php',
            {
                "method": "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "tukhoa": tukhoa

                })
            }
        )
            .then(res => res.json())
            .then(resjson => {
                console.log('load danh sách tk', resjson)
                this.setState({
                    mang: resjson
                });
            })
            .catch(e => console.log(e));
    }
    thongBaoTruocKhiThem(id) {
        Alert.alert(
            'Thông báo',
            'Bạn muốn chia sẽ với tài khoản này',
            [

                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.themChiaSe(id) },
            ],
            { cancelable: false }
        )
    }
    themChiaSe(id) {
        fetch(global.urlAPI + 'themChiaSe.php',
            {
                "method": "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "idchiase": this.props.navigation.state.params.id,
                    "idduocchiase": id,

                })
            }
        )
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.LoiTrung) {
                    Alert.alert(
                        'Lỗi',
                        'Đây là tài khoản của bạn',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    )
                }
                else if (resJson.Loi) {
                    Alert.alert(
                        'Lỗi',
                        'Tài khoản này đã được chia sẽ',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    )
                } else {
                    Alert.alert(
                        'Thông báo',
                        'Chia sẽ thành công',
                        [
                            {
                                text: 'OK', onPress: () => {
                                    this.setState({
                                        collapsed: true
                                    })
                                    this.setState({
                                        collapsed: false
                                    })
                                }
                            },
                        ],
                        { cancelable: false }
                    )
                }
            })
            .then((res) => this.layTatCaChiaSe())
            .catch(e => console.log(e));

    }
    render() {
        const koTimThay = (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text> Không tìm thấy tài khoản
                </Text>
            </View>
        );
        const listDuLieu = (
            <ScrollView >

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <FlatList
                        data={this.state.mang}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={{
                                padding: 10,
                                margin: 5,
                                width: width - 20,
                                backgroundColor: item.key === this.props.navigation.state.params.id ? '#fd6a60' : '#08cad6',
                                borderRadius: 10,
                                flexDirection: 'row'
                            }}
                                onPress={() => this.thongBaoTruocKhiThem(item.key)}
                            >
                                <View style={{ flex: 1, backgroundColor: item.key === this.props.navigation.state.params.id ? '#fd6a60' : '#08cad6', 
                                flex: 1, justifyContent: 'center', }}>
                                    <Image source={n} style={{ width: 40, height: 40 }} />
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Text>Email: {item.EMAIL}</Text>
                                    <Text>Tên hiển thị: {item.TENHIENTHI}</Text>
                                </View>
                            </TouchableOpacity>
                        } />
                </View>
            </ScrollView>
        )
        const hienThi = this.state.mang.length === 0 ? koTimThay : listDuLieu;
        const dstkdcs = (
            <FlatList
            data={this.state.mangdachiase}
            renderItem={({ item }) =>
                <View style={{ flexDirection: 'row', width: width - 20, backgroundColor: '#f06090', margin: 5, borderRadius: 10 }}>
                    <TouchableOpacity style={{ padding: 10, flexDirection: 'row', flex: 6 }}>
                        <View style={{ flex: 1, backgroundColor: '#f06090', flex: 1, justifyContent: 'center', }}>
                            <Image source={n} style={{ width: 40, height: 40 }} />
                        </View>
                        <View style={{ flex: 3 }}>
                            <Text>Email: {item.EMAIL}</Text>
                            <Text>Tên hiển thị: {item.TENHIENTHI}</Text>
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
        const dsr = (
            <Text style= {{ fontSize: 25 }}>Danh sách rỗng</Text>
        );
        const tkdcs = this.state.mangdachiase.length === 0 ? dsr : dstkdcs; 
        return (
            <ScrollView style={{ flex: 1 }}>

                <TouchableHighlight onPress={this._toggleExpanded}>
                    <View style={{
                        backgroundColor: '#F5FCFF',
                        padding: 10,
                    }}>
                        <Text style={{
                            textAlign: 'auto',
                            fontSize: 16,
                            fontWeight: '500',
                        }}>Tài khoản đã chia sẻ</Text>
                    </View>
                </TouchableHighlight>
                <Collapsible collapsed={this.state.collapsed} >
                    <View style={{

                        backgroundColor: '#fff', alignItems: 'center', justifyContent:'center'
                    }}>
                        <ScrollView>
                            {tkdcs}
                        </ScrollView>

                    </View>
                </Collapsible>
                <TouchableHighlight onPress={this._toggleExpanded2}>
                    <View style={{
                        backgroundColor: '#F5FCFF',
                        padding: 10,
                    }}>
                        <Text style={{
                            textAlign: 'auto',
                            fontSize: 16,
                            fontWeight: '500',
                        }}>Thêm chia sẻ</Text>
                    </View>
                </TouchableHighlight>
                <Collapsible collapsed={this.state.collapsed2} >
                    <View style={{
                        backgroundColor: '#fd6a60',
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        height: height / 10, flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <TextInput
                            placeholder='Nhập email tài khoản cần tìm'
                            placeholderTextColor='rgba(255, 255, 255, 0.7)'
                            returnKeyType='go'
                            underlineColorAndroid='transparent'
                            style={{
                                paddingLeft: 20,
                                marginLeft: 10,
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                margin: 10,
                                color: 'black',
                                flex: 6,
                                borderRadius: 15
                            }}
                            onChangeText={(value) => {
                                this.setState({ tukhoa: value });
                                this.timkiem(value);
                            }
                            }>

                        </TextInput>
                        <TouchableOpacity style={{ flex: 1 }}
                            onPress={() => { this.timkiem(this.state.tukhoa) }}
                        >
                            <Image source={timkiem} style={{ width: 47, height: 47 }} />
                        </TouchableOpacity>
                    </View>
                    {hienThi}
                </Collapsible>
            </ScrollView>
        );
    }
}