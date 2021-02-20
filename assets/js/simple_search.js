var myTestApp = new Vue({
    el: "#test_app_wrapper",
    data: {
        test_search_result: '',
    },
    computed: {},
    methods: {
        test_search_results: function(){

            axios.get('./main/test_fetch.php', {
                params: {
                    condition: 3,
                    q,
                }
            })
            .then(function(resp){
                myTestApp.test_search_result = resp.data;
            })
        },
        
    },
    created: function(){
        this.test_search_results();
    }
    
})
