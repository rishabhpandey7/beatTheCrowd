import React from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Alert, Platform, TextInput, Button, FlatList } from 'react-native';
import Geocode from 'react-geocode';
import { fontSizeResponsive } from '../utils/Metric.js'; 
import Modal from '../components/modals/Modal.js';

export async function request_device_location_runtime_permission() {
 
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
      end: ''
 
    }
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
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
  return d;
}

deg2rad(deg) {
  return deg * (Math.PI/180)
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

  }
 
  render() {
    const { navigate } = this.props.navigation;
    return (
      
      <View style={styles.MainContainer}>
      <View style={styles.container}>
        <View style= {styles.item}>
          <Text style = {styles.itemText}>
            Franklin Dining commons
          </Text>
        </View>
        <View style= {styles.item}>
          <Text style = {styles.itemText}>
            Worcester Dining commons
          </Text>
        </View>
        <View style= {styles.item}>
          <Text style = {styles.itemText}>
            Berkshire Dining commons
          </Text>
        </View>
        <View style= {styles.item}>
          <Text style = {styles.itemText}>
            Hampshire Dining commons
          </Text>
        </View>
      </View>   
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
 
  MainContainer: {
 
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
    padding: 11
 
  },
 
  text:
  {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10
  },
  item: {
    backgroundColor: '#fff',
    maxHeight: 200,
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: 'center',
    shadowColor: "#881c1c",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    margin: 20
  },
  itemText: {
    fontSize: fontSizeResponsive(2.5),
    color: '#000',
    textAlign: 'center',
    fontFamily: 'notoserif'
  },
 
});
