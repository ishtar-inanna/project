let cart = {};

function init() {
    //вивід товарів на оловну сторінку
    $.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
    console.log(data);
    let out = '';
    for (let key in data) {
        out += '<div class="cart">';
        out += `<p class="name">${data[key].name}</p>`;
        out += `<img src="${data[key].image}" alt="" width="80px" height="80px"/>`;
        out += `<div class="price"> Price: ${data[key].price}</div>`;
        out += `<button class="add-to-cart" data-id="${key}">Buy</button>`;
        out += '</div>'
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
}

function addToCart() {
    //додаємо елемент в кошик
    let id = $(this).attr('data-id');
    //console.log(id);
    if(cart[id] == undefined) {
        cart[id] = 1;
    } else {
        cart[id]++;
    }
    showMiniCart();
    saveCartToLS();
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);

}

function showMiniCart() {
    let out = '';
    let info = '';
    for (let key in cart) {
        out += `${key} - ${cart[key]}`;
    }
    
    // info += `<br><a href="cart.html">Korzina</a>`;
    //$('.cart_logo').on('click', info)
    
    //console.log(out);
    // $('.mini-cart').html(info);
}

function loadCart() {
    //провіряю наявність запису cart
    if(localStorage.getItem('cart') != null) {
        //якщо є - розшифровую і записую в змінну cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

$('.intro_btn').click(function(){
    $('.intro_inner').fadeOut(2000, function() {
        $('.mini-cart').ready(function() {
            init();
            loadCart();
        })
     });
});


