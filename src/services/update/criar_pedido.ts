import axios from "axios";
import { prisma_db } from "../../database/prisma_db";
import moment from "moment";
import { mensagens } from "../../utils/msg_bot";

interface dados {
  pedido_id: number;
  produto_id: number;
  user_id: string;
}

export default async function Update_pedido(dados: dados) {

  const botVenda = process.env.API_BOT_BDMIL_VENDA || ''
  const botAlerta = process.env.API_BOT_BDMIL_ALERTA || ''

  const pedido = await prisma_db.pedidos.update({
    where:{id: dados.pedido_id},
    data:{
      tipo: 'credito',
    }
  })

  const user = await prisma_db.users.findUnique({
    where: { id: dados.user_id }
  })

  const produto = await prisma_db.produtos.findUnique({
    where: { id: dados.produto_id }
  })

  if (pedido) {

    const valor = produto?.valor_produto || ''
    const recomendado = user?.recomendado || 0
    const desaconselhado = user?.desaconselhado || 0
    const descricao: any = produto?.descricao

    const alerta = await prisma_db.alertas.findMany()

    const alertas_db = alerta.filter((item) => descricao.includes(item.palavra_chave));
    const alertas = alertas_db.filter((item) => item.tipo_grupo === produto?.categoria);

    const usuarios_id = alertas.map(item => { return item.id_telegram })

    const grupo = await prisma_db.grupos.findUnique({
      where: { type: produto?.categoria || '' }
    })

    if (grupo) {

      // Função para criar botões inline
      function createInlineKeyboard(userTelegramId: any) {
        return {
          inline_keyboard: [
            [
              {
                text: 'Quero Vender',
                url: `https://t.me/BDMilCVbot?start`,
              },
              {
                text: 'Bot Alertas',
                url: `https://t.me/BDMilALERTAS_bot?start`,
              },
            ],
          ],
        };
      }

      function enviarMsg(id_produto: any) {
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
        const msg_grupo = await axios.post(`https://api.telegram.org/bot${botVenda}/sendMessage`, {
          parse_mode: 'HTML',  
          chat_id: grupo.id_grupo,
          text: mensagens.msg_pagamento_grupo({ 
            descricao_produto: produto?.descricao || '', 
            valor_produto: valor || '', 
            produto_id: produto?.id||0, 
            recomendado: user?.recomendado || 0, 
            desaconselhado: user?.desaconselhado || 0, 
            data_criacao_user: user?.created_at }),
          reply_markup: createInlineKeyboard(grupo.id_grupo),
        });

        await prisma_db.pedidos.update({
          where: { id: pedido.id },
          data: { msg_id: msg_grupo.data.result.message_id }
        })

      } catch (error) {
        console.log('Erro 01');
      }

      try {
        // Enviar msg para o vendedor 
        await axios.post(`https://api.telegram.org/bot${botVenda}/sendMessage`, // Bot bdmil_venda
          {
            chat_id: user?.id_telegram,
            text: mensagens.msg_pagamento_vendedor({ 
              descricao_produto: produto?.descricao || '', 
              valor_produto: valor || '', 
              produto_id: produto?.id||0,}),
              reply_markup: enviarMsg(produto?.id),
          });

      } catch (error) { console.log('erro 02') }

      for await (const i of usuarios_id) {
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
            data_criacao_user: user?.created_at }),
            });

        } catch (error) { console.log('erro 03') }
      }
    } else {
      // enviar informação de falha 
    }

    return 'ok'

  }

}

