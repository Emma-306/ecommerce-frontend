import { getWishlist } from "./data.js";

export function setupCartPage(){
    updateCartLength();
}


function updateCartLength(){
  const wishlist = getWishlist();
  const wishlistLengthElement = document.getElementById('wishlist-length');
  if(wishlistLengthElement){
    wishlistLengthElement.textContent = wishlist.length.toString();
  }
}
