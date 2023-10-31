export function geolocationValidate(str) {

    const regex = /-?\d+\.(\d){3,}/g;
    const matches = str.match(regex);
  
    if (!matches) return null;
    if (matches.length !== 2) return null;

  
    return `[${matches[0]}, ${matches[1]}]`;
  }