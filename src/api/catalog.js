export default function createCatalogApi(http){
    return {
        async all(){
            let { data } = await http.get('products.php');
            return data;
        },
        async one(id){
            let {data}  = await http.get('product.php', {
                params: { id },
                errorAlert: { text: 'при получении цены товара' }
            });
            return data;
        },
        async rating(id){
            let { data } = await http.get('ratings.php', {
                params: { id },
                errorAlert: { text: 'при получении рейтинга товара' }
            });
            return data;
        },
        async mark(id, mark){
            let { data } = await http.put('ratings.php', { id, mark }, {
                errorAlert: { text: 'при оценке товара' }
            });
            return data;
        }
    }
}