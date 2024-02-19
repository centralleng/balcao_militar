import axios from "axios";
import moment from "moment";

const botVenda = process.env.API_BOT_BDMIL_VENDA || ''
const botAlerta = process.env.API_BOT_BDMIL_ALERTA || ''

/////////////////////////////////////////////// types ////////////////////////////////////////////////

interface dados_pagamento {
    id_grupo:string;
    descricao_produto:string;
    valor_produto:string;
    produto_id:string;
    recomendado:number;
    desaconselhado:number;
    data_criacao_user:string;
}

/////////////////////////////////////////////// msg ///////////////////////////////////////////////////



export function msg_pagamento_grupo(dados:dados_pagamento) {

         return `
Interessado em vender ${dados.descricao_produto}

Valor ${(parseInt(dados.valor_produto) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

Envie o código <a href="https://t.me/BDMilquerocomprar_bot?start=${dados.produto_id}">${dados.produto_id}</a> para @BDMilquerocomprar_bot para comprar dele.

${dados.recomendado > 0 ? `Recomendado por mais de ${dados.recomendado} pessoas` : `Ainda não recomendado`}

${dados.desaconselhado > 0 ? `desaconselhado por ${dados.desaconselhado} pessoas ${dados.desaconselhado} pessoas` : `Não desaconselhado ainda por ostros usuários`}

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

Conta verificada ✅

Membro desde ${moment(dados.data_criacao_user).format('DD-MM-YYYY')}      
`
  
}
