import { Request, Response } from "express";
import { Produto, produto } from "../models/Produtos";

let id : number = 0;

export const criarProduto = (req: Request, res: Response) => {
    const { nome, preco } = req.body;

    if (!nome || !preco) {
        res.status(400).json({ mensagem: "Todos os campos são obrigatorios!" })
        return
    }
    id += 1;
    const novoProduto = new Produto(id + 1, nome, preco);
    produto.push(novoProduto);
    res.status(201).json({ mensagem: "Produto criado com sucesso!", usuario: novoProduto });
    return;
};

// Listar todos os produto
export const listarProduto = (req: Request, res: Response) => {
    res.status(200).json(produto);
};

// Buscar um produto por ID
export const buscarProdutoPorId = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const produtos = produto.find(u => u.id === id);
    if (!produtos) {
        res.status(404).json({ mensagem: "Produto não encontrado" });
        return;
    }
    res.status(200).json(produto);
    return;
};

// Atualizar um produto
export const atualizarProduto = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome, preco } = req.body;

    if (!id) {
        res.status(400).json({ mensagem: "ID é obrigatorios" });
        return;
    }

    if (!nome && !preco) {
        res
            .status(400)
            .json({ mensagem: "preencha ao menos um campo (email/nome)" });
        return;
    }

    const produtos = produto.find((u) => u.id === id);

    if (!produtos) {
        res.status(404).json({ mensagem: "Produto não encontrado" });
        return;
    }

    produtos.nome = nome || produtos.nome;
    produtos.preco= preco || produtos.preco;

    res
        .status(200)
        .json({ mensagem: "Produto atualizado com sucesso!", Produto});
};

// Deletar um usuário
export const deletarProduto = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = produto.findIndex(u => u.id === id);

    if (index === -1) {
        res.status(404).json({ mensagem: "Produto não encontrado" });
        return;
    }
    produto.splice(index, 1);
    res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
};