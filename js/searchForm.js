let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
};
let cart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () => {
    cart.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
};
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
};
window.onscroll = () => {
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
};
let slides = document.querySelectorAll('.home .slides-container .slide');
let index = 0;

function next() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev() {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}
document.getElementById("search").addEventListener("click", () => {
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");
    elements.forEach((element, index) => {
        if (element.innerText.includes(searchInput.toUpperCase())) {
            cards[index].classList.remove("hide");
        } else {
            cards[index].classList.add("hide");
        }

    });
});