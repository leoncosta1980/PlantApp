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

    let itemsList = await itemRepository.find();

    // Ordena os itens por nome em ordem alfabética
    itemsList = itemsList.sort((a, b) => a.name.localeCompare(b.name));

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

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Nome</Text>
          <Text style={styles.headerText}>Estoque</Text>
          <Text style={styles.headerText}>Preço unitário R$</Text>
          <Text style={styles.headerText}>Saldo total R$</Text>
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemData}>{item.name}</Text>
              <Text style={styles.itemData}>{item.quantity}</Text>
              <Text style={styles.itemData}>{item.price}</Text>
              <Text style={styles.itemData}>{calculateTotalValue(item)}</Text>
            </View>
          )}
          contentContainerStyle={styles.tableContent}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Total de Itens: {totalItems}</Text>
        <Text style={styles.footerText}>Valor Total do Estoque: R${totalValue.toFixed(2)}</Text>
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
  logo: {
    width: 100,
    height: 100,
    margin: 10,
  },
  title: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#FFFFFF', 
    marginBottom: 20,
  },
  tableContainer: {
    flex: 1,
    width: '97%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 5,
  },
  headerText: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 5,
  },
  itemData: {
    flex: 1,
    fontSize: 9,
    textAlign: 'center',
  },
  tableContent: {
    flexGrow: 1,
  },
  footer: {
    width: '100%',
    backgroundColor: '#3fd760',
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: '#210123', 
  },
  footerText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1c2130', 
  },
});
