let polarity = document.getElementById('polarity');
let subjectivity = document.getElementById('subjectivity');
let text = document.getElementById('text');


const postData = async (url = "", data = "") =>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const Data = await response.json();
        return Data;
    } catch (error) {
        console.log("error", error);
    }
}


function handleSubmit(event) {
    event.preventDefault()
    polarity.innerHTML = '';
    subjectivity.innerHTML = '';
    text.innerHTML = '';

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let CheckForName = Client.checkForName(formText)

    if (Client.checkForUrl(formText)) {
        console.log("::: Form Submitted :::")
        //loading animation
        document.getElementById('loading').innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';

        //fetch data from the server
        postData('http://localhost:8081/api', {url: formText})
        .then(function(res) {
            //remove loading animation
            document.getElementById('loading').innerHTML = '';

            //update UI
            console.log(res);
            polarity.innerHTML = "Polarity: <p class=\"result\" >" + checkForPolarity(res.polarity) + "</p>";
            subjectivity.innerHTML = "Subjectivity: <p class=\"result\"> " + res.subjectivity + "</p>";
            text.innerHTML = "Text: <P class=\" result\" >" + res.text + "</p>";

        })
    } else {
        alert("Please enter a valid URL")
    }

}

function checkForPolarity(score) {
    let result;
    if (score === 'P' || score === 'P+') {
        result = 'POSITIVE';
    }
    else if (score === 'NEU') {
        result = 'NAUTRAL';
    }
    else if (score === 'N' || score === 'N+') {
        result = 'NEGATIVE';
    }
    else{
        result = 'NONE';
    }
    return result;
    
}

export { handleSubmit}


