import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Image, TouchableOpacity, View, Text, TextInput } from 'react-native';

import { RootStackParamList } from '../navigation';
import { useState } from 'react';
import { Item } from '@/entities/Item';
import connectDatabase from '~/database';

type AddItemScreenNavigationProps = StackNavigationProp<RootStackParamList, 'AddItemScreen'>;

export default function AddItemScreen() {
  const navigation = useNavigation<AddItemScreenNavigationProps>();
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const saveItem = async () => {
    const connection = await connectDatabase();
    const itemRepository = connection.getRepository(Item);

    const newItem = new Item();
    newItem.name = itemName;
    newItem.price = parseFloat(itemPrice);
    newItem.quantity = parseInt(itemQuantity, 10);

    await itemRepository.save(newItem);

    connection.close();
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo-color.png')} style={styles.logo} />
      <Text style={styles.title}>Cadastre Novo Item</Text>
      <TextInput
        placeholder="Nome do Item"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Preço"
        value={itemPrice}
        onChangeText={(text) => setItemPrice(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={itemQuantity}
        onChangeText={(text) => setItemQuantity(text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={saveItem}>
        <Text style={styles.buttonText}>Gravar</Text>
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
    fontSize: 20, // Alterado o valor de fontSize de 0 para 20
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: 0,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
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
  },
});
