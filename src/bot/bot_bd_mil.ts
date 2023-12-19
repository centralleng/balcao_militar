process.env["NTBA_FIX_319"] = "0";
import TelegramBot from "node-telegram-bot-api";
import { prisma_db } from "../database/prisma_db";
import { cpf } from 'cpf-cnpj-validator'; 
import validator from 'validator';
import { text } from "body-parser";

const token_bot = "6886561681:AAEL0_4SPcmWNV3_l9Nys0fe3Q2N2_9b--I"; // CentrallTest1

const bot = new TelegramBot(token_bot, { polling: true });

// export function envioalerta(dados){
//   console.log(dados)
//   bot.sendMessage(dados.chatId, dados.adresp);
// }

class Bot_bd_mil {
  static execute() {
    const termo = `
Olá! Bem-vindo ao Balcão dos militares (BDMil). Esse Balcão tem por objetivo facilitar a transação comercial de artigos militares e de “artigos civis”, novos ou usados, entre os integrantes das FFAA e Forças Singulares, da ativa (de carreira ou temporários) e da reserva (remunerada ou não), incluindo os pensionistas e os reformados de todo o Brasil.

1) Esse Balcão encontra-se na plataforma Telegram e está certificado. O Balcão é automatizado por intermédio de Bots e os usuários devem possuir uma conta no Telegram com seu respectivo Nome de usuário e com uma foto atualizada.

2) Dentro dos Balcões você encontrará diversas ofertas de vendas de produtos/serviços com as orientações para comprá-los, bem como para fazer uma nova oferta.

3) O cadastro no @BDMil é GRATUITO E VOLUNTÁRIO. É só seguir as orientações constantes no mesmo para validá-lo.

4) Após o cadastro no BDMil, será disponibilizado link para o Balcão TUTORIAIS, que terá vídeos com cada processo.

5) No robô de cadastro de vendas (@BDMilquerovender), o cadastro da PRIMEIRA oferta de venda de CADA USUÁRIO será GRATUITA, a fim de familiarizar o vendedor com o processo e para criar o fluxo de negócios nos balcões. Essa oferta permanecerá ativa por 1(um) mês. Caso for negociada, o vendedor se dirige ao robô do cadastro e digita VENDIDO e o número correspondente à oferta para excluí-la do Balcão. 

6) Do segundo cadastro em diante, será cobrada uma comissão de 3% sobre o valor de cada oferta. A oferta ficará disponível no respectivo balcão por 3 (três) meses, podendo o usuário, nesse período, MODIFICAR, EXCLUIR e ATUALIZAR a mesma, a fim de trazê-la para o dia em questão. Caso o vendedor exclua ou mude o preço, não poderá solicitar reembolso do valor pago. Caso tenha negociado, o vendedor fará o mesmo procedimento de acima descrito.

7) Para ofertar a VENDA de veículos e imóveis, a comissão será de 0,1%, sobre o valor ofertado, UMA ÚNICA VEZ. A oferta ficará disponível por um período de 6 (seis) meses. Da mesma forma que o processo anterior, o ofertante poderá realizar alterações que achar necessárias.

8) Para a oferta de serviços, será cobrada uma comissão única de 6 (seis) reais para cada. O processo se dá da mesma forma que o de veículos e imóveis.

9) Caso o comprador aceite negociar a oferta, clicando no @BDMilquerocomprar, o vendedor e o comprador receberão um alerta da negociação nos robôs correspondentes, que darão as instruções para dar continuidade da negociação.

10) O comprador de um produto, poderá buscar as ofertas de forma mais específica, por intermédio do @BDMilALERTAS, respondendo às perguntas dele. Ato contínuo, receberá em sua conta todas as ofertas lançadas do produto pretendido, em tempo real. Poderão ser realizadas buscas mais refinadas dentro do link “buscar” do respectivo Balcão. O acesso ao @BDMilALERTAS estará no link abaixo de cada oferta nos Balcões de vendas.

11) A negociação é LIVRE, conforme várias plataformas de marketplace. É nesse momento que as partes procuram refinar as informações de si mesmas, a fim de realizar uma negociação segura. Nesse momento é a hora de expor vídeos e mais descrições do produto, bem como a forma de pagamento e a entrega. No final de cada negociação os usuários devem aconselhar ou desaconselhar o vendedor ou o comprador, para dar cada vez mais credibilidade às negociações.

12) Será disponibilizado também um usuário suporte @BDMilsuporte para dúvidas que ainda existam.

13) Teremos também o BDMil SUGESTÕES para que a equipe possa melhorar cada vez mais o sistema.

14) O BDMil GOVERNANÇA E GESTÃO, conterá o plano de Gestão e as estatísticas, caso o usuário queira verificar a dimensão e a evolução do sistema.

15) Lembrando que o Balcão é um facilitador para aquisição ou venda de produtos entre militares, pensionistas. Pode ser estendido à familiares e amigos, porém sempre utilizando a conta do militar. A negociação é livre e de responsabilidade dos usuários, sob pena de exclusão sumária do sistema.
    `;
    // const termos_uso = {
    //   reply_markup: {
    //     inline_keyboard: [
    //       [{ text: 'Opção 1', callback_data: '1' }],
    //       // Adicione mais opções conforme necessário
    //     ],
    //   },
    // };

    const termos_uso: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [[{ text: "Sim", callback_data: "sim" }]],
      },
    };

    const instituicao: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
        [
          { text: "EB", callback_data: "EB" },
          { text: "MB", callback_data: "MB" },
          { text: "FAB", callback_data: "FAB"},
        ],
        [
          { text: "PMERJ", callback_data: "PMERJ"},
          { text: "CBMERJ", callback_data: "CBMERJ"},
          { text: "PMDF", callback_data: "PMDF"},
        ],
      ],
        
      },
    };

    const grupos: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
        [
          { text: "[EB Balcão vendas]", url: "https://t.me/+U78s3c8_alY1NjNh"},
          { text: "[MB Balcão vendas]", url: "https://t.me/+U78s3c8_alY1NjNh" },
          { text: "[FAB Balcão vendas]", url: "https://t.me/+U78s3c8_alY1NjNh"},
        ],
        [
          { text: "[PMERJ Balcão vendas]", url: "https://t.me/+U78s3c8_alY1NjNh"},
          { text: "[CBMERJ Balcão vendas]", url: "https://t.me/+U78s3c8_alY1NjNh"},
          { text: "[PMDF Balcão vendas]", url: "https://t.me/+U78s3c8_alY1NjNhF"},
        ],
      ],
        
      },
    };

    // Manipular callback_query
    bot.on("callback_query", async (callbackQuery: TelegramBot.CallbackQuery) => {
      const msg = callbackQuery.data;
      const chatId = callbackQuery.message?.chat.id;
      const username = callbackQuery.message?.chat.username; 
      const id_telegram = chatId || ''

      if(msg==='sim'){ // Aceita o termo de uso 

        // Primeiro verifica se ja axiste esse usuário
        const user = await prisma_db.users.findUnique({
          where:{id_telegram:id_telegram?.toString()}
        })

        if(!user){ 
          await prisma_db.users.create({
            data:{
              id_telegram: id_telegram?.toString(),
              username: username,
              termo:true
            }  
          })
          
        bot.sendMessage(id_telegram,`
Vamos fazer seu cadastro: 

Qual sua instituição.           
        ` 
        ,instituicao);
        }else{
        bot.sendMessage(id_telegram,`
Vamos fazer seu cadastro: 

Qual sua instituição.           
                  ` 
        ,instituicao);
        }   
      }

      if(msg!='sim'){

        // Primeiro verifica se ja axiste esse usuário
        const user = await prisma_db.users.findUnique({
          where:{id_telegram:id_telegram?.toString()}
        })

        if(user?.instituicao===null){

          await prisma_db.users.update({
            where:{id_telegram: id_telegram?.toString()},
            data:{instituicao: msg}
          })
         
          bot.sendMessage(id_telegram, `Digite seu nome completo`);
                     
        }else{
          // Fazer varredura em todas as condicionais
        }
      }
    });

    bot.on("message", async (msg) => {
      // console.log(msg);

      const id_telegram = msg.chat.id.toString();
      const texto = msg.text;
      // const name = msg.chat.first_name;
      // const username = msg.chat.username;

      const req = await prisma_db.users.findUnique({
        where:{id_telegram:id_telegram}
      })

      if(!req){ // Primeiro contato com o bot  
      await bot.sendMessage(id_telegram, termo);
      bot.sendMessage(id_telegram,"Eu li e concordo com os termos de uso:",termos_uso);
      //colocar um botão de OK aqui!!        
      }else{
        if(req.termo){
          if(req.instituicao===null){              
            // Qual seu cpf
          bot.sendMessage(id_telegram,`
Vamos fazer seu cadastro: 

Qual sua instituição.           
          `,instituicao);
          return
          }     
          if(req.nome===null){  
            // updata no banco salvando nome
            await prisma_db.users.update({
              where:{id_telegram: id_telegram},
              data:{nome: texto}
            })
            // Qual seu cpf
            await bot.sendMessage(id_telegram, `Ok`);
            bot.sendMessage(id_telegram, `Qual o seu CPF?`);
            return
          }
          if(req.document===null){

            function contemApenasNumeros(str: string){
              const req = /^\d+$/.test(str)
              return req
            }        

            if(!contemApenasNumeros(texto||'')){
              bot.sendMessage(id_telegram, `Você precisa digitar somente números`);
            }else{
                 // verifica se é um número válido
            const verificar_cpf = texto||''
            const status_cpf = cpf.isValid(verificar_cpf);

            if(status_cpf){
              // updata no banco cpf
            await prisma_db.users.update({
              where:{id_telegram: id_telegram},
              data:{type_document:'cpf',document: verificar_cpf.replace(/[^0-9]/g, ''),}
            })
               // quer editar o cadastro
            bot.sendMessage(id_telegram, `Digite um emal?`);
            }else{
              bot.sendMessage(id_telegram, `Você precisa digitar um CPF válido`);
            }  
            }
            return
          }
          if(req.email===null||req.email===''){  

            const email = texto||''
            
            function Validador_email(email: string) {
              const emailValido = validator.isEmail(email);
              console.log(emailValido)
              return emailValido
            }

            if(Validador_email(email)){          
            await prisma_db.users.update({
              where:{id_telegram: id_telegram},
              data:{email: texto}
            })
            bot.sendMessage(id_telegram,`
            Parabéns: 
            
            Grupos.           
                    ` 
                    ,grupos);

            }{
              bot.sendMessage(id_telegram, `Você precisa digitar um email válido`);
            }          

            return
          }

        }

      }
    });
  }
}

export { Bot_bd_mil };



