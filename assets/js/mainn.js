(function(){
    if(!browserSupport){
        return; 
    }

    var test_request = indexedDB.open('test', 1);

    test_request.onupgradeneeded = function(e){
        test_store = e.target.result;
        
        if(!test_store.objectStoreNames.contains('test_product')){
            var for_test_ind = test_store.createObjectStore('test_product', {keyPath: 'id', autoIncrement: true});
        }
    }

    test_request.onsuccess = function(e){
        test_DB = e.target.result;
        var edit_btn = document.getElementById('edit_btn');
        var purchase_btn = document.getElementById('purchase_btn');
        var delete_btn = document.getElementById('delete_btn');
        var add = document.getElementById('add');
        var update = document.getElementById('update');
        var display_all = document.getElementById('displayAll');

        edit_btn.addEventListener('click', fetch_for_edit);
        purchase_btn.addEventListener('click',Item_added);
        delete_btn.addEventListener('click', deleteData);
        add.addEventListener('click', addData);
        update.addEventListener('click', updateData);
        display_all.addEventListener('click', displayAll);
    showResults();


    }

    
})();


function Item_added() {
        alert("Product added to cart!");
    }

function browserSupport(){
    return ('indexedDB' in window);
}

function fetch_for_edit(id){
    var itemName = document.getElementById('editName');
    var itemDesc = document.getElementById('editDesc');
    var itemId = document.getElementById('editId');

    var test_transaction = test_DB.transaction(['test_product'], 'readwrite');
    var test_store = test_transaction.objectStore('test_product');

    var test_request_fetch = test_store.get(Number(id));

    test_request_fetch.onsuccess = function(e){
        var result = e.target.result;
        itemName.value = result.name;
        itemDesc.value = result.desc;
        itemId.value = result.id;
    }
}

function deleteData(id){
    var test_transaction = test_DB.transaction(['test_product'], 'readwrite');
    var test_store = test_transaction.objectStore('test_product');

    var test_request = test_store.delete(Number(id));

    test_request.onsuccess = function(e){
        console.log("SUCCESS");
        displayAll();
    }
}

function addData(){
    var itemName = document.getElementById('addName').value;
    var itemDesc = document.getElementById('addDesc').value;

    var test_transaction = test_DB.transaction(['test_product'], 'readwrite');
    var test_store = test_transaction.objectStore('test_product');

    var TestProduct = {
        image: '0',
        name: itemName,
        desc: itemDesc
    }


    var test_request_add = test_store.add(TestProduct);

    
    test_request_add.onsuccess = function(e){
        displayAll();
        console.log('SUCCESS');
    }

    test_request_add.onerror = function(e){
        console.log('DATA INSERTION FAILED');
    }
}

function updateData(){
    var itemName = document.getElementById('editName').value;
    var itemDesc = document.getElementById('editDesc').value;
    var itemId = document.getElementById('editId').value;

    var test_transaction = test_DB.transaction(['test_product'], 'readwrite');
    var test_store = test_transaction.objectStore('test_product');

    var TestProduct = {
        id: Number(itemId),
        image: '0',
        name: itemName,
        desc: itemDesc
    }

    var test_request = test_store.put(TestProduct);

    test_request.onsuccess = function(e){
        console.log("SUCCESS");
        displayAll();
    }
}

function displayAll(){
    var test_transaction = test_DB.transaction(['test_product'], 'readwrite');
    var test_store = test_transaction.objectStore('test_product');
    var test_cursor = test_store.openCursor();
    removeProductsFromView();

    test_cursor.onsuccess = function(e){
        var cursor_result = e.target.result;
        var q = "";
        

        if(cursor_result){
            q+='<img src="./assets/images/meds.jpeg" alt=""><div class="sample-product-right">';
            for(var result in cursor_result.value){
                if(result == 'id'){
                    q+='<span onclick="fetch_for_edit('+cursor_result.value[result]+')" class="edit-products" id="edit_btn"><i class="fa fa-edit"></i> Edit</span><span onclick="deleteData('+cursor_result.value[result]+')"class="delete-products" id="delete_btn"><i class="fa fa-trash"></i> Delete</span>';
                }
                if(result == 'name'){
                    q+='<h4>'+cursor_result.value[result]+'</h4>';
                }
                if(result == 'desc'){
                    q+='<p>'+cursor_result.value[result]+'</p>';
                }

            }
            q+='</div>';

            cursor_result.continue();

            var newElements = document.createElement('div');
            newElements.className = "sample-product";
            newElements.innerHTML = q;
            document.getElementById('sample_prod_wrpr').appendChild(newElements);
        }

        

    }

    test_cursor.onerror = function(e){
        console.log("DATA FEFTCHING FAILED");
    }
}

function openForm(){
    var target = document.getElementsByClassName('new-product-add-form')[0];

    if(target.style.display == "none"){
        target.style.display = "block";
    }else{
        target.style.display = "none";
    }
}

function removeProductsFromView(){
    var sampleProds = document.getElementsByClassName('sample-product');

    for(var i = 0; i < sampleProds.length; ++i){
        sampleProds[i].style.display = "none";
    }
}

function showResults(){
    var current_link = window.location.href;
    var url = new URL(current_link);
    var query = url.searchParams.get('q');

    var test_transaction = test_DB.transaction(['test_product'], 'readwrite');
    var test_store = test_transaction.objectStore('test_product');
    var test_cursor = test_store.openCursor();
    removeProductsFromView();

    console.log(query);

    test_cursor.onsuccess = function(e){
        var cursor_result = e.target.result;
        var q = "";
        

        if(cursor_result){
            if(cursor_result.value.name.indexOf(query) != -1){

                q+='<img src="./assets/images/meds.jpeg" alt=""><div class="sample-product-right">';
                for(var result in cursor_result.value){
                        if(result == 'id'){
                            q+='<span onclick="fetch_for_edit('+cursor_result.value[result]+')" class="edit-products" id="edit_btn"><i class="fa fa-edit"></i> Edit</span><span onclick="deleteData('+cursor_result.value[result]+')"class="delete-products" id="delete_btn"><i class="fa fa-trash"></i> Delete</span>';
                        }
                        if(result == 'name'){
                            q+='<h4>'+cursor_result.value[result]+'</h4>';
                        }
                        if(result == 'desc'){
                            q+='<p>'+cursor_result.value[result]+'</p>';
                        }
                }
                q+='</div>';
            }


            console.log();

            cursor_result.continue();

            var newElements = document.createElement('div');
            newElements.className = "sample-product";
            newElements.innerHTML = q;
            document.getElementById('sample_prod_wrpr').appendChild(newElements);
        }
    }

}