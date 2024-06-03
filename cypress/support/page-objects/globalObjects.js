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


    generateFormattedDate(offsetDays = 0,format = 'MM/DD/YYYY') {
        const date = new Date();
        date.setDate(date.getDate() + offsetDays);

        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthName = monthNames[date.getMonth()];
    
        if (format === 'MM/DD/YYYY') {
            return `${month}/${day}/${year}`;
        } else if (format === 'DD MMM YYYY') {
            return `${day} ${monthName} ${year}`;
        } else if (format === 'DD/MM/YYYY') {
                return `${day}/${month}/${year}`;
        } else {
            throw new Error('Unsupported format');
        }
    }
  }