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

    const btnParent = event.target.closest('.add-cart'); // classes mais proximas

    const name = btnParent.getAttribute('data-name');
    const price = btnParent.getAttribute('data-price');

    addToCart(name,price)

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
            <p class='font-medium mt-2'>R$: ${item.price}</p>
           </div>

           <button class= 'remove-btn' data-name="${item.name}">
           Remover
           </button>

        </div>
        `
        total += item.price * item.qtd

        cartItems.appendChild(cartItemElement);
    })
    
        cartTotal.textContent = total.toLocaleString('pt-BR',{
            style: 'currency',
            currency: 'BRL'
        }); 

        cartCounter.innerText = cartList.length
}

cartItems.addEventListener('click',(event)=>{
    if(event.target.classList.contains('remove-btn')){
        const name = event.target.getAttribute('data-name')

        removeItemCart(name)
    }
})

function removeItemCart(name){
    const index = cartList.findIndex((item) => item.name === name) // so me devolve a posicao

    if(index !== -1){
        const item = cartList[index]; // passo pro item apenas a posicao do obj encontrado
        
        if(item.qtd > 1){
            item.qtd -= 1;
            updateCartModal();
            return;
        }

        cartList.splice(index, 1)
        updateCartModal();
    }
};

address.addEventListener('input',(event)=>{
    let inputValue = event.target.value

});


checkoutBtn.addEventListener('click',()=>{

    if(cartList.length === 0) return; // se cart estiver vazio faça nada .

    if(address.value === ''){
        addressWarn.classList.remove('hidden');
        address.classList.add('border-red-500');
    }

})

