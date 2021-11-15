const { response } = require('express');
const axios = require('axios'); 

const detailsGet = async(req, res = response) => {
    
    const id = req.params.id;
    
    try {
        // Peticion http MELI
        const intancePro = axios.create({
            baseURL: `https://api.mercadolibre.com/items/${ id }`
        });
        let { data: respPro } = await intancePro.get();

        const intanceDesc = axios.create({
            baseURL: `https://api.mercadolibre.com/items/${ id }/description`
        });
        let { data: respDesc } = await intanceDesc.get();

        const detailsProduct = {
            author: {
                name: null,
                lastname: null
            },
            item: {
                id: respPro.id,
                title: respPro.title,
                price: {
                    currency: respPro.currency_id,
                    amount: respPro.price,
                    decimals: null,
                },
                picture: respPro.pictures,
                condition: respPro.condition,
                free_shipping: respPro.shipping.free_shipping,
                sold_quantity: respPro.sold_quantity,
                description: respDesc.plain_text
            }
        };

        res.json(detailsProduct);

    } catch (error) {
        res.json({
            msg: '¡No se encontro nada!',
        });
    }
    
};


module.exports = detailsGet;
   