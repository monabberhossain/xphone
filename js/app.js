const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {

    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerText = '';

    const searchMessage = document.getElementById('search-message-field');
    if(phones.length === 0){
        searchMessage.classList.remove('d-none');
    }
    else{
        searchMessage.classList.add('d-none');
    }

    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 12){
        phones = phones.slice(0, 12);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="h-100 mb-5">
                <img src="${phone.image}" class="card-img-top img-fluid mb-3" alt="${phone.phone_name}">
                <div class="card-body">
                    <h5 class="card-title mb-3">${phone.phone_name}</h5>                    
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    toggleLoader(false);
}

document.getElementById('btn-search').addEventListener('click', function (){
    searchPhone(12);
})

document.getElementById('search-field').addEventListener('keypress', function (e){
    if(e.key === 'Enter')
    searchPhones(12);
})

document.getElementById('btn-show-all').addEventListener('click', function(){
    searchPhones();
})

const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loader-section');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}

const searchPhones = (dataLimit) => {
    toggleLoader(true);
    const searchField = document.getElementById('search-field');    
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    searchField.addEventListener('focusin', function (){
        searchField.value = '';
    })
}

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Realease Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found.'}</p>        
    `;
}

loadPhones('oppo', 12);