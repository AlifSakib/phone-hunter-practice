// Loading Data From Api

const loadData = async (search, limit) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${search}`
    );

    const data = await res.json();
    displayData(data.data, limit);
  } catch (err) {
    console.error(err);
  }
};

const displayData = (phones, limit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";
  const notFound = document.getElementById("not-found");
  const showAll = document.getElementById("show-all");

  if (limit && phones.length > 10) {
    showAll.classList.remove("hidden");
    phones = phones.slice(0, 10);
  } else {
    showAll.classList.add("hidded");
  }

  if (phones.length === 0) {
    notFound.classList.remove("hidden");
    showAll.classList.add("hidded");
  } else {
    notFound.classList.add("hidden");
  }

  phones.forEach((phone) => {
    const { phone_name, image, slug } = phone;
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("mt-10");
    phoneDiv.classList.add("mx-auto");
    phoneDiv.innerHTML = `

    <div
        class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-80">
        <a href="#">
        <img
            class="rounded-t-lg mx-auto pt-5"
            src="${image}"
            alt=""/>
        </a>
        <div class="p-5">
        <a href="#">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${phone_name}
            </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
        <button
      onclick="playerDetails('${slug}')"
      class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
      rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
      data-modal-toggle="small-modal"
    >
      See Details
    </button>
          
        </div>
      </div>   
    `;
    phoneContainer.appendChild(phoneDiv);
  });

  toggleSpinner();
};

const processSearch = (limit) => {
  toggleSpinner(true);
  const inputField = document.getElementById("simple-search");
  const searchText = inputField.value;
  loadData(searchText, limit);
};

// Search By Mouse Click
document.getElementById("search-btn").addEventListener("click", function (e) {
  e.preventDefault();
  processSearch(10);
  const showAll = document.getElementById("show-all");
  showAll.classList.add("hidden");
});

// Show All Button

document.getElementById("show-all").addEventListener("click", function () {
  processSearch();
  const showAll = document.getElementById("show-all");
  showAll.classList.add("hidden");
});

function toggleSpinner(isSpinner) {
  const toggleSpinner = document.getElementById("spinner");
  if (isSpinner === true) {
    toggleSpinner.classList.remove("hidden");
  } else {
    toggleSpinner.classList.add("hidden");
  }
}

const playerDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  const res = await fetch(url);
  const data = await res.json();
  diplayDetails(data.data);
};

const diplayDetails = (phone) => {
  console.log(phone);
  const modal = document.getElementById("modal");
  const {
    name,
    brand,
    releaseDate,
    mainFeatures: {
      chipSet,
      displaySize,
      memory,
      storage,
      sensors: [a, b, c, d, e, f],
    },
  } = phone;

  modal.innerHTML = `
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">${name}</h3>
            <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center
                 dark:hover:bg-gray-600  dark:hover:text-white"
                data-modal-toggle="small-modal">
            <svg aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
            <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 
                0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <ul
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Main Features : 
              <li>${chipSet}</li>
              <li>${memory}</li>
              <li>${displaySize}</li> 
              <li>${storage}</li> 
            </ul>
            <ol
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400 ">
              Sensors :
              <li>${a}</li>
              <li>${b}</li>
              <li>${c}</li>
              <li>${d}</li>
              <li>${e}</li>
              <li>${f}</li>
            </ol>
          </div>
          <!-- Modal footer -->
          <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              onclick="modalHide()"
              data-modal-toggle="small-modal"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
               text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancle</button>
            <button data-modal-toggle="small-modal" type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm 
              font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white
               dark:hover:bg-gray-600 dark:focus:ring-gray-600">
              Order Now
            </button>
          </div>
        </div>
  `;
  modalShow();
};

//Modal Show n Hide
const modalShow = () => {
  console.log("click");
  const modal = document.getElementById("small-modal");
  modal.classList.remove("hidden");
};

const modalHide = () => {
  const modal = document.getElementById("small-modal");
  modal.classList.add("hidden");
};
