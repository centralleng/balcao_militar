import axios from "axios";
import { prisma_db } from "../../database/prisma_db";
import moment from "moment";
import { mensagens } from "../../utils/msg_bot";

export default async function Alerta_pedido (produto_id:number,user_id:string) {
  
    const botAlerta = process.env.API_BOT_BDMIL_ALERTA ||'' 

    const produto = await prisma_db.produtos.findUnique({
        where:{id: produto_id}
    })

    const user = await prisma_db.users.findUnique({
      where:{id: user_id}
  })

   // Função para criar botões inline
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

if(produto){

const valor = produto?.valor_produto || ''
const descricao:any = produto?.descricao
const recomendado = user?.recomendado || 0
const desaconselhado = user?.desaconselhado || 0

const alerta = await prisma_db.alertas.findMany()

const alertas_db = alerta.filter((item) => (descricao.toUpperCase()).includes((item.palavra_chave).toUpperCase()));
const alertas = alertas_db.filter((item) => item.tipo_grupo===produto?.categoria);

const usuarios_id = alertas.map(item => {return item.id_telegram})

    const grupo = await prisma_db.grupos.findUnique({
      where:{type: produto?.categoria||''}
    }) 

    if(grupo){   

for await (const i of usuarios_id){
  try {
    // Enviar msg para aleras cadastrados 
await axios.post(`https://api.telegram.org/bot${botAlerta}/sendMessage`, // bot CentrallTest4
{
  parse_mode: 'HTML',
  chat_id: i, 
  text: mensagens.msg_pagamento_grupo({
  descricao_produto: produto?.descricao || '',
  valor_produto: valor || '', 
  produto_id: produto?.id||0, 
  recomendado: user?.recomendado || 0, 
  desaconselhado: user?.desaconselhado || 0, 
  data_criacao_user: user?.created_at,
  entrega: produto?.entrega||"",
  localizacao: produto?.localizacao||'',
   }),
   
   reply_markup: createInlineKeyboardAlert(grupo.id_grupo),
});
   
 } catch (error) {console.log('erro 01')}

} 
    }else{
      // enviar informação de falha 
    }

  return 'ok'
  
} 

}

