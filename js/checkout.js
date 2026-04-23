import { getWishlist, getCart, saveCart } from "./data.js";


export function setupCheckoutPage(){
    updateCartLength();
    getOrderDetails();
    updatesummary();
    loadSavedDetails();

    const placeOrderBtn = document.getElementById("place-order-btn");

    if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
        validateForm();
    });
    }
    const bankRadio = document.getElementById("payment-bank");
    const cashRadio = document.getElementById("payment-cash");

    if (cashRadio) {
        cashRadio.addEventListener("change", () => {
            clearForm();
        });
    }

    if (bankRadio) {
    bankRadio.addEventListener("change", () => {
        loadSavedDetails();
    });
    }
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

    const firstName = document.getElementById("firstName").value;
    const companyName = document.getElementById("companyName").value;
    const streetAddress = document.getElementById("streetAddress").value;
    const apartment = document.getElementById("apartment").value;
    const city = document.getElementById("city").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;
    const saveDetails = document.getElementById("saveDetails").checked;

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

    alert("Order Placed Successfully");
}

function loadSavedDetails(){
    const bankRadio = document.getElementById("payment-bank");
    if (!bankRadio || !bankRadio.checked) return;

    const savedDetails = localStorage.getItem("checkoutDetails");
    if (!savedDetails) return;
    const userData = JSON.parse(savedDetails);

    document.getElementById("firstName").value = userData.firstName;
    document.getElementById("companyName").value = userData.companyName;
    document.getElementById("streetAddress").value = userData.streetAddress;
    document.getElementById("apartment").value = userData.apartment;
    document.getElementById("city").value = userData.city;
    document.getElementById("phoneNumber").value = userData.phoneNumber;
    document.getElementById("email").value = userData.email;
}

function clearForm(){

    document.getElementById("firstName").value = "";
    document.getElementById("companyName").value = "";
    document.getElementById("streetAddress").value = "";
    document.getElementById("apartment").value = "";
    document.getElementById("city").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("email").value = "";

}