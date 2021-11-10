let products = {};
function init() {
    //вивід товарів на оловну сторінку
    const items = window.localStorage.getItem('products')
    const itemsArray = JSON.parse(items);
    goodsOut(itemsArray);
    
    //$.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
    console.log(data);
    let out = '';
    for (let item of data) {
        out += '<div class="product">';
        out += `<p class="name">${item.name}</p>`;
        out += `<img src=${item.image} alt="" width="60px" height="60px"/>`;
        out += `<div class="testy">${item.testy}</div>`;
        out += `<div class="testy">${item.description}</div>`;
        
        out += '</div>'
    }
    $('.main-galery').html(out);
}

$(document).ready(function () {
    init();
})