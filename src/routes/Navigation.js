import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppContext } from '../themes/ThemeProvider'

const Stack = createStackNavigator()

import Inicio from '../screens/Inicio'
import Configuracoes from '../screens/Configuracoes'
import ListaUsuario from '../screens/ListaUsuario'
import ListaUsuarios from '../screens/ListaUsuarios'
import AdicionaUsuario from '../screens/AdicionaUsuario'
import AlteraUsuario from '../screens/AlteraUsuario'
import ListaAnuncio from '../screens/ListaAnuncio'
import ListaAnuncios from '../screens/ListaAnuncios'
import AdicionaAnuncio from '../screens/AdicionaAnuncio'
import AlteraAnuncio from '../screens/AlteraAnuncio'

export default function Navigation() {
    const { tema } = useContext(AppContext)
    return (
        <NavigationContainer theme={tema}>
            <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Inicio" component={Inicio} />
                <Stack.Screen name="Configuracoes" component={Configuracoes} />
                <Stack.Screen name="ListaUsuario" component={ListaUsuario} />
                <Stack.Screen name="ListaUsuarios" component={ListaUsuarios} />
                <Stack.Screen name="AdicionaUsuario" component={AdicionaUsuario} />
                <Stack.Screen name="AlteraUsuario" component={AlteraUsuario} />
                <Stack.Screen name="ListaAnuncio" component={ListaAnuncio} />
                <Stack.Screen name="ListaAnuncios" component={ListaAnuncios} />
                <Stack.Screen name="AdicionaAnuncio" component={AdicionaAnuncio} />
                <Stack.Screen name="AlteraAnuncio" component={AlteraAnuncio} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}