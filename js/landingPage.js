import { flashSalesProducts,categories,bestSellingProducts } from "./data.js";
const flashSalesImages = document.getElementById("flash-sales-images");
const bestSellingImages = document.getElementById("best-selling-images");
const categoriesContainer = document.getElementById("categories-container");

export function renderLandingPage() {
  
  displayImages(flashSalesImages,flashSalesProducts);
  updateIcons(flashSalesImages, flashSalesProducts);

  displayImages(bestSellingImages,bestSellingProducts);
  updateIcons(bestSellingImages,bestSellingProducts);


  categories.forEach((category)=>{
    categoriesContainer.innerHTML += `
      <div class="h-full w-[182px] border border-gray-200 hover:bg-gray-200 transition-all duration-300 flex-shrink-0 ">
         <div class="flex flex-col items-center justify-center h-full">
            <img class="h-14 w-14 object-cover mb-2" src=${category.image} alt="">
            <span>${category.name}</span>
         </div>
      </div>
    `
  });
}

function displayImages(images,products){
  products.forEach((item) => {
    images.innerHTML += `
        <div class="group w-56 h-80 bg-transparent rounded flex-shrink-0">
            <div class="flex items-center justify-center p-3 bg-gray-200 rounded relative h-56 mb-2">
              <img src=${item.image} alt="" class="w-36 h-36">
              <div class="absolute right-2 top-2 bg-white h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
                <i 
                  class="fa-regular fa-heart text-black cursor-pointer"
                  data-type="like"
                  data-liked="${item.liked}" data-id="${item.id}">
                </i>
              </div>
              <div class="absolute right-2 top-12 bg-white h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
                <i class="fa-regular fa-eye text-black"
                data-type="watch"
                data-watched="${item.watched}" data-id="${item.id}">
                </i>
              </div>
              <div class="absolute top-2 left-2 px-2 py-1 bg-theme text-white rounded-md text-sm">-${item.discount}%</div>
              <div class="absolute left-0 right-0 bottom-0 bg-black h-9 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-b"><p>Add To Cart</p></div>
            </div>
            <div class="flex flex-col items-start justify-start rounded">
              <span class="font-medium text-sm">${item.name}</span>
              <div class="flex flex-row gap-2 mb-2">
                <span class="text-base font text-theme">$${item.price - Math.round((item.discount / 100) * item.price)}</span>
                <span class="text-base font text-gray-400 line-through">$${item.price}</span>
              </div>
              <img src=${item.ratingImage} alt="" class="h-5">
            </div>
          </div>
        </div>
    `;
  });
}

function updateIcons(images,products) {
  images.addEventListener("click", (e) => {
    const icon = e.target.closest("i");
    if (!icon) return;

    const id = Number(icon.dataset.id);
    const product = products.find(p => p.id === id);
    if (!product) return;

    const type = icon.dataset.type;

    if (type === "like") {
      product.liked = !product.liked;

      icon.classList.toggle("fa-regular");
      icon.classList.toggle("fa-solid");
      icon.classList.toggle("text-theme");
    }

    if (type === "watch") {
      product.watched = !product.watched;

      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    }
  });
}

