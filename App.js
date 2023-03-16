import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/Home';
import Detail from './src/Detail.js';
import List from './src/List.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}  />
        <Stack.Screen name="Detail" component={Detail} options={{headerShown: false}} />
        <Stack.Screen name="List" component={List} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
