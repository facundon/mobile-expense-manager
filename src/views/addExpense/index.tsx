import React, { useRef, useState } from 'react'
import { Button, InputAccessoryView, LayoutAnimation, Text, TextInput, View } from 'react-native'
import { Input } from '../../shared/ui/input'
import { styles } from './styles'
import { toTitleCase } from '../../shared/utils/string'
import Picker from 'react-native-picker-select'
import Toast from 'react-native-toast-message'

interface Expense {
   value: number
   description: string
   category: ExpenseCategory | ''
}
const orderedSteps: readonly (keyof Expense)[] = ['value', 'description', 'category']

const expenseCategories = ['comida', 'gustos', 'movilidad', 'otros', 'salud'] as const
type ExpenseCategory = typeof expenseCategories[number]

const defaultExpenseValue: Expense = { category: '', description: '', value: 0 }

export const AddExpenseView: React.FC = () => {
   const valueRef = useRef<TextInput>(null)
   const descRef = useRef<TextInput>(null)
   const catRef = useRef<Picker>(null)

   const [expense, setExpense] = useState<Expense>(defaultExpenseValue)
   const [editing, setEditing] = useState<keyof Expense>('value')

   function addToDone(what: keyof Expense) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      const stepIndex = orderedSteps.findIndex(step => step === what)!
      const nextStep = orderedSteps[stepIndex + 1]
      setEditing(nextStep)
   }

   function removeFromDone(what: keyof Expense) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      setEditing(what)
   }

   function handleSubmit() {
      Toast.show({ text1: 'Gasto agregado!', text2: `$${expense.value} en ${expense.description}` })
      setExpense(defaultExpenseValue)
      valueRef.current?.focus()
   }

   return (
      <View style={styles.container}>
         <View style={editing !== 'value' ? styles.done : null}>
            <Input
               keyboardType='number-pad'
               returnKeyType='done'
               style={editing !== 'value' && !!expense.value && { fontSize: styles.done.fontSize }}
               value={expense.value ? `$${String(expense.value)}` : ''}
               onChangeText={value => setExpense(p => ({ ...p, value: +value.replace('$', '') }))}
               onFocus={() => removeFromDone('value')}
               autoFocus
               maxLength={8}
               placeholder='Cuanto dolio?'
               onSubmitEditing={() => {
                  if (!expense.value) return
                  addToDone('value')
                  descRef.current?.focus()
               }}
               ref={valueRef}
            />
         </View>

         <View
            style={
               editing !== 'description'
                  ? editing === 'value' || !expense.description
                     ? styles.hidden
                     : { ...styles.done, top: styles.done.top + 50 }
                  : null
            }>
            <Input
               maxLength={15}
               style={editing !== 'description' && !!expense.description && { fontSize: styles.done.fontSize }}
               placeholder='Que rompimo?'
               returnKeyType='next'
               value={expense.description}
               onChangeText={value => setExpense(p => ({ ...p, description: value }))}
               ref={descRef}
               onFocus={() => removeFromDone('description')}
               inputAccessoryViewID='descInput'
               onSubmitEditing={() => {
                  if (!expense.description) return
                  addToDone('description')
                  catRef.current?.togglePicker()
               }}
            />
            <InputAccessoryView nativeID='descInput'>
               <Button title='Le pifie' onPress={() => valueRef.current?.focus()} />
            </InputAccessoryView>
         </View>

         <Picker
            style={{
               inputIOSContainer:
                  editing !== 'category'
                     ? expense.category
                        ? { ...styles.done, top: styles.done.top + 60 }
                        : styles.hidden
                     : undefined,
               inputIOS: { fontSize: 50, textAlign: 'center', color: 'white' },
            }}
            onValueChange={value => setExpense(p => ({ ...p, category: value }))}
            items={expenseCategories.map(cat => ({ label: toTitleCase(cat), value: cat }))}
            value={expense.category}
            ref={catRef}
            placeholder={{ label: 'Categoría?', value: null }}
            onUpArrow={() => descRef.current?.focus()}
            onDonePress={() => handleSubmit()}
            touchableDoneProps={{
               disabled: !expense.category,
            }}
            //@ts-expect-error lib no exposing text styles
            doneText={<Text style={!expense.category ? styles.disabled : null}>Agregar</Text>}
         />
      </View>
   )
}
