// Main Variables

let input = document.querySelector(".get-repos input");

let getButton = document.querySelector(".get-repos span");

let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// Get Repos Function

function getRepos() {
  if (input.value == "") {
    reposData.innerHTML =
      "<span class='non'>Please Write Github Username</span>";
  } else {
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((res) => {
        return res.json();
      })
      .then((repositories) => {
        // Empty the Container

        reposData.innerHTML = "";

        // Loop On Repositories
        repositories.forEach((repo) => {
          // Create The Main Div

          let mainDiv = document.createElement("div");

          let divText = document.createTextNode(repo.name);

          let urlAndStarsDiv = document.createElement("div");

          urlAndStarsDiv.className = "url&stars";

          let theUrl = document.createElement("a");

          let urlText = document.createTextNode("Visit");

          // Add Hyper Text Refrence To Tag
          theUrl.href = `https://github.com/${input.value}/${repo.name}`;

          // Create Stars Count Span
          let starsSpan = document.createElement("span");

          let starsText = document.createTextNode(
            `${repo.stargazers_count} Stars`
          );

          starsSpan.appendChild(starsText);

          // mainDiv.appendChild(starsSpan);

          // Set Attribute Blank
          theUrl.setAttribute("target", "_blank");

          theUrl.appendChild(urlText);

          urlAndStarsDiv.appendChild(theUrl);

          urlAndStarsDiv.appendChild(starsSpan);

          mainDiv.className = "repo-box";

          // mainDiv.appendChild(theUrl);

          mainDiv.appendChild(urlAndStarsDiv);

          mainDiv.appendChild(divText);

          reposData.appendChild(mainDiv);
        });
      });
  }
}
