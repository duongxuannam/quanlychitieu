import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class NoiDung extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Noi Dung',
        tabBarLabel: 'AAA',
        headerRight: <TouchableOpacity onPress={()=>{navigation.navigate('DrawerOpen')}}><Text style={{marginRight: 5}}>hello</Text></TouchableOpacity>
    })
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Noi Dung
                </Text>
                <TouchableOpacity style={{backgroundColor: 'red' }}
                
                onPress={()=>{this.props.navigation.navigate('Tabbar')}}
                >
                    <Text style={{color:'black', fontSize:20, padding:10}}>Go to Home</Text>
                </TouchableOpacity>
                <Text>lll</Text>
            </View>
        );
    }
}