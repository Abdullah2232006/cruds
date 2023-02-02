// get total (done)
// create product (done)
// save data on local storage  (done)
// clear data after create (done)
// read (done)
// delete (done)
// delete all (done)
// count (done)
//  update (done )
// search 
// search by categoery
// search by title
// clean data


let title = document.getElementById("title") ; 
let taxes = document.getElementById("taxes") ; 
let ads = document.getElementById("ads") ; 
let discount = document.getElementById("discount") ; 
let price = document.getElementById("price") ; 
let total = document.getElementById("total") ; 
let count = document.getElementById("count") ; 
let categoery = document.getElementById("categoery") ; 
let create = document.getElementById("submit") ; 

let mood = "create" ;
let tmp ;

// console.log(title , taxes , ads , discount , price , total , count , categoery , create );

// get total 

function getTotal () {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ; 
        total.innerHTML = result  ;
        total.style.backgroundColor = "#040" ; 
    }else {
        total.innerHTML = ' ' ; 
        total.style.backgroundColor = "#a00d02" ; 
    }
}

// create product

let dataProduct ; 

if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
}else {
    dataProduct = [] ; 
}

// let dataProduct = [] ; 

create.onclick = function () {
    let newPro = {
        title:title.value.toLowerCase() , 
        price:price.value,
        taxes:taxes.value , 
        ads:ads.value , 
        discount:discount.value , 
        total:total.innerHTML , 
        count:count.value , 
        categoery:categoery.value.toLowerCase() , 
    }


    // count

    if (mood === "create") {
        if (newPro.count > 1) {
            for (let i = 0  ; i < newPro.count ; i++) {
                dataProduct.push(newPro)  ;
            }
        }else {
            dataProduct.push(newPro)  ;
        }
    }else {
        dataProduct [tmp] = newPro ; 
        mood = 'create' ; 
        create.innerHTML = 'create' ;
        count.style.display = 'block' ;
    }

    // save in local storage 

    localStorage.setItem( "product" , JSON.stringify(dataProduct))
    console.log(dataProduct);

    clearData () ; 
    showData () ; 

}

// clear data after create 

function clearData () {
    title.value = '' ;
    price.value = '' ;
    ads.value = '' ;
    discount.value = '' ;
    taxes.value = '' ;
    total.innerHTML = '' ;
    count.value = '' ;
    categoery.value = '' ;
}

// read 

function showData () {
    getTotal() ; 
    let table = '' ; 

    for (let i = 0 ; i < dataProduct.length ; i++) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].categoery}</td>
        <td><button onclick = "updateData(${i})" id="update">update</button></td>
        <td><button onclick = "deleteData (${i})" id="delete">delete</button></td>
      </tr>
        `;     
    }

    document.getElementById('tbody').innerHTML = table ; 

    // delete all btn 

    let deleteAllBtn = document.getElementById ("deleteAll") ; 

    if (dataProduct.length > 0) {
        deleteAllBtn.innerHTML = `
        <button onclick = " deleteAllFunction()" >delete all (${dataProduct.length})</button>
        `
    }else {
        deleteAllBtn.innerHTML = '' ; 
    }

}





showData () ;

// delete 

function deleteData (i) {
    dataProduct.splice(i , 1) ;
    localStorage.product = JSON.stringify(dataProduct) ; 
    showData () ;
}


// delete all 


function deleteAllFunction() {
    localStorage.clear () ;
    dataProduct.splice (0) ; 
    showData() ;
}

//  update 

function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    ads.value = dataProduct[i].ads;
    taxes.value = dataProduct[i].taxes;
    discount.value = dataProduct[i].discount;
    getTotal() ;
    count.style.display = "none"  ;
    create.innerHTML = "update"  ;
    categoery.value = dataProduct[i].categoery;

    mood = "update" ; 
    let tmp = i ;
    scroll({
        top:0 ,
        behavior:"smooth" , 
    })
}


// search 

let searchMood = 'title' ; 

function getSearchMood (id) {

    let search = document.getElementById ('searchInput') ; 

    if (id == 'searchTitle') {
        searchMood = 'title' ; 
        search.placeholder = 'Search by title' ; 
    }else {
        searchMood = 'catgoery' ; 
        search.placeholder = 'Search by catgoery' ; 
    }

    search.focus()
    search.value = '' ; 
    showData() ; 
}


// search data function

function searchData (value) {

let table = '' ; 

    if(searchMood=='title') {

        for (let i = 0 ; i < dataProduct.length ; i++) {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].categoery}</td>
                <td><button onclick = "updateData(${i})" id="update">update</button></td>
                <td><button onclick = "deleteData (${i})" id="delete">delete</button></td>
              </tr>
                `; 
            }
        }

    }else {

        for (let i = 0 ; i < dataProduct.length ; i++) {
            if (dataProduct[i].categoery.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].categoery}</td>
                <td><button onclick = "updateData(${i})" id="update">update</button></td>
                <td><button onclick = "deleteData (${i})" id="delete">delete</button></td>
              </tr>
                `; 
            }
        }

    }

    document.getElementById('tbody').innerHTML = table ; 

}