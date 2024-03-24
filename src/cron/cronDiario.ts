import cron from "node-cron";
import { deletarProdutoAbandonado } from "../services/deletar/produtoService";
import { deletarAlertaAbandonado } from "../services/deletar/alertaTimeService";

export class cronDiario {   
    static envia() {
        cron.schedule('*/2 * * * *', () => { // executar a cada 5 segundos
            deletarProdutoAbandonado();
            deletarAlertaAbandonado();
        }, {
            scheduled: true,
            timezone: "America/Sao_Paulo"
        });
    }  
}

  