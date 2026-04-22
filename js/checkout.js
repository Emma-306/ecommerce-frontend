import { getWishlist, getCart, saveCart } from "./data.js";


export function setupCheckoutPage(){
    updateCartLength();
}

function updateCartLength() {
  const wishlist = getWishlist();
  const cart = getCart();

  const wishlistLengthElement = document.getElementById("wishlist-length");

  if (wishlistLengthElement) {
    wishlistLengthElement.textContent =
      wishlist.length.toString();
  }

  const cartLengthElement =
    document.getElementById("cart-length");

  if (cartLengthElement) {
    cartLengthElement.textContent =
      cart.length.toString();
  }
}
