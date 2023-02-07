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
                criaCampoFalta();
                criaSubstituto();
                computaGlosa();
                campoAddFaltas.classList.remove('visually-hidden');

            } else {
                
                while (campoFaltas.hasChildNodes()) {
                    campoFaltas.removeChild(campoFaltas.firstChild);
                }
                campoAddFaltas.classList.add('visually-hidden');

                elAglosaIni = [];
                elAglosaFim = [];
                elAglosaTot = [];
                diasGlosados = 0;

                computaGlosa();
            }
        });
    });
})();

(function adicionaFalta()  {
    let addFalta = document.getElementById('addFalta');
    addFalta.addEventListener("click", ()=> {
        criaCampoFalta();
        criaSubstituto();
        computaGlosa();
    })
})();

(function excluiFalta() {
    let cutFalta = document.getElementById('cutFalta');
    cutFalta.addEventListener("click", ()=> {

        campoFaltas.removeChild(campoFaltas.lastChild);
        
        elAglosaIni[elAglosaIni.length-1] = 0;
        elAglosaFim[elAglosaFim.length-1] = 0;
        elAglosaTot[elAglosaTot.length-1] = 0;

        diasGlosados = 0;
        calculaGlosa();


        
        if (campoFaltas.childNodes.length == 0) {
            checkFalta[1].checked = false;
            elAglosaIni = [];
            elAglosaFim = [];
            elAglosaTot = [];
            diasGlosados = 0;
            totalGlosas.innerHTML = 'Não há glosas por ausência de posto.'
            campoAddFaltas.classList.add('visually-hidden');
            totalGlosas.classList.add('visually-hidden');
        }
       
    })
})();

function criaSubstituto() {
    let allElAs = document.querySelectorAll(`[id^="elA"]`);
    for(let i = 0; i < allElAs.length; i++) {
        allElAs[i].childNodes[1].lastChild.querySelectorAll('input').forEach((elem) =>{
            elem.addEventListener('change', (event) => {
                if(event.target.value == 'option1') {
                    //console.log(event.target.value);
                    elAglosaIni[i]=null;
                    elAglosaFim[i]=null;
                    elAglosaTot[i]=null;
                    diasGlosados = 0;

                    for(let i=0; i<elAglosaTot.length; i++){

                        if (isNaN(elAglosaIni[i]) || isNaN(elAglosaFim[i])) {
                            continue;
                        } else {
                            diasGlosados += elAglosaTot[i];

                    }
                    }
                    if (diasGlosados > 0) {
                        totalGlosas.innerHTML = `Total de dias glosados: ${diasGlosados}`;
                    } else if (diasGlosados == 0) {
                        totalGlosas.innerHTML = 'Não há glosas por ausência de posto.'
                    }

                    console.log(elAglosaIni, elAglosaFim, elAglosaTot);
                    allElAs[i].childNodes[2].lastChild.classList.remove('visually-hidden');

                } else if (event.target.value == 'option2') {
                    //console.log(event.target.value);

                    elAglosaIni[i] = +allElAs[i].childNodes[1].childNodes[2].querySelector('input').value.slice(-2);
                    elAglosaFim[i] = +allElAs[i].childNodes[1].childNodes[3].querySelector('input').value.slice(-2);

                    if(elAglosaIni[i] > elAglosaFim[i]) {
                        elAglosaTot[i] = null;
                    } else {
                        elAglosaTot[i] = (elAglosaFim[i] - elAglosaIni[i])+1;
                    }
                    
                    diasGlosados = 0;

                    for (let i = 0; i < elAglosaTot.length; i++) {

                        if (isNaN(elAglosaIni[i]) || isNaN(elAglosaFim[i])) {
                            continue;
                        } else {
                            diasGlosados += elAglosaTot[i];

                        }
                    }
                    if (diasGlosados > 0) {
                        totalGlosas.innerHTML = `Total de dias glosados: ${diasGlosados}`;
                    } else if (diasGlosados == 0) {
                        totalGlosas.innerHTML = 'Não há glosas por ausência de posto.'
                    }

                    console.log(elAglosaIni, elAglosaFim, elAglosaTot);                    
    
                    
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
                elAglosaIni[i] = +(event.target.value.slice(-2));
                if (elAglosaIni[i] <= elAglosaFim[i]) {
                    calculaGlosa();
                }
            });

        allElAs[i].childNodes[1].childNodes[3].querySelector('input')
            .addEventListener('input', (event) => {
                elAglosaFim[i] = +(event.target.value.slice(-2));
                if (elAglosaIni[i] <= elAglosaFim[i]) {
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
            elAglosaTot = null;
            continue;
        } else {
            elAglosaTot[i] = (elAglosaFim[i] - elAglosaIni[i]) + 1;
            diasGlosados += elAglosaTot[i];

            
            if(diasGlosados > 0) {
                totalGlosas.innerHTML = `Total de dias glosados: ${diasGlosados}`;
            } else if (diasGlosados == 0) {
                totalGlosas.innerHTML = 'Não há glosas por ausência de posto.'
            }
            
             
        }
    }

    console.log('o vetor Ini é: ' + elAglosaIni);
    console.log('o vetor Fim é: ' + elAglosaFim);
    console.log('o vetor Tot é: ' + elAglosaTot);
    console.log(diasGlosados);
}






