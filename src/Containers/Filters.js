import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {TodoText} from '../Components/TodoText';

const {width, height} = Dimensions.get('window');

const renderFilterButton = (onPress, title) => {
  return (
    <TouchableOpacity style={styles.filterButton} onPress={onPress}>
      <TodoText>{title}</TodoText>
    </TouchableOpacity>
  );
};

const Filters = ({selectFilter}) => (
  <View style={styles.container}>
    {renderFilterButton(() => selectFilter(0), 'Completed')}
    {renderFilterButton(() => selectFilter(1), 'Active')}
    {renderFilterButton(() => selectFilter(null), 'Reset')}
  </View>
);

export default Filters;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 40,
    top: height / 10,
    borderRadius: 5,
    elevation: 5,
    width: width / 3,
    height: height / 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    padding: 10,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
