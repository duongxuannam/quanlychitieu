import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default class DanhSachThu extends Component {
    static navigationOptions = {
        title: 'Danh sách thu'
    }
    constructor(props) {
        super(props);
        this.state = {
            mang: [

            ],
            refresh: false,
        }
    }
    componentDidMount() {
       
        fetch('http://192.168.215.2:8080/APIQuanLyChiTieu/layTatCaThu.php',
            {
                "method": "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": this.props.navigation.state.params.id

                })
            }
        )
            .then(res => res.json())
            .then(resjson => {
                console.log('aa',resjson)
                this.setState({
                    mang: resjson
                });
            })
            .catch(e => console.log(e));
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>

                <FlatList 
                    data={this.state.mang}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={{ padding: 10 , margin: 5, width:width-20, backgroundColor: '#8974b9', borderRadius: 10, flexDirection:'row'}}
                        onPress={() => { this.props.navigation.navigate('ManHinh_ChiTietThu', {id:item.key}) }}>
                        <View style={{flex:1}}>
                            <Text>hinh</Text>
                            </View>
                           <View style={{flex:3}}>
                           <Text>Ngày: {item.NGAY}</Text>
                           <Text>Số tiền: {item.TIEN} đồng</Text>
                            </View>
                        </TouchableOpacity>
                    }

                />
            </View>
        );
    }
}