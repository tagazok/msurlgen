let url = "&nbsp;";
let petId = "";
let generatedUrl = "";
let devRel = "";

// Get DOM elements
const generaterUrlDOM = document.querySelector("#generatedUrl");
const petIdInputDOM = document.querySelector("#petId");
const devRelInputDOM = document.querySelector("#devRel");
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
devRelInputDOM.addEventListener('keyup', getDevRel);

// Pre-fill PET ID if present in URL
const params = new URLSearchParams(window.location.search)
if (params.has('pet')) {
    petId = params.get('pet');
    petIdInputDOM.value = petId;
    if (params.has('lock') && params.get('lock') === 'true') {
        document.querySelector('#section-petId').style.display = "none";

    }
}
if (params.has('devrel')) {
    devRel = params.get('devrel');
    devRelInputDOM.value = devRel;
    if (params.has('lock') && params.get('lock') === 'true') {
        document.querySelector('#section-devRel').style.display = "none";
    }
}




function getPetId() {
    petId = petIdInputDOM.value;
    generateURL();
}

function getDevRel() {
    devRel = devRelInputDOM.value;
    generateURL();
}
function getUrl() {
    url = urlInputDOM.value;
    generateURL();
}

function generateURL() {
    generatedUrl = "&nbsp;";
    devRel = `${devRel}`;
    petId = `${petId}`;
    try {
        generatedUrl = new URL(url);
        if( petId !=="")
        {
            generatedUrl.searchParams.set('ocid', `AID${petId}`);
        }
        if(devRel !== "") {
            generatedUrl.searchParams.set('wt.mc_id', devRel);
        }

    } catch (error) {
        generatedUrl = "&nbsp;";
        console.log(`PetId: ${petId}`);
        console.log(`DevRel: ${devRel}`);
    }
    generaterUrlDOM.innerHTML = generatedUrl;
}
