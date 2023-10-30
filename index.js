// require('dotenv').config();

// const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=dogs&limit=25&offset=0&rating=g&lang=en`

const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=eEvpEvBRpllFU9RRX05J6HTXygadw7eK&q=dogs&limit=25&offset=0&rating=g&lang=en`

async function getImages(random) {

    let query = random ? "" : document.querySelector("#query").value;
    const output = document.querySelector("#output");

    try {
        const response = await fetch(endpoint);

        const data = await response.json();
        
        let matchingResults = [];
        
        for (let i = 0; i < data.data.length; i ++) {
            
            let currentUrl = data.data[i].url;
            if (currentUrl.includes(query)) {
                matchingResults.push(currentUrl);
            }
        }

        if (random) {
            query = matchingResults[Math.floor(Math.random() * matchingResults.length)];
            matchingResults = [query];
        }

        output.innerHTML = matchingResults.join("\n\n");

        const outputImage = document.querySelector("#output-images");
        let embedUrl = "";
        for (let url of matchingResults) {
            const urlId = url.split("/").slice(-1)[0].split("-").slice(-1);

            embedUrl += `<iframe src="https://giphy.com/embed/${urlId}" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`;
        }
        

        outputImage.innerHTML = embedUrl;
        
    } catch (error) {
        output.innerHTML = error;
    }
}