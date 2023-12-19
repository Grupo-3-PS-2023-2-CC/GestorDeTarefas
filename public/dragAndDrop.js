let draggedItem = null;

document.addEventListener('dragstart', function(event) {
   draggedItem = event.target;
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
   event.target.classList.remove('drag-over');
   event.target.appendChild(draggedItem);
});