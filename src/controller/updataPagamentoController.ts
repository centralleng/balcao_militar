import { Request, Response } from "express";
import UpdatePagamentoService from "../services/update/UpdatePagamentoService";

class Update_pagamento_controller {
  async handle(request: Request, response: Response) {  
    
    const dados = request.body
    
    await UpdatePagamentoService(dados)
 
    return response.json('ok');
  }
}

export { Update_pagamento_controller };

