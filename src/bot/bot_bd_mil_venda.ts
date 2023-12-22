process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';
import Pagamento from '../services/pagamentos/pagamento_produto';

const token_bot = '6962343359:AAERsmVCjSJczzeQ-ONe_nfVyQxQYDzFYlg'; // Token do bot do telegram... CentrallTest2_Bot

const bot = new TelegramBot (token_bot, {polling: true});

class Bot_bd_mil_venda{
  static execute() {   

const instituicao: TelegramBot.SendMessageOptions = {
reply_markup: {
inline_keyboard: [
[
{ text: "EB", callback_data: "EB"},
{ text: "MB", callback_data: "MB"},
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

const botao_inicial: TelegramBot.SendMessageOptions = {
reply_markup: {
inline_keyboard: [
[
{ text: "VENDER", callback_data: "VENDER"},
// { text: "MEUS PRODUTOS", callback_data: "MEUS_PRODUTOS"},
],
[ 
{ text: "SUPORTE", url: "https://t.me/"},
{ text: "TUTORIAL", callback_data: "https://t.me/"},
],
],      
},
};

const msg_deletar_produto: TelegramBot.SendMessageOptions = {
reply_markup: {
inline_keyboard: [
[
{ text: "DELETAR", callback_data: "DELETAR_PRODUTO"},
],
],      
},
};

const descarta_produto: TelegramBot.SendMessageOptions = {
  reply_markup: {
  inline_keyboard: [
  [
  { text: "VOLTAR DO INÍCIO", callback_data: "DELETAR_PRODUTO"},
  ],
  ],      
  },
  };

const suporte: TelegramBot.SendMessageOptions = {
  reply_markup: {
  inline_keyboard: [
  [
  { text: "SUPORTE", url: "https://t.me/"},
  ],
  ],      
  },
  };

const artigos_militares: TelegramBot.SendMessageOptions = {
reply_markup: {
inline_keyboard: [
  [
    { text: "EB", callback_data: "CADASTRO_EB"},
    { text: "MB", callback_data: "CADASTRO_MB"},
    { text: "FAB", callback_data: "CADASTRO_FAB"},
    ],
],      
},
};

const artigos_civis: TelegramBot.SendMessageOptions = {
reply_markup: {
inline_keyboard: [
[
{ text: "Veículo", callback_data: "CADASTRO_VEICULO"},
{ text: "Serviço", callback_data: "CADASTRO_SERVICO"},
{ text: "smartphone", callback_data: "CADASTRO_SMARTPHONE"},
],
],      
},
};

const texto_inicial = `
⚠️ Atenção, esse local é feito para ofertar a VENDA de produtos, esse é o formato.
`

const atencao = `
❗️O balcão é monitorado e os procedimentos são assistidos. Boas práticas em todo o processo é essencial. Não serão emitidos alertas ou advertências prévias antes de qualquer exclusão de usuário.
`

const categoria = `
✔️Opa! Qual Departamento se encaixa o produto? (referencial comparativo de artigos civis: Ponto Frio) 
`

const formato_venda = `
Interessado em vender (fardamento)

Coturno extra leve, preto, 1 par, bom estado, número 42.

Valor R$ 100.50

Envie o código 1978654 para @BDMilquerocomprar para comprar dele.
Recomendado por mais de 70 pessoas/ Ainda não recomendado (dados do vendedor)

Não desaconselhado ainda por ostros usuários/desaconselhado por 2 pessoas (dados do vendedor)

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

Conta verificada

Membro desde 15 mês ano
`

const descricao = `
Descreva de forma sucinta o produto que você quer ofertar, incluindo obrigatoriamente a quantidade (um ou 1 par) e a cor. NÃO coloque o valor nesse momento (máximo 150 caracteres). SÓ coloque ponto no fim.
`

const valor = `
Qual valor pretendido? (escreva somente números. Caso haja centavos coloque ponto)

Exemplos:

Para R$ 1 real -> 1.00
Para R$ 10 reais -> 10.00
Para R$ 1 mil reais -> 1000.00

Exemplos com os centavos:

Para R$ 1 real e vinte centavos -> 1.20
Para R$ 10 reais e vinte centavos -> 10.20
Para R$ 1 mil reais e vinte centavos -> 1000.20
`

const produto_criado = `
✔️Oferta de venda cadastrada, se quiser cadastrar uma nova me avisa
💡 Quando for decidir em comprar ou vender o produto/serviço, avalie também as recomendações.
🤝 Gostaria de lembrar a importância de honrar acordos com o vendedor ou comprador no Balcão, depois de selar o acordo até a entrega do produto.
❌ O mau comportamento pode acarretar a exclusão do Balcão.
`
  // Manipular callback_query
  bot.on("callback_query", async (msg:any) => {
      // console.log("callback_query",msg)
      const texto = msg.data;
      const id_telegram = msg.message?.chat.id;
      const username = msg.message?.chat.username;
      const message_id = msg.message?.message_id;
      const texto_split = texto.split('_')
    
      // Primeiro verifica se ja axiste esse usuário
      const user = await prisma_db.users.findUnique({
        where: { id_telegram: id_telegram?.toString() },
        include: {
          produto: {
            orderBy: { id: 'desc' },
            take: 1, // Apenas o último produto
          },
        },
      });

      if(!user){
        bot.sendMessage(id_telegram, `Primeiro precisar fazer seu cadastro`);
        return
      }    
  
      if(username===null){
        bot.sendMessage(id_telegram, `Cadastre um User Name`);
      }else{

    if(texto==='VENDER'){ // Entra no fluxo de venda basta criar um produto e não finalizar o processo, so vai parar quando finalizar ou cancelar -> cancelar seguinifica apagar o produto.
       if(!user.produto[0]||user.produto[0].status){ // so vai criar um produto se ele não estiver nenhum pendente.
        if(user){
          await prisma_db.produtos.create({
            data:{
              user_id: user?.id   
            }
          })
        }
        await bot.sendMessage(id_telegram, `Artigos Militáres`, artigos_militares);
        await bot.sendMessage(id_telegram, `Artigos Civis`, artigos_civis);

       }else{
        bot.sendMessage(id_telegram, `Você precisa finalizar o produto que vc deu inicio na criação ou deletar`, msg_deletar_produto);
       }      
    }

    if(texto==='MEUS_PRODUTOS'){ // Listar todo os produtos cadastrados 
      
    }

    if(texto==='DELETAR_PRODUTO'){ // Listar todo os produtos cadastrados 
      if(user.produto[0]&&!user.produto[0].status){
        await prisma_db.produtos.delete({
          where:{id: user.produto[0].id}
        })
        bot.sendMessage(id_telegram, `Produto deletado com sucesso!`, botao_inicial);
      }else{
        bot.sendMessage(id_telegram, `Algo deu errado, entre em contato com o suporte`, suporte);
      }
    }

    if(texto_split[0]==='CADASTRO'){ // Listar todo os produtos cadastrados       
      try {
        await prisma_db.produtos.update({
          where:{id:user.produto[0].id},
          data:{
            categoria:texto_split[1]
          }
        })
        bot.sendMessage(id_telegram, descricao, descarta_produto);        
      } catch (error) {
        bot.sendMessage(id_telegram, `Ops algo deu errado o que você pretende fazer?`, botao_inicial); 
      }
    }    
    }
  });

  bot.on('message', async (msg:any) => {
    // console.log('message', msg.text)    
    const id_telegram = msg.chat.id.toString();
    const texto = msg.text;
    const name = msg.chat.first_name;
    const username = msg.chat.username;
    const message_id = msg.message_id; 

      // Primeiro verifica se ja axiste esse usuário
      const user = await prisma_db.users.findUnique({
        where: { id_telegram: id_telegram?.toString() },
        include: {
          produto: {
            orderBy: { id: 'desc' },
            take: 1, // Apenas o último produto
          },
        },
      });

    if(!user){
      bot.sendMessage(id_telegram, `Primeiro precisar fazer seu cadastro`);
      return
    }

    if(username===null){
      bot.sendMessage(id_telegram, `Cadastre um User Name`);
    }else{
      // Inicio dos comandos /////////////////////////////////////////////
      if(username!=user?.username){ // So estou atualizando o user name no banco de dados mais nada.
        await prisma_db.users.update({
          where:{id: user?.id},
          data:{username:username}
        })
      }    
      
      if(user.produto.length===0){
        await bot.sendMessage(id_telegram, texto_inicial);
        await bot.sendMessage(id_telegram, formato_venda);
        await bot.sendMessage(id_telegram, atencao);
        bot.sendMessage(id_telegram, 'Escolha sua ação', botao_inicial);
        return
      }

      if(user.produto&&!user.produto[0].status){
        // if(user.produto&&user.produto[0].descricao===null){
        //   bot.sendMessage(id_telegram, descricao, descarta_produto); 
        //   return
        // }
        if(user.produto&&user.produto[0].valor_produto===null){        
          try {
            await prisma_db.produtos.update({
              where:{id:user.produto[0].id},
              data:{
                valor_produto: parseFloat(texto) 
              }
            })            
          bot.sendMessage(id_telegram, valor, descarta_produto); 
          return       
          } catch (error) {
            bot.sendMessage(id_telegram, `Ops algo deu errado escreca sua descrição novamente`); 
          } 
          return
        }
        // if(user.produto&&!user.produto[0].status){

        //   const documento = user.document||''
        //   const valor_produto = parseFloat(texto) 

        //   const pagamento = await Pagamento(documento, valor_produto)
        //   console.log(pagamento)

        //   bot.sendMessage(id_telegram, 'Faça o pagamento ',           
        //   {reply_markup: {
        //     inline_keyboard: [
        //     [
        //     { text: "PAGAR", url: pagamento},
        //     ],
        //     ],      
        //     },
        //   }
        //   );
        //   return
        // }
      }else{
        bot.sendMessage(id_telegram, 'Escolha sua ação', botao_inicial);
      }


    



  























    } 
  });
 }
}

export { Bot_bd_mil_venda };