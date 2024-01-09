process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';
import axios from 'axios';

const token_bot = '6302850791:AAEllHI-dUdbpmhQ30havovumAAXBT1Qnmc'; // Token do bot do telegram... CentrallTest4

const bot = new TelegramBot(token_bot, { polling: true });

class Bot_bd_mil_alestas {
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

          bot.sendMessage(id_telegram, ``);       
         
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


export { Bot_bd_mil_alestas };