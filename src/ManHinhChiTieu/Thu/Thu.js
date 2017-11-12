import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Picker,
    Alert
} from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';
import global from '../../global/global';


const { height, width } = Dimensions.get('window');

export default class Thu extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Thêm khoản thu',
        headerRight: <TouchableOpacity onPress={() => {
            global.luuThu();
            // navigation.goBack();

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
        global.luuThu = this.luuThu.bind(this);
    }
    luuThu() {
        console.log(this.state);
        console.log(this.props.navigation.state.params.id);
        if(this.state.DateText === '' || this.state.soTien === ''){
            Alert.alert(
                'Lỗi',
                'Vui lòng nhập đầy đủ thông tin',
                [


                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
        else{
        fetch(global.urlAPI + 'themThu.php',
            {
                "method": "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "idtaikhoan": this.props.navigation.state.params.id,
                    "tenloaithu": this.state.nhom,
                    "ghichu": this.state.ghiChu,
                    "tien": parseInt(this.state.soTien),
                    "ngay": this.state.DateText,
                    "voiai": this.state.voiAi,


                })
            }
        )
            .then((res) => console.log('thêm thu thành công', res))

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
                    {/* onPress={() => { this.props.navigation.navigate('ManHinh_NhomChi', { nhom: this.state.nhom }) }}> */}
                    <Text style={{ fontSize: 20, fontWeight: '200', marginLeft: 20, flex: 1 }}>Thuộc nhóm</Text>
                    {/* <Text style={{ fontSize: 20, fontWeight: '200', marginLeft: 20, flex: 3 }}>{this.state.nhom}</Text> */}
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
                    {/* onPress={() => { this.props.navigation.navigate('ManHinh_VoiAiChi', { voiAi: this.state.voiAi }) }}>  */}
                    <Text style={{ fontSize: 20, fontWeight: '200', marginLeft: 20, flex: 1 }}>Với</Text>
                    {/* <Text style={{ fontSize: 20, fontWeight: '200', marginLeft: 20, flex: 3 }}>{this.state.voiAi}</Text> */}
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
                    <Text style={{ fontSize: 20, fontWeight: '200', marginLeft: 20, flex: 1 }}>Thời gian</Text>
                    <Text style={{ fontSize: 20, fontWeight: '200', marginLeft: 20, flex: 3 }}>{ngay}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#f06090', margin: 5, borderRadius: 5, width: width - 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '200', marginLeft: 20, flex: 1 }}>Ghi chú</Text>
                    {/* <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 2}}>Ghi chú</Text> */}
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
                    <Text style={{ fontSize: 20, fontWeight: '200', marginLeft: 20, flex: 1 }}>Số tiền</Text>
                    {/* <Text style={{fontSize: 20, fontWeight:'200', marginLeft:20, flex: 3}}>Số tiền</Text> */}
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