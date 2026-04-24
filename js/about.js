import { leadership } from "./data.js";

export function renderAboutPage(){
    generateStaffPictures();
    navigatePictures();
    addSwipeSupport();
}

let currentIndex = 6;
const itemsPerPage = 3;

function generateStaffPictures(){
    const container = document.getElementById("staff-container");
    container.innerHTML = "";
    const slice = leadership.slice(currentIndex,currentIndex + itemsPerPage);
    slice.forEach(staff =>{
        container.innerHTML += `
            <div class="w-1/3 h-full">
                <div class="w-full h-2/3 bg-gray-300 flex items-end justify-center overflow-hidden">
                    <img src="${staff.image}" class="h-72 w-72 object-contain object-bottom">
                </div>
                <div class="mt-6 min-h-24 bg-white flex flex-col ">
                    <span class="font-medium text-xl md:text-3xl ">${staff.name}</span>
                    <span class="text-sm md:text-base whitespace-nowrap mb-2">${staff.position}</span>
                    <div class="flex flex-row gap-2">
                        <i class="fa-brands fa-square-twitter" style="color: rgb(11, 11, 11);"></i>
                        <i class="fa-brands fa-instagram" style="color: rgb(11, 11, 11);"></i>
                        <i class="fa-brands fa-linkedin-in" style="color: rgb(11, 11, 11);"></i>
                    </div>
                </div>
            </div>
        `;
    });
}

function navigatePictures(){
    const dots = document.querySelectorAll(".dot")
    dots.forEach((dot,index)=>{
        dot.addEventListener("click",()=>{
            currentIndex = index * itemsPerPage;
            generateStaffPictures();
            updateActiveDot(index);
        });
    });
    updateActiveDot(currentIndex / itemsPerPage);
}

function updateActiveDot(activeIndex){
    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot =>{
        dot.classList.remove("bg-theme");
        dot.classList.add("bg-gray-400");
    });
    dots[activeIndex].classList.remove("bg-gray-400");
    dots[activeIndex].classList.add("bg-theme");
}

function addSwipeSupport(){
    const container = document.getElementById("staff-container");
    let startX = 0;
    container.addEventListener("touchstart",e=>{
        startX = e.touches[0].clientX;
    });
    container.addEventListener("touchend",e=>{
        let endX = e.changedTouches[0].clientX;
        if(startX - endX > 50){
            nextGroup();
        }

        if(endX - startX > 50){
            prevGroup();
        }
    });
}
function nextGroup(){
    const totalItems = leadership.length;
    currentIndex += itemsPerPage;
    if(currentIndex >= totalItems){
        currentIndex = 0;     
    }
    generateStaffPictures();
    updateActiveDot(currentIndex / itemsPerPage);
}

function prevGroup(){
    const totalItems = leadership.length;
    currentIndex -= itemsPerPage;

    if(currentIndex < 0){
        currentIndex = totalItems - itemsPerPage;
    }
    generateStaffPictures();
    updateActiveDot(currentIndex/itemsPerPage)
}