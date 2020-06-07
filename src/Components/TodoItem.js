import React from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import {TodoText} from './TodoText';
import {check, cross} from './Icons';

const {width, height} = Dimensions.get('window');

const TodoItem = ({item, index, visibleTodos, getClickHandler}) => (
  <View style={styles.todoContainer(index, visibleTodos)}>
    <View style={styles.todoContentContainer}>
      <TodoText style={styles.todoTitle(item.status)}>{item.data}</TodoText>
      <View style={styles.actionContainer}>
        {item.status ? (
          <TouchableOpacity
            onPress={() => getClickHandler(item.id, 'markAsDone')}
            style={styles.checkIconContainer}>
            {check()}
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => getClickHandler(item.id, 'delete')}
          style={styles.crossIconContainer}>
          {cross()}
        </TouchableOpacity>
      </View>
    </View>
    {!item.status ? <View style={styles.markedDoneLine} /> : null}
  </View>
);

export default TodoItem;

const styles = StyleSheet.create({
  crossIconContainer: {backgroundColor: '#FFFFFF', marginLeft: 15},
  checkIconContainer: {backgroundColor: '#FFFFFF'},
  markedDoneLine: {
    position: 'absolute',
    width: width,
    height: 1,
    top: height / 24 - 0.5,
    alignSelf: 'center',
    backgroundColor: '#d6d6e4',
  },
  todoContentContainer: {
    borderWidth: 0.5,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoTitle: status => ({
    flex: 7,
    fontSize: 16,
    color: status ? '#6c6c76' : '#d6d6e4',
  }),
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 3,
    justifyContent: 'flex-end',
  },
  todoContainer: (index, todos) => ({
    height: height / 12,
    paddingHorizontal: 5,
    justifyContent: 'center',
    marginBottom: index === todos.length - 1 ? 50 : undefined,
  }),
});
