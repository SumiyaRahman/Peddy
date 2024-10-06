const adoptSection = document.getElementById("adopt-section");
document.getElementById("view-btn").addEventListener("click", function () {
  adoptSection.scrollIntoView({ behavior: "smooth" });
});

const getPetByCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  petCategories(data.categories);
};
const petCategories = async (categories) => {
  const petCategoryContainer = document.getElementById(
    "pet-category-container"
  );

  categories.forEach((petCategory) => {
    const { category_icon, category } = petCategory;

    const div = document.createElement("div");
    div.innerHTML = `
        <div onclick="getIndividualPets('${category}')" class="py-5 px-8 rounded-xl border border-[#0e7a8126] flex justify-center cursor-pointer">
            <button class="flex items-center justify-center">
                <img class="w-14 h-14" src=${category_icon}>
                <span class="text-2xl font-bold text-secondary ps-4">${category}</span>
            </button>
        </div>
        `;
    petCategoryContainer.append(div);
  });
};

const getAllPets = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  allPets(data.pets);
};

const allPets = (pets) => {
  const allPetContainer = document.getElementById("all-pets");
  allPetContainer.innerHTML = "";

  if (pets.length == 0) {
    allPetContainer.classList.remove("grid");
    allPetContainer.innerHTML = `
        <div class="bg-[#13131308] py-28 rounded-2xl">
            <div class="flex justify-center">
                <img src="./images/error.webp">
            </div>
            <div class="text-center pt-6 space-y-4">
                <h1 class="text-3xl font-bold text-secondary">No Information Available</h1>
                <p class="text-base text-small-text">No pets available right now, but check back soon for your future furry friend!</p>
            </div>
        </div>
        `;
    return;
  } else {
    allPetContainer.classList.add("grid");
  }

  pets.forEach((pet) => {
    const { image, pet_name, breed, date_of_birth, gender, price } = pet;
    const div = document.createElement("div");
    div.innerHTML = `
                        <div class="border p-5 rounded-xl">
                            <img class="w-full h-full lg:h-[160px] object-cover rounded-xl" src=${image}>
                            <div>
                                <h6 class="inter mt-6 mb-2 text-secondary text-xl font-bold">${pet_name}</h6>
                                <div class="text-base space-y-2">
                                    <div class="breed flex items-center space-x-2">
                                        <img src="./images/gird.png">
                                        <p>Breed: ${breed}</p>
                                    </div>
                                    <div class="breed flex items-center space-x-2">
                                        <img src="./images/calender.png">
                                        <p>Birth: ${date_of_birth}}</p>
                                    </div>
                                    <div class="breed flex items-center space-x-2">
                                        <img src="./images/gender.png">
                                        <p>Gender: ${gender}</p>
                                    </div>
                                    <div class="breed flex items-center space-x-2">
                                        <img src="./images/price.png">
                                        <p>Price: ${price}</p>
                                    </div>
                                </div>
                            </div>
                            <hr class="my-4 border border-b-[#1313131a]">

                            <div class="flex items-center justify-between">
                                <div class="border border-[#0e7a8126] rounded-lg">
                                    <img class="py-2 px-4" src="./images/like.png">
                                </div>
                                <div onclick="countDown()">
                                    <button class="font-semibold text-base text-primary border border-[#0e7a8126] py-2 px-4 rounded-lg">Adopt</button>
                                </div>
                                <div>
                                    <button class="font-semibold text-base text-primary border border-[#0e7a8126] py-2 px-4 rounded-lg">Details</button>
                                </div>
                            </div>
                        </div>
        `;
    allPetContainer.append(div);
  });
};

const getIndividualPets = async (category) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await response.json();

  allPets(data.data);
};

const countDown = () => {
  const showCountdown = 
};

getAllPets();
getPetByCategories();
