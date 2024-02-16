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

    function artigos_militares(id:any) {
      return {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "[EB] vendas", callback_data: `CADASTRO_[EB]_${id}` },
            { text: "[MB] vendas", callback_data: `CADASTRO_[MB]_${id}` },
            { text: "[FAB] vendas", callback_data: `CADASTRO_[FAB]_${id}` },
          ],
          [
            { text: "[PMERJ] vendas", callback_data: `CADASTRO_[PMERJ]_${id}` },
            { text: "[CBMERJ] vendas", callback_data: `CADASTRO_[CBMERJ]_${id}` },
            { text: "[PMDF] vendas", callback_data: `CADASTRO_[PMDF]_${id}` },
          ],
          [
            { text: "[CBMDF] vendas", callback_data: `CADASTRO_[CBMDF]_${id}` },
            { text: "[PMESP] vendas", callback_data: `CADASTRO_[PMESP]_${id}` },
            { text: "[CBMESP] vendas", callback_data: `CADASTRO_[CBMESP]_${id}` },
          ],
          [
            { text: "[PMMG] vendas", callback_data: `CADASTRO_[PMMG]_${id}` },
            { text: "[CBMMG] vendas", callback_data: `CADASTRO_[CBMMG]_${id}` },
            { text: "[PMGO] vendas", callback_data: `CADASTRO_[PMGO]_${id}` },
          ],
          [
            { text: "[CBMGO] vendas", callback_data: `CADASTRO_[CBMGO]_${id}` },
            { text: "[PMPR] vendas", callback_data: `CADASTRO_[PMPR]_${id}` },
            { text: "[CBMPR] vendas", callback_data: `CADASTRO_[CBMPR]_${id}` },
          ],
          [
            { text: "[PMSC] vendas", callback_data: `CADASTRO_[PMSC]_${id}` },
            { text: "[CBMSC] vendas", callback_data: `CADASTRO_[CBMSC]_${id}` },
            { text: "[BRIGADA MILITAR] vendas", callback_data: `CADASTRO_[BRIGADA-MILITAR]_${id}` },
          ],
          [
            { text: "[CBMRS] vendas", callback_data: `CADASTRO_[CBMRS]_${id}` },
            { text: "[PMMS] vendas", callback_data: `CADASTRO_[PMMS]_${id}` },
            { text: "[CBMMS] vendas", callback_data: `CADASTRO_[CBMMS]_${id}` },
          ],
          [
            { text: "[PMMT] vendas", callback_data: `CADASTRO_[PMMT]_${id}` },
            { text: "[CBMMT] vendas", callback_data: `CADASTRO_[CBMMT]_${id}` },
            { text: "[PMBA] vendas", callback_data: `CADASTRO_[PMBA]_${id}` },
          ],
          [
            { text: "[CBMBA] vendas", callback_data: `CADASTRO_[CBMBA]_${id}` },
            { text: "[PMES] vendas", callback_data: `CADASTRO_[PMES]_${id}` },
            { text: "[CBMES] vendas", callback_data: `CADASTRO_[CBMES]_${id}` },
          ],
          [
            { text: "[PMAL] vendas", callback_data: `CADASTRO_[PMAL]_${id}` },
            { text: "[CBMAL] vendas", callback_data: `CADASTRO_[CBMAL]_${id}` },
            { text: "[PMSE] vendas", callback_data: `CADASTRO_[PMSE]_${id}` },
          ],
          [
            { text: "[CBMSE] vendas", callback_data: `CADASTRO_[CBMSE]_${id}` },
            { text: "[PMPE] vendas", callback_data: `CADASTRO_[PMPE]_${id}` },
            { text: "[CBMPE] vendas", callback_data: `CADASTRO_[CBMPE]_${id}` },
          ],
          [
            { text: "[PMRN] vendas", callback_data: `CADASTRO_[PMRN]_${id}` },
            { text: "[CBMRN] vendas", callback_data: `CADASTRO_[CBMRN]_${id}` },
            { text: "[PMCE] vendas", callback_data: `CADASTRO_[PMCE]_${id}` },
          ],
          [
            { text: "[CBMCE] vendas", callback_data: `CADASTRO_[CBMCE]_${id}` },
            { text: "[PMPI] vendas", callback_data: `CADASTRO_[PMPI]_${id}` },
            { text: "[CBMPI] vendas", callback_data: `CADASTRO_[CBMPI]_${id}` },
          ],
          [
            { text: "[PMMA] vendas", callback_data: `CADASTRO_[PMMA]_${id}` },
            { text: "[CBMMA] vendas", callback_data: `CADASTRO_[CBMMA]_${id}` },
            { text: "[PMAM] vendas", callback_data: `CADASTRO_[PMAM]_${id}` },
          ],
          [
            { text: "[CBMAM] vendas", callback_data: `CADASTRO_[CBMAM]_${id}` },
            { text: "[PMAP] vendas", callback_data: `CADASTRO_[PMAP]_${id}` },
            { text: "[CBMAP] vendas", callback_data: `CADASTRO_[CBMAP]_${id}` },
          ],
          [
            { text: "[PMRO] vendas", callback_data: `CADASTRO_[PMRO]_${id}` },
            { text: "[CBMRO] vendas", callback_data: `CADASTRO_[CBMRO]_${id}` },
            { text: "[PMTO] vendas", callback_data: `CADASTRO_[PMTO]_${id}` },
          ],
          [
            { text: "[CBMTO] vendas", callback_data: `CADASTRO_[CBMTO]_${id}` },
            { text: "[PMAC] vendas", callback_data: `CADASTRO_[PMAC]_${id}` },
            { text: "[CBMAC] vendas", callback_data: `CADASTRO_[CBMAC]_${id}` },
          ],
          [
            { text: "[PMPA] vendas", callback_data: `CADASTRO_[PMPA]_${id}` },
            { text: "[CBMPA] vendas", callback_data: `CADASTRO_[CBMPA]_${id}` },
            { text: "[PMRR] vendas", callback_data: `CADASTRO_[PMRR]_${id}` },
          ],
          [
            { text: "[CBMRR] vendas", callback_data: `CADASTRO_[CBMRR]_${id}` },
            { text: "[PMPB] vendas", callback_data: `CADASTRO_[PMPB]_${id}` },
            { text: "[CBMPB] vendas", callback_data: `CADASTRO_[CBMPB]_${id}` },
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
            { text: "[Uniforme] vendas", callback_data: `CADASTRO_[Uniforme]_${id}` },
            { text: "[Veículo] vendas", callback_data: `CADASTRO_[Veiculo]_${id}` },
            { text: "[Serviço] vendas", callback_data: `CADASTRO_[Servico]_${id}` },
          ],
          [
            { text: "[Smartphone] vendas", callback_data: `CADASTRO_[Smartphone]_${id}` },
            { text: "[Acessório] vendas", callback_data: `CADASTRO_[Acessorio]_${id}` },
            { text: "[Eletrodoméstico] vendas", callback_data: `CADASTRO_[Eletrodomestico]_${id}` },
          ],
          [
            { text: "[Automotivo] vendas", callback_data: `CADASTRO_[Automotivo]_${id}` },
            { text: "[Audio] vendas", callback_data: `CADASTRO_[Audio]_${id}` },
            { text: "[Eletroportátil] vendas", callback_data: `CADASTRO_[Eletroportatil]_${id}` },
          ],
          [
            { text: "[Ferramenta] vendas", callback_data: `CADASTRO_[Ferramenta]_${id}` },
            { text: "[Bebida] vendas", callback_data: `CADASTRO_[Bebida]_${id}` },
            { text: "[Bebê] vendas", callback_data: `CADASTRO_[Bebe]_${id}` },
          ],
          [
            { text: "[Esporte] vendas", callback_data: `CADASTRO_[Esporte]_${id}` },
            { text: "[Smart TV] vendas", callback_data: `CADASTRO_[Smart-TV]_${id}` },
            { text: "[Ar e Ventilação] vendas", callback_data: `CADASTRO_[Ar-e-Ventilacao]_${id}` },
          ],
          [
            { text: "[Imóvel] vendas", callback_data: `CADASTRO_[Imovel]_${id}` },
            { text: "[Brinquedo] vendas", callback_data: `CADASTRO_[Brinquedo]_${id}` },
            { text: "[Informática] vendas", callback_data: `CADASTRO_[Informatica]_${id}` },
          ],
          [
            { text: "[Game] vendas", callback_data: `CADASTRO_[Game]_${id}` },
            { text: "[Móvel] vendas", callback_data: `CADASTRO_[Movel]_${id}` },
            { text: "[Utilidade Doméstica] vendas", callback_data: `CADASTRO_[Utilidade-Domestica]_${id}` },
          ],
          [
            { text: "[Material Escolar] vendas", callback_data: `CADASTRO_[Material-Escolar]_${id}` },
          ],          
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

                await bot.sendMessage(id_telegram, `Alerta: ✅ ${alerta.palavra_chave} ✅ cadastrado com sucesso!`,
               {
               reply_markup: {
                 inline_keyboard: [
                    [
                      { text: "ALERTAS", callback_data: `ALERTAS`},
                      { text: "DELETAR", callback_data: `DELETAR_${texto_split[2].id}`},
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
              const alerta = await Deletar_alerta_service(texto_split[1])
              await bot.sendMessage(id_telegram, `Alerta Deletado com sucesso!`);
              bot.deleteMessage(id_telegram, messageId)
            }  

            if(texto_split[0]==='ALERTAS'){
              const alerta = await Consultas_alertasService(user.id)

              await bot.sendMessage(id_telegram, `Aguarde estamos procurando seus alertas...`);
              bot.deleteMessage(id_telegram, messageId)

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
                  bot.deleteMessage(id_telegram, messageId)
                }
              }else{
                await bot.sendMessage(id_telegram, `Você não tem alertas cadastrados!`);
                bot.deleteMessage(id_telegram, messageId)
              }
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

    /**bold \*text*
_italic \*text_
__underline__
~strikethrough~
||spoiler||
*bold _italic bold ~italic bold strikethrough ||italic bold strikethrough spoiler||~ __underline italic bold___ bold*
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
![👍](tg://emoji?id=5368324170671202286)
`inline fixed-width code`
```
pre-formatted fixed-width code block
```
```python
pre-formatted fixed-width code block written in the Python programming language
```
>Block quotation started
>Block quotation continued
>The last line of the block quotation*/ 
    
    bot.on('message', async (msg) => {
      // console.log(msg)
      const id_telegram = msg.chat.id.toString();
      const texto = msg.text ||' ';
      const name = msg.chat.first_name;
      const username = msg.chat.username;

      const msg_del = await bot.sendMessage(id_telegram, 'Aguarde...'); 
      const messageId = msg_del.message_id.toString()  

//       try {      
//         // Enviar msg para os grupos
//         const msg_grupo = await axios.post(`https://api.telegram.org/bot${botVenda}/sendMessage`, {
//           parse_mode: 'Markdown',
//           chat_id: grupo.id_grupo,
//           text: `
// Interessado em vender ${produto?.descricao}

// Valor ${(parseInt(valor)/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
      
// Clique [${123}](https://t.me/BDMilquerocomprar_bot?start=${111}) para visitar o site de exemplo.

// ${recomendado>0?`Recomendado por mais de ${recomendado} pessoas`:`Ainda não recomendado`}

// ${desaconselhado>0?`desaconselhado por ${desaconselhado} pessoas ${desaconselhado} pessoas`:`Não desaconselhado ainda por ostros usuários`}

// Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

// Conta verificada ✅

// Membro desde ${moment(user?.created_at).format('DD-MM-YYYY')}      
//       `,    
//         });
//         await prisma_db.pedidos.update({
//           where:{id:pedido.id},
//           data:{msg_id:msg_grupo.data.result.message_id}
//         })     
//       } catch (error) {
//         console.log('Erro 01');
//       }

      const user = await prisma_db.users.findUnique({
        where: { id_telegram: id_telegram?.toString() },
      })
      if (user) {
        if (username) {

          const msg_alerta = texto?texto.split(' '):''
        
          if(
            ['alerta','alertas'].includes(msg_alerta[0].toLowerCase())
            &&msg_alerta[1]!=''
            ){

            if(msg_alerta[1]!=undefined){

              const palavra_chave = msg_alerta[1]
              const user_id = user.id

              const alerta = await Cadastar_palavra_chave_service(palavra_chave, user_id, id_telegram)

              await bot.sendMessage(id_telegram, `De qual grupo você gostaria de receber alertas?`);
              await bot.sendMessage(id_telegram, `Artigos Militares`, artigos_militares(alerta.id));
              await bot.sendMessage(id_telegram, `Artigos Civis`, artigos_civis(alerta.id));
              bot.deleteMessage(id_telegram, messageId)  

            }else{              
              await bot.sendMessage(id_telegram, `Forneça uma palavra válida`);
              bot.deleteMessage(id_telegram, messageId)
            }

          }else{

          await bot.sendMessage(id_telegram, `

Cadastre seus alertas - configuração enviar a palavra alerta com espaço e depois colocar uma palavra chave

Exemplo:

Alerta boots
            
          `); 
          bot.deleteMessage(id_telegram, messageId)
          }      
         
        }else{
          // Melhorar msg
          await bot.sendMessage(id_telegram, `⚠️ É necessário cadastrar um UserName do Telegram, para dar continuidade no Balcão.`);
          bot.deleteMessage(id_telegram, messageId)
        }
      }else{
        //fazer cadastro
      }
    });
  }
}
export { Bot_bd_mil_alertas };