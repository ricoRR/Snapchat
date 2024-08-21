import { useSession } from '@/ctx';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Text, StyleSheet, FlatList, View, SafeAreaView, ScrollView, TextInput, Button, Pressable, ImageBackground } from 'react-native';
import * as Linking from 'expo-linking';
import AntDesign from '@expo/vector-icons/AntDesign';
import UserCardHover from '@/components/userCardHover';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import * as ImageManipulator from 'expo-image-manipulator';


const before = () => {

    const [userInfo, setUser] = useState();
    const [time, setTime] = useState(30);
    const api_k = process.env.EXPO_PUBLIC_API_KEY;
    const {session,setFile,file} = useSession();
    const params = useLocalSearchParams();
    const { _id  } = params;


    useEffect(()=>{
        user()
    },[])
    let router = useRouter()
    function goBack(){
        router.replace('/user')
    }
    async function user() {

        if (_id) {

            try {
                const data = await axios.get(`https://snapchat.epidoc.eu/user/${_id}`, {
                    headers: {
                        'x-api-key': api_k,
                        'Authorization': 'Bearer ' + session
                    }
                });
                
                setUser(data.data.data)
                
            } catch (error) {
                console.log("there is something wrong")
            }
            
          }

       

    }

    

    async function sendSnap() {
        try {
            if (!_id) {
                throw new Error('Need User ID.');
            }
    
            if (!file.base64) {
                throw new Error('Need Image data.');
            }
    
            if (!time) {
                throw new Error('Need image');
            }
            
    
            const snapDuration = parseInt(time);
          
             const body = {
                 to: _id.toString(),
                 image: "data:image/jpg;base64," + file.base64 ,
                 duration: snapDuration
             }; 
            
            const headers = {
                'x-api-key': api_k,
                'Authorization': 'Bearer ' + session
            };
    
            const response = await axios.post(`https://snapchat.epidoc.eu/snap`, body, { headers });
    
            if (response.status === 200) {
                console.log('Snap sent!');
                router.replace('/')
                setFile(undefined)
            } else {
                throw new Error('Failed to send snap: ' + response.status);
            }
        } catch (error) {
            console.error('Error sending snap:', error);
            throw error;
        }
    }
    


  
    
  return (
    <View style={styles.container}>
       
    <ImageBackground contentFit={"fill"} style={styles.preview} source={{ uri: "data:image/jpg;base64," + file.base64  }} >
        <AntDesign style={styles.close} onPress={goBack} name="close" size={40} color="white" />
        <Feather onPress={sendSnap} style={styles.sent} name="send" size={24} color="white" />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setTime}
          value={time}
          secureTextEntry={true}
          placeholder="10"
          autoCapitalize="none"
        />
    </ImageBackground>
    <UserCardHover  username={userInfo?.username||''} image={userInfo?.profilePicture} _id={''} />

  </View>
  )
}

export default before


const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'white',
      position:"relative"
    }, 
    sent:{
        position:"absolute",
        top:20,
        right:25 
    }, input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        width:"100%",
        color:"red",
        position:"absolute",
        backgroundColor:"white",
        top:60
      },
    container: {
      flex: 1,
      marginTop:60,
      justifyContent: 'center',
      backgroundColor:'white'
    },
    back:{
      position:"absolute",
     top:10,
      left:10
  
    },
    preview:{
      flex:1,
      justifyContent:"center",
      width:"100%",
      height:"100%"
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    close:{
      position:"absolute",
      top:5,
      left:5,
  
    }
  });