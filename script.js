// Loading Data From Api

const loadData = async (search) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${search}`
    );

    const data = await res.json();
    displayData(data.data);
  } catch (err) {
    console.error(err);
  }
};

const displayData = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";
  phones.forEach((phone) => {
    const { phone_name, image } = phone;
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
        <a
            href="#"
            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
        Show Details
        <svg
            aria-hidden="true"
            class="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
        <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd">
            </path>
            </svg>
          </a>
        </div>
      </div>   
    `;
    phoneContainer.appendChild(phoneDiv);
  });
};

// Search By Mouse Click
document.getElementById("search-btn").addEventListener("click", function () {
  const inputField = document.getElementById("simple-search");
  const searchText = inputField.value;
  loadData(searchText);
});

// Search By Enter Key
