/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/tommycoleman87')
.then(data => {
  const user = data.data;
  const container = document.querySelector('.cards');
  container.appendChild(gitHubCard(user));
  console.log("Success", data.data);
  const followers = user.followers_url
  console.log(followers);
  axios.get(followers)
  .then(fData => {
    const users = fData.data;
    users.forEach(fUser => {
      axios.get(fUser.url)
      .then(userData => {
        fUser = userData.data;
        container.appendChild(gitHubCard(fUser));
      })
    })
    console.log(users)
    console.log(fData);
  })
  .catch(error => {
    console.log("Error", error)
  })

})
.catch(error => {
  console.log("Error", error)
})
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

//const followersArray = ['https://api.github.com/users/tetondan','https://api.github.com/users/dustinmyers','https://api.github.com/users/Prouty89', 'https://api.github.com/users/mngmay', 'https://api.github.com/users/bigknell'];

/*followersArray.forEach(follower => {
  axios.get(follower)
  .then(data => {
    const user = data.data;
    const container = document.querySelector('.cards');
    container.appendChild(gitHubCard(user));
    console.log("Success", data.data);
  })
  .catch(error => {
    console.log("Error", error)
  })
})*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function gitHubCard(user) {
  //Create Elements
  const card = document.createElement('div');
  const userImg = document.createElement('img');
  const userInfo = document.createElement('div');
  const usersName = document.createElement('h3');
  const usersUserName = document.createElement('p');
  const userLocation = document.createElement('p');
  const userProfile = document.createElement('p');
  const userProfileLink = document.createElement('a');
  const userFollowers = document.createElement('p');
  const userFollowing = document.createElement('p');
  const userBio = document.createElement('p');
  const userGraph = document.createElement('img');
  const button = document.createElement('button');
 

  //Set classlists
  card.classList.add('card');
  userInfo.classList.add('card-info');
  usersName.classList.add('name');
  usersUserName.classList.add('username');
  userGraph.classList.add('graph');
  button.classList.add('button');
 

  //Set Content
  userImg.src = user.avatar_url;
  if(user.name) {  
    usersName.textContent = user.name;
  } else {
      usersName.textContent = user.login;
    }
  if(user.name) {
    usersUserName.textContent = user.login; 
  } else {
    usersUserName.textContent;
  }
  userLocation.textContent = `Location: ${user.location}`;
  userProfile.textContent = "Profile: ";
  userProfileLink.textContent = user.html_url;
  userProfileLink.href = user.html_url;
  userProfileLink.target = "_blank";
  userFollowers.textContent = `Followers: ${user.followers}`;
  userFollowing.textContent = `Following: ${user.following}`;
  userBio.textContent = `Bio: ${user.bio}`;
  userGraph.src = `http://ghchart.rshah.org/${user.login}`;
  button.textContent = "Show Graph";

  //Append children of Children
  userProfile.appendChild(userProfileLink);
  userInfo.appendChild(usersName);
  userInfo.appendChild(usersUserName);
  if(user.location){userInfo.appendChild(userLocation)
  };
  userInfo.appendChild(userProfile);
  userInfo.appendChild(userFollowers);
  userInfo.appendChild(userFollowing);
  if(user.bio){
    userInfo.appendChild(userBio);
  }
  userInfo.appendChild(button);
  

  //Append Children to Container
  card.appendChild(userImg);
  card.appendChild(userInfo);
  card.appendChild(userGraph);
  
  
  button.addEventListener('click', event => {
    
    const graphs = document.querySelectorAll('.showGraph');
    userGraph.classList.toggle('showGraph');
    if(userGraph.classList.contains('showGraph')) {
      button.textContent = "Close Graph";
    } else {
      button.textContent = "Show Graph";
    }
    graphs.forEach(graph => {
      graph.classList.remove('showGraph')
      const div = graph.parentNode;
      const graphCard = div.querySelector('.card-info');
      const graphButton = graphCard.querySelector('.button');
      graphButton.textContent = 'Show Graph';
    })
  })

  //Return Card
  return card;


}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
