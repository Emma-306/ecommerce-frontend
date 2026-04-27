import { setupCartPage } from "./cart.js";
import { renderLandingPage,showAddedCart } from "./landingPage.js";
import { renderWishlistPage } from "./wishlist.js";
import { setupCheckoutPage } from "./checkout.js";
import { renderAboutPage } from "./about.js";

if(document.body.classList.contains("landing-page")){
  renderLandingPage();
  showAddedCart();
}


if(document.body.classList.contains("wishlist")){
  renderWishlistPage()
  showAddedCart();
}

if(document.body.classList.contains("cart")){
  setupCartPage();
}


if(document.body.classList.contains("checkout")){
  setupCheckoutPage();
}

if(document.body.classList.contains("about")){
  renderAboutPage();
}

function initNav(barId, linksId, containerId) {
  const bar = document.getElementById(barId);
  const links = document.getElementById(linksId);
  const container = document.getElementById(containerId);

  if (!bar || !links || !container) return;
  
  bar.addEventListener("click", () => {

    links.classList.toggle("hidden");
    links.classList.toggle("flex");
    container.classList.toggle("h-32");
    container.classList.toggle("h-96");
  });
}

initNav("nav-bar-signup", "nav-signup", "nav-container-signup");
initNav("nav-bar-login", "nav-login", "nav-container-login");
initNav("nav-bar-landing", "nav-landing", "nav-container-landing");
initNav("nav-bar-wishlist", "nav-wishlist", "nav-container-wishlist");
initNav("nav-bar-cart", "nav-cart", "nav-container-cart");
initNav("nav-bar-checkout", "nav-checkout", "nav-container-checkout");
initNav("nav-bar-about", "nav-about", "nav-container-about");
initNav("nav-bar-contact", "nav-contact", "nav-container-contact");
initNav("nav-bar-error", "nav-error", "nav-container-error");

