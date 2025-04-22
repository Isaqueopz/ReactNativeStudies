import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Task {
  id: string;
  title: string;
}

interface TaskListProps {
  tasks: Task[];
  onRemoveTask: (id: string) => void;
}

export const TaskList = ({ tasks, onRemoveTask }: TaskListProps) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.buttonTask}
          onPress={() => {
            onRemoveTask(item.id);
          }}
        >
          <Text style={styles.titleTask}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  buttonTask: {
    backgroundColor: '#29292e',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  titleTask: {
    color: '#f1f1f1',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
