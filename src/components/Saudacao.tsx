interface SaudacaoProps {
    nome: string;
}

function Saudacao({ nome }: SaudacaoProps) {

    console.log(nome);

    return(<h1>Olá {nome}</h1>)
}

export default Saudacao;