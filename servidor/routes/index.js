var express = require('express');
var router = express.Router();
var axios = require('axios');
var cors = require('cors');

router.use(cors());

router.get('/mercadoapi/items', function (req, res) {
  const search = req.query.search;
  axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=` + search + "&limit=4")
    .then(function (result) {
      axios.get(`https://api.mercadolibre.com/currencies/ARS`)
        .then(function (data) {
          var moneySymbol = data.data.symbol;
          var arr = result.data.results;
          var productList = {
            categories: [],
            items: []
          }
          for (var i = 0; i < arr.length; i++) {
            var product = {
              id: arr[i].id,
              title: arr[i].title,
              price: {
                currency: moneySymbol,
                amount: arr[i].price,
                decimals: Number(arr[i].price) - Math.floor(arr[i].price)
              },
              picture: arr[i].thumbnail,
              condition: arr[i].condition,
              free_shipping: arr[i].shipping.free_shipping,
              location: arr[i].address.state_name,
              category: arr[i].category_id
            }
            productList.items.push(product)
          }
          res.send(JSON.stringify(productList))
        })
    })
});

router.get('/mercadoapi/items/:id', function (req, res) {
  const id = req.params.id;
  axios.get(`https://api.mercadolibre.com/items/${id}`)
    .then(function (params) {
      axios.get(`https://api.mercadolibre.com/items/${id}/description`)
        .then(function (result) {
          var description = result.data.plain_text;
          var product = {
            id: params.data.id,
            title: params.data.title,
            price: {
              currency: params.data.currency_id.symbol,
              amount: params.data.price,
              decimals: Number(params.data.price) - Math.floor(params.data.price)
            },
            picture: params.data.thumbnail,
            condition: params.data.condition,
            free_shipping: params.data.shipping.free_shipping,
            location: params.data.seller_address.state.name,
            category: params.data.category_id,
            description: description,
          }
          axios.get(`https://api.mercadolibre.com/categories/${params.data.category_id}`)
            .then(function (categories) {
              var catArr = [];
              for (var i = 0; i < categories.data.path_from_root.length; i++) {
                catArr.push(categories.data.path_from_root[i].name)
              }
              product.breadcrumb = catArr;
              axios.get(`https://api.mercadolibre.com/currencies/ARS`)
                .then(function (data) {
                  var moneySymbol = data.data.symbol;
                  product.price.currency = moneySymbol;
                  res.send(product)
                })
            })
        })
    })
})

module.exports = router;