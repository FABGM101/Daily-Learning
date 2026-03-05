const formulario = document.querySelector('form');
const elementoMensagem = document.getElementById('welcome');
formulario.addEventListener('submit', function(evento){
    evento.preventDefault()
    const campoNome = document.getElementById('name');
    const campoEmail = document.getElementById('email');
    elementoMensagem.innerHTML = `Bem vindo a guilda, ${campoNome.value}! <br>
                                    Enviaremos uma coruja para ${campoEmail.value},
                                    assim que essas crianças infelizes pararem de jogar pedras nelas... <br>
                                    Ah! Cuidado, há goblins por perto...`;
});
formulario.addEventListener('reset', function(evento){
    evento.preventDefault()
    alert("Ora Ora Ora... Se não é um maldito goblin na minha guilda. SAIA!");
});