import React from 'react'
import PropTypes from 'prop-types'

const Clima = ({resultado}) => {

    const {name, main} = resultado
    // Corrigir o bug do nome aparecendo e atrapalhando o resultado da API
    if(!name) return null; // Se não tiver valor no name, então retornar nulo 

    // Graus Kelvin para converter o grau celsus
    const kelvin = 273.15;

    return ( 
        <div className='card-panel white col s12'>
            <div className='black-text'>
                <h2>O clima de {name} é:</h2>
                <p className='temperatura'>
                    {parseFloat( main.temp - kelvin, 10).toFixed(2)} <span>&#x2103;</span>
                </p>
                <p> Temperatura Máxima:
                    {parseFloat( main.temp_max - kelvin, 10).toFixed(2)} <span>&#x2103;</span>
                </p>
                <p> Temperatura Minima:
                    {parseFloat( main.temp_min - kelvin, 10).toFixed(2)} <span>&#x2103;</span>
                </p>
            </div>
        </div>
     );
}
 
Clima.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Clima;
