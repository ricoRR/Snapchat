import { useRouter } from 'expo-router';
import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View ,SafeAreaView,Image, ImageBackground, ToastAndroid} from 'react-native';

const index = () => {

    const router = useRouter()

    function redirectLogin() {
        router.replace('/login')
      } 
      
      function redirectRegister() {
        router.replace('/register')
      } 
  
      

  return (
    <View style={styles.container}>
    
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={redirectLogin}>
        <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={redirectRegister}>
        <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
       
     
      </View>
   
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:"#fffc00"
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
      flexDirection: 'column',
      backgroundColor: 'transparent',
      margin: 64,
      width:"100%"
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
        width:"100%"
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

export default index
