document.addEventListener('DOMContentLoaded', () => {
    let login = confirm('Não tem login?');
    if (login) {
        location.href = "./cadastro.html"
    }
})

    const form = document.getElementById("loginForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("senha").value;

            fetch("http://localhost:3000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
                .then(res => {
                    if (!res.ok) {
                        return res.json().then(data => {
                            throw new Error(data.message || "Erro no login");
                        });
                    }
                    return res.json();
                })
                .then(data => {
                    alert("Login realizado com sucesso!");
                    window.location.href = "home.html"; 
                })
                .catch(err => {
                    alert("Falha no login: " + err);
                    console.error(err);
                });
        });
    }

