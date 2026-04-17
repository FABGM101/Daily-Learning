const formulario = document.querySelector('form');
const elementoMensagem = document.getElementById('welcome');

const NewMission = document.getElementById('new-mission');
const NewMissionBtn = document.getElementById('new-mission-btn');
const NewMissionClass = document.querySelector('.newmission');
const NewMissionBtnClass = document.querySelector('.newmission-btn');


const selobtn = document.getElementById('btn-enter');
const selo = document.querySelector('.seal');
const selomsg = document.querySelector('.seal-msg');
const seloMensagem = document.getElementById('seal-msg');

const heroiSalvo = localStorage.getItem('heroiReg');
const emailSalvo = localStorage.getItem('emailReg');

const logout = document.getElementById('btn-logout');
const BodyBackground = document.getElementById('body-a');
const MuralArea = document.getElementById('mural');

let TaskMural = JSON.parse(localStorage.getItem('SavedMissions')) || [
    "Derrote os goblins na caverna ao norte de Voidsky",
    "Ajude o rei de Kylmane com os protestos em prol dos não-humanos",
    "Entregue a carta da guilda dos mercadores nas províncias de Ilbath",
    "Faça essas malditas crianças pararem de jogar pedras nas corujas (Mais 50GL por criança jogada na fonte)"    
];

if(heroiSalvo && emailSalvo){
    formulario.classList.add('vanish');
    logout.style.display = 'flex';
    logout.addEventListener('click', function(){
        localStorage.removeItem('heroiReg');
        localStorage.removeItem('emailReg');
        location.reload();
    });
    ShowSeal();
    SealMsgWelcomeBack();
}
selobtn.addEventListener('click', async function(){
    selo.style.display = 'none';
    seloMensagem.style.display = 'none';
    logout.style.display = 'none';
    MuralArea.classList.remove('vanish');
    MuralArea.classList.add('Mural');
    BodyBackground.classList.add('body-transition'); 


    
    const MissionMural = document.createElement('h3');
    MissionMural.textContent = 'Mural de missões';
    MuralArea.prepend(MissionMural);

    const MissionZone = document.getElementById('mission-zone');


    try {
        const answer = await fetch('http://127.0.0.1:8000/missions');
        
        const ServerMissions = await answer.json();

        ServerMissions.forEach(function(mission){
            const NewParagraph = document.createElement('p');

            const MissionBox = document.createElement('div');
            MissionBox.classList.add('mission-box');
        
            NewParagraph.textContent = `🪶${mission.texto}`;
            NewParagraph.classList.add('Missions');
            NewParagraph.dataset.text = `🪶${mission.texto}`;


            const DelBtn = document.createElement('button');
            DelBtn.textContent = '';
            DelBtn.classList.add('del-btn');
            DelBtn.addEventListener('click', function(){
            MissionBox.remove();

            ServerMissions = ServerMissions.filter(mission => mission !== mission);

            localStorage.setItem('SavedMissions', JSON.stringify(ServerMissions));
            });


            NewParagraph.addEventListener('click', function(){

                if(NewParagraph.classList.contains('mission-acquired')){

                    NewParagraph.classList.add('revert-acquired');

                    setTimeout(function(){
                        NewParagraph.textContent = `🪶${mission.texto}`;
                        NewParagraph.classList.remove('revert-acquired');
                        NewParagraph.classList.remove('mission-acquired');
                    
                        NewParagraph.classList.add('Missions');
                    }, 400);
                }
                else{
                    NewParagraph.textContent = `${mission.texto}`;
                    NewParagraph.classList.remove('Missions');
                    NewParagraph.classList.add('mission-acquired');
                }
            });

            MissionBox.appendChild(NewParagraph);
            MissionBox.appendChild(DelBtn);

            MissionZone.appendChild(MissionBox);
        });

        const MissionList = document.querySelectorAll('.Missions');
        MissionList.forEach(missao => {
            missao.addEventListener('mousemove', (evento) => {
                const retangulo = missao.getBoundingClientRect();
                const x = evento.clientX - retangulo.left;
                const y = evento.clientY - retangulo.top;

                missao.style.setProperty('--x', `${x}px`);
                missao.style.setProperty('--y', `${y}px`);
            });
        });
    
    } catch (error404) {
        console.error("Error", error404);
    }

});

function ShowSeal() {
selo.style.display = 'block';
selo.style.top = '50%';
selo.style.left = '50%';
selo.style.transform = 'translate(-50%, -50%)';
}
function SealMsg(){
    seloMensagem.style.display = 'flex';
    seloMensagem.innerHTML = `A Guilda da Folha o espera!`;
}
function SealMsgWelcomeBack(){
    seloMensagem.style.display = 'flex';
    seloMensagem.innerHTML = `Bem vindo de volta, ${heroiSalvo}`;
}

formulario.addEventListener('submit', function(evento){
    evento.preventDefault()
    const campoNome = document.getElementById('name');
    const campoEmail = document.getElementById('email');
    if(campoNome.value === ""){
        elementoMensagem.classList.remove('vanish');
        elementoMensagem.classList.add('error-msg');
        elementoMensagem.innerHTML = `Opa Opa Opa, aonde você pensa que vai sem um nome? GUARDAS!`
        setTimeout(function(){
            elementoMensagem.innerHTML = ``;
            elementoMensagem.classList.remove('error-msg');
        }, 5000);
    }else if (campoEmail.value === ""){
        elementoMensagem.classList.remove('vanish');
        elementoMensagem.classList.add('error-msg');
        elementoMensagem.innerHTML = `Ei! ${campoNome.value}! Sem um endereço, não temos para onde mandar as coru- <br>
                                        Larguem elas! Malditos pivetes...`
    }else{
        elementoMensagem.classList.remove('vanish');
        elementoMensagem.classList.add('success-msg');
        elementoMensagem.innerHTML = `Bem vindo a guilda, ${campoNome.value}! <br>
                                    Enviaremos uma coruja para ${campoEmail.value},
                                    assim que essas crianças infelizes pararem de jogar pedras nelas... <br>
                                    Ah! Cuidado, há goblins por perto...`
        formulario.classList.add('vanish');
        localStorage.setItem('heroiReg', campoNome.value);
        localStorage.setItem('emailReg', campoEmail.value);
        setTimeout(function(){
            elementoMensagem.innerHTML = ``;
            ShowSeal();
            SealMsg();
        },3000);
    }
});
formulario.addEventListener('reset', function(evento){
    elementoMensagem.classList.remove('success-msg');
    elementoMensagem.classList.add('error-msg');
    elementoMensagem.innerHTML = 'Ora Ora Ora... Se não é um maldito goblin na minha guilda. SAIA!'

});



NewMissionClass.addEventListener('submit', function(evento){
    evento.preventDefault();

    const textMission = NewMission.value;


    if(textMission.trim() === "") return;

    const NewParagraph = document.createElement('p');

    NewParagraph.textContent = `🪶${textMission}`;
    NewParagraph.classList.add('Missions');
    NewParagraph.dataset.text = `🪶${textMission}`;

    const MissionBox = document.createElement('div');
    MissionBox.classList.add('mission-box');

    const DelBtn = document.createElement('button');
    DelBtn.textContent = '';
    DelBtn.classList.add('del-btn');
    DelBtn.addEventListener('click', function(){
        MissionBox.remove();

        TaskMural = TaskMural.filter(mission => mission !== textMission);

        localStorage.setItem('SavedMissions', JSON.stringify(TaskMural));
    });

    NewParagraph.addEventListener('click', function(){

        if(NewParagraph.classList.contains('mission-acquired')){

            NewParagraph.classList.add('revert-acquired');

            setTimeout(function(){
                NewParagraph.textContent = `🪶${textMission}`;
                NewParagraph.classList.remove('revert-acquired');
                NewParagraph.classList.remove('mission-acquired');
                    
                NewParagraph.classList.add('Missions');
            }, 400);
        }
        else{
            NewParagraph.textContent = `${textMission}`;
            NewParagraph.classList.remove('Missions');
            NewParagraph.classList.add('mission-acquired');
        }
    });

    NewParagraph.addEventListener('mousemove', (evento) => {
        const retangulo = NewParagraph.getBoundingClientRect();
        const x = evento.clientX - retangulo.left;
        const y = evento.clientY - retangulo.top;

        NewParagraph.style.setProperty('--x', `${x}px`);
        NewParagraph.style.setProperty('--y', `${y}px`);
    });    

        
    const MissionZone = document.getElementById('mission-zone');
    TaskMural.push(textMission);
    localStorage.setItem('SavedMissions', JSON.stringify(TaskMural));

    MissionBox.appendChild(NewParagraph);
    MissionBox.appendChild(DelBtn);

    MissionZone.appendChild(MissionBox);
    NewMission.value = '';


});