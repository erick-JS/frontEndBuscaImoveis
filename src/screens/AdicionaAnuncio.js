import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { withTheme, Caption, TextInput, FAB, HelperText, Snackbar } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import ComboBox from 'react-native-combobox';
import Header from '../components/Header'
import { BACKEND } from '../constants'


function AdicionaAnuncio({ navigation, theme }) {
    const [descricao, setDescricao] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [cep, setCep] = useState('')
    const [complemento, setComplemento] = useState('')
    const [preco, setPreco] = useState('')
    const [tipoAnuncio, setTipoAnuncio] = useState('')
    const [garagem, setGaragem] = useState('')
    const [sala, setSala] = useState('')
    const [cozinha, setCozinha] = useState('')
    const [quarto, setQuarto] = useState('')
    const [banheiro, setBanheiro] = useState('')
    const [quintal, setQuintal] = useState('')
    const [lavanderia, setLavanderia] = useState('')
    const [crianca, setCrianca] = useState('')
    const [pet, setPet] = useState('')
    const [churrasqueira, setChurrasqueira] = useState('')
    const [piscina, setPiscina] = useState('')
    const [salaoJogos, setSalaoJogos] = useState('')
    const [erros, setErros] = useState({})
    const [aviso, setAviso] = useState('')
    const [salvandoAnuncio, setSalvandoAnuncio] = useState(false)

    const { colors } = theme

    const ufs = [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO',
        'DF'
    ]

    const tipos = ["Locação", "Venda"]

    const validaErrosAnuncio = () => {
        const novosErros = {}
        //Validação do nome
        if (!descricao || descricao === '') novosErros.descricao = 'A descrição não pode ser vazia!'

        //Validação do Logradouro
        if (!logradouro || logradouro === '') novosErros.logradouro = 'O logradouro não pode ser vazio!'

        //Validação do Bairro
        if (!bairro || bairro === '') novosErros.bairro = 'O bairro não pode ser vazio!'

        //Validação do Numero
        if (!numero || numero === '') novosErros.numero = 'O numero não pode ser vazio!'

        //Validação da Cidade
        if (!cidade || cidade === '') novosErros.cidade = 'A cidade não pode ser vazio!'

        //Validação da UF
        if (!uf || uf === '') novosErros.uf = 'A UF não pode ser vazia!'

        //Validação do Tipo de Anúncio
        if (!tipoAnuncio || tipoAnuncio === '') novosErros.tipoAnuncio = "O tipo de anúncio não pode ser vazio!"


        return novosErros
    }

    async function salvaAnuncio() {
        const novosErros = validaErrosAnuncio()
        //Existe algum erro no objet?
        if (Object.keys(novosErros).length > 0) {
            //Sim, temos erros
            setErros(novosErros)
        } else {
            //Iremos salvar os dados..
            setErros({})
            let statusCrianca = (crianca === true || crianca === 'sim') ? 'sim' : 'não'
            let statusChurrasqueira = (churrasqueira === true || churrasqueira === 'sim') ? 'sim' : 'não'
            let statusPet = (pet === true || pet === 'sim') ? 'sim' : 'não'
            let statusPiscina = (piscina === true || piscina === 'sim') ? 'sim' : 'não'
            let statusSalaoJogos = (salaoJogos === true || salaoJogos === 'sim') ? 'sim' : 'não'

            let anuncio = {
                descricao: descricao,
                logradouro: logradouro,
                bairro: bairro,
                numero: numero,
                cep: cep,
                complemento: complemento,
                cidade: cidade,
                uf: ufs[uf],
                preco: preco,
                tipoAnuncio: tipoAnuncio,
                garagem: garagem,
                sala: sala,
                cozinha: cozinha,
                quarto: quarto,
                banheiro: banheiro,
                quintal: quintal,
                lavanderia: lavanderia,
                crianca: statusCrianca,
                churrasqueira: statusChurrasqueira,
                pet: statusPet,
                piscina: statusPiscina,
                salaoJogos: statusSalaoJogos
            }

            setSalvandoAnuncio(true)

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'React POST Request Example' })
            };

            fetch("http://192.168.1.22:4000/anuncio", requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }

                    this.setState({ postId: data.id })
                })
                .catch(error => {
                    //this.setState({ errorMessage: error.toString() });
                    console.error('There was an error!', error);
                });
            /*let url = `${BACKEND}/usuario`
            await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            }).then(response => response.json())
                .then(data => {
                    (data.message || data._id) ? setAviso('Usuário incluído com sucesso!') : setAviso('')
                    setNome('')
                    setTelefone('')
                    setCpf('')
                    setDataNascimento('')
                    setLogradouro('')
                    setBairro('')
                    setNumero('')
                    setCep('')
                    setComplemento('')
                    setCidade('')
                    setUf('')
                    setEmail('')
                    setSenha('')
                })
                .catch(function (error) {
                    setAviso('Não foi possível salvar o usuário ' + error.message)
                })*/
        }
        setSalvandoAnuncio(false)
    }

    return (
        <View style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 0 }}>
            <Header titulo="Cadastro de Anúncios"
                voltar={true} navigation={navigation} />
            <View style={{
                flex: 1, backgroundColor: colors.surface, paddingHorizontal: 16,
                paddingVertical: 4
            }}>
                <Caption style={styles.titulo}>Cadastro de Anúncios</Caption>
                <ScrollView>
                    <Text style={styles.label}>
                        Descrição
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="descricao"
                        value={descricao}
                        onChangeText={setDescricao}
                        error={!!erros.descricao}
                    />
                    <HelperText type="error" visible={!!erros.descricao}>
                        {erros.descricao}
                    </HelperText>
                    <Text style={styles.label}>
                        UF
                    </Text>
                    <ComboBox
                        style={styles.input}
                        values={ufs}
                        onValueSelect={setUf}
                    />
                    <HelperText type="error" visible={!!erros.uf}>
                        {erros.uf}
                    </HelperText>
                    <Text style={styles.label}>
                        Logradouro
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="logradouro"
                        value={logradouro}
                        onChangeText={setLogradouro}
                        error={!!erros.logradouro}
                    />
                    <HelperText type="error" visible={!!erros.logradouro}>
                        {erros.logradouro}
                    </HelperText>
                    <Text style={styles.label}>
                        Bairro
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="bairro"
                        value={bairro}
                        onChangeText={setBairro}
                        error={!!erros.bairro}
                    />
                    <HelperText type="error" visible={!!erros.bairro}>
                        {erros.bairro}
                    </HelperText>
                    <Text style={styles.label}>
                        Número
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="número"
                        value={numero}
                        onChangeText={setNumero}
                        error={!!erros.numero}
                    />
                    <HelperText type="error" visible={!!erros.numero}>
                        {erros.numero}
                    </HelperText>
                    <Text style={styles.label}>
                        CEP
                    </Text>
                    <TextInputMask
                        style={styles.input}
                        type={'zip-code'}
                        value={cep}
                        onChangeText={setCep}
                    />
                    <HelperText type="error" visible={!!erros.cep}>
                        {erros.cep}
                    </HelperText>
                    <Text style={styles.label}>
                        Complemento
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="complemento"
                        value={complemento}
                        onChangeText={setComplemento}
                        error={!!erros.complemento}
                    />
                    <HelperText type="error" visible={!!erros.complemento}>
                        {erros.cidade}
                    </HelperText>
                    <Text style={styles.label}>
                        Cidade
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="cidade"
                        value={cidade}
                        onChangeText={setCidade}
                        error={!!erros.cidade}
                    />
                    <HelperText type="error" visible={!!erros.cidade}>
                        {erros.cidade}
                    </HelperText>
                    <Text style={styles.label}>
                        Preço
                    </Text>
                    <TextInputMask
                        style={styles.input}
                        type={'money'}
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'R$',
                            suffixUnit: ''
                        }}
                        value={preco}
                        onChangeText={setPreco}
                    />
                    <HelperText type="error" visible={!!erros.preco}>
                        {erros.preco}
                    </HelperText>
                    <Text style={styles.label}>
                        Tipo de Anúncio
                    </Text>
                    <ComboBox
                        style={styles.input}
                        values={tipos}
                        onValueSelect={setTipoAnuncio}
                    />
                    <HelperText type="error" visible={!!erros.anuncio}>
                        {erros.anuncio}
                    </HelperText>
                    <Text style={styles.label}>
                        Garagem
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="garagem"
                        value={cidade}
                        onChangeText={setGaragem}
                        error={!!erros.garagem}
                    />
                    <HelperText type="error" visible={!!erros.garagem}>
                        {erros.garagem}
                    </HelperText>
                    <Text style={styles.label}>
                        Sala
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="sala"
                        value={sala}
                        onChangeText={setSala}
                        error={!!erros.sala}
                    />
                    <HelperText type="error" visible={!!erros.sala}>
                        {erros.sala}
                    </HelperText>
                    <Text style={styles.label}>
                        Cozinha
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="cozinha"
                        value={cidade}
                        onChangeText={setCozinha}
                        error={!!erros.cozinha}
                    />
                    <HelperText type="error" visible={!!erros.cozinha}>
                        {erros.cozinha}
                    </HelperText>
                    <Text style={styles.label}>
                        Quarto
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="quarto"
                        value={quarto}
                        onChangeText={setQuarto}
                        error={!!erros.Quarto}
                    />
                    <HelperText type="error" visible={!!erros.quarto}>
                        {erros.quarto}
                    </HelperText>
                    <Text style={styles.label}>
                        Banheiro
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="quarto"
                        value={quarto}
                        onChangeText={setQuarto}
                        error={!!erros.Quarto}
                    />
                    <HelperText type="error" visible={!!erros.banheiro}>
                        {erros.banheiro}
                    </HelperText>
                    <Text style={styles.label}>
                        Quintal
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="quintal"
                        value={quintal}
                        onChangeText={setQuintal}
                        error={!!erros.quintal}
                    />
                    <HelperText type="error" visible={!!erros.quintal}>
                        {erros.quintal}
                    </HelperText>
                    <Text style={styles.label}>
                        Lavanderia
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="lavanderia"
                        value={lavanderia}
                        onChangeText={setLavanderia}
                        error={!!erros.lavanderia}
                    />
                    <HelperText type="error" visible={!!erros.lavanderia}>
                        {erros.lavanderia}
                    </HelperText>
                    <Text style={styles.label}>
                        Aceita Crianças?
                    </Text>
                    <List.Item
                        title={tema === Dark ? 'Tema Escuro' : 'Tema Claro'}
                        onPress={() => setTema(tema === Dark ? Light : Dark)}
                        left={() => <List.Icon icon={tema === Dark ? 'brightness-3' : 'brightness-5'} />}
                        right={() => <Switch value={tema === Dark ? true : false}
                            onValueChange={() => setTema(tema === Dark ? Light : Dark)} />}
                    />
                </ScrollView>
            </View>
            <FAB style={styles.fab}
                icon='content-save'
                loading={salvandoAnuncio}
                disabled={erros.length > 0}
                onPress={() => salvaAnuncio()}
            />
            <Snackbar
                visible={aviso.length > 0}
                onDismiss={() => setAviso('')}
                action={{
                    label: 'Voltar',
                    onPress: () => navigation.goBack()
                }}>
                <Text>{aviso}</Text>
            </Snackbar>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        marginLeft: 1,
        fontWeight: 'bold',
        color: "#FFFFFF",
        fontSize: 20
    },
    input: {
        height: 50,
        backgroundColor: "#a0d4ee",
        color: "black"
    },
    checkbox: {
        flexDirection: 'row'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 4,
        bottom: 8
    },
    titulo: {
        fontSize: 20,
        marginBottom: 16,
        marginTop: 16
    }
})

export default withTheme(AdicionaAnuncio)