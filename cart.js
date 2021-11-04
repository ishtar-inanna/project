let cart = {};


function loadCart() {
    //провіряю наявність запису cart
    if(localStorage.getItem('cart') != null) {
        //якщо є - розшифровую і записую в змінну cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
    } else {
        $('.main-cart').html('cart is empty')
    }
}


function showCart() {  
    if( $.isEmptyObject(cart)) {
    //korzina pusta
        let out = 'Korzina pusta. <a href="store.html">Shop</a>';
        $('.main-cart').html(out);
    } else {
    
        $.getJSON('goods.json', function(data){
        
        let goods = data; //всі товари в масиві
        let out = '';

        for (let key in cart) {
            out += `<button class="delete" data-id=${key}>X</button>`;
            out += `<img src=${goods[key].image}>`;
            out += ` ${goods[key].name} `;
            out += '<button class="minus" data-id="'+key+'">-</button>';
            out += ` ${cart[key]} `;
            out += '<button class="plus" data-id="'+key+'">+</button>';
            out +=   cart[key] * goods[key].price;
            out += '<br>'; 
            }
        
        $('.main-cart').html(out);
        $('.plus').on('click', plusGoods);
        $('.minus').on('click', minusGoods);
        $('.delete').on('click', deleteGoods);
    })
    }
}

function plusGoods() {
    let articul = $(this).attr('data-id');
    cart[articul]++;
    saveCartToLS();
    showCart();    
}
    
function minusGoods() {
    let articul = $(this).attr('data-id');
        if(cart[articul] >1) { 
            cart[articul]--;
        } else {
            delete cart[articul];
        }
    saveCartToLS();
    showCart();    
}
    
function deleteGoods() {
    let articul = $(this).attr('data-id');
    delete cart[articul];
    saveCartToLS();
    showCart();    
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


$(document).ready(function() {
    loadCart();
    showCart();
})