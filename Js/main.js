import { getPost, deletePost, getUserId, getpayloadFromToken} from "./api/api.js";
import { postPrint } from "./component/modulePost.js";

let wrapper = document.getElementById("container-wrapper");

const printCard = async (filterBy) => {
  let filter = input.value.toUpperCase();
  let post = await getPost();
  let dataPost = post.data.post;



    // start latest filter
    if (filterBy == "latest") {
      let sortedPosts = [];

      dataPost.forEach((post) => {
        if (post.date) {
          sortedPosts.push(post);
        }
      });

      sortedPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()

      );
        dataPost = sortedPosts;

    }  else {
      dataPost = dataPost;
    }



    // end latest filter

  for (let post of dataPost) {
    
    let { tags, name, date, imgSrc, relevant, _id,userName,user, postBody} = post;

  //save user in a variable to use it in the postPrint function 
  const token = sessionStorage.getItem("token");
  const isLogged = getpayloadFromToken(token);



  //calculate to read time of the post
  let wordsPerMinute = 200;
  let noOfWords = postBody.split(/\s/g).length;
  let minutes = noOfWords / wordsPerMinute;
  let readTime = Math.ceil(minutes);






    let col;

    // start relevant filter
    if (filterBy == "relevant") {
      if (post.relevant) {
        let { tags, name, date } = post;
        col = postPrint(name, date, tags,imgSrc, _id,userName, deletePost,getUserId,isLogged, user, readTime );
      }
    } else {
      col = postPrint(name, date, tags,imgSrc, _id,userName, deletePost, getUserId,isLogged,user, readTime);
    }
    // end relevant filter

    let newText = document.createElement("h3");
    newText.innerText = "No se encontro";
    if (name.toUpperCase().indexOf(filter) > -1) {
      col != null ? wrapper.append(col) : null;
    }
  }
};

// start anchor events

let relevantWrapper = document.getElementById("relevant");
relevantWrapper.addEventListener("click", (event) => {
  relevantWrapper.classList.add("active");
  latestWrapper.classList.remove("active");
  wrapper.innerHTML = ""; // ????
  printCard("relevant");
});

let latestWrapper = document.getElementById("latest");
latestWrapper.addEventListener("click", (event) => {
  latestWrapper.classList.add("active");
  relevantWrapper.classList.remove("active");
  wrapper.innerHTML = "";
  printCard("latest");
});

let allWrapper = document.getElementById("all");
allWrapper.addEventListener("click", (event) => {
  allWrapper.classList.add("active");
  latestWrapper.classList.remove("active");
  relevantWrapper.classList.remove("active");
  wrapper.innerHTML = "";
  printCard();
});


// end anchor events

let input = document.getElementById("search-input");
input.addEventListener("keyup", (event) => {
  wrapper.innerHTML = "";
  printCard();
});

printCard();

//Login
let buttonLogin = document.querySelectorAll(".btn-login");

buttonLogin.forEach((element) => {
  element.addEventListener("click", () =>
    window.open("../views/login.html", "_self")
  );
});

const signUp = () => {
  sessionStorage.getItem("token")
    ? window.open("../views/home.html", "_self")
    : window.open("../views/login.html", "_self");
};

let signOut = document.querySelector("#btn-signOut");

signOut.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  signUp();
});
//end-rodo
