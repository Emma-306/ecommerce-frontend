import { getWishlist, getCart, saveCart } from "./data.js";

const cartItemsContainer = document.getElementById("cart-items");
const subTotalSum = document.getElementById("subtotal-sum");
const shippingFee = document.getElementById("shipping-fee");
const shippingPrice = document.getElementById("total");

const updatecartButton = document.getElementById("update-cart-button");

export function setupCartPage() {

  updateCartLength();
  getCartItems();
  enableQuantityEdit();
  enableEnterUpdate();
  enableRemoveItem();
  updatesummary();

  updatecartButton.addEventListener(
    "click",
    updateCartFromInputs
  );

}

function getCartItems() {
  const cart = getCart();
  cartItemsContainer.innerHTML = "";
    cart.forEach((item) => {
    const discountedPrice = Math.round(getDiscountedPrice(item));
    const subtotal =Math.round( discountedPrice * item.quantity);

    cartItemsContainer.innerHTML += `
      <tr class="border border-collapse border-gray-100 shadow-sm">
        <td class="text-left w-2/5 px-6 pt-16 pb-6 ">
          <div class="flex flex-row items-center gap-4 relative group">
            <img src="${item.image}"
                 alt="Product Image"
                 class="h-14 w-14 object-cover">
            <span class="font-normal text-base">
              ${item.name}
            </span>
            <span class="absolute -left-2 -top-2 
                         bg-theme text-white rounded-full 
                         w-5 h-5 flex items-center 
                         justify-center text-xs 
                         opacity-0 group-hover:opacity-100 
                         transition-opacity duration-300 
                         cursor-pointer remove-btn" id="remove-${item.id}">
              x
            </span>
          </div>
        </td>
        <td class="text-center w-1/5 px-6 pt-16 pb-6 font-normal text-base">
          $${discountedPrice}
        </td>
        <td class="text-center w-1/5 px-6 pt-16 pb-6 font-normal text-base">
          <input type="number"
                 value="${item.quantity}"
                 min="1"
                 max="99"
                 data-product-id="${item.id}"
                 class="w-16 border-2 border-gray-400 
                        rounded text-center hidden">
          <span class="quantity-display cursor-pointer"
                data-product-id="${item.id}">
                ${item.quantity}
          </span>
        </td>
        <td class="text-center w-1/5 px-6 pt-16 pb-6 font-normal text-base subtotal">
          $${subtotal}
        </td>
      </tr>
    `;
  });
}

function updateCartLength() {
  const wishlist = getWishlist();
  const cart = getCart();
  const wishlistLengthElement = document.getElementById("wishlist-length");

  if (wishlistLengthElement) {
    wishlistLengthElement.textContent =
    wishlist.length.toString();
  }

  const cartLengthElement = document.getElementById("cart-length");

  if (cartLengthElement) {
    cartLengthElement.textContent = cart.length.toString();
  }

}

function getDiscountedPrice(product) {
  if (product.discount === 0) {
    return product.price;
  }
  const discountAmount = (product.price * product.discount) / 100;
  return product.price - discountAmount;
}

function enableQuantityEdit() {
  const displays = document.querySelectorAll( ".quantity-display");
  displays.forEach((display) => {
    display.addEventListener("click", () => {
        const productId = display.dataset.productId;
        const input = document.querySelector(`input[data-product-id="${productId}"]`);
        display.classList.add("hidden");
        input.classList.remove("hidden");
        input.focus();
    });
  });
}

function enableEnterUpdate() {
  const inputs = document.querySelectorAll('input[type="number"]');

  inputs.forEach((input) => {
    input.addEventListener("keydown",(e) => {
        if (e.key === "Enter") {
          updateCartFromInputs();
          updatesummary();
        }
      }
    );
  });
}

function updateCartFromInputs() {
  const inputs = document.querySelectorAll('input[type="number"]');
  const cart = getCart();
  inputs.forEach((input) => {
    const productId = Number(input.dataset.productId);
    let newQuantity = Number(input.value);

    if (newQuantity < 1 || isNaN(newQuantity) || newQuantity > 99) {
      newQuantity = 1;
    }

    const productIndex =cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
      cart[productIndex].quantity = newQuantity;
      const display = document.querySelector( `.quantity-display[data-product-id="${productId}"]` );
      display.textContent = newQuantity;
      display.classList.remove("hidden");

      input.classList.add("hidden");

      const row = input.closest("tr");
      const subtotalCell = row.querySelector(".subtotal");
      const itemPrice = getDiscountedPrice(cart[productIndex]);
      subtotalCell.textContent = `$${Math.round(itemPrice * newQuantity)}`;
    }
  });
  saveCart(cart);
  console.log("Cart Updated:", cart);
  updatesummary();
}

function enableRemoveItem() {

  cartItemsContainer.addEventListener("click", (e) => {
    const button = e.target.closest('[id^="remove-"]');
    if (!button) return;
    const productId = Number(button.id.replace("remove-", ""));
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);

    saveCart(cart);
    updateCartLength();
    getCartItems();
    updatesummary();
  });
}

function updatesummary() {
  const cart = getCart();
  let subtotal = 0;
  cart.forEach((item) => {
    const discountedPrice = getDiscountedPrice(item);
    subtotal += discountedPrice * item.quantity;
  });
  const shipping = getShippingFee(subtotal);
  subTotalSum.textContent = `${Math.round(subtotal)}`;
  shippingFee.textContent = shipping;
  shippingPrice.textContent = `${Math.round(subtotal) + (shipping === "Free" ? 0 : shipping)}`;
  if (cart.length === 0) {
    subTotalSum.textContent = "0.00";
    shippingPrice.textContent = "0.00";
  }

}

function getShippingFee(cartTotal) {

  if (cartTotal >= 100) {
    return "Free"; 
  }

  return 10; 

}