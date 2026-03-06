// work-2
const categoriesContainer = document.getElementById('categorisContainer');

// work-3
const treeContainer = document.getElementById('tree-container');


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
        console.log(categoryid, btn);
        showSpinner();
        const allBtn = document.querySelectorAll('#categorisContainer button, #AllTreesbtn');
        allBtn.forEach((btn) => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
        });

        btn.classList.add('btn-primary');
        btn.classList.remove('btn-outline');
    }
    // categoriesContainer.innerHTML= 'ekane button gulo thakbe';
}
loadCategoryBtn();

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
    dispalTrees(data.plants);

};

// work-5
// Display trees function
function dispalTrees(trees) {
    trees.forEach((tree) => {
        // console.log(tree);
        const div = document.createElement('div');
        div.className = "card bg-white shadow-sm";
        div.innerHTML =
            `
                        <figure>
                            <img src="${tree.image}"
                                alt="${tree.name}" class="h-[350px] w-full" 
                                title="${tree.name}"
                                />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">${tree.name}</h2>
                            <p class="line-clamp-2">${tree.description}</p>
                                <div class="btn-price flex justify-between items-center">
                                    <button class="badge badge-success badge-outline">Success</button>
                                    <span id="price" class="text-2xl font-bold">$${tree.price}</span>
                                </div>
                                
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary w-full">Buy Now</button>
                            </div>
                        </div>
        `
        treeContainer.append(div);
    });

}

loadTreeCard();