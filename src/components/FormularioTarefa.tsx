import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface FormularioTarefaProps {
  aoAdicionar: (titulo: string) => void;
  isLoading: boolean;
}


function FormularioTarefa({ aoAdicionar, isLoading } : FormularioTarefaProps) {
    
    const [texto, setTexto] = useState<string>("");
    const navigate = useNavigate();
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        if (!texto.trim()) {
            alert("Título vazio")
            return
        };
    
        aoAdicionar(texto);
        setTexto("");

    }

    return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Nova tarefa..."
      />
      <Button variant="dark" type="submit" disabled={isLoading}>
        {isLoading && <Spinner animation="border" variant="light"  />}
        Adicionar
        </Button>
    </form>
  );
}

export default FormularioTarefa;