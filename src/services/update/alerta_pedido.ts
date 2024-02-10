import axios from "axios";
import { prisma_db } from "../../database/prisma_db";
import moment from "moment";

export default async function Alerta_pedido (produto_id:number,user_id:string) {
  
    const botAlerta = process.env.API_BOT_BDMIL_ALERTA ||'' 

    const produto = await prisma_db.produtos.findUnique({
        where:{id: produto_id}
    })

    const user = await prisma_db.users.findUnique({
      where:{id: user_id}
  })

if(produto){

const valor = produto?.valor_produto || ''
const descricao:any = produto?.descricao
const recomendado = user?.recomendado || 0
const desaconselhado = user?.desaconselhado || 0

const alerta = await prisma_db.alertas.findMany()

const alertas_db = alerta.filter((item) => descricao.includes(item.palavra_chave));
const alertas = alertas_db.filter((item) => item.tipo_grupo===produto?.categoria);

const usuarios_id = alertas.map(item => {return item.id_telegram})

    const grupo = await prisma_db.grupos.findUnique({
      where:{type: produto?.categoria||''}
    }) 

    if(grupo){   

for await (const i of usuarios_id){
  try {
    // Enviar msg para aleras cadastrados 
await axios.post(`https://api.telegram.org/bot${botAlerta}/sendMessage`, // bot CentrallTest4
{
 chat_id: i,
 text: `
🚨 Alerta

Interessado em vender ${produto?.descricao}

Valor ${(parseInt(valor)/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}

Envie o código [*_${produto.id}_*](https://t.me/BDMilquerocomprar_bot?start=${produto.id}) para @BDMilquerocomprar_bot para comprar dele.

${recomendado>0?`Recomendado por mais de ${recomendado} pessoas`:`Ainda não recomendado`}

${desaconselhado>0?`desaconselhado por ${desaconselhado} pessoas ${desaconselhado} pessoas`:`Não desaconselhado ainda por ostros usuários`}

Em caso de problemas na negociação, o vendedor deverá devolver 100% do valor acordado ao comprador.

Conta verificada ✅

Membro desde ${moment(user?.created_at).format('DD-MM-YYYY')}

`,
parse_mode:"MarkdownV2",
});
   
 } catch (error) {console.log('erro 03')}

} 
    }else{
      // enviar informação de falha 
    }

  return 'ok'
  
} 

}

