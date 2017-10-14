import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default class ChiaSe extends Component {
    static navigationOptions = {
        title: 'Những người đã chia sẽ với bạn'
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
        fetch('http://192.168.215.2:8080/APIQuanLyChiTieu/layTatCaChiaSe.php',
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
                console.log(resjson)
                this.setState({
                    mang: resjson
                });

            })
            .catch(e => console.log(e));
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={this.state.mang}
                    renderItem={({ item }) =>
                    <TouchableOpacity style={{ padding: 10 , margin: 5, width:width-20, backgroundColor: '#f06090', borderRadius: 10, flexDirection:'row'}}
                    onPress={() => { this.props.navigation.navigate('ManHinh_TaiKhoanChiaSe', {id:item.IDCHIASE, tenhienthi:item.TENHIENTHI}) }}>
                            <View style={{flex:1}}>
                            <Text>hinh</Text>
                            </View>
                           <View style={{flex:3}}>
                           <Text>ID chia sẻ: {item.IDCHIASE}</Text>
                           <Text>Tên hiển thị: {item.TENHIENTHI}</Text>
                            </View>
                        </TouchableOpacity>
                    }

                />
            </View>
        );
    }
}