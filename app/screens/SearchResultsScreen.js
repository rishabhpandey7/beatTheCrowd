import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { fontSizeResponsive } from '../utils/Metric.js';
import { Feather } from '@expo/vector-icons';
import Spinner from '../components/common/Spinner.js';
import NotificationCard from '../components/cards/NotificationCard.js';
import MovieListRow from '../components/cards/rows/MovieListRow.js';
import MovieRow from '../components/cards/rows/MovieRow.js';
import { TouchableOpacity } from '../components/common/TouchableOpacity.js';
import request from '../services/Api.js';
import getDirections from '../services/Api.js';
import { getItem } from '../utils/AsyncStorage.js';



export default class SearchResultsScreen extends React.Component{

static navigationOptions = () => {
  return {
      title: 'Search Results'
    };
  };

  state = {
    loading: true,
    dataSource:[],
    id: this.props.navigation.state.params.id,
    name: this.props.navigation.state.params.name,
    typeRequest: this.props.navigation.state.params.typeRequest
  };



  render() {
    const { navigate } = this.props.navigation;
     if(this.state.loading){
  return( 
    <View style={styles.loader}> 
      <ActivityIndicator size="large" color="#0c9"/>
    </View>
)} 
return(
 <View style={styles.container}>
 <FlatList
    data= {this.state.dataSource}
    ItemSeparatorComponent = {this.FlatListItemSeparator}
    renderItem= {item=> this.renderItem(item)}
    keyExtractor= {item=>item.id.toString()}
 />
</View>
)}

};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    justifyContent: 'center'
  },
  containerList: {
    justifyContent: 'center',
    flex: 1
  },
  containerMainText: {
    paddingVertical: 25,
    paddingHorizontal: 20
  },
  textMain: {
    fontSize: fontSizeResponsive(3),
    fontWeight: 'bold',
    color: '#2d3436',
    width: '80%'
  },
  buttonGrid: {
    position: 'absolute',
    right: 12,
    top: 18,
    padding: 8,
    borderRadius: 100
  },
  buttonGridActive: {
    backgroundColor: '#7f8fa6'
  },
  loadingMore: {
    paddingTop: 20,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingButton: {
    padding: 10,
    width: '50%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#7f8fa6'
  },
  loadingText: {
    fontSize: fontSizeResponsive(2.1),
    color: '#273c75',
    textAlign: 'center'
  },
  list:{
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
   },
});
