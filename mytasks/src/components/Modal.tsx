import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface Task {
  id: string;
  title: string;
}

interface TaskDeleteModalProps {
  visible: boolean;
  task: Task | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const TaskDeleteModal = ({ visible, task, onConfirm, onCancel }: TaskDeleteModalProps) => {
  return (
    <Modal animationType="fade" transparent={false} visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>
          {task ? `Do you want to delete the task "${task.title}"?` : ''}
        </Text>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity onPress={onConfirm} style={styles.button}>
            <Text style={styles.buttonText}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel} style={styles.button}>
            <Text style={styles.buttonText}>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
