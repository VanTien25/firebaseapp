import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const List = ({ route }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={route.params}
        vertical
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
            onPress={() => {
              navigation.navigate('Detail', item)
            }}
              style={{
                width: '96%',
                height: 60,
                borderWidth: 1,
                borderRadius: 15,
                marginTop: 15,
                backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{item.price}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

export default List