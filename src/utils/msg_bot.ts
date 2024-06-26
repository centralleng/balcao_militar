import axios from "axios";
import moment from "moment";
import { bot_venda } from "../server"
const botVenda = process.env.API_BOT_BDMIL_VENDA || ''
const botAlerta = process.env.API_BOT_BDMIL_ALERTA || ''

/////////////////////////////////////////////// types ////////////////////////////////////////////////

interface dados_pagamento_grupo {
    descricao_produto: string;
    valor_produto: string;
    produto_id: number;
    recomendado: number;
    desaconselhado: number;
    data_criacao_user: any;
    localizacao: string;
    entrega: string;
}
interface dados_pagamento_vendedor {
    descricao_produto: string;
    valor_produto: string;
    produto_id: number;
}
interface dados_interece_compra_vendedor {
    username: string;
    senha: string;
    produto_id: number;
    recomendado: number;
    desaconselhado: number;
    created_at:any;
}
interface dados_interece_compra_comprador {
    senha: string;
    produto_id: number;
}

/////////////////////////////////////////////// msg ///////////////////////////////////////////////////
class Mensagens {
    
    texto_inicial =
    `
⚠️ Atenção, esse local é feito para ofertar a VENDA de produtos.
    `

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
    // Recomendado por mais de 70 pessoa(s)/ Ainda não recomendado (dados do vendedor)

    // Não desaconselhado ainda por outros usuários/desaconselhado por 2 pessoa(s) (dados do vendedor)

    // Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

    // Conta verificada

    // Membro desde 15 mês ano
    // `}

    descricao = 
    `
Descreva de forma sucinta o produto que você quer ofertar. NÃO coloque o valor nesse momento (máximo 200 caracteres). SÓ coloque ponto no fim.
    `
    minutosCadastro = 
    `
🚨 Você só poderá concluir uma venda por vez. Após 5 minutos de inatividade TODO o processo será anulado, tendo que ser reiniciado.
    `

    valor =
    `
Qual o valor unitário pretendido? (escreva somente números. Coloque .00 mesmo não havendo centavos)".

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

    produto_criado = 
    `
✔️Oferta de venda cadastrada!

💡 Quando for decidir entre comprar ou vender o produto/serviço, avalie também as recomendações.
🤝 Gostaria de lembrar a importância de honrar acordos com o vendedor ou comprador no Balcão, depois de selar o acordo até a entrega do produto.
❌ O mau comportamento pode acarretar a exclusão do Balcão.
    `

    msg_pagamento_grupo(dados: dados_pagamento_grupo) {

        return `
Interessado em vender ${dados.descricao_produto}

Valor ${(parseInt(dados.valor_produto) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

Localização: ${dados.localizacao}

Entrega o produto fora da sede: ${dados.entrega}

CLIQUE no código <a href="https://t.me/BDMilquerocomprar_bot?start=${dados.produto_id}">${dados.produto_id}</a> para ser encaminhado ao @BDMilquerocomprar_bot para comprar dele.

${dados.recomendado > 0 ? `Recomendado por mais de ${dados.recomendado} pessoa(s)` : `Ainda não recomendado`}

${dados.desaconselhado >  0 ? `desaconselhado por ${dados.desaconselhado} pessoa(s)` : `Não desaconselhado ainda por outros usuários`}

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

Conta verificada ✅

Membro desde ${moment(dados.data_criacao_user).format('DD-MM-YYYY')}     
    `
    }

    msg_pagamento_vendedor(dados: dados_pagamento_vendedor) {

        return `
Seu produto ${dados.descricao_produto} foi ativado com sucesso!

Valor ${(parseInt(dados.valor_produto) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

Código produto ${dados.produto_id}.

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.        
    `
        }
    
    msg_pagamento_alerta(dados: dados_pagamento_grupo) {

        return `
🚨 Alerta
    
Interessado em vender ${dados.descricao_produto}

Valor ${(parseInt(dados.valor_produto) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

CLIQUEno código_ <a href="https://t.me/BDMilquerocomprar_bot?start=${dados.produto_id}">${dados.produto_id}</a> para ser encaminhado ao @BDMilquerocomprar_bot para comprar dele.

${dados.recomendado > 0 ? `Recomendado por mais de ${dados.recomendado} pessoa(s)` : `Ainda não recomendado`}

${dados.desaconselhado > 0 ? `desaconselhado por ${dados.desaconselhado} pessoa(s)` : `Não desaconselhado ainda por outros usuários`}

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

Conta verificada ✅

Membro desde ${moment(dados.data_criacao_user).format('DD-MM-YYYY')}     
    `
    }

    msg_interesse_compra_vendedor(dados: dados_interece_compra_vendedor) {

    return `  
---- ✅✅✅ ----

💡 Informo que @${dados.username} quer comprar o seu produto referente a oferta ${dados.produto_id}, Caso queira vender para ele(a), CLIQUE em @${dados.username} e informe a senha ${dados.senha} para que ele(a) saiba que você é realmente o(a) postador(a) da oferta. Verifique se é a mesma senha.

▪️ Dicas do Balcão dos militares:

Recomendo que sempre seja confirmado o valor do produto, bem como a forma de entrega, prazos, formas de pagamento e outras coisas que se fizerem necessárias antes de fechar a transação, a fim de evitar transtornos desnecessários e exclusão do Balcão.

❌ O mau comportamento pode acarretar na exclusão do balcão.
❗️ verifique dados adicionais durante a negociação, para ter a certeza de estar mitigando riscos.
❗️ Não esqueça de recomendar ou desaconselhar o comprador após a venda.
❗️ Não esqueça de deletar o produto após a venda.

⬆️ recomendado por ${dados.recomendado} pessoa(s).

⬇️ Não recomendado por ${dados.desaconselhado} pessoa(s).

✅ conta verificada

✔️ Membro desde ${moment(dados.created_at).format('DD-MM-YYYY')}
`
    }

    msg_interesse_compra_comprador(dados: dados_interece_compra_comprador) {

        return `  
✅ Sua intenção de compra foi enviada para o usuário, interessado em vender o produto.

✔️  O vendedor entrará em contato caso se interesse em negociar o produto, enviando uma mensagem para a sua conta informando a senha ${dados.senha} . Essa é uma forma de certificar que ele é realmente a pessoa que postou a oferta ${dados.produto_id}. Sugiro uma análise de risco no tocante ao vendedor verificando os dados adicionais durante a negociação, para ter a certeza do processo.

▪️   Dica do Balcão dos militares:

Recomendo que sempre seja confirmado o valor do produto, bem como a forma de entrega, prazos, formas de pagamento e outras coisas que se fizerem necessárias antes de fechar a transação, a fim de evitar transtornos desnecessários e exclusão do Balcão.

🤝  Gostaríamos de lembrar da importância de honrar acordos com vendedor ou comprador no Balcão, depois de selar um acordo, a negociação não deve ser alterada. Honre sua palavra e cumpra seus acordos.

❌  O mau comportamento pode acarretar na exclusão do balcão.
        `
    }

    necessario_username = `⚠️ É necessário cadastrar um UserName do Telegram, para dar continuidade no Balcão.`

    finalizar_pruduto = `⚠️ Finalize a criação do produto anterior.`

    motivo = `
⚠️ Descreva o motivo

Obs: Coloque no máximo 150 caracteres
    `

    desaconselho_sucesso = `✅ Desaconselho feito com sucesso!`

    aguarde = 'Aguarde...'

    suporte_cadastro = 'BAACAgEAAxkBAAN1ZfILIx8NoAw_wCPmzK-uDnfKkVYAArUCAALXdJBHvg5dOXwtpyw0BA'

    suporte_venda = 'CgACAgEAAxkBAAOBZfIOiXkycZrrUoq1Vb2kKt50Bc4AAuAEAALqOZFH1-4m3aqjl980BA'

    suporte_compra = 'BAACAgEAAxkBAAN-ZfINrqx1B_10gTCzWBI-qNJXtZEAArYCAALXdJBHNpY_MS9apvY0BA'

    suporte_alerta = 'CgACAgEAAxkBAAOHZfITFAOsjO46kS4EE0ozQRE9Y54AArcCAALXdJBHVW2yJFYK7bQ0BA'

    timeGrup =`❌ Seu processo de venda foi expirado!`
        
}

export const mensagens = new Mensagens