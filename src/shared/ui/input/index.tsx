import React, { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { styles } from './styles'
interface InputProps extends TextInputProps {}

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
   const { style, ...rest } = props

   return <TextInput style={[styles.input, style]} blurOnSubmit={false} textAlign='center' ref={ref} {...rest} />
})
