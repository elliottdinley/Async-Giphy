import "./"

// require('dotenv').config();

const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=dogs&limit=25&offset=0&rating=g&lang=en`

async function getImages() {
    const query = document.querySelector("#query").value;
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
        
        // output.innerHTML = matchingResults;
        
    } catch (error) {
        return error;
    }
}