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
import { TaskDeleteModal } from '../components/Modal';
import { NewTaskInputForm } from '../components/NewTaskInputForm';

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

        <NewTaskInputForm
          value={newTask}
          onChangeText={setNewTask}
          onSubmit={handleAddNewTask}
        />

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
  textTasks: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
});
