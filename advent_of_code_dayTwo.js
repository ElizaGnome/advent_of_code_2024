

//should probably have a reader in general - seems like a common theme

const filesystem = require('fs');

class BaseReader { 

    readCSV(filePath, number) {

        return new Promise((resolve, reject) => {
            const listOfList = [];
            filesystem.readFile(filePath, 'utf8', (err, data) => {

                if (err) {
                    console.error('error:', err);
                    return;
                }
                //style of split
                const row = data.split('\r\n');

                row.forEach(row => {
                    const items = row.split(',');


                

                    if (typeof number != 'undefined') {
                        listOfList.push(items[number]);
                    }
                    else {
                        listOfList.push(items);
                    }

                });
                resolve(listOfList);
                return;

            });

        });

    }
}
async function safeAndUnsafe() {
    const reader = new BaseReader();
    const list = await reader.readCSV('input_two.csv');

    let safeCount = 0; 
    let positive = -1;
    for (let i = 0; i < list.length; i++) {
        let difference = list[i][0] - list[i][1];
     
        positive = difference > 0 ? 1 : -1;

        let value = checkArray(list[i], positive);
        safeCount += value;

    }
           
   console.log(safeCount);
}

function checkArray(values, positive) {



    //start with the second value
    for (let i = 1; i < values.length; i++) {
        //small issue with trailing commas
        if (values[i].length > 0) {
            let diff = (values[i - 1] - values[i]) * positive;
            //console.log(diff);

          
            if (diff < 1 || diff > 3) {
                return 0;

            }

        }

    }
    return 1;

}
function checkArrayDamp(values, positive) {


    let dampner = true;
    //start with the second value
    for (let i = 1; i < values.length; i++) {
        //small issue with trailing commas
        if (values[i].length > 0) {
            let diff = (values[i - 1] - values[i]) * positive;
            //console.log(diff);


            if (diff < 1 || diff > 3) {

                return 0;

            }


        }

    }
    return 1;

}


safeAndUnsafe()