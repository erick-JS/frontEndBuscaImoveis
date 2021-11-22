import React from 'react'
import { View, FlatList } from 'react-native'
import { withTheme, List } from 'react-native-paper'
import Header from '../components/Header'

function AlteraAnuncio({navigation, theme}){


    return (
        <>
        <Header titulo='Busca Imóveis' subtitulo='Encontre a casa dos sonhos!' />
        <View style={{backgroundColor: colors.surface, paddingHorizontal: 8, paddingVertical: 16, flex: 1}}>
            <List.Subheader>Selecione uma das opções:</List.Subheader>
            <FlatList
              data={opcoesMenu}
              renderItem={({item}) => (
                  <List.Item
                     title={item.nome}
                     style={{background: colors.background}}
                     titleStyle={{fontSize: 20}}
                     description={item.descricao}
                     descriptionStyle={{marginBottom: 4}}
                     onPress={()=> navigation.navigate(item.menu)}
                     left={props => <List.Icon {...props} icon={item.icone} />}
                     />
              )}
              keyExtractor={item => item.id.toString()}
              />
        </View>
        </>
    )
}

export default withTheme(AlteraAnuncio)