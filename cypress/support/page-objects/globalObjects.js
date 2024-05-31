export class GlobalObjects {

    clickElement(element, index = 0){
        element().eq(index).click({force:true});
    }

    clearAndType(element, value){
        element().clear({force:true});
        element().type(value,{force:true});
    }

    typeAndEnter(element, value){
        element().clear({force:true});
        element().type(`${value}{enter}`,{force:true});
    }

    waitForElement(element){
        element().should('be.visible');
    }

    randomIndexWithExclusion(arrayData, excludedIndex = -1){
        let index;
        do {
            index = Math.floor(Math.random() * arrayData.length);
        } while (index === excludedIndex); 
        return index;
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