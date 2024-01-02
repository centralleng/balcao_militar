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
          const id_produto = await prisma_db.produtos.findFirst({
            where: { id: Number(texto) }
          })
          if (id_produto) {
            try {
              // Envio de msg após teste grátis 
              await axios.post('https://api.telegram.org/bot5612418564:AAEA1VuE_VmcR74VYF6t_8bCegAte37Fe4A/sendMessage',
                {
                  chat_id: 'id do vendedor',
                  text: `
  ---- ✅✅✅ ----
  msg    
          `,
                });
            } catch (error) {
              console.log(error)
            }

            bot.sendMessage(id_telegram, `✅ Sua intenção de compra foi enviada para o usuário, interessado em vender o produto.
            ✔️O vendedor entrará em contato caso se interesse em negociar o produto, enviando uma mensagem para a sua conta informando a senha 1555556. Essa é uma forma de certificar que ele é realmente a pessoa que postou a oferta xxxxxxx. Sugiro uma análise de risco no tocante ao vendedor verificando os dados adicionais durante a negociação, para ter a certeza do processo.
           👍🏻 Para avaliar se essa transação deu certo, responda com a seguinte frase: recomendo 555555555
           👎Se a sua transação não ocorreu bem, responda com a seguinte frase; desaconselho 5555555
           ▪️ Dica do Balcão dos militares:
           Recomendo que sempre seja confirmado o valor do produto, bem como a forma de entrega, prazos, formas de pagamento e outras coisas que se fizerem necessárias antes de fechar a transação, a fim de evitar transtornos desnecessários e exclusão do Balcão.
           🤝 Gostaríamos de lembrar da importância de honrar acordos com vendedor ou comprador no Balcão, depois de selar um acordo, a negociação não deve ser alterada. Honre sua palavra e cumpra seus acordos.
           ❌ O mau comportamento pode acarretar na exclusão do balcão
           `)

          } else { bot.sendMessage(id_telegram, `O valor monetário não é válido.`) }
        }
      }
    }
    )
  }
}


export { Bot_bd_mil_comprar };