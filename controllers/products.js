const { response } = require('express');
const axios = require('axios'); 

const productsGet = async (req, res = response) => {
    
    const { q } = req.query; 

    try {
        // Peticion http MELI
        const intance = axios.create({
            baseURL: `https://api.mercadolibre.com/sites/MLA/search?q=${ q }`
        });

        let { data } = await intance.get();

        let categorias = [];
        data.filters.map( filter => {
            if(filter.id === 'category') {
                filter.values.map( value => {
                    value.path_from_root.map( path => {
                        categorias.push(path.name);
                    });
                });
            }
        });

        let items = [];
        data.results.map( result => {
            const item = {
                id: result.id,
                title: result.title,
                price: {
                    currency: result.currency_id,
                    amount: result.price,
                    decimals: null
                },
                picture: result.thumbnail,
                address: result.seller_address.state,
                condition: result.condition,
                free_shipping: result.shipping.free_shipping
            };
            items.push(item);
        });

        const result = {
            author: {
                name: null,
                lastname: null
            },
            categories: categorias,
            items: items
        };

        res.json(result);

    } catch (error) {
        res.json({
            msg: '¡No se encontro nada!',
        });
    }
    
};

module.exports = productsGet;
   
