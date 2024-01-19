import { Request, Response } from "express";
import UpdatePagamentoService from "../services/update/UpdatePagamentoService";

class Update_pagamento_controller {
  async handle(request: Request, response: Response) {  
    
    const dados = request.body

    try {

    const req = await UpdatePagamentoService(dados)
 
    return response.json(req);
      
    } catch (error) {

      throw new Error("erro");    

    }    
    
  }
}

export { Update_pagamento_controller };

