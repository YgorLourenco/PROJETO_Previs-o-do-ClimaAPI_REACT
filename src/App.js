import { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Header from './components/Header'
import Clima from './components/Clima'
import Error from './components/Error'

function App() {

  // UseState da busca da cidade e país
  const [busca, guardarBusca] = useState({
    cidade: '',
    pais: '',
  })

  const [consultar, guardarConsultar] = useState(false)

  const {cidade, pais} = busca

  const [resultado, guardarResultado] = useState({})

  const [error,guardarError] = useState(false)

  // useEffect e ativado em tempo real pra procurar a cidade e o pais na API
  useEffect(() => {
    const consultarAPI = async () => {

      if(consultar){
        const appId = '31aec1148346aaefb4ec16f8a9d61ea0'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade},${pais}&appid=${appId}`      
        const resposta = await fetch(url) // esperar retorno da URL
        const resultado = await resposta.json() // esperar a resposta vir de um retorno em JSON

        guardarResultado(resultado)
        guardarConsultar(false)
      }

      // Detecta os resultados corretos na consulta
      if(resultado.cod === '404') {
        guardarError(true)
      } else {
        guardarError(false)
      }
      
    }
    consultarAPI()
     // eslint-disable-next-line
  }, [consultar])

  let componente
  if(error){
    componente = <Error mensagem='Não há resultados!' />
  } else {
    componente = <Clima 
          resultado={resultado}
    />
  }


  return (
    <Fragment>
      <Header 
        titulo="Clima React App"
      />

      <div className='contenedor-form'>
        <div className='container'>
          <div className='row'>
              <div className='col m6 s12'>
                <Formulario 
                  busca={busca}
                  guardarBusca={guardarBusca}
                  guardarConsultar={guardarConsultar}
                />
              </div>
              <div className='col m6 s12'>
                  {componente}
              </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
