import React from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';

import { fontSizeResponsive } from '../utils/Metric.js';


forecaster_api = `http://206.189.69.98:5000/predict`

export default class Business extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      predicted_business_level: 0,
      forecast: [],
      current_time: new Date(),
      closest_time: new Date()
    };
    this.state['is_open'] = this.state.current_time > this.props.location.opening_hours && this.state.current_time < this.props.location.closing_hours 
  }
  async componentDidMount() {
    // load forecasted business
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