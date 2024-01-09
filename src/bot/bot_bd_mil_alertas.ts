process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';
import axios from 'axios';

const token_bot = '6302850791:AAEllHI-dUdbpmhQ30havovumAAXBT1Qnmc'; // Token do bot do telegram... CentrallTest4

const bot = new TelegramBot(token_bot, { polling: true });

class Bot_bd_mil_alertas {
  static execute() {

    bot.on('message', async (msg) => {
      // console.log(msg)o

      const id_telegram = msg.chat.id.toString();
      const texto = msg.text;
      const name = msg.chat.first_name;
      const username = msg.chat.username;

      const user = await prisma_db.users.findUnique({
        where: { id_telegram: id_telegram?.toString() },
      })
      if (user) {
        if (username) {

          const msg_alerta = texto?texto.split(' '):''
          console.log('1',msg_alerta[0])
          console.log('2',msg_alerta[1])

          if(msg_alerta[0]==='alerta'||msg_alerta[0]==='Alerta'){

            if(msg_alerta[1]!=undefined){

              // enviar a palara para função 

              // enviar mensagem de confirmação

            }else{              
              bot.sendMessage(id_telegram, `Forneça uma palavra válida`);
            }

          }else{

          await bot.sendMessage(id_telegram, `

Cadastre seus alertas (criar msg de alerta) - configuração enviar a palavra alerta com espaço e depois colocar uma palavra chave

Exemplo:

Alerta boots
            
          `); 

          }      
         
        }else{
          // Precisa ser cirado um usernaime 
        }
      }else{
        //fazer cadastro
      }
    }
    )
  }
}
export { Bot_bd_mil_alertas };