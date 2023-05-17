const campoFaltas = document.getElementById('listaFaltas');
var sizeFaltas = ((campoFaltas.childElementCount));

class TagS {

    
    constructor() {
        
    }
    criaDiv(cl1, cl2, cl3, cl4, cl5, id, txt) {
        let element = document.createElement('div');
        element.setAttribute('class', [cl1 + cl2 + cl3 + cl4 + cl5]);
        element.setAttribute('id', id);
        element.appendChild(document.createTextNode(txt));
        return element;
    }

    criaInput(cl, type, id, name, value, placeholder) {
        let element = document.createElement('input');
        element.setAttribute('class', cl);
        element.setAttribute('type', type);
        element.setAttribute('id', id);
        element.setAttribute('name', name);
        element.setAttribute('value', value);
        element.setAttribute('placeholder', placeholder);
        return element;
    }

    criaLabel(cl, atrbFor, txt) {
        let element = document.createElement('label');
        element.setAttribute('class', cl);
        element.setAttribute('for', atrbFor);
        element.appendChild(document.createTextNode(txt));
        return element;
    }

    criaP(cl1, cl2, txt) {
        let element = document.createElement('p');
        element.setAttribute('class', [cl1 + cl2]);
        element.appendChild(document.createTextNode(txt));
        return element;
    }
}

export const criaCampoFalta = ()=> {

    let paragrafo1 = new TagS()
    
    const elA = paragrafo1.criaDiv('m-3', ' p-3', ' rounded-2', ' elA', '', `elA${sizeFaltas}`, '');
    const elB = paragrafo1.criaDiv('d-flex', ' flex-wrap', ' gap-2', ' ps-4', '', 'elB', '');

    const elB1 = paragrafo1.criaDiv('form-floating', ' flex-grow-1', '', '', '', 'elB1', '');
    const elB11 = paragrafo1.criaInput('form-control', 'text', 'floatingInput', '', '', 'none');
    const elB12 = paragrafo1.criaLabel('nomeLabel', 'floatingInput', 'Nome do colaborador que faltou');

    const elB2 = paragrafo1.criaDiv('form-floating', ' flex-grow-0', '', '', '', 'elB2', '');
    const elB21 = paragrafo1.criaInput('form-control', 'date', 'floatingInput', '', '', 'none');
    const elB22 = paragrafo1.criaLabel('', 'floatingInput', 'De');

    const elB3 = paragrafo1.criaDiv('form-floating', ' flex-grow-0', '', '', '', 'elB3', '');
    const elB31 = paragrafo1.criaInput('form-control', 'date', 'floatingInput', '', '', 'none');
    const elB32 = paragrafo1.criaLabel('', 'floatingInput', 'Até');

    const elB4 = paragrafo1.criaDiv('ps-2', ' bg-secondary', ' text-white', ' rounded-2', ' ', 'elB4', '');
    const elB41 = paragrafo1.criaP('pt-1', ' m-0', 'Teve substituto?');
    const elB42 = paragrafo1.criaDiv('form-check', ' form-check-inline', '', ' ', ' ', 'elB42', '');
    const elB42a = paragrafo1.criaInput('form-check-input', 'radio', `subsSim${sizeFaltas}`, `subs${sizeFaltas}`, 'option1', 'none');

    const elB42b = paragrafo1.criaLabel('form-check-label', `subsSim${sizeFaltas}`, 'Sim');
    const elB43 = paragrafo1.criaDiv('form-check', ' form-check-inline', '', ' ', ' ', 'elB43', '');
    const elB43a = paragrafo1.criaInput('form-check-input', 'radio', `subsNao${sizeFaltas}`, `subs${sizeFaltas}`, 'option2', 'none');
    const elB43b = paragrafo1.criaLabel('form-check-label', `subsNao${sizeFaltas}`, 'Não');

    const elC = paragrafo1.criaDiv('d-flex', '  flex-wrap', '  justify-content-between', ' align-items-end', '', 'elC', '');
    const elC1 = paragrafo1.criaDiv('mt-1', '  ms-5', ' flex-grow-1', '', '', 'elC1', 'Motivo:');

    const elC11 = paragrafo1.criaDiv('form-check', '', '', '', '', 'elC11', '');
    const elC11a = paragrafo1.criaInput('form-check-input', 'radio', `motFltFer${sizeFaltas}`, `motFlt${sizeFaltas}`, 'option1', 'none');
    const elC11b = paragrafo1.criaLabel('form-check-label', `motFltFer${sizeFaltas}`, 'Férias');

    const elC12 = paragrafo1.criaDiv('form-check', '', '', '', '', 'elC12', '');
    const elC12a = paragrafo1.criaInput('form-check-input', 'radio', `motFltAju${sizeFaltas}`, `motFlt${sizeFaltas}`, 'option2', 'none');
    const elC12b = paragrafo1.criaLabel('form-check-label', `motFltAju${sizeFaltas}`, 'Ausência justificada');

    const elC13 = paragrafo1.criaDiv('form-check', '', '', '', '', 'elC13', '');
    const elC13a = paragrafo1.criaInput('form-check-input', 'radio', `motFltAin${sizeFaltas}`, `motFlt${sizeFaltas}`, 'option3', 'none');
    const elC13b = paragrafo1.criaLabel('form-check-label', `motFltAin${sizeFaltas}`, 'Ausência injustificada');

    const elC2 = paragrafo1.criaDiv('form-floating', '  ms-4', ' flex-grow-1', ' mt-1', ' visually-hidden', `elC2`, '');
    const elC21 = paragrafo1.criaInput('form-control', 'text', 'floatingInput', '', '', 'none');
    const elC22 = paragrafo1.criaLabel('nomeLabel', 'floatingInput', 'Nome do colaborador substituto');

    campoFaltas
        .appendChild(elA)
        .appendChild(elB)
        .appendChild(elB1)
        .appendChild(elB11);

    campoFaltas
        .appendChild(elA)
        .appendChild(elB)
        .appendChild(elB1)
        .appendChild(elB12);

    campoFaltas
        .appendChild(elA)
        .appendChild(elB)
        .appendChild(elB2)
        .appendChild(elB21);
    campoFaltas
        .appendChild(elA)
        .appendChild(elB)
        .appendChild(elB2)
        .appendChild(elB22);

    campoFaltas
        .appendChild(elA)
        .appendChild(elB)
        .appendChild(elB3)
        .appendChild(elB31);

    campoFaltas
        .appendChild(elA)
        .appendChild(elB)
        .appendChild(elB3)
        .appendChild(elB32);

    campoFaltas
        .appendChild(elA)
        .appendChild(elB)
        .appendChild(elB4)
        .appendChild(elB41);

    campoFaltas
        .appendChild(elA)
        .appendChild(elB)
        .appendChild(elB4)
        .appendChild(elB42)
        .appendChild(elB42a);

    campoFaltas
        .appendChild(elA)
        .appendChild(elB)
        .appendChild(elB4)
        .appendChild(elB42)
        .appendChild(elB42b);

    campoFaltas
        .appendChild(elA)
        .appendChild(elB)
        .appendChild(elB4)
        .appendChild(elB43)
        .appendChild(elB43a);

    campoFaltas
        .appendChild(elA)
        .appendChild(elB)
        .appendChild(elB4)
        .appendChild(elB43)
        .appendChild(elB43b);


    campoFaltas
        .appendChild(elA)
        .appendChild(elC)
        .appendChild(elC1)
        .appendChild(elC11)
        .appendChild(elC11a)

    campoFaltas
        .appendChild(elA)
        .appendChild(elC)
        .appendChild(elC1)
        .appendChild(elC11)
        .appendChild(elC11b)

    campoFaltas
        .appendChild(elA)
        .appendChild(elC)
        .appendChild(elC1)
        .appendChild(elC12)
        .appendChild(elC12a)

    campoFaltas
        .appendChild(elA)
        .appendChild(elC)
        .appendChild(elC1)
        .appendChild(elC12)
        .appendChild(elC12b)

    campoFaltas
        .appendChild(elA)
        .appendChild(elC)
        .appendChild(elC1)
        .appendChild(elC13)
        .appendChild(elC13a)

    campoFaltas
        .appendChild(elA)
        .appendChild(elC)
        .appendChild(elC1)
        .appendChild(elC13)
        .appendChild(elC13b)

    campoFaltas
        .appendChild(elA)
        .appendChild(elC)
        .appendChild(elC2)
        .appendChild(elC21)

    campoFaltas
        .appendChild(elA)
        .appendChild(elC)
        .appendChild(elC2)
        .appendChild(elC22)

    sizeFaltas = ((campoFaltas.childElementCount));        
}





