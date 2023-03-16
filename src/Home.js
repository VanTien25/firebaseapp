import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import database from '@react-native-firebase/database';

const Home = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [giay, setGiay] = useState([]);
  const [giap, setGiap] = useState([]);
  const [vukhi, setVukhi] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    database().ref('products/').on('value', snapshot => {
      let listProducts = [];
      let listCategory = [];
      snapshot.forEach(childSnapshot => {
        var childData = childSnapshot.val();
        listCategory.push(childData.category);
        listProducts.push(
          childData
        );
        // console.lof(listProducts);
        
      })
      setGiay(listProducts[0].data);
      setGiap(listProducts[1].data);
      setVukhi(listProducts[2].data);
      setCategories(listCategory);
      setData(listProducts.data);
    });
  }, [])


  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 20, backgroundColor: '#C0C0C0', height: 70, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
              onPress={() => {
                if (item === "giày") {
                  navigation.navigate('List', giay);
                }
                if (item === "giáp") {
                  navigation.navigate('List', giap);
                }
                if (item === "vũ khí") {
                  navigation.navigate('List', vukhi);
                }
              }}
                style={{
                  borderRadius: 20, width: 60,
                  height: '80%', alignItems: 'center',
                  justifyContent: 'center', backgroundColor: '#fff',
                  marginLeft: 20, alignSelf: 'center'
                }}>
                <Text style={{ color: '#000' }}>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={{ width: '100%', height: 50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Danh sách sản phẩm</Text>
      </View>



      <View style={{ marginTop: 20 }}>
        <FlatList
          data={data}
          vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Detail', {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    desc: item.desc,
                  });
                }}
                style={{
                  width: '98%',
                  height: 60,
                  borderRadius: 10,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: 15,
                  backgroundColor: '#808080'
                }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.price}</Text>
              </TouchableOpacity>
            );
          }}
        />

      </View>
    </View>
  )
}

export default Home