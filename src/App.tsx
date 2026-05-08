import { useState } from "react";
import ItemTarefa from "./components/ItemTarefa";
import FormularioTarefa from "./components/FormularioTarefa";
import type { Tarefa } from "./types";
import "./App.css"

function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const pendentes = tarefas.filter(t=> !t.concluida).length;
  const conluidas = tarefas.filter(t => t.concluida ).length;

  function adicionarTarefa(titulo: string) {

    const nova:Tarefa = {
      id: Date.now(),
      titulo: titulo,
      concluida: false
    };

    if(tarefas.find(t => t.titulo === titulo)){
      alert("Já existe uma tarefa com esse título")
      return;
    }

    setTarefas([...tarefas, nova]);
  }

  function toggleTarefa(id: number) {

    setTarefas(tarefas.map(t => 
      t.id == id ? {...t, concluida: !t.concluida} : t
    ))
  }

  function removerTarefa(id: number) {

    setTarefas(tarefas.filter(t => t.id != id))
  }

  function limparTarefasConcluidas() {
    setTarefas(tarefas.filter(t => !t.concluida))
  }



  return (
    <>
     <h1>Lista de Tarefas</h1>

    <p>Você tem {pendentes} pendentes</p>
    <FormularioTarefa aoAdicionar={adicionarTarefa} />

    {tarefas.length === 0 ? (
      <p>Nenhuma tarefa ainda. Adicione a primeira!</p>
    ) : 
    (
      tarefas.map((tarefa) => (
        <ItemTarefa 
          key={tarefa.id}
          aoRemover={removerTarefa}
          aoToggle={toggleTarefa}
          tarefa={tarefa}/>
      ))
    ) }
    

    { conluidas > 0  && 
       <button
          type="button"
          onClick={limparTarefasConcluidas}
        >Limpar tarefas concluídas</button>
    }
 
    </>
  );
}
 
export default App;