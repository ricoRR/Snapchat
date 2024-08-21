import React from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import * as Linking from 'expo-linking';
import { Link } from 'expo-router';

const userCard = (props:{_id:string, username:string, image:any}) => {

 


  return (
    <TouchableOpacity  >
      <Link
        href={{
          pathname: "/before",
          params: { _id: props._id },
        }}
      >

    <View  style={styles.container}>
        <Text style={styles.text}>{props.username}</Text>
        <Image src={props.image}/>
    </View>
    </Link>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding:10,
    borderBottomColor:'black',
    borderWidth:1,
    height:100
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  }
});

export default userCard
