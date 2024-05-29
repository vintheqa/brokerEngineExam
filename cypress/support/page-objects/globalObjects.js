export class GlobalObjects {

    clickElement(element, index = 0){
     element().eq(index).click();
    }

    clearAndType(element, value){
        element().clear();
        element().type(value);
    }

    typeAndEnter(element, value){
        element().clear();
        element().type(`${value}{enter}`);
    }

    waitForElement(element){
        element().should('be.visible');
    }

    randomIndexWithExclusion(excludedIndex = -1, arrayData){
        let index;
        do {
            index = Math.floor(Math.random() * arrayData.length);
        } while (index === excludedIndex); 
        const randomIndex = arrayData[index];
        return randomIndex
    }

    generateRandomString(stringLength,charSet){
        let randomString = '';
        for (let i = 0; i < stringLength; i++) {
            const randomIndex = Math.floor(Math.random() * charSet.length);
            randomString += charSet.charAt(randomIndex);
        }
        return randomString;
    }
  
  }