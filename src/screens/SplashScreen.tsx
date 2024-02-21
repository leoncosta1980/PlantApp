import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import * as Animatable from "react-native-animatable";

import { RootStackParamList } from '../navigation';
import { useEffect } from 'react';

type SplashScreenNavigationProps = StackNavigationProp<RootStackParamList, 'SplashScreen'>;

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProps>();
  
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("HomeScreen");
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animatable.View animation="zoomIn" duration={3000} style={styles.logoContainer}>
        <Image source={require('@/assets/logo-color.png')} style={styles.logo} />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#04642c',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 0,
  },
});
