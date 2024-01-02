import { Router } from "express";

import { Pagamento_controller } from "./controller/pagamento_Controller";
import { Update_pagamento_controller } from "./controller/updataPagamentoController";

const router = Router();

const pagamento_controller = new Pagamento_controller();
const update_pagamento_controller = new Update_pagamento_controller();

router.get("/", function(req, res){
  res.send("Servidor Rodando - api - BALCAO MILITAR")
});

router.post("/pagamento_bdmil",
pagamento_controller.handle);

router.post("/update_pagamento",
update_pagamento_controller.handle);

router.post("/consulta_pedido",
update_pagamento_controller.handle);

export { router };