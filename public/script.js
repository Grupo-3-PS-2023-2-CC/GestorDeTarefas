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
    formulario.querySelector('#descricao').value = nodeTarefa.querySelector('.descricao').textContent;
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
    let tarefa = botao.parentElement;
    let strColuna = tarefa.parentElement.parentElement.parentElement.id;
    let estados = ['finalizado', 'fazendo', 'afazer'];
    let indiceColuna;
    const prioridade = tarefa.parentElement.classList[1];
    
    if(strColuna=='afazer') indiceColuna = 2;
    else if(strColuna=='fazendo') indiceColuna=1;
    else indiceColuna=0;

    let novoEstado;
    novoEstado = estados[indiceColuna + sentido];

    if(prioridade == 'baixa' && sentido==-1) salvarModificacaoTarefa(tarefa, 'alta', novoEstado);
    else if(prioridade == 'baixa' && sentido==1) salvarModificacaoTarefa(tarefa, 'media', strColuna);
    else if(prioridade == 'alta' && sentido==1) salvarModificacaoTarefa(tarefa, 'baixa', novoEstado);
    else if(prioridade == 'alta' && sentido==-1) salvarModificacaoTarefa(tarefa, 'media', strColuna);
    else if(prioridade == 'media' && sentido==1) salvarModificacaoTarefa(tarefa, 'alta', strColuna);
    else if(prioridade == 'media' && sentido==-1) salvarModificacaoTarefa(tarefa, 'baixa', strColuna);
}


function ativarPopup(atividade)
{
    let modal = atividade.querySelector('.popup');

    if(modal.style.visibility == 'hidden') modal.style.visibility = 'visible';
    else modal.style.visibility = 'hidden';
}
function desativarPopup(modal)
{
    modal.style.visibility = 'hidden';
}