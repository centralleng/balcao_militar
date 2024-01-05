process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';
import axios from 'axios';

const token_bot = '6962343359:AAERsmVCjSJczzeQ-ONe_nfVyQxQYDzFYlg'; // Token do bot do telegram... COPPS_START

const bot = new TelegramBot(token_bot, { polling: true });

// export function envioalerta(dados){
//   console.log(dados)
//   bot.sendMessage(dados.chatId, dados.adresp);
// }

class Bot_bd_mil_comprar {
  static execute() {

    bot.on('message', async (msg) => {
      console.log(msg)

      const id_telegram = msg.chat.id.toString();
      const texto = msg.text;
      const name = msg.chat.first_name;
      const username = msg.chat.username;

      const user = await prisma_db.users.findUnique({
        where: { id_telegram: id_telegram?.toString() },
      })
      if (user) {
        if (username) {
          const user_name = await prisma_db.users.update({
            where: { id_telegram: id_telegram },
            data: { username: username }
          })
          const pedido = await prisma_db.pedidos.findUnique({
            where: { id: Number(texto)}
          })
          if (pedido) {
            try {

              const nova_intencao = await prisma_db.intencao_de_compra.create({
                data: {
                  vendedor_id_telegram:     pedido.user_id,
                  comprador_id_telegram:    id_telegram,
                  pedido_id:                pedido.id
                }
              })
              
              const intencao = await prisma_db.intencao_de_compra.findFirst({
                where:  {pedido_id: pedido.id}
              })
              // Envio de msg após teste grátis 
              await axios.post('https://api.telegram.org/bot6962343359:AAERsmVCjSJczzeQ-ONe_nfVyQxQYDzFYlg/sendMessage',
                {
                  chat_id: pedido.user_id,
                  text: `
  ---- ✅✅✅ ----
  💡 ${user_name} quer comprar o seu produto referente a oferta ${pedido.id}, você deve informar para ele a senha ${intencao?.id} para que ele saiba que você é realmente o postador da oferta. Verifique se é a mesma senha.
  ▪️ Dicas do Balcão dos militares:
  Recomendo que sempre seja confirmado o valor do produto, bem como a forma de entrega, prazos, formas de pagamento e outras coisas que se fizerem necessárias antes de fechar a transação, a fim de evitar transtornos desnecessários e exclusão do Balcão.
  ❗️ verifique dados adicionais durante a negociação, para ter a certeza de estar mitigando riscos.
  ⬆️ recomendado por 50 pessoas (dados do comprador)
  Não recomendado por outro usuário (dados do comprador)
  ✅ conta verificada (dados do comprador)
  ✔️ Membro desde 10 mês (es) (dados do comprador)
  👍🏻 Para avaliar se essa transação deu certo, responda com a seguinte frase: recomendo ${id_telegram}.
  👎 Se a sua transação não ocorreu bem, responda com a seguinte frase; desaconselho ${id_telegram}.
  ❗️ Não esqueça de, após a venda me enviar: vendido 9999999 para excluir a oferta do Balcão.
  
          `,
                });
                bot.sendMessage(id_telegram, `✅ Sua intenção de compra foi enviada para o usuário, interessado em vender o produto.
            ✔️  O vendedor entrará em contato caso se interesse em negociar o produto, enviando uma mensagem para a sua conta informando a senha ${intencao?.id}. Essa é uma forma de certificar que ele é realmente a pessoa que postou a oferta xxxxxxx. Sugiro uma análise de risco no tocante ao vendedor verificando os dados adicionais durante a negociação, para ter a certeza do processo.
            👍🏻  Para avaliar se essa transação deu certo, responda com a seguinte frase: recomendo ${pedido.user_id}
            👎  Se a sua transação não ocorreu bem, responda com a seguinte frase; desaconselho ${pedido.user_id}
            ▪️   Dica do Balcão dos militares:
                Recomendo que sempre seja confirmado o valor do produto, bem como a forma de entrega, prazos, formas de pagamento e outras coisas que se fizerem necessárias antes de fechar a transação, a fim de evitar transtornos desnecessários e exclusão do Balcão.
            🤝  Gostaríamos de lembrar da importância de honrar acordos com vendedor ou comprador no Balcão, depois de selar um acordo, a negociação não deve ser alterada. Honre sua palavra e cumpra seus acordos.
            ❌  O mau comportamento pode acarretar na exclusão do balcão
            `)
            } catch (error) {
              console.log(error)
            }
          } else { bot.sendMessage(id_telegram, `ID do produto não encontrada, favor conferir a ID no anúncio.`) }
        }
      }
    }
    )
  }
}


export { Bot_bd_mil_comprar };