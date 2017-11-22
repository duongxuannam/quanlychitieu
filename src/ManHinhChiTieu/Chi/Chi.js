import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Picker,
    Alert,
    Image
} from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';
import global from '../../global/global';
import ngaythang from '../../Hinh/ngay.png';
import va from '../../Hinh/va.png';
import nh from '../../Hinh/nh.png';
import gc from '../../Hinh/gc.png';
import tien from '../../Hinh/tien.png';


const { height, width } = Dimensions.get('window');

export default class Chi extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Thêm khoản chi',
        headerRight: <TouchableOpacity onPress={() => {
            global.luuChi();
            //  navigation.goBack();

        }}>
            <Text style={{ marginRight: 20, fontSize: 18, color: 'black', fontWeight: 'bold' }}>Lưu</Text>
        </TouchableOpacity>
    })
    constructor(props) {
        super(props);
        this.state = {
            nhom: 'Ăn uống',
            voiAi: 'Ba mẹ',
            DateText: '',
            DateHolder: null,
            soTien: '',
            ghiChu: ''
        };
        global.luuChi = this.luuChi.bind(this);
    }
    luuChi() {
        console.log(this.state);
        console.log(this.props.navigation.state.params.id);
        if (this.state.DateText === '' || this.state.soTien === '') {
            Alert.alert(
                'Lỗi',
                'Vui lòng nhập đầy đủ thông tin',
                [


                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
        else {
            fetch(global.urlAPI + 'themChi.php',
                {
                    "method": "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "idtaikhoan": this.props.navigation.state.params.id,
                        "tenloaichi": this.state.nhom,
                        "ghichu": this.state.ghiChu,
                        "tien": parseInt(this.state.soTien),
                        "ngay": this.state.DateText,
                        "voiai": this.state.voiAi,
                    })
                }
            )
                .then((res) => console.log('dc hongz ba', res))

                .catch(e => {
                    Alert.alert(
                        'Lỗi',
                        'bị cái j j á',
                        [


                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    )
                });
            this.props.navigation.goBack();
        }
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
    DatePickerMainFunctionCall() {
        let DateHolder = this.state.DateHolder;
        if (!DateHolder || DateHolder == null) {
            DateHolder = new Date();
            this.setState({
                DateHolder: DateHolder
            });
        }
        //To open the dialog
        this.refs.DatePickerDialog.open({

            date: DateHolder,
        });
    }
    onDatePickedFunction(date) {
        this.setState({
            dobDate: date,
            DateText: moment(date).format('YYYY-MM-DD')
        });
    }
    render() {
        const ngay = this.state.DateText == '' ? 'Chọn ngày' : moment(this.state.DateText).format('DD-MM-YYYY');
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#3499e1', margin: 5, borderRadius: 5, width: width - 20 }}
                >
                    <View style={{ backgroundColor: '#3499e1', flex: 1, justifyContent: 'center', marginLeft: 20 }}>
                        <Image source={nh} style={{ width: 40, height: 40 }} />
                    </View>

                    <Picker style={{ marginLeft: 20, flex: 3 }}
                        selectedValue={this.state.nhom}
                        onValueChange={(nhom) => {
                            this.setState({ nhom: nhom });
                            this.chonNhom(nhom);
                        }}>

                        <Picker.Item label="Ăn uống" value="Ăn uống" />
                        <Picker.Item label="Hóa đơn và tiện ích" value="Hóa đơn và tiện ích" />
                        <Picker.Item label="Di chuyển" value="Di chuyển" />
                        <Picker.Item label="Mua sắm" value="Mua sắm" />
                        <Picker.Item label="Giải trí" value="Giải trí" />
                        <Picker.Item label="Du lịch" value="Du lịch" />
                        <Picker.Item label="Khác" value="Khác" />
                    </Picker>
                </View>
                <View style={{ flex: 1, width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#08cad6', margin: 5, borderRadius: 5, width: width - 20 }}>
                    <View style={{ backgroundColor: '#08cad6', flex: 1, justifyContent: 'center', marginLeft: 20 }}>
                        <Image source={va} style={{ width: 40, height: 40 }} />
                    </View>
                    <Picker style={{ marginLeft: 20, flex: 3 }}
                        selectedValue={this.state.voiAi}
                        onValueChange={(nhom) => {
                            this.chonNguoi(nhom);
                        }}>
                        <Picker.Item label="Ba mẹ" value="Ba mẹ" />
                        <Picker.Item label="Bạn bè" value="Bạn bè" />
                        <Picker.Item label="Người yêu" value="Người yêu" />
                        <Picker.Item label="Khác" value="Khác" />

                    </Picker>
                </View>
                <TouchableOpacity style={{ flex: 1, width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#fd6a60', margin: 5, borderRadius: 5, width: width - 20 }}
                    onPress={this.DatePickerMainFunctionCall.bind(this)}   >
                    <View style={{ backgroundColor: '#fd6a60', flex: 1, justifyContent: 'center', marginLeft: 20 }}>
                        <Image source={ngaythang} style={{ width: 40, height: 40 }} />
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: '200', marginLeft: 20, flex: 3 }}>{ngay}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#f06090', margin: 5, borderRadius: 5, width: width - 20 }}>
                    <View style={{ backgroundColor: '#f06090', flex: 1, justifyContent: 'center', marginLeft: 20 }}>
                        <Image source={gc} style={{ width: 40, height: 40 }} />
                    </View>
                    <TextInput placeholder='Nhập ghi chú'
                        placeholderTextColor='rgba(255, 255, 255, 0.7)'
                        returnKeyType='go'
                        underlineColorAndroid='transparent'
                        onSubmitEditing={() => this.passwordInput.focus()}
                        ref={(input) => { this.passwordInput = input }}
                        /* onChangeText={(value)=>{this.setState({})}} */
                        style={{
                            paddingLeft: 20,
                            marginLeft: 10, flex: 3,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            margin: 10,
                            color: 'white',

                            borderRadius: 15
                        }}
                        onChangeText={(value) => this.setState({
                            ghiChu: value
                        }
                        )}
                    ></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#8974b9', margin: 5, borderRadius: 5, width: width - 20 }}>
                    <View style={{ backgroundColor: '#8974b9', flex: 1, justifyContent: 'center', marginLeft: 20 }}>
                        <Image source={tien} style={{ width: 40, height: 40 }} />
                    </View>
                    <TextInput placeholder='Nhập số tiền'
                        placeholderTextColor='rgba(255, 255, 255, 0.7)'
                        returnKeyType='go' keyboardType='numeric'
                        underlineColorAndroid='transparent'

                        style={{
                            paddingLeft: 20,
                            marginLeft: 10, flex: 3,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            margin: 10,
                            color: 'white',

                            borderRadius: 15
                        }}
                        onChangeText={(value) => {
                            this.setState({
                                soTien: value
                            })
                        }
                        }
                    ></TextInput>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{  backgroundColor: '#4dce96', justifyContent:'center', alignItems:'center' , borderRadius: 10, margin:20, padding: 20 }}>
               
                    <Text style={{fontSize: 20, fontWeight:'200',}}>Lưu</Text>
                    </TouchableOpacity> */}
                <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
            </View>
        );
    }
}