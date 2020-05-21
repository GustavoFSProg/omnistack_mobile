import React from 'react'
import styles from '../detail/styles'
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native'
import logoImg from '../../assets/logo.png'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'
import app from '../../../App'

export default function Detail() {
  const navigation = useNavigation()
  const route = useRoute()

  const incident = route.params.incident

  function navigateToIncidents() {
    // navigation.navigate('Incidents')
    navigation.goBack()
  }

  const mensagem = `Ola  ${incident.ong_name}, estou entrando em contato
   pois gostaria de ajudar no caso ${incident.title} com o valor de  R$ ${incident.value} `

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Heroi do caso ${incident.title}`,
      recipients: [incident.email],
      body: mensagem,
    })
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.wathsapp}?text=${mensagem}`
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
      </View>

      <TouchableOpacity style={styles.Button} onPress={navigateToIncidents}>
        <Feather name="arrow-left" size={28} color="#E02041"></Feather>
      </TouchableOpacity>

      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia
      </Text>

      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(incidents) => String(incidents)}
        style={styles.incidentsList}
        renderItem={() => (
          <View style={styles.incidentsList}>
            <View style={styles.incident}>
              <Text style={(styles.incidentProperty, { marginTop: 0 })}>
                ONG
              </Text>
              <Text style={styles.incidentValue}>
                {' '}
                {incident.ong_name} de {incident.ong_city}/{incident.ong_uf}
              </Text>

              <Text style={styles.incidentProperty}>Caso:</Text>
              <Text style={styles.incidentValue}> {incident.title}</Text>

              <Text style={styles.incidentProperty}>Valor</Text>
              <Text style={styles.incidentValue}>{'R$ ' + incident.value}</Text>
            </View>

            <View style={styles.contactBox}>
              <Text style={styles.heroTitle}>Seja um Heroi para um Pet!</Text>
              <Text style={styles.heroTitle}>Salve um Pet!</Text>
              <Text style={styles.heroDescription}>Entre em contato!</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                  <Text style={styles.actionText}> Whatsapp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action} onPress={sendMail}>
                  <Text style={styles.actionText}> E-mail</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}
