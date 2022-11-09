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
        let phoneId = `phoneid${i+1}`;
        let base = document.getElementById("base");
        let phoneDiv = document.createElement("div");
        
        phoneDiv.id = phoneId;
        phoneDiv.classList.add("phone-container");
        document.body.insertBefore(phoneDiv, base);
        
        addPhoneImage(phoneId, i, phoneDiv);
        addPhoneDescription(phoneId, i, phoneDiv);
        addPhoneBuyButton(phoneId, i, phoneDiv);
        addFilterElem(phoneId, i, phoneDiv);
    }
    console.log(parsedData.Phones);
}

function addPhoneBuyButton(phoneId, i, phoneDiv) {
    let phoneBuyButton = document.createElement("button");
    phoneDiv.appendChild(phoneBuyButton);
    phoneBuyButton.id = `${phoneId}BuyButton`;
    phoneBuyButton.innerHTML = "Купить";
    
    phoneBuyButton.onclick = function() {
        window.open(`${parsedData.Phones[i].source}`,'_blank')
    };
    
    phoneBuyButton.classList.add("buyButton");
}

function addPhoneDescription(phoneId, i, phoneDiv) {
    let phoneDesc = document.createElement("div");
    phoneDiv.appendChild(phoneDesc);
    phoneDesc.id = `${phoneId}Desc`;
    phoneDesc.style.maxWidth = "280px";

    let phoneBrand = document.createElement("div");
    phoneDesc.appendChild(phoneBrand);
    phoneBrand.innerHTML = `Бренд: ${parsedData.Phones[i].brand}`;
    let phoneModel = document.createElement("div");
    phoneDesc.appendChild(phoneModel);
    phoneModel.innerHTML = `Модель: ${parsedData.Phones[i].model}`;
    let phonePrice = document.createElement("div");
    phoneDesc.appendChild(phonePrice);
    phonePrice.innerHTML = `Цена: ${parsedData.Phones[i].price}`;
    phonePrice.classList.add("descElemPrice");
    let phoneReleaseDate = document.createElement("div");
    phoneDesc.appendChild(phoneReleaseDate);
    phoneReleaseDate.innerHTML = `Дата выпуска: ${parsedData.Phones[i].releaseDate} год`;
    let phoneColor = document.createElement("div");
    phoneDesc.appendChild(phoneColor);
    phoneColor.innerHTML = `Цвет: ${parsedData.Phones[i].color}`;
    let phoneOS = document.createElement("div");
    phoneDesc.appendChild(phoneOS);
    phoneOS.innerHTML = `Операционная система: ${parsedData.Phones[i].OS}`;
    let phoneMemory = document.createElement("div");
    phoneDesc.appendChild(phoneMemory);
    phoneMemory.innerHTML = `Внутрення память: ${parsedData.Phones[i].memory} гб`;
    let phoneCamera = document.createElement("div");
    phoneDesc.appendChild(phoneCamera);
    phoneCamera.innerHTML = `Фронтальная камера: ${parsedData.Phones[i].camera} Мп`;
    let phoneProcessor = document.createElement("div");
    phoneDesc.appendChild(phoneProcessor);
    phoneProcessor.innerHTML = `Модель процессора: ${parsedData.Phones[i].processor}`;

    let phoneDescElems = phoneDesc.children;
    for (let phoneDescElem of phoneDescElems) {
        phoneDescElem.classList.add("descElem");
    }
}

function addPhoneImage(phoneId, i, phoneDiv) {
    let phoneImage = document.createElement("img");
    phoneDiv.appendChild(phoneImage);
    phoneImage.id = `${phoneId}Image`;

    phoneImage.src = parsedData.Phones[i].imageSrc;
    phoneImage.classList.add("phone-image");
}

let arr = [];
function sortelems(i) {
    arr.push(parsedData.Phones[i].releaseDate);
    arr.sort();
    arr = arr.filter((item, index) => arr.indexOf(item) === index);
}

function addFilterElem(phoneId, i, phoneDiv) {
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
    let filterSelectReleaseDate = document.getElementById("filterSelectReleaseDate");
    let filterSelectReleaseDateElem = document.createElement("option");
    sortelems(i); // да как это сделать то
    filterSelectReleaseDateElem.value = parsedData.Phones[i].releaseDate;
    filterSelectReleaseDateElem.innerHTML = parsedData.Phones[i].releaseDate;
    filterSelectReleaseDate.appendChild(filterSelectReleaseDateElem);
    for (i = 0; i < filterSelectBrand.length-1; i++) {
        if (filterSelectReleaseDateElem.value === filterSelectReleaseDate[i].value){
            filterSelectReleaseDateElem.style.display = "none";
        }
    }

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
    let filterSelectPrice = document.getElementById("filterSelectPrice");

    let filterSelectMemory = document.getElementById("filterSelectMemory");
    let filterSelectMemoryElem = document.createElement("option");
    filterSelectMemoryElem.value = parsedData.Phones[i].memory;
    filterSelectMemoryElem.innerHTML = parsedData.Phones[i].memory;
    filterSelectMemory.appendChild(filterSelectMemoryElem);
    for (i = 0; i < filterSelectMemory.length-1; i++) {
        if (filterSelectMemoryElem.value === filterSelectMemory[i].value){
            filterSelectMemoryElem.style.display = "none";
        }
    }

    let filterSelectCamera = document.getElementById("filterSelectCamera");
    let filterSelectCameraElem = document.createElement("option");
    filterSelectCameraElem.value = parsedData.Phones[i].camera;
    filterSelectCameraElem.innerHTML = parsedData.Phones[i].camera;
    filterSelectCamera.appendChild(filterSelectCameraElem);
    for (i = 0; i < filterSelectCamera.length-1; i++) {
        if (filterSelectCameraElem.value === filterSelectCamera[i].value){
            filterSelectCameraElem.style.display = "none";
        }
    }

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
            document.getElementById(`phoneid${i+1}`).style.display = "none";
        }
        if (submitReleaseDate != parsedData.Phones[i].releaseDate && submitReleaseDate != "") {
            document.getElementById(`phoneid${i+1}`).style.display = "none";
        }
        if (submitColor != parsedData.Phones[i].color && submitColor != "") {
            document.getElementById(`phoneid${i+1}`).style.display = "none";
        }
        if (parsedData.Phones[i].price > submitPrice && submitPrice != "") {
            document.getElementById(`phoneid${i+1}`).style.display = "none";
        }
        if (submitMemory != parsedData.Phones[i].memory && submitMemory != "") {
            document.getElementById(`phoneid${i+1}`).style.display = "none";
        }
        if (submitCamera != parsedData.Phones[i].camera && submitCamera != "") {
            document.getElementById(`phoneid${i+1}`).style.display = "none";
        }
        if (submitProcessor != parsedData.Phones[i].processor && submitProcessor != "") {
            document.getElementById(`phoneid${i+1}`).style.display = "none";
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
}
reportWebVitals();