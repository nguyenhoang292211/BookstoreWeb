var redirUrl = window.location.href;

var myParam = redirUrl.split('type=')[1] ? redirUrl.split('type=')[1] : '0';
alert(myParam);

this.getProductWithtype(parseInt(myParam));
this.getCategory();

function loadDataProduct(products) {
    $('#main_container_pro').empty();
    $.each(products, function (index, item) {
        strHTML = $(`<div class="col-md-3 mt-3 product-men women_two shop-gd">
                                    <div class="product-googles-info googles">
                                        <div class="men-pro-item">
                                            <div class="men-thumb-item">
                                                <img src="../../../Images/Frontend/Home/product-3.jpg" class="img-fluid" alt="">
                                                <div class="men-cart-pro">
                                                    <div class="inner-men-cart-pro">
                                                        <a class="id-PRO" style="display:block;">`+ item.ID + `</>
                                                        <a style="color:white;"  class="link-product-add-cart">Quick View</a>
                                                    </div>
                                                </div>
                                                <span class="product-new-top">New</span>
                                            </div>
                                            <div class="item-info-product">
                                                <div class="info-product-price">
                                                    <div class="grid_meta">
                                                        <div class="product_price">
                                                            <h4>
                                                                <a href="single.html">`+ item.Name + `</a>
                                                            </h4>
                                                            <div class="grid-price mt-2">
                                                                <span class="money ">`+ item.Price + `</span>
                                                            </div>
                                                        </div>
                                                        <ul class="stars">
                                                            <li>
                                                                <a href="#">
                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="googles single-item hvr-outline-out">
                                                        <form action="#" method="post">
                                                            <label class="id-PRO">`+ item.ID + `</label>
                                                            <input type="hidden" name="cmd" value="_cart">
                                                            <input type="hidden" name="add" value="1">
                                                            <input type="hidden" name="googles_item" value="Farenheit">
                                                            <input type="hidden" name="amount" value="575.00">
                                                            <button type="submit" class="googles-cart pgoogles-cart">
                                                                <i class="fas fa-cart-plus"></i>
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
        $('#main_container_pro').append(strHTML);
    });
    var buttonaddtocart = document.getElementsByClassName("googles-cart");
    for (var i = 0; i < buttonaddtocart.length; i++) {
        var add = buttonaddtocart[i];
        add.onclick = function (event) {
            var button = event.target;
            var product = button.parentElement.parentElement;
            var idpro = product.getElementsByClassName("id-PRO")[0].innerHTML;
            var idcus = 3;
            var idshop = 1;
            alert(idpro);
            //THÊM VÀO GIỎ HÀNG
            HandleCart(idcus, idpro, idshop);
            return false;
        };
    }

        var viewDetail = document.getElementsByClassName("inner-men-cart-pro");
        for (var i = 0; i < viewDetail.length; i++) {
            var button = viewDetail[i];
            button.onclick = function (event) {
                var t = event.target;
                // Store
              //  sessionStorage.setItem("id_detail_pro", t.parentElement.getElementsByClassName("id-PRO")[0].innerText);
                // idproduct.innerText = (t.parentElement.getElementsByClassName("id-PRO")[0]).innerText;
                window.location.href = "DetailProductPage.html?ID=" + t.parentElement.getElementsByClassName("id-PRO")[0].innerText;
            };
        }

}

function HandleCart(idcus, idproduct, idshop) {

        var cart = {
            IDCustomer: idcus,
            IDproduct: idproduct,
            IDshop: idshop,
            // Quantity: quantity
        };
        $.ajax({
            url: "/api/product/addtocart",
            method: "POST",
            data: JSON.stringify(cart),
            contentType: "application/json",
            dataType: "json",
            traditional: true
        }).done(function (res) {
            if (res == true) {
                alert("Sản phẩm đã thêm vào giỏ!");
                // $(location).attr('href', '/Views/Pages/Login/signIn.html');
            }
            else {
                alert("Thêm vào giỏ hàng không thành công!")
            }
        }).fail(function (response) {
            alert("Hiện tại hệ thống đang gặp sự cố, vui lòng thử lại sau! Cảm ơn quý khách đã tin dùng sản phẩm của chúng tôi!");
        });

}

function getNameType(typeID,products) {
    var URL = "/api/product/getNameType/" + typeID;
    $.ajax({
        url: URL,
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' //Định nghĩa type data trả về.
        },
        dataType: "",
    }).done(function (nametype) {
        $('#label-title').html(nametype);
        loadDataProduct(products);
        }).fail(function () {
            alert("Không load được data");
    });
}

function getProductWithtype( typeID) {
    var URL = "/api/product/getproduct/" + typeID;
    $.ajax({
        url: URL,
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' //Định nghĩa type data trả về.
        },
        dataType: "json",
    }).done(function (products) {
        alert("Get done");
        
        getNameType(typeID,products);

    }).fail(function () {

    });
}


function getTypeProductWithCate(idCate, count) {
    var URL = "/api/Category/type/" + idCate;
    $.ajax({
        url: URL,
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' //Định nghĩa type data trả về.
        },
        dataType: "", //Kiểu dữ liệu truyền lên.
    }).done(function (products) {
        var ul = document.createElement("ul");
        $.each(products, function (index, item) {


            var li = document.createElement("li");
            li.setAttribute("class", "media-mini mt-3");

            var a = document.createElement("a");

            var text = document.createTextNode(item.Name);
            a.setAttribute("href", "ProductPage.html?type=" + item.ID);

            a.appendChild(text);
            li.appendChild(a);
            ul.appendChild(li);


        });
        var container = document.getElementsByClassName("col-md-4 media-list span4 text-left")[count];
        container.appendChild(ul);



    }).fail(function () {

    });
}


function loadCategory(listcategory) {
    self = this;
    $('#nav-category').empty();
    var container = document.getElementById("nav-category");
    $.each(listcategory, function (index, item) {


        var divcontaint = document.createElement("div");
        divcontaint.setAttribute("class", "col-md-4 media-list span4 text-left");


        var h5titleCate = document.createElement("h5");
        h5titleCate.setAttribute("class", "tittle-w3layouts-sub");
        var content = document.createTextNode(item.Name);

        h5titleCate.appendChild(content);

        divcontaint.appendChild(h5titleCate);

        container.appendChild(divcontaint);

        self.getTypeProductWithCate(item.ID, index);
    });

}

//Load category trên thanh narbar
function getCategory() {
    self = this;
    var URL = "";
    $.ajax({
        url: "/api/Category/type",
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' //Định nghĩa type data trả về.
        },
        dataType: "json", //Kiểu dữ liệu truyền lên.
    }).done(function (response) {
        self.loadCategory(response);
        self.gettheBestsaler();

    }).fail(function (response) {
        alert("Lỗi category");
    });
}