import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskList } from '../../components/TaskList';

interface Task {
  id: string;
  title: string;
}

export const Home = () => {
  const [newTask, setNewTask] = React.useState('');
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [taskToDelete, setTaskToDelete] = React.useState<Task | null>(null);

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setModalVisible(false);
  };

  const handleAddNewTask = () => {
    const data: Task = {
      id: String(new Date().getTime()),
      title: newTask.trim() || 'Task Empty',
    };
    setTasks([...tasks, data]);
    setNewTask('');
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
          tasks={tasks}
          onRemoveTask={handleRemoveTask}
          onTaskPress={toggleModal}
        />

        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              {taskToDelete
                ? `Do you want to delete the task "${taskToDelete.title}"?`
                : ''}
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (taskToDelete) handleRemoveTask(taskToDelete.id);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>YES</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29292e',
  },
  modalText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
