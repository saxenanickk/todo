/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Home from './src/Containers/Home';

const App = () => (
  <>
    <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  </>
);

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
