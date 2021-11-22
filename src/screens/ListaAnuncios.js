import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { Text, withTheme, List, Avatar, FAB, ActivityIndicator } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'
import ListaAnuncio from './ListaAnuncio'

function ListaAnuncios({ navigation, theme }) {
    const { colors } = theme
    const [anuncios, setAnuncios] = useState([])
    const [carregandoAnuncios, setCarregandoAnuncios] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        obterAnuncios()
    }, [])

    async function obterAnuncios() {
        setCarregandoAnuncios(true)
        let url = `${BACKEND}/anuncio`
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setAnuncios(data)
                console.log(data)
            })
            .catch(function (error) {
                console.error('Erro ao obter os anúncios! ' + error.message)
            })
        setCarregandoAnuncios(false)
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        try {
            await obterAnuncios()
        } catch (error) {
            console.error(error)
        }
        setRefreshing(false)
    }, [refreshing])

    return (
        <>
            <Header titulo="Anúncios" voltar={true} navigation={navigation} />
            {carregandoAnuncios && <ActivityIndicator animating={true} size="large" color={colors.primary} />}
            <View>
                <List.Subheader>
                    <Avatar.Icon size={24} icon="refresh" /> Para atualizar os dados
                </List.Subheader>
                
                {anuncios.length === 0 && !carregandoAnuncios
                    ? (
                        <View>
                            <Text style={{ fontSize: 20 }}>Ainda não há nenhum anúncio cadastrado</Text>
                        </View>
                    )
                    : (
                        <FlatList
                            data={anuncios}
                            renderItem={({ item }) => (
                                <ListaAnuncio data={item} navigation={navigation} />
                            )}
                            keyExtractor={item => item._id.toString()}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                            />}
                        />
                    )}
                <FAB
                    style={styles.fab}
                    icon='plus'
                    label=''
                    onPress={() => navigation.navigate('AdicionaAnuncio')}
                />

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    fab:{
        position: 'absolute',
        margin: 16,
        right: 4,
        bottom: 8
    }
})

export default withTheme(ListaAnuncios)