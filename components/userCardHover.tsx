import React from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import * as Linking from 'expo-linking';

const userCardHover = (props:{_id:string, username:string, image:any}) => {

 
 

  return (
    <TouchableOpacity  >

    <View  style={styles.container}>
        <Text style={styles.text}>{props.username}</Text>
        <Image src={props.image}/>
    </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    width:"100%",
    
    position:"absolute",
    bottom:10,
    flex: 1,
    justifyContent: 'center',
    padding:10,
    borderBottomColor:'black',
    borderWidth:1,
    height:100,
    backgroundColor:'white'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  }
});

export default userCardHover
