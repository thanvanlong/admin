export const configNumber = (data) => {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data);
}

export const configString = (data) => {
    const rs = (data + '').charAt(0).toLocaleUpperCase() + (data + '').slice(1);
    return rs;
}

export const roleConfig = {
    1: 'Client',
    2: 'Waiter',
    3: 'Chef',
    4: 'Admin'
}

export const configField = {
    user: {
        gender: {
            type: 'select',
            data: ['male', 'female'],
            visiable: true,
        },
        role: {
            type: 'select',
            data: Object.values(roleConfig),
            visiable: true,
        },
        address: {
            type: 'text',
            visiable: true,
        },
        isActive: {
            type: 'select',
            data: ['true', 'false'],
            visiable: true,
        },
        isLock: {
            type: 'select',
            data: ['true', 'false'],
            visiable: true,
        },
        username: {
            type: 'text',
            visiable: true,
        },
        email: {
            type: 'email',
            visiable: false,
        },
        password: {
            type: 'password',
            visiable: false,
        },
        phone: {
            type: 'phone',
            visiable: true,
        },
        createdAt: {
            type: 'date',
            visiable: true,
        },
        updatedAt: {
            type: 'date',
            visiable: true,
        }



    }
}

export const configDate = (data) =>{
    const tmpDate = (data +'').split('T');
    return tmpDate[0];
}