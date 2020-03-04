import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import Home from '../views/Home';
import AuthView from '../views/AuthView';
import Upload from '../views/Upload';
import Add from '../views/Add';
import Profile from '../views/Profile';
import Details from '../views/Details';
import Search from '../views/Search';
import Reviews from '../views/Reviews';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
    return(
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: () => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Upload') {
                        iconName = 'cloud-upload';
                    } else if (route.name === 'Search') {
                        iconName = 'search';
                    }
    
                    return <Icon name={iconName} />
                }
            })
            }
        >
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Search' component={Search} />
            <Tab.Screen name='Upload' component={Upload} />
        </Tab.Navigator>
    );
};

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Home' component={TabNavigator} />
                <Stack.Screen name='Auth' component={AuthView} />
                <Stack.Screen name='Add' component={Add} />
                <Stack.Screen name='Profile' component={Profile} />
                <Stack.Screen name='Details' component={Details} />
                <Stack.Screen name='Reviews' component={Reviews} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;