var loader = document.getElementById(".loader");
function showloader() {
  document.getElementById("loader").style.display = "block";
}

function searchShow(query) {
  fetch(`http://api.tvmaze.com/search/shows?q=${query}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })

    .then((json) => {
      if (json.length == 0) {
        //ako nema rezultata
        document.getElementById("no-result").innerHTML = "no result";
      } else {
        const results = json.map(
          (element) =>
            `<a class="show-name" href="${element.show.url}">${
              element.show.name
            }</a>${
              element.show.image
                ? `<img src="${element.show.image.medium}">`
                : ""
            }`
        );
        renderResults(results);
      }
    })

    .catch((error) => {
      document.getElementById("error-message").innerHTML = error;
    })
    .finally(() => {
      function hideloader() {
        document.getElementById("loader").style.display = "none";
      }
      return hideloader();
    });
}

function renderResults(results) {
  const list = document.getElementById("resultsList");
  list.innerHTML = ""; //clear list nakon novog search-a
  results.forEach((results) => {
    const element = document.createElement("li");
    element.innerHTML = results;

    list.appendChild(element);
  });
}

const taskForm = document.querySelector(".search-Form");
const tasks = [];
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const input = event.target.querySelector(".searchField");
  showloader();
  searchShow(input.value);
  input.value = ""; //clear input nakon svakog submit
});
