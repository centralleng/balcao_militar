import { Router } from "express";
import multer from "multer";

// configuração de imagens

const router = Router();


router.get("/", function(req, res){
  res.send("Servidor Rodando - api - BALCAO MILITAR")
});

export { router };