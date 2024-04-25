process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';
import axios from 'axios';
import Cadastar_palavra_chave_service from '../services/cadastro/palavaChaveService';
import Deletar_alerta_service from '../services/deletar/alertaService';
import { Consultas_alertasService } from '../services/consultas/alertaService';

const token_bot = process.env.API_BOT_BDMIL_ALERTA ||'' // '6302850791:AAEllHI-dUdbpmhQ30havovumAAXBT1Qnmc'; // Token do bot do telegram... CentrallTest4

const bot = new TelegramBot(token_bot, { polling: true });

class Bot_bd_mil_alertas {
  static execute() {

// Função para criar botões inline
function createInlineKeyboard(userTelegramId:any) {
  return {
    inline_keyboard: [                                                            
      [
        {
          text: 'Quero Vender',
          url: `https://t.me/BDMilCVbot?start=start`,
        },
        {
          text: 'Bot Alertas',
          url: `https://t.me/BDMilALERTAS_bot?start=start`,
        },
      ],
    ],
  };
}

    function artigos_militares(id:any) {
      return {
      reply_markup: {
        inline_keyboard: [
        [
            { text: `[EB] vendas`, callback_data: `CADASTRO_[EB]_${id}_APAGAR-01`},
            { text: `[MB] vendas`, callback_data: `CADASTRO_[MB]_${id}_APAGAR-01`},
            { text: `[FAB] vendas`, callback_data: `CADASTRO_[FAB]_${id}_APAGAR-01`},
        ],
        [
            { text: `[PM] vendas`, callback_data: `CADASTRO_[PM]_${id}_APAGAR-01`},
            { text: `[BM] vendas`, callback_data: `CADASTRO_[BM]_${id}_APAGAR-01`},
        ],       
        ],
      },
    }
  }

    function artigos_civis(id:any) {
      return {
      reply_markup: {
        inline_keyboard: [
          [
            { text: `[Serviços] vendas`, callback_data: `CADASTRO_[Servicos]_${id}`},
            { text: `[Smartphone] vendas`, callback_data: `CADASTRO_[Smartphone]_${id}`},
            { text: `[Eletrônicos] vendas`, callback_data: `CADASTRO_[Eletronicos]_${id}`},
          ],        
          [
            { text: `[Escolar] vendas`, callback_data: `CADASTRO_[Escolar]_${id}`},
            { text: `[Diversos] vendas`, callback_data: `CADASTRO_[Diversos]_${id}`},
            { text: `[Veículo] vendas`, callback_data: `CADASTRO_[Veiculo]_${id}`},
          ],
          [
            { text: `[Milhas] vendas`, callback_data: `CADASTRO_[Milhas]_${id}`},
            { text: `[Cripto] vendas`, callback_data: `CADASTRO_[Cripto]_${id}`},
            { text: `[Câmbio] vendas`, callback_data: `CADASTRO_[Cambio]_${id}`},
          ],
          [
            { text: `[Pet] vendas`, callback_data: `CADASTRO_[Pet]_${id}`},
            { text: `[Casa] vendas`, callback_data: `CADASTRO_[Casa]_${id}`},
            { text: `[Imóveis] vendas`, callback_data: `CADASTRO_[Imovel]_${id}`},
          ],
          [     
            { text: `[Infantil] vendas`, callback_data: `CADASTRO_[Infantil]_${id}`},
            { text: `[Beleza e Saúde] vendas`, callback_data: `CADASTRO_[Beleza-Saude]_${id}`},
            { text: `[Passagens Aéreas] vendas`, callback_data: `CADASTRO_[Passagens-Aereas]_${id}`},
          ],
          // [
          //   { text: "[Uniforme] vendas", callback_data: `CADASTRO_[Uniforme]_${id}` },
          //   { text: "[Veículo] vendas", callback_data: `CADASTRO_[Veiculo]_${id}` },
          //   { text: "[Serviço] vendas", callback_data: `CADASTRO_[Servico]_${id}` },
          // ],
          // [
          //   { text: "[Smartphone] vendas", callback_data: `CADASTRO_[Smartphone]_${id}` },
          //   { text: "[Acessório] vendas", callback_data: `CADASTRO_[Acessorio]_${id}` },
          //   { text: "[Eletrodoméstico] vendas", callback_data: `CADASTRO_[Eletrodomestico]_${id}` },
          // ],
          // [
          //   { text: "[Automotivo] vendas", callback_data: `CADASTRO_[Automotivo]_${id}` },
          //   { text: "[Audio] vendas", callback_data: `CADASTRO_[Audio]_${id}` },
          //   { text: "[Eletroportátil] vendas", callback_data: `CADASTRO_[Eletroportatil]_${id}` },
          // ],
          // [
          //   { text: "[Ferramenta] vendas", callback_data: `CADASTRO_[Ferramenta]_${id}` },
          //   { text: "[Bebida] vendas", callback_data: `CADASTRO_[Bebida]_${id}` },
          //   { text: "[Bebê] vendas", callback_data: `CADASTRO_[Bebe]_${id}` },
          // ],
          // [
          //   { text: "[Esporte] vendas", callback_data: `CADASTRO_[Esporte]_${id}` },
          //   { text: "[Smart TV] vendas", callback_data: `CADASTRO_[Smart-TV]_${id}` },
          //   { text: "[Ar e Ventilação] vendas", callback_data: `CADASTRO_[Ar-e-Ventilacao]_${id}` },
          // ],
          // [
          //   { text: "[Imóvel] vendas", callback_data: `CADASTRO_[Imovel]_${id}_APAGAR` },
          //   { text: "[Brinquedo] vendas", callback_data: `CADASTRO_[Brinquedo]_${id}_APAGAR` },
          //   { text: "[Informática] vendas", callback_data: `CADASTRO_[Informatica]_${id}_APAGAR` },
          // ],
          // [
          //   { text: "[Game] vendas", callback_data: `CADASTRO_[Game]_${id}_APAGAR` },
          //   { text: "[Móvel] vendas", callback_data: `CADASTRO_[Movel]_${id}_APAGAR` },
          //   { text: "[Utilidade Doméstica] vendas", callback_data: `CADASTRO_[Utilidade-Domestica]_${id}_APAGAR` },
          // ],
          // [
          //   { text: "[Material Escolar] vendas", callback_data: `CADASTRO_[Material-Escolar]_${id}_APAGAR` },
          //   { text: "[Passagens Aéreas] vendas", callback_data: `CADASTRO_[Passagens-Aereas]_${id}_APAGAR` },
          //   { text: "[Tudo Pet] vendas", callback_data: `CADASTRO_[Tudo-Pet]_${id}_APAGAR` },
          // ],
          // [
          //   { text: "[Beleza e Saúde] vendas", callback_data: `CADASTRO_[Beleza-Saude]_${id}_APAGAR` },
          //   { text: "[Mat. Construção] vendas", callback_data: `CADASTRO_[Mat-Construcao]_${id}_APAGAR` },
          //   { text: "[Alimento] vendas", callback_data: `CADASTRO_[Alimento]_${id}_APAGAR` },
          // ],
          // [
          //   { text: "[Joia e Bijuteria] vendas", callback_data: `CADASTRO_[Joia-Bijuteria]_${id}_APAGAR` },
          //   { text: "[Vestuario] vendas", callback_data: `CADASTRO_[Vestuario]_${id}_APAGAR` },
          //   { text: "[Instr. musicais] vendas", callback_data: `CADASTRO_[Instr-musicais]_${id}_APAGAR` },
          // ],       
        ],
      },
    }
  }

    bot.on('callback_query', async (msg:any) => {
        // console.log("callback_query",msg)
        const texto = msg.data;
        const id_telegram = msg.message?.chat.id;
        const username = msg.message?.chat.username;
        const message_id = msg.message?.message_id;
        const texto_split = texto.split('_')

        const msg_del = await bot.sendMessage(id_telegram, 'Aguarde...'); 
        const messageId = msg_del.message_id.toString()

        if(texto_split[0]==='CADASTRO'&&texto_split[3]==='APAGAR'){
          await bot.deleteMessage(id_telegram, (message_id-2).toString()) 
          await bot.deleteMessage(id_telegram, (message_id-1).toString())
          await bot.deleteMessage(id_telegram, (message_id).toString())  
        }      
        if(texto_split[0]==='CADASTRO'&&texto_split[3]==='APAGAR-01'){  
          await bot.deleteMessage(id_telegram, (message_id-1).toString())
          await bot.deleteMessage(id_telegram, (message_id).toString())
          await bot.deleteMessage(id_telegram, (message_id+1).toString())
        } 

        const user = await prisma_db.users.findUnique({
          where: { id_telegram: id_telegram?.toString() },
        })
        if (user) {
          if (username) {

            if (texto_split[0] === 'CADASTRO') { // Listar todo os produtos cadastrados         
              
              try {
                const alerta = await prisma_db.alertas.update({
                 where:{id:parseInt(texto_split[2])},
                 data:{
                  tipo_grupo: texto_split[1]
                 }               
                }) 

                await bot.sendMessage(id_telegram, `Por favor, selecione 'SIM' ou 'NÃO' para determinar se deseja incluir UF nos alertas.`,
               {
               reply_markup: {
                 inline_keyboard: [
                    [
                      { text: "SIM1", callback_data: `SIM1_${alerta.id}`},
                      { text: "NÃO1", callback_data: `NAO1_${alerta.id}`},
                    ],
                  ],
                 }
                },
                );
                bot.deleteMessage(id_telegram, messageId)  

              } catch (error) {
                await bot.sendMessage(id_telegram, `⚠️ Parece que algo deu errado, o que você pretende fazer?`);
                bot.deleteMessage(id_telegram, messageId)
              }
            }

            if(texto_split[0]==='DELETAR'){

            const alertadb = await prisma_db.alertas.findUnique({
                where:{id: parseInt(texto_split[1])}
            }) 

            if(alertadb){
              await Deletar_alerta_service(texto_split[1])
              await bot.sendMessage(id_telegram, `✔️ Alerta Deletado com sucesso!`);
              bot.deleteMessage(id_telegram, messageId)
              return
            }            
       
              await bot.sendMessage(id_telegram, `❌ Esse alerta já foi deletado!`);
              bot.deleteMessage(id_telegram, messageId)

            }  

            if(texto_split[0]==='ALERTAS'){

              const alerta = await Consultas_alertasService(user.id)

              await bot.sendMessage(id_telegram, `Aguarde estamos procurando seus alertas...`);              

              if(alerta.length>0){

                for await (const i of alerta){

                  await bot.sendMessage(id_telegram, `Alerta: ✅ ${i.palavra_chave} ✅ cadastrado com sucesso!`,
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
                await bot.deleteMessage(id_telegram, messageId)
              }else{
                await bot.sendMessage(id_telegram, `⚠️ Você não tem alertas cadastrados!`);
                bot.deleteMessage(id_telegram, messageId)
              }
            } 
            
            if(texto_split[0]==='NAO'){

              const alertadb = await prisma_db.alertas.update({
                where:{id: parseInt(texto_split[1])},
                data:{status:1}
              })

              await bot.sendMessage(id_telegram, `Alerta: ✅ ${alertadb.palavra_chave} ✅ cadastrado com sucesso!`,
               {
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: "ALERTAS", callback_data: `ALERTAS`},
                    { text: "DELETAR", callback_data: `DELETAR_${alertadb.id}`},
                  ],
                  [
                    { text: "CADASTRAR NOVA PALAVRA CHAVE", callback_data: `PALAVRA`},
                  ],
                ],
                }
              },
              );
              bot.deleteMessage(id_telegram, messageId) 
            }

            if(texto_split[0]==='SIM1'){

            await bot.sendMessage(id_telegram, `Digite sua UF`);
            bot.deleteMessage(id_telegram, messageId)

            }   
            
            if(texto_split[0]==='PALAVRA'){

              console.log(texto_split)

              await prisma_db.alertas.create({
                data:{
                  user_id: user.id,
                  id_telegram: id_telegram.toString(),                  
                }
              })

              await bot.sendMessage(id_telegram, `Digite sua palavra chave.`); 
              bot.deleteMessage(id_telegram, messageId)
            }
            
        }else{
          await bot.sendMessage(id_telegram, `⚠️ É necessário cadastrar um UserName do Telegram, para dar continuidade no Balcão.`);
          bot.deleteMessage(id_telegram, messageId)
        }
      }else{
        await bot.sendMessage(id_telegram, `
⚠️ Primeiro precisamos realizar o seu cadastro!
Entre em contato com o @bdmilbot para iniciar o processo de cadastro.
        `);
        bot.deleteMessage(id_telegram, messageId)
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

      ////////////////////////////////////////////////////////////////////////////////////////////
      await bot.sendMessage(id_telegram, '⚠️ Estamos em manutenção'); 
      bot.deleteMessage(id_telegram, messageId)


      const user = await prisma_db.users.findUnique({
        where: { id_telegram: id_telegram?.toString()},
        include:{
          alerta: {
            orderBy: { id: 'desc' },
            take: 1, // Apenas o último produto
          },
        }
      })

      if (user) {
        if (username) {

//           if(user?.alerta.length>0){

//             // Inicio das condicionais

//             if(!user?.alerta[0].status){

//               if(user?.alerta[0].palavra_chave===null){

//               const msg_alerta = texto?texto.split(' '):''

//               const alerta = await prisma_db.alertas.update({
//                 where:{id: user?.alerta[0].id},
//                 data:{
//                     palavra_chave: msg_alerta[0]
//                 }
//               });

//               await bot.sendMessage(id_telegram, `De qual canal você gostaria de receber alertas?`);
//               await bot.sendMessage(id_telegram, `Artigos Militares`, artigos_militares(alerta.id));
//               await bot.sendMessage(id_telegram, `Artigos Civis`, artigos_civis(alerta.id));
//               bot.deleteMessage(id_telegram, messageId)
//               return
//               }

//               if(user?.alerta[0].uf===null){

//                const uf_db = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"]

//                const filter_uf = uf_db.filter((item)=> item === texto)
    
//                 if(filter_uf.length<1){
//                 await bot.sendMessage(id_telegram, `⚠️ Digite uma UF válida`);
//                 bot.deleteMessage(id_telegram, messageId)
//                   return
//                 }  

//                 await prisma_db.alertas.update({
//                   where:{id: user.alerta[0].id},
//                   data:{
//                     uf: texto.toUpperCase(),
//                     status:1,
//                   }
//                 })

//                 await bot.sendMessage(id_telegram, `Alerta: ✅ ${user.alerta[0].palavra_chave} ✅ cadastrado com sucesso!`,
//                  {
//                 reply_markup: {
//                   inline_keyboard: [
//                     [
//                       { text: "ALERTAS", callback_data: `ALERTAS`},
//                       { text: "DELETAR", callback_data: `DELETAR_${user.alerta[0].id}`},
//                     ],
//                     [
//                       { text: "CADASTRAR NOVA PALAVRA CHAVE", callback_data: `PALAVRA`},
//                     ],
//                   ],
//                   }
//                 },
//                 );
//                 bot.deleteMessage(id_telegram, messageId) 
//                 return
//               }

//             }else{
//               await bot.sendMessage(id_telegram, `
// 🚨 Você só poderá concluir um alertas por vez. Após 3 minutos de inatividade, TODO o processo será anulado, tendo que ser reiniciado.

// Pressione CADASTRAR NOVA PALAVRA CHAVE para iniciar.
//               `,
//               {
//                 reply_markup: {
//                   inline_keyboard: [
//                     [
//                       { text: "CADASTRAR NOVA PALAVRA CHAVE", callback_data: `PALAVRA`},
//                     ],
//                   ],
//                   }
//                 },
//               );
         
//               bot.deleteMessage(id_telegram, messageId)
//               }
//           }else{
//             await bot.sendMessage(id_telegram, `
// 🚨 Você só poderá concluir um alertas por vez. Após 3 minutos de inatividade, TODO o processo será anulado, tendo que ser reiniciado.

// Pressione CADASTRAR NOVA PALAVRA CHAVE para iniciar.
//             `,
//             {
//               reply_markup: {
//                 inline_keyboard: [
//                    [
//                      { text: "CADASTRAR NOVA PALAVRA CHAVE", callback_data: `PALAVRA`},
//                    ],
//                  ],
//                 }
//                },
//             ); 
//           bot.deleteMessage(id_telegram, messageId)
//           }

        }else{
          // Melhorar msg
          await bot.sendMessage(id_telegram, `⚠️ É necessário cadastrar um UserName do Telegram, para dar continuidade no Balcão.`);
          bot.deleteMessage(id_telegram, messageId)
        }
      }else{
      await bot.sendMessage(id_telegram, `
⚠️ Primeiro precisamos realizar o seu cadastro!
Entre em contato com o @bdmilbot para iniciar o processo de cadastro.
        `);
        bot.deleteMessage(id_telegram, messageId)
      }
    });
  }
}
export { Bot_bd_mil_alertas };