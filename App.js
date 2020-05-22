import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Products from './src/pages/products'

export default function App() {
  return (
    <View style={styles.container}>
      <Products />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
