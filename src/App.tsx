/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { AddExpenseView } from './views/addExpense'
import Toast from 'react-native-toast-message'

const style = StyleSheet.create({ root: { flex: 1, backgroundColor: 'black' } })

const App = () => {
   return (
      <SafeAreaView style={style.root}>
         <StatusBar barStyle='dark-content' />
         <AddExpenseView />
         <Toast />
      </SafeAreaView>
   )
}

export default App
