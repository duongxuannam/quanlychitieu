import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Picker,
    Item
} from 'react-native';
import global from '../../global/global';

export default class NhomChi extends Component {
    static navigationOptions = {
        title: 'Chọn nhóm'
    }
    constructor(props) {
        super(props);
        this.state = {
            nhom: this.props.navigation.state.params.nhom
        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Picker 
                    selectedValue={this.state.nhom}
                    onValueChange={(nhom) => {
                        this.setState({ nhom: nhom });
                        global.chonNhomChi(nhom);
                    }}>

                    <Picker.Item label="Ăn uống" value="Ăn uống" />
                    <Picker.Item label="Hóa đơn và tiện ích" value="Hóa đơn và tiện ích" />
                    <Picker.Item label="Di chuyển" value="Di chuyển" />
                    <Picker.Item label="Mua sắm" value="Mua sắm" />
                    <Picker.Item label="Bạn bè và người yêu" value="Bạn bè và người yêu" />
                    <Picker.Item label="Giải trí" value="Giải trí" />
                    <Picker.Item label="Du lịch" value="Du lịch" />
                    <Picker.Item label="Khác" value="Khác" />
                </Picker>
            </View>
        );
    }
}