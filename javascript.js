let calculatorNum = "";
let secondaryNum = "";
let selection = "";

function setOutput(text){
    if (!isNaN(text)){
        text = (+(+text).toPrecision(11)).toString();
    }
    const output = document.querySelector('div#output');
    output.textContent = text;
}

function deselect(){
    document.querySelectorAll('div.symbol').forEach(element => element.classList.remove('selected'));
    selection = "";
}

function doEquals(){
    if (selection && secondaryNum && calculatorNum){
        switch (selection) {
            case "buttonDiv":
                if (calculatorNum == 0){
                    setOutput("ERROR");
                    calculatorNum = "";
                    secondaryNum = ""
                    deselect();
                } else {
                    calculatorNum = (+secondaryNum / +calculatorNum).toString();
                }
                break;
            case "buttonMult":
                calculatorNum = (+secondaryNum * +calculatorNum).toString();
                break;
            case "buttonAdd":
                calculatorNum = (+secondaryNum + +calculatorNum).toString();
                break;
            case "buttonSub":
                calculatorNum = (+secondaryNum - +calculatorNum).toString();
                break;
        }
        // secondaryNum = calculatorNum;
        // calculatorNum = "";
        setOutput(calculatorNum);
        deselect()
    }
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
            if (calculatorNum){
                if (selection && calculatorNum && secondaryNum) {
                    doEquals();
                }
                deselect();
                button.classList.add('selected');
                selection = button.id;
                secondaryNum = calculatorNum;
                calculatorNum = "";
            }
        });
    }
    if (button.className.includes('press')){
        switch (button.id){
            case 'buttonBack':
                button.addEventListener('click', e => {
                    if (calculatorNum.length > 1){
                        calculatorNum = calculatorNum.slice(0, -1);
                        setOutput(calculatorNum);
                    } else if (calculatorNum.length == 1) {
                        calculatorNum = "";
                        setOutput("");
                    }
                });
                break;
            case 'buttonReset':
                button.addEventListener('click', e => {
                    calculatorNum = ""
                    secondaryNum = ""
                    setOutput("");
                    deselect();
                });
                break;
            case 'buttonEquals':
                button.addEventListener('click', e => {
                    doEquals();
                });
                break;
            case 'buttonNeg':
                button.addEventListener('click', e => {
                    if (calculatorNum) {
                        if (+calculatorNum > 0) {
                            calculatorNum = '-' + calculatorNum;
                            setOutput(calculatorNum);
                        } else if (+calculatorNum < 0) {
                            calculatorNum = Math.abs(+calculatorNum).toString();
                            setOutput(calculatorNum);
                        }
                    }
                });
                break;
            case 'buttonPerc':
                button.addEventListener('click', e => {
                    if (calculatorNum) {
                        calculatorNum = (+calculatorNum / 100).toString();
                        setOutput(calculatorNum);
                    }
                });
                break;
            case 'buttonDecimal':
                button.addEventListener('click', e => {
                    if (calculatorNum && !calculatorNum.includes(".")) {
                        calculatorNum = calculatorNum + "."
                        setOutput(calculatorNum);
                    } else if (calculatorNum == ""){
                        calculatorNum = "0."
                        setOutput(calculatorNum);
                    }
                })
        }
    }
}


const buttons = document.querySelectorAll('div.button');
buttons.forEach(addListener);

