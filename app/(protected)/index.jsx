import { CameraView, useCameraPermissions,Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View ,SafeAreaView,Image, ImageBackground, ToastAndroid, StatusBar} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSession } from '@/ctx';
import * as ImageManipulator from 'expo-image-manipulator';

export default function Explore() {
  const [facing, setFacing] = useState('front');
  const { signOut,setFile,file } = useSession();
  const [permission, requestPermission] = useCameraPermissions();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();



 
  let router = useRouter()
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let photo = await cameraRef.current.takePictureAsync(options);

    const resizedPhoto = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 360, height: 640 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
  );
  setFile({
    ...resizedPhoto,
    base64: resizedPhoto.base64
});
  };

 
  if (file) {
    let sharePic = () => {
        router.replace('/user')
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
      });
    };

    return (
      <View style={styles.container}>
       
        <ImageBackground contentFit={"fill"} style={styles.preview} source={{ uri: "data:image/jpg;base64," + file.base64 }} >
        <AntDesign style={styles.close} onPress={() => setFile(undefined)} name="close" size={40} color="white" />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}  onPress={savePhoto} >
          {hasMediaLibraryPermission ? <MaterialIcons name="save-alt"  size={44} color="white" />: undefined}
          </TouchableOpacity>

       
          <TouchableOpacity onPress={sharePic} style={styles.button} >
            <Feather  name="send" size={44} color="white" />      
          </TouchableOpacity>
        </View>
        </ImageBackground>
 

          
          
      </View>
    );
  }

  
  if (!permission) {
    // Camera permissions are still loading.
    return (<View />) ;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  } 
  
  function redirectGallery() {
    router.replace('/gallery')
  } 
  
  function redirectSnap() {
    router.replace('/allsnap')
  } 
  
 

  return (
    <View style={styles.container}>

      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={redirectSnap}>
            <MaterialIcons name="photo-library" size={54} color="white" />
          </TouchableOpacity> 
          <TouchableOpacity style={styles.button} onPress={redirectGallery}>
            <MaterialIcons name="photo-library" size={54} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePic}>
          <Entypo name="circle" size={94} color="white" />
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
           {facing=="front" ? <FontAwesome6 name="face-smile" size={54} color="white" /> : <FontAwesome6 name="face-dizzy" size={54} color="white" />} 
          </TouchableOpacity>
          <Text
        onPress={() => {
          signOut();
        }}>
        Sign Out
      </Text>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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