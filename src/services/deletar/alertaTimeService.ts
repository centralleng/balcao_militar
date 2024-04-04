import moment from "moment";
import { prisma_db } from "../../database/prisma_db";
import axios from "axios";

export async function deletarAlertaAbandonado() {

    const botAlerta = process.env.AAPI_BOT_BDMIL_ALERTA || ''

    const alerta = await prisma_db.alertas.findMany({
        where:{status:0}
    })   
    
    function createInlineKeyboardAlert() {
        return {
          inline_keyboard: [
            [
                { text: 'Listar e Deletar Alertas', callback_data: `ALERTAS`}
            ],
            [
                { text: "CADASTRAR NOVA PALAVRA CHAVE", callback_data: `PALAVRA`}
            ],
          ],
        };
      }

    if(alerta.length>0){
    
    for await ( let item of alerta) {
        
        const dataAtual = moment(); // Obtém a data e hora atual
        const dataProduto = moment(item.updated_at); // Converte a data do alerta para um objeto Moment
        const minutos = dataAtual.diff(dataProduto, 'minutes');

        if(minutos>3){
            await prisma_db.alertas.delete({
                where:{id: item.id}
            })

            try {
                await axios.post(`https://api.telegram.org/bot${botAlerta}/sendMessage`, // bot CentrallTest4
                {
                parse_mode: 'HTML',
                chat_id: item.id_telegram,
                text: `❌ Seu processo de criação foi expirado!`,          
                reply_markup: createInlineKeyboardAlert(),
                });
                
            } catch (error) {}
        }
    }

    }    
} 