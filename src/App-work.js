import React from 'react'
import { View, Image, Text } from 'react-native'
import logoImg from '../mobile/src/assets/logo.png'
import styles from './src/pages/incidents'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de PORRAS<Text style={styles.headerTextBold}>0 casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia
      </Text>
    </View>
  )
}
