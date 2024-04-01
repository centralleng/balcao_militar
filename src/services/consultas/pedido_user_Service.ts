import { prisma_db } from "../../database/prisma_db";


async function Consultas_pedido_user_Service(id_checkout:string) {

  if (id_checkout) {
    // Certifique-se de que id_checkout seja um número antes de chamar parseInt
    const parsedId = id_checkout;

      const pedido = await prisma_db.users.findUnique({
        where: { id: parsedId },
      });      

      if (pedido) {
        return pedido;
      } else {
        throw new Error("Pedido não encontrado");
      }
  } else {
    throw new Error("ID do produto não fornecido");
  }
}

export { Consultas_pedido_user_Service };
