import axios from "axios";
import { prisma_db } from "../../database/prisma_db";
import moment from "moment";

interface dados {
  transacao_id: string,
  status: string,
  pedido_id: number
}

export default async function UpdatePagamentoService(dados: dados) {

  console.log('Passo 02',dados)

const pedido = await prisma_db.pedidos.findUnique({
  where:{transacao_id: dados.transacao_id},
  include:{
    produto:true,
    users:true,
  }
})

console.log('01')

const valor = pedido?.produto.valor_produto || 0
const recomendado = pedido?.users.recomendado || 0
const desaconselhado = pedido?.users.desaconselhado || 0
const descricao:any = pedido?.produto.descricao

console.log('02')

const alerta = await prisma_db.alertas.findMany()

const alertas = alerta.filter((item)=> item.palavra_chave in descricao)
const usuarios_id = alertas.map(item => { return item.id})

console.log('03')


console.log(
  'pedido:', pedido,
  'alertas:', alerta,
  'map ids_telegram:', usuarios_id,
)

if(pedido){
  await prisma_db.pedidos.update({
    where:{id: pedido.id},
    data:{
       status: dados.status
    }
  })

  if(dados.status==='pago'){

    const grupo = await prisma_db.grupos.findUnique({
      where:{type: pedido.produto.categoria||''}
    })

    if(grupo){

      try {
             // Enviar msg para os grupos 
      await axios.post('https://api.telegram.org/bot6962343359:AAERsmVCjSJczzeQ-ONe_nfVyQxQYDzFYlg/sendMessage', // Bot bdmil_venda
      {
        chat_id: grupo.id_grupo,
        text: `

Interessado em vender (fardamento)

${pedido.produto.descricao}

Valor R$ ${(valor/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}

Envie o código ${pedido.produto.id} para @BDMilquerocomprar para comprar dele.

${recomendado>0?`Recomendado por mais de ${recomendado} pessoas`:`Ainda não recomendado`}

${desaconselhado>0?`desaconselhado por ${desaconselhado} pessoas ${desaconselhado} pessoas`:`Não desaconselhado ainda por ostros usuários`}

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

Conta verificada ✅

Membro desde ${moment(pedido.users.created_at).format('DD-MM-YYYY')}

`,
      });
        
      } catch (error) {console.log('erro 01')}


      try {
         // Enviar msg para o vendedor 
    await axios.post('https://api.telegram.org/bot6962343359:AAERsmVCjSJczzeQ-ONe_nfVyQxQYDzFYlg/sendMessage', // Bot bdmil_venda
    {
      chat_id: pedido.users.id_telegram,
      text: `

Seu produto ${pedido.produto.descricao} foi ativado com sucesso!

Valor R$ ${(valor/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}

Código produto ${pedido.produto.id}.

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

Conta verificada ✅

Membro desde ${moment(pedido.users.created_at).format('DD-MM-YYYY')}

`,
    });
        
      } catch (error) {console.log('erro 02')}
      
      try {
        // Enviar msg para aleras cadastrados 
   await axios.post('https://api.telegram.org/bot6962343359:AAERsmVCjSJczzeQ-ONe_nfVyQxQYDzFYlg/sendMessage', // Bot bdmil_venda
   {
     chat_id: [usuarios_id],
     text: `

     🚨Alerta

     Interessado em vender (fardamento)

     ${pedido.produto.descricao}
     
     Valor R$ ${(valor/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
     
     Envie o código ${pedido.produto.id} para @BDMilquerocomprar para comprar dele.
     
     ${recomendado>0?`Recomendado por mais de ${recomendado} pessoas`:`Ainda não recomendado`}
     
     ${desaconselhado>0?`desaconselhado por ${desaconselhado} pessoas ${desaconselhado} pessoas`:`Não desaconselhado ainda por ostros usuários`}
     
     Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.
     
     Conta verificada ✅
     
     Membro desde ${moment(pedido.users.created_at).format('DD-MM-YYYY')}

`,
   });
       
     } catch (error) {console.log('erro 03')}   

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
