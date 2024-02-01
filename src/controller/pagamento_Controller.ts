import { Request, Response } from "express";
import PagamentoPixService from "../services/cadastro/PagamentoPixService";
import PagamentoCardServices from "../services/cadastro/PagamentoCardServices";

class Pagamento_controller {
  async handle(request: Request, response: Response) {

    const {dados} = request.body;

    if(dados.metodo_pagamento==="pix"){
      const pagamento = await PagamentoPixService(dados)
      return response.json(pagamento);
    }else{
      const pagamento = await PagamentoCardServices(dados)
      return response.json(pagamento);
    }   
  }
}

export { Pagamento_controller };