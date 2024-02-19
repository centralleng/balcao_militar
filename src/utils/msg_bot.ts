import axios from "axios";
import moment from "moment";
import { bot_venda } from "../server"
const botVenda = process.env.API_BOT_BDMIL_VENDA || ''
const botAlerta = process.env.API_BOT_BDMIL_ALERTA || ''

/////////////////////////////////////////////// types ////////////////////////////////////////////////

interface dados_pagamento {
    descricao_produto: string;
    valor_produto: string;
    produto_id: number;
    recomendado: number;
    desaconselhado: number;
    data_criacao_user: Date;
}

/////////////////////////////////////////////// msg ///////////////////////////////////////////////////
class Mensagens {
    texto_inicial =
        `
    ⚠️ Atenção, esse local é feito para ofertar a VENDA de produtos.`

    atencao =
        `
    ❗️ O balcão é monitorado e os procedimentos são assistidos. Boas práticas em todo o processo é essencial. Não serão emitidos alertas ou advertências prévias antes de qualquer exclusão de usuário.
    `

    categoria =
        `
    ✔️ Opa! Qual Departamento se encaixa o produto?
    `

    //     formato_venda(){
    //    return`
    // Interessado em vender (fardamento)

    // Coturno extra leve, preto, 1 par, bom estado, número 42.

    // Valor R$ 100.50

    // Envie o código 1978654 para @BDMilquerocomprar para comprar dele.
    // Recomendado por mais de 70 pessoas/ Ainda não recomendado (dados do vendedor)

    // Não desaconselhado ainda por ostros usuários/desaconselhado por 2 pessoas (dados do vendedor)

    // Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

    // Conta verificada

    // Membro desde 15 mês ano
    // `}

    descricao = `
    Descreva de forma sucinta o produto que você quer ofertar, incluindo obrigatoriamente a quantidade (um ou 1 par) e a cor. NÃO coloque o valor nesse momento (máximo 150 caracteres). SÓ coloque ponto no fim.
    `

    valor =
        `
    Qual o valor pretendido? (escreva somente números. Caso haja centavos, coloque ponto pra separar o real dos centavos.)
    
    Ex: 00.00
    `
    //     valor(){
    //    return `
    // Qual o valor pretendido? (escreva somente números. Caso haja centavos coloque ponto)

    // 💵 Exemplos:

    // Para R$ 1 real -> 1.00
    // Para R$ 10 reais -> 10.00
    // Para R$ 1 mil reais -> 1000.00

    // 🪙 Exemplos com os centavos:

    // Para R$ 1 real e vinte centavos -> 1.20
    // Para R$ 10 reais e vinte centavos -> 10.20
    // Para R$ 1 mil reais e vinte centavos -> 1000.20
    // `}

    produto_criado = `
    ✔️Oferta de venda cadastrada!
    
    💡 Quando for decidir entre comprar ou vender o produto/serviço, avalie também as recomendações.
    🤝 Gostaria de lembrar a importância de honrar acordos com o vendedor ou comprador no Balcão, depois de selar o acordo até a entrega do produto.
    ❌ O mau comportamento pode acarretar a exclusão do Balcão.
    `

    msg_pagamento_grupo(dados: dados_pagamento) {

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

    necessario_username = `⚠️ É necessário cadastrar um UserName do Telegram, para dar continuidade no Balcão.`


    finalizar_pruduto = `⚠️ Finalize a criação do produto anterior.`


    motivo = `
        ⚠️ Descreva o motivo
        
        Obs: Coloque no máximo 150 caracteres
        `


    desaconselho_sucesso = `✅ Desaconselho feita com sucesso!`


    aguarde = 'Aguarde...'
}

export const mensagens = new Mensagens