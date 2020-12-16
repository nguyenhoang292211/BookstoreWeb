



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
        alert("lỗi load type");
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

        getTypeProductWithCate(item.ID, index);
    });

}

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
