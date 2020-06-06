/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Todo App</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
