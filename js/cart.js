import { getWishlist, getCart, saveCart } from "./data.js";

const cartItemsContainer = document.getElementById("cart-items");

const updatecartButton = document.getElementById("update-cart-button");

export function setupCartPage() {

  updateCartLength();
  getCartItems();
  enableQuantityEdit();
  enableEnterUpdate();

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
                         cursor-pointer">
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
                 data-product-id="${item.id}"
                 class="w-16 border-2 border-gray-400 
                        rounded text-center hidden">
          <span class="quantity-display"
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

    if (newQuantity < 1 || isNaN(newQuantity)) {
      newQuantity = 1;
    }

    const productIndex =cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
      cart[productIndex].quantity = newQuantity;
      const display =document.querySelector( `.quantity-display[data-product-id="${productId}"]` );
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
}