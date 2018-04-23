function displayRepositories(event, data){
  var repos = JSON.parse(this.responseText)
  var repoList =
  `<ul> ${repos.map(repo =>
    `<li>
      ${repo.name} - ${repo.html_url} -
      <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getCommits(this)">Get Commits</a> -
      <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getBranches(this)">Get Branches</a>
     </li>`).join("")}
   </ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories(){
  const request = new XMLHttpRequest()
  var username = document.getElementById("username").value
  var url = `https://api.github.com/users/${username}/repos`
  request.addEventListener("load", displayRepositories);
  request.open("GET", url)
  request.send()
  return false
}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  var commitsList =
  `<ul> ${commits.map(commit =>
    `<li><strong>${commit.commit.author.name} (${commit.author.login})</strong> - ${commit.commit.message}</li>`).join("")}
  </ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el){
  const request = new XMLHttpRequest()
  var username = el.dataset.username
  var name = el.dataset.repository
  var url = `https://api.github.com/repos/${username}/${name}/commits`
  request.addEventListener("load", displayCommits)
  request.open("GET", url)
  request.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  var branchesList =
  `<ul> ${branches.map(branch =>
    `<li>${branch.name}</li>`).join("")}
  </ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getBranches(el){
  const request = new XMLHttpRequest()
  var username = el.dataset.username
  var name = el.dataset.repository
  var url = `https://api.github.com/repos/${username}/${name}/branches`
  debugger
  request.addEventListener("load", displayBranches)
  request.open("GET", url)
  request.send()
}
