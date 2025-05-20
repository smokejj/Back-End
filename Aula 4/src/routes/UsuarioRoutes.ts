import { Router } from "express";
import { criarUsuario, listarUsuarios, buscarUsuarioPorId,deletarUsuario, atualizarUsuario } from "../controllers/UsuarioController";

const router = Router();

router.post("/usuarios", criarUsuario);
router.get("/usuarios", listarUsuarios);
router.get("/usuarios/:id", buscarUsuarioPorId);
router.put("/usuarios/:id", atualizarUsuario);
router.get("/usuarios/:id", deletarUsuario);

export default router;