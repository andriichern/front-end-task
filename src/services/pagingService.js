export default function pageData(data, count, pageIndex) {
    let pagedData = [];
    const startIndex = pageIndex * count;
    const endIndex = count + startIndex;

    for (let i = startIndex; i < endIndex; i++) {
        if (i < data.length) {
            pagedData.push(data[i]);
        } else {
            break;
        }        
    }

    return pagedData;
}