import { getAllProducts } from "./data.js";
import { showProductDetails, updateIcons } from "./landingPage.js";

export function renderProductDetails(){
    const relatedContainer = document.getElementById("display-related");
    displayRelatedProducts(relatedContainer);
    updateIcons(relatedContainer);
    showProductDetails(relatedContainer);
}

function getRelatedProducts(){
  const allProducts = getAllProducts();
  return allProducts.slice(0, 5);
}

function displayRelatedProducts(container){
  const relatedProducts = getRelatedProducts();
  container.innerHTML =""
  relatedProducts.forEach((item)=>{
    container.innerHTML += `
        <div class="group w-56 h-80 bg-transparent rounded flex-shrink-0 product-card" data-product-id="${item.id}">
            <div class="flex items-center justify-center p-3 bg-gray-200 rounded relative h-56 mb-2">
              ${item?.status === "new" 
                ? `<div class="absolute top-2 left-2 px-2 py-1 bg-mygreen text-white rounded-md text-sm">
                      NEW
                  </div>` 
                : ""
              }
              <img src=${item.image} alt="" class="w-36 h-36">
              <div class="absolute right-2 top-2 bg-white h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
                ${item.liked === false
                  ? `<i 
                      class="fa-regular fa-heart text-black cursor-pointer"
                      data-type="like"
                      data-liked="${item.liked}" data-id="${item.id}">
                    </i>` 
                  : `<i 
                      class="fa-solid fa-heart text-theme cursor-pointer"
                      data-type="like"
                      data-liked="${item.liked}" data-id="${item.id}">
                    </i>`
                }
              </div>
              <div class="absolute right-2 top-12 bg-white h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
                <i 
                  class="fa-regular fa-eye text-black cursor-pointer"
                  data-type="watch"
                  data-id="${item.id}">
                </i>
              </div>
              ${item.discount > 0
                  ? `<div class="absolute top-2 left-2 px-2 py-1 bg-theme text-white rounded-md text-sm">-${item.discount}%</div>` 
                  : ""
                }
              <div class="absolute left-0 right-0 bottom-0 bg-black h-9 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-b js-add-to-cart cursor-pointer" data-item-id="${item.id}"><p>Add To Cart</p></div>
            </div>
            <div class="flex flex-col items-start justify-start rounded relative">
              <span class="font-medium text-sm">${item.name}</span>
              ${item.discount > 0
                ? `<div class="flex flex-row gap-2 mb-2">
                    <span class="text-base font text-theme">$${item.price - Math.round((item.discount / 100) * item.price)}</span>
                    <span class="text-base font text-gray-400 line-through">$${item.price}</span>
                  </div>`
                : `<div class="flex flex-row gap-2 mb-2">
                    <span class="text-base font text-theme">$${item.price}</span>
                  </div>`
              }
              <img src=${item.ratingImage} alt="" class="h-5">
              <div class="absolute bottom-0 right-1 flex flex-row items-center justify-center opacity-0 transition-all duration-300 added-to-cart" >
                <img src="../Images/icons/checkmark.png" class="h-5 w-5 mr-1">
                <span class="text-base text-green-600 font-semibold">Added</span>
              </div>
            </div>
          </div>
        </div>
    `;  
  });
}