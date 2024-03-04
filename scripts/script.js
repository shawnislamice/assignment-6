// COntainers
const postContainer = document.getElementById("posts-container");
const cardPostContainer = document.getElementById("card-post-container");

const latestPostContainer = document.getElementById("latest-post-container");

// COntainers
const loadPosts = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  handlePreloader(true);
  const data = await response.json();
  //   console.log(data.posts);
  postContainer.innerHTML = "";
  data.posts.forEach((item) => {
    // console.log(item.title);
    const div = document.createElement("div");

    if (item.isActive == true) {
      activeLogo = `<div id='active-logo'
                  class="bg-[#10B981] rounded-full size-3 absolute -top-1 -right-1"
                ></div>`;
    } else {
      activeLogo = `<div id='active-logo'
                  class="bg-[#FF3434] rounded-full size-3 absolute -top-1 -right-1"
                ></div>`;
    }
    div.innerHTML = `<div
              class="bg-[#F3F3F5] hover:bg-[#797DFC1A] duration-300 border-2 border-[#797DFC] rounded-xl flex gap-3 md:p-10 px-2 py-3"
            >
              <div class="relative">
                <img
                  class="size-20 md:size-[72px] rounded-lg"
                  src="${item.image}"
                  alt=""
                />
                ${activeLogo}
              </div>
              <div class=' w-full'>
                <div class="flex items-center gap-4 ">
                  <p class="text-[#12132DCC] font-medium">
                    # <span>${item.category}</span>
                  </p>
                  <p class="text-[#12132DCC] font-medium">
                    Author : <span>${item.author.name}</span>
                  </p>
                </div>
                <h1
                  class="text-xl text-[#12132D] font-semibold md:font-bold py-2"
                >
                  ${item.title}
                </h1>
                <p class="text-[#12132D99] font-inter text-justify">
                  ${item.description}
                </p>
                <hr class="my-3 border-dashed border-[1px]" />
                <div class="flex justify-between items-center">
                  <div class="flex gap-8 items-center">
                    <div class="flex items-center gap-3">
                      <img class="size-5" src="./images/message.png" alt="" />
                      <p>${item.comment_count}</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <img class="size-5" src="./images/eye.png" alt="" />
                      <p>${item.view_count}</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <img class="size-5" src="./images/time.png" alt="" />
                      <p>${item.posted_time} min</p>
                    </div>
                  </div>
                  <div class=''>
                    <button class='hover:scale-90 duration-300' id='mark-as-read' onclick="loadNames('${item.title.replace(
                      "'",""
                    )}','${
      item.view_count
    }')"><img src="./images/email 1.png" alt="" /></button>
                  </div>
                </div>
              </div>
            </div>`;
    postContainer.appendChild(div);
  });
  setTimeout(() => {
    handlePreloader(false);
  }, 2000);
  
};

const loadNames = (title, watchingTime) => {
  //   console.log("clicked");
  // console.log(item.author.name)
  // console.log(title);
  // console.log(watchingTime);
  const div = document.createElement("div");
  div.innerHTML = `<div
  class="bg-white rounded-xl flex justify-between items-center text-[#12132D99] font-inter p-4"
  >
  <p class="text-[#12132D] font-semibold">
  ${title}
  </p>
  <div class="flex items-center gap-2">
  <i class="fa-regular fa-eye"></i>
  <p>${watchingTime}</p>
  </div>
  </div>`;

  let count = parseInt(document.getElementById("mark-as-read-count").innerText);
  count = count + 1;
  cardPostContainer.appendChild(div);
  document.getElementById("mark-as-read-count").innerText = count;
};

const loadLatestPosts = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await response.json();
  //   console.log(data);
  data.forEach((item) => {
    const div = document.createElement("div");
    if (
      item.author.posted_date == undefined ||
      item.author.designation == undefined
    ) {
      item.author.posted_date = "No Publish Date";
      item.author.designation = "Unknown";
    }
    div.innerHTML = `<div class="md:w-[320px] border-2 border-[#12132D26] rounded-2xl p-5 md:h-[500px]">
            <div>
              <img
                class="md:h-[200px] rounded-xl"
                src="${item.cover_image}"
                alt=""
              />
            </div>
            <div class="pt-4">
              <div class="flex items-center gap-2">
                <img src="./images/calender.png" alt="" />
                <p class="text-[#12132D99] font-semibold">${item.author.posted_date}</p>
              </div>
              <h3 class="text-[#12132D] font-extrabold py-2">
                ${item.title}
              </h3>
              <p class="text-[#12132D99] pb-2">
                ${item.description}
              </p>
              <div class="flex gap-3 pt-2">
                <img
                  class="rounded-full size-11"
                  src="${item.profile_image}"
                  alt=""
                />
                <div>
                  <p class="text-[#12132D] font-bold">${item.author.name}</p>
                  <p class="opacity-80">${item.author.designation}</p>
                </div>
              </div>
            </div>
          </div>`;

    latestPostContainer.appendChild(div);
  });
};

// search
document.getElementById("search-btn").addEventListener("click", async () => {
  handlePreloader(true);
  const categoryName = document.getElementById("search-value").value;
  postContainer.innerHTML = "";
  const response = await fetch(
    ` https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`
  );
  const data = await response.json();

  data.posts.forEach((item) => {
    const div = document.createElement("div");
    if (item.isActive == true) {
      activeLogo = `<div id='active-logo'
                  class="bg-[#10B981] rounded-full size-3 absolute -top-1 -right-1"
                ></div>`;
    } else {
      activeLogo = `<div id='active-logo'
                  class="bg-[#FF3434] rounded-full size-3 absolute -top-1 -right-1"
                ></div>`;
    }
    div.innerHTML = `<div
              class="bg-[#F3F3F5] hover:bg-[#797DFC1A] duration-300 border-2 border-[#797DFC] rounded-xl flex gap-3 md:p-10 px-2 py-3"
            >
              <div class="relative">
                <img
                  class="size-20 md:size-[72px] rounded-lg"
                  src="${item.image}"
                  alt=""
                />
                ${activeLogo}
              </div>
              <div class='w-full'>
                <div class="flex items-center gap-4">
                  <p class="text-[#12132DCC] font-medium">
                    # <span>${item.category}</span>
                  </p>
                  <p class="text-[#12132DCC] font-medium">
                    Author : <span>${item.author.name}</span>
                  </p>
                </div>
                <h1
                  class="text-xl text-[#12132D] font-semibold md:font-bold py-2"
                >
                  ${item.title}
                </h1>
                <p class="text-[#12132D99] font-inter text-justify">
                  ${item.description}
                </p>
                <hr class="my-3 border-dashed border-[1px]" />
                <div class="flex justify-between items-center">
                  <div class="flex gap-8 items-center">
                    <div class="flex items-center gap-3">
                      <img class="size-5" src="./images/message.png" alt="" />
                      <p>${item.comment_count}</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <img class="size-5" src="./images/eye.png" alt="" />
                      <p>${item.view_count}</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <img class="size-5" src="./images/time.png" alt="" />
                      <p>${item.posted_time} min</p>
                    </div>
                  </div>
                  <div>
                    <button class='hover:scale-90 duration-300' id='mark-as-read' onclick="loadNames('${item.title.replace(
                      "'",""
                    )}','${
      item.view_count
    }')"><img src="./images/email 1.png" alt="" /></button>
                  </div>
                </div>
              </div>
            </div>`;
    postContainer.appendChild(div);
  });
  setTimeout(() => {
    handlePreloader(false);
  }, 2000);
  document.getElementById("search-value").value = "";
});
// search
// Preloader
const handlePreloader = (isLoaded) => {
  const loader = document.getElementById("preloader");
  const loader2 = document.getElementById("preloader-2");
  if (isLoaded) {
    loader.classList.remove("hidden");
    loader2.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
    loader2.classList.add("hidden");
  }
};
// Preloader

// Call Functions
loadPosts();
loadLatestPosts();
// Call Functions
