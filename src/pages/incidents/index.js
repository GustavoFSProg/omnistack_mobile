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
  const [total, setTotal] = useState(2)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  function navigateToDetails(incident) {
    navigation.navigate('Detail', { incident })
  }

  async function loadIncidents() {
    if (loading) {
      return
    }
    if (counter < 0 && incidents.length === counter) {
      return
    }

    setLoading(true)

    const { data } = await api.get('/incidents')

    setIncidents([...incidents, ...data])
    setTotal(counter)
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  let counter = 0
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de Casos{incidents.forEach((incident) => (counter += 1))}
          <Text style={styles.headerTextBold}>
            {' '}
            <Text>
              {counter}

              <Text>casos</Text>
            </Text>
          </Text>
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
        onEndReachedThreshold={0.2}
        onEndReached={loadIncidents}
        renderItem={({ item: incident }) => (
          <View style={styles.incidentsList}>
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG</Text>
              <Text style={styles.incidentValue}>{incident.ong_name}</Text>

              <Text style={styles.incidentProperty}>Caso:</Text>
              <Text style={styles.incidentValue}> {incident.title}</Text>

              <Text style={styles.incidentProperty}>Valor:</Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(incident.value)}
              </Text>

              <TouchableOpacity
                style={styles.Button}
                onPress={() => navigateToDetails(incident)}
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
