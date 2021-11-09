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
  
        $.getJSON('goods.json', function(data){
        
        let goods = data; //всі товари в масиві
        let out = '';

        for (let key in cart) {
            out += '<div class="cart">';
            out += `<button class="delete" data-id=${key}>X</button>`;
            out += `<p class="name">${data[key].name}</p>`;
            out += `<img src=${data[key].image} alt="" width="80px" height="80px"/>`;
            out += `<div class="price"> Price: ${data[key].price}</div>`;
            out += `<button class="minus" data-id=${key}>-</button>`;
            out += `<button class="plus" data-id="${key}">+</button>`;
            out +=  cart[key] * goods[key].price;
            out += '</div>'
        }
        
        $('.main-cart').html(out);
        $('.plus').on('click', plusGoods);
        $('.minus').on('click', minusGoods);
        $('.delete').on('click', deleteGoods);
    })
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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function removeChildrenFromCart() {
    const mainCart = document.querySelector('.main-cart');
    console.log(mainCart)
    removeAllChildNodes(mainCart);
}

function removeItemsInLS() {
    localStorage.removeItem('cart', JSON.stringify(cart));
}

function isEmpty(object) {
    //check cart if it's empty
    for (let key in object) {
        if (object.hasOwnProperty(key)) return true;
        return false;
    }
}

function sendEmail () {
    let ename = $('#ename').val();
    let email = $('#email').val();
    let ephone = $('#ephone').val();

    if(ename != '' && email != '' && ephone != '') {
        if(isEmpty(cart)) {
            alert('Thank you!))');
            removeItemsInLS();
            removeChildrenFromCart();
            $('.email-field').css()
        } else {
            alert('Cart is empty')
        }
    } else {
        alert('fill the filds, please')
    }
}


$(document).ready(function() {
    loadCart();
    showCart();
    $('.send-email').on('click', sendEmail); //send letter for buy
})