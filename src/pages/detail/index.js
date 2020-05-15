import React from 'react'
import styles from '../detail/styles'
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native'
import logoImg from '../../assets/logo.png'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

export default function Detail() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de Casos<Text style={styles.headerTextBold}>0 casos</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Feather name="arrow-left" size={28} color="#E02041"></Feather>
      </TouchableOpacity>
    </View>
  )
}
