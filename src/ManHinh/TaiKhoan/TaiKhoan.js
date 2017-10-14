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
                <Text>Tai khoan
                </Text>
                <TouchableOpacity style={{backgroundColor: 'red' }}
                onPress={()=>{this.props.navigation.goBack()}}
                >
                    <Text style={{color:'black', fontSize:20, padding:10}}>Go to Home</Text>
                </TouchableOpacity>
                <Text>{this.props.navigation.state.params.thamso}</Text>
            </View>
        );
    }
}