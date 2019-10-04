export const getTodaysDate = () => {
    const date = new Date(Date.now()).toLocaleDateString({dateStyle:'short'})
    const formattedDate = date.split('/').join('-')
    return formattedDate
}

export const toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum;
}

export const countToRGB = (count) => {

    if (!count) return "rgb(169,169,169)"

    const maxCount = 1
    const minCount = 450

    let percent = ((count - minCount) / (maxCount - minCount)) * 100

    if (percent === 100) {
        percent = 99
    }

    var r, g, b;

    if (percent < 50) {
        // green to yellow
        r = Math.floor(255 * (percent / 50));
        g = 255;

    } else {
        // yellow to red
        r = 255;
        g = Math.floor(255 * ((50 - percent % 50) / 50));
    }

    b = 0;

    return "rgb(" + r + "," + g + "," + b + ")";
}

export const addScript = ( src ) => {
    const s = document.createElement( 'script' );
    s.setAttribute( 'src', src );
    document.body.appendChild( s );
}

export const toSnakeCase = str => {
    return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')
}

export const toCamelCase = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index)
    {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}