import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, StyleSheet, Button, TouchableOpacity, View, Modal,TextInput} from 'react-native';
 
// You can import supported modules from npm
import { Card } from 'react-native-paper';
 
// or any files within the Snack
import AssetExample from './components/AssetExample';
 
  function App () {
  const Separator = () => <View style={styles.separator} />;
 
  const [modalVisible3, setModalVisible3] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [status, setStatus] = useState(false);
  const [tempoInput, setTempoInput] = useState(''); 
  const [valor , setValor] = useState(0);
 
   const Modal3 = () =>{
    setModalVisible3(true);
  }
 
   useEffect (() => {
    let interval;
    if(status && tempo > 0 ){
      interval = setInterval(() => {
        setTempo((prevTempo) => prevTempo -1);
      }, 1000);
     
    }
 
    else{
      clearInterval(interval);
       
    }
    return () => clearInterval(interval);
  }, [status , tempo]);
 
  const ativarDesativar = () => {
    setStatus(!status);
  }
 
    const formatarTempo = () => {
    const minutos = Math.floor(tempo/60);
    const segundos = tempo % 60;
    const minutosA = minutos < 10 ? '0' + minutos : minutos;
    const segundosA = segundos < 10 ? '0' + segundos : segundos;
 
    return minutosA +":" + segundosA;
   
}
 
const uminuto = () => {
  setTempo(60);
  setStatus(true);
  setValor(3.00)
}
 
const doisminuto = () => {
  setTempo(120);
  setStatus(true);
  setValor(5.00)
}
 
const inserirTempo = () => {
 
 const minutoss = parseInt(tempoInput) * 60;  
 const valor = 5.00;
 const min = 1.50;
 
 
 
    if ( minutoss > 0) {
      setTempo(minutoss);
      setModalVisible3(false);
    }
    if(parseInt(tempoInput) <= 2 ){
      alert("acima de dois minutos")
      setTempo(0);
      setValor(0);
 
    }else if(parseInt(tempoInput) >30 ){
      alert("Tempo até 30 minutos")
      setTempo(0);
      setValor(0);
     
    }
    else if (parseInt(tempoInput) >=10 ){
      setTempo(minutoss);
      setModalVisible3(false);
      setStatus(true);
      setValor(((1.50 * (minutoss  / 60 ) - 3) + 5 )- ((1.50 * (minutoss  / 60 ) - 3) + 5 )*(5/100));
    }
   
    else{
      setTempo(minutoss);
      setModalVisible3(false);
      setStatus(true);
      setValor((1.50 * (minutoss  / 60 ) - 3) + 5 );
    }
    }
 
 
 
  return (
   <SafeAreaView style={styles.container}>
    <View style={styles.quadrado}>
    <Text style={styles.titulo}>TICKETS</Text>
      <View style={styles.div}>
              <Text style={styles.text}>1 Minuto</Text>{"\n"}<Text style={styles.senha}></Text>
          <Button title="R$ 3,00" color="#1C818C" onPress={uminuto}/>
      </View>
       
      <Separator />
 
      <View style={styles.div2}>
              <Text style={styles.text}>2 Minutos</Text>{"\n"}<Text style={styles.senha}></Text>
          <Button title="R$ 5,00" color="#1C818C" onPress={doisminuto}/>
      </View>
 
      <Separator />
     
      <View style={styles.div3}>
 
         <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={() => setModalVisible3(false)}
        >
 
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
            <Text  style={styles.text}>Quanto tempo?{"\n"}<Text style={styles.normal}>(minutos inteiros acima de 2 minutos e no máximo 30 minutos)</Text></Text>
            <Separator/>
            <Text style={styles.senha}></Text>
            <TextInput style={styles.input} value={tempoInput}
              onChangeText={setTempoInput} keyboardType= 'number'></TextInput>
           
        <Separator />
              <TouchableOpacity>
          <Button title="Inserir"  color="#1C818C" onPress={inserirTempo} />
              <Separator />
          <Button style={styles.btn} title="Fechar" color="#1C818C" onPress={() =>setModalVisible3(false)} />
         
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
         <Text style={styles.text}>Indeterminado</Text>{"\n"}<Text style={styles.senha}></Text>
          <Button title="Inserir Tempo" color="#1C818C" onPress={Modal3} />
          <View style ={styles.crono}>
          <Text style={styles.cronometro}>{formatarTempo(tempo)}</Text>
          </View>
          <Text style={styles.text}>R${valor.toFixed(2)}</Text>{"\n"}<Text style={styles.senha}></Text>
      </View>
    </View>
    </SafeAreaView>
  );
}
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#B8D3D9',
    padding: 8,
    alignItems: 'center',
  },
 
  quadrado:{
    height: 800,
    width: '80%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 8,
    alignItems: 'center',
    borderRadius: 15,
 
  },
 
    separator: {
    marginVertical: 8,
  },
 
div: {
  width: '80%',
},
 
div2: {
  width: '80%',
},
 
div3: {
  width: '80%',
},
 
 
 modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
 
  modal: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
 
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
 
  senha: {
    fontSize: 17,
  },
 
  titulo: {
    color: '#034159',
    fontSize: 60,
    textAlign: 'center',
    padding: 30,
    fontFamily:'Arial',
    fontWeight: 'bold'
  },
 
  cronometro: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "black"
  },
 
  input:{
    height: 25,
    borderWidth: 1.5,
    borderColor: "BLACK",
    borderRadius: 5,
  },
 
  crono: {
  alignItems: 'center'
  },
  normal: {
    fontWeight: 'normal',
    fontSize: 13
  }
});
export default App;