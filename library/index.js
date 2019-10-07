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

    if (!count) return "rgba(169,169,169, .4)"

    const min = 1
    const max = 450

    const range = max - min
    const correctedStartValue = count - min
    let percent = (correctedStartValue * 100) / range 

    //let percent = ((count - maxCount) / (minCount - maxCount)) * 100

    if (percent === 100) {
        percent = 99
    }

    const result = `rgba(100%,45%,${100-percent}%, 100%)`
    return result;
}

export const opacityPercent = (count) => {
    const min = 1
    const max = 450

    const range = max - min
    const correctedStartValue = count - min
    let percent = (correctedStartValue * 100) / range 

    return (percent+35) / 100
}

export const colorLuminance = (count) => {

    const min = 1
    const max = 450

    const range = max - min
    const correctedStartValue = count - min
    let percent = (correctedStartValue * 100) / range 

    //let percent = ((count - maxCount) / (minCount - maxCount)) * 100

    if (percent === 100) {
        percent = 99
    }

    let hex = '#F37424'
    let lum = (100-percent)/130

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
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