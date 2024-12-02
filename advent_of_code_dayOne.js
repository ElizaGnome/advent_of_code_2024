
//read csv -where i exported the numerics (this is delayed function async please await)
const filesystem = require('fs');

function readCsv(filePath, number) {


    return new Promise((resolve, reject) => {
        const list = [];

        filesystem.readFile(filePath, 'utf8', (err, data) => {

            if (err) {
                console.error('error:', err);
                return;
            }
            //style of split
            const row = data.split('\r\n');

            row.forEach(row => {
                const items = row.split(',');

                list.push(items[number]);
           
            });
            resolve(list); 
       
        });

    });
    
}

//first task
async function csvSort()
{
    const firstList = await readCsv('input_one.csv', 0);

    const secondList = await readCsv('input_one.csv', 1);

    firstList.sort();
    secondList.sort();

    let difSum = 0;

    let overallLength = firstList.length;
    for (let i = 0; i < overallLength; i++) {
        //compare the two lists
        let left = firstList[i];
        let right = secondList[i];

        if (left > right) {

            let dif = left - right;
            difSum += dif;


        }
        else if (right > left) {

            let dif = right - left;
            difSum += dif;

        }
       
    }
    //could have returned but ay,
    console.log(difSum);

}

//second task
async function numberDuplicate() {
    const firstList = await readCsv('input_one.csv', 0);

    const secondList = await readCsv('input_one.csv', 1);

    firstList.sort();
    secondList.sort();

    let difSum = 0;

    //if in other list, count times and multiply

    for (let i = 0; i < firstList.length; i++) {

        let counter = 0;

        for (let y = 0; y < secondList.length; y++) {
            if (firstList[i] === secondList[y]) {
                console.log(firstList[i], secondList[y]);
                counter += 1;
             

            }
        }

        difSum += (firstList[i] * counter);


    }
    console.log(difSum);
}
//bing bom boom.
csvSort();
numberDuplicate();