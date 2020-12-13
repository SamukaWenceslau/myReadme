const getDate = () => {
    const d = new Date();
    
    const date = d.toLocaleDateString("pt-BR");
    const hr = d.getHours()<10?`0${d.getHours()}`: d.getHours();
    const min = d.getMinutes()<10?`0${d.getMinutes()}`: d.getMinutes();
    
    
    return(`${date} às ${hr}h${min} - Última alteração`);
}

module.exports = getDate;