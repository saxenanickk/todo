import React from 'react';
import {Text, StyleSheet, Platform, TextInput} from 'react-native';
import {theme} from '../utils/theme';

export const TodoText = props => {
  const {children, style} = props;

  return (
    <Text
      numberOfLines={1}
      ellipsizeMode={'tail'}
      style={[styles.styleText, style]}
      {...props}>
      {children}
    </Text>
  );
};

export const TodoTextInput = props => {
  const {style} = props;

  return (
    <TextInput
      style={[styles.styleText, style]}
      underlineColorAndroid={'transparent'}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  styleText: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
    color: theme.textColor,
  },
});
