let url = "&nbsp;";
let petId = "";
let generatedUrl = "";
let advocate = "";
let sourceChannel = "";

// Get DOM elements
const generatorUrlDOM = document.querySelector("#generatedUrl");
const petIdInputDOM = document.querySelector("#petId");
const advocateInputDOM = document.querySelector("#advocate");
const urlInputDOM = document.querySelector("#url");
const copyToClipBoardDOM = document.querySelector("#copyToClipBoard")
const sourceChannelInputDOM = document.querySelector("#sourcechannel");

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
advocateInputDOM.addEventListener('keyup', getadvocate);
sourceChannelInputDOM.addEventListener('keyup', getsourcechannel);

// Pre-fill PET ID if present in URL
const params = new URLSearchParams(window.location.search)
if (params.has('pet')) {
    petId = params.get('pet');
    petIdInputDOM.value = petId;
    if (params.has('lock') && params.get('lock') === 'true') {
        document.querySelector('#section-petId').style.display = "none";

    }
}
if (params.has('advocate')) {
    advocate = params.get('advocate');
    advocateInputDOM.value = advocate;
    if (params.has('lock') && params.get('lock') === 'true') {
        document.querySelector('#section-advocate').style.display = "none";
    }
}


if (params.has('sourcechannel')) {
    advocate = params.get('sourcechannel');
    advocateInputDOM.value = advocate;
    if (params.has('lock') && params.get('lock') === 'true') {
        document.querySelector('#section-sourcechannel').style.display = "none";
    }
}


function getPetId() {
    petId = petIdInputDOM.value;
    generateURL();
}

function getadvocate() {
    advocate = advocateInputDOM.value;
    generateURL();
}

function getsourcechannel() {
    sourceChannel = sourceChannelInputDOM.value;
    generateURL();
}

function getUrl() {
    url = urlInputDOM.value;
    generateURL();
}

function generateURL() {
    generatedUrl = "&nbsp;";
    advocate = `${advocate}`;
    petId = `${petId}`;
    sourcechannel = `${sourcechannel}`;
    try {
        generatedUrl = new URL(url);
        if( petId !=="")
        {
            generatedUrl.searchParams.set('ocid', `AID${petId}`);
        }
        if(advocate !== "") {
            generatedUrl.searchParams.set('wt.mc_id', advocate);
        }
        if(sourceChannel !== "") {
            generatedUrl.searchParams.set('utm_source', sourcechannel);
        }

    } catch (error) {
        generatedUrl = "&nbsp;";
        console.log(`PetId: ${petId}`);
        console.log(`advocate: ${advocate}`);
        console.log('sourcechannel: ${sourceChannel}');
    }
    generatorUrlDOM.innerHTML = generatedUrl;
}
