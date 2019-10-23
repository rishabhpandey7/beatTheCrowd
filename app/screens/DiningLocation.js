import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, TouchableHighlight, ActivityIndicator, Alert, Button} from 'react-native';
import genre from '../assets/genre/ids.json';
import { fontSizeResponsive } from '../utils/Metric.js';
import Business from './Business.js';
import FilterModal from '../components/modals/FilterModal.js';
import Modal from "react-native-modal";



export default class GenreScreen extends React.Component{
  constructor(props){
    super(props);

  this.state = {
    locations: {},
    isLoading: true,
    str: 'abc',
  }
}

toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  franklin = () => {
    this.setState({locations: {} });
  }
   
  async componentDidMount(){
    const response = await fetch('https://umassdining.com/uapp/get_infov2');
    const response_data = await response.json();
    const locations = {};
    response_data.forEach(location => {
      locations[location.location_title] = location;
    })
    console.log(locations);
    this.setState({
      locations: locations,
      isLoading: false,
    });
    console.log(this.state.isLoading);
  }

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
            <View>          
              { this.state.isLoading && <ActivityIndicator size="large" color="#0000ff" /> } 
              {!this.state.isLoading && <Business location = {this.state.locations['Franklin Dining Commons'] } />  } 
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
            <View>          
              { this.state.isLoading && <ActivityIndicator size="large" color="#0000ff" /> } 
              {!this.state.isLoading && <Business location = {this.state.locations['Worcester Dining Commons'] } />  } 
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
            <View>          
              { this.state.isLoading && <ActivityIndicator size="large" color="#0000ff" /> } 
              {!this.state.isLoading && <Business location = {this.state.locations['Berkshire Dining Commons'] } />  } 
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
            <View>          
                { this.state.isLoading && <ActivityIndicator size="large" color="#0000ff" /> } 
                {!this.state.isLoading && <Business location = {this.state.locations['Worcester Dining Commons'] } />  } 
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
  containerList: {
    marginTop: 25
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
    maxHeight: 150,
    minHeight: 80,
    alignItems: 'center',
    shadowColor: "#881c1c",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.57,
    shadowRadius: 4.65,
    elevation: 9,
    margin: 20,
    opacity: 1
  },
  itemText: {
    height: '100%',
    paddingTop: '15%',
    fontSize: fontSizeResponsive(2.5),
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'notoserif',
    backgroundColor: 'rgba(136,28,28,0.6)',
  },
});
