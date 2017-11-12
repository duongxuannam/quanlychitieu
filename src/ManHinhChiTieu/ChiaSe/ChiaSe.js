import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image,
    Alert
} from 'react-native';
import global from '../../global/global';
import daux from '../../daux.png';


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
       this.layTatCaChiaSe();
    }
    layTatCaChiaSe(){
        fetch(global.urlAPI + 'layTatCaChiaSe.php',
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

    thongbao(id) {
        Alert.alert(
            'Thông báo',
            'Bạn chắc chắn muốn xóa?',
            [
                { text: 'OK', onPress: () => this.xoa(id) },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
        )
    }
    xoa(id) {
        fetch(global.urlAPI + 'xoaChiaSe.php',
            {
                "method": "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": id,
                })
            }
        )
            .then((res) => this.layTatCaChiaSe())

    }

    

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={this.state.mang}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', width: width - 20, backgroundColor: '#f06090', margin: 5, borderRadius: 10 }}>
                            <TouchableOpacity style={{ padding: 10, flexDirection: 'row', flex: 6 }}
                                onPress={() => { this.props.navigation.navigate('ManHinh_TaiKhoanChiaSe', { id: item.IDCHIASE, tenhienthi: item.TENHIENTHI }) }}>
                                <View style={{ flex: 1 }}>
                                    <Text>hinh</Text>
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Text>ID chia sẻ: {item.IDCHIASE}</Text>
                                    <Text>Tên hiển thị: {item.TENHIENTHI}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={ () => this.thongbao(item.key) }>
                            <Image source={daux} style={{ width: 17, height: 17 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }

                />
            </View>
        );
    }
}