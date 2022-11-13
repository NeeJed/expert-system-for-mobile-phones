import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

let parsedData = null;

function getFile(fileName) {
    let request = new XMLHttpRequest();
    request.withCredentials = true;
    request.open('GET', './data.json');
    request.onloadend = function() {
        parse(request.responseText);
    }
    request.send();
}

function sortIntegers(a, b) {
    return a - b;
}

// fetch("./data.json")
// .then(response => {
//    return response.json();
// })
// .then(data => console.log(data));

getFile('./data.json'); //путь к файлу

function parse(obj) {
    try {
        parsedData = JSON.parse(obj);
    }
    catch (error) {
        console.log('Error parsing JSON:', obj);
    }
    addPhone();
}
// (async () => {
//     await new Promise((resolve, reject) => setTimeout(resolve, 1000));
// })();
function addPhone() {
    for (let i = 0; i < Object.keys(parsedData.Phones).length; i++) {
        let phoneId = `phoneid${i}`;
        let base = document.getElementById("base");
        let phoneDiv = document.createElement("div");
        
        phoneDiv.id = phoneId;
        phoneDiv.classList.add("phone-container");
        document.body.insertBefore(phoneDiv, base);
        
        // перенести за цикл
        addPhoneDescription(phoneId, i, phoneDiv);
    }
    addPhoneBuyButton();
    addPhoneImage();
    addFilterElem();

    console.log(parsedData.Phones);
}

function addPhoneBuyButton() {
    for (let i = 0; i < Object.keys(parsedData.Phones).length; i++) {
        let phoneBuyButton = document.createElement("button");
        let allPhoneDivs = document.querySelectorAll(".phone-container");
        allPhoneDivs[i].appendChild(phoneBuyButton);
        phoneBuyButton.id = `${allPhoneDivs[i].id}BuyButton`;
        phoneBuyButton.innerHTML = "Купить";
        
        phoneBuyButton.onclick = function() {
            if (parsedData.Phones[i].source != null || parsedData.Phones[i].source != undefined) {
                window.open(`${parsedData.Phones[i].source}`,'_blank')
            }
        };

        phoneBuyButton.classList.add("buyButton");
    }
}

function addPhoneImage() {
    for (let i = 0; i < Object.keys(parsedData.Phones).length; i++) {
        let phoneImage = document.createElement("img");
        let allPhoneDivs = document.querySelectorAll(".phone-container");
        allPhoneDivs[i].appendChild(phoneImage);
        phoneImage.id = `${allPhoneDivs[i].id}Image`;

        phoneImage.src = parsedData.Phones[i].imageSrc;
        phoneImage.classList.add("phone-image");
    }
}

function addPhoneDescription(phoneId, i, phoneDiv) {
    let phoneDesc = document.createElement("div");
    phoneDiv.appendChild(phoneDesc);
    phoneDesc.id = `${phoneId}Desc`;
    phoneDesc.style.maxWidth = "280px";

    let phoneBrand = document.createElement("div");
    phoneDesc.appendChild(phoneBrand);
    
    let phoneModel = document.createElement("div");
    phoneDesc.appendChild(phoneModel);

    let phonePrice = document.createElement("div");
    phoneDesc.appendChild(phonePrice);
    phonePrice.classList.add("descElemPrice");
    
    let phoneReleaseDate = document.createElement("div");
    phoneDesc.appendChild(phoneReleaseDate);
    
    let phoneColor = document.createElement("div");
    phoneDesc.appendChild(phoneColor);
    
    let phoneOS = document.createElement("div");
    phoneDesc.appendChild(phoneOS);
    
    let phoneMemory = document.createElement("div");
    phoneDesc.appendChild(phoneMemory);
    
    let phoneCamera = document.createElement("div");
    phoneDesc.appendChild(phoneCamera);
    
    let phoneProcessor = document.createElement("div");
    phoneDesc.appendChild(phoneProcessor);

    let phoneDescElems = phoneDesc.children;
    for (let phoneDescElem of phoneDescElems) {
        phoneDescElem.classList.add("descElem");
    }

    if (parsedData.Phones[i].brand != undefined) {
        phoneBrand.innerHTML = `Бренд: ${parsedData.Phones[i].brand}`;
    } else phoneBrand.innerHTML = `Бренд: нет данных`;
    if (parsedData.Phones[i].model != undefined) {
        phoneModel.innerHTML = `Модель: ${parsedData.Phones[i].model}`;
    } else phoneModel.innerHTML = `Модель: нет данных`;
    if (parsedData.Phones[i].price != undefined) {
        phonePrice.innerHTML = `Цена: ${parsedData.Phones[i].price}`;
    } else phonePrice.innerHTML = `Цена: нет данных`;
    if (parsedData.Phones[i].releaseDate != undefined) {
        phoneReleaseDate.innerHTML = `Дата выпуска: ${parsedData.Phones[i].releaseDate} год`;
    } else phoneReleaseDate.innerHTML = `Дата выпуска: нет данных`;
    if (parsedData.Phones[i].color != undefined) {
        phoneColor.innerHTML = `Цвет: ${parsedData.Phones[i].color}`;
    } else phoneColor.innerHTML = `Цвет: нет данных`;
    if (parsedData.Phones[i].OS != undefined) {
        phoneOS.innerHTML = `Операционная система: ${parsedData.Phones[i].OS}`;
    } else phoneOS.innerHTML = `Операционная система: нет данных`;
    if (parsedData.Phones[i].memory != undefined) {
        phoneMemory.innerHTML = `Внутренняя память: ${parsedData.Phones[i].memory} гб`;
    } else phoneMemory.innerHTML = `Внутрення память: нет данных`;
    if (parsedData.Phones[i].camera != undefined) {
        phoneCamera.innerHTML = `Фронтальная камера: ${parsedData.Phones[i].camera} Мп`;
    } else phoneCamera.innerHTML = `Фронтальная камера: нет данных`;
    if (parsedData.Phones[i].processor != undefined) {
        phoneProcessor.innerHTML = `Модель процессора: ${parsedData.Phones[i].processor}`;
    } else phoneProcessor.innerHTML = `Модель процессора: нет данных`;
}

let arrayOfReleaseDates = [];
let arrayOfReleaseDatesUpdated = [];
let arrayOfMemory = [];
let arrayOfMemoryUpdated = [];
let arrayOfCamera = []
let arrayOfCameraUpdated = []

function addFilterElem() {
    for (let i = 0; i < Object.keys(parsedData.Phones).length; i++) {
        if (parsedData.Phones[i].brand !== undefined) {
            let filterSelectBrand = document.getElementById("filterSelectBrand");
            let filterSelectBrandElem = document.createElement("option");
            filterSelectBrandElem.value = parsedData.Phones[i].brand;
            filterSelectBrandElem.innerHTML = parsedData.Phones[i].brand;
            filterSelectBrand.appendChild(filterSelectBrandElem);
            for (i = 0; i < filterSelectBrand.length-1; i++) {
                if (filterSelectBrandElem.value === filterSelectBrand[i].value){
                    filterSelectBrandElem.style.display = "none";
                }
            }
        }

        if (parsedData.Phones[i].color !== undefined) {
            let filterSelectColor = document.getElementById("filterSelectColor");
            let filterSelectColorElem = document.createElement("option");
            filterSelectColorElem.value = parsedData.Phones[i].color;
            filterSelectColorElem.innerHTML = parsedData.Phones[i].color;
            filterSelectColor.appendChild(filterSelectColorElem);
            for (i = 0; i < filterSelectColor.length-1; i++) {
                if (filterSelectColorElem.value === filterSelectColor[i].value){
                    filterSelectColorElem.style.display = "none";
                }
            }
        }
        let filterSelectPrice = document.getElementById("filterSelectPrice");

        if (parsedData.Phones[i].processor !== undefined) {
            let filterSelectProcessor = document.getElementById("filterSelectProcessor");
            let filterSelectProcessorElem = document.createElement("option");
            filterSelectProcessorElem.value = parsedData.Phones[i].processor;
            filterSelectProcessorElem.innerHTML = parsedData.Phones[i].processor;
            filterSelectProcessor.appendChild(filterSelectProcessorElem);
            for (i = 0; i < filterSelectProcessor.length-1; i++) {
                if (filterSelectProcessorElem.value === filterSelectProcessor[i].value){
                    filterSelectProcessorElem.style.display = "none";
                }
            }
        }

        arrayOfReleaseDates.push(parsedData.Phones[i].releaseDate);
        arrayOfMemory.push(parsedData.Phones[i].memory);
        arrayOfCamera.push(parsedData.Phones[i].camera);

        arrayOfReleaseDates.sort(sortIntegers);
        arrayOfMemory.sort(sortIntegers);
        arrayOfCamera.sort(sortIntegers);

        arrayOfReleaseDatesUpdated = arrayOfReleaseDates.filter((item, index) => arrayOfReleaseDates.indexOf(item) === index);
        arrayOfMemoryUpdated = arrayOfMemory.filter((item, index) => arrayOfMemory.indexOf(item) === index);
        arrayOfCameraUpdated = arrayOfCamera.filter((item, index) => arrayOfCamera.indexOf(item) === index);
    }

    for (let i = 0; i < arrayOfReleaseDatesUpdated.length; i++) {
        if (arrayOfReleaseDatesUpdated[i] !== undefined) {
            let filterSelectReleaseDate = document.getElementById("filterSelectReleaseDate");
            let filterSelectReleaseDateElem = document.createElement("option");
            filterSelectReleaseDateElem.value = arrayOfReleaseDatesUpdated[i];
            filterSelectReleaseDateElem.innerHTML = arrayOfReleaseDatesUpdated[i];
            filterSelectReleaseDate.appendChild(filterSelectReleaseDateElem);
        }
    }
    for (let i = 0; i < arrayOfMemoryUpdated.length; i++) {
        if (arrayOfMemoryUpdated[i] !== undefined) {
            let filterSelectMemory = document.getElementById("filterSelectMemory");
            let filterSelectMemoryElem = document.createElement("option");
            filterSelectMemoryElem.value = arrayOfMemoryUpdated[i];
            filterSelectMemoryElem.innerHTML = arrayOfMemoryUpdated[i];
            filterSelectMemory.appendChild(filterSelectMemoryElem);
        }
    }
    for (let i = 0; i < arrayOfCameraUpdated.length; i++) {
        if (arrayOfCameraUpdated[i] !== undefined) {
            let filterSelectCamera = document.getElementById("filterSelectCamera");
            let filterSelectCameraElem = document.createElement("option");
            filterSelectCameraElem.value = arrayOfCameraUpdated[i];
            filterSelectCameraElem.innerHTML = arrayOfCameraUpdated[i];
            filterSelectCamera.appendChild(filterSelectCameraElem);
        }
    }

    clearFilterSelects();
}

document.getElementById("filterSubmit").onclick = function() {
    let phoneBlock = document.getElementsByClassName("phone-container");
    for (let i = 0; i < phoneBlock.length; i++) {
        phoneBlock[i].style.display = "block";
    }
    let submitBrand = document.getElementById("filterSelectBrand").value;
    let submitReleaseDate = document.getElementById("filterSelectReleaseDate").value;
    let submitColor = document.getElementById("filterSelectColor").value;
    let submitPrice = document.getElementById("filterSelectPrice").value;
    let submitMemory = document.getElementById("filterSelectMemory").value;
    let submitCamera = document.getElementById("filterSelectCamera").value;
    let submitProcessor = document.getElementById("filterSelectProcessor").value;

    for (let i = 0; i < parsedData.Phones.length; i++) {
        if (submitBrand != parsedData.Phones[i].brand && submitBrand != "") {
            document.getElementById(`phoneid${i}`).style.display = "none";
        }
        if (submitReleaseDate != parsedData.Phones[i].releaseDate && submitReleaseDate != "") {
            document.getElementById(`phoneid${i}`).style.display = "none";
        }
        if (submitColor != parsedData.Phones[i].color && submitColor != "") {
            document.getElementById(`phoneid${i}`).style.display = "none";
        }
        if (parsedData.Phones[i].price > submitPrice && submitPrice != "") {
            document.getElementById(`phoneid${i}`).style.display = "none";
        }
        if (submitMemory != parsedData.Phones[i].memory && submitMemory != "") {
            document.getElementById(`phoneid${i}`).style.display = "none";
        }
        if (submitCamera != parsedData.Phones[i].camera && submitCamera != "") {
            document.getElementById(`phoneid${i}`).style.display = "none";
        }
        if (submitProcessor != parsedData.Phones[i].processor && submitProcessor != "") {
            document.getElementById(`phoneid${i}`).style.display = "none";
        }
    }
}

function clearFilterSelects() {
    let allSelects = Array.from(document.getElementById("filter").childNodes);
    allSelects.map((selectItem) => {
        if (document.querySelectorAll('[id*="filterSelect"]')) {
            selectItem.value = "";
        }
    })
}

document.getElementById("filterClear").onclick = function() {
    let phoneBlock = document.getElementsByClassName("phone-container");
    for (let i = 0; i < phoneBlock.length; i++) {
        phoneBlock[i].style.display = "block";
    }
    clearFilterSelects();
    window.scrollTo(0, 0);
}
reportWebVitals();