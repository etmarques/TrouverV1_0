const tabela = document.getElementById('tabela');
const addIJ = document.getElementById('addIJ');
const cutIJ = document.getElementById('cutIJ');
const noIJ = document.getElementById('noIJ');
const celulas = document.querySelectorAll('[id^="mat"]');
var sizeTabela = ((tabela.childElementCount));

var valIJs = [];
valIJs[11] = 0; valIJs[12] = 0; valIJs[13] = 0; valIJs[14] = 0; valIJs[15] = 0; valIJs[21] = 0; valIJs[22] = 0; valIJs[23] = 0; valIJs[24] = 0; valIJs[25] = 0; valIJs[31] = 0; valIJs[32] = 0; valIJs[33] = 0; valIJs[34] = 0; valIJs[35] = 0; valIJs[41] = 0; valIJs[42] = 0; valIJs[43] = 0; valIJs[44] = 0; valIJs[45] = 0; valIJs[51] = 0, valIJs[52] = 0; valIJs[53] = 0; valIJs[54] = 0;
valIJs[55] = 0;

//onload
showProImp();

//botão + 
(function insereIJ() {
    addIJ.addEventListener("click", () => {
        sizeTabela += 1;
        let linha = new CelulaIJ;
        tabela.insertAdjacentHTML('beforeend', linha.ij);
        cutIJ.classList.remove('visually-hidden');
        if(!noIJ.classList.contains('visually-hidden')) noIJ.classList.add('visually-hidden');
        showProImp();
        somaIJs();        
    })
})();

//botão -
(function excluiIJ() {
    cutIJ.addEventListener("click", () => {
            while (tabela.lastChild.nodeName.startsWith('#text')) {
                tabela.removeChild(tabela.lastChild);
            }
            tabela.removeChild(tabela.lastElementChild);
            sizeTabela -= 1;
            
            if (sizeTabela == 0) {
                cutIJ.classList.add('visually-hidden');
                noIJ.classList.remove('visually-hidden');
            }
            somaIJs();
        }               
    )
})();

function showProImp() {

    let linhas = document.getElementsByClassName('linha');

    [...linhas].forEach((linha) => {
        let getPro = linha.querySelector('[id^="tdPro"]').getElementsByTagName('input')[0];
        let getImp = linha.querySelector('[id^="tdImp"]').getElementsByTagName('input')[0];
        let getDisplayPro = linha.querySelector('[id="showPro"]');
        let getDisplayImp = linha.querySelector('[id="showImp"]');
        let getTooltipPro = linha.querySelector('[id^="tdPro"]').getElementsByTagName('span')[0];
        let getTooltipImp = linha.querySelector('[id^="tdImp"]').getElementsByTagName('span')[0];
        
        getDisplayPro.innerHTML = getPro.value;
        getDisplayImp.innerHTML = getImp.value;
        geraTtipPROIMP(getPro.value, getTooltipPro, getImp.value, getTooltipImp);
        colorirLinha(getPro.value, getImp.value, linha);
        somaIJs();
        
        getPro.addEventListener('change', (event) => {
            getDisplayPro.innerHTML = event.target.value;
            geraTtipPROIMP(event.target.value, getTooltipPro, getImp.value, getTooltipImp);
            colorirLinha(event.target.value, getImp.value, linha);
            somaIJs();
        });

        getImp.addEventListener('change', (event) => {
            getDisplayImp.innerHTML = event.target.value;
            geraTtipPROIMP(getPro.value, getTooltipPro, event.target.value, getTooltipImp);
            colorirLinha(getPro.value, event.target.value, linha);
            somaIJs();
        });
    })
};


function colorirLinha(i, j, borda) {
    let index = `${i}${j}`;

    if (index == 11 || index == 21 || index == 31 || index == 12 || index == 13) {
        borda.style.borderColor ="green";
    } else if (index == 41 || index == 51 || index == 22 || index == 32 || index == 23 || index == 14 || index == 15) {
        borda.style.borderColor = "gold";
    } else if (index == 42 || index == 52 || index == 33 || index == 43 || index == 24 || index == 34 || index == 25) {
        borda.style.borderColor = "orange";
    } else {
        borda.style.borderColor = "red";
    } 
}

function somaIJs() {
    zeravalIJs();
    let linhas = document.getElementsByClassName('linha');
    [...linhas].forEach((linha) => {
        let getPro = linha.querySelector('[id^="tdPro"]').getElementsByTagName('input')[0];
        let getImp = linha.querySelector('[id^="tdImp"]').getElementsByTagName('input')[0];
        valIJs[`${getImp.value}${getPro.value}`] += 1;
    })

    celulas.forEach((elem) => {
        elem.innerHTML = valIJs[elem.id.slice(-2)]
        if (elem.innerHTML == 0) {
            elem.innerHTML = "";
            elem.style.opacity = .3;
        } else {
            elem.style.opacity = 1;
        }
    })
    // console.log(valIJs);
} 

function zeravalIJs() {
    valIJs[11] = 0; valIJs[12] = 0; valIJs[13] = 0; valIJs[14] = 0; valIJs[15] = 0; valIJs[21] = 0; valIJs[22] = 0; valIJs[23] = 0; valIJs[24] = 0; valIJs[25] = 0; valIJs[31] = 0; valIJs[32] = 0; valIJs[33] = 0; valIJs[34] = 0; valIJs[35] = 0; valIJs[41] = 0; valIJs[42] = 0; valIJs[43] = 0; valIJs[44] = 0; valIJs[45] = 0; valIJs[51] = 0, valIJs[52] = 0; valIJs[53] = 0; valIJs[54] = 0;
    valIJs[55] = 0;
} 

function geraTtipPROIMP(valuePro, tooltipPro, valueImp, tooltipImp) {
    tooltipPro.innerHTML = "";
    tooltipImp.innerHTML = "";

    switch (parseInt(valuePro)) {
        case 1:
            tooltipPro.innerHTML = "Baixíssima (até 5%).";
            break;
        case 2:
            tooltipPro.innerHTML = "Baixa (de 6% a 10%).";
            break;
        case 3:
            tooltipPro.innerHTML = "Média (de 11% a 30%).";
            break;
        case 4:
            tooltipPro.innerHTML = "Alta (de 31% a 50%).";
            break;
        case 5:
            tooltipPro.innerHTML = "Altíssima (acima de 50%).";
            break;
        default:
            console.log("Ocorreu um erro no tooltip. Verificar.");
    }

    switch (parseInt(valueImp)) {
        case 1:
            tooltipImp.innerHTML = "Baixíssimo: afeta em até 5% o processo de trabalho.";
            break;
        case 2:
            tooltipImp.innerHTML = "Baixo: afeta razoavelmente (de 6% a 20%) a qualidade ou o prazo ou o custo da entrega do processo de trabalho.";
            break;
        case 3:
            tooltipImp.innerHTML = "Médio: afeta consideravelmente (de 21% a 40%) a qualidade ou o prazo ou o custo da entrega do processo de trabalho.";
            break;
        case 4:
            tooltipImp.innerHTML = "Alto: afeta severamente (de 40% a 70%) a qualidade ou o prazo ou o custo da entrega do processo de trabalho.";
            break;
        case 5:
            tooltipImp.innerHTML = "Altíssimo: inviabiliza a(s) entrega(s) do processo de trabalho.";
            break;
        default:
            console.log("Ocorreu um erro no tooltip. Verificar.");
    }
}


//contrutora de uma entrada (linha) da matriz
class CelulaIJ {
    ij;
    constructor(){
        this.ij = (
            `<div id="linha${sizeTabela}" class="linha row gap-1 p-3 mt-3">
                <div class="h6 text-uppercase text-secondary">
                    Item #${sizeTabela}
                </div>
                <div class="col-12">
                    <div class="form-floating">
                        <textarea class="form-control ps-3" placeholder="" id="floatingTextareaA${sizeTabela}">
                        </textarea>
                        <label for="floatingTextareaA${sizeTabela}" class="ps-3">
                            Atividade ou iniciativa
                        </label>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-floating">
                        <textarea class="form-control ps-3" placeholder="" id="floatingTextareaB${sizeTabela}">
                        </textarea>
                        <label for="floatingTextareaB${sizeTabela}" class="ps-3">
                            Risco
                        </label>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-floating">
                        <textarea class="form-control ps-3" placeholder="" id="floatingTextareaC${sizeTabela}">
                        </textarea>
                        <label for="floatingTextareaC${sizeTabela}" class="ps-3">
                            Causa
                        </label>
                    </div>
                </div>
                <div class="col-12 mb-3">
                    <div class="form-floating">
                        <textarea class="form-control ps-3" placeholder="" id="floatingTextareaD${sizeTabela}">
                        </textarea>
                        <label for="floatingTextareaD${sizeTabela}" class="ps-3">
                            Dano ou consequência
                        </label>
                    </div>
                </div>
                <div id="tdPro${sizeTabela}" class="d-inline-block col-sm-12 col-md-3 ms-3 mt-3">
                    <label for="customRangeA${sizeTabela}" class="form-label">PROBABILIDADE
                    </label>
                    <div class="d-flex gap-2">
                        <input type="range" class="form-range" min="1" max="5" step="1" id="customRangeA${sizeTabela}">
                            <div class="myTooltip border-0">
                                <p id="showPro"></p>
                                <span class="tooltiptext"></span>
                            </div>
                    </div>
                </div>
                <div id="tdImp${sizeTabela}" class="d-inline-block col-sm-12 col-md-3 ms-3 mt-3">
                    <label for="customRangeB${sizeTabela}" class="form-label">IMPACTO</label>
                    <div class="d-flex gap-2">
                        <input type="range" class="form-range" min="1" max="5" step="1" id="customRangeB${sizeTabela}">
                            <div class="myTooltip border-0">
                                <p id="showImp"></p>
                                <span class="tooltiptext"></span>
                            </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-2 ms-5">
                    <p class="pb-1 mb-0">Tipo de Risco</p>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefaultA${sizeTabela}">
                        <label class="form-check-label" for="flexSwitchCheckDefaultA${sizeTabela}">Financeiro</label>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefaultB${sizeTabela}">
                        <label class="form-check-label" for="flexSwitchCheckDefaultB${sizeTabela}">Operacional</label>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefaultC${sizeTabela}">
                        <label class="form-check-label" for="flexSwitchCheckDefaultC${sizeTabela}">Legal</label>
                    </div>
                </div>
                <div class="col-sm-12 col-md-2 ms-5">
                    <p class="pb-1 mb-0">Tratamento</p>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault${sizeTabela}" id="flexRadioDefaultA${sizeTabela}">
                        <label class="form-check-label" for="flexRadioDefaultA${sizeTabela}">
                            Controlar
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault${sizeTabela}" id="flexRadioDefaultB${sizeTabela}">
                        <label class="form-check-label" for="flexRadioDefaultB${sizeTabela}">
                            Reduzir
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault${sizeTabela}" id="flexRadioDefaultC${sizeTabela}">
                        <label class="form-check-label" for="flexRadioDefaultC${sizeTabela}">
                            Mitigar
                        </label>
                    </div>
                </div>
                <div class="mt-3">
                    <div class="form-floating">
                        <textarea class="form-control ps-3" id="floatingTextareaE${sizeTabela}"></textarea>
                        <label for="floatingTextareaE${sizeTabela}" class="ps-3">
                            Risco residual
                        </label>
                    </div>
                </div>
                <div class="d-flex flex-wrap gap-2">
                    <div class="col-sm-12 col-md-7">
                        <div class="form-floating">
                            <textarea class="form-control ps-3"
                                id="floatingTextareaF${sizeTabela}"></textarea>
                            <label for="floatingTextareaF${sizeTabela}" class="ps-3">
                                Ações Preventivas
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-3 flex-grow-1">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="floatingInputA${sizeTabela}">
                            <label for="floatingInputA${sizeTabela}">Responsável</label>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-wrap gap-2">
                    <div class="col-sm-12 col-md-7">
                        <div class="form-floating">
                            <textarea class="form-control ps-3"
                                id="floatingTextareaG${sizeTabela}"></textarea>
                            <label for="floatingTextareaG${sizeTabela}" class="ps-3">
                                Ações Corretivas
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-3 flex-grow-1">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="floatingInputB${sizeTabela}" >
                            <label for="floatingInputB${sizeTabela}">Responsável</label>
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <div class="form-floating">
                        <textarea class="form-control ps-3" id="floatingTextareaH${sizeTabela}"></textarea>
                        <label for="floatingTextareaH${sizeTabela}" class="ps-3">
                            Item de controle de gestão
                        </label>
                    </div>
                </div>
            </div>`     
        )
    }
}

//ativador do bootstrap tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})



