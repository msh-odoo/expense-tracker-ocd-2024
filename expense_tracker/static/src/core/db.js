
import { EventBus, useEnv } from "@odoo/owl";


export class DB extends EventBus {
    constructor(params) {
        super();
        this.cache = {};
    }
    /* loads a record store from the database. returns default if nothing is found */
    load(name, deft) {
        if (this.cache[name] !== undefined) {
            return this.cache[name];
        }
        return deft;
    }
    /* saves a record store to the database */
    save(name, data) {
        this.cache[name] = data;
    }

    filterProducts(categoryID) {
        const datas = this.load('datas');
        const auctions = datas.auctionItems;
        if (categoryID === 'all') {
            return auctions;
        } else {
            return auctions.filter((auction) => {
                return auction.categ_id[0] === parseInt(categoryID);
            });
        }
    }

    getProduct(id) {
        const datas = this.load('datas');
        const products = datas.products;
        const product = products.find((product) => product.id === id);
        return product;
    }
}

export function useFetchData() {
    const env = useEnv();
    return () => {
        return env.rpc("/get_ecommerce_data", {});
    }
}
