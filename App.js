import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import DiningLocation from './app/screens/DiningLocation.js';
import ConfigurationScreen from './app/screens/ConfigurationScreen.js';
import MovieDetailsScreen from './app/screens/MovieDetailsScreen.js';
import SearchScreen from './app/screens/SearchScreen.js';
import SearchResultsScreen from './app/screens/SearchResultsScreen.js';
import WebViewScreen from './app/screens/WebViewScreen.js';
import Business from './app/screens/Business.js';


const MovieTabTitle = 'Dining Locations';
const SearchTabTitle = 'Prediction at ETA';
const ConfigTabTitle = 'More';
const WebTabTitle = 'Trailer';
const BusinessTitle = 'Busyness right now';


const HomeTab = createStackNavigator(
  {
    MovieList: {
      screen : DiningLocation,
      navigationOptions : {
        title : MovieTabTitle,
        headerTintColor : '#273c75',
        headerStyle : {
          backgroundColor : '#ffffff'
        } 
      }
    },

    MovieDetails: {
      screen : MovieDetailsScreen,
      navigationOptions : {
        title : SearchTabTitle,
        headerTintColor : '#273c75',
        headerStyle : {
          backgroundColor : '#ffffff'
        }
      }
    },
    BusinessView: {
    	screen: Business,
    	navigationOptions: {
    		title: BusinessTitle,
    		headerTintColor: '#273c75',
        headerStyle : {
          backgroundColor : '#ffffff'
        }
      }
  },
    WebView: {
      screen : WebViewScreen,
      navigationOptions : {
        title : WebTabTitle,
        headerTintColor : '#273c75',
        headerStyle : {
          backgroundColor : '#fffff'
        }
      }
    }
    },
    {
      initialRouteName: 'MovieList'
    }
      
);

  
HomeTab.navigationOptions = {
    tabBarIcon : ({tintColor}) => (
    <Feather name = "target" size = {20} color = {tintColor} /> 
    )
  };


const SearchTab = createStackNavigator(
  {
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: {
        title: SearchTabTitle,
        headerTintColor: '#273c75',
        headerStyle: {
          backgroundColor: '#ffffff'
        }
      }

    },

    SearchResults: {
      screen: SearchResultsScreen,
      navigationOptions: {
        title: 'Search Results',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#273c75'
        }
      }
    },
    MovieDetails: {
      screen : MovieDetailsScreen,
      navigationOptions : {
        title : SearchTabTitle,
        headerTintColor : '#273c75',
        headerStyle : {
          backgroundColor : '#ffffff'
        }
      }
    },
    WebView: {
      screen : WebViewScreen,
      navigationOptions : {
        title : WebTabTitle,
        headerTintColor : '#273c75',
        headerStyle : {
          backgroundColor : '#ffffff'
        }
      }
    }
    },
    {
    initialRouteName : 'SearchScreen'
    }

  );

  SearchTab.navigationOptions = {
    tabBarIcon: ({tintColor}) => {
       return <Feather name = "map" size = {20} color = {tintColor} />
      },
    showIcon: true  
  };

  


  const ConfigTab = createStackNavigator(
  {
    ConfigScreen: {
      screen: ConfigurationScreen,
      navigationOptions: {
        title: ConfigTabTitle,
        headerTintColor: '#273c75',
        headerStyle: {
          backgroundColor: '#ffffff'
        }
      }
    }
  },
  {
    initialRouteName: 'ConfigScreen'
  }

);

  ConfigTab.navigationOptions = {
    tabBarIcon: ({tintColor}) => {
      return <Feather name = "more-horizontal" size = {20} color = {tintColor} />   
      }   
  };



const MovieListTabBarVisible = navigation => {
  const { routes } = navigation.state;
  if (routes && routes.length > 0) {
    const route = routes[routes.length - 1];
    if (
      route.routeName === 'MovieDetails' ||
      route.routeName === 'WebView' ||
      route.routeName === 'SearchResults'
    ) {
      return false;
    }
  }
  return true;
};

const MainNavigator =
  Platform.OS === 'ios'
    ? createBottomTabNavigator(
        {
          Movie: {
            screen: HomeTab,
            navigationOptions: ({ navigation }) => ({
              title: MovieTabTitle,
              tabBarVisible: MovieListTabBarVisible(navigation)
            })
          },
          Search: {
            screen: SearchTab,
            navigationOptions: ({ navigation }) => ({
              title: SearchTabTitle,
              tabBarVisible: MovieListTabBarVisible(navigation)
            })
          },
          Config: {
            screen: ConfigurationTab,
            navigationOptions: {
              title: ConfigTabTitle
            }
          }          
        },
        {
          tabBarOptions: {
            activeTintColor: '#273c75',
            inactiveTintColor: '#b2bec3',
            showIcon: true,
            labelStyle: {
              margin: 0,
              padding: 2
            },
            style: {
              backgroundColor: '#ffffff'
            }
          },
          animationEnabled: false,
          swipeEnabled: false
        }
      )
    : createMaterialBottomTabNavigator(
        {
          Movie: {
            screen: HomeTab,
            navigationOptions: ({ navigation }) => ({
              title: MovieTabTitle,
              tabBarVisible: MovieListTabBarVisible(navigation)
            })
          },
          Search: {
            screen: SearchTab,
            navigationOptions: ({ navigation }) => ({
              title: SearchTabTitle,
              tabBarVisible: MovieListTabBarVisible(navigation)
            })
          },
          Config: {
            screen: ConfigTab,
            navigationOptions: {
              title: ConfigTabTitle
            }
          }     
        },
        {
          initialRouteName: 'Movie',
          activeTintColor: '#273c75',
          inactiveTintColor: '#b2bec3',
          shifting: true,
          showIcon: true,
          barStyle: {
            backgroundColor: '#ffffff',
            paddingTop: 2,
            paddingBottom: 2
          }
        }
      ); 

const AppNavigator = createSwitchNavigator(
{
  Main: MainNavigator
},
{
  initialRouteName: 'Main'
}

  );



const AppContainer = createAppContainer(AppNavigator);


export default AppContainer;

