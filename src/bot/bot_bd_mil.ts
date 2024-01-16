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
    const termo1 = `
    Olá, bem\\-vindo ao Balcão dos militares *\\(BDMil\\)*\\. Esse Balcão tem por objetivo facilitar a transação comercial de artigos militares e de “artigos civis”, novos ou usados, entre os integrantes das FFAA e Forças Singulares, da ativa \\(de carreira ou temporários\\) e da reserva \\(remunerada ou não\\), incluindo os pensionistas e os reformados de todo o Brasil\\.

    *1\\)* Esse Balcão encontra\\-se na plataforma Telegram e está certificado\\. O Balcão é automatizado por intermédio de Bots e os usuários devem possuir uma conta no Telegram com seu respectivo Nome de usuário e com uma foto atualizada\\.
    
    *2\\)* Dentro dos Balcões você encontrará diversas ofertas de vendas de produtos/serviços com as orientações para comprá\\-los, bem como para fazer uma nova oferta\\.
    
    *3\\)* O cadastro no *@BDMil* é GRATUITO E VOLUNTÁRIO\\. É só seguir as orientações constantes no mesmo para validá\\-lo\\.
    
    *4\\)* Após o cadastro no BDMil, será disponibilizado link para o Balcão TUTORIAIS, que terá vídeos com cada processo\\.
    
    *5\\)* No robô de cadastro de vendas *\\(@BDMilquerovender\\)*, o cadastro da PRIMEIRA oferta de venda de CADA USUÁRIO será GRATUITA, a fim de familiarizar o vendedor com o processo e para criar o fluxo de negócios nos balcões\\. Essa oferta permanecerá ativa por 1\\(um\\) mês\\. Caso for negociada, o vendedor se dirige ao robô do cadastro e digita VENDIDO e o número correspondente à oferta para excluí\\-la do Balcão\\. 
    
    *6\\)* Do segundo cadastro em diante, será cobrada uma comissão de 3% sobre o valor de cada oferta\\. A oferta ficará disponível no respectivo balcão por 3 \\(três\\) meses, podendo o usuário, nesse período, MODIFICAR, EXCLUIR e ATUALIZAR a mesma, a fim de trazê\\-la para o dia em questão\\. Caso o vendedor exclua ou mude o preço, não poderá solicitar reembolso do valor pago\\. Caso tenha negociado, o vendedor fará o mesmo procedimento de acima descrito\\.
        `;
    const termo2 = `
    
    *7\\)* Para ofertar a VENDA de veículos e imóveis, a comissão será de 0,1%, sobre o valor ofertado, UMA ÚNICA VEZ\\. A oferta ficará disponível por um período de 6 \\(seis\\) meses\\. Da mesma forma que o processo anterior, o ofertante poderá realizar alterações que achar necessárias\\.
    
    *8\\)* Para a oferta de serviços, será cobrada uma comissão única de 6 \\(seis\\) reais para cada\\. O processo se dá da mesma forma que o de veículos e imóveis\\.
    
    *9\\)* Caso o comprador aceite negociar a oferta, clicando no *@BDMilquerocomprar*, o vendedor e o comprador receberão um alerta da negociação nos robôs correspondentes, que darão as instruções para dar continuidade da negociação\\.
    
    *10\\)* O comprador de um produto, poderá buscar as ofertas de forma mais específica, por intermédio do *@BDMilALERTAS*, respondendo às perguntas dele\\. Ato contínuo, receberá em sua conta todas as ofertas lançadas do produto pretendido, em tempo real\\. Poderão ser realizadas buscas mais refinadas dentro do link “buscar” do respectivo Balcão\\. O acesso ao @BDMilALERTAS estará no link abaixo de cada oferta nos Balcões de vendas\\.
    
    *11\\)* A negociação é LIVRE, conforme várias plataformas de marketplace\\. É nesse momento que as partes procuram refinar as informações de si mesmas, a fim de realizar uma negociação segura\\. Nesse momento é a hora de expor vídeos e mais descrições do produto, bem como a forma de pagamento e a entrega\\. No final de cada negociação os usuários devem aconselhar ou desaconselhar o vendedor ou o comprador, para dar cada vez mais credibilidade às negociações\\.
    
    *12\\)* Será disponibilizado também um usuário suporte *@BDMilsuporte* para dúvidas que ainda existam\\.
    
    *13\\)* Teremos também o BDMil SUGESTÕES para que a equipe possa melhorar cada vez mais o sistema\\.
    
    *14\\)* O BDMil GOVERNANÇA E GESTÃO, conterá o plano de Gestão e as estatísticas, caso o usuário queira verificar a dimensão e a evolução do sistema\\.
    
    *15\\)* Lembrando que o Balcão é um facilitador para aquisição ou venda de produtos entre militares, pensionistas\\. Pode ser estendido à *familiares e amigos, porém sempre utilizando a conta do militar*\\. A negociação é livre e de responsabilidade dos usuários, sob pena de exclusão sumária do sistema\\.
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
        [
          { text: "CBMDF", callback_data: "CBMDF"},
          { text: "PMESP", callback_data: "PMESP"},
          { text: "CBMESP", callback_data: "CBMESP"},
        ],
        [
          { text: "PMMG", callback_data: "PMMG"},
          { text: "CBMMG", callback_data: "CBMMG"},
          { text: "PMGO", callback_data: "PMGO"},
        ],
        [
          { text: "CBMGO", callback_data: "CBMGO"},
          { text: "PMPR", callback_data: "PMPR"},
          { text: "CBMPR", callback_data: "CBMPR"},
        ],
        [
          { text: "PMSC", callback_data: "PMSC"},
          { text: "CBMSC", callback_data: "CBMSC"},
          { text: "BRIGADA MILITAR", callback_data: "BRIGADA MILITAR"},
        ],
        [
          { text: "CBMRS", callback_data: "CBMRS"},
          { text: "PMMS", callback_data: "PMMS"},
          { text: "CBMMS", callback_data: "CBMMS"},
        ],
        [
          { text: "PMMT", callback_data: "PMMT"},
          { text: "CBMMT", callback_data: "CBMMT"},
          { text: "PMBA", callback_data: "PMBA"},
        ],
        [
          { text: "CBMBA", callback_data: "CBMBA"},
          { text: "PMES", callback_data: "PMES"},
          { text: "CBMES", callback_data: "CBMES"},
        ],
        [
          { text: "PMAL", callback_data: "PMAL"},
          { text: "CBMAL", callback_data: "CBMAL"},
          { text: "PMSE", callback_data: "PMSE"},
        ],
        [
          { text: "CBMSE", callback_data: "CBMSE"},
          { text: "PMPE", callback_data: "PMPE"},
          { text: "CBMPE", callback_data: "CBMPE"},
        ],
        [
          { text: "PMRN", callback_data: "PMRN"},
          { text: "CBMRN", callback_data: "CBMRN"},
          { text: "PMCE", callback_data: "PMCE"},
        ],
        [
          { text: "CBMCE", callback_data: "CBMCE"},
          { text: "PMPI", callback_data: "PMPI"},
          { text: "CBMPI", callback_data: "CBMPI"},
        ],
        [
          { text: "PMMA", callback_data: "PMMA"},
          { text: "CBMMA", callback_data: "CBMMA"},
          { text: "PMAM", callback_data: "PMAM"},
        ],
        [
          { text: "CBMAM", callback_data: "CBMAM"},
          { text: "PMAP", callback_data: "PMAP"},
          { text: "CBMAP", callback_data: "CBMAP"},
        ],
        [
          { text: "PMERO", callback_data: "PMERO"},
          { text: "CBMERO", callback_data: "CBMERO"},
          { text: "PMTO", callback_data: "PMTO"},
        ],
        [
          { text: "CBMTO", callback_data: "CBMTO"},
          { text: "PMAC", callback_data: "PMAC"},
          { text: "CBMAC", callback_data: "CBMAC"},
        ],
        [
          { text: "PMPA", callback_data: "PMPA"},
          { text: "CBMPA", callback_data: "CBMPA"},
          { text: "PMRR", callback_data: "PMRR"},
        ],
        [
          { text: "CBMRR", callback_data: "CBMRR"},
          { text: "PMPB", callback_data: "PMPB"},
          { text: "CBMPB", callback_data: "CBMPB"},
        ],
      ],        
      },
    };

    const grupos: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
        [
          { text: "[EB Balcão vendas]", url: "https://t.me/"},
          { text: "[MB Balcão vendas]", url: "https://t.me/" },
          { text: "[FAB Balcão vendas]", url: "https://t.me/"},
        ],
        [
          { text: "[PMERJ Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMERJ Balcão vendas]", url: "https://t.me/"},
          { text: "[PMDF Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[CBMDF Balcão vendas]", url: "https://t.me/"},
          { text: "[PMESP Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMESP Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[PMMG Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMMG Balcão vendas]", url: "https://t.me/"},
          { text: "[PMGO Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[CBMGO Balcão vendas]", url: "https://t.me/"},
          { text: "[PMPR Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMPR Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[PMSC Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMSC Balcão vendas]", url: "https://t.me/"},
          { text: "[BRIGADA MILITAR Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[CBMRS Balcão vendas]", url: "https://t.me/"},
          { text: "[PMMS Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMMS Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[PMMT Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMMT Balcão vendas]", url: "https://t.me/"},
          { text: "[PMBA Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[CBMBA Balcão vendas]", url: "https://t.me/"},
          { text: "[PMES Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMES Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[PMAL Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMAL Balcão vendas]", url: "https://t.me/"},
          { text: "[PMSE Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[CBMSE Balcão vendas]", url: "https://t.me/"},
          { text: "[PMPE Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMPE Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[PMRN Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMRN Balcão vendas]", url: "https://t.me/"},
          { text: "[PMCE Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[CBMCE Balcão vendas]", url: "https://t.me/"},
          { text: "[PMPI Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMPI Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[PMMA Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMMA Balcão vendas]", url: "https://t.me/"},
          { text: "[PMAM Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[CBMAM Balcão vendas]", url: "https://t.me/"},
          { text: "[PMAP Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMAP Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[PMRO Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMRO Balcão vendas]", url: "https://t.me/"},
          { text: "[PMTO Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[CBMTO Balcão vendas]", url: "https://t.me/"},
          { text: "[PMAC Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMAC Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[PMPA Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMPA Balcão vendas]", url: "https://t.me/"},
          { text: "[PMRR Balcão vendas]", url: "https://t.me/F"},
        ],
        [
          { text: "[CBMRR Balcão vendas]", url: "https://t.me/"},
          { text: "[PMPB Balcão vendas]", url: "https://t.me/"},
          { text: "[CBMPB Balcão vendas]", url: "https://t.me/F"},
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
Vamos dar início ao seu cadastro:

A qual instituição você pertence?          
        ` 
        ,instituicao);
        }else{
        bot.sendMessage(id_telegram,`
Vamos dar início ao seu cadastro: 

A qual instituição você pertence?      
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
         
          bot.sendMessage(id_telegram, `Digite seu nome completo:`);
                     
        }else{
          // Fazer varredura em todas as condicionais
        }
      }
    });

    bot.on("message", async (msg) => {
      // console.log(msg);

      const id_telegram = msg.chat.id.toString();
      const texto = msg.text;
      const name = msg.chat.first_name;
      const username = msg.chat.username;

      const req = await prisma_db.users.findUnique({
        where:{id_telegram:id_telegram}
      })

      if(!req){ // Primeiro contato com o bot  
      await bot.sendMessage(id_telegram, termo1, {parse_mode: 'MarkdownV2'});
      await bot.sendMessage(id_telegram, termo2, {parse_mode: 'MarkdownV2'});
      bot.sendMessage(id_telegram,"Eu li e concordo com os termos de uso:",termos_uso);
      //colocar um botão de OK aqui!!        
      }else{
        if(req.termo){
          if(req.instituicao===null){              
            // Qual seu cpf
          bot.sendMessage(id_telegram,`
Vamos dar início ao seu cadastro: 

A qual instituição você pertence?           
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
              bot.sendMessage(id_telegram, `Você precisa digitar somente números!`);
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
            bot.sendMessage(id_telegram, `Qual o seu e-mail?`);
            }else{
              bot.sendMessage(id_telegram, `Você precisa digitar um CPF válido!`);
            }  
            }
            return
          }
          if(req.email===null||req.email===''){  

            const email = texto||''
            
            function Validador_email(email: string) {
              const emailValido = validator.isEmail(email);            
              return emailValido
            }

            if(Validador_email(email)){          
            await prisma_db.users.update({
              where:{id_telegram: id_telegram},
              data:{email: texto}
            })
            bot.sendMessage(id_telegram,`
Prontinho, seu cadastro foi realizado com sucesso!! 🥳
Segue abaixo os Balcões que você pode acessar para comprar ou vender um produto!
            
            ` 
                    ,grupos);

            }else{
              bot.sendMessage(id_telegram, `Você precisa digitar um e-mail válido!`);
            }          

            return
          }
          else{
            bot.sendMessage(id_telegram,`
Prontinho, seu cadastro foi realizado com sucesso!! 🥳
Segue abaixo os Balcões que você pode acessar para comprar ou vender um produto!
            
            ` 
                    ,grupos);
          }

        }

      }
    });
  }
}

export { Bot_bd_mil };