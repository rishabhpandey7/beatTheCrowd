import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, TouchableHighlight, ActivityIndicator, Alert, Modal} from 'react-native';
import genre from '../assets/genre/ids.json';
import { fontSizeResponsive } from '../utils/Metric.js';
import Business from './Business.js';
import FilterModal from '../components/modals/FilterModal.js';



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

FranklinModal = () => {
   return <Modal isVisible = {true} >
        <View>          
            { this.state.isLoading && <ActivityIndicator size="large" color="#0000ff" /> } 
          {!this.state.isLoading && <Business location = {this.state.locations['Franklin Dining Commons'] } />  }    
      </View>
      </Modal>
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
        <TouchableOpacity onPress = {() => Alert.alert('Bc') } >
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

        <TouchableHighlight>
        <View style= {styles.item}>
          <ImageBackground 
            source={{uri: 'https://umassdining.com/sites/default/files/worcester%20_resized.jpg'}}
            style={styles.image}>
              <Text style = {styles.itemText}>
                Worcester Dining Commons
              </Text>
            </ImageBackground>
        </View>
        </TouchableHighlight>
        <View style= {styles.item}>
          <ImageBackground 
            source={{uri: 'https://umassdining.com/sites/default/files/berkshire%20_resized.jpg'}}
            style={styles.image}>
            <Text style = {styles.itemText}>
              Berkshire Dining Commons
            </Text>
          </ImageBackground>
        </View>
        <View style= {styles.item}>
          <ImageBackground 
            source={{uri: 'https://umassdining.com/sites/default/files/hampshire%20_resized.jpg'}}
            style={styles.image}>
            <Text style = {styles.itemText}>
              Hampshire Dining Commons
            </Text>
          </ImageBackground>
        </View>
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
  image: {
    width: '100%',
    height: '100%'
  },
  item: {
    backgroundColor: '#fff',
    maxHeight: 200,
    minHeight: 80,
    alignItems: 'center',
    shadowColor: "#881c1c",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    margin: 20,
    opacity: 1
  },
  itemText: {
    marginTop:'25%',
    fontSize: fontSizeResponsive(2.5),
    color: '#000',
    textAlign: 'center',
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});
