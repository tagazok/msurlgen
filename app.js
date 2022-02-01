let url = "&nbsp;";
let petId = "";
let generatedUrl = "";

// Get DOM elements
const generaterUrlDOM = document.querySelector("#generatedUrl");
const petIdInputDOM = document.querySelector("#petId");
const urlInputDOM = document.querySelector("#url");
const copyToClipBoardDOM = document.querySelector("#copyToClipBoard")

// Add event listeners on generate button
copyToClipBoardDOM.addEventListener('click', async e => {
    await navigator.clipboard.writeText(generatedUrl);
    copyToClipBoardDOM.innerHTML = "Copied";
    setTimeout(function () {
        copyToClipBoardDOM.innerHTML = "Copy";
    }, 3000);
});
petIdInputDOM.addEventListener('keyup', getPetId);
urlInputDOM.addEventListener('keyup', getUrl);

// Pre-fill PET ID if present in URL
const params = new URLSearchParams(window.location.search)
if (params.has('pet')) {
    petId = params.get('pet');
    petIdInputDOM.value = petId;

    if (params.has('lock') && params.get('lock') === 'true') {
        document.querySelector('#section-petId').style.display = "none";
    }
}


console.log(`PetId: ${petId}`);

function getPetId() {
    petId = petIdInputDOM.value;
    generateURL();
}

function getUrl() {
    url = urlInputDOM.value;
    generateURL();
}

function generateURL() {
    generatedUrl = "&nbsp;";
    try {
        generatedUrl = new URL(url);
        generatedUrl.searchParams.set('ocid', `AID${petId}`);

    } catch (error) {
        generatedUrl = "&nbsp;";
    }
    generaterUrlDOM.innerHTML = generatedUrl;
}
