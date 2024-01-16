process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';
import axios from 'axios';
import Cadastar_palavra_chave_service from '../services/cadastro/palavaChaveService';
import Deletar_alerta_service from '../services/deletar/alertaService';
import { Consultas_alertasService } from '../services/consultas/alertaService';

const token_bot = '6302850791:AAEllHI-dUdbpmhQ30havovumAAXBT1Qnmc'; // Token do bot do telegram... CentrallTest4

const bot = new TelegramBot(token_bot, { polling: true });

class Bot_bd_mil_alertas {
  static execute() {

    bot.on('callback_query', async (msg:any) => {
        // console.log("callback_query",msg)
        const texto = msg.data;
        const id_telegram = msg.message?.chat.id;
        const username = msg.message?.chat.username;
        const message_id = msg.message?.message_id;
        const texto_split = texto.split('_')

        const user = await prisma_db.users.findUnique({
          where: { id_telegram: id_telegram?.toString() },
        })
        if (user) {
          if (username) {

            if(texto_split[0]==='DELETAR'){
              const alerta = await Deletar_alerta_service(texto_split[1])
              bot.sendMessage(id_telegram, `Alerta Deletado com sucesso!`);
            }  

            if(texto_split[0]==='ALERTAS'){
              const alerta = await Consultas_alertasService(user.id)

              await bot.sendMessage(id_telegram, `Aguarde estamos procurando seus alertas...`);

              if(alerta.length>0){

                for await (const i of alerta){

                  bot.sendMessage(id_telegram, `Alerta: ✅ ${i.palavra_chave} ✅ cadastrado com sucesso!`,
                  {
                    reply_markup: {
                      inline_keyboard: [
                        [
                          { text: "DELETAR", callback_data: `DELETAR_${i.id}`},
                        ],
                      ],
                    },
                  });
                }
              }else{
                bot.sendMessage(id_telegram, `Você não tem alertas cadastrados!`);
              }
            }       
        }else{
          //Cadastrar username
        }
      }else{
        //fazer cadastro
      }
    });

    bot.on('message', async (msg) => {
      // console.log(msg)
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
        
          if(
            msg_alerta[0]==='alerta'||
            msg_alerta[0]==='Alerta'||
            msg_alerta[0]==='ALERTA'||
            msg_alerta[0]==='alertas'||
            msg_alerta[0]==='Alertas'||
            msg_alerta[0]==='ALERTAS'&&
            msg_alerta[1]!=''
            ){

            if(msg_alerta[1]!=undefined){

              const palavra_chave = msg_alerta[1]
              const user_id = user.id

              const alerta = await Cadastar_palavra_chave_service(palavra_chave, user_id, id_telegram) 
              bot.sendMessage(id_telegram, `Alerta: ✅ ${alerta.palavra_chave} ✅ cadastrado com sucesso!`,
              {
                reply_markup: {
                  inline_keyboard: [
                    [
                      { text: "ALERTAS", callback_data: `ALERTAS`},
                      { text: "DELETAR", callback_data: `DELETAR_${alerta.id}`},
                    ],
                  ],
                },
              });

            }else{              
              bot.sendMessage(id_telegram, `Forneça uma palavra válida`);
            }

          }else{

          bot.sendMessage(id_telegram, `

Cadastre seus alertas (criar msg de alerta) - configuração enviar a palavra alerta com espaço e depois colocar uma palavra chave

Exemplo:

Alerta boots
            
          `); 

          }      
         
        }else{
          // Melhorar msg
          bot.sendMessage(id_telegram, `⚠️ É necessário cadastrar um UserName do Telegram, para dar continuidade no Balcão.`);
        }
      }else{
        //fazer cadastro
      }
    });
  }
}
export { Bot_bd_mil_alertas };