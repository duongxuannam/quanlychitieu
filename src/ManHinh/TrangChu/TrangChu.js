import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Alert
} from 'react-native';
import ao from './Css';

export default class TrangChu extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Trang chủ',
        tabBarLabel: 'Trang chu',
        headerRight: <TouchableOpacity onPress={()=>{navigation.navigate('DrawerOpen')}}><Text style={{marginRight: 5}}>hello</Text></TouchableOpacity>
    })
    constructor(props) {
        super(props);
        this.state = {
            mang: [
               
            ],
            refresh:false,
            page: 1
        }
    }
    // render() {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <Text>Trang chủ nè
    //             </Text>
    //             <TouchableOpacity style={{backgroundColor: 'red' }}
    //             onPress={()=>{this.props.navigation.navigate('ManHinh_TaiKhoan', {thamso:'From Nam with Love'})}}
    //             >
    //                 <Text style={{color:'black', fontSize:20, padding:10}}>Go to Detail</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity style={{backgroundColor: 'red' }}
    //             onPress={()=>{this.props.navigation.navigate('ManHinh_NoiDung', {thamso:'From Nam with Love'})}}
    //             >
    //                 <Text style={{color:'black', fontSize:20, padding:10}}>Go to NoiDungne</Text>
    //             </TouchableOpacity>
    //             {/* <TouchableOpacity style={{backgroundColor: 'red' }}
    //             onPress={()=>{this.props.navigation.navigate('DrawerOpen')}}
    //             >
    //                 <Text style={{color:'black', fontSize:20, padding:10}}>Menu</Text>
    //             </TouchableOpacity> */}
    //         </View>
    //     );
    // }


    componentDidMount(){
        fetch('http://192.168.1.38:8080/API/TuVanTuyenSinh/LayTinTucTheoTrang.php?trang=' + this.state.page)
        .then(res=>res.json())
        .then(resjson=>{
            this.setState({
                mang:resjson
            });
            
        })
        .catch(e=>console.log(e));
    }
    refresh(){
        this.setState({
            refresh:true
        });
        fetch('http://192.168.215.2:8080/API/TuVanTuyenSinh/LayTinTucTheoTrang.php?trang=1')
        .then(res=>res.json())
        .then(resjson=>{
                this.setState({
                    mang:resjson,
                    refresh: false,
                    page: 1
                });
        })
        .catch(e=>console.log(e));
    }
    endReached(){
        fetch('http://192.168.215.2:8080/API/TuVanTuyenSinh/LayTinTucTheoTrang.php?trang=' + (this.state.page + 1))
        .then(res=>res.json())
        .then(resjson=>{
            if(resjson.length != 0){
            this.setState({
                mang: this.state.mang.concat(resjson),
                page: this.state.page +1
            });
        }  
        else{
            Alert.alert(
                'Thông báo',
                'Đã hết dữ liệu',
                [
                    // {text: 'Ask me later', onPress: ()=>console.log('nói sau đê')},
                    // {text: 'Cancel', onPress: ()=>console.log('Cancel'), style: 'cancel'},
                    {text: 'Ok', onPress: ()=>console.log('nói sau đê')},
                ]
            )
        }
        })
        .catch(e=>console.log(e));
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View><Text>{this.state.text}</Text></View>
                <FlatList

                    refreshing={this.state.refresh}
                    onRefresh={()=>this.refresh()}

                    onEndReachedThreshold={0.2}
                    onEndReached={()=>this.endReached()}

                    data={this.state.mang}
                    renderItem={({ item }) =>
                        <View style={ao.dong}>
                            <View style={ao.trai}>
                            <Image 
                            style={ao.hinh}
                            source={{uri: 'DFSD'}}
                            />
                            </View>
                            <View style={ao.phai}>
                           
                            <Text>{item.TIEUDE}</Text>
                            <Text>{item.TOMTAT}</Text>
                            </View>
                            
                        </View>}

                />
            </View>
        );
    }
}
