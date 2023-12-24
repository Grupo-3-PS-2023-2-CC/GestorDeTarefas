let draggedItem = null;

document.addEventListener('dragstart', function(event) {
   draggedItem = event.target;
   draggedItem.classList.add('dragged');
   setTimeout(function() {
       draggedItem.style.display = 'none';
   }, 0);
});

document.addEventListener('dragend', function(event) {
   draggedItem.style.display = 'block';
});

document.addEventListener('dragover', function(event) {
   event.preventDefault();
});

document.addEventListener('dragenter', function(event) {
   event.target.classList.add('drag-over');
});

document.addEventListener('dragleave', function(event) {
   event.target.classList.remove('drag-over');
});

document.addEventListener('drop', function(event) {

    let arrastado = document.querySelector('.dragged');
    console.log(arrastado);
    let colunaAtual = arrastado.parentElement.parentElement.parentElement.id;

    //Se o espaço for uma coluna ou linha de prioridade
    if(event.target.classList.value.match(/(coluna|prioridade)/))
    {
        //Identifique a coluna a colocar a tarefa
        let strColuna = event.target.classList.value.match(/coluna/) ? event.target.id : event.target.parentElement.parentElement.id;

        //Se a tarefa não puder, de fato, ser colocada ali.
        if(strColuna == 'finalizado' && colunaAtual == 'afazer') 
        {
            alert(`Não é possível mover uma tarefa de 'A Fazer' para 'Finalizado'.`);
            arrastado.classList.remove('dragged'); 
            return;
        }
        else if(strColuna == 'finalizado' && colunaAtual == 'bloqueado')
        {
            alert(`Não é possível mover uma tarefa de 'Bloqueado' para 'Finalizado'.`); 
            arrastado.classList.remove('dragged');
            return;
        }
        
        //Se a tarefa estiver sendo movida para bloqueado, a partir de outro lugar.
        let aguardaMotivoBloqueio = false;
        if(strColuna == 'bloqueado' && colunaAtual != 'bloqueado')
        {
            //Requisitar motivo
            let modalBloqueio = document.querySelector('#modal-bloqueio');
            modalBloqueio.style.visibility = 'visible';
            aguardaMotivoBloqueio = true;
        }

        let titulo = arrastado.querySelector('.tituloAtividade');

        //Modifique a tarefa       
        titulo.style.backgroundColor = '#495766';

        //Salvando em BD
        if(!aguardaMotivoBloqueio) 
        {
            salvarModificacaoTarefa(arrastado, strColuna);
            //Coloque a tarefa
            event.target.classList.remove('drag-over');
            event.target.appendChild(draggedItem);
            arrastado.classList.remove('dragged');
        }
    }
});

function passarParaBloqueio()
{
    let arrastado = document.querySelector('.dragged');
    salvarModificacaoTarefa(arrastado, 'bloqueado', document.querySelector('#texto-motivo').value);
    //Coloque a tarefa
    document.querySelector('.drag-over').classList.remove('drag-over');
    arrastado.classList.remove('dragged');
}