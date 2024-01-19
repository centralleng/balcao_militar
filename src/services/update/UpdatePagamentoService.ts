import axios from "axios";
import { prisma_db } from "../../database/prisma_db";
import moment from "moment";

interface dados {
  pagamento_id: string, 
  status: string, 
  porduto_id: number
}

export default async function UpdatePagamentoService(dados: dados) {
  console.log('1',dados)

const pedido = await prisma_db.pedidos.findUnique({
  where:{transacao_id: dados.pagamento_id},
  include:{
    produto:true,
    users:true,
  }
})

  console.log('2')

const valor = pedido?.produto.valor_produto || ''
const recomendado = pedido?.users.recomendado || 0
const desaconselhado = pedido?.users.desaconselhado || 0
const descricao:any = pedido?.produto.descricao

const alerta = await prisma_db.alertas.findMany()

console.log('3')

const alertas = alerta.filter((item) => descricao.includes(item.palavra_chave));
const usuarios_id = alertas.map(item => {return item.id_telegram})

console.log('4')

if(pedido){
  await prisma_db.pedidos.update({
    where:{id: pedido.id},
    data:{
       status: dados.status
    }
  })

  console.log('5')

  if(dados.status==='pago'){

    console.log('6')

    const grupo = await prisma_db.grupos.findUnique({
      where:{type: pedido.produto.categoria||''}
    }) 

    
    console.log('7')


    if(grupo){

      
    console.log('8')

        // Função para criar botões inline
function createInlineKeyboard(userTelegramId:any) {
  return {
    inline_keyboard: [
      [
        {
          text: 'Recomendo',
          callback_data: `recomendo_${userTelegramId}`,
        },
        {
          text: 'Desaconselho',
          callback_data: `desaconselho_${userTelegramId}`,
        },
      ],
    ],
  };
}

      try {
             // Enviar msg para os grupos 
      await axios.post('https://api.telegram.org/bot6962343359:AAERsmVCjSJczzeQ-ONe_nfVyQxQYDzFYlg/sendMessage', // Bot bdmil_venda
      {
        chat_id: grupo.id_grupo,
        text: `

Interessado em vender ${pedido.produto.descricao}

Valor ${(parseInt(valor)/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}

Envie o código [${pedido.produto.id}] para @BDMilquerocomprar para comprar dele.

${recomendado>0?`Recomendado por mais de ${recomendado} pessoas`:`Ainda não recomendado`}

${desaconselhado>0?`desaconselhado por ${desaconselhado} pessoas ${desaconselhado} pessoas`:`Não desaconselhado ainda por ostros usuários`}

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

Conta verificada ✅

Membro desde ${moment(pedido.users.created_at).format('DD-MM-YYYY')}

`,
reply_markup: createInlineKeyboard(grupo.id_grupo),
      });
        
      } catch (error) {console.log('erro 01')}


      try {
         // Enviar msg para o vendedor 
    await axios.post('https://api.telegram.org/bot6962343359:AAERsmVCjSJczzeQ-ONe_nfVyQxQYDzFYlg/sendMessage', // Bot bdmil_venda
    {
      chat_id: pedido.users.id_telegram,
      text: `

Seu produto ${pedido.produto.descricao} foi ativado com sucesso!

Valor ${(parseInt(valor)/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}

Código produto ${pedido.produto.id}.

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

`,
    });
        
      } catch (error) {console.log('erro 02')}

for await (const i of usuarios_id){
  try {
    // Enviar msg para aleras cadastrados 
await axios.post('https://api.telegram.org/bot6302850791:AAEllHI-dUdbpmhQ30havovumAAXBT1Qnmc/sendMessage', // bot CentrallTest4
{
 chat_id: i,
 text: `
🚨 Alerta

Interessado em vender ${pedido.produto.descricao}

Valor ${(parseInt(valor)/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}

Envie o código ${pedido.produto.id} para @BDMilquerocomprar para comprar dele.

${recomendado>0?`Recomendado por mais de ${recomendado} pessoas`:`Ainda não recomendado`}

${desaconselhado>0?`desaconselhado por ${desaconselhado} pessoas ${desaconselhado} pessoas`:`Não desaconselhado ainda por ostros usuários`}

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

Conta verificada ✅

Membro desde ${moment(pedido.users.created_at).format('DD-MM-YYYY')}

`,
});
   
 } catch (error) {console.log('erro 03')}

} 
    }else{
      // enviar informação de falha 
    }
 
  }else {

    // enviar msg para usuário e apagar msg dele no grupo

  }

  return 'ok'
  
} 
return 'error'
}
