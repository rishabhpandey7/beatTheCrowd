import React from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Alert, Platform, TextInput, FlatList, ScrollView, ActivityIndicator, Image,
  TouchableOpacity, Button, ImageBackground } from 'react-native';
import Geocode from 'react-geocode';
import { fontSizeResponsive } from '../utils/Metric.js'; 
import Business from './BusinessETA.js';
import Modal from "react-native-modal";



 async function request_device_location_runtime_permission() {
 
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'ReactNativeCode Location Permission',
        'message': 'ReactNativeCode App needs access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
 
      Alert.alert("Location Permission Granted.");
    }
    else {
 
      Alert.alert("Location Permission Not Granted");
 
    }
  } catch (err) {
    console.warn(err)
  }
}

Geocode.setApiKey('AIzaSyDF2AnlBizYD1UKCwAjEkK9gsC6m3jjCnw');


export default class SearchScreen extends React.Component {
 
  constructor(){
 
    super()
 
    this.state={
 
      latitude : 0,
      longitude : 0,
      error : null,
      end: '',
      locations: {},
      isLoading: true,
      addresses: {},
      isLoadingAddress: true,
      str: '',
      street_add: '',
    }
  }

  getTimeFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; 
  var dLat = deg2rad(lat2-lat1);  
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; 
  var ETA = d/5;
  return ETA*60;
}

deg2rad(deg) {
  return deg * (Math.PI/180);
}

getETA(distance){
  return distance/5;
}

hrsToMins(t){
  return t*60;
}
 
  async componentDidMount() {
 
    if(Platform.OS === 'android')
    {
 
    await request_device_location_runtime_permission();
 
    }
 
    this.getLongLat = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 100, distanceFilter: 10 },
    );
    const response = await fetch('https://umassdining.com/uapp/get_infov2');
    const response_data = await response.json();
    const locations = {};
    response_data.forEach(location => {
      locations[location.location_title] = location;
    })
    this.setState({
      locations: locations,
      isLoading: false,
    });
  }
 
  componentWillUnmount() {
 
    navigator.geolocation.clearWatch(this.getLongLat);
 
  }

  onChangeText = (text) => {
    this.setState({
      end: text
    });
  }

  onPress = (address) => {
    Geocode.fromAddress(address).then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  error => {
    console.error(error);
  }
);
    getAddress = () => {
      Geocode.fromLatLng(this.state.latitude, this.state.longitude).then(
  response => {
    const address = response.results[0].formatted_address;
    console.log(address);
    this.setState({
      street_add: address,
    })
  },
  error => {
    console.error(error);
  }

);
    }

  }
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
 
  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <View>
      <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress = {this.toggleModal} >
        <View style= {styles.item}>
           <ImageBackground 
              source={{uri: 'https://umassdining.com/sites/default/files/franklin%20_resized.jpg'}}
              style={styles.image}>
              <Text style = {styles.itemText}>
                Franklin Dining Commons
              </Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>

        <Modal isVisible={this.state.isModalVisible} backdropColor = { "#fff"} backdropOpacity = {1} >
            <View style = {styles.contain}>          
              <Image
                source = {require('../assets/images/franklin.png')}
                style = {styles.graphImage} />
              <View style = {styles.buttons}>
              <Button title="Go back" style = {styles.buttons} onPress={this.toggleModal} /> 
              </View>
            </View>
        </Modal>

        <TouchableOpacity onPress = {this.toggleModal} >
        <View style= {styles.item}>
          <ImageBackground 
            source={{uri: 'https://umassdining.com/sites/default/files/worcester%20_resized.jpg'}}
            style={styles.image}>
              <Text style = {styles.itemText}>
                Worcester Dining Commons
              </Text>
            </ImageBackground>
        </View>
        </TouchableOpacity>

        <Modal isVisible={this.state.isModalVisible} backdropColor = { "#fff"} backdropOpacity = {1} >
            <View style = {styles.contain}>          
              <Image
                source = {require('../assets/images/franklin.png')}
                style = {styles.graphImage} />
              <View style = {styles.buttons}>
              <Button title="Go back" style = {styles.buttons} onPress={this.toggleModal} />   
              </View>
            </View>
        </Modal>

        <TouchableOpacity onPress = {this.toggleModal} >
        <View style= {styles.item}>
          <ImageBackground 
            source={{uri: 'https://umassdining.com/sites/default/files/berkshire%20_resized.jpg'}}
            style={styles.image}>
            <Text style = {styles.itemText}>
              Berkshire Dining Commons
            </Text>
          </ImageBackground>
        </View>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible} backdropColor = { "#fff"} backdropOpacity = {1} >
            <View style = {styles.contain}>          
              <Image
                source = {require('../assets/images/hampshire.png')}
                style = {styles.graphImage} />
              <View style = {styles.buttons}>
              <Button title="Go back" style = {styles.buttons} onPress={this.toggleModal} />   
              </View>
            </View>
        </Modal>

        <TouchableOpacity onPress = {this.toggleModal} >
        <View style= {styles.item}>
          <ImageBackground 
            source={{uri: 'https://umassdining.com/sites/default/files/hampshire%20_resized.jpg'}}
            style={styles.image}>
            <Text style = {styles.itemText}>
              Hampshire Dining Commons
            </Text>
          </ImageBackground>
        </View>
        </TouchableOpacity>

        <Modal isVisible={this.state.isModalVisible} backdropColor = { "#fff"} backdropOpacity = {1} >
            <View style = {styles.contain}>          
                <Image
                source = {require('../assets/images/hampshire.png')}
                style = {styles.graphImage} />
                <View style = {styles.buttons}>
                <Button title="Go back" style = {styles.buttons} onPress={this.toggleModal} />   
              </View>
            </View>
        </Modal>
      </View>
      </ScrollView>
      </View>
    );
  };

}

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  graphImage: {
    width: 380,
    alignItems: 'center',
    marginTop: 10,
    height: 220
  },
  contains:{
    padding: 10,
  },
  containerList: {
    marginTop: 25
  },
  headerText: {
    padding: 10,
    fontFamily: 'notoserif',
    fontSize: fontSizeResponsive(2.5),
    alignItems: 'center',
    textAlign: 'center',
  },
  buttons: {
    position: 'absolute',
    marginTop:'75%',
    marginLeft: '30%',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  item: {
    backgroundColor: '#fff',
    maxHeight: 70,
    minHeight: 30,
    alignItems: 'center',
    shadowColor: "#881c1c",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.57,
    shadowRadius: 4.65,
    elevation: 9,
    margin: 10,
    opacity: 1
  },
  itemText: {
    height: '100%',
    paddingTop: '5%',
    fontSize: fontSizeResponsive(2.5),
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'notoserif',
    backgroundColor: 'rgba(136,28,28,0.6)',
  },
});
