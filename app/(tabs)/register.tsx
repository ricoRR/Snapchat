import React, { useState } from 'react';
import { Alert, StyleSheet, View, TextInput, Button } from 'react-native';
import axios from "axios";
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const api_k = process.env.EXPO_PUBLIC_API_KEY;
    const router = useRouter();

    function goBack(){
        router.replace('/')
      }


    async function register() {
        setLoading(true);

        try {
            const data = await axios.post('https://snapchat.epidoc.eu/user', {
                username: username,
                email: email,
                profilePicture: "",
                password: password,
            }, {
                headers: {
                    'x-api-key': api_k,
                }
            });

            if (data.data) Alert.alert(data.data);
        } catch (error) {
            Alert.alert("there is something wrong");
        }

        setLoading(false);
    }

    return (
        <View style={styles.container}>
                        <Ionicons onPress={goBack} style={styles.back} name="arrow-back" size={44} color="white" />

            <View style={[styles.verticallySpaced, styles.mt20]}>


                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Username"
                    autoCapitalize="none"
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Button
                    title="Register"
                    disabled={loading}
                    onPress={register}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },back:{
        position:"absolute",
       bottom:-100,
        left:10
    
      },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        color:'white'
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
});
