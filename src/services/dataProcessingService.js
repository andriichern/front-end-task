export function processDataHeaders(data) {
    if (!data) {
        return;
    }

    let dataKeys = {};

    for (let i = 0; i < data.length; i++) {
        const currentItem = data[i];

        for (let [key, value] of Object.entries(currentItem)) {
            console.log(key);

            if (dataKeys[key]) {
                dataKeys[key] = dataKeys[key] + 1
            } else {
                dataKeys[key] = 1;
            }
        }
    }

    console.log(dataKeys);
}