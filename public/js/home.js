const apiUrl = 'http://localhost:3000/pokemons';

let pokemons = []; 


function listarTodos() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            pokemons = data;
            renderizarLista(pokemons);
        })
        .catch(err => console.error("Erro ao listar:", erro));
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
    <span>#${pokemon.id} - ${pokemon.nome}</span>
    <div class="actions">
        <button class="edit" onclick="editarPokemon(${pokemon.id})">Editar</button>
        <button class="delete" onclick="excluirPokemon(${pokemon.id})">Excluir</button>
    </div>
    `;
        container.appendChild(card);
    });
}

function buscarPorNome() {
    const name = document.getElementBy("searchId").value.trim();
    if (name) {
        alert("Digite um nome válido.");
        return;
    }

    fetch(`${apiUrl}/${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Não encontrado");
            return res.json();
        })
        .then(pokemon => renderizarLista([pokemon]))
        .catch(() => {
            document.getElementById("pokemonList").innerHTML = "<p>Pokémon não encontrado.</p>";
        });
}

function adicionarPokemon() {
    const nome = prompt("Digite o nome do Pokémon:");
    if (!nome) return;

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome })
    })
        .then(() => listarTodos())
        .catch(err => console.error("Erro ao adicionar:", err));
}

function editarPokemon(id) {
    const pokemon = pokemons.find(p => p.id === id);
    const novoNome = prompt("Novo nome do Pokémon:", pokemon.nome || "");
    if (!novoNome) return;

    fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome })
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
    document.querySelector("button[onclick='']").onclick = buscarPorId;
    document.querySelector(".add").onclick = adicionarPokemon;
    document.querySelector(".listar").onclick = listarTodos;

    listarTodos();
});
