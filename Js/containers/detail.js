import { getPostId } from "../api/api.js";

let urlParams = new URLSearchParams(window.location.search);
let postId = urlParams.get("postId");


const printPost = async () => {
  let postDetail = await getPostId(postId)
  const dataPostDetail = postDetail.data.post;


  let { imgSrc,date, name, tags, postBody, userName } = dataPostDetail;

  document.querySelector("#post-image").setAttribute("src", imgSrc);

  let authors = document.querySelectorAll(".author");

  authors.forEach((element) => {
    element.textContent = userName;
  });

  document.querySelector("#post-date").textContent = `${moment(date).format(
    "MMM Do"
  )} (${moment(date).startOf("day").fromNow()})`;

  document.querySelector("#post-title").textContent = name;

  let ulTages = document.querySelector("#list-tags");

  let liArray = Object.values(tags);

  liArray.forEach((element) => {
    let liTag = document.createElement("li");
    liTag.textContent = `#${element}`;
    ulTages.append(liTag);
  });

  document.querySelector("#post-content").textContent = postBody;
};

printPost();