import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { Text, withTheme, List, Avatar, FAB, ActivityIndicator } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'
import ListaUsuario from './ListaUsuario'

function ListaUsuarios({ navigation, theme }) {
    const { colors } = theme
    const [usuarios, setUsuarios] = useState([])
    const [carregandoUsuarios, setCarregandoUsuarios] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        obterUsuarios()
    }, [])

    async function obterUsuarios() {
        setCarregandoUsuarios(true)
        let url = `${BACKEND}/usuario`
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setUsuarios(data)
                console.log(data)
            })
            .catch(function (error) {
                console.error('Erro ao obter os anunciantes! ' + error.message)
            })
        setCarregandoUsuarios(false)
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        try {
            await obterUsuarios()
        } catch (error) {
            console.error(error)
        }
        setRefreshing(false)
    }, [refreshing])

    return (
        <>
            <Header titulo="Usuarios" voltar={true} navigation={navigation} />
            {carregandoUsuarios && <ActivityIndicator animating={true} size="large" color={colors.primary} />}
            <View>
                <List.Subheader>
                    <Avatar.Icon size={24} icon="refresh" /> Para atualizar os dados
                </List.Subheader>
                
                {usuarios.length === 0 && !carregandoUsuarios
                    ? (
                        <View>
                            <Text style={{ fontSize: 20 }}>Ainda não há nenhum usuário cadastrado</Text>
                        </View>
                    )
                    : (
                        <FlatList
                            data={usuarios}
                            renderItem={({ item }) => (
                                <ListaUsuario data={item} navigation={navigation} />
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
                    onPress={() => navigation.navigate('AdicionaUsuario')}
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

export default withTheme(ListaUsuarios)