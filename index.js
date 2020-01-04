// This is a JavaScript program rendering JSON data to the page.
//Basic JSON API with no libraries.
//Wrapper function to avoid global variables mixed in. 
(function () {
//Add DOM structure to each post
function renderPosts(posts) {
  // Get the DOM element that will contain the postMessage. 
  var postsDiv = document.getElementById('posts');

  //Add function to iterate through each post
  posts.forEach(function (post) {
    //Create DOM elements, with single var pattern - variables are closure scoped 
    var postDiv = document.createElement("div");
        postNameDiv = document.createElement("div");
        postAuthorDiv = document.createElement("div");
        postContentDiv = document.createElement("div");

    //Set the content of each element
    postNameDiv.innerHTML = post.name;
    postAuthorDiv.innerHTML = post.author;
    postContentDiv.innerHTML = post.content;

    //Set the CSS on each elemnt so they can be styled and referneced by CSS later. In CSS use - for naming.
    postDiv.setAttribute("class", "post");
    postNameDiv.setAttribute("class", "post-name");
    postAuthorDiv.setAttribute("class", "post-author");
    postContentDiv.setAttribute("class", "post-content");

    //Assemble the post Div
    postsDiv.appendChild(postNameDiv);
    postsDiv.appendChild(postAuthorDiv);
    postsDiv.appendChild(postContentDiv)
  });
}

function getPosts(callback) {
  //Fetches the file "posts.JSON" and passes the parsed JSON object into the given callback function.
  //Fetch the JSON using XMLHttp requset. 
  var request = new XMLHttpRequest();
  //When the file has loaded
  request.onload = function () {
    //Parse the JSON text into an array of post objects
    var posts = JSON.parse(request.responseText);
    //pass the posts array into the callback 
    callback(posts);
  };
  //Using http://myjson.com/ for avoid CROSS blocking by Chrome and Firefox. Keeping simple JSON data here.
  //Can render from posts.json as well if running local server 
  request.open("GET", "https://api.myjson.com/bins/f4k1o", true);
  request.send(null);
}

//The main program which renders posts
getPosts(function (posts) {
  renderPosts(posts);
});
}());