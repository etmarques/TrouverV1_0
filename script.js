import { criaCampoFalta } from "./campoFalta.js";

const checkFalta = document.querySelectorAll('input[name="inlineRadioOptions6"]');
const campoFaltas = document.getElementById('listaFaltas');
const campoAddFaltas = document.getElementById('insereFalta');
const totalGlosas = document.getElementById('totalGlosas');

var elAglosaIni = [];
var elAglosaFim = [];
var elAglosaTot = [];
var diasGlosados = 0;
// console.log('o total de glosa é: ' + diasGlosados);

(function temFalta() {

    // capta a opção de que faltou
    checkFalta.forEach((elem) => {
        
        elem.addEventListener('change', (event) => {

            totalGlosas.classList.remove('visually-hidden');
            
            if (event.target.value == 'option2') {
                zeraGlosas();
                criaCampoFalta();
                criaSubstituto();
                computaGlosa();
                campoAddFaltas.classList.remove('visually-hidden');

                console.log("Ativou quando checkFalta() - quando não tem")
                console.log('o vetor Ini é: ' + elAglosaIni);
                console.log('o vetor Fim é: ' + elAglosaFim);
                console.log('o vetor Tot é: ' + elAglosaTot);
                console.log(diasGlosados);

            } else {
                
                while (campoFaltas.hasChildNodes()) {
                    campoFaltas.removeChild(campoFaltas.firstChild);
                }
                campoAddFaltas.classList.add('visually-hidden');
                zeraGlosas();

                console.log("Ativou quando checkFalta() - quando tem")
                console.log('o vetor Ini é: ' + elAglosaIni);
                console.log('o vetor Fim é: ' + elAglosaFim);
                console.log('o vetor Tot é: ' + elAglosaTot);
                console.log(diasGlosados);

            }

            console.log("Ativou checkFalta()")
            console.log('o vetor Ini é: ' + elAglosaIni);
            console.log('o vetor Fim é: ' + elAglosaFim);
            console.log('o vetor Tot é: ' + elAglosaTot);
            console.log(diasGlosados);
        });
    });
})();

(function adicionaFalta()  {
    let addFalta = document.getElementById('addFalta');
    addFalta.addEventListener("click", ()=> {
        criaCampoFalta();
        criaSubstituto();
        computaGlosa();

        console.log("Ativou adicionaFalta()")
        console.log('o vetor Ini é: ' + elAglosaIni);
        console.log('o vetor Fim é: ' + elAglosaFim);
        console.log('o vetor Tot é: ' + elAglosaTot);
        console.log(diasGlosados);
    })

})();

(function excluiFalta() {
    let cutFalta = document.getElementById('cutFalta');
    cutFalta.addEventListener("click", ()=> {

        elAglosaIni[elAglosaIni.length - 1] = null;
        elAglosaFim[elAglosaFim.length - 1] = null;
        elAglosaTot[elAglosaTot.length - 1] = null;
        diasGlosados = 0;

        campoFaltas.removeChild(campoFaltas.lastChild);
        
        calculaGlosa();


        if (campoFaltas.childNodes.length == 0) {
            checkFalta[1].checked = false;
            zeraGlosas();
            campoAddFaltas.classList.add('visually-hidden');
            totalGlosas.classList.add('visually-hidden');
        }

        console.log("Ativou excluiFalta()")
        console.log('o vetor Ini é: ' + elAglosaIni);
        console.log('o vetor Fim é: ' + elAglosaFim);
        console.log('o vetor Tot é: ' + elAglosaTot);
        console.log(diasGlosados);
       
    })

})();

function criaSubstituto() {
    let allElAs = document.querySelectorAll(`[id^="elA"]`);
    for(let i = 0; i < allElAs.length; i++) {
        allElAs[i].childNodes[1].lastChild.querySelectorAll('input').forEach((elem) =>{
            elem.addEventListener('change', (event) => {
                if(event.target.value == 'option1') {
                
                    console.log("Vet[i] a ser excluído()")
                    console.log('o vetor Ini é: ' + elAglosaIni[i]);
                    console.log('o vetor Fim é: ' + elAglosaFim[i]);
                    console.log('o vetor Tot é: ' + elAglosaTot[i]);
                    
                    elAglosaIni[i]=null;
                    elAglosaFim[i]=null;
                    elAglosaTot[i]=null;
                    diasGlosados = 0;

                    for(let i=0; i<elAglosaTot.length; i++){

                        if (isNaN(elAglosaIni[i]) 
                            || isNaN(elAglosaFim[i]) 
                            || elAglosaIni[i] == 0 
                            || elAglosaFim[i] == 0
                            ) {
                                continue;
                            } else {
                                diasGlosados += elAglosaTot[i];
                    }
                    }
                    if (diasGlosados > 0) {
                        totalGlosas.innerHTML = `Total de dias glosados: ${diasGlosados}`;
                    } else if (diasGlosados == 0 || diasGlosados == null) {
                        totalGlosas.innerHTML = 'Não há glosas por ausência de posto.'
                    }

                    console.log("Ativou criaSubstituto() - quando tem")
                    console.log('o vetor Ini é: ' + elAglosaIni);
                    console.log('o vetor Fim é: ' + elAglosaFim);
                    console.log('o vetor Tot é: ' + elAglosaTot);
                    console.log(diasGlosados);  
                    
                    allElAs[i].childNodes[2].lastChild.classList.remove('visually-hidden');
                    
                } else if (event.target.value == 'option2') {
                    
                    
                    //console.log(event.target.value);

                    elAglosaIni[i] = +allElAs[i].childNodes[1].childNodes[2].querySelector('input').value.slice(-2);
                    elAglosaFim[i] = +allElAs[i].childNodes[1].childNodes[3].querySelector('input').value.slice(-2);

                    if(elAglosaIni[i] > elAglosaFim[i]) {
                        elAglosaTot[i] = null;
                    } else if (elAglosaFim[i]==0 && elAglosaIni[i]==0){
                        elAglosaTot[i] = 0;
                        }
                        else {
                            elAglosaTot[i] = (elAglosaFim[i] - elAglosaIni[i])+1;
                        }
                    
                    diasGlosados = 0;

                    for (let i = 0; i < elAglosaTot.length; i++) {

                        if (isNaN(elAglosaIni[i])
                            || isNaN(elAglosaFim[i])
                            || elAglosaIni[i] == 0
                            || elAglosaFim[i] == 0
                        ) {
                            continue;
                        } else {
                            diasGlosados += elAglosaTot[i];
                        }
                    }
                    if (diasGlosados > 0) {
                        totalGlosas.innerHTML = `Total de dias glosados: ${diasGlosados}`;
                    } else if (diasGlosados == 0 || diasGlosados == null) {
                        totalGlosas.innerHTML = 'Não há glosas por ausência de posto.'
                    }

                    console.log("Ativou criaSubstituto() - quando não tem")
                    console.log('o vetor Ini é: ' + elAglosaIni);
                    console.log('o vetor Fim é: ' + elAglosaFim);
                    console.log('o vetor Tot é: ' + elAglosaTot);
                    console.log(diasGlosados);                    
    
                    
                    allElAs[i].childNodes[2].lastChild.classList.add('visually-hidden');
                }
            })
        })
    }
}

function computaGlosa() {
    let allElAs = document.querySelectorAll(`[id^="elA"]`);
    for (let i = 0; i < allElAs.length; i++) {
        allElAs[i].childNodes[1].childNodes[2].querySelector('input')
            .addEventListener('input', (event) => {
                if (allElAs[0].childNodes[1].lastChild.querySelectorAll('input')[0].checked != true) {
                    elAglosaIni[i] = +(event.target.value.slice(-2));
                    
                    if (elAglosaIni[i] <= elAglosaFim[i]) {
                        calculaGlosa();
                    }
                } else {
                    elAglosaIni[i] = null;
                    calculaGlosa();
                }
            });

        allElAs[i].childNodes[1].childNodes[3].querySelector('input')
            .addEventListener('input', (event) => {
                if (allElAs[0].childNodes[1].lastChild.querySelectorAll('input')[0].checked != true) {
                    elAglosaFim[i] = +(event.target.value.slice(-2));
                    if (elAglosaIni[i] <= elAglosaFim[i]) {
                        calculaGlosa();        
                    }
                } else {
                    elAglosaFim[i] = null;
                    calculaGlosa();
                }
            });
    }
};

function calculaGlosa() {

    let allElAs = document.querySelectorAll(`[id^="elA"]`);
    diasGlosados = 0;
    for (let i = 0; i < allElAs.length; i++) {

        if (isNaN(elAglosaIni[i]) || isNaN(elAglosaFim[i]) || elAglosaIni[i]==0 || elAglosaFim[i]==0)  {
            elAglosaTot[i] = null;
            continue;
        } else {
            elAglosaTot[i] = (elAglosaFim[i] - elAglosaIni[i]) + 1;
            diasGlosados += elAglosaTot[i]; 
        }
    }

    if (diasGlosados > 0) {
        totalGlosas.innerHTML = `Total de dias glosados: ${diasGlosados}`;
    } else if (diasGlosados == 0) {
        totalGlosas.innerHTML = 'Não há glosas por ausência de posto.'
    }
}

function zeraGlosas() {
    elAglosaIni = [];
    elAglosaFim = [];
    elAglosaTot = [];
    diasGlosados = 0;
    totalGlosas.innerHTML = 'Não há glosas por ausência de posto.'    
}

//calcula o imr de limpeza
function calcularIMR() {

    const im1 = Number(document.getElementById("imrLimp1").value);
    const im2 = Number(document.getElementById("imrLimp2").value);
    const im3 = Number(document.getElementById("imrLimp3").value);
    const im4 = Number(document.getElementById("imrLimp4").value);
    const im5 = Number(document.getElementById("imrLimp5").value);
    const im6 = Number(document.getElementById("imrLimp6").value);
    const im7 = Number(document.getElementById("imrLimp7").value);
    const im8 = Number(document.getElementById("imrLimp8").value);
    const im9 = Number(document.getElementById("imrLimp9").value);
    const im10 = Number(document.getElementById("imrLimp10").value);
    const im11 = Number(document.getElementById("imrLimp11").value);

    // calcula o total de pontos de acordo com o peso de cada IMR
    const pontosIMR = parseFloat((im1 + im2 + im5 + im8 + im9)*0.1 + (im3 + im4 + im6 + im7 + im10)*0.2 + im11);

    switch (true) {
        case (pontosIMR >= 1 && pontosIMR < 2):
            document.getElementById("imrLimpTot").textContent = "";
            document.getElementById("IMRmsg").textContent = "Em função da quantidade de ocorrências registradas, deve-se instaurar processo de advertência.";
            break;
        case (pontosIMR >= 2 && pontosIMR < 3):
            document.getElementById("imrLimpTot").textContent = "0,5%";
            document.getElementById("IMRmsg").textContent = "Desconto sobre o valor mensal do contrato em função da pontuação do IMR:";
            break;
        case (pontosIMR >= 3 && pontosIMR < 4):
            document.getElementById("imrLimpTot").textContent = "1%";
            document.getElementById("IMRmsg").textContent = "Desconto sobre o valor mensal do contrato em função da pontuação do IMR:";
            break;
        case (pontosIMR >= 4 && pontosIMR < 5):
            document.getElementById("imrLimpTot").textContent = "2%";
            document.getElementById("IMRmsg").textContent = "Desconto sobre o valor mensal do contrato em função da pontuação do IMR:";
            break;
        case (pontosIMR >= 5 && pontosIMR < 6):
            document.getElementById("imrLimpTot").textContent = "3%";
            document.getElementById("IMRmsg").textContent = "Desconto sobre o valor mensal do contrato em função da pontuação do IMR:";
            break;
        case (pontosIMR >= 6 && pontosIMR < 7):
            document.getElementById("imrLimpTot").textContent = "4%";
            document.getElementById("IMRmsg").textContent = "Desconto sobre o valor mensal do contrato em função da pontuação do IMR:";
            break;
        case (pontosIMR >= 7 && pontosIMR < 8):
            document.getElementById("imrLimpTot").textContent = "5%";
            document.getElementById("IMRmsg").textContent = "Desconto sobre o valor mensal do contrato em função da pontuação do IMR:";
            break;
        case (pontosIMR >= 8 && pontosIMR < 9):
            document.getElementById("imrLimpTot").textContent = "6%";
            document.getElementById("IMRmsg").textContent = "Desconto sobre o valor mensal do contrato em função da pontuação do IMR:";
            break;
        case (pontosIMR >= 9):
            document.getElementById("imrLimpTot").textContent = "10%";
            document.getElementById("IMRmsg").textContent = "Desconto sobre o valor mensal do contrato em função da pontuação do IMR:";
            break;
        default:
            document.getElementById("imrLimpTot").textContent = "0%";
            document.getElementById("IMRmsg").textContent = "Desconto sobre o valor mensal do contrato em função da pontuação do IMR:";

    }
}

// Adiciona os listeners aos inputs
document.getElementById("imrLimp1").addEventListener("input", calcularIMR);
document.getElementById("imrLimp2").addEventListener("input", calcularIMR);
document.getElementById("imrLimp3").addEventListener("input", calcularIMR);
document.getElementById("imrLimp4").addEventListener("input", calcularIMR);
document.getElementById("imrLimp5").addEventListener("input", calcularIMR);
document.getElementById("imrLimp6").addEventListener("input", calcularIMR);
document.getElementById("imrLimp7").addEventListener("input", calcularIMR);
document.getElementById("imrLimp8").addEventListener("input", calcularIMR);
document.getElementById("imrLimp9").addEventListener("input", calcularIMR);
document.getElementById("imrLimp10").addEventListener("input", calcularIMR);
document.getElementById("imrLimp11").addEventListener("input", calcularIMR);



/*

*/

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})


// Configurações do cliente MSAL
const msalConfig = {
    auth: {
        clientId: 'e32dfbb8-9f3d-4d7b-b0f1-d91c0e8fd6e8',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: 'https://trouver.onrender.com/',
        navigateToLoginRequestUrl: false
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false
    }
};

// Cria uma instância do cliente MSAL
const msalClient = new msal.PublicClientApplication(msalConfig);

// Opções de autenticação
const loginRequest = {
    scopes: ['openid', 'profile', 'User.Read']
};

