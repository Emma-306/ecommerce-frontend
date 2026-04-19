import { renderLandingPage,showAddedCart } from "./landingPage.js";

if(document.body.classList.contains("landing-page")){
  renderLandingPage();
  showAddedCart();
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