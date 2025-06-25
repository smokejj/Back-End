document.addEventListener('DOMContentLoaded', () => {
    let login = confirm('Já tem login?');
    if(login) {
        location.href = "./index.html"
    }
})