import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';

import global from '../../global/global';


const { height, width } = Dimensions.get('window');

export default class ThongKe extends Component {
    static navigationOptions = {
        title: 'Thống kê'
    }
    constructor(props) {
        super(props);
        this.state = {

            collapsed: true,
            collapsed2: true,
            collapsed3: true,
            collapsed4: true
        }
    }
    componentDidMount() {
        const ngay = new Date();
        fetch(global.urlAPI + 'thongKe.php',
        {
            "method": "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": this.props.navigation.state.params.id,
                "ngay": moment(ngay).format('YYYY-MM-DD')

            })
        }
    )

        .then(res => res.json())
        .then(resjson => {
            console.log('tat ca tai khoan chia se', resjson)
            this.setState({
                chihomnay: resjson.chihomnay,
                chilonnhat: resjson.chilonnhat,
                soluotchihomnay: resjson.soluotchihomnay,
                soluotthuhomnay: resjson.soluotthuhomnay,
                thuhomnay: resjson.thuhomnay,
                thulonnhat: resjson.thulonnhat,
                tongsoluot: resjson.tongsoluot,
                tongsoluotchi: resjson.tongsoluotchi,
                tongsoluotthu: resjson.tongsoluotthu,
                tongsotienchi: resjson.tongsotienchi,
                tongsotienthu: resjson.tongsotienthu,
            });

        })
        .catch(e => console.log(e));
    }
    _toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }
    _toggleExpanded2 = () => {
        this.setState({ collapsed2: !this.state.collapsed2 });
    }
    _toggleExpanded3 = () => {
        this.setState({ collapsed3: !this.state.collapsed3 });
    }
    _toggleExpanded4 = () => {
        this.setState({ collapsed4: !this.state.collapsed4 });
    }
    render() {
        console.log(this.state)
        return (
            <ScrollView style={{ flex: 1, }}>
                <TouchableHighlight onPress={this._toggleExpanded}>
                    <View style={{
                        backgroundColor: '#F5FCFF',
                        padding: 10,
                    }}>
                        <Text style={{
                            textAlign: 'auto',
                            fontSize: 16,
                            fontWeight: '500',
                        }}>Tổng quan</Text>
                    </View>
                </TouchableHighlight>
                <Collapsible collapsed={this.state.collapsed} >
                    <View style={{

                        backgroundColor: '#fff',
                    }}>
                        <View>
                            <Text style={{
                                margin: 5, textAlign: 'auto',
                                fontSize: 16,
                                fontWeight: '500',
                            }}>Tổng số giao dịch: {this.state.tongsoluot}</Text>
                            <Text style={{
                                margin: 5, textAlign: 'auto',
                                fontSize: 16,
                                fontWeight: '500',
                            }}>Tổng số lần thu: {this.state.tongsoluotthu}</Text>
                            <Text style={{
                                margin: 5, textAlign: 'auto',
                                fontSize: 16,
                                fontWeight: '500',
                            }}>Tổng số lần chi: {this.state.tongsoluotchi}</Text>
                        </View>

                    </View>
                </Collapsible>
                 <TouchableHighlight onPress={this._toggleExpanded4}>
                    <View style={{
                        backgroundColor: '#F5FCFF',
                        padding: 10,
                    }}>
                        <Text style={{
                            textAlign: 'auto',
                            fontSize: 16,
                            fontWeight: '500',
                        }}>Hôm nay</Text>
                    </View>
                </TouchableHighlight>
                <Collapsible collapsed={this.state.collapsed4} >
                    <View style={{

                        backgroundColor: '#fff',
                    }}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    margin: 5, textAlign: 'auto',
                                    fontSize: 16,
                                    fontWeight: '500', flex: 1
                                }}>Lượt thu: {this.state.soluotthuhomnay}</Text>
                                <Text style={{
                                    margin: 5, textAlign: 'auto',
                                    fontSize: 16,
                                    fontWeight: '500', flex: 3
                                }}>Số tiền: {this.state.thuhomnay === null ? 0 : this.state.thuhomnay} đồng</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    margin: 5, textAlign: 'auto',
                                    fontSize: 16,
                                    fontWeight: '500', flex: 1
                                }}>Lượt chi: {this.state.soluotchihomnay}</Text>
                                <Text style={{
                                    margin: 5, textAlign: 'auto',
                                    fontSize: 16,
                                    fontWeight: '500', flex: 3
                                }}>Số tiền: {this.state.chihomnay === null ? 0 : this.state.chihomnay} đồng</Text>
                            </View>


                        </View>

                    </View>
                </Collapsible>
                <TouchableHighlight onPress={this._toggleExpanded2}>
                    <View style={{
                        backgroundColor: '#F5FCFF',
                        padding: 10,
                    }}>
                        <Text style={{
                            textAlign: 'auto',
                            fontSize: 16,
                            fontWeight: '500',
                        }}>Thu</Text>
                    </View>
                </TouchableHighlight>
                <Collapsible collapsed={this.state.collapsed2} >
                    <View style={{

                        backgroundColor: '#fff',
                    }}>
                        <View>
                            <Text style={{
                                margin: 5, textAlign: 'auto',
                                fontSize: 16,
                                fontWeight: '500',
                            }}>Tổng số giao dịch: {this.state.tongsoluotthu}</Text>
                            <Text style={{
                                margin: 5, textAlign: 'auto',
                                fontSize: 16,
                                fontWeight: '500',
                            }}>Tổng số tiền: {this.state.tongsotienthu === null ? 0 : this.state.tongsotienthu} đồng</Text>
                            <Text style={{
                                margin: 5, textAlign: 'auto',
                                fontSize: 16,
                                fontWeight: '500',
                            }}>Số tiền lớn nhất: {this.state.thulonnhat === null ? 0 : this.state.thulonnhat} đồng</Text>

                        </View>

                    </View>
                </Collapsible>
                <TouchableHighlight onPress={this._toggleExpanded3}>
                    <View style={{
                        backgroundColor: '#F5FCFF',
                        padding: 10,
                    }}>
                        <Text style={{
                            textAlign: 'auto',
                            fontSize: 16,
                            fontWeight: '500',
                        }}>Chi</Text>
                    </View>
                </TouchableHighlight>
                <Collapsible collapsed={this.state.collapsed3} >
                    <View style={{

                        backgroundColor: '#fff',
                    }}>
                        <View>
                            <Text style={{
                                margin: 5, textAlign: 'auto',
                                fontSize: 16,
                                fontWeight: '500',
                            }}>Tổng số giao dịch: {this.state.tongsoluotchi}</Text>
                            <Text style={{
                                margin: 5, textAlign: 'auto',
                                fontSize: 16,
                                fontWeight: '500',
                            }}>Tổng số tiền: {this.state.tongsotienchi === null ? 0 : this.state.tongsotienchi} đồng</Text>
                            <Text style={{
                                margin: 5, textAlign: 'auto',
                                fontSize: 16,
                                fontWeight: '500',
                            }}>Số tiền lớn nhất: {this.state.chilonnhat === null ? 0 : this.state.chilonnhat} đồng</Text>


                        </View>

                    </View>
                </Collapsible> 

            </ScrollView>
        );
    }
}