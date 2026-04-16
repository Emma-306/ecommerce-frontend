import { flashSalesProducts } from "./data.js";
const flashSalesImages = document.getElementById("flash-sales-images");

export function renderLandingPage() {
  flashSalesProducts.forEach((item) => {
    flashSalesImages.innerHTML += `
        <div class="group w-56 h-80 bg-transparent rounded flex-shrink-0">
            <div class="flex items-center justify-center p-3 bg-gray-200 rounded relative h-56 mb-2">
              <img src=${item.image} alt="" class="w-36 h-36">
              <div class="absolute right-2 top-2 bg-white h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
                <i 
                  class="fa-regular fa-heart text-black cursor-pointer"
                  data-liked="false">
                </i>
              </div>
              <div class="absolute right-2 top-12 bg-white h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
                <i class="fa-regular fa-eye text-black"
                data-watched="false">
                </i>
              </div>
              <div class="absolute top-2 left-2 px-2 py-1 bg-theme text-white rounded-md text-sm">-${item.discount}%</div>
              <div class="absolute left-0 right-0 bottom-0 bg-black h-9 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-b"><p>Add To Cart</p></div>
            </div>
            <div class="flex flex-col items-start justify-start rounded">
              <span class="font-medium text-sm">${item.name}</span>
              <div class="flex flex-row gap-2 mb-2">
                <span class="text-base font text-theme">$${item.price}</span>
                <span class="text-base font text-gray-400 line-through">$${item.price + Math.round((item.discount / 100) * item.price)}</span>
              </div>
              <img src=${item.ratingImage} alt="" class="h-5">
            </div>
          </div>
        </div>
    `;
  });
  flashSalesImages.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-heart")) {

    const heart = e.target;

    heart.classList.toggle("fa-regular");
    heart.classList.toggle("fa-solid");

    heart.classList.toggle("text-theme");

    heart.dataset.liked = heart.dataset.liked === "false" ? "true" : "false";
  } if (e.target.classList.contains("fa-eye")) {

    const eye = e.target;

    eye.classList.toggle("fa-regular");
    eye.classList.toggle("fa-solid");

    eye.classList.toggle("text-theme");

    eye.dataset.watched = eye.dataset.watched === "false" ? "true" : "false";
  }
  });
}
