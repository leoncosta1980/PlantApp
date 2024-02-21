import { Item } from '@/entities/Item';
import { createConnection, Connection } from 'typeorm';;

const connectDatabase = async (): Promise<Connection> => {
  const connection = await createConnection({
    type: 'expo',
    driver: require('expo-sqlite'),
    database: 'plantApp2.db',
    logging: true,
    synchronize: true,
    entities: [Item],
  });

  return connection;
};

export default connectDatabase;
