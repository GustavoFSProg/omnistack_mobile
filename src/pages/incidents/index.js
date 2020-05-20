import React, { useState, useEffect } from 'react'
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native'
import logoImg from '../../assets/logo.png'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'

export default function Incidents() {
  const navigation = useNavigation()
  const [incidents, setIncidents] = useState([])

  function navigateToDetails() {
    navigation.navigate('Detail')
  }

  async function loadIncidents() {
    const { data } = await api.get('/incidents')
    setIncidents(data)
    console.log(data)
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de Casos<Text style={styles.headerTextBold}>0 casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia
      </Text>
      <FlatList
        data={incidents}
        showsVerticalScrollIndicator={false}
        keyExtractor={(incidents) => String(incidents.id)}
        style={styles.incidentsList}
        renderItem={({ item: incidents }) => (
          <View style={styles.incidentsList}>
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG</Text>
              <Text style={styles.incidentValue}>{incidents.ong_name}</Text>

              <Text style={styles.incidentProperty}>Caso:</Text>
              <Text style={styles.incidentValue}> {incidents.title}</Text>

              <Text style={styles.incidentProperty}>Valor:</Text>
              <Text style={styles.incidentValue}> {incidents.value}</Text>

              <TouchableOpacity
                style={styles.Button}
                onPress={navigateToDetails}
              >
                <Text style={styles.detailsButtonText}>
                  {' '}
                  Ver mais Detalhes!
                </Text>
                <Feather name="arrow-right" size={16} color="#E02041"></Feather>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
}
