// work-2
const categoriesContainer = document.getElementById('categorisContainer');

// work-3
const treeContainer = document.getElementById('tree-container');

// work-10
const AllTreesBtn = document.getElementById('AllTreesbtn');

// work-12
const treeDetailesModal = document.getElementById('tree-details-modal');
// work-15
let cart = [];
// work-17
const cartContainer = document.getElementById('cartContainer');
// work-19
const totalPrice = document.getElementById('totalPrice');
// work-14
// Catch Modal all id

const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modalImg');
const modalCategory = document.getElementById('modalCategory');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');


// work-1
// Category button get and make data load

async function loadCategoryBtn() {
    const res = await fetch('https://openapi.programming-hero.com/api/categories');

    const data = await res.json();
    // console.log(data);
    // forEach loop and get categories elements

    data.categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline w-full my-2';
        btn.textContent = category.category_name;
        // work-7 
        btn.onclick = () => selectCategory(category.id, btn);
        categoriesContainer.append(btn);

    });
    //  work-8
    // category button select function
    async function selectCategory(categoryid, btn) {
        // console.log(categoryid, btn);
        showSpinner();
        // Updat Active Button style
        const allBtn = document.querySelectorAll('#categorisContainer button, #AllTreesbtn');
        allBtn.forEach((btn) => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
        });

        btn.classList.add('btn-primary');
        btn.classList.remove('btn-outline');
        // work-9
        // catch plant by category this link

        const res = await fetch(

            `https://openapi.programming-hero.com/api/category/${categoryid}`

        );
        const data = await res.json();
        // console.log(data.plants);
        displayTrees(data.plants);
        hideSpinner();

    };
    // categoriesContainer.innerHTML= 'ekane button gulo thakbe';
}
loadCategoryBtn();

// work-11
// All tree button catch and onclick function add
AllTreesBtn.addEventListener('click', () => {
    // Update Active Button style
    const allBtn = document.querySelectorAll('#categorisContainer button, #AllTreesbtn');
    allBtn.forEach((btn) => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    });

    AllTreesBtn.classList.add('btn-primary');
    AllTreesBtn.classList.remove('btn-outline');
    loadTreeCard();
})

// work-6
// loading spinner
const loadingSpinner = document.getElementById('loading-spinner');

// loading spinner show function
function showSpinner() {
    loadingSpinner.classList.remove('hidden');
}
// loading spinner hide function
function hideSpinner() {
    loadingSpinner.classList.add('hidden');
}


// work-4
// Tree card get and make dataload

async function loadTreeCard() {
    showSpinner();
    const res = await fetch('https://openapi.programming-hero.com/api/plants');
    const data = await res.json();
    hideSpinner();
    displayTrees(data.plants);

};

// work-5
// Display trees function
function displayTrees(trees) {
    treeContainer.innerHTML = "";
    trees.forEach((tree) => {
        // console.log(tree);
        const div = document.createElement('div');
        div.className = "card bg-white shadow-sm";
        div.innerHTML =
            `
                        <figure>
                            <img src="${tree.image}"
                                alt="${tree.name}"  
                                title="${tree.name}"
                                class= "w-full h-50 object-cover hover:cursor-pointer"
                                onclick="openModalTree(${tree.id})"
                               />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title" onclick="openModalTree(${tree.id})">${tree.name}</h2>
                            <p class="line-clamp-2">${tree.description}</p>
                                <div class="btn-price flex justify-between items-center">
                                    <button class="badge badge-success badge-outline">Success</button>
                                    <span id="price" class="text-2xl font-bold">$${tree.price}</span>
                                </div>
                                
                            <div class="card-actions justify-end">
                                <button onclick="addToCart(${tree.id}, '${tree.name}', '${tree.price}')" class="btn btn-primary w-full">Buy Now</button>
                            </div>
                        </div>
        `
        treeContainer.append(div);
    });

};
// work-13
// open Modal function

async function openModalTree(treeId) {

    console.log(treeId);
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`);
    const data = await res.json();
    const plantDetails = data.plants;
    console.log(plantDetails, 'data');
    treeDetailesModal.showModal();
    modalTitle.textContent = plantDetails.name;
    modalImg.src = plantDetails.image;
    modalCategory.textContent = plantDetails.category;
    modalDescription.textContent = plantDetails.description;
    modalPrice.textContent = plantDetails.price;
}
// work-14
// addToCart function 
function addToCart(id, name, price, quantity) {
    // console.log(id, name, price, quantity 'addto card');
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1,
        });
    }


    updateCart();
};

// work-16
// updateCart function
function updateCart() {
    cartContainer.innerHTML = '';
    // Total Price 
    let total = 0;
    
    // console.log(cart);
    cart.forEach((item) => {
        total += item.price * item.quantity;
        const itemes = document.createElement('div');
        itemes.className = 'card card-body bg-slate-200 mb-5';
        itemes.innerHTML = `
    
    <div class="flex justify-between items-center">
                                <div>
                                    <h2 class="text-2xl font-bold mb-2">${item.name}</h2>
                                    <p class="text-2xl font-bold">$${item.price} x ${item.quantity}</p>
                                </div>
                                <button class="btn btn-ghost" onclick="removeCart(${item.id})">X</button>
                            </div>
                            <p class="text-4xl font-bold text-right">$${item.price * item.quantity} </p>
    
    `
        cartContainer.append(itemes);

    });
    totalPrice.innerText = total;
};
// work-18
// removeCard function
function removeCart(treeId){
const removeElements = cart.filter((item)=> item.id != treeId );
cart= removeElements;
updateCart();

}
loadTreeCard();