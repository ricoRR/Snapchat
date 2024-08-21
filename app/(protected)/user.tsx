import React, { useEffect, useState } from 'react';
import { Alert, Text, StyleSheet, FlatList, View, SafeAreaView, ScrollView, TextInput, Button, Pressable } from 'react-native';
import axios from "axios";
import { useSession } from '@/ctx';
import UserCard from '@/components/userCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';


interface UserInfo{
    profilePicture:string,
    username:string,
    _id:string
}
export default function User() {
    const [userInfo, setUserInfo] = useState<UserInfo[]>();
    const api_k = process.env.EXPO_PUBLIC_API_KEY;
    const {session} = useSession();
    let router = useRouter()
    useEffect(()=>{
        user()
    },[])
    async function user() {

        try {
            const data = await axios.get('https://snapchat.epidoc.eu/user', {
                headers: {
                    'x-api-key': api_k,
                    'Authorization': 'Bearer ' + session
                }
            });
            
            setUserInfo(data.data.data)
         
        } catch (error) {
            console.log("there is something wrong")
        }

    }

    function goBack(){
        router.replace('/')
    }

    return (
        <View style={styles.wrapper}>
            <Ionicons onPress={goBack} style={styles.back} name="arrow-back" size={44} color="black" />

            <View style={styles.container}>

                <ScrollView>
                
                {userInfo && userInfo.map((user: any,idx)=>{
                    return (

                        <UserCard key={idx} username={user.username} image={user.image} _id={user._id} />
                    )
                })}
                </ScrollView>
                </View>
        </View>
        
      );
}


const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'white',
      position:"relative"
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