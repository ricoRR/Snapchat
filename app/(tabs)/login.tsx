import React, { useState } from 'react';
import { Alert, StyleSheet, View, TextInput, Button } from 'react-native';
import axios from "axios";
import { useSession } from '@/ctx';
import { Redirect, router, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const api_k = process.env.EXPO_PUBLIC_API_KEY;
  const { signIn } = useSession();
  const router = useRouter();

  function goBack(){
    router.replace('/')
  }
  async function login() {
    setLoading(true);

    try {
      const data = await axios.put('https://snapchat.epidoc.eu/user', {
        email: email,
        password: password,
      }, {
        headers: {
            'x-api-key': api_k,
        }
      });

      if (data.data) {
        signIn(data.data.data.token)
        return router.replace('/')
      };

    } catch (error) {
      Alert.alert("there is something wrong");
    }
  
    setLoading(false);
  }

  

  return (
    <View style={styles.container}>
            <Ionicons onPress={goBack} style={styles.back} name="arrow-back" size={44} color="white" />

      <View  style={[styles.verticallySpaced, styles.mt20]}>

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
        <Button title="Login" disabled={loading} onPress={login} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  back:{
    position:"absolute",
   bottom:-100,
    left:10

  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    color:"white"
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
