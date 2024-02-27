import axios from "axios";

const botVenda = process.env.API_BOT_BDMIL_VENDA || ''
const botCompra = process.env.API_BOT_BDMIL_COMPRA || ''

     // Função para criar botões inline
     function createInlineKeyboard() {
        return {
          inline_keyboard: [
            [
              {
                text: 'SUPORTE',
                url: `https://t.me/BDMilSUGESTOES_bot`,
              },
            ],
          ],
        };
      }

    class Recomendado_desaconsenho {
       
        async recomendo_vendedor (id_telegram:any) {
            try {
                // Enviar msg para aleras cadastrados 
                await axios.post(`https://api.telegram.org/bot${botVenda}/sendMessage`, // bot CentrallTest4
                {
                chat_id: id_telegram,
                text: `✔️ Parabéns! Você recebeu uma recomendação.`,
                reply_markup: createInlineKeyboard(),
                });

            } catch (error) { console.log('erro-rd 01') }

        }
        async recomendo_comprador (id_telegram:any) {
            try {
                // Enviar msg para aleras cadastrados 
                await axios.post(`https://api.telegram.org/bot${botCompra}/sendMessage`, // bot CentrallTest4
                {
                chat_id: id_telegram,
                text: `✔️ Parabéns! Você recebeu uma recomendação.`,
                reply_markup: createInlineKeyboard(),
                });

            } catch (error) { console.log('erro-rd 02') }

        }
        async desaconselho_vendedor (id_telegram:any) {
            try {
                // Enviar msg para aleras cadastrados 
                await axios.post(`https://api.telegram.org/bot${botVenda}/sendMessage`, // bot CentrallTest4
                {
                chat_id: id_telegram,
                text: `⚠️ Lamento informar que a opção recebeu um desaconselho.`,
                reply_markup: createInlineKeyboard(),
                });

            } catch (error) { console.log('erro-rd 03') }

        }
        async desaconselho_comprador (id_telegram:any) {
            try {
                // Enviar msg para aleras cadastrados 
                await axios.post(`https://api.telegram.org/bot${botCompra}/sendMessage`, // bot CentrallTest4
                {
                chat_id: id_telegram,
                text: `⚠️ Lamento informar que a opção recebeu um desaconselho.`,
                reply_markup: createInlineKeyboard(),
                });

            } catch (error) { console.log('erro-rd 04') }

        }
}

export const recomendado_desaconsenho = new Recomendado_desaconsenho