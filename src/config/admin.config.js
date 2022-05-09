export const configNumber = (data) => {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data);
}

export const configString = (data) => {
    const rs = (data + '').charAt(0).toLocaleUpperCase() + (data + '').slice(1);
    return rs;
}

export const roleConfig = {
    users: ['client', 'waiter', 'admin', 'chef'],
}

export const configField = {
    users: {
        gender: {
            type: 'select',
            data: ['male', 'female'],
            visiable: true,
            create: true,
        },
        role: {
            type: 'select',
            data: Object.values(roleConfig?.users),
            visiable: true,
            create: true,
        },
        address: {
            type: 'text',
            visiable: true,
            create: true,
        },
        isActive: {
            type: 'select',
            data: ['true', 'false'],
            visiable: true,
            create: false,
        },
        isLock: {
            type: 'select',
            data: ['true', 'false'],
            visiable: true,
            create: false,
        },
        username: {
            type: 'text',
            visiable: true,
            create: true,
        },
        email: {
            type: 'email',
            visiable: false,
            create: true,
        },
        password: {
            type: 'password',
            visiable: false,
            create: true,
        },
        phone: {
            type: 'phone',
            visiable: false,
            create: true,
        },
        createdAt: {
            type: 'date',
            visiable: false,
        },
        updatedAt: {
            type: 'date',
            visiable: false,
        }
    }
}

export const configDate = (data) =>{
    const tmpDate = (data +'').split('T');
    return tmpDate[0];
}

export const configOrderPending = (data) =>{
    const createdat = data?.createdAt;
    let food = '';
    data?.dishes.map((item) =>{
        const name = item?.name.length > 11 ? item?.name.slice(0,10) +'...' : item?.name;
        food = food + name + "\n" ;
    })
    let quantity = '';
    data?.quantity.map((item) =>{
        quantity = quantity + item + "\n";
    })
    let total = 0 ;
    data?.dishes.map((item, index) =>{
        total += (data?.quantity[index]) * item.price;
    });
    const timedelivery = data?.timeDelivery;
    return {...data, total, food, quantity, createdat, timedelivery};
    
}