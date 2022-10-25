let polarity = document.getElementById('polarity');
let subjectivity = document.getElementById('subjectivity');
let confidence = document.getElementById('confidence');
let irony = document.getElementById('irony');


const PostData = async (url = "", data = "") =>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


function handleSubmit(event) {
    event.preventDefault()
    polarity.innerHTML = '';
    subjectivity.innerHTML = '';
    confidence.innerHTML = '';
    irony.innerHTML = '';

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let CheckForName = Client.checkForName(formText)

    if (Client.checkForUrl(formText)) {
        console.log("::: Form Submitted :::")
        //loading animation
        document.getElementById('loading').innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';

        //fetch data from the server
        PostData('http://localhost:8081/sentiment', {url: formText})
        .then(function(res) {
            //remove loading animation
            document.getElementById('loading').innerHTML = '';

            //update UI
            console.log(res);
            polarity.innerHTML = "Polarity: " + polarityChecker(res.polarity)
            subjectivity.innerHTML = "Subjectivity: " + res.subjectivity
            confidence.innerHTML = "Confidence: " + res.confidence
            irony.innerHTML = "Irony: " + res.irony

        })
    } else {
        alert("Please enter a valid URL")
    }

}

function polarityChecker(score) {
    let display;
    switch (score){
        case 'P+':
            display = 'strong positive';
            break;
        case 'P':
            display = 'positive';
            break;
        case 'NEW':
            display = 'neutral';
            break;
        case 'N':
            display = 'negative';
            break;
        case 'N+':
            display = 'strong negative';
            break;
        case 'NONE':
            display = 'no sentiment';
    }
    return display.toUpperCase();
}

export { handleSubmit}


