// const data = fetch(`https://restcountries.eu/rest/v2/name/morocco`);

// data.then((mydata) => {
//   console.log(mydata);
// });

let countryName = document.querySelector(".name");
let countryPop = document.querySelector(".population");
let countryCur = document.querySelector(".currency");
let countryLang = document.querySelector(".language");
let countryImg = document.querySelector(".img_country");
let blockImg = document.querySelector(".img_block");
let blockUi = document.querySelector(".blocks");

const getData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  request.onload = function () {
    let [data] = JSON.parse(this.responseText);
    showData(data);
  };
};
const showData = function (data) {
  let htmlTemp = `
  <div class="block">
  <div class="name">${data.name}</div>
  <div class="img_block">
  <img src="${data.flag}" alt="" class="img_country" />
  </div>
  <div class="desc">
    <div class="info population">${(data.population / 1000000).toFixed(1)}</div>
    <div class="info currency">Currency: ${data.currencies[0].code}</div>
    <div class="info language">Language: ${data.languages[0].name}</div>
  </div>
</div>`;
  blockUi.innerHTML += htmlTemp;
};

let countries = ["Morocco", "france", "brazil", "china", "canada", "jamaica"];
countries.map((country) => getData(country));
// countries.forEach((country) => {
//   getData(country);
// });
