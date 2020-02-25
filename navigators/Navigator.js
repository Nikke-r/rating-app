import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../views/Home';
import AuthView from '../views/AuthView';

const Stack = createStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Auth' component={AuthView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;