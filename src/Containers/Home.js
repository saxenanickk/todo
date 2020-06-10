/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
  FlatList,
  Dimensions,
} from 'react-native';
import {saveTodos, getTodos} from '../customModules/LocalStorage';
import {TodoText, TodoTextInput} from '../Components/TodoText';
import {filterIcon, plus} from '../Components/Icons';
import DialogModal from '../Components/DialogModal';
import TodoItem from '../Components/TodoItem';
import AddTodo from './AddTodo';
import Filters from './Filters';
import {theme} from '../utils/theme';

const {width, height} = Dimensions.get('window');

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      searchQuery: '',
      filter: null,
      showModal: false,
      type: '',
    };
    this.visibleTodos = [];
  }

  /**
   * This function is responsible for adding a Todo.
   * Todo must contain data and status will be 1 by default.
   * status has two possible values - 0 (when todo is marked as done) and 1 (todo is active)
   */
  addTodo = (data = '') => {
    const todoList = this.state.todos.slice();
    const itemToAdd = {
      data,
      status: 1,
      id:
        todoList.length && todoList[todoList.length - 1].id
          ? todoList[todoList.length - 1].id + 1
          : 1,
    };

    todoList.push(itemToAdd);

    this.setState(
      {
        todos: todoList,
        showModal: false,
      },
      () => saveTodos(this.state.todos),
    );
  };

  getClickHandler = (key, type) => {
    const todoListAfterChange = this.state.todos.slice();

    const index = todoListAfterChange.findIndex(item => item.id === key);

    if (type === 'delete') {
      todoListAfterChange.splice(index, 1);
    } else if (type === 'markAsDone') {
      const itemToAdd = {
        ...todoListAfterChange[index],
        status: 0,
      };
      todoListAfterChange.splice(index, 1, ...[itemToAdd]);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState({todos: todoListAfterChange}, () =>
      saveTodos(this.state.todos),
    );
  };

  componentDidMount() {
    getTodos(data => this.setState({todos: data}));
  }

  getVisibleTodos = () => {
    const {todos, searchQuery, filter} = this.state;

    let returnableData = todos.slice();

    if (filter !== null) {
      returnableData = returnableData.filter(
        item => item.status.toString() === filter.toString(),
      );
    }
    if (searchQuery) {
      returnableData = returnableData.filter(
        item => item.data.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1,
      );
    }

    return returnableData;
  };

  renderListEmptyComponent = () => (
    <View style={styles.listEmptyContainer}>
      <TodoText>
        {`No Todos${
          this.state.todos.length ? ' matching current criteria.' : '.'
        }`}
      </TodoText>
    </View>
  );

  render() {
    const {showModal, type} = this.state;

    this.visibleTodos = this.getVisibleTodos();

    return (
      <>
        <View style={styles.header}>
          <TodoText style={styles.headerTitle}>{'Todos'}</TodoText>
          <View style={styles.searchBarContainer}>
            <TodoTextInput
              onChangeText={text => {
                this.setState({searchQuery: text});
              }}
              placeholder={'Search Todo'}
              style={styles.searchTextInput}
            />
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );

                this.setState({showModal: true, type: 'Filters'});
              }}>
              {filterIcon()}
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine} />
        </View>
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.visibleTodos}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={this.renderListEmptyComponent}
            renderItem={({item, index}) => (
              <TodoItem
                item={item}
                index={index}
                visibleTodos={this.visibleTodos}
                getClickHandler={this.getClickHandler}
              />
            )}
          />
        </View>
        {showModal ? (
          <DialogModal onRequestClose={() => this.setState({showModal: false})}>
            {type === 'AddTodo' ? (
              <AddTodo
                onRequestClose={() => this.setState({showModal: false})}
                addTodo={this.addTodo}
              />
            ) : type === 'Filters' ? (
              <Filters
                selectFilter={data =>
                  this.setState({filter: data, showModal: false})
                }
              />
            ) : null}
          </DialogModal>
        ) : (
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              this.setState({showModal: true, type: 'AddTodo'});
            }}
            style={styles.addIconContainer}>
            {plus()}
          </TouchableOpacity>
        )}
      </>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  header: {
    height: height / 7,
    backgroundColor: theme.primaryColor,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  horizontalLine: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#d6d6e4',
  },
  listEmptyContainer: {
    alignItems: 'center',
  },
  headerTitle: {fontSize: 24, fontWeight: 'bold'},
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: theme.primaryColor,
  },
  addIconContainer: {
    position: 'absolute',
    backgroundColor: theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    right: 25,
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: '#cfcfcf',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  addTodoContainer: {
    position: 'absolute',
    top: 200,
    backgroundColor: 'white',
    width: 300,
    height: 400,
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
  },
  searchTextInput: {
    flex: 1,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 30,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchBarContainer: {flexDirection: 'row', alignItems: 'center'},
});
