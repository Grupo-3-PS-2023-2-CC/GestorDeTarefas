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
 * @param {String} prioridade 'alta', 'media' ou 'baixa'. É a nova prioridade da tarefa.
 * @param {String} estado 'afazer', 'fazendo' ou 'finalizado'. É o novo estado da tarefa.
 */
function salvarModificacaoTarefa(nodeTarefa, prioridade, estado)
{
    //Salvando em BD
    let formulario = document.querySelector('#modificar');
    formulario.querySelector('#nome').value = nodeTarefa.querySelector('.tituloAtividade').textContent;
    formulario.querySelector('#descricao').value = nodeTarefa.querySelector('.descricao').textContent;
    formulario.querySelector('#prioridade').value = prioridade;
    formulario.querySelector('#estado').value = estado;
    
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