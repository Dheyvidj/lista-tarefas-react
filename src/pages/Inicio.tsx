import { Spinner } from "react-bootstrap";
import FormularioTarefa from "../components/FormularioTarefa";
import ItemTarefa from "../components/ItemTarefa";
import type { Tarefa } from "../types";
 
interface InicioProps {
  tarefas: Tarefa[];
  carregando: boolean;
  aoAdicionar: (titulo: string) => void;
  aoToggle: (id: number) => void;
  aoRemover: (id: number) => void;
  aoEditar: (id: number, novoTitulo: string) => void;
}
 
function Inicio({
  tarefas,
  carregando,
  aoAdicionar,
  aoToggle,
  aoRemover,
  aoEditar,
}: InicioProps) {
  return (
    <div>
      <h1>Lista de Tarefas</h1>
 
      <FormularioTarefa isLoading={carregando} aoAdicionar={aoAdicionar} />
 
      {carregando ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spinner animation="border" variant="primary" />
          <p>Carregando tarefas...</p>
        </div>
      ) : tarefas.length === 0 ? (
        <p>Nenhuma tarefa ainda. Adicione a primeira!</p>
      ) : (
        tarefas.map((tarefa) => (
          <ItemTarefa
            key={tarefa.id}
            tarefa={tarefa}
            aoToggle={aoToggle}
            aoRemover={aoRemover}
            aoEditar={aoEditar}
          />
        ))
      )}
    </div>
  );
}
 
export default Inicio;