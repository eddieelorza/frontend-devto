import {loginUser} from "../api/api.js"

let inputsValue = document.querySelectorAll("#form-info input");
let buttonContinue = document.querySelector("#btn-continue");

let data = {};

inputsValue.forEach((fieldsData) => {
  fieldsData.addEventListener("keyup", (event) => {
    let property = event.target.name;
    let value = event.target.value;
  
    data[property] = value;
  });
});

const submitForm = async() => {
 
  const tokenData = await loginUser(data)
  const tokenObject = tokenData.data.token
  sessionStorage.setItem("token",  tokenObject),
  window.open("../../views/home.html", "_self")

};

const resetForm = () => {
  document.querySelectorAll("#form-info input").forEach((element) => {
    element.value = "";
    data = {};
  });
};

buttonContinue.addEventListener("click", () => {
  loginUser(data) 
  submitForm()
  // resetForm();

});
