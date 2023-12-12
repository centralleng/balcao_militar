import cron from "node-cron";

export class cronDiario {   
    static envia() {
        cron.schedule('10 * * * * * *', () => {  
         
          }, {
            scheduled: true,
            timezone: "America/Sao_Paulo"
          })
    }  
}
  