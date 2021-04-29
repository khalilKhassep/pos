interface TypeProduct { 
    name: string;
    code: string;
    raw_price: string,
    price: number,
    color: string;
    img?: any | {};
    category_id?: number;
    description?: string;
    stock_count: number,
    exp_date: string;
}



export type {TypeProduct}