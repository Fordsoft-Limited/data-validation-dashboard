export class addUser{
    username!: string
    name!: string
    role!: string
    password!: string

}

export class logout{
    username!: string
    name!: string
    role!: string
    password!: string
}

export class changePassword{
    old_password!: string 
    new_password!: string
}

export class refreshToken{  
    refresh!: string
}

export class entranceLogin{
    username!: string
    password!: string
}




export class Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}