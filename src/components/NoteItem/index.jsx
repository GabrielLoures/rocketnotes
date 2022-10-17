import { FiPlus, FiX } from 'react-icons/fi';

import { Container } from './styles';

export function NoteItem ({ isNew, value, onClick, ...rest }) {

  return(

    <Container isNew={isNew}>

      <input 
        type="text" 
        value={value} 
        readOnly={!isNew} // para um item que já foi adicionado, vai funcionar somente leitura para itens que já existem (!isNew = não é novo)
        {...rest} 
      />

      <button
        type="button"
        onClick={onClick}
        className={isNew ? "button-add" : "button-delete"}
      >

        { isNew ? <FiPlus /> : <FiX />} 

      </button>

    </Container>

  )

}