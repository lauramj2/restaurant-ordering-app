import { menuArray } from "./data.js"


const orderBtn = document.getElementById("order-btn")
const menu = document.getElementById("menu")
const orderSummary = document.getElementById("orderSummary")
const priceSummary = document.getElementById("totalPriceSection")
const orderBtnDiv = document.getElementById("orderBtnDiv")

let cart = []
let totalPrice = 0


// const paymentForm = document.getElementById("payment-form")
// const payBtn = document.getElementById("pay-btn")


document.addEventListener("click", function(e){
    if (e.target.dataset.add){
        // document.getElementById(e.target.dataset.add).parentElement.style.backgroundColor = "lightblue"
        addToOrder(e.target.dataset.add)
    }
    else if (e.target.dataset.remove){
        removeFromOrder(e.target.dataset.remove)
        // document.getElementById(e.target.dataset.remove).parentElement.style.backgroundColor = "lightblue"
    }
})





// Complete order button and payment form appear

orderBtn.addEventListener("click", function(){
    // don't allow oder button to be clicked unless there are items in cart

    // if (list.length.value === 0){
    //     orderBtn.disabled = true
    // }
    
    const paymentModal = document.getElementById("payment-modal")

    paymentModal.style.display="flex"
})


const payBtn = document.getElementById("pay-btn")

payBtn.addEventListener("click", function(){

    const orderName = document.getElementById("orderName")
    const thankYouModal = document.getElementById("thank-you-modal")

    thankYouModal.style.display="flex"
    
    const thankYouName = orderName.value
    thankYouModal.innerHTML += `thank you, ${thankYouName}. Your order is on the way.`

    // Hides modal upon submit....not sure if this should be how thats done. need to make it not appear until all fields are filled in 

    const paymentModal = document.getElementById("payment-modal")
    paymentModal.style.display="none"
})






function addToOrder(itemId){
    const targetMenuObj = menuArray.filter(function(item) {
        return item.id === itemId
    })[0]
    // if (!cart.includes(targetMenuObj)) {
    //     cart.push(targetMenuObj)
    //     renderOrderSection()
    // }
    cart.push(targetMenuObj)
    totalPrice += targetMenuObj.price
    renderOrderSection()
    renderPriceSection()
}

function removeFromOrder(itemId){
    const targetMenuObj = menuArray.find(obj => obj.id === itemId)

    if (cart.includes(targetMenuObj)) {
        const index = cart.indexOf(targetMenuObj)
        cart.splice(index, 1)

        totalPrice -= targetMenuObj.price
        renderOrderSection()
        renderPriceSection()
    }
}

function getPriceHtml() {
    let priceHtml = ""
    priceHtml += `<div>$${totalPrice}</div>`
    return priceHtml
}

function getOrderHtml(){
    let orderHtml = ""
    cart.map(function(cartItem) {
        const {name, price, id} = cartItem
        orderHtml +=  `<div class="orderItemInner">
                            <p class="orderItemName">${cartItem.name}</p>
                            <button class="itemRemoveBtn" data-remove="${cartItem.id}">remove</button>
                            <p class="orderItemPrice" data-price="${cartItem.id}">$${cartItem.price}</p>
                        </div>` 
    })
    return orderHtml
}

function getMenuHtml(menuArr){
    //menuArr is stand in parameter for array that will be mapped over
    return menuArr.map(item => {
    //.map -> mapping over array to produce html string
    //item parameter reps each object inside of the array
        const {name,
                ingredients,
                price,
                emoji,
                id} = item
        //deconstructing object so can get each individual item to use in html template below
        return `<div class="menuItem">
                    <div class="menuList">
                        <span id="emoji">${item.emoji}</span>
                        <div class="subMenuItems">
                            <h2 class="itemName" data-name="${item.id}">${item.name}</h2>
                            <p class="itemDescription">${item.ingredients}</p>
                            <h3 class="itemPrice" data-price="${item.id}">$${item.price}</3>
                        </div>
                        <button class="addToOrderBtns" data-add="${item.id}"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>`         
    }).join("")
    //join removes commas between objects in array    
}

function renderOrderSection(){
    document.getElementById("orderItems").innerHTML = getOrderHtml()
}

function renderPriceSection(){
    document.getElementById("totalPrice").innerHTML = getPriceHtml()
}

function render(){
    document.getElementById("menu").innerHTML = getMenuHtml(menuArray)
    // document.getElementById("orderSummary").innerHTML = getMenuHtml()
}

render()










// // event listener for form that prevents default behaviors and get name input to use in thank you modal

// paymentForm.addEventListener("submit", function(e){
//     e.preventDefault()
// }


//  return `<ul class="list" id="list" type="list">
//                     <div class="orderItemInner">
//                         <div class="orderInnerLeft">
//                             <p class="orderItemName" data-name="${id}">${name}</p>
//                             <button class="itemRemoveBtn" data-remove="${id}">Remove</button>
//                         </div>
//                         <div class="orderItemPrice">
//                             <p data-price="${id}">$${price}</p>
//                         </div>
//                     </div>
//                 </ul>`
//     }).join("")

// const removeBtn = document.getElementsByClassName("itemRemoveBtn")

// removeBtn.addEventListener("click", function(e){
//     document.getElementById(e.target.id).parentElement.style.backgroundColor = "lightblue"
// })


//<div>
   // <h3>Total Price: $${totalPrice}</h3>
//</div>


// document.addEventListener("click", function(e){
//     if (e.target.dataset.add) {
//         handleAddClick(e.target.dataset.add)
//     }
// })

// function handleAddClick(item) {
//     const targetMenuItem = menuArray.filter(item => {
//          return item.id === itemId
//     //looking to see if the id in the data is the same as the is stored in itemId
//      })[0]
//     const cart = []
//     const {name,
//              price,
//              id} = targetMenuItem
//     cart.push(targetMenuItem)
//     return cart.map(targetMenuItem => {
//         return document.getElementById("orderSummary").innerHTML += `<ul class="list" type="list">
//                      <div class="orderItemInner">
//                          <div class="orderInnerLeft">
//                              <p class="orderItemName" data-name="${id}">${name}</p>
//                              <button class="itemRemoveBtn" data-remove="${id}">Remove</button>
//                          </div>
//                          <div class="orderItemPrice">
//                              <p data-price="${id}">$${price}</p>
//                          </div>
//                      </div>
//                  </ul>`
//      }).join("")
// }


// menu.addEventListener("click", function(e){
//     // document.getElementById(e.target.id).parentElement.style.backgroundColor = "lightblue"
//     const purchasedItem = document.getElementById(e.target.id).parentElement
//     cart.push(purchasedItem)
//     return document.getElementById("orderSummary").innerHTML = updateCart(cart)
// })

// function updateCart(cartArr){
//     return cartArr.map(item => {
//         const {name,
//             price,
//             id} = item
//         return `<ul class="list" id="list" type="list">
//                         <div class="orderItemInner">
//                             <p class="orderItemName" data-name="${id}">${name}</p>
//                             <button class="itemRemoveBtn" data-remove="${id}">Remove</button>
//                             <p class="orderItemPrice" data-price="${id}">$${price}</p>
//                         </div>
//                 </ul>`
//     }).join("")
// }
