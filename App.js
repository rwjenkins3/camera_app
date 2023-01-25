import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function App() {

  const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.back);
  const [ flashMode, setFlashMode ] = useState(Camera.Constants.FlashMode.off);
  const [ hasCameraPermission, setHasCameraPermission ] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

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
        ref={cameraRef}
        flashMode={flashMode}
      >
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  camera: {
    flex: 1
  }
});
