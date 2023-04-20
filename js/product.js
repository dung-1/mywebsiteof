var prop = [];
var pro = [];

function saveproduct() {
    sessionStorage.setItem('shopping', JSON.stringify(pro));
}
// đẩy mảng product vào local
function Save() {
    localStorage.setItem('listProduct', JSON.stringify(prop))
}

//lấy sản phẩm 
function load() {
    prop = JSON.parse(localStorage.getItem('listProduct'));
}
//xuất sản phẩm ra html
if (localStorage.getItem("listProduct") != null) {
    load();
}
if (localStorage.getItem("listProduct") == null) {
    Save();
}
var listLocal = function() {
    var listproduct = "";
    for (var i in prop) {
        var data = JSON.parse(JSON.stringify(prop[i]))
        var listproduct = '<div class="col-lg-3 col-md-6 col-sm-6 col-6 mt-3">';
        listproduct += '<div class="card product p-2" styte="width:auto; background: #f5eee8;   border-radius: 18px;">';
        listproduct += '<a ><img  class="proo card-img-top" data-id="' + data.id + '" data-name="' + data.name + '" data-img="' + data.img + '" data-price="' + data.price + '" src="img/' + data.img + '" alt="..."></a>';
        listproduct += '<div class="card-title product-title text-center h5" ><a href="#"  class="proo" data-id="' + data.id + '" data-name="' + data.name + '" data-img="' + data.img + '" data-price="' + data.price + '">' + data.name + '</a></div>';
        listproduct += '<div class="price text-center h6">' + data.price + '₫</div>';
        listproduct += '<span  class="text-center add-to-cart  btn btn-outline-warning" data-id="' + data.id + '" data-name="' + data.name + '" data-img="' + data.img + '" data-price="' + data.price + '">';
        listproduct += '<a>';
        listproduct += '<i class="fas fa-cart-plus " onclick="tks()"></i>';
        listproduct += '</a>';
        listproduct += '</span>';
        listproduct += '</div>';
        listproduct += '</div>';
        document.getElementById("banchay").innerHTML += listproduct;
    }
    Save();

}
listLocal();