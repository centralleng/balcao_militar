process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';
import axios from 'axios';
import Cadastar_palavra_chave_service from '../services/cadastro/palavaChaveService';
import Deletar_alerta_service from '../services/deletar/alertaService';
import { Consultas_alertasService } from '../services/consultas/alertaService';

const token_bot = process.env.API_BDMIL_SUGESTOES ||'' 

const bot = new TelegramBot(token_bot, { polling: true });

class Bot_bd_mil_sugestoes {
  static execute() {    

    bot.on('callback_query', async (msg:any) => {
        // console.log("callback_query",msg)
        const texto = msg.data;
        const id_telegram = msg.message?.chat.id;
        const username = msg.message?.chat.username;
        const message_id = msg.message?.message_id;
        const texto_split = texto.split('_')

        const msg_del = await bot.sendMessage(id_telegram, 'Aguarde...'); 
        const messageId = msg_del.message_id.toString()

    });   
    
    bot.on('message', async (msg) => {
      // console.log(msg)
      const id_telegram = msg.chat.id.toString();
      const texto = msg.text ||' ';
      const name = msg.chat.first_name;
      const username = msg.chat.username;

      const msg_del = await bot.sendMessage(id_telegram, 'Aguarde...'); 
      const messageId = msg_del.message_id.toString()

       // Primeiro verifica se ja axiste esse usuário
       const user = await prisma_db.users.findUnique({
        where: { id_telegram: id_telegram?.toString()}           
      });

      if (!user) {
        await bot.sendMessage(id_telegram, `
⚠️ Primeiro precisamos realizar o seu cadastro!
Entre em contato com o @bdmilbot para iniciar o processo de cadastro.
        `);
        bot.deleteMessage(id_telegram, messageId)
        return
      }

      const sugestao = await prisma_db.sugestoes.findMany({
        where: { id_telegram: id_telegram?.toString(), descricao:null}           
      });

      if(sugestao.length>0){
        if(texto!='/start'){
          const verifica_descricao = texto?.split('') 
          if (verifica_descricao.length < 200 && verifica_descricao.length > 0) {
            await prisma_db.sugestoes.update({
              where:{id: sugestao[0].id},
              data: {
                descricao: texto,    
              }
            }) 
            await bot.sendMessage(id_telegram, `✅ Sugestão recebida com sucesso.`);
            bot.deleteMessage(id_telegram, messageId)
            return
          }else{
            await bot.sendMessage(id_telegram, `⚠️ Ops algo coloque no máximo 150 caracteres. SÓ coloque ponto no fim.`);
            bot.deleteMessage(id_telegram, messageId)
            return
          }
        }      
      }
      
      await bot.sendMessage(id_telegram,`Olá, Eu sou o Soldado, digite aqui a sua sugestão para melhorar o processo. Desde já agradecemos. Máximo 150 caracteres`);
      bot.deleteMessage(id_telegram, messageId)

      await prisma_db.sugestoes.create({
        data: {
          id_telegram: id_telegram?.toString(),
        }
      })    
    });
  }
}
export { Bot_bd_mil_sugestoes };