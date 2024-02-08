import axios from "axios";
import { prisma_db } from "../../database/prisma_db";
import moment from "moment";

interface dados {
    valor: string;
    titulo: string;
    nome: string | null;
    document: string | null;
    email: string | null;
    id_telegram: number;
    ddd: string | null;
    telefone: string | null;
    produto_id: number;
    user_id: string;
}

export default async function Criar_pedido (dados:dados) {
  
    const botVenda = process.env.API_BOT_BDMIL_VENDA ||''
    const botAlerta = process.env.API_BOT_BDMIL_ALERTA ||''
  
    const pedido = await prisma_db.pedidos.create({
        data: {
            valor: dados.valor,
            titulo: dados.titulo,
            status:'pago',
            nome: dados.nome,
            document: dados.document,
            email: dados.email,
            id_telegram: dados.id_telegram.toString(),
            ddd: dados.ddd,
            telefone: dados.telefone,
            produto_id: dados.produto_id,
            user_id: dados.user_id,
        }
    })   
    
    const user = await prisma_db.users.findUnique({
        where:{id: dados.user_id}
    })

    const produto = await prisma_db.produtos.findUnique({
        where:{id: dados.produto_id}
    })

if(pedido){

const valor = produto?.valor_produto || ''
const recomendado = user?.recomendado || 0
const desaconselhado = user?.desaconselhado || 0
const descricao:any = produto?.descricao

const alerta = await prisma_db.alertas.findMany()

const alertas = alerta.filter((item) => descricao.includes(item.palavra_chave));
const usuarios_id = alertas.map(item => {return item.id_telegram})

    const grupo = await prisma_db.grupos.findUnique({
      where:{type: produto?.categoria||''}
    }) 

    if(grupo){
        
        // Função para criar botões inline
function createInlineKeyboard(userTelegramId:any) {
  return {
    inline_keyboard: [
      [
        {
          text: 'Quero Vender',
          url: `https://t.me/BDMilCVbot`,
        },
        {
          text: 'Bot Alertas',
          url: `https://t.me/BDMilALERTAS_bot`,
        },
      ],
    ],
  };
}

function enviarMsg(id_produto:any) {
  return {
    inline_keyboard: [
        [
          { text: "ATUALIZAR", callback_data: `ATUALIZAR_${id_produto}` },
          { text: "EDITAR", callback_data: `EDITAR_${id_produto}` },
          { text: "DELETAR", callback_data: `DELETAR_${id_produto}` },
        ],
    ],
  };
}
      try {
             // Enviar msg para os grupos 
      const msg_grupo = await axios.post(`https://api.telegram.org/bot${botVenda}/sendMessage`, // Bot bdmil_venda
      {
        chat_id: grupo.id_grupo,
        text: `

Interessado em vender ${produto?.descricao}

Valor ${(parseInt(valor)/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}

Envie o código ${produto?.id} para @BDMilquerocomprar_bot para comprar dele.

${recomendado>0?`Recomendado por mais de ${recomendado} pessoas`:`Ainda não recomendado`}

${desaconselhado>0?`desaconselhado por ${desaconselhado} pessoas ${desaconselhado} pessoas`:`Não desaconselhado ainda por ostros usuários`}

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

Conta verificada ✅

Membro desde ${moment(user?.created_at).format('DD-MM-YYYY')}

`,
reply_markup: createInlineKeyboard(grupo.id_grupo),
      });    
      
      

      await prisma_db.pedidos.update({
        where:{id:pedido.id},
        data:{msg_id:msg_grupo.data.result.message_id}
      })
        
      } catch (error) {console.log('erro 01')}



      try {
         // Enviar msg para o vendedor 
    await axios.post(`https://api.telegram.org/bot${botVenda}/sendMessage`, // Bot bdmil_venda
    {
      chat_id: user?.id_telegram,
      text: `

Seu produto ${produto?.descricao} foi ativado com sucesso!

Valor ${(parseInt(valor)/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}

Código produto ${produto?.id}.

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

`,

reply_markup: enviarMsg(produto?.id),
    });
        
      } catch (error) {console.log('erro 02')}

for await (const i of usuarios_id){
  try {
    // Enviar msg para aleras cadastrados 
await axios.post(`https://api.telegram.org/bot${botAlerta}/sendMessage`, // bot CentrallTest4
{
 chat_id: i,
 text: `
🚨 Alerta

Interessado em vender ${produto?.descricao}

Valor ${(parseInt(valor)/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}

Envie o código ${produto?.id} para @BDMilquerocomprar_bot para comprar dele.

${recomendado>0?`Recomendado por mais de ${recomendado} pessoas`:`Ainda não recomendado`}

${desaconselhado>0?`desaconselhado por ${desaconselhado} pessoas ${desaconselhado} pessoas`:`Não desaconselhado ainda por ostros usuários`}

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

Conta verificada ✅

Membro desde ${moment(user?.created_at).format('DD-MM-YYYY')}

`,
});
   
 } catch (error) {console.log('erro 03')}

} 
    }else{
      // enviar informação de falha 
    }

  return 'ok'
  
} 

}

