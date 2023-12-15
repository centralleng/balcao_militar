process.env['NTBA_FIX_319'] = "0";
import TelegramBot from 'node-telegram-bot-api';
import { prisma_db } from '../database/prisma_db';

const token_bot = '6886561681:AAEL0_4SPcmWNV3_l9Nys0fe3Q2N2_9b--I'; // CentrallTest1

const bot = new TelegramBot (token_bot, {polling: true});

// export function envioalerta(dados){
//   console.log(dados)
//   bot.sendMessage(dados.chatId, dados.adresp);
// }

class Bot_bd_mil{
  static execute() { 

const bemvindo =  `
Olá! Bem-vindo ao Balcão dos militares (BDMil). Esse Balcão tem por objetivo facilitar a transação comercial de artigos militares e de “artigos civis”, novos ou usados, entre os integrantes das FFAA e Forças Singulares, da ativa (de carreira ou temporários) e da reserva (remunerada ou não), incluindo os pensionistas e os reformados de todo o Brasil.
`       
const termo= `
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
    `    


  bot.on('message', async (msg) => {
    console.log(msg)

    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'OK', callback_data: 'ok__' }
          ],
          [
            { text: 'Exercito Brasileiro', callback_data: '_EB_' },
            { text: 'Marinha Brasileira', callback_data: '_MB_' },
            { text: 'Força Aéria Brasileira', callback_data: '_FAB_'}
          ]
        ]
      }
    };

    const id_telegram = msg.chat.id.toString();
    const texto = msg.text;
    const name = msg.chat.first_name;   
    const username = msg.chat.username; 

    const req = await prisma_db.users.findUnique({
      where:{id_telegram:id_telegram}
    })
    
    if(!req){ // Primeiro contato com o bot    
      if(texto==='ok__'){
        // Salvar os dados no banco com o ok do termo
        const cadastro = prisma_db.users.create({
          data:{
            delete:       '',
            status:       '',
            nome:         name,
            username:     username,
            document:     '',
            type_document:'cpf',
            email:        '',
            termo:        true,
            instituicao:  '',
            id_telegram:  id_telegram,
            ddd_phone:    '',
            phone:        '',
            avatar_url:   ''
          }
        })
        // Qual sua corporação 
        bot.sendMessage(id_telegram, `A qual Instituição/corporação você pertence?`);
        return
      }else{
        bot.sendMessage(id_telegram, bemvindo);
        bot.sendMessage(id_telegram, termo);
        //colocar um botão de OK aqui!!
      }      
    }else{
      if(req.termo){
        if(req.instituicao===''){
          // update no banco salvando a instituição
          const cadastro = await prisma_db.users.update({
            where:{id_telegram: id_telegram},
            data:{instituicao:texto}
          })
          // Qual seu nome
          bot.sendMessage(id_telegram, `Qual o seu nome?`);
          return      
        } 
        if(req.nome===''){
          // updata no banco salvando nome
          const cadastro = await prisma_db.users.update({
            where:{id_telegram: id_telegram},
            data:{nome: texto}
          })
          // Qual seu cpf
          bot.sendMessage(id_telegram, `Qual o seu CPF?`);
          return      
        } 
        if(req.document===''){
          // updata no banco cpf
          const cadastro = await prisma_db.users.update({
            where:{id_telegram: id_telegram},
            data:{document: texto}
          })
          // quer editar o cadastro
          bot.sendMessage(id_telegram, `Desejar editar os dados cadastrados?`);
          return      
        } 






        
      }  

    }

  })

}
}


export { Bot_bd_mil };