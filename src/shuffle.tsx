/**
 * Thanks go to Stackoverflow - CoolAJ86!
 * Basic implementation of Fisher-Yates algorithim.
 * It shuffles array in place.
 * */ 
 const knuthShuffle = (array : Array<any>): Array<any> => {
    let currentIndex : number = array.length, temporaryValue: any, randomIndex: number;
    // current index starts at arrays end
    while (currentIndex !== 0){
        // create 'random' index to put in currents place
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // make the swap current with random
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

export default knuthShuffle;