const menu = document.getElementById('menu');
const address = document.getElementById('address');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCounter = document.getElementById('card-count');
const checkoutBtn = document.getElementById('checkout-btn');
const addressWarn = document.getElementById('address-alert');
const closeModalBtn = document.getElementById('close-modal-btn');

let cartList= [];



cartBtn.addEventListener('click', ()=>{
    cartModal.style.display = 'flex'
    updateCartModal();
});

closeModalBtn.addEventListener('click', ()=>{
    cartModal.style.display = 'none'
});

cartModal.addEventListener('click',(event)=>{

    if(event.target === cartModal){
        cartModal.style.display = 'none'
    }
});


menu.addEventListener('click',(event)=>{

    let parentButton = event.target.closest('.add-cart'); //mais próximo

    if(parentButton){
        const name = parentButton.getAttribute('data-name');
        const price = parseFloat(parentButton.getAttribute('data-price'));

        addToCart(name ,price)
    }
}); 



function addToCart(name, price){

    const existingItem = cartList.find((item) => item.name === name)

    if(existingItem){
        existingItem.qtd += 1
    }else{
        cartList.push({
            name,
            price,
            qtd: 1
        })
    }

    updateCartModal();
}


function updateCartModal(){

    let total = 0;
    cartItems.innerHTML ='';

    cartList.forEach((item) => {

        const cartItemElement = document.createElement('div');
        
        cartItemElement.classList.add('flex','justify-between', 'mb-4','flex-col');

        cartItemElement.innerHTML = `
        
        <div class= 'flex items-center justify-between'> 
           <div>
            <p class= 'font-bold'>${item.name}</p> 
            <p>Qtd: ${item.qtd}</p>
            <p class='font-medium mt-2'>R$: ${item.price.toFixed(2)}</p>
           </div>

           <button>Remover</button>

        </div>
        `
        total += item.price * item.qtd

        cartItems.appendChild(cartItemElement);
    })
        cartTotal.innerHTML = `${total.toLocaleString('pr-BR',{
            style: 'currency',
            currency: 'BRL'
        })}`;
}