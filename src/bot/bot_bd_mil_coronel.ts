process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';
import axios from 'axios';
import Cadastar_palavra_chave_service from '../services/cadastro/palavaChaveService';
import Deletar_alerta_service from '../services/deletar/alertaService';
import { Consultas_alertasService } from '../services/consultas/alertaService';

const token_bot = process.env.API_BDMIL_CORONEL ||''

// const bot = new TelegramBot(token_bot, { polling: true });

class Bot_bd_mil_coronel {
  bot = new TelegramBot(token_bot, { polling: true })
  execute() {  
    
    this.bot.on('callback_query', async (msg:any) => {
        // console.log("callback_query",msg)
        const texto = msg.data;
        const id_telegram = msg.message?.chat.id;
        const username = msg.message?.chat.username;
        const message_id = msg.message?.message_id;
        const texto_split = texto.split('_')

        const msg_del = await this.bot.sendMessage(id_telegram, 'Aguarde...'); 
        const messageId = msg_del.message_id.toString()

    });   
    
    this.bot.on('message', async (msg) => {
      // console.log(msg)
      const id_telegram = msg.chat.id.toString();
      const texto = msg.text ||' ';
      const name = msg.chat.first_name;
      const username = msg.chat.username;

      const msg_del = await this.enviar_mensagem(id_telegram, "aguarde...", )
      
      const messageId = msg_del.message_id.toString()


    });
  }

  async enviar_mensagem (contato: any, texto: any) {
    return await this.bot.sendMessage(contato,texto)
  }
}
export { Bot_bd_mil_coronel };