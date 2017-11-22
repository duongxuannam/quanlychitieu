import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet,
    TextInput,
    AsyncStorage,
    Alert
} from 'react-native';

import { TabBar } from '../../Router/Router2.js';
import t from '../../Hinh/t.png';
import c from '../../Hinh/c.png';
import dcs from '../../Hinh/dcs.png';
import cstk from '../../Hinh/cstk.png';
import tk from '../../Hinh/tk.png';
import dstc from '../../Hinh/dstc.png';
import sdtk from '../../Hinh/sdtk.png';
import global from '../../global/global';


const { height, width } = Dimensions.get('window');

export default class TrangChu extends Component {
    static navigationOptions = {
        // title: 'Tai Khoan'
    }
    constructor(props) {
        super(props);
        this.state = {
            daDangNhap: false,
            isSignIn: false,
            email: '',
            matkhau: '',
            id: '',
            tenhienthi: '',
            tenhienthidangki: '',
            matkhaudangki: '',
            nhaplaimatkhaudangki: '',

        }
        global.dangXuat = this.dangXuat.bind(this);

    }
    componentDidMount() {

        this.getToken()
            .then(id => {
                if (!id.Loi) {
                    this.kiemTraDangNhap(id)
                }

            }
            )

    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      };


    dangXuat() {
        this.setState({
            daDangNhap: false
        });
        this.delToken();
    }
    dangKi() {
        this.setState({
            isSignIn: true
        })
    };
    dangNhap() {
        this.setState({
            isSignIn: false
        })
    }

    savToken = async (token) => {
        await AsyncStorage.setItem('@token', token)
    }
    getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@token');
            console.log('giá trị token', value)
            if (value !== null) {
                return value;
            }
            return { Loi: 'cmm' };
        } catch (error) {
            return { Loi: 'cmm' };
        }
    }
    delToken = async () => {
        await AsyncStorage.removeItem('@token')
    }


    dangKiThietne() {
        if (this.state.tenhienthidangki === '' || this.state.matkhaudangki === '' || this.state.email === '' || this.state.nhaplaimatkhaudangki === '') {
            Alert.alert(
                'Lỗi',
                'Vui lòng điền đầy đủ thông tin',
                [


                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        } else if(!this.validateEmail(this.state.email)){
            Alert.alert(
                'Lỗi',
                'Email không đúng định dạng',
                [


                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
        else if (this.state.matkhaudangki.length <= 5) {
            Alert.alert(
                'Lỗi',
                'Mật khẩu phải có ít nhất 5 kí tự',
                [


                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
        else if (this.state.matkhaudangki !== this.state.nhaplaimatkhaudangki) {
            Alert.alert(
                'Lỗi',
                'Mật khẩu và nhập lại không chính xác',
                [


                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
        else {
            fetch(global.urlAPI + 'themTaiKhoan.php',
                {
                    "method": "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "tenhienthidangki": this.state.tenhienthidangki,
                        "matkhaudangki": this.state.matkhaudangki,
                        "emaildangki": this.state.email,

                    })
                }
            )
                .then((res) => res.json())
                .then((resJson) => {
                    if (resJson.Loi) {
                        Alert.alert(
                            'Lỗi',
                            'Email đã tồn tại',
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false }
                        )
                    } else {
                        Alert.alert(
                            'Thong báo',
                            'Bạn đã đăng kí thành công',
                            [
                                {
                                    text: 'OK', onPress: () => this.setState({
                                        isSignIn: false
                                    })
                                },
                            ],
                            { cancelable: false }
                        )

                    }
                })
                .catch(e => {
                    Alert.alert(
                        'Lỗi',
                        'Lỗi sql',
                        [


                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    )
                })
        }
    }
    dangNhapThietNe() {
        fetch(global.urlAPI + 'dangNhap.php',
            {
                "method": "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": this.state.email,
                    "matkhau": this.state.matkhau
                })
            }
        )
            .then((res) => res.json())
            .then((resJson) => {
                console.log('aa', resJson);
                global.setStateMenu(resJson);
                this.kiemTraDangNhap(resJson.ID);
                this.savToken(resJson.ID);
                this.setState({
                    daDangNhap: true
                })
                // this.getToken().then(a=>console.log(a))
            })
            .catch(e => {
                Alert.alert(
                    'Lỗi',
                    'Tài khoản hoặc mật khẩu không đúng',
                    [


                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
            })
    }
    kiemTraDangNhap(id) {

        fetch(global.urlAPI + 'kiemTraDangNhap.php',
            {
                "method": "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": id

                })
            }
        )
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    id: res.ID,
                    tenhienthi: res.TenHienThi
                })
                if (this.state.id !== null) {
                    this.setState({
                        daDangNhap: true
                    })
                    console.log(this.state)
                }
            })
        // .catch(e => {
        //     Alert.alert(
        //         'Lỗi',
        //         'ếu có id sao đăng nhập',
        //         [


        //             { text: 'OK', onPress: () => console.log('OK Pressed') },
        //         ],
        //         { cancelable: false }
        //     )
        // })
    }


    render() {
        const DangNhapJSX = (
            <View>
                <TextInput placeholder='Email'
                    style={styles.inPutStyle}
                    underlineColorAndroid='transparent'
                    value={this.state.email}

                    onChangeText={(value) => this.setState({
                        email: value
                    }
                    )}
                />
                <TextInput placeholder='Password'
                    secureTextEntry
                    style={styles.inPutStyle}
                    underlineColorAndroid='transparent'
                    value={this.state.matkhau}

                    onChangeText={(value) => this.setState({
                        matkhau: value
                    }
                    )}
                />
                <TouchableOpacity style={{
                    height: 50, borderRadius: 20, borderWidth: 1, borderColor: 'white',
                    justifyContent: 'center', alignItems: 'center'
                }}
                    onPress={this.dangNhapThietNe.bind(this)}>
                    <Text style={{ color: 'white', fontWeight: '400' }}>Đồng ý</Text>
                </TouchableOpacity >

            </View>
        );
        const DangKiJSX = (
            <View>


                <TextInput placeholder='Tên hiển thị'
                    style={styles.inPutStyle}
                    underlineColorAndroid='transparent'
                    value={this.state.tenhienthidangki}
                    onChangeText={(value) => this.setState({
                        tenhienthidangki: value
                    }
                    )}
                />
                <TextInput placeholder='Email'
                    style={styles.inPutStyle}
                    underlineColorAndroid='transparent'
                    value={this.state.email}

                    onChangeText={(value) => this.setState({
                        email: value
                    }
                    )}
                />
                <TextInput placeholder='Password'
                    secureTextEntry
                    style={styles.inPutStyle}
                    underlineColorAndroid='transparent'
                    value={this.state.matkhaudangki}

                    onChangeText={(value) => this.setState({
                        matkhaudangki: value
                    }
                    )}
                />
                <TextInput placeholder='Nhập lại password'
                    secureTextEntry
                    style={styles.inPutStyle}
                    underlineColorAndroid='transparent'
                    value={this.state.nhaplaimatkhaudangki}

                    onChangeText={(value) => this.setState({
                        nhaplaimatkhaudangki: value
                    }
                    )}
                />
                <TouchableOpacity style={{
                    height: 50, borderRadius: 20, borderWidth: 1, borderColor: 'white',
                    justifyContent: 'center', alignItems: 'center', marginTop: 10
                }}
                    onPress={this.dangKiThietne.bind(this)}
                >
                    <Text style={{ color: 'white', fontWeight: '400' }}>Đăng kí</Text>
                </TouchableOpacity >

            </View>
        );
        const TrangThaiTaiKhoan = this.state.isSignIn ? DangKiJSX : DangNhapJSX;
        const titleTaiKhoan = this.state.isSignIn ? 'Đăng kí' : 'Đăng nhập';
        const TaiKhoanJSX = (
            <View style={{
                flex: 1, width: width,
                backgroundColor: '#2980b9', justifyContent: 'space-between', padding: 20
            }}
            >
                <View style={styles.row1}>
                    <Text style={styles.titleStyle}>{titleTaiKhoan}</Text>
                </View>
                {
                    TrangThaiTaiKhoan
                }
                <View style={styles.control}>
                    <TouchableOpacity style={{
                        backgroundColor: 'white',
                        flex: 1, alignItems: 'center',
                        paddingVertical: 20
                        , borderBottomLeftRadius: 20,
                        borderTopLeftRadius: 20,
                        marginRight: 1
                    }}
                        onPress={this.dangNhap.bind(this)}

                    >
                        <Text style={!this.state.isSignIn ? styles.Active : styles.nonActive}>Đăng nhập</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={{
                        backgroundColor: 'white',
                        flex: 1, alignItems: 'center',
                        paddingVertical: 20
                        , borderBottomRightRadius: 20,
                        borderTopRightRadius: 20,
                        marginLeft: 1
                    }}
                        onPress={this.dangKi.bind(this)}

                    >
                        <Text style={this.state.isSignIn ? styles.Active : styles.nonActive}>Đăng kí</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
        const TrangChuJSX = (
            <View>
                <View style={{ flex: 2, width: width, flexDirection: 'row', }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3499e1', borderRadius: 5, marginRight: 5, margin: 10 }}
                        onPress={() => { this.props.navigation.navigate('ManHinh_Thu', { id: this.state.id }) }}>
                        <Image source={t} style={{ width: 40, height: 40 }} />
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Thu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3499e1', borderRadius: 5, marginLeft: 5, margin: 10 }}
                        onPress={() => { this.props.navigation.navigate('ManHinh_Chi', { id: this.state.id }) }}>
                        <Image source={c} style={{ width: 40, height: 40 }} />
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Chi</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fd6a60', borderRadius: 5, margin: 5, marginRight: 10, marginLeft: 10, flexDirection: 'row' }}
                    onPress={() => { this.props.navigation.navigate('ManHinh_SoDuTaiKhoan', { id: this.state.id }) }}>
                    <View style={{ backgroundColor: '#fd6a60', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={sdtk} style={{ width: 40, height: 40, }} />
                    </View>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: '200', flex: 3, marginLeft: 10 }}>Số dư tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8974b9', borderRadius: 5, margin: 5, marginRight: 10, marginLeft: 10, flexDirection: 'row' }}
                    onPress={() => { this.props.navigation.navigate('ManHinh_DanhSachThuChi', { id: this.state.id }) }}>
                    <View style={{ backgroundColor: '#8974b9', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={dstc} style={{ width: 40, height: 40, }} />
                    </View>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: '200', flex: 3, marginLeft: 10 }}>Danh sách thu chi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#08cad6', borderRadius: 5, margin: 5, marginRight: 10, marginLeft: 10, flexDirection: 'row' }}
                    onPress={() => { this.props.navigation.navigate('ManHinh_ChiaSeTaiKhoan', { id: this.state.id }) }}>
                    <View style={{ backgroundColor: '#08cad6', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={cstk} style={{ width: 40, height: 40, }} />
                    </View>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: '200', flex: 3, marginLeft: 10 }}>Chia sẻ tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f06090', borderRadius: 5, margin: 5, marginRight: 10, marginLeft: 10, flexDirection: 'row' }}
                    onPress={() => { this.props.navigation.navigate('ManHinh_ChiaSe', { id: this.state.id }) }}>
                    <View style={{ backgroundColor: '#f06090', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={dcs} style={{ width: 40, height: 40, }} />
                    </View>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: '200', flex: 3, marginLeft: 10 }}>Được chia sẻ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4dce96', borderRadius: 5, margin: 5, marginRight: 10, marginLeft: 10, flexDirection: 'row' }}
                    onPress={() => { this.props.navigation.navigate('ManHinh_ThongKe', { id: this.state.id }) }}>
                    <View style={{ backgroundColor: '#4dce96', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={tk} style={{ width: 40, height: 40, }} />
                    </View>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: '200', flex: 3, marginLeft: 10 }}>Thống kê</Text>
                </TouchableOpacity>
            </View>
        );
        const giaoDienTrangChu = this.state.daDangNhap ? TrangChuJSX : TaiKhoanJSX
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
                {
                    giaoDienTrangChu
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    row1: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    titleStyle: { color: 'white', fontSize: 20 },
    control: {
        flexDirection: 'row',
    },
    inPutStyle: {
        height: 50,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30
    },
    Active: {
        color: '#2980b9'
    },
    nonActive: {
        color: 'silver'
    }
});


