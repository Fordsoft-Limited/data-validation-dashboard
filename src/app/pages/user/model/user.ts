export interface User {
    id?: string;
    name?: string;
    role?: string;
    email?: string;
    password?: string;
    cfPassword?: string;
    inventoryStatus?: string;
    date?: string | Date;
}