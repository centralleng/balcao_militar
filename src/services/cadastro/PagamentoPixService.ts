import moment from "moment";
import { prisma_db } from "../../database/prisma_db";
import crypto from "crypto";
import api from "../api_pagarme/api";

interface dados {
  metodo_pagamento: string,
  valor: string,
  nome: string,
  email: string,
  document: string,
  pedido_id: number,
  ddd: string,
  telefone: string,
  tipo: string,
}

export default async function PagamentoPixServices(dados: dados) {

  // const indiceParenteses = dados.telefone.indexOf(')');
  // const telefone = dados.telefone.substring(indiceParenteses + 1).replace(/\D/g, '');
  // const ddd = dados.telefone.split('(')[1].split(')')[0];

  if(dados.tipo==='credito'){
    await prisma_db.pedidos.update({
      where:{id: dados.pedido_id},
      data:{
        tipo: 'credito'
      }
    })
  }
  if(dados.tipo==='produto'){
    await prisma_db.pedidos.update({
      where:{id: dados.pedido_id},
      data:{
        tipo: 'produto'
      }
    })
  }

  const codigo = crypto.randomBytes(3).toString('hex'); // Gera 6 dígitos entre letras e números

  const dadosPix = {
    "items": [
        {
        "amount": dados.valor, // db_contrato.valor,
        "description": 'BDMIL',
        "quantity": 1,
        "code": codigo,
        }
    ],
    "customer": {
        "code": codigo,
        "name": dados.nome, // db_cliente.nome,
        "email": dados.email,
        "document_type": 'CPF', // : db_cliente.type_document,
        "type": 'Individual', // db_cliente.type,
        "document": dados.document, // db_cliente.documento, 66.917.329/0001-20
        
        "phones": {
            "home_phone": {
                "country_code": '55', // EX. 55
                "number": dados.telefone,
                "area_code": dados.ddd, // DDD
            }
        }
    },
    "payments": [
        {               
        "payment_method": 'pix',
        "pix": {
            "expires_in": '1000000',             
        },                       
        }            
        ],

        "metadata": {
          "empresa": "bdmil",
        }           
    } 

  

  let dados_pagarme
    try {
    // Fazer um post no método de pagamento 
    const {data}  = await api.post("/orders", dadosPix);
      if(data.status==="failed"){
      throw new Error('error');
    }
    dados_pagarme = data
  } catch (error) {
    console.error('Erro ao criar registros de produtos:');
    throw new Error('Erro no pagamento');
  }  

  if(dados_pagarme){

    await prisma_db.pedidos.update({
      where:{id: dados.pedido_id},
      data:{
        status: dados_pagarme.status,
        transacao_id: dados_pagarme.charges[0].id,
      }
    })   

    const rec_pagarme = {
      status: 'ok',
      metodo_pagamento: 'pix',
      qr_code: dados_pagarme.charges[0].last_transaction.qr_code,
      qr_code_url: dados_pagarme.charges[0].last_transaction.qr_code_url,
  }
  return rec_pagarme
  }

}
