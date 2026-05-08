import { useState } from 'react';
import type { Tarefa } from '../types';

interface ItemTarefaProps {
  tarefa: Tarefa;
  aoToggle: (id: number) => void;
  aoRemover: (id: number) => void;
}

function ItemTarefa({tarefa, aoToggle, aoRemover }: ItemTarefaProps) {

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
      
      <button onClick={() => aoRemover(tarefa.id)}>
        Remover
      </button>

    </div>
  );
}

export default ItemTarefa;