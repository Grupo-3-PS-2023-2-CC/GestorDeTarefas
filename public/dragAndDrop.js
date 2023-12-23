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
        
        let titulo = arrastado.querySelector('.tituloAtividade');

        //Modifique a tarefa       
        switch(strColuna)
        {
            case "bloqueado":
                titulo.style.backgroundColor = '#495766'
                break;
            case "afazer":
                titulo.style.backgroundColor = '#E53324';
                break;
            case "fazendo":
                titulo.style.backgroundColor = '#FBE23E';
                break;
            case "finalizado":
                titulo.style.backgroundColor = '#2F993D';
        }

        //Salvando em BD
        salvarModificacaoTarefa(arrastado, strColuna);

        //Coloque a tarefa
        event.target.classList.remove('drag-over');
        event.target.appendChild(draggedItem);
        arrastado.classList.remove('dragged');
    }
});