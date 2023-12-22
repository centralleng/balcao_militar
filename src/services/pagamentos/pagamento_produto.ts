import crypto from "crypto";
import { prisma_db } from "../../database/prisma_db";
import moment from "moment";
import api from "../api_asaas/api";

export default async function Pagamento (documento:string, valor_produto:number) {     
    
    const valor = (valor_produto*0.03).toFixed(2)
    
    console.log(valor)
    
    const textoBoleto = ``

    let id_cliente

    const data_pagamento = moment().add(1, 'day').format("YYYY-MM-DD")

    try {
        // Fazer um post no método de pagamento 
        const {data}  = await api.get(`/customers?cpfCnpj=${documento}`);         
      
        id_cliente = data.data[0].id
       
        } catch (error) {
            console.log(error)
            throw new Error("assas");
        }

    const dadosPIx = {
        "customer": id_cliente,
        "billingType": "PIX",
        "value": valor,
        "dueDate": data_pagamento,
        // "description": textoBoleto,       
    }

    try {
        // Fazer um post no método de pagamento 
        const {data}  = await api.post(`/payments`,dadosPIx);      

        return data.invoiceUrl
        
        } catch (error) {
            const dados:any = error
            console.log(error)  
        }
   
}

