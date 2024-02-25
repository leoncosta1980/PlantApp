import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Image, TouchableOpacity, View, Text, Alert, TextInput } from 'react-native';

import { RootStackParamList } from '../navigation';
import { useState } from 'react';
import { Item } from '@/entities/Item';
import connectDatabase from '~/database';

type EditItemScreenNavigationProps = StackNavigationProp<RootStackParamList, 'EditItemScreen'>;

export default function EditItemScreen() {
  const navigation = useNavigation<EditItemScreenNavigationProps>();

  const [searchItemName, setSearchItemName] = useState('');
  const [foundItem, setFoundItem] = useState<Item | null>(null);
  const [editedItemName, setEditedItemName] = useState('');
  const [editedItemPrice, setEditedItemPrice] = useState('');
  const [editedItemQuantity, setEditedItemQuantity] = useState('');

  const searchItem = async () => {
    const connection = await connectDatabase();
    const itemRepository = connection.getRepository(Item);

    const item = await itemRepository.findOne({ where: { name: searchItemName } });

    if (item) {
      setFoundItem(item);
      setEditedItemName(item.name);
      setEditedItemPrice(item.price.toString());
      setEditedItemQuantity(item.quantity.toString());
    } else {
      setFoundItem(null);
      Alert.alert('Item não encontrado!');
    }

    connection.close();
  };

  const editItem = async () => {
    if (foundItem) {
      const connection = await connectDatabase();
      const itemRepository = connection.getRepository(Item);

      foundItem.name = editedItemName;
      foundItem.price = parseFloat(editedItemPrice);
      foundItem.quantity = parseInt(editedItemQuantity, 10);

      await itemRepository.save(foundItem);

      connection.close();
      navigation.navigate('HomeScreen');
    }
  };

  const deleteItem = async () => {
    if (foundItem) {
      Alert.alert('Confirmação', 'Tem certeza que deseja excluir este item?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            const connection = await connectDatabase();
            const itemRepository = connection.getRepository(Item);

            await itemRepository.remove(foundItem);

            setFoundItem(null);
            setEditedItemName('');
            setEditedItemPrice('');
            setEditedItemQuantity('');
            Alert.alert('Item excluído com sucesso!');
            navigation.navigate('HomeScreen');

            // Recarregar a lista de itens após a exclusão
            setSearchItemName(''); 
            connection.close();
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo-color.png')} style={styles.logo} />
      <Text style={styles.title}>Editar Item</Text>
      <TextInput
        placeholder="Nome do Item"
        value={searchItemName}
        onChangeText={(text) => setSearchItemName(text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={searchItem}>
        <Text style={styles.buttonText}>Buscar Item</Text>
      </TouchableOpacity>

      {foundItem && (
        <>
          <Text style={styles.label}>Novo Nome do Item:</Text>
          <TextInput
            placeholder="Novo Nome do Item"
            value={editedItemName}
            onChangeText={(text) => setEditedItemName(text)}
            style={styles.inputEdit}
          />
          <Text style={styles.label}>Novo Preço do Item:</Text>
          <TextInput
            placeholder="Novo Preço"
            value={editedItemPrice}
            onChangeText={(text) => setEditedItemPrice(text)}
            style={styles.inputEdit}
          />
          <Text style={styles.label}>Nova Quantidade do Item:</Text>
          <TextInput
            placeholder="Nova Quantidade"
            value={editedItemQuantity}
            onChangeText={(text) => setEditedItemQuantity(text)}
            style={styles.inputEdit}
          />
          <TouchableOpacity style={styles.button} onPress={editItem}>
            <Text style={styles.buttonText}>Gravar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: '#e3091b' }]} onPress={deleteItem}>
            <Text style={styles.buttonText}>Excluir Item</Text>
          </TouchableOpacity>
        </>
      )}
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
    width: 150,
    height: 150,
    marginBottom: 0,
  },
  title: {
    fontSize: 20,
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
  label: {
    color: '#FFFFFF',
    fontSize: 9,
  },
  inputEdit: {
    backgroundColor: '#a2a9af',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000000',
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
