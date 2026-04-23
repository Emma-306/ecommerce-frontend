import { getWishlist, getCart, saveCart } from "./data.js";


export function setupCheckoutPage(){
    const firstName = document.getElementById("firstName").value;
    const companyName = document.getElementById("companyName").value;
    const streetAddress = document.getElementById("streetAddress").value;
    const apartment = document.getElementById("apartment").value;
    const city = document.getElementById("city").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;
    const saveDetails = document.getElementById("saveDetails").checked;
    updateCartLength();
    getOrderDetails();
    updatesummary();
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

function getOrderDetails(){
    const cart = getCart();
    const orderDetailsContainer = document.getElementById("order-details");
    if(!orderDetailsContainer) return;
    orderDetailsContainer.innerHTML = "";
    cart.forEach((item)=>{
        orderDetailsContainer.innerHTML += `
        <div class="flex flex-row justify-between items-center mb-6">
            <div class="flex flex-row gap-4 items-center">
                <img src="${item.image}" alt="product image" class="h-12 w-12 object-contain">
                <span class="text-base">${item.name}</span>
            </div>
            <span class="text-base">$${Math.round(getDiscountedPrice(item)) * Number(item.quantity)}</span>
         </div>
        `;
    });
}

function getDiscountedPrice(product) {
  if (product.discount === 0) {
    return product.price;
  }

  const discountAmount =
    (product.price * product.discount) / 100;

  return product.price - discountAmount;
}


function updatesummary() {
  const subTotalSum = document.getElementById("subtotal-sum");
  const shippingFee = document.getElementById("shipping-fee");
  const shippingPrice = document.getElementById("total-price");
  const cart = getCart();
  let subtotal = 0;
  cart.forEach((item) => {
    const discountedPrice = getDiscountedPrice(item);
    subtotal += discountedPrice * item.quantity;
  });

  const shipping = getShippingFee(subtotal);

  subTotalSum.textContent =`${Math.round(subtotal)}`;
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

function validateForm(){
    if (!email.includes("@")) {
        alert("Enter a valid email");
        return;
    }
    if (saveDetails) {

    const userData = {
        firstName,
        companyName,
        streetAddress,
        apartment,
        city,
        phoneNumber,
        email
    };

    localStorage.setItem(
        "checkoutDetails",
        JSON.stringify(userData)
    );
    }
}
