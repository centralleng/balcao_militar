process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';
import axios from 'axios';
import moment from 'moment';
import { text } from 'body-parser';

const token_bot = '6538633425:AAF8tFZoEjXGDv_yoSxadcYctG0ph_4Em-I'; // Token do bot do telegram... CentrallTest3

const bot = new TelegramBot(token_bot, { polling: true });

// export function envioalerta(dados){
//   console.log(dados)
//   bot.sendMessage(dados.chatId, dados.adresp);
// }

class Bot_bd_mil_comprar {
  static execute() {

    // Função para criar botões inline
function createInlineKeyboard(userTelegramId:any, senha:any) {
  return {
    inline_keyboard: [
      [
        {
          text: 'Recomendo',
          callback_data: `RECOMENDO_${userTelegramId}_${senha}`,
        },
        {
          text: 'Desaconselho',
          callback_data: `DESACONSELHO_${userTelegramId}_${senha}`,
        },
      ],
    ],
  };
}

    const cadastro: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [[{text: "Cadastrar-me", url: "https://t.me/@CentrallTest1_Bot"}]]
      }
    }

       // Manipular callback_query
       bot.on("callback_query", async (callbackQuery: any) => {
        const msg = callbackQuery.data;
        const chatId = callbackQuery.message?.chat.id;
        const username = callbackQuery.message?.chat.username; 
        const id_telegram = chatId || ''
        const texto_split = msg.split('_')

        const user = await prisma_db.users.findUnique({
          where: { id_telegram: id_telegram?.toString() },
        })
        if (user) {
          if (username) {

            if(texto_split[0]==='RECOMENDO'){

              

              const user = await prisma_db.users.findUnique({
                where: { id_telegram: texto_split[1].toString()},
              })
              
              if(user){

                const recomento_db = user?.recomendado || 0
                const recomento = recomento_db + 1
                // editar user
                await prisma_db.users.update({
                  where:{id_telegram: texto_split[1]},
                  data:{
                    recomendado: recomento      
                  }
                })
              }    
            }

            if(texto_split[0]==='DESACONSELHO'){
              const user = await prisma_db.users.findUnique({
                where: { id_telegram: texto_split[1].toString()},
              })
              
              if(user){

                const desaconselho_db = user?.recomendado || 0
                const desaconselho = desaconselho_db + 1
                // editar user
                await prisma_db.users.update({
                  where:{id_telegram: texto_split[1]},
                  data:{
                    desaconselhado: desaconselho      
                  }
                })
              }   
    
            }             
        }else{
          bot.sendMessage(id_telegram, `⚠️ É necessário cadastrar um UserName do Telegram, para dar continuidade no Balcão.`);
        }
      }else{
        bot.sendMessage(id_telegram, `
⚠️ Primeiro precisamos realizar o seu cadastro!
Entre em contato com o @bdmilbot para iniciar o processo de cadastro.
                  `);
      }     
    })

    // Comendo para o Bot escutar mensagens.
    bot.on('message', async (msg) => {      

      const id_telegram = msg.chat.id.toString();
      const texto = msg.text;
      const name = msg.chat.first_name;
      const username = msg.chat.username;
      
      function gerarHash() {
        let hash = '';
        for (let i = 0; i < 6; i++) {
            hash += Math.floor(Math.random() * 10);
        }
        return hash;
    }    

    const senha = gerarHash();
    
        const user = await prisma_db.users.findUnique({
          where: { id_telegram: id_telegram.toString()},
        })

        if (!user) {
          bot.sendMessage(id_telegram, `
⚠️ Primeiro precisamos realizar o seu cadastro!
Entre em contato com o @bdmilbot para iniciar o processo de cadastro.
          `);
          return
        }

        if (username === undefined) {
          bot.sendMessage(id_telegram, `⚠️ É necessário cadastrar um UserName do Telegram, para dar continuidade no Balcão.`);
          return
        }

        if (texto==="/start") {
          await bot.sendMessage(id_telegram,`
Olá, seja bem-vindo ao BDMilquerocomprar! Aqui você poderá solicitar uma negociação com o vendedor de um dos produtos anúnciados.
        ` ),
          bot.sendMessage(id_telegram, `Basta inserir nesse chat o código informado no anúncio do produto!`)
        } else {   
        // Verifica se o usuário está cadastrado no Banco de dados.
        if (user) {
          // Verifica se o usuário possui um user-name, e atualiza o que está no banco de dados.
          if (username) {
           await prisma_db.users.update({
              where: { id_telegram: id_telegram },
              data: { username: username }
            })

            let produto:any

            if(!Number.isNaN(parseInt(texto || ''))){
              const produto_db = await prisma_db.produtos.findUnique({
                where: { id: parseInt(texto||'')}                
              })
              produto = produto_db
            }else{produto=false}

            console.log(produto)

            // Verifica se existe um produto com aquela ID, cadastrado no banco de dados.
            if (produto) {
              try {
                // Cadastra a Intenção de compra do Comprador, no sistema.
                const nova_intencao = await prisma_db.intencao_de_compras.create({
                  data: {
                    vendedor_id_telegram:    produto.id_telegram,
                    comprador_id_telegram:    id_telegram.toString(),
                    produto_id:                produto.id,
                    senha: parseInt(senha),
                  }
                })
                
                const intencao = await prisma_db.intencao_de_compras.findFirst({
                  where:  {produto_id: produto.id}
                })

                try {
                                 
                // Envio de mensagem para o vendedor indicando que existe um comprador interessando. Obs.: Mensagem enviada pelo bot BDMilQueroVender
                await axios.post('https://api.telegram.org/bot6962343359:AAERsmVCjSJczzeQ-ONe_nfVyQxQYDzFYlg/sendMessage',
                {
                  chat_id: produto.id_telegram,
                  text: `
---- ✅✅✅ ----

💡 Informo que @${user.username} quer comprar o seu produto referente a oferta ${produto.id}, você deve informar para ele a senha ${senha} para que ele saiba que você é realmente o postador da oferta. Verifique se é a mesma senha.

▪️ Dicas do Balcão dos militares:

Recomendo que sempre seja confirmado o valor do produto, bem como a forma de entrega, prazos, formas de pagamento e outras coisas que se fizerem necessárias antes de fechar a transação, a fim de evitar transtornos desnecessários e exclusão do Balcão.

❗️ verifique dados adicionais durante a negociação, para ter a certeza de estar mitigando riscos.

⬆️ recomendado por ${user.recomendado} pessoas.

⬇️ Não recomendado por ${user.desaconselhado} pessoas.

✅ conta verificada 

✔️ Membro desde ${moment(user.created_at).format('DD-MM-YYYY')}

❗️ Não esqueça de deletar o produto, após a venda.
  
          `,
reply_markup: createInlineKeyboard(id_telegram,senha),
                },);

                  
                } catch (error) {
                  console.log('erro')
                  
                }
 
// Msg enviada ao comprador 
                  bot.sendMessage(id_telegram, `
✅ Sua intenção de compra foi enviada para o usuário, interessado em vender o produto.

✔️  O vendedor entrará em contato caso se interesse em negociar o produto, enviando uma mensagem para a sua conta informando a senha ${senha}. Essa é uma forma de certificar que ele é realmente a pessoa que postou a oferta ${produto.id}. Sugiro uma análise de risco no tocante ao vendedor verificando os dados adicionais durante a negociação, para ter a certeza do processo.

▪️   Dica do Balcão dos militares:

Recomendo que sempre seja confirmado o valor do produto, bem como a forma de entrega, prazos, formas de pagamento e outras coisas que se fizerem necessárias antes de fechar a transação, a fim de evitar transtornos desnecessários e exclusão do Balcão.

🤝  Gostaríamos de lembrar da importância de honrar acordos com vendedor ou comprador no Balcão, depois de selar um acordo, a negociação não deve ser alterada. Honre sua palavra e cumpra seus acordos.

❌  O mau comportamento pode acarretar na exclusão do balcão.
              `,
              {
                reply_markup: {
                  inline_keyboard: [
                    [
                      { text: "Recomendo", callback_data: `RECOMENDO_${senha}`}, 
                      { text: "Desaconselho", callback_data: `DESACONSELHO_${senha}`},
                    ],
                  ],
                },
              }
              )
              } catch (error) {
                console.log(error)
              }
            } else { bot.sendMessage(id_telegram, `ID do produto não encontrada, favor conferir a ID no anúncio.`) }
          } else {bot.sendMessage(id_telegram, `Identificamos que você ainda não possui um Username, cadastre um para continuar utilizando nossos serviços.`)}
        } else {bot.sendMessage(id_telegram, `Não foi encontrado seu cadastro em nosso banco de dados. Por favor, realize primeiro o seu cadastro no BOT BDMIL antes de utilizar nossos serviços.`, cadastro) }
      }   
    }
    )
  }
}


export { Bot_bd_mil_comprar };