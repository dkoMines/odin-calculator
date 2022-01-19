let calculatorNum = "";
let secondaryNum = "";

function setOutput(text){
    const output = document.querySelector('div#output');
    output.textContent = text;
}

function addListener(button) {
    if (button.className.includes('num')){
        button.addEventListener('click', e => {
            calculatorNum += button.textContent;
            setOutput(calculatorNum);        
        });
    }
    if (button.className.includes('symbol')){
        button.addEventListener('click', e => {
            button.classList.add('selected');
        });
    }
    if (button.className.includes('press')){
        switch (button.id){
            case 'buttonBack':
                break;
            case 'buttonReset':
                button.addEventListener('click', e => {
                    calculatorNum = ""
                    secondaryNum = ""
                    setOutput("");
                    document.querySelectorAll('div.symbol').forEach(element => element.classList.remove('selected'));
                });
                break;
        }
    }
}


const buttons = document.querySelectorAll('div.button');
buttons.forEach(addListener);

