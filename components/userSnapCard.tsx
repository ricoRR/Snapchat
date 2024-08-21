import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';
import { useSession } from '@/ctx';

const UserSnapCard = (props:{ id:string,from:string }) => {
  const [userData, setUserData] = useState({ username: '', profilePicture: '' });
  const api_k = process.env.EXPO_PUBLIC_API_KEY;
  const {session} = useSession();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = {
            'x-api-key': api_k,
            'Authorization': 'Bearer ' + session
        };
        
        const response = await axios.get(`https://snapchat.epidoc.eu/user/${props.from}`,{headers});
        console.log(response.data)
        setUserData({
          username: response.data.data.username,
          profilePicture: response.data.data.image
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [props.from]);


  console.log(userData)

  return (
    <TouchableOpacity>
      <Link
        href={{
          pathname: "/snap",
          params: { id: props.id },
         
        }}
        style={styles.container}
      >
        <View style={styles.container}>
            <Text style={styles.text}>{userData.username}</Text>
            {userData.profilePicture &&  <Image style={styles.image} source={{ uri: userData.profilePicture }} /> }  
        </View>
      </Link>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    borderBottomColor: 'black',
    borderWidth: 1,
    height: 100,
    backgroundColor:'white',
    width:'100%'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }
});

export default UserSnapCard;

