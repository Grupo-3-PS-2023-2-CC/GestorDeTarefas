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

    //Se o espaço for uma linha de prioridade
    if(event.target.classList.value.match(/prioridade/))
    {
        //Identifique a prioridade e a coluna
        let strColuna = event.target.parentElement.parentElement.id;
        let titulo = arrastado.querySelector('.tituloAtividade');
        let prioridade = event.target.classList.value.match(/alta|media|baixa/i)[0];
        
        //Modifique a tarefa       
        switch(strColuna)
        {
            case "afazer":
                titulo.style.backgroundColor = '#E53324';
                break;
            case "fazendo":
                titulo.style.backgroundColor = '#FBE23E';
                break;
            case "finalizado":
                titulo.style.backgroundColor = '#2F993D';
        }
        arrastado.querySelector('.nome-prioridade').textContent = prioridade;

        //Coloque a tarefa
        event.target.classList.remove('drag-over');
        event.target.appendChild(draggedItem);
        arrastado.classList.remove('dragged');
    }
});