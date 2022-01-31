console.log("pouet");

let url = "&nbsp;";
let petId = "";
let generatedUrl = "";

const generaterUrlDOM = document.querySelector("#generatedUrl");
const petIdInputDOM = document.querySelector("#petId");
const urlInputDOM = document.querySelector("#url");
const copyToClipBoardDOM = document.querySelector("#copyToClipBoard")

petIdInputDOM.addEventListener('keyup', getPetId);
urlInputDOM.addEventListener('keyup', getUrl);

// Add event listener on generate button
// document.querySelector("#generateUrl").addEventListener('click', e => generateURL());
copyToClipBoardDOM.addEventListener('click', async e => {
    await navigator.clipboard.writeText(generatedUrl);
    copyToClipBoardDOM.innerHTML = "Copied";
    setTimeout(function () {
        copyToClipBoardDOM.innerHTML = "Copy";
    }, 3000);
});

const params = new URLSearchParams(window.location.search)
if (params.has('pet')) {
    petId = params.get('pet');
    petIdInputDOM.value = petId;
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
    generatedUrl = "";
    try {
        generatedUrl = new URL(url);
        generatedUrl.searchParams.set('ocid', `AID${petId}`);

    } catch (error) {
        generatedUrl = "";
    }
    generaterUrlDOM.innerHTML = generatedUrl;
}
