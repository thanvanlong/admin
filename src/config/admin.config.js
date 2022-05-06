export const configNumber = (data) =>{
    return new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(data);
}

export const configString = (data) =>{
    const rs = (data +'').charAt(0).toLocaleUpperCase() + (data+ '').slice(1);
    return rs;
}

export const roleConfig = {
    1: 'Client',
    2: 'Waiter',
    3: 'Chef',
    4: 'Admin'
}