// authenticate
// const params = `?client_id=${id}&client_secret=${sec}&`;
// no authenticate
const params = `?`;

// the APIs fetched are all from the github rest api https://docs.github.com/en/rest
// https://api.github.com/users/apple/repos?client_id=[id]&client_secret=[secret]?per_page=100

// compose an error message
function getErrorMessage(message, username) {
  if (message === "Not Found") {
    return `${username} doesn't exist`;
  }
  return message;
}

// fetch the profile of the specified user
export function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMessage(profile.message, username));
      }
      return profile;
    });
}

// fetch the repos for the specified user
export function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos${params}per_page=100`
  )
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMessage(repos.message, username));
      }
      return repos;
    });
}

// sum up the count of stars in all the repos for this user
function getStarCount(repos) {
  return repos.reduce((p, v) => {
    return (p += v.stargazers_count);
  }, 0);
}

// arbitrary function to compute score
function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

// fetch both profile and repos to compute score
function getUserData(player) {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos),
    })
  );
}

// sort in descending order by computed score
function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

// perform the battle
export function battle(players) {
  return Promise.all([getUserData(players[0]), getUserData(players[1])])
    .then((results) => {
      return sortPlayers(results);
    })
    .catch((error) => {
      console.log(error);
    });
}

// fetch 'popular' repos by query string
export function fetchPopularRepos(language) {
  const query = ``;
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories${params}q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    // `https://api.github.com/search/repositories?q=user:dmh2000&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }

      return data.items;
    });
}
