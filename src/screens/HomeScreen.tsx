import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Image, TouchableOpacity, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { RootStackParamList } from '../navigation';
import { useEffect } from 'react';

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProps>();

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo-color.png')} style={styles.logo} />
      <Text style={styles.title}></Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddItemScreen')}>
        <Text style={styles.buttonText}>Cadastrar Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditItemScreen')}>
        <Text style={styles.buttonText}>Editar Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShowItemsScreen')}>
        <Text style={styles.buttonText}>Mostrar Itens</Text>
      </TouchableOpacity>
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
  logo: {
    width: 250,
    height: 250,
    marginBottom: 0,
  },
  title: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: 0,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderRadius: 10,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    elevation: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
