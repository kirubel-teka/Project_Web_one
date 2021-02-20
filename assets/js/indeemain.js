var current_target = 0;
var my_image = './../images/3.jpg';

function mdl(target, img = -1, evt = -1, aditm = 0){
    var element = document.getElementsByClassName(target)[0];
    if(element.style.display == "none"){
        element.style.display = "flex";
        document.getElementsByClassName('products-modal')[0].style.display = "block";
        if((img != -1) && (evt != -1)){
            var cur_img = evt.currentTarget.previousElementSibling.src;
            var cur_name = evt.currentTarget.innerHTML;
            document.getElementById('products_editor_left').src = cur_img;
            document.getElementById('sample_product_edit').value = cur_name;
            current_target = evt.currentTarget;
        }
    }else{
        element.style.display = "none";
        document.getElementsByClassName('products-modal')[0].style.display = "none";
    }
    
    if(evt != -1){
        current_target = evt.currentTarget;
    }

    if(aditm != 0){
        // document.getElementById('product-top-left-image').src = './../images/3.jpg';
    }
}

function test_open(){
    var element = document.getElementsByClassName('contact-content-user')[0];

    if(element.style.display == "none"){
        element.style.display = "block";
    }else{
        element.style.display = "none";
    }
}

function remove_element(){
    current_target.parentElement.remove();
    mdl('products-remove', -1, -1);
}


function add_new_items(){
    var mydiv = document.createElement('div');
    mydiv.className="sample-products sample-prodcut-sp";
    var elements = '<img src="'+my_image+'" alt=""><p class="product-name-main" onclick="mdl('+"'products-edit', 1, event"+')">'+document.getElementById('add_item_name').value+'</p><i class="fa fa-trash" onclick="mdl('+"'products-remove', -1, event"+')"></i>';
    mydiv.innerHTML = elements;
    document.getElementById('sample_prod').appendChild(mydiv);
    mdl('products-add');
}

function load_image(evt, targ){
    my_image = URL.createObjectURL(evt.target.files[0]);
    document.getElementById(targ).src = my_image;
}

function filter_results(){
    var input_values = document.getElementById('product_search_filter').value.toUpperCase();
    var p_tag = document.getElementsByClassName('product-name-main');
    for(var i =0; i< p_tag.length; ++i){
        if(p_tag[i].innerHTML.toUpperCase().indexOf(input_values) > -1){
            p_tag[i].parentElement.style.display = "block";
        }else{
            p_tag[i].parentElement.style.display = "none";
        }
    }
}

function save_edit_changes(){
    my_image = document.getElementById('products_editor_left').src;
    current_target.innerHTML = document.getElementById('sample_product_edit').value;
    current_target.previousElementSibling.src = my_image;
    mdl('products-edit', -1, -1);
}

function test_dom(element, cont){
    cont.parentNode.insertBefore(element, cont.nextSibling);
}

var myTestApp = new Vue({
    el: "#test_app_wrapper",
    data: {
        test_models: ['', '', '', '0', '0', '0'],
        test_error1: '0',
        test_error2: '0',
        test_error3: '0',
        test_file_img: '',
        test_models2: ['', '', ''],
        test_models3: ['', '', ''],
        test_product_info: '',
        test_itm_mdfy: '',
        test_filter_input: '',
    },
    computed: {},
    methods: {
        test_input_limit: function(input){
            if((input == 0) && (this.test_models[1].length > 25))
                this.test_models[1] = this.test_models[1].substr(0, 25);
            else if((input == 1) && (this.test_models[2].length > 25))
                this.test_models[2] = this.test_models[2].substr(0, 25);
        },
        test_checker: function(){
            var test_regex_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            var test_flag = false;
            var test_email_input = document.getElementsByClassName('email')[0];

            if(this.test_models[0].length > 0 ){
                if(this.test_models[0].match(test_regex_email) != null){
                    test_flag=true;
                    this.test_error1 = "";
                    test_email_input.style.border = "1px solid #a8a8a8";
                }else{
                    myTestApp.test_error1 = "Invalid email";
                    test_email_input.style.border = "1px solid #ff3838";
                }
            }else{
                myTestApp.test_error1 = "Invalid input";
                test_email_input.style.border = "1px solid #ff3838";
            }
        },
        test_login_check: function(){
            var test_regex_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            var test_email_input = document.getElementsByClassName('email')[0];

            if(this.test_models[0].length > 0 ){
                if(this.test_models[0].match(test_regex_email) != null){
                    test_email_input.style.border = "1px solid #a8a8a8";
                    this.test_error1 = "";
                }else{
                    myTestApp.test_error1 = "Invalid email";
                    test_email_input.style.border = "1px solid #ff3838";
                }
            }else{
                myTestApp.test_error1 = "Invalid input";
                test_email_input.style.border = "1px solid #ff3838";
            }
        },
        test_password: function(){
            var test_password_input = document.getElementsByClassName('password')[0];
            if(this.test_models[1].length < 6){
                this.test_error2 = "Password must be 6-25 characters.";
                test_password_input.style.border = "1px solid #ff3838";
            }else{
                this.test_error2 = "";
                test_password_input.style.border = "1px solid #a8a8a8";
            }
        },
        test_confirm_password: function(){
            var test_confirm_password_input = document.getElementsByClassName('confirm-password')[0];
            if(this.test_models[2] != this.test_models[1]){
                this.test_error3 = "Passwords don't match.";
                test_confirm_password_input.style.border = "1px solid #ff3838";
            }else{
                this.test_error3 = "";
                test_confirm_password_input.style.border = "1px solid #a8a8a8";
            }
        },
        submit_form: function(){
            this.test_checker();
            this.test_password();
            this.test_confirm_password();
            var phemch = document.getElementById("phem");
            if((this.test_error1 == "") && (this.test_error2 == "") && (this.test_error3 == "")){
                document.getElementById("test_signup_form").submit();
            }
        },
        submit_login_form: function(){
            this.test_login_check();
            this.test_password();
            if((this.test_error1 == "") && (this.test_error2 == "")){
                document.getElementById("test_login_form").submit();
            } 
        },
    }
    
})
