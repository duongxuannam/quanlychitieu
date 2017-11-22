import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';

import global from '../../global/global';

const { height, width } = Dimensions.get('window');
export default class DoiMatKhau extends Component {
    static navigationOptions = {
        title: 'Đổi khật khẩu'
    }
    constructor(props) {
        super(props);
        this.state = {
            matkhaumoi: ''
        }
    }
    DoiMatKhau(){
        if(this.props.navigation.state.params.id ===''){
            Alert.alert(
                'Lỗi',
                'Bạn chưa đăng nhập',
                [


                    { text: 'OK', onPress: () => this.props.navigation.goBack() },
                ],
                { cancelable: false })
        }   
        else if (this.state.matkhaucu === '' || this.state.matkhaumoi === '' || this.state.nhaplai === '' ) {
            Alert.alert(
                'Lỗi',
                'Vui lòng điền đầy đủ thông tin',
                [


                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        } else if (this.state.matkhaumoi === null || this.state.matkhaumoi === '' ||this.state.matkhaumoi.length <= 5) {
            Alert.alert(
                'Lỗi',
                'Mật khẩu phải có ít nhất 5 kí tự',
                [


                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
        else if (this.state.matkhaumoi !== this.state.nhaplai) {
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
            fetch(global.urlAPI + 'doiMatKhau.php',
                {
                    "method": "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "id": this.props.navigation.state.params.id,
                        "matkhaucu": this.state.matkhaucu,
                        "matkhaumoi": this.state.matkhaumoi,

                    })
                }
            )
                .then((res) => res.json())
                .then((resJson) => {
                    if (resJson.Loi) {
                        Alert.alert(
                            'Lỗi',
                            'Mật khẩu cũ không chính xác!',
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false }
                        )
                    } else {
                        Alert.alert(
                            'Thong báo',
                            'Đổi mật khẩu thành công',
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        this.props.navigation.goBack();
                                    }
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
    render() {
        return (
            <View style={{
                flex: 1, width: width,
                backgroundColor: '#2980b9', justifyContent: 'center', padding: 20
            }}
            >

                <TextInput placeholder='Mật khẩu cũ'
                    style={{
                        height: 50,
                        backgroundColor: 'white',
                        marginBottom: 10,
                        borderRadius: 20,
                        paddingLeft: 30
                    }}
                    secureTextEntry
                    underlineColorAndroid='transparent'
                    value={this.state.matkhaucu}

                    onChangeText={(value) => this.setState({
                        matkhaucu: value
                    }
                    )}
                />
                <TextInput placeholder='Mật khẩu mới'
                secureTextEntry
                    style={{
                        height: 50,
                        backgroundColor: 'white',
                        marginBottom: 10,
                        borderRadius: 20,
                        paddingLeft: 30
                    }}
                    underlineColorAndroid='transparent'
                    value={this.state.matkhaumoi}

                    onChangeText={(value) => this.setState({
                        matkhaumoi: value
                    }
                    )}
                />
                <TextInput placeholder='Nhập lại'
                    secureTextEntry
                    style={{
                        height: 50,
                        backgroundColor: 'white',
                        marginBottom: 10,
                        borderRadius: 20,
                        paddingLeft: 30
                    }}
                    underlineColorAndroid='transparent'
                    value={this.state.nhaplai}

                    onChangeText={(value) => this.setState({
                        nhaplai: value
                    }
                    )}
                />
                <TouchableOpacity style={{
                    height: 50, borderRadius: 20, borderWidth: 1, borderColor: 'white',
                    justifyContent: 'center', alignItems: 'center'
                }}
                
                    onPress = { () => this.DoiMatKhau() }
                >
                    <Text style={{ color: 'white', fontWeight: '400' }}>Đồng ý</Text>
                </TouchableOpacity >



            </View>
        );
    }
}