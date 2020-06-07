import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

const DialogModal = ({onRequestClose, children}) => (
  <View style={styles.container}>
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onRequestClose}
      style={[styles.container, styles.dismissableBackground]}
    />
    {children}
  </View>
);

export default DialogModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  dismissableBackground: {
    backgroundColor: '#000000',
    opacity: 0.5,
  },
});
