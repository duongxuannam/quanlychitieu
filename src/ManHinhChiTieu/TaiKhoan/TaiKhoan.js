import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class TaiKhoan extends Component {
    static navigationOptions = {
        // title: 'Tai Khoan'
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>TaiKhoan
                </Text>
               
            </View>
        );
    }
}