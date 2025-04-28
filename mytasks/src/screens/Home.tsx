import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskList } from '../components/TaskList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskDeleteModal } from '../components/modal';


interface Task {
  id: string;
  title: string;
}

export const Home = () => {
  const [newTask, setNewTask] = React.useState('');
  const [currentTasks, setTasks] = React.useState<Task[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [taskToDelete, setTaskToDelete] = React.useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('@tasks');
        const parsedTasks = JSON.parse(storedTasks ?? '[]');
        setTasks(parsedTasks);
      } catch (error) {
        console.log('Erro ao carregar tarefas', error);
      }
    };
    loadTasks();
  }, []);

  const saveDeletedTask = async (task: Task) => {
    const stored = await AsyncStorage.getItem('@deleted_tasks');
    const parsed = stored ? JSON.parse(stored) : [];
    const updated = [...parsed, task];
    await AsyncStorage.setItem('@deleted_tasks', JSON.stringify(updated));
  };

  const saveTasks = async (tasksArray: Task[]) => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasksArray));
    } catch (error) {
      console.log('Erro ao salvar tarefas', error);
    }
  };

  const handleRemoveTask = (id: string) => {
    const task = currentTasks.find((task) => task.id === id);
    if (task) saveDeletedTask(task);
    const updatedTasks = currentTasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setModalVisible(false);
    saveTasks(updatedTasks);
  };

  const handleAddNewTask = () => {
    const data: Task = {
      id: String(new Date().getTime()),
      title: newTask.trim() || 'Task Empty',
    };
    const temp = [...currentTasks, data];
    setTasks(temp);
    setNewTask('');
    saveTasks(temp);
  };

  const toggleModal = (task: Task) => {
    setTaskToDelete(task);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Task Manager</Text>

        <TextInput
          value={newTask}
          onChangeText={setNewTask}
          style={styles.input}
          placeholder="Type your task..."
          placeholderTextColor="#B0B0B0"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleAddNewTask}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <Text style={styles.textTasks}>My tasks:</Text>

        <TaskList
          tasks={currentTasks}
          onRemoveTask={handleRemoveTask}
          onTaskPress={toggleModal}
        />

        <TaskDeleteModal
          visible={modalVisible}
          task={taskToDelete}
          onConfirm={() => {
            if (taskToDelete) handleRemoveTask(taskToDelete.id);
          }}
          onCancel={() => setModalVisible(false)}
        />

      </View>
    </SafeAreaView>
  );
};
Home.displayName = 'Home';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121214',
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    backgroundColor: '#202024',
    borderRadius: 20,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#eba417',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#121214',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textTasks: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
});
