import {NativeModules} from 'react-native';

const {LocalStorage} = NativeModules;

export const TODOS = '@todos';

export const getTodos = callback =>
  LocalStorage.getItem(TODOS, data => {
    if (data) {
      const fetchedData = JSON.parse(data);
      callback(fetchedData);
    }
  });

export const saveTodos = todos =>
  LocalStorage.setItem(TODOS, JSON.stringify(todos));

export default LocalStorage;
