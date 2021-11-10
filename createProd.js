let allProducts = [];

function galaryShopList(product) {

    let curentProduct = {name: n, image: i, testy: tT, description: s} = product;

    allProducts.push(curentProduct);
    localStorage.setItem("products", JSON.stringify(allProducts))
    console.log(allProducts);    
}


console.log(allProducts);

const submit = document.getElementById('submit')

submit.addEventListener('click', () => {
   let name = document.getElementById('fname').value;
   
   let image = "images/4972483.png";
   
   let testy = document.getElementById('tasty');
   
   let testyText = testy.options[testy.selectedIndex].text;
   
   let subject = document.getElementById('subject').value;

   let newProduct = {
        name: name,
        image: image,
        testy: testyText,
        description: subject
   }

   galaryShopList(newProduct);

});

