import { Request, Response } from "express";
import { Consultas_pedidoService } from "../services/consultas/pedidoService";

class Consulta_pedido_controller {
  async handle(request: Request, response: Response) { 

    const {dados} = request.body;

    console.log('veio teset')

    const pedido = await Consultas_pedidoService(dados)

    return response.json(pedido);
  }
}

export { Consulta_pedido_controller };