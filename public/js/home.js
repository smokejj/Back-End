const apiUrl = 'http://localhost:3000/api/pokemon';

let pokemons = [];

listarTodos();

function listarTodos() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            pokemons = data;
            lista(pokemons);
        })
        .catch(err => console.error("Erro ao listar:", err));
}

function lista(lista) {
    const container = document.getElementById("pokemonList");
    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum Pokémon encontrado.</p>";
        return;
    }

    lista.forEach(pokemon => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
    <span>#${pokemon.id} - ${pokemon.name}</span>
    <div class="actions">
        <button class="edit" onclick="editarPokemon(${pokemon.id})">Editar</button>
        <button class="delete" onclick="excluirPokemon(${pokemon.id})">Excluir</button>
    </div>
    `;
        container.appendChild(card);
    });
}

function buscarPorNome() {
    const name = document.getElementById("searchId").value.trim();

    if (!name) {
        alert("Digite um nome válido.");
        return;
    }

    fetch(`${apiUrl}/${encodeURIComponent(name)}`)
        .then(res => {
            if (!res.ok) throw new Error("Não encontrado");
            return res.json();
        })
        .then(pokemon => lista([pokemon]))
        .catch(() => {
            document.getElementById("pokemonList").innerHTML = "<p>Pokémon não encontrado.</p>";
        });
}


function adicionarPokemon() {
    const nome = prompt("Digite o nome do Pokémon:");
    const tipo1 = prompt("Digite o tipo 1 do Pokémon:");
    const tipo2 = prompt("Digite o tipo 2 do Pokémon:");

    if (!nome || !tipo1 || !tipo2) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nome, tipo1, tipo2 })
    })
        .then(() => listarTodos())
        .catch(err => console.error("Erro ao adicionar:", err));
}

function editarPokemon(id) {
    const pokemon = pokemons.find(p => p.id === id);
    const novoNome = prompt("Novo nome do Pokémon:", pokemon?.name || "");
    const novoTipo1 = prompt("Novo tipo1 do Pokémon:", pokemon?.tipo1 || "");
    const novoTipo2 = prompt("Novo tipo2 do Pokémon:", pokemon?.tipo2 || "");
    if (!novoNome) return;
    if (!novoTipo1) return;
    if (!novoTipo2) return;

    fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: novoNome, tipo1: novoTipo1, tipo2: novoTipo2 })
    })
        .then(() => listarTodos())
        .catch(err => console.error("Erro ao editar:", err));
}

function excluirPokemon(id) {
    if (!confirm("Deseja excluir este Pokémon?")) return;

    fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
        .then(() => listarTodos())
        .catch(err => console.error("Erro ao excluir:", err));
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addBtn").onclick = adicionarPokemon;
    document.getElementById("listBtn").onclick = listarTodos;
    document.getElementById("searchBtn").onclick = buscarPorNome;

    listarTodos();
});
