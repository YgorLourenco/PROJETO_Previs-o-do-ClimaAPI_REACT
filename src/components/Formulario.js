import React, {useState} from 'react'
import Error from '../components/Error'
import PropTypes from 'prop-types'

// htmlFor - retorna o valro de um atributo
const Formulario = ({busca, guardarBusca , guardarConsultar}) => {

    

    const [error, guardarError] = useState(false)

    // Extrair cidade e pais
    const {cidade, pais} = busca

    // Função que coloca os elementos no state 
    const handleChange = e =>{
        // atualizar o state
        guardarBusca({
            ...busca,
        [e.target.name] : e.target.value
        })
    }

    // Quando o usuário der submit no fomrulário
    const handleSubmit = e => {
        e.preventDefault();

        // validar
        if (cidade.trim() === '' || pais.trim() === ''){
            guardarError(true)
            return
        }
        guardarError(false)
        guardarConsultar(true)
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >   
            {error
            ? <Error mensagem='Ambos campos são obrigatórios'/>
            : null}

            <div className='input-field col s12'>
                <input 
                    type='text'
                    name='cidade'
                    id='cidade'
                    value={cidade}
                    onChange={handleChange}
                />
                <label htmlFor='cidade'>Cidade: </label> 
            </div>
            <div className='input-field col s12'>
                <select
                    name='pais'
                    id='pais'
                    value={pais}
                    onChange={handleChange}
                >
                    <option value=''>-- Selecione o País --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="BR">Brasil</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor='pais'>País: </label> 
            </div>
            <div className='input-field col s12'>
                <input 
                    type='submit'
                    value='Buscar Clima'
                    className='waves-effect waves-light btn-large btn-block yellow accent-4'
                />
            </div>
        </form>
     );
}

Formulario.propTypes = {
    busca: PropTypes.object.isRequired,
    guardarBusca: PropTypes.func.isRequired,
    guardarError: PropTypes.func.isRequired
}

export default Formulario;