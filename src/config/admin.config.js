export const configNumber = (data) =>{
    return new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(data);
}