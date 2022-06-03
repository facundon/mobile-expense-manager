import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      padding: 30,
   },
   value: {
      flex: 1,
   },
   done: {
      position: 'absolute',
      top: 30,
      alignSelf: 'center',
      width: '100%',
      fontSize: 30,
   },
   hidden: {
      display: 'none',
   },
   disabled: {
      color: 'grey',
   },
})
