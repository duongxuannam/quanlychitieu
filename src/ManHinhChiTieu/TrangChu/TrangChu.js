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
import daidien from '../../profile.png';
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
            id:'',
            tenhienthi:'',       
        }
        global.dangXuat = this.dangXuat.bind(this);
        
    }
    componentDidMount(){
       
        this.getToken()
        .then(id => this.kiemTraDangNhap(id))
   
    }
    
  
    
 
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

    savToken = async (token) =>{
        await AsyncStorage.setItem('@token', token)
    }
    getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@token');
            if (value !== null) {
                return JSON.parse(value);
            }
            return '';
        } catch (error) {
            return '';
        }
    }
    delToken = async () => {
        await AsyncStorage.removeItem('@token')
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
                console.log('aa',resJson);
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
    kiemTraDangNhap(id){
    
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
        .then((res)=>{
            this.setState({
                id: res.ID,
                tenhienthi: res.TenHienThi
            })
            if(this.state.id !== null){
                this.setState({
                    daDangNhap: true
                })
                console.log(this.state)
            }
        })
        // .catch(e => {
        //     Alert.alert(
        //         'Lỗi',
        //         'Tài khoản hoặc mật khẩu không đúng',
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


                <TextInput placeholder='Họ và Tên'
                    style={styles.inPutStyle}
                    underlineColorAndroid='transparent'
                />
                <TextInput placeholder='Email'
                    style={styles.inPutStyle}
                    underlineColorAndroid='transparent'
                />
                <TextInput placeholder='Password'
                    secureTextEntry
                    style={styles.inPutStyle}
                    underlineColorAndroid='transparent'
                />
                <TextInput placeholder='Nhập lại password'
                    secureTextEntry
                    style={styles.inPutStyle}
                    underlineColorAndroid='transparent'
                />
                <TouchableOpacity style={{
                    height: 50, borderRadius: 20, borderWidth: 1, borderColor: 'white',
                    justifyContent: 'center', alignItems: 'center', marginTop: 10
                }}>
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
                        onPress={() => { this.props.navigation.navigate('ManHinh_Thu', {id:this.state.id})}}>
                        <Image source={daidien} style={{ width: 10, height: 30, borderRadius: 75 }} />
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Thu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3499e1', borderRadius: 5, marginLeft: 5, margin: 10 }}
                        onPress={() => { this.props.navigation.navigate('ManHinh_Chi', {id:this.state.id})}}>
                        <Image source={daidien} style={{ width: 10, height: 30, borderRadius: 75 }} />
                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>Chi</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fd6a60', borderRadius: 5, margin: 5, marginRight: 10, marginLeft: 10, flexDirection: 'row' }}
                    onPress={() => { this.props.navigation.navigate('ManHinh_SoDuTaiKhoan', {id:this.state.id}) }}>
                    <Image source={daidien} style={{ width: 10, height: 30, borderRadius: 75, flex: 1 }} />
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: '200', flex: 3, marginLeft: 10 }}>Số dư tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8974b9', borderRadius: 5, margin: 5, marginRight: 10, marginLeft: 10, flexDirection: 'row' }}
                    onPress={() => { this.props.navigation.navigate('ManHinh_DanhSachThuChi', {id:this.state.id}) }}>
                    <Image source={daidien} style={{ width: 10, height: 30, borderRadius: 75, flex: 1 }} />
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: '200', flex: 3, marginLeft: 10 }}>Danh sách thu chi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#08cad6', borderRadius: 5, margin: 5, marginRight: 10, marginLeft: 10, flexDirection: 'row' }}
                    onPress={() => { this.props.navigation.navigate('ManHinh_KeHoach') }}>
                    <Image source={daidien} style={{ width: 10, height: 30, borderRadius: 75, flex: 1 }} />
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: '200', flex: 3, marginLeft: 10 }}>Chia sẻ tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f06090', borderRadius: 5, margin: 5, marginRight: 10, marginLeft: 10, flexDirection: 'row' }}
                    onPress={() => { this.props.navigation.navigate('ManHinh_ChiaSe', {id:this.state.id}) }}>
                    <Image source={daidien} style={{ width: 10, height: 30, borderRadius: 75, flex: 1 }} />
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: '200', flex: 3, marginLeft: 10 }}>Được chia sẻ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4dce96', borderRadius: 5, margin: 5, marginRight: 10, marginLeft: 10, flexDirection: 'row' }}
                    onPress={() => { this.props.navigation.navigate('ManHinh_ThongKe') }}>
                    <Image source={daidien} style={{ width: 10, height: 30, borderRadius: 75, flex: 1 }} />
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


