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