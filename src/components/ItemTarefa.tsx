import { useState } from 'react';
import type { Tarefa } from '../types';

interface ItemTarefaProps {
  tarefa: Tarefa;
  aoToggle: (id: number) => void;
  aoRemover: (id: number) => void;
  aoEditar: (id: number, novoTitulo: string) => void;
}

function ItemTarefa({tarefa, aoToggle, aoRemover, aoEditar }: ItemTarefaProps) {

  const [editando, setEditando] = useState(false);
  const [textoEditado, setTextoEditado] = useState(tarefa.titulo);
    
  function salvarEdicao() {
    
    if(!textoEditado.trim()) {
      return
    }

    aoEditar(tarefa.id, textoEditado);
    setEditando(false);

  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    salvarEdicao()

  }
  
  function cancelarEdicao() {
    setTextoEditado(tarefa.titulo)
    setEditando(false)
  }

  if (editando) {
    return (
      <form onSubmit={handleSubmit} className="item-tarefa">
        <input
          type="text"
          value={textoEditado}
          onChange={(e) => setTextoEditado(e.target.value)}
        />
        <button type='submit'>Salvar</button>
        <button type='button' onClick={cancelarEdicao}>Cancelar</button>
      </form>
    );
  }


  return (
    <div className="item-tarefa">
      <input
        type="checkbox"
        checked={tarefa.concluida}
        onChange={() => aoToggle(tarefa.id)}
      />
      
      <span 
        style={{ 
          textDecoration: tarefa.concluida ? "line-through" : "none" 
        }}
      >
        {tarefa.titulo}
      </span>
      
      <button onClick={() => setEditando(true)}>Editar</button>
      
      <button onClick={() => aoRemover(tarefa.id)}>
        Remover
      </button>

    </div>
  );
}

export default ItemTarefa;