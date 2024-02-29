process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';
import Pagamento from '../services/pagamentos/pagamento_produto';
import Criar_pedido from '../services/cadastro/criar_pedido';
import moment from 'moment';
import Alerta_pedido from '../services/update/alerta_pedido';
import { botao } from '../utils/msg_bot_botao';
import { mensagens } from '../utils/msg_bot';
import { taxa_empresa } from '../utils/taxas';
import { recomendado_desaconsenho } from '../utils/recomendo_desaconselho'
import Update_pedido from '../services/update/criar_pedido';

// const token_bot = process.env.API_BOT_BDMIL_VENDA ||'' //'6962343359:AAERsmVCjSJczzeQ-ONe_nfVyQxQYDzFYlg'; // Token do bot do telegram... CentrallTest2_Bot

class Bot_bd_mil_venda {

  bot: TelegramBot = new TelegramBot(process.env.API_BOT_BDMIL_VENDA || '', { polling: true });
  execute() {
    // Manipular callback_query
    this.bot.on("callback_query", async (msg: any) => {
      // console.log(msg)
      const texto = msg.data;
      console.log(texto)
      const id_telegram = msg.message?.chat.id;
      const username = msg.message?.chat.username;
      const message_id = msg.message?.message_id;
      const texto_split = texto.split('_');

      const msg_del = await this.bot.sendMessage(id_telegram, 'Aguarde...');
      const messageId = msg_del.message_id.toString()

      if(texto_split[0]==='CADASTRO'&&texto_split[2]==='APAGAR'){
        await this.bot.deleteMessage(id_telegram, (message_id-3).toString())
        await this.bot.deleteMessage(id_telegram, (message_id-2).toString()) 
        await this.bot.deleteMessage(id_telegram, (message_id-1).toString())
        await this.bot.deleteMessage(id_telegram, (message_id).toString())  
      }      
      if(texto_split[0]==='CADASTRO'&&texto_split[2]==='APAGAR-01'){  
        await this.bot.deleteMessage(id_telegram, (message_id-2).toString()) 
        await this.bot.deleteMessage(id_telegram, (message_id-1).toString())
        await this.bot.deleteMessage(id_telegram, (message_id).toString())
        await this.bot.deleteMessage(id_telegram, (message_id+1).toString())
      } 

      // Primeiro verifica se ja axiste esse usuário
      const user = await this.verificar_usuario(id_telegram)

      if (!user) {
        await this.bot.sendMessage(id_telegram, `
⚠️ Primeiro precisamos realizar o seu cadastro!
Entre em contato com o @bdmilbot para iniciar o processo de cadastro.
        `);
        this.bot.deleteMessage(id_telegram, messageId)
        return
      }

      if (username === undefined) {
        await this.bot.sendMessage(id_telegram, mensagens.necessario_username);
        this.bot.deleteMessage(id_telegram, messageId)
      } else {

        if (texto_split[0] === 'DELETAR-PRODUTO'){
          try {
            await prisma_db.produtos.delete({
              where:{id: parseInt(texto_split[1])}
            })   
            
            await this.bot.sendMessage(id_telegram, mensagens.texto_inicial);           
            await this.bot.sendMessage(id_telegram, `Onde você gostaria de divulgar a sua oferta?`);
            await this.bot.sendMessage(id_telegram, `Artigos Militares`, botao.artigos_militares);
            await this.bot.sendMessage(id_telegram, `Artigos Civis`, botao.artigos_civis);
            this.bot.deleteMessage(id_telegram, messageId)
            
          } catch (error) {
            await this.bot.sendMessage(id_telegram, `⚠️ O produto não existe.`, botao.suporte);
            this.bot.deleteMessage(id_telegram, messageId)            
          }
        }

        if (user.produto.length > 0){

          if (user?.produto[0].status === null) {
            await this.bot.sendMessage(id_telegram, mensagens.finalizar_pruduto, botao.suporte);
            this.bot.deleteMessage(id_telegram, messageId)
            return
          }

          const editar_produtos = await prisma_db.produtos.findMany({
            where: {
              user_id: user?.id,
              NOT: [
                { editar: null },
                { editar: '0' }
              ]
            }
          });

          if (editar_produtos.length > 0) { // Tem produtos para ser editado
            await this.bot.sendMessage(id_telegram, mensagens.finalizar_pruduto, botao.suporte);
            this.bot.deleteMessage(id_telegram, messageId)
            return
          }
        }

        await prisma_db.users.update({
          where: { id_telegram: id_telegram.toString() },
          data: { username: username }
        })

        if (texto === 'VENDER'){ // Entra no fluxo de venda basta criar um produto e não finalizar o processo, so vai parar quando finalizar ou cancelar -> cancelar seguinifica apagar o produto.
          if (!user.produto[0] || user.produto[0].status) { // so vai criar um produto se ele não estiver nenhum pendente.
            if (user) {
              await prisma_db.produtos.create({
                data: {
                  user_id: user?.id,
                  id_telegram: id_telegram.toString(),
                }
              })
            }
            await this.bot.sendMessage(id_telegram, `Onde você gostaria de divulgar a sua oferta?`);
            await this.bot.sendMessage(id_telegram, `Artigos Militares`, botao.artigos_militares);
            await this.bot.sendMessage(id_telegram, `Artigos Civis`, botao.artigos_civis);
            this.bot.deleteMessage(id_telegram, messageId)
          } else {
            await this.bot.sendMessage(id_telegram, mensagens.finalizar_pruduto,);
            this.bot.deleteMessage(id_telegram, messageId)
          }
        }
        
        if (texto === 'MEUS_PRODUTOS'){ // Listar todo os produtos cadastrados 

        }

        if (texto_split[0] === 'ATUALIZAR'){

          const produto_pedido = await prisma_db.produtos.findUnique({
            where: { id: parseInt(texto_split[1]) },
            include: { pedido: true }
          });

          if (produto_pedido && produto_pedido.pedido[0].msg_id != null) {
            const grupo = await prisma_db.grupos.findUnique({
              where: { type: produto_pedido?.categoria || '' }
            })

            if (grupo) {

              try {
                Alerta_pedido(produto_pedido.id, user.id)
              } catch (error) {
                console.log('erro pedido')
              }

              await this.bot.deleteMessage(grupo.id_grupo, produto_pedido.pedido[0].msg_id.toString())
              const editar_msg = await this.bot.sendMessage(grupo.id_grupo, 
                mensagens.msg_pagamento_grupo({ 
                  descricao_produto: produto_pedido.descricao || '', 
                  valor_produto: produto_pedido.valor_produto || '', 
                  produto_id: produto_pedido.id, 
                  recomendado: user.recomendado || 0, 
                  desaconselhado: user.desaconselhado || 0, 
                  data_criacao_user: user.created_at }),
                {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        {
                          text: 'Quero Vender',
                          url: `https://t.me/BDMilCVbot?start=1`,
                        },
                        {
                          text: 'Bot Alertas',
                          url: `https://t.me/BDMilALERTAS_bot?start=1`,
                        },
                      ],
                    ],
                  }, parse_mode: 'HTML'
                },);

              await prisma_db.pedidos.updateMany({
                where: { produto_id: produto_pedido.id },
                data: { msg_id: editar_msg.message_id }
              })

              await this.bot.sendMessage(id_telegram, `✔️ Seu produto foi atualizado com sucesso.`, botao.suporte);
              this.bot.deleteMessage(id_telegram, messageId)
            } else {
              await this.bot.sendMessage(id_telegram, `⚠️ Algo deu errado, entre em contato com o suporte.`, botao.suporte);
              this.bot.deleteMessage(id_telegram, messageId)
            }
          } else {
            await this.bot.sendMessage(id_telegram, `⚠️ Esse produto ainda não foi ativo.`);
            this.bot.deleteMessage(id_telegram, messageId)
          }
        }

        if (texto_split[0] === 'EDITAR'){

          const produtos = await prisma_db.produtos.findMany({
            where: {
              user_id: user?.id,
              NOT: [
                { editar: null },
                { editar: '0' }
              ]
            }
          });

          if (produtos.length < 1) {
            const produto = await prisma_db.produtos.findUnique({
              where: { id: parseInt(texto_split[1]) }
            })

            if (produto) {
              await prisma_db.produtos.update({
                where: { id: parseInt(texto_split[1]) },
                data: {
                  editar: '1'
                }
              })

              await this.bot.sendMessage(id_telegram, `Digite sua nova descrição para o produto: ${produto.id}.`);
              await this.bot.sendMessage(id_telegram, `⬇️ Descrição anterior`);
              await this.bot.sendMessage(id_telegram, `${produto.descricao}.`);
              this.bot.deleteMessage(id_telegram, messageId)
            } else {
              await this.bot.sendMessage(id_telegram, `⚠️ Produto não encontrado.`, botao.suporte);
              this.bot.deleteMessage(id_telegram, messageId)
            }

          } else {
            await this.bot.sendMessage(id_telegram, `⚠️ Finalize a edição do produto.`, botao.suporte);
            this.bot.deleteMessage(id_telegram, messageId)
          }
        }

        if (texto_split[0] === 'DELETAR'){ // Listar todo os produtos cadastrados  

          const produto_pedido = await prisma_db.produtos.findUnique({
            where: { id: parseInt(texto_split[1]) },
            include: { pedido: true }
          });

          if (produto_pedido && produto_pedido.pedido[0].msg_id != null) {
            try {
              const grupo = await prisma_db.grupos.findUnique({
                where: { type: produto_pedido?.categoria || '' }
              })
              await prisma_db.produtos.delete({
                where: { id: parseInt(texto_split[1]) }
              })
              if (grupo) {
                await this.bot.deleteMessage(grupo.id_grupo, produto_pedido.pedido[0].msg_id.toString())
                await this.bot.sendMessage(id_telegram, `✅ Produto deletado com sucesso!`,);
                this.bot.deleteMessage(id_telegram, messageId)
              } else {
                await this.bot.sendMessage(id_telegram, `⚠️ Algo deu errado, entre em contato com o suporte.`, botao.suporte);
                this.bot.deleteMessage(id_telegram, messageId)
              }

            } catch (error) {
              await this.bot.sendMessage(id_telegram, `⚠️ Algo deu errado, entre em contato com o suporte.`, botao.suporte);
              this.bot.deleteMessage(id_telegram, messageId)
            }
          } else {
            await this.bot.sendMessage(id_telegram, `⚠️ O produto já foi deletado.`);
            this.bot.deleteMessage(id_telegram, messageId)
          }
        }       

        if (texto_split[0] === 'CADASTRO'){ // Listar todo os produtos cadastrados 
        
          try {
            const produto_db = await prisma_db.produtos.create({
              data: {
                user_id: user?.id,
                id_telegram: id_telegram.toString(),
                categoria: texto_split[1]
              }
            })
            await this.bot.sendMessage(id_telegram, mensagens.descricao, 
              {
                reply_markup: {
                  inline_keyboard: [
                      [
                          { text: "SUPORTE", url: "https://t.me/BDMilSUPORTE_bot" },
                          { text: "Voltar ao Início", callback_data: `DELETAR_${produto_db.id}` },
                      ],
                  ],
              },
              }
            ); // , {suporte_tutorial} para aparecer botão suporte e tutorial    
            this.bot.deleteMessage(id_telegram, messageId)
          } catch (error) {
            await this.bot.sendMessage(id_telegram, `⚠️ Parece que algo deu errado, o que você pretende fazer?`, botao.botao_inicial);
            this.bot.deleteMessage(id_telegram, messageId)
          }
        }       
      }
        if (texto_split[0] === 'RECOMENDO'){

          const log = await prisma_db.log_recomendacoes.findMany({
            where: {
              user_id: user.id,
              produto_id: parseInt(texto_split[2])
            }
          })

          if (log.length > 0) {
            await this.bot.sendMessage(id_telegram, `⚠️ Sua recomendação já foi feita.`, botao.sugestao);
            this.bot.deleteMessage(id_telegram, messageId)
            return
          } else {
            const user_req = await prisma_db.users.findUnique({ where: { id: texto_split[3] } })
            const recomendo_db = user?.recomendado || 0
            const recomendo = recomendo_db + 1

            if (user_req) {
              const user_db = await prisma_db.users.update({
                where: { id: texto_split[3] },
                data: {
                  recomendado: recomendo
                }
              })
              await prisma_db.log_recomendacoes.create({
                data: {
                  status: 'recomendado',
                  produto_id: parseInt(texto_split[2]),
                  user_id: user.id,
                  descricao: 'recomendado',
                }
              })
            
              recomendado_desaconsenho.recomendo_comprador(user_db.id_telegram)

              await this.bot.sendMessage(id_telegram, `✅ Recomendação feita com sucesso!`, botao.sugestao);
              this.bot.deleteMessage(id_telegram, messageId)
            }
          }
        }

        if (texto_split[0] === 'DESACONSELHO'){

          await this.bot.sendMessage(id_telegram, `Selecione o Motivo`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: "Não entregou o produto", callback_data: `DESACONSELHODB_${texto_split[2]}_${texto_split[3]}_1` },
                    { text: "Não efetuou o pagamento", callback_data: `DESACONSELHODB_${texto_split[2]}_${texto_split[3]}_2` },
                  ],
                  [
                    { text: "Foi rude", callback_data: `DESACONSELHODB_${texto_split[2]}_${texto_split[3]}_3` },
                    { text: "Produto em desacordo com o descrito", callback_data: `DESACONSELHODB_${texto_split[2]}_${texto_split[3]}_4` },
                  ],
                  [
                    { text: "Não é militar", callback_data: `DESACONSELHODB_${texto_split[2]}_${texto_split[3]}_5` },
                    { text: "Outros", callback_data: `DESACONSELHODB_${texto_split[2]}_${texto_split[3]}_6` },
                  ],
                ],
              },
            });
          this.bot.deleteMessage(id_telegram, messageId)

        }

        if (texto_split[0] === 'DESACONSELHODB'){

          const log = await prisma_db.log_recomendacoes.findMany({
            where: {
              user_id: user?.id,
              produto_id: parseInt(texto_split[1])
            }
          })

          if (log.length > 0) {
            await this.bot.sendMessage(id_telegram, `⚠️ Seu desaconselho já foi feito.`, botao.sugestao);
            this.bot.deleteMessage(id_telegram, messageId)
          } else {

            const user_req = await prisma_db.users.findUnique({ where: { id: texto_split[2] } })
            const desaconselhado_db = user?.desaconselhado || 0
            const desaconselhado = desaconselhado_db + 1

            if (user_req) {
              const user_db = await prisma_db.users.update({
                where: { id: user_req?.id },
                data: {
                  desaconselhado: desaconselhado
                }
              });

              const descricao: any = {
              '1': 'Não entregou o produto', 
              '2': 'Não efetuou o pagamento',
              '3': 'Foi rude',
              '4': 'Produto em desacordo com o descrito',
              '5': 'Não é militar',
              '6': 'Outros'
            } 
              if (texto_split[3] === '') {
                await prisma_db.log_recomendacoes.create({
                  data: {
                    status: 'desaconselhado',
                    produto_id: parseInt(texto_split[1]),
                    user_id: user.id,
                    descricao: '',
                  }
                })
                recomendado_desaconsenho.desaconselho_comprador(user_db.id_telegram)
                await this.bot.sendMessage(id_telegram, mensagens.motivo);
                this.bot.deleteMessage(id_telegram, messageId)
              } else {
                await prisma_db.log_recomendacoes.create({
                  data: {
                    status: 'desaconselhado',
                    produto_id: parseInt(texto_split[1]),
                    user_id: user.id,
                    descricao: descricao[texto_split[3]],
                  }
                })
                await this.bot.sendMessage(id_telegram, mensagens.desaconselho_sucesso, botao.sugestao);
                this.bot.deleteMessage(id_telegram, messageId)
              }
            }
          }
        }

        if(texto_split[0] === 'CREDITO'){

          const valor_credito = user.creditos || 0
          const valor_pedido = parseInt(texto_split[1])          

          if(valor_credito<valor_pedido){       

            try {
              const pedido_edit = await prisma_db.pedidos.update({
                where:{id: parseInt(texto_split[2])},
                data:{
                  tipo: 'credito',                  
                }
              })

              await this.bot.sendMessage(id_telegram, `
⚠️ Saldo insuficiente.

Para continuar adicionando produtos você precisa comprar mais créditos.

Pressione o botão ADICIONAR CRÉDITOS.

Seus Créditos: ${((user.creditos||0)/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              `,
                            {
                              reply_markup: {
                                inline_keyboard: [
                                  [
                                    { text: "ADICIONAR CRÉDITOS", url: `https://bdmil.vercel.app/ac/${texto_split[2]}` }
                                  ],
                                ],
                              },
                            });
            
                          this.bot.deleteMessage(id_telegram, messageId)
              
            } catch (error) {
              await this.bot.sendMessage(id_telegram, `Algo deu errado com seu pedido?`, botao.botao_inicial);
              this.bot.deleteMessage(id_telegram, messageId)              
            }          
         
            return
          }

          const novo_crédito = valor_credito-valor_pedido

          await prisma_db.users.update({
            where:{id:user.id},
            data:{
              creditos: novo_crédito
            }
          })

          const dados = {
            pedido_id: parseInt(texto_split[2]),
            produto_id: user.produto[0].id,
            user_id: user.id,
          }
          try {
            Update_pedido(dados)
            this.bot.deleteMessage(id_telegram, messageId)
          } catch (error) {
            await this.bot.sendMessage(id_telegram, `⚠️ Parece que algo deu errado, o que você pretende fazer?`, botao.botao_inicial);
            this.bot.deleteMessage(id_telegram, messageId)
          }

        }
    });
 
    this.bot.on('message', async (msg: any) => {

      const id_telegram = msg.chat.id.toString();
      const texto = msg.text;
      const name = msg.chat.first_name;
      const username = msg.chat.username;
      const message_id = msg.message_id;

      const msg_del = await this.bot.sendMessage(id_telegram, mensagens.aguarde);
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

      const editar_produtos = await prisma_db.produtos.findMany({
        where: {
          user_id: user?.id,
          NOT: [
            { editar: null },
            { editar: '0' }
          ]
        },
        include: { pedido: true }
      });

      if (editar_produtos.length > 0) { // Tem produtos para ser editado

        if (editar_produtos[0].editar === '1') {
          await prisma_db.produtos.update({ where: { id: editar_produtos[0].id }, data: { descricao: texto, editar: '2' } })
          await this.bot.sendMessage(id_telegram, mensagens.valor, botao.suporte);
          this.bot.deleteMessage(id_telegram, messageId)
          return
        }
        if (editar_produtos[0].editar === '2') {

          // Função para verificar se o texto é um valor monetário válido
          function isValorMonetarioValido(texto: string) {
            // Expressão regular para verificar o padrão
            const regex = /^[0-9]+(\.[0-9]{2}){1}$/;

            // Testa o texto contra a expressão regular
            return regex.test(texto);
          }

          if (isValorMonetarioValido(texto)) {

            const valor_db = parseInt(editar_produtos[0].valor_produto || '')
            const valor_novo = parseInt(texto)

            if (valor_novo > valor_db) {
              await this.bot.sendMessage(id_telegram, `⚠️ O valor atual não pode ultrapassar o valor anterior.`, botao.suporte);
              this.bot.deleteMessage(id_telegram, messageId)
              return
            }

            const grupo = await prisma_db.grupos.findUnique({
              where: { type: editar_produtos[0].categoria || '' }
            })

            if (grupo) {
              const produto_pedido = await prisma_db.produtos.update({ where: { id: editar_produtos[0].id }, data: { valor_produto: texto.replace(/\./g, ''), editar: '0' } })
              await this.bot.deleteMessage(grupo.id_grupo, editar_produtos[0].pedido[0].msg_id?.toString() || '')

              console.log('veio')

              const editar_msg = await this.bot.sendMessage(grupo.id_grupo,               

                mensagens.msg_pagamento_grupo({ 
                  descricao_produto: produto_pedido.descricao || '', 
                  valor_produto: produto_pedido.valor_produto || '', 
                  produto_id: produto_pedido.id, 
                  recomendado: user?.recomendado || 0, 
                  desaconselhado: user?.desaconselhado || 0, 
                  data_criacao_user: user?.created_at}),
                {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        {
                          text: 'Quero Vender',
                          url: `https://t.me/BDMilCVbot?start=1`,
                        },
                        {
                          text: 'Bot Alertas',
                          url: `https://t.me/BDMilALERTAS_bot?start=1`,
                        },
                      ],
                    ],
                  }, parse_mode: 'HTML'
                },
              );
              await prisma_db.pedidos.updateMany({
                where: { produto_id: editar_produtos[0].id },
                data: { msg_id: editar_msg.message_id }
              })

              await this.bot.sendMessage(id_telegram, `✔️ Seu produto foi editado com sucesso.`, botao.suporte);
              this.bot.deleteMessage(id_telegram, messageId)
            } else {
              await this.bot.sendMessage(id_telegram, `⚠️ Algo deu errado, entre em contato com o suporte.`, botao.suporte);
              this.bot.deleteMessage(id_telegram, messageId)
            }
            return
          } else {
            await this.bot.sendMessage(id_telegram, `O valor monetário não é válido.`)
            this.bot.deleteMessage(id_telegram, messageId)
          }
        }
        return
      }

      if (!user) {
        await this.bot.sendMessage(id_telegram, `
⚠️ Primeiro precisamos realizar o seu cadastro!
Entre em contato com o @bdmilbot para iniciar o processo de cadastro.
        `);
        this.bot.deleteMessage(id_telegram, messageId)
        return
      }

      if (username === undefined) {
        await this.bot.sendMessage(id_telegram, `⚠️ É necessário cadastrar um UserName do Telegram, para dar continuidade no Balcão.`);
        this.bot.deleteMessage(id_telegram, messageId)
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
          await this.bot.sendMessage(id_telegram, mensagens.texto_inicial);         
          await this.bot.sendMessage(id_telegram, `Onde você gostaria de divulgar a sua oferta?`);
          await this.bot.sendMessage(id_telegram, `Artigos Militares`, botao.artigos_militares);
          await this.bot.sendMessage(id_telegram, `Artigos Civis`, botao.artigos_civis);
          this.bot.deleteMessage(id_telegram, messageId)
          return
        }

        if (user.produto && !user.produto[0].status) {
          if (user.produto[0].categoria === null) {  // Esse if é somente para não deixar colocar a cateria por aqui
            await this.bot.sendMessage(id_telegram, mensagens.texto_inicial);           
            await this.bot.sendMessage(id_telegram, `Onde você gostaria de divulgar a sua oferta?`);
            await this.bot.sendMessage(id_telegram, `Artigos Militares`, botao.artigos_militares);
            await this.bot.sendMessage(id_telegram, `Artigos Civis`, botao.artigos_civis);
            this.bot.deleteMessage(id_telegram, messageId)
            return
          }
          if (user.produto && user.produto[0].descricao === null) {

            const verifica_descricao = texto.split('')

            if (verifica_descricao.length < 150) {

              try {
                const produto_db = await prisma_db.produtos.update({
                  where: { id: user.produto[0].id },
                  data: {
                    descricao: texto,
                  }
                })
                await this.bot.sendMessage(id_telegram, mensagens.valor, 
                  {
                    reply_markup: {
                      inline_keyboard: [
                          [
                              { text: "SUPORTE", url: "https://t.me/BDMilSUPORTE_bot" },
                              { text: "Voltar ao Início", callback_data: `DELETAR-PRODUTO_${produto_db.id}` },
                          ],
                      ],
                  },
                  }
                  );
                this.bot.deleteMessage(id_telegram, messageId)
                return
              } catch (error) {
                await this.bot.sendMessage(id_telegram, `⚠️ Ops algo deu errado escreva sua descrição novamente.`);
                this.bot.deleteMessage(id_telegram, messageId)
                return
              }

            } else {
              await this.bot.sendMessage(id_telegram, `⚠️ Ops algo coloque no máximo 150 caracteres. SÓ coloque ponto no fim.`);
              this.bot.deleteMessage(id_telegram, messageId)
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

                const produto = await prisma_db.produtos.findUnique({
                  where: { id: user.produto[0].id }
                })

                const pedido = await prisma_db.pedidos.findMany({
                  where: { user_id: user.id }
                })

                if (pedido.length <= 0) {

                  const dados = {
                    valor: taxa_empresa(user.produto[0].categoria, texto),
                    titulo: '',
                    nome: user.nome,
                    document: user.document,
                    email: user.email,
                    id_telegram: id_telegram,
                    ddd: user.ddd_phone,
                    telefone: user.phone,
                    produto_id: user.produto[0].id,
                    user_id: user.id,
                  }
                  try {
                    Criar_pedido(dados)
                    this.bot.deleteMessage(id_telegram, messageId)
                  } catch (error) {
                    await this.bot.sendMessage(id_telegram, `⚠️ Parece que algo deu errado, o que você pretende fazer?`, botao.botao_inicial);
                    this.bot.deleteMessage(id_telegram, messageId)
                  }
                  return
                }

                if (produto) {

                  await prisma_db.produtos.update({
                    where: { id: user.produto[0].id },
                    data: {
                      status: true
                    }
                  })

                  const dados = {
                    valor: taxa_empresa(user.produto[0].categoria, texto),
                    titulo: '',
                    nome: user.nome,
                    document: user.document,
                    email: user.email,
                    id_telegram: id_telegram,
                    ddd: user.ddd_phone,
                    telefone: user.phone,
                    produto_id: user.produto[0].id,
                    user_id: user.id,
                  }

                  const pagamento = await Pagamento(dados)

                  if (pagamento.status === "ok") {
                    await this.bot.sendMessage(id_telegram, `
✔️ Seu produto foi cadastrado com sucesso.
Clique no botão PAGAR para Ativar seu Anúncio!

Ou pode pagar com seus créditos!

Valor para anunciar! ${(parseInt(dados.valor) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

Seus Créditos: ${((user.creditos||0)/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
`,
                      {
                        reply_markup: {
                          inline_keyboard: [
                            [
                              { text: "PAGAR", url: `https://bdmil.vercel.app/pg/${pagamento.url}` },
                              { text: "PAGAR CRÉDITO", callback_data: `CREDITO_${dados.valor}_${pagamento.url}` },
                            ],
                          ],
                        },
                      });

                    this.bot.deleteMessage(id_telegram, messageId)

                  } else {
                    await this.bot.sendMessage(id_telegram, `Algo deu errado com seu pedido?`, botao.botao_inicial);
                    this.bot.deleteMessage(id_telegram, messageId)
                  }
                } else {
                  await this.bot.sendMessage(id_telegram, `⚠️ Parece que algo deu errado, o que você pretende fazer?`, botao.botao_inicial);
                  this.bot.deleteMessage(id_telegram, messageId)
                }

                //               await this.bot.sendMessage(id_telegram, `
                // ✔️Dados coletados, ative seu produto!

                // Valor anúncio ${(taxa_empresa(user.produto[0].categoria, texto)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}

                // Colocar informações e o preço para expor o anúncio!`,
                //                   {
                //                     reply_markup: {
                //                       inline_keyboard: [
                //                         [
                //                           { text: "QUERO ATIVAR", callback_data: `PAGAR_${user.produto[0].id}_${Math.round(taxa_empresa(user.produto[0].categoria, texto) * 100)}` },
                //                         ],
                //                       ],
                //                     },
                //                   });
                //                   this.bot.deleteMessage(id_telegram, messageId)

                return
              } catch (error) {
                console.log(error)
                await this.bot.sendMessage(id_telegram, `Ops algo deu errado escreva sua descrição novamente`);
                this.bot.deleteMessage(id_telegram, messageId)
              }
              return
            } else {
              await this.bot.sendMessage(id_telegram, `O valor monetário não é válido.`)
              this.bot.deleteMessage(id_telegram, messageId)
            }
          }
        } else {
          await this.bot.sendMessage(id_telegram, mensagens.texto_inicial);         
          await this.bot.sendMessage(id_telegram, `Onde você gostaria de divulgar a sua oferta?`);
          await this.bot.sendMessage(id_telegram, `Artigos Militares`, botao.artigos_militares);
          await this.bot.sendMessage(id_telegram, `Artigos Civis`, botao.artigos_civis);
          this.bot.deleteMessage(id_telegram, messageId)
        }
      }
    });
  }

  async enviar_mensagem(id_chat: string, texto: string) {
    return await this.bot.sendMessage(id_chat, texto)
  }

  async enviar_mensagem_botao(id_chat: string, texto: string, botoes: TelegramBot.SendMessageOptions) {
    return await this.bot.sendMessage(id_chat, texto, botoes)
  }

  async deletar_mensagem(id_chat: string, id_message: string) {
    return await this.bot.deleteMessage(id_chat, id_message)
  }
  
  async verificar_usuario(id_telegram: number) {
    const user = await prisma_db.users.findUnique({
      where: { id_telegram: id_telegram?.toString() },
      include: {
        produto: {
          orderBy: { id: 'desc' },
          take: 1, // Apenas o último produto
        },
      },
    });
    if (!user) { return false }
    return user
  }

}

export { Bot_bd_mil_venda };