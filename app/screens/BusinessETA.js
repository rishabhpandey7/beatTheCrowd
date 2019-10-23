import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform} from 'react-native';
import { fontSizeResponsive } from '../utils/Metric.js';
import Geocode from 'react-geocode';


forecaster_api = `http://206.189.69.98:5000/predict`

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


export default class Business extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      predicted_business_level: 0,
      forecast: [],
      current_time: new Date(),
      closest_time: new Date(),
      latitude: 0,
      longitude: 0,
      eta: 15,
      eta_time: new Date() + 15,

    };
    this.state['is_open'] = this.state.current_time > this.props.location.opening_hours && this.state.current_time < this.props.location.closing_hours 
  }
  async componentDidMount() {
    // load forecasted business
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
    const response = await fetch(forecaster_api + '?location_title=' + encodeURIComponent(this.props.location.location_title))
    const data = await response.json()
    
    const forecast = data.reduce(function(map, obj) {
      timestamp = new Date(obj.ds)
      timestamp.setHours(timestamp.getHours() + 4)
      map[timestamp] = obj.yhat
      return map
    }, {})

    this.setState({
      forecast: forecast,
      predicted_business_level: forecast[Object.keys(forecast)[0]],
      closest_time: Object.keys(forecast)[0]
    })
    // start the timer ticking
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
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
  var finalTime = ETA*60;
  var tn = new Date();
  var min = tn.setMinutes(tn.getMinutes() + finalTime);
  this.setState({
    eta: min,
  })
}

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      current_time: new Date().toLocaleString(),
      is_open: this.state.current_time > this.props.location.opening_hours && this.state.current_time < this.props.location.closing_hours 
    });
  }

  business_threshold(business_level) {
    color = ''
    if (business_level < this.props.location.notbusy_level){
      color = 'green'
    }
    else if (business_level < this.props.location.moderate_level) {
      color = 'orange'
    }
    else {
      color = 'red'
    }

    return StyleSheet.create({
      business_threshold: {
        backgroundColor: color
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
<Text> ETA: {this.state.eta_time.toString()} </Text>
        <Text>{this.props.location.location_title}</Text>
        <Text>Actual</Text>
        <View style={[styles.badge, this.business_threshold(this.props.location.business_level).business_threshold]}>
          <Text style={styles.text}>{this.props.location.business_level}</Text>
        </View>

        <Text>{this.state.current_time.toLocaleString()}</Text>

        <Text>Predicted</Text>
        <View style={[styles.badge, this.business_threshold(this.state.predicted_business_level).business_threshold]}>
          <Text style={styles.text}>{Math.round(this.state.predicted_business_level)}</Text>
        </View>
        <Text>{this.state.closest_time.toLocaleString()}</Text>


      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badge: {
    padding: 50,
    margin: 20,
    fontSize: fontSizeResponsive(4),
    borderRadius: 5
  },
  text: {
    color: '#fff'
  }
});