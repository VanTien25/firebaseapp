import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'

import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Authentication = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const createUser = () => {
        auth()
            .createUserWithEmailAndPassword(email, password, name)
            .then(() => {
                database()
                    .ref('users/' + firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email,
                        password,
                    })
                    .then((error) => {
                        if (error) {
                            alert('Lỗi')
                        } else {
                            alert('Thành công');
                        }
                    });
            })
            .catch(error => {
                if (name == '') {
                    Alert.alert('Hay nhap ten');
                    if (email == '') {
                        Alert.alert('Hay nhap Email');
                        if (error.code === 'auth/invalid-email') {
                            Alert.alert('Địa chỉ email đó không hợp lệ!!');
                            if (error.code === 'auth/email-already-in-use') {
                                Alert.alert('Địa chỉ email đó đã được sử dụng!');
                                if (password == '') {
                                    Alert.alert('Hay nhap Pass');
                                }
                            }
                        }
                    }
                }
                // if (error.code == '') {
                //     Alert.alert('Chưa nhập Email')
                // }
                // if (error.code === 'auth/email-already-in-use') {
                //     Alert.alert('Địa chỉ email đó đã được sử dụng!');
                // }

                // if (error.code === 'auth/invalid-email') {
                //     Alert.alert('Địa chỉ email đó không hợp lệ!!');
                // }

                console.error(error);
            });
    };

    const userSignin = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('User Login');
            }).catch(error => {
                if (email === '') {
                    Alert.alert('Địa chỉ email đó đã được sử dụng!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('Địa chỉ email đó không hợp lệ!');
                }

                console.error(error);
            });
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder='Name.....'
                value={name}
                onChangeText={txt => setName(txt)}
                style={{
                    width: '90%',
                    height: 50,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingLeft: 20,
                    marginTop: 20,
                }} />

            <TextInput
                placeholder='Email.....'
                value={email}
                onChangeText={txt => setEmail(txt)}
                style={{
                    width: '90%',
                    height: 50,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingLeft: 20,
                    marginTop: 20,
                }} />

            <TextInput
                placeholder='Password.....'
                value={password}
                onChangeText={txt => setPassword(txt)}
                style={{
                    width: '90%',
                    height: 50,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingLeft: 20,
                    marginTop: 30,
                }} />
            <TouchableOpacity
                style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 20,
                    backgroundColor: '#000',
                    marginTop: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    createUser();
                    // userSignin();
                }}>
                <Text style={{ color: '#fff' }}> Sign In</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Authentication