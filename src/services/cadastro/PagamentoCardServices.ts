import crypto from "crypto";
import { prisma_db } from "../../database/prisma_db";
import api from "../api_pagarme/api";

interface dados {        
      valor: string;
      pedido_id: number;
      // Dados user
      name: string;
      email: string;
      document: string;
      telefone: string; // Número

      // Dados Pagamento
      holder_name: string;
      number_card: string;
      exp_month: number; // MÊs
      exp_year: number; // Ano
      cvv: string;

      // Endereço
      endereco: string;
      endereco_number: string;
      complemento: string;
      cep: string;
      city: string; // Cidade
      state: string; // Eatado     

}

async function PagamentoCardServices(dados: dados) {

  const codigo = `ped_${crypto.randomBytes(7).toString("hex")}`; // Gera 6 digitos entre letras e numeros para criar codigo da venda.

  const dadosCredit = {
    items: [
      {
        amount: dados.valor,
        description: "BDMIL",
        quantity: 1,
        code: codigo,
        category: 'credit_card',
        seller: {
          document: dados.document,
          name: "BDMIL",
          description: "BDMIL",
          address: {
            line_1: dados.endereco,
            zip_code: dados.cep,
            city: dados.city,
            state: dados.state,
            country: 'BRL',
          },
        },
      },
    ],

    customer: {
      code: codigo,
      name: dados.name,
      email: dados.email,
      document_type: "CPF",
      document: dados.document,
      type: "Individual",
      address: {
        line_1: dados.endereco,
        zip_code: dados.cep,
        city: dados.city,
        state: dados.state,
        country: 'BRL',
      },
      phones: {
        home_phone: {
          country_code: '55', // EX. 55
          number: '',
          area_code: '', // DDD
        },
      },
    },
    payments: [
      {
        payment_method: "credit_card",
        credit_card: {
          recurrence: false,
          // quantidade de parcelas
          installments: '1',
          document_number: codigo,
          statement_descriptor: "BDMIL",
          card: {
            holder_name: dados.holder_name,
            number: dados.number_card,
            exp_month: dados.exp_month,
            exp_year: dados.exp_year,
            cvv: dados.cvv,
            billing_address: {
              line_1: dados.endereco,
              zip_code: dados.cep,
              city: dados.city,
              state: dados.state,
              country: 'BRL',
            },
          },
        },
      },
    ],
    metadata: {
      empresa: "bdmil",
    },
  };

  let dados_pagarme;

  try {
    // Fazer um post no método de pagamento
    const data = await api.post("/orders", dadosCredit);

    const dados = data.data;

    if (
      dados.status === "paid" ||
      dados.status === "pending"
    ) {
      dados_pagarme = dados;
    } else {
      throw new Error(`error`);
    }
  } catch (error) {
    throw new Error("erro_pagarme");
  }

  if(dados_pagarme){

    await prisma_db.pedidos.update({
      where:{id: dados.pedido_id},
      data:{
        status: dados_pagarme.status,
        transacao_id: dados_pagarme.charges[0].id,
        phone: dados.telefone
      }
    })

    const rec_pagarme = {
      status: 'ok',
      metodo_pagamento: 'credit_card',
  }
  return rec_pagarme
  } 
}

export default PagamentoCardServices;
