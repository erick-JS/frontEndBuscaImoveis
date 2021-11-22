import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { withTheme, Caption, TextInput, FAB, HelperText, Snackbar } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import ComboBox from 'react-native-combobox';
import Header from '../components/Header'
import { BACKEND } from '../constants'


function AlteraUsuario({ navigation, theme, route }) {
    //Obtendo os dados passados via parâmetro
    const usuarioAlterado = route.params.usuario
    //Atribuindo os valores nos campos a partir do valor passado
    const [id, setId] = useState(usuarioAlterado._id)
    const [nome, setNome] = useState(usuarioAlterado.nome)
    const [telefone, setTelefone] = useState(usuarioAlterado.telefone)
    const [cpf, setCpf] = useState(usuarioAlterado.cpf)
    const [dataNascimento, setDataNascimento] = useState(usuarioAlterado.dataNascimento)
    const [logradouro, setLogradouro] = useState(usuarioAlterado.logradouro)
    const [bairro, setBairro] = useState(usuarioAlterado.bairro)
    const [numero, setNumero] = useState(usuarioAlterado.numero)
    const [cidade, setCidade] = useState(usuarioAlterado.cidade)
    const [uf, setUf] = useState(usuarioAlterado.uf)
    const [cep, setCep] = useState(usuarioAlterado.cep)
    const [complemento, setComplemento] = useState(usuarioAlterado.complemento)
    const [email, setEmail] = useState(usuarioAlterado.email)
    const [senha, setSenha] = useState(usuarioAlterado.senha)
    const [erros, setErros] = useState({})
    const [aviso, setAviso] = useState('')
    const [salvandoUsuario, setSalvandoUsuario] = useState(false)

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

    const validaErrosUsuario = () => {
        const novosErros = {}
        //Validação do nome
        if (!nome || nome === '') novosErros.nome = 'O nome não pode ser vazio!'
        else if (nome.length > 50) novosErros.nome = 'O nome informado é muito longo!'
        else if (nome.length < 3) novosErros.nome = 'O nome informado é muito curto!'

        //Validação do telefone
        if (!telefone || telefone === '') novosErros.telefone = 'O telefone não pode ser vazio!'
        else if (telefone.length != 15) novosErros.telefone = 'O telefone informado deve ter 15 caracteres!'

        //Validação do CPF
        if (!cpf || cpf === '') novosErros.cpf = 'O CPF não pode ser vazio!'
        else if (cpf.length != 14) novosErros.cpf = 'O CPF informado deve ter 14 caracteres!'

        //Validação da Data de Nascimento
        if (!dataNascimento || dataNascimento === '') novosErros.dataNascimento = 'A data de nascimento não pode ser vazio!'

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

        //Validação do E-mail
        if (!email || email === '') novosErros.email = 'O e-mail não pode ser vazio!'

        //Validação da Senha
        if (!senha || senha === '') novosErros.senha = 'A senha não pode ser vazia!'
        else if (senha.length < 5) novosErros.senha = "A senha deve ter, no mínimo, 5 caracteres!"

        return novosErros
    }

    async function salvaUsuarioAlterado() {
        const novosErros = validaErrosUsuario()
        //Existe algum erro no objet?
        if (Object.keys(novosErros).length > 0) {
            //Sim, temos erros
            setErros(novosErros)
        } else {
            //Iremos salvar os dados..
            setErros({})
            //let statusCategoria = (status === true || status === 'ativo') ? 'ativo' : 'inativo'
            let usuario = {
                _id: id,
                nome: nome,
                telefone: telefone,
                cpf: cpf,
                dataNascimento: "2000-07-27",
                logradouro: logradouro,
                bairro: bairro,
                numero: numero,
                cep: cep,
                complemento: complemento,
                cidade: cidade,
                uf: ufs[uf],
                email: email,
                senha: senha,
            }

            setSalvandoUsuario(true)
            let url = "http://192.168.1.22:4000/usuario"
            await fetch(url, {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            }).then(response => response.json())
                .then(data => {
                    (data.message || data._id) ? setAviso('Usuário alterado com sucesso!') : setAviso('')
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
                    setAviso('Não foi possível salvar o usuário alterado ' + error.message)
                })
        }
        setSalvandoUsuario(false)
    }

    return (
        <View style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 0 }}>
            <Header titulo="Cadastro de Usuários"
                voltar={true} navigation={navigation} />
            <View style={{
                flex: 1, backgroundColor: colors.surface, paddingHorizontal: 16,
                paddingVertical: 4
            }}>
                <Caption style={styles.titulo}>Alteração de Usuários</Caption>
                <ScrollView>
                    <Text style={styles.label}>
                        Nome
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="nome"
                        value={nome}
                        onChangeText={setNome}
                        error={!!erros.nome}
                    />
                    <HelperText type="error" visible={!!erros.nome}>
                        {erros.nome}
                    </HelperText>
                    <Text style={styles.label}>
                        Celular
                    </Text>
                    <TextInputMask
                        style={styles.input}
                        type={'cel-phone'}
                        options={
                            {
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }
                        }
                        value={telefone}
                        onChangeText={setTelefone}
                    />
                    <HelperText type="error" visible={!!erros.telefone}>
                        {erros.telefone}
                    </HelperText>
                    <Text style={styles.label}>
                        CPF
                    </Text>
                    <TextInputMask
                        style={styles.input}
                        type={'cpf'}
                        value={cpf}
                        onChangeText={setCpf}
                    />
                    <HelperText type="error" visible={!!erros.cpf}>
                        {erros.cpf}
                    </HelperText>
                    <Text style={styles.label}>
                        Data de Nascimento
                    </Text>
                    <TextInputMask
                        style={styles.input}
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={dataNascimento}
                        onChangeText={setDataNascimento}
                    />
                    <HelperText type="error" visible={!!erros.dataNascimento}>
                        {erros.dataNascimento}
                    </HelperText>
                    <Text style={styles.label}>
                        UF
                    </Text>
                    <ComboBox
                        style={styles.input}
                        values={ufs}
                        onValueSelect={setUf}
                    />
                    <Text>UF {ufs[uf]}</Text>
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
                        E-mail
                    </Text>
                    <TextInput
                        style={styles.input}
                        name="email"
                        value={email}
                        onChangeText={setEmail}
                        error={!!erros.email}
                    />
                    <HelperText type="error" visible={!!erros.email}>
                        {erros.email}
                    </HelperText>
                    <Text style={styles.label}>
                        Senha
                    </Text>
                    <TextInput
                        style={styles.input}
                        // Making the Under line Transparent.
                        underlineColorAndroid="transparent"
                        // Making the Text Input Text Hidden.
                        secureTextEntry={true}
                        name="senha"
                        value={senha}
                        onChangeText={setSenha}
                        error={!!erros.senha}
                    />
                    <HelperText type="error" visible={!!erros.senha}>
                        {erros.senha}
                    </HelperText>
                </ScrollView>
            </View>
            <FAB style={styles.fab}
                icon='content-save'
                loading={salvandoUsuario}
                disabled={erros.length > 0}
                onPress={() => salvaUsuario()}
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
        backgroundColor: "#a0d4ee"
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

export default withTheme(AlteraUsuario)