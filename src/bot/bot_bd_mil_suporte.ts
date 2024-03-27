process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';
import axios from 'axios';
import Cadastar_palavra_chave_service from '../services/cadastro/palavaChaveService';
import Deletar_alerta_service from '../services/deletar/alertaService';
import { Consultas_alertasService } from '../services/consultas/alertaService';
import { mensagens } from '../utils/msg_bot';

const token_bot = process.env.API_BDMIL_SUPORTE ||''

const bot = new TelegramBot(token_bot, { polling: true });
class Bot_bd_mil_suporte {
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

        const user = await prisma_db.users.findUnique({
          where: { id_telegram: id_telegram?.toString() },
        })

        if(texto_split[0]==='DELETAR-CONTA'){
          if(user){
            await prisma_db.users.delete({
              where:{id_telegram:id_telegram?.toString()}
            })
            await bot.sendMessage(id_telegram, '✔️ Seu cadastro foi deletado com sucesso!');
            bot.deleteMessage(id_telegram, messageId)

          }else{
            await bot.sendMessage(id_telegram, '❌ Não há nenhum registro de seu cadastro em nosso banco de dados.');
            bot.deleteMessage(id_telegram, messageId)
          }          
        }
    });   
    
    bot.on('message', async (msg) => {
      // console.log(msg)
      const id_telegram = msg.chat.id.toString();
      const texto = msg.text ||' ';
      const name = msg.chat.first_name;
      const username = msg.chat.username;

      const msg_del = await bot.sendMessage(id_telegram, 'Aguarde...'); 
      const messageId = msg_del.message_id.toString()

      const msg_resp:any = {'1':mensagens.suporte_cadastro,'2':mensagens.suporte_venda,'3':mensagens.suporte_alerta,'4':mensagens.suporte_compra}     

      if(texto==='5'){
      await bot.sendMessage(id_telegram, 'Entre em contato no endereço de email: balcaodosmilitares@gmail.com');
      bot.deleteMessage(id_telegram, messageId)
      return
      }
      if(texto==='6'){
        await bot.sendMessage(id_telegram, 'Este passo é irreversível. Ao clicar em SIM, você concorda em excluir permanentemente sua conta do sistema. Será necessário refazer todo o seu cadastro caso deseje utilizar nossos serviços novamente.',
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "SIM", callback_data: `DELETAR-CONTA` },                
              ],                   
            ],
          },
        }
        );
        bot.deleteMessage(id_telegram, messageId)
        return
        }

      if(msg_resp[texto]){

      await bot.sendVideo(id_telegram, msg_resp[texto]);
      await bot.sendMessage(id_telegram, 'Espero que tenho sanado sua dúvida. Boas negociações! Caso ainda persista, pode clicar nos itens novamente.');
      bot.deleteMessage(id_telegram, messageId)

      return

      }else{
      await bot.sendMessage(id_telegram, `
Olá! Bem-vindo! Eu sou o Soldado. Por favor, selecione uma opção de 0 a 6 para esclarecer sua dúvida.:

1 - Como fazer meu cadastro;
2 - Como colocar um produto para vender;
3 - Como ativar o bot alertas;
4 - Como comprar um produto;
5 - Fale com um representante.
6 - Excluir minha conta.
        
        `)              
      bot.deleteMessage(id_telegram, messageId);
      }
    });
  }
}
export { Bot_bd_mil_suporte };