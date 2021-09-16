import "@babel/polyfill";

// let countryName = document.querySelector(".name");
// let countryPop = document.querySelector(".population");
// let countryCur = document.querySelector(".currency");
// let countryLang = document.querySelector(".language");
// let countryImg = document.querySelector(".img_country");
// let blockImg = document.querySelector(".img_block");
let blockUi = document.querySelector(".blocks");

// const getData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();
//   request.onload = function () {
//     let [data] = JSON.parse(this.responseText);
//     showData(data);
//   };
// };

const getMyGeo = async function () {
  try {
    const pos = await getGeo();
    const { latitude: lat, longitude: long } = pos.coords;
    const res = await fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
    const data = await res.json();
    if (!data.success) {
      getData("morocco");
      throw new Error("GeoCode API failed");
    } else {
      getData(data.country);
    }
  } catch (err) {
    console.log(`${err}`);
  }
};

const getGeo = function () {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(resolve);
  });
};
const getData = async function (country) {
  try {
    let response = await fetch(
      `https://restcountries.eu/rest/v2/name/${country}`
    );
    let data = await response.json();
    console.log(data);
    if (data.status !== 404) {
      let [dataf] = data;
      showData(dataf);
    } else {
      throw new Error("restcountries failed");
    }
  } catch (err) {
    console.log(`${err}`);
  }
};
const showData = function (data) {
  let htmlTemp = `
  <div class="block">
  <div class="name">${data.name}</div>
  <div class="img_block">
  <img src="${data.flag}" alt="" class="img_country" />
  </div>
  <div class="desc">
    <div class="info population">${(data.population / 1000000).toFixed(
      1
    )}M Hab</div>
    <div class="info currency">Currency: ${data.currencies[0].code}</div>
    <div class="info language">Language: ${data.languages[0].name}</div>
  </div>
</div>`;
  blockUi.innerHTML += htmlTemp;
};

getMyGeo();
