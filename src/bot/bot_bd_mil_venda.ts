process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';
import Pagamento from '../services/pagamentos/pagamento_produto';

const token_bot = process.env.API_BOT_BDMIL_VENDA ||'' //'6962343359:AAERsmVCjSJczzeQ-ONe_nfVyQxQYDzFYlg'; // Token do bot do telegram... CentrallTest2_Bot

const bot = new TelegramBot(token_bot, { polling: true });

class Bot_bd_mil_venda {
  static execute() {

    const instituicao: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "EB", callback_data: "EB" },
            { text: "MB", callback_data: "MB" },
            { text: "FAB", callback_data: "FAB" },
          ],
          [
            { text: "PMERJ", callback_data: "PMERJ" },
            { text: "CBMERJ", callback_data: "CBMERJ" },
            { text: "PMDF", callback_data: "PMDF" },
          ],
        ],
      },
    };

    const botao_inicial: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "VENDER", callback_data: "VENDER" },
            // { text: "MEUS PRODUTOS", callback_data: "MEUS_PRODUTOS"},
          ],
          [
            { text: "SUPORTE", url: "https://t.me/" },
            { text: "TUTORIAL", callback_data: "https://t.me/" },
          ],
        ],
      },
    };

    const msg_deletar_produto: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "DELETAR", callback_data: "DELETAR_PRODUTO" },
          ],
        ],
      },
    };

    const descarta_produto: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "VOLTAR DO INÍCIO", callback_data: "DELETAR_PRODUTO" },
          ],
        ],
      },
    };

    const suporte: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "SUPORTE", url: "https://t.me/" },
          ],
        ],
      },
    };

    const artigos_militares: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "EB", callback_data: "CADASTRO_EB" },
            { text: "MB", callback_data: "CADASTRO_MB" },
            { text: "FAB", callback_data: "CADASTRO_FAB" },
          ],
        ],
      },
    };

    const artigos_civis: TelegramBot.SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Veículo", callback_data: "CADASTRO_VEICULO" },
            { text: "Serviço", callback_data: "CADASTRO_SERVICO" },
            { text: "smartphone", callback_data: "CADASTRO_SMARTPHONE" },
            
          ],
          [
            { text: "Uniformes", callback_data: "CADASTRO_UNIFORME"},
            { text: "Material Escolar", callback_data: "CADASTRO_MAT_ESCOLAR"},
          ],
        ],
      },
    };

    const texto_inicial = `
⚠️ Atenção, esse local é feito para ofertar a VENDA de produtos.
`

    const atencao = `
❗️ O balcão é monitorado e os procedimentos são assistidos. Boas práticas em todo o processo é essencial. Não serão emitidos alertas ou advertências prévias antes de qualquer exclusão de usuário.
`

    const categoria = `
✔️ Opa! Qual Departamento se encaixa o produto?
`

//     const formato_venda = `
// Interessado em vender (fardamento)

// Coturno extra leve, preto, 1 par, bom estado, número 42.

// Valor R$ 100.50

// Envie o código 1978654 para @BDMilquerocomprar para comprar dele.
// Recomendado por mais de 70 pessoas/ Ainda não recomendado (dados do vendedor)

// Não desaconselhado ainda por ostros usuários/desaconselhado por 2 pessoas (dados do vendedor)

// Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

// Conta verificada

// Membro desde 15 mês ano
// `

    const descricao = `
Descreva de forma sucinta o produto que você quer ofertar, incluindo obrigatoriamente a quantidade (um ou 1 par) e a cor. NÃO coloque o valor nesse momento (máximo 150 caracteres). SÓ coloque ponto no fim.
`
    const valor = `
Qual o valor pretendido? (escreva somente números. Caso haja centavos, coloque ponto pra separar o real dos centavos.)

Ex: 00.00
`
//     const valor = `
// Qual o valor pretendido? (escreva somente números. Caso haja centavos coloque ponto)

// 💵 Exemplos:

// Para R$ 1 real -> 1.00
// Para R$ 10 reais -> 10.00
// Para R$ 1 mil reais -> 1000.00

// 🪙 Exemplos com os centavos:

// Para R$ 1 real e vinte centavos -> 1.20
// Para R$ 10 reais e vinte centavos -> 10.20
// Para R$ 1 mil reais e vinte centavos -> 1000.20
// `

    const produto_criado = `
✔️Oferta de venda cadastrada!
💡 Quando for decidir entre comprar ou vender o produto/serviço, avalie também as recomendações.
🤝 Gostaria de lembrar a importância de honrar acordos com o vendedor ou comprador no Balcão, depois de selar o acordo até a entrega do produto.
❌ O mau comportamento pode acarretar a exclusão do Balcão.
`
    // Manipular callback_query
    bot.on("callback_query", async (msg: any) => {
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

      if (!user) {
        bot.sendMessage(id_telegram, `
⚠️ Primeiro precisamos realizar o seu cadastro!
Entre em contato com o @bdmilbot para iniciar o processo de cadastro.
        `);
        return
      }

      if (username === undefined) {
        bot.sendMessage(id_telegram, `⚠️ É necessário cadastrar um UserName do Telegram, para dar continuidade no Balcão.`);
      } else {

        const user_name = await prisma_db.users.update({
          where: {id_telegram: id_telegram.toString()},
          data: {username: username}
        })

        if (texto === 'VENDER') { // Entra no fluxo de venda basta criar um produto e não finalizar o processo, so vai parar quando finalizar ou cancelar -> cancelar seguinifica apagar o produto.
          if (!user.produto[0] || user.produto[0].status) { // so vai criar um produto se ele não estiver nenhum pendente.
            if (user) {
              await prisma_db.produtos.create({
                data: {
                  user_id: user?.id,
                  id_telegram: id_telegram.toString(),
                }
              })
            }
            await bot.sendMessage(id_telegram, `Artigos Militáres`, artigos_militares);
            await bot.sendMessage(id_telegram, `Artigos Civis`, artigos_civis);

          } else {
            bot.sendMessage(id_telegram, `⚠️ Primeiro você precisa finalizar o produto que deu inicio na criação ou deleta-lo.`, msg_deletar_produto);
          }
        }

        if (texto === 'MEUS_PRODUTOS') { // Listar todo os produtos cadastrados 

        }

        if (texto === 'DELETAR_PRODUTO') { // Listar todo os produtos cadastrados 
          if (user.produto[0] && !user.produto[0].status) {
            await prisma_db.produtos.delete({
              where: { id: user.produto[0].id }
            })
            bot.sendMessage(id_telegram, `✅ Produto deletado com sucesso!`, botao_inicial);
          } else {
            bot.sendMessage(id_telegram, `⚠️ Algo deu errado, entre em contato com o suporte.`, suporte);
          }
        }

        if (texto_split[0] === 'CADASTRO') { // Listar todo os produtos cadastrados       
          try {
            await prisma_db.produtos.update({
              where: { id: user.produto[0].id },
              data: {
                categoria: texto_split[1]
              }
            })
            bot.sendMessage(id_telegram, descricao, descarta_produto);
          } catch (error) {
            bot.sendMessage(id_telegram, `⚠️ Parece que algo deu errado, o que você pretende fazer?`, botao_inicial);
          }
        }

        if (texto_split[0] === 'PAGAR') { // Listar todo os produtos cadastrados       
          const produto = await prisma_db.produtos.findUnique({
            where: { id: parseInt(texto_split[1]) }
          })

          if (produto) {

            await prisma_db.produtos.update({
              where: { id: user.produto[0].id },
              data: {
                status: true
              }
            })

            const dados = {
              valor: texto_split[2].replace(/\./g, ''),
              titulo: '',
              nome: user.nome,
              document: user.document,
              email: user.email,
              id_telegram: id_telegram,
              phone: '',
              produto_id: parseInt(texto_split[1]),
              user_id: user.id,
            }

            const pagamento = await Pagamento(dados)

            if (pagamento.status === "ok") {
              bot.sendMessage(id_telegram, `✔️ Seu produto foi cadastrado com sucesso. Clique no botão [PAGAR] para Ativar seu Anúncio!`,
                {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        { text: "PAGAR", url: `https://bdmil.vercel.app/pg/${pagamento.url}` },
                      ],
                    ],
                  },
                });                        

            } else {
              bot.sendMessage(id_telegram, `Algo deu errado com seu pedido?`, botao_inicial);
            }
          } else {
            bot.sendMessage(id_telegram, `⚠️ Parece que algo deu errado, o que você pretende fazer?`, botao_inicial);
          }
        }
      }

      if(texto_split[0]==='RECOMENDO'){

        const log = await prisma_db.log_recomendacoes.findMany({
          where:{
            user_id: user.id,
            produto_id: parseInt(texto_split[2])
          }
        })

        if(log.length>0){
          bot.sendMessage(id_telegram, `⚠️ Sua recomendação já foi feita.`);
          return
        }else{
          const user_req = await prisma_db.users.findUnique({where:{id:texto_split[3]}})
          const recomendo_db = user?.recomendado || 0
          const recomendo = recomendo_db + 1
          
          if(user_req){
            await prisma_db.users.update({
              where:{id: texto_split[3]},
              data:{
                recomendado: recomendo      
              }
            }) 
            await prisma_db.log_recomendacoes.create({
              data:{
                status: 'recomendado',
                produto_id: parseInt(texto_split[2]),
                user_id: user.id,
                descricao: 'recomendado',
              }
            })    
            bot.sendMessage(id_telegram, `✅ Recomendação feita com sucesso!`);             
          }
        }
      };

      if(texto_split[0]==='DESACONSELHO'){

        bot.sendMessage(id_telegram, `Selecione o Motivo`,
        {
          reply_markup: {
            inline_keyboard: [                  
              [  
                { text: "Não entregou o produto", callback_data: `DESACONSELHODB_${texto_split[2]}_${texto_split[3]}_1`},
                { text: "Não efetuou o pagamento", callback_data: `DESACONSELHODB_${texto_split[2]}_${texto_split[3]}_2`},
              ],
              [  
                { text: "Foi rude", callback_data: `DESACONSELHODB_${texto_split[2]}_${texto_split[3]}_3`},
                { text: "Produto em desacordo com o descrito", callback_data: `DESACONSELHODB_${texto_split[2]}_${texto_split[3]}_4`},
              ],
              [  
                { text: "Não é militar", callback_data: `DESACONSELHODB_${texto_split[2]}_${texto_split[3]}_5`},
                { text: "Outros", callback_data: `DESACONSELHODB_${texto_split[2]}_${texto_split[3]}_6`},
              ],
            ],
          },
        });        

      } 

  if(texto_split[0]==='DESACONSELHODB'){
    console.log('obj-text',texto_split)

    const log = await prisma_db.log_recomendacoes.findMany({
      where:{
        user_id: user?.id,
        produto_id: parseInt(texto_split[1])
      }
    })

    if(log.length>0){
      bot.sendMessage(id_telegram, `⚠️ Seu desaconselho já foi feito.`);
    }else{

      const user_req = await prisma_db.users.findUnique({where:{id:texto_split[2]}})
      const desaconselhado_db = user?.desaconselhado || 0
      const desaconselhado = desaconselhado_db + 1

      if(user_req){
        await prisma_db.users.update({
          where:{id: user_req?.id},
          data:{
            desaconselhado: desaconselhado      
          }
        });

        let descricao 
        switch (texto_split[3]) {
          case '1':  
          descricao = 'Não entregou o produto'                    
            break;
          case '2':  
          descricao = 'Não efetuou o pagamento'                    
            break;
          case '3':  
          descricao = 'Foi rude'                    
            break;
          case '4':  
          descricao = 'Produto em desacordo com o descrito'                    
            break;
          case '5':  
          descricao = 'Não é militar'                    
            break;
          case '6':  
          descricao = 'Outros'                    
            break;  
        }

        if(descricao===''){
          await prisma_db.log_recomendacoes.create({
            data:{
              status: 'desaconselhado',
              produto_id: parseInt(texto_split[1]),
              user_id: user.id,
              descricao: '',
            }
          })
          bot.sendMessage(id_telegram, `
⚠️ Descreva o motivo

Obs: Coloque no máximo 150 caracteres
`);
        }else{
          await prisma_db.log_recomendacoes.create({
            data:{
              status: 'desaconselhado',
              produto_id: parseInt(texto_split[1]),
              user_id: user.id,
              descricao: descricao,
            }
          })     
          bot.sendMessage(id_telegram, `✅ Desaconselho feita com sucesso!`);
        }
      }
    }
  }        
    });

    bot.on('message', async (msg: any) => {
      console.log('message', msg.text)
      const id_telegram = msg.chat.id.toString();
      const texto = msg.text;
      const name = msg.chat.first_name;
      const username = msg.chat.username;
      const message_id = msg.message_id;

      const msg_del = await bot.sendMessage(id_telegram, 'Aguarde...'); 
      const messageId = msg_del.message_id.toString()

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
      } else {
        // Inicio dos comandos /////////////////////////////////////////////
        if (username != user?.username) { // So estou atualizando o user name no banco de dados mais nada.
          await prisma_db.users.update({
            where: { id: user?.id },
            data: { username: username }
          })
        }

        if (user.produto.length === 0) {
          await bot.sendMessage(id_telegram, texto_inicial);
          await bot.sendMessage(id_telegram, atencao);
          bot.sendMessage(id_telegram, 'Escolha sua ação:', botao_inicial);
          return
        }

        if (user.produto[0].status) {          
          bot.sendMessage(id_telegram, 'Escolha sua ação:', botao_inicial);         
          return
        }     

        if (user.produto && !user.produto[0].status) {
          if (user.produto[0].categoria===null) {  // Esse if é somente para não deixar colocar a cateria por aqui
            await bot.sendMessage(id_telegram, `Artigos Militáres`, artigos_militares);
            await bot.sendMessage(id_telegram, `Artigos Civis`, artigos_civis);         
            return
          }
          if (user.produto && user.produto[0].descricao === null) {

            const verifica_descricao = texto.split('')

            if(verifica_descricao.length<150){

            try {
              await prisma_db.produtos.update({
                where: { id: user.produto[0].id },
                data: {
                  descricao: texto,
                }
              })
              bot.sendMessage(id_telegram, valor);
              return
            } catch (error) {
              bot.sendMessage(id_telegram, `⚠️ Ops algo deu errado escreva sua descrição novamente.`);
              return
            }

            }else{
              bot.sendMessage(id_telegram, `⚠️ Ops algo coloque no máximo 150 caracteres. SÓ coloque ponto no fim.`);
              return
            }
        
          
          }

          if (user.produto && user.produto[0].valor_produto === null) {
            // Função para verificar se o texto é um valor monetário válido
            function isValorMonetarioValido(texto: string) {
              // Expressão regular para verificar o padrão
              const regex = /^[0-9]+(\.[0-9]{2}){1}$/;

              // Testa o texto contra a expressão regular
              return regex.test(texto);
            }

            if (isValorMonetarioValido(texto)) {

              try {
                await prisma_db.produtos.update({
                  where: { id: user.produto[0].id },
                  data: {
                    valor_produto: texto.replace(/\./g, ''),
                    status: true
                  }
                })

                const valor_anuncio = parseFloat(texto) * 0.03

            const taxa_empresa =()=>{
              // Montar condicionais de %
                  if (user.produto[0].categoria==="VEICULO") {

                    const valor_anuncio = parseFloat(texto) * 0.01

                    return valor_anuncio
                  }
                  // if (parseFloat(texto) > 1000) {
                  //   return 30
                  // }
                  return valor_anuncio
                }

              bot.sendMessage(id_telegram, `
✔️Dados coletados, ative seu produto!

Valor anúncio ${(taxa_empresa()).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}

Colocar informações e o preço para expor o anúncio!`,
                  {
                    reply_markup: {
                      inline_keyboard: [
                        [
                          { text: "QUERO ATIVAR", callback_data: `PAGAR_${user.produto[0].id}_${Math.round(taxa_empresa() * 100)}` },
                        ],
                      ],
                    },
                  });
            
                return
              } catch (error) {
                bot.sendMessage(id_telegram, `Ops algo deu errado escreca sua descrição novamente`);
              }
              return
            } else { bot.sendMessage(id_telegram, `O valor monetário não é válido.`) }
          }
        } else {
          bot.sendMessage(id_telegram, 'Escolha sua ação:', botao_inicial);
        }






























      }
    });
  }
}

export { Bot_bd_mil_venda };