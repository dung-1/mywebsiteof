var shoppingCart = (function() {
    cart = [];
    // Constructor
    function Item(id, name, img, price, count) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.count = count;
    }
    // Save cart
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    // Load cart
    function loadCart() {
        cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    if (localStorage.getItem("shoppingCart") != null) {
        loadCart();
    }

    var obj = {};

    // Thêm sản phẩm
    obj.addItemToCart = function(id, name, img, price, count) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(id, name, img, price, count);
        cart.push(item);
        saveCart();
    }
    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // xóa sản phẩm theo icon minus
    obj.removeItemFromCart = function(id) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }


    // xóa sp  trong giỏ hàng
    obj.removeItemFromCartAll = function(id) {
            for (var item in cart) {
                if (cart[item].id === id) {
                    var result = confirm("Bạn có muốn xóa sản phẩm này ?");
                    if (result) {
                        cart.splice(item, 1);
                    }
                    break;
                }
            }
            saveCart();
        }
        // tính tổng tiền
    obj.totalCount = function() {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }
    obj.total = function() {
        var totalCart = 0;
        for (var Item in cart) {
            totalCart += cart[item].price * cart[item].count;

        }
        return Number(totalCart.toFixed(0));
    }
    obj.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(0));

    }
    obj.listCart = function() {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(0);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    return obj;
})();

var pro = [];

function saveproduct() {
    localStorage.setItem('shopping', JSON.stringify(pro));
}
// Load cart
function loadproduct() {
    pro = JSON.parse(localStorage.getItem('shopping'));
}

// Add item
$('.add-to-cart').click(function(event) {
    event.preventDefault();
    var id = $(this).data('id');
    var name = $(this).data('name');
    var img = $(this).data('img');
    var price = Number($(this).data('price')).toFixed(0);
    shoppingCart.addItemToCart(id, name, img, price, 1);
    displayCart();

});
// dịnh dạng html
function displayCart() {
    var number = 1;
    var cartArray = shoppingCart.listCart();
    var output = "";
    var outputt = "";
    for (var i in cartArray) {
        output += "<tr class='text-center fs-3' >  " +

            "<td >" + number++ + "</td>" +
            "<td ><img src='img/" + cartArray[i].img + "' style='width:75px'></td>" +
            "<td  class='fs-5    name-title'>" + cartArray[i].name + "</td>" +
            "<td class='fs-4 '>" + cartArray[i].price + "₫</td>" +

            "<td id='inputt''><button class='minus-item text-dark cart-count input-group-addon btn btn-outline-primary' style='padding:0 10px; font-size:15px;' data-id='" + cartArray[i].id + "' data-name=" + cartArray[i].name + ">-</button>" +
            "<input type='number' style='border-radius: inherit;width:30px;height:30px;font-size:15px; border: .5px solid black;' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
            "<button class='plus-item cart-count btn bg-primary text-dark btn-outline-primary input-group-addon' style='padding:0 10px; font-size:15px;margin-right:1px;'  data-id='" + cartArray[i].id + "' data-name=" + cartArray[i].name + ">+</button>" +
            "</td>" +
            "<td>" + cartArray[i].total + "₫</td>" +
            "<td><button class='delete-item btn btn-outline-danger ' data-id='" + cartArray[i].id + "' data-name=" + cartArray[i].name + "><i class='fas fa-trash fs-4'></i></button></td>" +
            "</tr>";
    }
    for (var i in cartArray) {
        outputt += "<tr class=' fs-6' style='width:1%;'>  " +

            "<td  class=' name-title'>" + cartArray[i].name + " x " + "(" + cartArray[i].count + ")" + "</td>" +

            "</td>" +
            "<td>" + cartArray[i].total + "₫</td>" +

            "</tr>";
    }
    $('.show-cart-1').html(output);
    $('.show-cart-2').html(outputt);

    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}


function increaseValue(button, limit) {
    const numberInput = button.parentElement.querySelector('.number');
    var value = parseInt(numberInput.innerHTML, 10);
    if (isNaN(value)) value = 0;
    if (limit && value >= limit) return;
    numberInput.innerHTML = value + 1;
}
// -1
$('.show-cart-1').on("click", ".minus-item", function(event) {
        var id = $(this).data('id')
        shoppingCart.removeItemFromCart(id);
        displayCart();
    })
    // +1
$('.show-cart-1').on("click", ".plus-item", function(event) {
        var id = $(this).data('id')
        shoppingCart.addItemToCart(id);
        displayCart();
    })
    // xóa
$('.show-cart-1').on("click", ".delete-item", function(event) {
    var id = $(this).data('id')
    shoppingCart.removeItemFromCartAll(id);

    displayCart();
})
$('.show-cart-2').on("click", ".delete-item", function(event) {
    var id = $(this).data('id')
    shoppingCart.removeItemFromCartAll(id);

    displayCart();
})
$('.show-cart-1').on("change", ".item-count", function(event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();