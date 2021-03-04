function searchFunction() {
    var input, filter, ul, li, span, i;
    input = document.getElementById('myinput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('con');
    li = ul.getElementsByClassName('col-md-3');

    for(i=0 ; i< li.length; i++){//li.length is the length of list(li)
        span = li[i].getElementsByTagName('span')[0];
        if(span.innerHTML.toUpperCase().indexOf(filter) > -1){//the occerence of the filter in a or each list
            li[i].style.display = "";//this used to only display the filtered list
            
        }

        else{
            li[i].style.display = 'none';//this used to not to  diplay other lists
        }
    }

    
}
