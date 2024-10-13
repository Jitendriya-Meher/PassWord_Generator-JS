
// slider 
const inputSlider = document.querySelector("[data-legthSlider]");

// display length 
const displayLength = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector(".copybutton");

const uppercasecheck = document.querySelector(".uppercase");
const lowercasecheck = document.querySelector(".lowercase");
const numbercheck = document.querySelector(".number");
const symbolcheck = document.querySelector(".symbol");

const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generate-button");

const allcheckbox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordlegth = 10;

let checkcount = 0;

// set strength circle color to gray
setIndicator("#ccc");


handleSlider();
// set password length
function handleSlider(){
    // data-legthSlider -> range -> range has values
    inputSlider.value = passwordlegth;
    displayLength.innerHTML = passwordlegth;

    // color for slider
    let mini = inputSlider.min;
    let maxi = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordlegth-mini) * 100 / (maxi-mini)) + "100%";
}

function setIndicator(color){
    // background color
    indicator.style.backgroundColor = color;
    // shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function generateInteger(min,max){
    return Math.round(Math.random() * (max-min)) + min;
}

// generate random number
function generateRandomNumber(){
    return generateInteger(0,9);
}

// generate random lowercase string
function generateLowerCase(){
    return String.fromCharCode(generateInteger(97,123));
}

// generate random upper case string
function generateUpperCase(){
    return String.fromCharCode(generateInteger(65,91));
}

// generate random symbol string
const symbol = "~!@#$%^&*()_+={[]}:;'\,./</>?";
function generateSymnol(){
    let ind = generateInteger(0,symbol.length-1);
    return symbol[ind];
}

// password strength check
function generatePasswordStrength(){
    let hasnum = false;
    let hasupper = false;
    let haslower = false;
    let hassymbol = false;

    if( uppercasecheck.checked){
        hasnum = true;
    }
    if( lowercasecheck.checked){
        hasupper = true;
    }
    if( numbercheck.checked){
        haslower = true;
    }
    if( symbolcheck.checked){
        hassymbol = true;
    }

    if( haslower && hasupper && hasnum && hassymbol && (passwordlegth>=8)){
        setIndicator("#0f0");
    }
    else if( (haslower || hasupper) && (hasnum|| hassymbol) && (passwordlegth>=6)){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

inputSlider.addEventListener("input",(e)=>{
    passwordlegth = e.target.value;
    handleSlider();
})

copybtn.addEventListener('click',()=>{
        navigator.clipboard.writeText(passwordDisplay.value);
});

function handlecheckboxChange(){
    checkcount=0;
    allcheckbox.forEach( (checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
    })

    if(passwordlegth < checkcount){
        passwordlegth=checkcount;
        handleSlider();
    }
}

allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxChange);
});

  
generatebtn.addEventListener('click',()=>{

    // none of the checkboxes are checked
    if(checkcount <=0){
        return;
    }

    if( passwordlegth < checkcount){
        passwordlegth = checkcount;
        handleSlider();
    }

    // remove old password
    password=" ";

    // lets generate password
    let length=0;

    while( length<passwordlegth){
        
        if( (uppercasecheck.checked) && (length<passwordlegth)){
            password += generateUpperCase();
            length++;
        }
        if( lowercasecheck.checked && length<passwordlegth){
            password += generateLowerCase();
            length++;
        }
        if( numbercheck.checked && length<passwordlegth){
            password += generateRandomNumber();
            length++;
        }
        if( symbolcheck.checked && length<passwordlegth){
            password += generateSymnol();
            length++;
        }
    }

    passwordDisplay.value=password.split('').sort(() => Math.random() - 0.5).join('');;

    // calculate string length
    generatePasswordStrength();
});