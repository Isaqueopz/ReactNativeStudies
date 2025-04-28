import React from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface NewTaskInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export const TaskInputForm = ({ value, onChangeText, onSubmit }: NewTaskInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder="Type your task..."
        placeholderTextColor="#B0B0B0"
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={onSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
});
