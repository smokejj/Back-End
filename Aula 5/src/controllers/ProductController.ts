import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Product } from '../models/Product';

const produtoRepository = AppDataSource.getRepository(Product);

export class ProductController {
    // Listar todos os produtos
    async list(req: Request, res: Response) {
        const produtos = await produtoRepository.find();
        res.json(produtos);
        return;
    }

    // Criar novo produto
    async create(req: Request, res: Response) {
        const { name, price, desc } = req.body;

        const produto = produtoRepository.create({ name, price, desc });
        await produtoRepository.save(produto);

        res.status(201).json(produto);
        return;
    }

    // Buscar produto por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const produto = await produtoRepository.findOneBy({ id: Number(id) });

        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return
        }

        res.json(produto);
        return
    }

        // Buscar produto pelo nome
    async shew(req: Request, res: Response) {
        const { name } = req.params;

        const produto = await produtoRepository.findOneBy({ name: String(name) });

        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return
        }

        res.json(produto);
        return
    }

    // Atualizar usuário
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, price, desc } = req.body;

        const produto = await produtoRepository.findOneBy({ id: Number(id) });

        if (!produto) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }

        produto.name = name;
        produto.price = price;
        produto.desc = desc;

        await produtoRepository.save(produto);

        res.json(produto);
        return
    }

    // Deletar produto
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const produto = await produtoRepository.findOneBy({ id: Number(id) });

        if (!produto) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
        }

        await produtoRepository.remove(produto);

        res.status(204).send();
        return;
    }
}