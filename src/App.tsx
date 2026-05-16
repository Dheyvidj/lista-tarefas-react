import { useEffect, useState } from "react";
import ItemTarefa from "./components/ItemTarefa";
import FormularioTarefa from "./components/FormularioTarefa";
import type { Tarefa, TarefaApi } from "./types";
import "./App.css"
import axios from "axios";

function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const pendentes = tarefas.filter(t=> !t.concluida).length;
  const conluidas = tarefas.filter(t => t.concluida ).length;
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const resposta = await axios.get(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
  
        const tarefasMapeadas: Tarefa[] = resposta.data.map((t: TarefaApi) => ({
          id: t.id,
          titulo: t.title,
          concluida: t.completed,
        }));
  
        setTarefas(tarefasMapeadas);
      } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
      } finally {
        setCarregando(false);
      }
    }
  
    carregarTarefas();
  }, []);


  async function adicionarTarefa(titulo: string) {
    try { 

      setCarregando(true);

      if(tarefas.find(t => t.titulo === titulo)){
        alert("Já existe uma tarefa com esse título")
        return;
      }


      const resposta = await axios.post("https://jsonplaceholder.typicode.com/todos", 
        {
          title: titulo,
          completed: false,
          userId: 1
        } 
      )


      const nova:Tarefa = {
        id: resposta.data.id,
        titulo: resposta.data.title,
        concluida: resposta.data.completed
      };

      setTarefas([...tarefas, nova]);

      setCarregando(false)

    } catch(erro){
        console.log("Erro ao adicionar tarefa:" +  erro);
    }
  }

  function toggleTarefa(id: number) {

    setTarefas(tarefas.map(t => 
      t.id == id ? {...t, concluida: !t.concluida} : t
    ))
  }

  async function removerTarefa(id: number) {
    try{ 
      setCarregando(true)

      await axios.delete("https://jsonplaceholder.typicode.com/todos/" + id)

       setTarefas(tarefas.filter(t => t.id != id))

       setCarregando(false)
    }catch(erro){
      console.error("Erro ao remover tarefa:", erro);
    }
   
  }

  function limparTarefasConcluidas() {
    setTarefas(tarefas.filter(t => !t.concluida))
  }

  function aoEditar(id: number, novoTitulo: string){
    setTarefas(tarefas.map(t => 
      t.id === id ? {...t, titulo: novoTitulo } : t
    ))
  }

  return (
    <>
     <h1>Lista de Tarefas</h1>

    <p>Você tem {pendentes} pendentes</p>
    <FormularioTarefa aoAdicionar={adicionarTarefa} />

    {carregando ? <p>Carregando tarefas...</p> : tarefas.length === 0 ? (
      <p>Nenhuma tarefa ainda. Adicione a primeira!</p>
    ) : 
    (
      tarefas.map((tarefa) => (
        <ItemTarefa 
          key={tarefa.id}
          aoRemover={removerTarefa}
          aoToggle={toggleTarefa}
          tarefa={tarefa}
          aoEditar={aoEditar}/>
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
