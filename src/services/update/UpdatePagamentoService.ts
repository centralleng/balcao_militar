import { prisma_db } from "../../database/prisma_db";

interface dados {
  transacao_id: string,
  status: string,
  pedido_id: number
}

export default async function UpdatePagamentoService(dados: dados) {

const pedido = await prisma_db.pedidos.findUnique({
  where:{transacao_id: dados.transacao_id},
})

if(pedido){
  await prisma_db.pedidos.update({
    where:{id: pedido.id},
    data:{
       status: dados.status
    }
  })

  if(dados.status==='pago'){

    // enviar mensagem grupo e usuário
 
  }else {

    // enviar msg para usuário e apagar msg dele no grupo

  }

  return 'ok'
  
} 
return 'error'
}
