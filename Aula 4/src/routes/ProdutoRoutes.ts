import { Router } from "express";
import { criarProduto, listarProduto, buscarProdutoPorId,deletarProduto, atualizarProduto } from "../controllers/produtoController";

const router = Router();

router.post("/produtos", criarProduto);
router.get("/produtos", listarProduto);
router.get("/produtos/:id", buscarProdutoPorId);
router.put("/produtos/:id", atualizarProduto);
router.delete("/produtos/:id", deletarProduto);

export default router;