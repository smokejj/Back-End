import { Request, Response } from "express";
import { Usuario, usuario } from "../models/Usuarios";

// Criar um novo usuário
export const criarUsuario = (req: Request, res: Response) => {
    const { id, nome, email } = req.body;

    if (!id || !nome || !email) {
        res.status(400).json({ mensagem: "Todos os campos são obrigatorios!" })
        return
    }
    const novoUsuario = new Usuario(id, nome, email);
    usuario.push(novoUsuario);
    res.status(201).json({ mensagem: "Usuário criado com sucesso!", usuario: novoUsuario });
    return;
};

// Listar todos os usuários
export const listarUsuarios = (req: Request, res: Response) => {
    res.status(200).json(usuario);
};

// Buscar um usuário por ID
export const buscarUsuarioPorId = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const usuarios = usuario.find(u => u.id === id);
    if (!usuarios) {
        res.status(404).json({ mensagem: "Usuário não encontrado" });
        return;
    }
    res.status(200).json(usuario);
    return;
};

// Atualizar um usuário
export const atualizarUsuario = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome, email } = req.body;

    if (!id) {
        res.status(400).json({ mensagem: "ID é obrigatorios" });
        return;
    }

    if (!nome && !email) {
        res
            .status(400)
            .json({ mensagem: "preencha ao menos um campo (email/nome)" });
        return;
    }

    const usuarios = usuario.find((u) => u.id === id);

    if (!usuarios) {
        res.status(404).json({ mensagem: "Usuário não encontrado" });
        return;
    }

    usuarios.nome = nome || usuarios.nome;
    usuarios.email = email || usuarios.email;

    res
        .status(200)
        .json({ mensagem: "Usuário atualizado com sucesso!", usuario });
};

// Deletar um usuário
export const deletarUsuario = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = usuario.findIndex(u => u.id === id);

    if (index === -1) {
        res.status(404).json({ mensagem: "Usuário não encontrado" });
        return;
    }
    usuario.splice(index, 1);
    res.status(200).json({ mensagem: "Usuário deletado com sucesso!" });
};