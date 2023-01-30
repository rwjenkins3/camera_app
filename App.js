import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Feather from '@expo/vector-icons/Feather';



export default function App() {

  const [ cameraType, setCameraType ] = useState(CameraType.front);
  const [ flashMode, setFlashMode ] = useState(Camera.Constants.FlashMode.off);
  const [ hasCameraPermission, setHasCameraPermission ] = useState(null);
  const [ image, setImage ] = useState(null);
  
  // const cameraRef = useRef(null);
  let cameraRef;

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = () => {
    if(cameraRef) {
      try {
        const data = cameraRe
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }

  }

  if(hasCameraPermission === false) {
    return (
      <Text>No Camera Permissions</Text>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        ref={ref => (cameraRef = ref)}
        flashMode={flashMode}
      >
      </Camera>
      <View style={styles.controlContainer}>
        <Pressable onPress={takePicture}>
          <Feather name="circle" style={styles.cameraButton} size={48} color='white' />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
    aspectRatio: 3/4,
  },

  cameraButton: {

  },

  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12
  }
});
