document.addEventListener('DOMContentLoaded', () => {
    let cadastro = confirm('Já tem login?');
    if (cadastro) {
        location.href = "./index.html"
    }
})


document.getElementById("cadastroForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({  email, password })
    })
        .then(res => res.json())
        .then(data => {
            alert("Cadastro realizado com sucesso!");
            console.log(data);
            window.location.href = "index.html";
        })
        .catch(err => {
            alert("Erro ao cadastrar!");
            console.error(err);
        });
});
