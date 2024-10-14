let sortPets = [];
let val;

document.querySelectorAll(".adopt").forEach((element) => {
  element.addEventListener('click', () => {
    scrollToSection("adopt-section");
  })
})

document.querySelectorAll(".go-to-nav").forEach((element) => {
  element.addEventListener('click', () => {
    scrollToSection("nav");
  });
});

document.getElementById("contact").addEventListener('click', () => {
  scrollToSection("footer");
});

document.getElementById("banner-sec").addEventListener('click', () => {
  scrollToSection("banner");
});

document.querySelectorAll(".about-sec").forEach((element) => {
  element.addEventListener('click', () => {
    scrollToSection("about-us");
  });
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
    const {id, category_icon, category} = petCategory;

    const div = document.createElement("div");
    div.innerHTML = `
        <div id="container${id}" onclick="getIndividualPets('${category}', ${id})" class="item py-5 px-8 rounded-xl border border-[#0e7a8126] flex justify-center items-center cursor-pointer">
            <img class="w-14 h-14" src=${category_icon}>
            <span class="text-2xl font-bold text-secondary ps-4">${category}s</span>
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

const allPets = (pets, id) => {
  const spinner = document.getElementById("spinner");
  const displayAllPet = document.getElementById("display-all-pet");
  const allPetContainer = document.getElementById("all-pets");
  allPetContainer.innerHTML = "";

  spinner.classList.remove("hidden");
  displayAllPet.classList.add("hidden");

  setTimeout(() => {
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
      item.classList.remove("activeBtn");
      item.classList.add("rounded-xl", "border-[#0e7a8126]");
    });
    if(id){
      const selectedItems = document.getElementById(`container${id}`);
      selectedItems.classList.remove("rounded-xl", "border-[#0e7a8126]");
      selectedItems.classList.add("activeBtn");
      val = id;
    } else {
      val = null;
    }
    spinner.classList.add("hidden");
    displayAllPet.classList.remove("hidden");
    if (pets.length == 0) {
      allPetContainer.classList.remove("grid");
      allPetContainer.innerHTML = `
          <div class="bg-[#13131308] py-28 rounded-2xl">
              <div class="flex justify-center">
                  <img class="w-24 md:w-[160px]" src="./images/error.webp">
              </div>
              <div class="text-center pt-6 space-y-4">
                  <h1 class="text-xl md:text-3xl font-bold text-secondary">No Information Available</h1>
                  <p class="text-sm md:text-base text-small-text">No pets available right now, but check back soon for your future furry friend!</p>
              </div>
          </div>
          `;
      return;
    } else {
      allPetContainer.classList.add("grid");
    }
  
    const sortedPetsByPrice = pets
      .map((sortPet) => ({
        petId: sortPet.petId,
        pet_name: sortPet.pet_name,
        gender: sortPet.gender,
        image: sortPet.image,
        price: sortPet.price,
        date_of_birth: sortPet.date_of_birth,
        category: sortPet.category,
        breed: sortPet.breed,
      }))
      .sort((x, y) => y.price - x.price);
  
      sortPets = sortedPetsByPrice;
  
    pets.forEach((pet) => {
      const { petId, image, pet_name, breed, date_of_birth, gender, price } = pet;
      const div = document.createElement("div");
      div.innerHTML = `
                          <div class="border p-5 rounded-xl">
                              <img class="w-full h-full md:h-[200px] lg:h-[160px] object-cover rounded-xl" src=${image}>
                              <div>
                                  <h6 class="inter mt-6 mb-2 text-secondary text-xl font-bold">${pet_name}</h6>
                                  <div class="text-base space-y-2 text-small-text">
                                      <div class="breed flex items-center space-x-2">
                                          <img src="./images/gird.png">
                                          <p>Breed: ${
                                            !breed ? "Unknown" : breed
                                          }</p>
                                      </div>
                                      <div class="breed flex items-center space-x-2">
                                          <img src="./images/calender.png">
                                          <p>Birth: ${
                                            !date_of_birth
                                              ? "Unknown"
                                              : date_of_birth.slice(0,4)
                                          }</p>
                                      </div>
                                      <div class="breed flex items-center space-x-2">
                                          <img src="./images/gender.png">
                                          <p>Gender: ${
                                            !gender ? "Unknown" : gender
                                          }</p>
                                      </div>
                                      <div class="breed flex items-center space-x-2">
                                          <img src="./images/price.png">
                                          <p>Price: ${
                                            !price ? "Unknown" : price
                                          }$</p>
                                      </div>
                                  </div>
                              </div>
                              <hr class="my-4 border border-b-[#1313131a]">
  
                              <div class="flex items-center justify-between">
                                  <div onclick="likedPet('${image}')" class="border border-[#0e7a8126] rounded-lg cursor-pointer">
                                      <img class="py-2 px-4" src="./images/like.png">
                                  </div>
                                  <div onclick="countDown(this)">
                                      <button class="adopt-btn font-semibold text-base text-primary border border-[#0e7a8126] py-2 px-4 rounded-lg">Adopt</button>
                                  </div>
                                  <div onclick="showDetails(${petId})">
                                      <button class="font-semibold text-base text-primary border border-[#0e7a8126] py-2 px-4 rounded-lg">Details</button>
                                  </div>
                              </div>
                          </div>
          `;
      allPetContainer.append(div);
    });
  }, 2000);
};
// Countdown function with modal
const countDown = (button) => {
  let countdown = 3;
  const countdownModal = document.getElementById("countdown_modal");
  const countdownText = document.getElementById("countdown_text");

  countdownModal.showModal();

  const countdownInterval = setInterval(() => {
    countdownText.textContent = countdown;
    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);

      button.querySelector('button').textContent = "Adopted";
      button.querySelector('button').disabled = true;
  
      countdownModal.close();
    }
  }, 1000); 
};



const getIndividualPets = async (category, id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await response.json();
  allPets(data.data, id);
};

const likedPet = async (image) => {
  const likedPets = document.getElementById("liked-pets");

  const div = document.createElement("div");
  div.innerHTML = `
  <div>
    <img class="w-full h-full md:h-[200px] lg:h-[160px] object-cover rounded-xl" src=${image}>
  </div>
  `;

  likedPets.append(div);
};

const showDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await response.json();

  const modalContainer = document.getElementById("modal-container");
  const {
    image,
    pet_name,
    breed,
    date_of_birth,
    gender,
    price,
    vaccinated_status,
    pet_details,
  } = data.petData;
  modalContainer.innerHTML = `
  <img class="w-full rounded-xl" src=${image} />
          <h3 class="text-2xl font-bold mt-6 mb-4">${pet_name}</h3>
          <div class="flex text-sm text-small-text">
            <div class="space-y-2">
              <div class="breed flex items-center space-x-2">
                <img src="./images/gird.png" />
                <p>Breed: ${!breed ? "Unknown" : breed}</p>
              </div>
              <div class="breed flex items-center space-x-2">
                <img src="./images/gender.png" />
                <p>Gender: ${!gender ? "Unknown" : gender}</p>
              </div>
              <div class="breed flex items-center space-x-2">
                <img src="./images/gender.png" />
                <p>Vaccinated status: ${
                  vaccinated_status ? "Unknown" : vaccinated_status
                }</p>
              </div>
            </div>
            <div class="space-y-2">
              <div class="breed flex items-center space-x-2">
                <img src="./images/calender.png" />
                <p>Birth: ${!date_of_birth ? "Unknown" : date_of_birth.slice(0,4)}</p>
              </div>
              <div class="breed flex items-center space-x-2">
                <img src="./images/price.png" />
                <p>Price: ${!price ? "Unknown" : price}$</p>
              </div>
            </div>
          </div>
          <hr class="my-4 border border-b-[#1313131a]">
          <div class="mb-4">
            <h5 class="text-base font-semibold text-secondary">Details Information</h5>
            <p class="text-sm text-small-text mt-3">${pet_details}</p>
          </div>
          <div class="modal-action w-full">
            <form class="w-full" method="dialog">
              <button class="py-3 w-full border border-[#0e7a8133] text-primary font-bold rounded-lg bg-[#0e7a811a] outline-none">Cancel</button>
            </form>
          </div>
  `;
  document.getElementById("my_modal_1").showModal();
};

const showSortedPets = () => {
  allPets(sortPets, val);
};

getAllPets();
getPetByCategories();
