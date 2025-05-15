import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, StatusBar, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons/faCalculator';
import { useState } from 'react';

// Componente Header com texto verde
function Header({ title }) {
  return (
    <View style={estilos.header}>
      <Text style={estilos.tituloHeader}>{title}</Text>
    </View>
  );
}

// Componente de input de número com validação para aceitar apenas números, vírgula e ponto
function NumberInput({ label, placeholder, value, onChangeText, onEndEditing }) {
  // Função para filtrar a entrada e aceitar apenas números, vírgula e ponto
  const handleChange = (text) => {
    // Substitui tudo que não for dígito, vírgula ou ponto
    let filtered = text.replace(/[^0-9.,]/g, '');

    // Impede múltiplas vírgulas ou pontos consecutivos
    const partsComma = filtered.split(',');
    if (partsComma.length > 2) filtered = partsComma[0] + ',' + partsComma.slice(1).join('');

    const partsDot = filtered.split('.');
    if (partsDot.length > 2) filtered = partsDot[0] + '.' + partsDot.slice(1).join('');

    // Atualiza o valor filtrado
    onChangeText(filtered);
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ color: '#FFF', marginBottom: 4 }}>{label}</Text>
      <TextInput
        style={estilos.input}
        placeholder={placeholder}
        placeholderTextColor="#AAAAAA"
        value={value}
        onChangeText={handleChange}
        onEndEditing={onEndEditing}
        keyboardType="numeric"
      />
    </View>
  );
}

export default function App() {
  const [massa, definirMassa] = useState('0,00');
  const [estatura, definirEstatura] = useState('0,00');
  const [indice, definirIndice] = useState('-,--');
  const [classificacao, definirClassificacao] = useState('N/A');
  const [resultadoVisivel, setResultadoVisivel] = useState(false);

  const executarCalculo = () => {
    let m = parseFloat(massa.replaceAll('.', '').replaceAll(',', '.'));
    let e = parseFloat(estatura.replaceAll('.', '').replaceAll(',', '.'));

    if (m === 0 || e === 0) {
      setResultadoVisivel(false);
      return;
    }

    const r = m / Math.pow(e, 2);

    if (isNaN(r)) {
      definirIndice('-,--');
      definirClassificacao('N/A');
      setResultadoVisivel(false);
      return;
    }

    definirIndice(r.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

    if (r < 18.5) definirClassificacao('Abaixo do peso (menor que 18,50)');
    else if (r < 25) definirClassificacao('Peso normal (18,50 a 24,99)');
    else if (r < 30) definirClassificacao('Sobrepeso (25,00 a 29,99)');
    else if (r < 35) definirClassificacao('Obesidade grau I (30,00 a 34,99)');
    else if (r < 40) definirClassificacao('Obesidade grau II (35,00 a 39,99)');
    else definirClassificacao('Obesidade grau III (maior que 40,00)');

    setResultadoVisivel(true);
  };

  return (
    <SafeAreaView style={estilos.tela}>
      <Header title="IMC Dark Calculator" />
      <ScrollView style={estilos.scroll}>
        <View style={estilos.caixaFormulario}>
          <FontAwesomeIcon style={estilos.icone} icon={faCalculator} size={60} />
          <NumberInput
            label="Massa (Kg)*"
            placeholder="Digite seu peso"
            value={massa}
            onChangeText={definirMassa}
            onEndEditing={executarCalculo}
          />
          <NumberInput
            label="Estatura (m)*"
            placeholder="Digite sua altura"
            value={estatura}
            onChangeText={definirEstatura}
            onEndEditing={executarCalculo}
          />
          <Button color="#39FF14" title="CALCULAR" onPress={executarCalculo} />
        </View>

        {resultadoVisivel && (
          <View style={estilos.caixaResultado}>
            <Text style={estilos.tituloResultado}>Resultado</Text>
            <Text style={estilos.textoResultado}>IMC: <Text style={estilos.valor}>{indice}</Text></Text>
            <Text style={estilos.textoResultado}>Classificação: <Text style={estilos.valor}>{classificacao}</Text></Text>

            <Text style={estilos.tituloResultado}>Tabela IMC</Text>

            <View style={estilos.tabela}>
              {[
                ['Abaixo de 18,5', 'Abaixo do peso'],
                ['18,5 a 24,9', 'Peso normal'],
                ['25 a 29,9', 'Sobrepeso'],
                ['30 a 34,9', 'Obesidade grau I'],
                ['35 a 39,9', 'Obesidade grau II'],
                ['40 ou mais', 'Obesidade grau III']
              ].map(([faixa, descricao], i) => (
                <View key={i} style={estilos.linha}>
                  <View style={estilos.celula}><Text style={estilos.valorTabela}>{faixa}</Text></View>
                  <View style={estilos.celula}><Text style={estilos.textoTabela}>{descricao}</Text></View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#393E46',
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 16,
  },
  scroll: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  tituloHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39FF14',
  },
  caixaFormulario: {
    marginVertical: 24,
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
  },
  icone: {
    alignSelf: 'center',
    color: '#39FF14',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2E2E2E',
    borderRadius: 6,
    padding: 8,
    color: '#FFF',
  },
  caixaResultado: {
    backgroundColor: '#222831',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  tituloResultado: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F2F2F2',
    marginBottom: 12,
    textAlign: 'center',
  },
  textoResultado: {
    color: '#DDDDDD',
    marginBottom: 6,
    fontSize: 16,
  },
  valor: {
    fontWeight: 'bold',
    color: '#39FF14',
  },
  tabela: {
    marginTop: 12,
  },
  linha: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  celula: {
    flex: 1,
    padding: 4,
  },
  valorTabela: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  textoTabela: {
    color: '#FFFFFF',
  },
});
