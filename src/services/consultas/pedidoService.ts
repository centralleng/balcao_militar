import { prisma_db } from "../../database/prisma_db";


async function Consultas_pedidoService(id_checkout:number) {

  if (id_checkout) {
    // Certifique-se de que id_checkout seja um número antes de chamar parseInt
    const parsedId = id_checkout;

    if (!isNaN(parsedId)) {
      const pedido = await prisma_db.pedidos.findUnique({
        where: { id: parsedId },
      });

      if (pedido) {
        return pedido;
      } else {
        throw new Error("Pedido não encontrado");
      }
    } else {
      throw new Error("ID do produto não é um número válido");
    }
  } else {
    throw new Error("ID do produto não fornecido");
  }
}

export { Consultas_pedidoService };
