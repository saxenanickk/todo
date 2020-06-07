import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {cross} from '../Components/Icons';
import {TodoText, TodoTextInput} from '../Components/TodoText';

const {width, height} = Dimensions.get('window');

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const AddTodo = ({addTodo, onRequestClose}) => {
  const [content, setContent] = useState('');

  return (
    <View style={styles.container}>
      <TodoText style={styles.heading}>{'Write a new Todo'}</TodoText>
      <TodoTextInput
        autoFocus={true}
        onChangeText={text => setContent(text)}
        value={content}
        multiLine={true}
        returnKeyType={'next'}
        placeholder={'Add a new Todo'}
        style={styles.searchTextInput}
      />
      <TouchableOpacity
        style={styles.crossButton}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          onRequestClose();
        }}>
        {cross()}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => addTodo(content)}
        style={styles.addButton}>
        <TodoText>{'Add'}</TodoText>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width / 1.25,
    padding: 10,
    height: height / 4,
    top: height / 2 - height / 8,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#cfcfcf',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 5,
    justifyContent: 'space-between',
  },
  heading: {fontWeight: 'bold', fontSize: 20},
  searchTextInput: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  crossButton: {position: 'absolute', right: 10, top: 10},
  addButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
