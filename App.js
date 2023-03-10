import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'

import database from '@react-native-firebase/database';

const App = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    database().ref('users/').on('value', (snapshot) => {
      let array = [];
      snapshot.forEach(childSnapshot => {
        var childData = childSnapshot.val();
        array.push({
          id: childSnapshot.key,
          name: childData.name,
          mail: childData.mail,
          phone: childData.phone,
        });
      });
      // setData(array);
      console.log(snapshot)
    });
  }

  const addData = (name, mail, phone) => {
    database()
      .ref('users/')
      .push()
      .set({
        name: name,
        mail: mail,
        phone: phone,
      })
      .then((error) => {
        if (error) {
          alert('Lỗi')
        } else {
          alert('Thành công');
          setName('');
          setMail('');
          setPhone('');
        }
      });
  }

  const updateData = (id, name, mail, phone) => {
    database()
      .ref('users/' + id)
      .update({
        name: name,
        mail: mail,
        phone: phone,
      })
      .then((error) => {
        if (error) {
          alert('Lỗi Update');
        } else {
          alert('Update Thành công');
        }
      });
  }

  const deleteData = (id) => {
    database().ref('users/').remove();
    alert('Xóa thành công');
  }


  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TextInput
        style={{
          width: '80%',
          height: 40,
          padding: 10,
          borderWidth: 1,
          marginBottom: 20,
          marginTop: 40
        }}
        placeholder='Name....'
        onChangeText={text => setName(text)}
        value={name}
      />

      <TextInput
        style={{
          width: '80%',
          height: 40,
          padding: 10,
          borderWidth: 1,
          marginBottom: 20,
        }}
        placeholder='Mail....'
        onChangeText={text => setMail(text)}
        value={mail}
      />

      <TextInput
        style={{
          width: '80%',
          height: 40,
          padding: 10,
          borderWidth: 1,
          marginBottom: 20,
        }}
        placeholder='Phone....'
        onChangeText={number => setPhone(number)}
        value={phone}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={{
          width: '40%',
          height: 50,
          borderWidth: 1,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          marginBottom: 15
        }}
        onPress={() => {
          addData(name, mail, phone);
        }}>
        <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: '40%',
          height: 50,
          borderWidth: 1,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          marginBottom: 15
        }}>
        <Text style={{ color: 'yellow', fontSize: 18, fontWeight: 'bold' }}>Show</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          deleteData(id);
        }}
        style={{
          width: '40%',
          height: 50,
          borderWidth: 1,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          marginBottom: 15
        }}>
        <Text style={{ color: 'green', fontSize: 18, fontWeight: 'bold' }}>Delete</Text>
      </TouchableOpacity>

      <ScrollView style={{ width: '96%', marginTop: 30 }}>
        {/* <FlatList
          data={data}
          keyExtractor={({ item }, index) => { index.toString() }}

          renderItem={({ item, index }) =>
            <View>
              <TouchableOpacity onPress={() => {
                deleteData(item.id);
              }}>
                <Text style={{
                  borderBottomWidth: 3,
                  width: '90%',
                  padding: 10,
                }} > {item.name} </Text>
              </TouchableOpacity>
            </View>
          }
        /> */}

      </ScrollView>
    </View>
  )
}

export default App
