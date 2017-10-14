import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Picker,
    Item
} from 'react-native';
import global from '../../global/global';

export default class VoiAiChi extends Component {
    static navigationOptions = {
        title: 'Với ai'
    }
    constructor(props) {
        super(props);
        this.state = {
            chonNguoi: this.props.navigation.state.params.voiAi
        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Picker
                    selectedValue={this.state.chonNguoi}
                    onValueChange={(nhom) => {
                        this.setState({ chonNguoi: nhom });
                        global.chonNguoiChi(nhom);
                    }}>
                    <Picker.Item label="Ba mẹ" value="Ba mẹ" />
                    <Picker.Item label="Bạn bè" value="Bạn bè" />
                    <Picker.Item label="Người yêu" value="Người yêu" />
                    <Picker.Item label="Khác" value="Khác" />
                    
                </Picker>
            </View>
        );
    }
}