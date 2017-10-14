import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  AsyncStorage
} from 'react-native';
import daidien from '../../profile.png';
import global from '../../global/global';

class MenuQuanLyChiTieu extends Component {
  constructor(props) {
    super(props);
    this.state={
      id:'',
      tenhienthi:''
    };
    global.setStateMenu = this.setStateMenu.bind(this);
  }
  componentDidMount(){
    this.getToken()
    .then(id => this.kiemTraDangNhap(id))
 
  }
  kiemTraDangNhap(id){
    fetch("http://192.168.215.2:8080/APIQuanLyChiTieu/kiemTraDangNhap.php",
    {
        "method": "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": id
            
        })
    }
)
    .then((res) => res.json())
    .then((res)=>{
        this.setState({
            id: res.ID,
            tenhienthi: res.TenHienThi
        })
        if(this.state.id !== null){        
            console.log('siêu nhân dũng cảm')
        }
    })
}

  getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@token');
        if (value !== null) {
            return JSON.parse(value);
        }
        return '';
    } catch (error) {
        return '';
    }
}
setStateMenu(obj){
  this.setState({
    id: obj.ID,
    tenhienthi: obj.TenHienThi
  })
}

  render() {
    
 
    return (
      <View style={styles.container}>
        <Image source={daidien} style={{ width: 150, height: 150, borderRadius: 75, marginVertical: 30 }} />

        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>{this.state.tenhienthi}</Text>
        <View><TouchableOpacity style={styles.buttonSignIn} onPress={()=>{
            
            this.props.navigation.navigate('ManHinh_ThongTin')
            
            }}>
          <Text style={styles.text}>Thông tin</Text>

        </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSignIn} onPress={()=>{
            
            this.props.navigation.navigate('ManHinh_ThayDoiThongTin')
            
            }}>
            <Text style={styles.text}>Được chia sẽ</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSignIn}  onPress={()=>{
            
            {/* this.props.navigation.navigate('ManHinh_TrangChu') */}
            global.dangXuat();
            this.props.navigation.navigate('DrawerClose'); 
            this.setState({
              tenhienthi:''
            })
            }}>
            <Text style={styles.text}>Đăng xuất</Text>

          </TouchableOpacity></View>
        <View />
      </View>


      </View>
    );
  }
}

styles = StyleSheet.create({
  container:
  {
    borderColor: 'white',
    flex: 1,
    backgroundColor: '#2980b9',
    borderRightWidth: 3,
    alignItems: 'center'
  },
  button: {
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 70
  },
  buttonSignIn: {
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 70,
    marginBottom: 10
  },
  text: {
    color: '#2980b9',
    fontSize: 17
  }
})

export default MenuQuanLyChiTieu;