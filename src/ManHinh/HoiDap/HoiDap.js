import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class HoiDap extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Noi Dung',
        tabBarLabel: 'AAA',
        headerRight: <TouchableOpacity onPress={()=>{navigation.navigate('DrawerOpen')}}><Text style={{marginRight: 5}}>hello</Text></TouchableOpacity>
    })
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Hỏi Đáp
                </Text>
                
                <Text>lll</Text>
            </View>
        );
    }
}