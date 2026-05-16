import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { Container, Nav, Navbar } from "react-bootstrap";
import { type Tarefa, type TarefaApi } from "./types";
import Inicio from "./pages/Inicio";
import Sobre from "./pages/Sobre";
import "./App.css";
 
function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
 
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
      const resposta = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        { title: titulo, completed: false, userId: 1 }
      );
      const nova: Tarefa = {
        id: resposta.data.id,
        titulo: resposta.data.title,
        concluida: resposta.data.completed,
      };
      setTarefas([...tarefas, nova]);
    } catch (erro) {
      console.error("Erro ao adicionar tarefa:", erro);
    }
  }
 
  function toggleTarefa(id: number) {
    setTarefas(
      tarefas.map((t) =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  }
 
  async function removerTarefa(id: number) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTarefas(tarefas.filter((t) => t.id !== id));
    } catch (erro) {
      console.error("Erro ao remover tarefa:", erro);
    }
  }
 
  function editarTarefa(id: number, novoTitulo: string) {
    setTarefas(
      tarefas.map((t) => (t.id === id ? { ...t, titulo: novoTitulo } : t))
    );
  }
 
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Tarefas
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/">
              Início
            </Nav.Link>
            <Nav.Link as={Link} to="/sobre">
              Sobre
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
 
      <Container className="mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <Inicio
                tarefas={tarefas}
                carregando={carregando}
                aoAdicionar={adicionarTarefa}
                aoToggle={toggleTarefa}
                aoRemover={removerTarefa}
                aoEditar={editarTarefa}
              />
            }
          />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </Container>
    </>
  );
}
 
export default App;