var prop = [];
// đẩy mảng product vào local JSON là định dạng giúp lưu trữ các thông tin có cấu trúc và nó chủ yếu được dùng để truyền tải dữ liệu giữa server và client.
function Save() {

}
//lấy sản phẩm  
function load() {
    prop = JSON.parse(localStorage.getItem('listProduct'));
}
//xuất sản phẩm ra html
if (localStorage.getItem("listProduct") != null) {
    load();
}
var Sumproduct = function() {
    var sum = 0;
    for (i = 0; i < prop.length; i++) {
        if (sum) {
            sum++;
        } else {
            sum = 1;
        }
        document.getElementById("count_product").innerHTML = sum;
    }
}
Sumproduct();
var productAdmin = function() {
    var listProduct1 = "";
    for (var i in prop) {
        var data = JSON.parse(JSON.stringify(prop[i]))
        var listProduct1 = '<tr>';
        listProduct1 += '<td>' + data.id + '</td>';
        listProduct1 += '<td>' + data.name + '</td>';
        listProduct1 += '<td><img src="img/' + data.img + '" alt"" style="width:60px;"></td>';
        listProduct1 += '<td>' + data.price + '</td>';
        listProduct1 += '<td><button onclick="updateProduct(' + i + ')" class="btn btn-outline-danger" data-toggle="modal" data-target="#updateProduct"><i class="fas fa-cogs"></i></button>';
        listProduct1 += '<button  onclick="xoaDuLieu(' + i + ')"  class="btn ml-1 btn-outline-warning" > <i class="fas fa-trash"></i></button></td>';
        listProduct1 += '</tr>';
        document.getElementById("product-admin").innerHTML += listProduct1;
    }
}

productAdmin();
var addProduct = function() {
    var Nprop = {
        // id: "sp" + parseInt(prop.length + 1),
        // cái đó là lấy id của thằng cuối cái array.at(-1) là lấy thằng cuối ra rồi .id để lấy id split dùng để cắt chuỗi SP5 thì thành ['SP'] và ['5'] mình chỉ cần phần ['5'] rồi cộng thêm 1 cộng chuỗi SP phía trước nữa là ra ID mới
        id: 'sp' + (Number(prop.at(-1).id.split('sp')[1]) + 1),
        name: document.getElementById("name").value,
        img: document.getElementById("img").value,
        price: document.getElementById("price").value
    }
    prop.push(Nprop);
    localStorage.setItem('listProduct', JSON.stringify(prop));
    // stringify là chuyển một objct sang json

    window.location.reload();
    alert("Thêm sản phẩm thành công");

}

// sửa sản phẩm

var updateProduct = function(i) {

    var k = prop[i];
    document.getElementById("idd").value = k.id;
    document.getElementById("named").value = k.name;
    document.getElementById("imgd").value = k.img;
    document.getElementById("priced").value = k.price;
    // document.getElementById("idd").setAttribute("disabled", "disabled");
    document.getElementById("submitUpdate").innerHTML = '<button class= "btn btn-danger mt-3" onclick= "submitUpdate(' + i + ')"> Đồng ý </button>';

}
var submitUpdate = function(i) {
    var result = confirm("bạn muốn cập nhật không");
    if (result) {
        var k = prop[i];
        k.id = document.getElementById("idd").value;
        k.name = document.getElementById("named").value;
        k.img = document.getElementById("imgd").value;
        k.price = document.getElementById("priced").value;
        // document.getElementById("idd").setAttribute("disabled", "disabled");
        localStorage.setItem('listProduct', JSON.stringify(prop));
        var result = alert("cập nhật thành công");

    }
}
var xoaDuLieu = function(i) {
    var result = confirm("Bạn có muốn xóa sản phẩm này ?");
    if (result) {
        prop.splice(i, 1);
        localStorage.setItem('listProduct', JSON.stringify(prop));
        window.location.reload();
        alert("xóa thành công");
    }
}