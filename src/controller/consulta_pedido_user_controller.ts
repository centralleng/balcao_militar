import { Request, Response } from "express";
import { Consultas_pedido_user_Service } from "../services/consultas/pedido_user_Service";

class Consulta_pedido_user_controller {
  async handle(request: Request, response: Response) { 

    const {id_checkout} = request.body;

    console.log(id_checkout)

    const pedido = await Consultas_pedido_user_Service(id_checkout)

    return response.json(pedido);
  }
}

export { Consulta_pedido_user_controller };