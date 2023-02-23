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







