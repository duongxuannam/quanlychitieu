import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class ThongTin extends Component {
    static navigationOptions = {
        // title: 'Tai Khoan'
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>ThongTin
                </Text>
               
            </View>
        );
    }
}