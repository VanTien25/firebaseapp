import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'

const Detail = ({ navigation, route }) => {
  const [count, setCount] = useState('1');
  const [buttonDisable, setButtonDisable] = useState(false);

  const decrease = () => {
    if (count <= 1) {
      setButtonDisable(false);
    } else {
      setCount(count - 1);
    }
  }

  const increase = () => {
    setCount(count + 1);
  }
  return (
    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{route.params.id}</Text>

      <View style={{ height: 1, width: '100%', borderWidth: 1 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{route.params.name}</Text>

      <View style={{ height: 1, width: '100%', borderWidth: 1 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{route.params.price}</Text>

      <View style={{ height: 1, width: '100%', borderWidth: 1 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{route.params.desc}</Text>


      <View style={{ height: 1, width: '100%', borderWidth: 1 }} />
      <View style={{
        height: 80, flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', padding: 15
      }}>
        <Text style={{ fontSize: 20, color: 'black' }}>Size: </Text>
        <FlatList
          data={route.params.size}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 40,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginLeft: 15,
                  backgroundColor: '#BB0000'
                }}
              >
                <Text style={{ fontSize: 20, color: '#fff' }}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />

      </View>

      <View style={{ height: 1, width: '100%', borderWidth: 1 }} />
      <View style={{ width: '60%', height: 50, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {
          count <= 1 ?
            (<View
              disabled={buttonDisable}
              onPress={() => {
                decrease();
              }}
              style={{ width: '20%', height: '100%', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 40 }}>-</Text>
            </View>) :
            (
              <TouchableOpacity
                disabled={buttonDisable}
                onPress={() => {
                  decrease();
                }}
                style={{ width: '20%', height: '100%', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 40 }}>-</Text>
              </TouchableOpacity>
            )
        }

        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{count}</Text>

        <TouchableOpacity
          disabled={buttonDisable}
          onPress={() => {
            increase();
          }}
          style={{ width: '20%', height: '100%', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 40 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Detail