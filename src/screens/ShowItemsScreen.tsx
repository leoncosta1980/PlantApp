import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Image, TouchableOpacity, View, Text, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { RootStackParamList } from '../navigation';
import { useEffect, useState } from 'react';
import { Item } from '@/entities/Item';
import connectDatabase from '~/database';

type ShowItemsScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ShowItemsScreen'>;

export default function ShowItemsScreen() {
  const navigation = useNavigation<ShowItemsScreenNavigationProps>();

  const [items, setItems] = useState<Item[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

  const fetchItems = async () => {
    const connection = await connectDatabase();
    const itemRepository = connection.getRepository(Item);

    const itemsList = await itemRepository.find();

    setItems(itemsList);

    // Calcula o total de itens e o valor total do estoque
    const totalItemsCount = itemsList.reduce((total, item) => total + (item.quantity || 0), 0);
    const totalStockValue = itemsList.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);

    setTotalItems(totalItemsCount);
    setTotalValue(totalStockValue);

    connection.close();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const calculateTotalValue = (item: Item) => {
    return (item.quantity || 0) * (item.price || 0);
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo-color.png')} style={styles.logo} />
      <Text style={styles.title}>Meu Estoque</Text>

      <FlatList
        style={styles.flatList}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>
            <Text style={styles.itemPrice}>Preço unitário: R${item.price}</Text>
          </View>
        )}
      />

      <View style={styles.tableRowResume}>
        <Text style={styles.columnHeader}>Total de Itens</Text>
        <Text style={styles.columnHeader}>Valor Total do Estoque R$</Text>
      </View>
      <View style={styles.tableRowResume}>
        <Text style={styles.tableCell}>{totalItems}</Text>
        <Text style={styles.tableCell}>{totalValue.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#04642c',
  },
  flatList: {
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 0,
  },
  title: {
    fontSize: 24,
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
    marginBottom: 3,
  },
  itemPrice: {
    fontSize: 14,
  },
  tableRowResume: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#cfcaca',
    padding: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000000',
  },
  columnHeader: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
    textAlign: 'center',
  },
});