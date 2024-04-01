import axios from "axios";
import { prisma_db } from "../../database/prisma_db";
import moment from "moment";
import { mensagens } from "../../utils/msg_bot";

interface dados {
  pagamento_id: string, 
  status: string, 
}

export default async function UpdatePagamentoService(dados: dados) {

console.log(dados)

const botVenda = process.env.API_BOT_BDMIL_VENDA ||''
const botAlerta = process.env.API_BOT_BDMIL_ALERTA ||''

const pedido = await prisma_db.pedidos.findUnique({
  where:{transacao_id: dados.pagamento_id},
  include:{
    produto:true,
    users:true,
  }
})

console.log("pedido",pedido)

const valor = pedido?.produto?.valor_produto || ''
const recomendado = pedido?.users.recomendado || 0
const desaconselhado = pedido?.users.desaconselhado || 0
const descricao:any = pedido?.produto?.descricao

const alerta = await prisma_db.alertas.findMany()

const alertas_db = alerta.filter((item) => (descricao.toUpperCase()).includes((item.palavra_chave).toUpperCase()));
const alertas = alertas_db.filter((item) => item.tipo_grupo=== pedido?.produto?.categoria);

const usuarios_id = alertas.map(item => {return item.id_telegram})

if(pedido){
  await prisma_db.pedidos.update({
    where:{id: pedido.id},
    data:{
       status: dados.status
    }
  })

  if(dados.status==='pago'){

    if(pedido.tipo==="credito"){
      await prisma_db.users.update({
        where:{id:pedido.user_id},  
        data:{
          creditos: (pedido.users.creditos||0)+parseInt(pedido.valor||'')
        }
      })

      function enviarMsg(id_produto:any) {
        return {
          inline_keyboard: [
            [
              { text: "NOVA VENDA", callback_data: "VENDER" },
            ],
          ],
        };
      }

      try {
        // Enviar msg para o vendedor 
        await axios.post(`https://api.telegram.org/bot${botVenda}/sendMessage`, // Bot bdmil_venda
        {
          chat_id: pedido.users.id_telegram,
          text: `✅ Seus créditos foram atualizados com sucesso`,
            reply_markup: enviarMsg(pedido?.produto?.id),
            });
                
        } catch (error) {console.log('erro credito')}

      console.log("crédito", (pedido.users.creditos||0)+parseInt(pedido.valor||''))

      return
    }

    const grupo = await prisma_db.grupos.findUnique({
      where:{type: pedido?.produto?.categoria||''}
    })      

    if(grupo){

function createInlineKeyboardAlert(userTelegramId: any) {
  return {
    inline_keyboard: [
      [
        {
          text: 'Listar e Deltar Alertas',
          callback_data: `ALERTAS`,
        },
      ],
    ],
  };
}

// Função para criar botões inline
function createInlineKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: 'Quero Vender',
          url: `https://t.me/BDMilCVbot?start=start`,
        },
        {
          text: 'Bot Alertas',
          url: `https://t.me/BDMilALERTAS_bot?start=start`,
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
        [
          { text: "NOVA VENDA", callback_data: "VENDER" },
        ],
    ],
  };
}

try {      
  // Enviar msg para os grupos
  const msg_grupo = await axios.post(`https://api.telegram.org/bot${botVenda}/sendPhoto`, {
    parse_mode: 'HTML',
    chat_id: grupo.id_grupo,
    photo: pedido.produto?.id_imagem,
      caption: mensagens.msg_pagamento_grupo({ 
      descricao_produto: pedido.produto?.descricao || '', 
      valor_produto: valor || '', 
      produto_id: pedido?.produto?.id||0, 
      recomendado: recomendado || 0, 
      desaconselhado: desaconselhado || 0, 
      data_criacao_user: pedido.users.created_at,
      entrega: pedido.produto?.entrega||"",
      localizacao: pedido.produto?.localizacao||'',
     }),
    reply_markup: createInlineKeyboard(),
  });

  await prisma_db.pedidos.update({
    where:{id:pedido.id},
    data:{msg_id:msg_grupo.data.result.message_id}
  })         

} catch (error) {
  console.log('Erro 01');
}

try {
// Enviar msg para o vendedor 
await axios.post(`https://api.telegram.org/bot${botVenda}/sendMessage`, // Bot bdmil_venda
{
  chat_id: pedido.users.id_telegram,
  text: mensagens.msg_pagamento_vendedor({ 
    descricao_produto: pedido?.produto?.descricao || '', 
    valor_produto: valor || '', 
    produto_id: pedido?.produto?.id ||0,}),
    reply_markup: enviarMsg(pedido?.produto?.id),
    });
        
} catch (error) {console.log('erro 02')}

for await (const i of usuarios_id){

  try {
    // Enviar msg para aleras cadastrados 
await axios.post(`https://api.telegram.org/bot${botAlerta}/sendPhoto`, // bot CentrallTest4
{
 parse_mode: 'HTML',
 chat_id: i,
 photo: pedido.produto?.id_imagem,
 caption: mensagens.msg_pagamento_grupo({ 
 descricao_produto: pedido?.produto?.descricao || '', 
 valor_produto: valor || '', 
 produto_id: pedido?.produto?.id ||0, 
 recomendado: recomendado || 0, 
 desaconselhado: desaconselhado || 0, 
 data_criacao_user: pedido.users.created_at,
 entrega: pedido.produto?.entrega||"",
 localizacao: pedido.produto?.localizacao||'',
 }), 
 reply_markup: createInlineKeyboardAlert(grupo.id_grupo),
});
   
 } catch (error) {console.log('erro 03')}

} 
    }else{
      // enviar informação de falha 
    }
 
  }else {

    // enviar msg para usuário e apagar msg dele no grupo

  }

  return 'ok'
  
} 
return 'error'
}
