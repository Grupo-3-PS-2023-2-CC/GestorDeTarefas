/* Iniciando Login ------------------------------------------*/
//Verificando se o usuário já foi identificado.
let usuario = localStorage.getItem('usuario');
if(!usuario)
{
    //Abrindo Menu de Login
    menu = document.querySelector('#login');
    menu.style.visibility = 'visible';
}
else 
{
    document.querySelector('#autor').value = localStorage.getItem('usuario');
    document.querySelector('#atribuicao').value = localStorage.getItem('usuario');
}

function alterarFormulario()
{
    document.querySelector('#form-registrar').style.visibility = 'visible';
    document.querySelector('#form-selecionar').style.visibility = 'hidden';
}
function entrarComSelecao()
{
    localStorage.setItem('usuario', document.querySelector('#opcoes-usuario').value);
    location.reload();
}

function registrar(botaoRegistrar)
{
    localStorage.setItem('usuario', botaoRegistrar.parentElement.querySelector('#registro-nome').value);
    document.querySelector('#registro-post').click();
}
function logoff()
{
    localStorage.removeItem('usuario');
    location.reload();
}

/*---------------------------------------------------------- */

/**
 * Ativa e desativa o menu de adição de tarefas. É chamado pelo botão de adição.
 */
function ativarMenu()
{
    let menu = document.querySelector('#adicionarAtividade');
    let checkbox = document.querySelector('#ativarBotaoAdicao');

    if(menu.style.visibility == 'hidden')
    { 
        menu.style.visibility = 'visible';
        menu.classList = 'animacaoMenu';
        checkbox.checked = true;
    }
    else
    {
        menu.style.visibility = 'hidden';
        menu.classList = '';
        checkbox.checked = false;
    }
}

/**
 * Manda uma requisição POST ao servidor, de forma a atualizar uma tarefa com uma nova prioridade e estado.
 * @param {HTMLElement} nodeTarefa Elemento HTML de classe 'tarefa'.
 * @param {String} estado 'afazer', 'fazendo' ou 'finalizado'. É o novo estado da tarefa.
 */
function salvarModificacaoTarefa(nodeTarefa, estado, motivoBloqueio='')
{
    //Salvando em BD
    let formulario = document.querySelector('#modificar');
    formulario.querySelector('#nome').value = nodeTarefa.querySelector('.tituloAtividade').textContent;
    formulario.querySelector('#estado').value = estado;
    formulario.querySelector('#bloqueio').value = motivoBloqueio.replaceAll('"', '\'');
    
    formulario.querySelector('button').click();
}

/**
 * É chamado somente no modo mobile. Atualiza tarefas movidas por meio de setas.
 * @param {number} sentido Sentido do botão apertado (+1: cima; -1: baixo).
 * @param {HTMLElement} botao O botão apertado.
 */
function mover(sentido, botao)
{
    let tarefa = botao.parentElement.querySelector('.atividade');
    tarefa.classList.add('dragged');
    let strColuna = tarefa.closest('.coluna').id;
    let estados = ['bloqueado', 'afazer', 'fazendo', 'finalizado'];
    

    const i = estados.indexOf(strColuna); //indice representando o estado no vetor 'estados'
    let novoEstado;
    novoEstado = estados[i + sentido];
    document.querySelector(`#${novoEstado}`).classList.add('dragged-over');

    if(novoEstado != 'bloqueado')
        salvarModificacaoTarefa(tarefa, novoEstado);
    else
    {
        //Requisitar motivo
        let modalBloqueio = document.querySelector('#modal-bloqueio');
        modalBloqueio.style.visibility = 'visible';

    }
}


function ativarPopup(nomeTarefa)
{
    let modal = document.querySelector('#modal-tarefa');
    let tarefa;
    for(let umaTarefa of tarefas){if(umaTarefa.nome == nomeTarefa){ tarefa = umaTarefa;}}

    if(modal.style.visibility == 'hidden')
    {
        //Deixando-o visível
        modal.style.visibility = 'visible';

        //Preenchendo seu conteúdo.
        modal.innerHTML = `
        <!-- Pop Up -->
                        <div class="atributos-atividade-container popup">
                            <h2>${tarefa.nome}</h2>
                            Descrição
                            <p class="data descricao">
                                ${tarefa.descricao}
                            </p>

                            <p class="data-rotulo">Prazo:</p>
                            <form id="form-atualizar-data" method="post" action="/atualizarData">
                                <input id="nome-tarefa" name="nome" value="${tarefa.nome}" style="visibility: hidden; position: fixed;">
                                <input class="data" type="date" name="data" value="${tarefa.prazoStr}" onchange="atualizarData(this)">
                                <input id="atualizar-data" type="submit" style="visibility: hidden; position: fixed;">
                            </form>

                            <p class="data-rotulo">Autor:</p>
                            <p class="data">${tarefa.autor}</p>
                            <p class="data-rotulo">Prioridade:</p>
                            <p class="data">${tarefa.prioridade}</p>
                            <p class="data-rotulo">Criada:</p>
                            <p class="data">${new Date(tarefa.dataCriacao).toLocaleDateString()}</p>
                            <p class="data-rotulo">Modificada:</p>
                            <p class="data">${new Date(tarefa.ultimaModificacao).toLocaleDateString()}</p>
                            <p class="data-rotulo">Atribuída a:</p>
                            <p class="data">${tarefa.atribuicao}</p>
                            ${tarefa.motivoBloqueio}
                        </div>`;
                    
    }
    else modal.style.visibility = 'hidden';
}
function desativarPopup()
{
    document.querySelector('#modal-tarefa').style.visibility = 'hidden';
}

/**
 * Altera a data de uma tarefa, a partir do pop-up.
 * @param {HTMLElement} entrada 
 */
function atualizarData(entrada)
{
    entrada.parentElement.querySelector('#atualizar-data').click();
}