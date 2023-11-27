import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const noGifsOption = document.getElementById('no-gifs-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const noSelection = document.getElementById('no-selection')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
    noSelection.style.display = 'none' // remove no selection message when radio is clicked!
}

function closeModal(){
    memeModal.style.display = 'none'
}

// close modal by clicking anywhere
document.addEventListener('click', function(e){
    if (e.target !== memeModal && e.target !== getImageBtn) {
        closeModal()
    }
})


//if one is checked and you click the other, switch it!
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');

function handleCheckboxClick(event) {
  checkBoxes.forEach((checkBox) => {
    if (event.target !== checkBox) {
      checkBox.checked = false;
    }
  });
}

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener('click', handleCheckboxClick);
});

// add if else in order to display message if no input is selected!
function renderCat(){
    if (document.querySelector('input[type="radio"]:checked')){
        const catObject = getSingleCatObject()
        memeModalInner.innerHTML =  `
            <img 
            class="cat-img" 
            src="./images/${catObject.image}"
            alt="${catObject.alt}"
            >
            `
        memeModal.style.display = 'flex'
    } else {
        noSelection.style.display = 'block'
    }
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        const noGif = noGifsOption.checked
        const matchingCatsArray = catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } if (noGif) {
                return cat.emotionTags.includes(selectedEmotion) && !cat.isGif // no gif options!
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)