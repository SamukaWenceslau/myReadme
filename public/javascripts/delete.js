const confirmDelete = (event, form) => {
        
    event.preventDefault();
    const decision = confirm("Você tem certeza que quer deletar esse arquivo?");
    if(decision) {
        form.submit();
    }
}