process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';

const token_bot = ''; // Token do bot do telegram... COPPS_START

const bot = new TelegramBot (token_bot, {polling: true});

// export function envioalerta(dados){
//   console.log(dados)
//   bot.sendMessage(dados.chatId, dados.adresp);
// }

class Bot_bd_mil_comprar{
  static execute() {  

  bot.on('message', async (msg) => {
    console.log(msg)

    const id_telegram = msg.chat.id.toString();
    const texto = msg.text;
    const name = msg.chat.first_name;   
    const username = msg.chat.username; 
  })
 }
}

export { Bot_bd_mil_comprar };