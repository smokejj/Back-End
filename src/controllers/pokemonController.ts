import { Request, Response } from 'express';
import { AppDataSource } from '../db/data-aource';
import { Pokemon } from '../models/pokemon';

const pokemonRepository = AppDataSource.getRepository(Pokemon);

export class PokemonController {
    // Listar todos os pokemons
    async list(req: Request, res: Response) {
        const pokemon = await pokemonRepository.find();
        res.status(200).json(pokemon);
        return;
    }

    // Criar novo pokemon
    async create(req: Request, res: Response) {
        const { name, tipo1, tipo2} = req.body

        const existName = await pokemonRepository.findOneBy({ name })

if (existName) {
    res.status(409).json({ message: 'Pokemon já existe' });
    return;
}
        if (name == '' || tipo1 == '') {
            res.status(400).json({ message: 'Preencha os campos necessarios' })
            return;
        }

        const pokemon = pokemonRepository.create({ name, tipo1, tipo2 });
        await pokemonRepository.save(pokemon);
        res.status(201).json(pokemon);
        return;
    }

    // Buscar Pokemon por nome
    async show(req: Request, res: Response) {
        const { name } = req.params;

        const pokemon = await pokemonRepository.findOneBy({ name: String(name) });

        if (!pokemon) {
            res.status(404).json({ message: 'Pokemon não encontrado' });
            return;
        }

        res.status(200).json(pokemon);
        return;
    }

    // Atualizar Pokemon
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, tipo1, tipo2 } = req.body;

        const pokemon = await pokemonRepository.findOneBy({ id: Number(id) });

        if (!pokemon) {
            res.status(404).json({ message: 'Pokemon não encontrado' });
            return;
        }

        if (!name || !tipo1 || !tipo2) {
            res.status(400).json({ message: 'Preencha pelo menon um' })
            return;
        }

        if (name !== null) {
            pokemon.name = name;
        }

        if (tipo1 !== null) {
            pokemon.tipo1 = tipo1;
        }

        if (tipo2 !== null) {
            pokemon.tipo2 = tipo2;
        }

        await pokemonRepository.save(pokemon);
        res.status(200).json(pokemon);
        return;
    }

    // Deletar Pokemon
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const pokemon = await pokemonRepository.findOneBy({ id: Number(id) });

        if (!pokemon) {
            res.status(404).json({ menssage: 'Pokemon não encontrado' });
            return;
        }

        await pokemonRepository.remove(pokemon);

        res.status(204).send();
        return;
    }
}