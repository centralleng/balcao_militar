import cron from "node-cron";
import { deletarProdutoAbandonado } from "../services/deletar/produtoService";

export class cronDiario {   
    static envia() {
        cron.schedule('*/5 * * * * *', () => { // executar a cada 5 segundos
            deletarProdutoAbandonado();
        }, {
            scheduled: true,
            timezone: "America/Sao_Paulo"
        });
    }  
}

  