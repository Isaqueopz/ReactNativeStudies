import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: string;
  title: string;
}

export function Deleted() {
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadDeletedTasks = async () => {
      const stored = await AsyncStorage.getItem('@deleted_tasks');
      const parsed = stored ? JSON.parse(stored) : [];
      setDeletedTasks(parsed);
    };
    loadDeletedTasks();
  }, []);

  const uniqueDeletedTasks = deletedTasks.filter(
    (task, index, self) => index === self.findIndex((t) => t.id === task.id),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deleted Tasks</Text>
      <FlatList
        data={uniqueDeletedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
        ListEmptyComponent={<Text style={styles.item}>No tasks deleted</Text>}
      />
    </View>
  );
}
Deleted.displayName = 'Deleted';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    padding: 40,
  },
  item: {
    fontSize: 18,
    color: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
});
