import { useState } from "react";

interface FormularioTarefaProps {
  aoAdicionar: (titulo: string) => void;
}


function FormularioTarefa({ aoAdicionar } : FormularioTarefaProps) {
    
    const [texto, setTexto] = useState<string>("");

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
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default FormularioTarefa;