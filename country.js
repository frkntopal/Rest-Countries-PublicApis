document.querySelector("#btnSearch").addEventListener("click", () => {
    let text = document.querySelector("#txtSearch").value;
    getCountry(text);
});

function getCountry(country) {
    const request = new XMLHttpRequest();

    request.open('GET', 'https://restcountries.com/v3.1/name/' + country);
    request.send();

    request.addEventListener('load', function() {
        const data = JSON.parse(this.responseText);
        console.log(data);
        renderCountry(data[0]);

        const countries = data[0].borders.toString();

        // load neighbors
        const req = new XMLHttpRequest();
        req.open('GET', 'https://restcountries.com/v3.1/alpha?codes=' + countries);
        req.send();

        req.addEventListener('load', function() {
            const data = JSON.parse(this.responseText);
            renderNeighbors(data);
        });
    });
}

function renderCountry(data) {

    let html = `        
        <div class="card-header">
                Arama Sonucu
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-4">
                        <img src="${data.flags.png}" alt="" class="img-fluid">
                    </div>
                    <div class="col-8">
                        <h3 class="card-title">${data.name.common}</h3>
                        <hr>
                        <div class="row">
                            <div class="col-4">Nufüs: </div>
                            <div class="col-8">${(data.population / 1000000).toFixed(1)} milyon</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Resmi Dil: </div>
                            <div class="col-8">${Object.values(data.languages)}</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Başkent: </div>
                            <div class="col-8">${data.capital[0]}</div>
                        </div>
                        <div class="row">
                            <div class="col-4">Para Birimi: </div>
                            <div class="col-8">${Object.values(data.currencies)[0].name} (${Object.values(data.currencies)[0].symbol})</div>
                        </div>
                    </div>
                </div>
            </div>
    `;


    document.querySelector("#country-details").innerHTML = html;
}

function renderNeighbors(data) {
    console.log(data)
    let html = "";
    for (let country of data) {
        html += `
            <div class="col-2 mt-2">
                <div class="card">
                    <img src="${country.flags.png}" class="card-img-top">
                    <div class="card-body">
                        <h6 class="card-title">${country.name.common}</h6>
                    </div>
                </div>
            </div>
        `;

    }
    document.querySelector("#neighbors").innerHTML = html;
}