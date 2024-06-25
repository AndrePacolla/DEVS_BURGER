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



cartBtn.addEventListener('click', ()=>{
    cartModal.style.display = 'flex'
});

closeModalBtn.addEventListener('click', ()=>{
    cartModal.style.display = 'none'
});

cartModal.addEventListener('click',(event)=>{

    if(event.target === cartModal){
        cartModal.style.display = 'none'
    }
});

