import moment from "moment";
import { prisma_db } from "../../database/prisma_db";
import axios from "axios";
import { mensagens } from "../../utils/msg_bot";

export async function deletarProdutoAbandonado() {

  const botVenda = process.env.API_BOT_BDMIL_VENDA || ''

    const produto = await prisma_db.produtos.findMany({
        where:{status:false||null}
    })


    function createInlineKeyboardAlert() {
        return {
          inline_keyboard: [
            [
              {
                text: 'NOVA VENDA',
                callback_data: `VENDER`,
              },
              {
                text: 'SUPORTE',
                url: `https://t.me/BDMilSUPORTE_bot?start=start`,
              },
            ],
          ],
        };
      }

    if(produto.length>0){
    
    for await ( let item of produto) {
        
        const dataAtual = moment(); // Obtém a data e hora atual
        const dataProduto = moment(item.updated_at); // Converte a data do produto para um objeto Moment
        const minutos = dataAtual.diff(dataProduto, 'minutes');

        if(minutos>3){
            await prisma_db.produtos.delete({ where:{id: item.id}});

        try {
            await axios.post(`https://api.telegram.org/bot${botVenda}/sendMessage`, // bot CentrallTest4
            {
            parse_mode: 'HTML',
            chat_id: item.id_telegram,
            text: mensagens.timeGrup,          
            reply_markup: createInlineKeyboardAlert(),
            });
            
        } catch (error) {
            
        }
    























                        
        }
    }

    }    
} 