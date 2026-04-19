import { wishlist } from "./data.js";
const wishListContainer = document.getElementById('display-wishlist');

export function renderWishlistPage(){
    displayWishList(wishlist,wishListContainer);
}


function displayWishList(wishlist,wishListContainer){
    wishlist.forEach((item)=>{
        wishListContainer.innerHTML += `
            <div class="group w-56 h-80 bg-transparent rounded flex-shrink-0">
            <div class="flex items-center justify-center p-3 bg-gray-200 rounded relative h-56 mb-2">
              ${item?.status === "new" 
                ? `<div class="absolute top-2 left-2 px-2 py-1 bg-mygreen text-white rounded-md text-sm">
                      NEW
                  </div>` 
                : ""
              }
              <img src=${item.image} alt="" class="w-36 h-36">
              <div class="absolute right-2 top-2 bg-white h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
                <i class="fa-regular fa-eye text-black"
                data-type="watch"
                data-watched="${item.watched}" data-id="${item.id}">
                </i>
              </div>
              ${Object.hasOwn(item,"discount")
                  ? `<div class="absolute top-2 left-2 px-2 py-1 bg-theme text-white rounded-md text-sm">-${item.discount}%</div>` 
                  : ""
                }
              <div class="absolute left-0 right-0 bottom-0 bg-black h-9 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-b js-add-to-cart" data-item-id="${item.id}"><p>Add To Cart</p></div>
            </div>
            <div class="flex flex-col items-start justify-start rounded relative">
              <span class="font-medium text-sm">${item.name}</span>
              ${Object.hasOwn(item,"discount")
                ? `<div class="flex flex-row gap-2 mb-2">
                    <span class="text-base font text-theme">$${item.price - Math.round((item.discount / 100) * item.price)}</span>
                    <span class="text-base font text-gray-400 line-through">$${item.price}</span>
                  </div>`
                : `<div class="flex flex-row gap-2 mb-2">
                    <span class="text-base font text-theme">$${item.price}</span>
                  </div>`
              }
              <div class="absolute bottom-0 right-1 flex flex-row items-center justify-center opacity-0 transition-all duration-300 added-to-cart-${item.id}" >
                <img src="../Images/icons/checkmark.png" class="h-5 w-5 mr-1">
                <span class="text-base text-green-600 font-semibold">Added</span>
              </div>
            </div>
          </div>
        </div>
        `;
    });
}