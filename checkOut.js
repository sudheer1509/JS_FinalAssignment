$(document).ready(function() {
  var product_arr = JSON.parse(localStorage.getItem("array"));
  console.log(product_arr);
  var itemCount = document.getElementById("item-count");
  itemCount.innerText = product_arr.length;
  console.log(itemCount.innerText);
  var cardList = document.getElementById(
    "card-list"
  );
  var totalValue = 0;
  for (var i = 0; i < product_arr.length; i++) {
    var currentProduct = product_arr[i];
    var pCard = document.createElement("div");
    pCard.classList.add("checkout-card");
    var div1 = document.createElement("div");
    div1.classList.add("div1");
    var div2 = document.createElement("div");
    div2.classList.add("div2");
    var productImg = document.createElement("img");
    productImg.src = currentProduct.img;
    productImg.classList.add("checkout-product-img");
    var productName = document.createElement("h4");
    productName.innerText = currentProduct.name;
    var productQty = document.createElement("p");
    productQty.innerText = parseInt(currentProduct.qty);
    var amountLabel = document.createElement("span");
    amountLabel.innerHTML = "Amount: Rs ";
    var productPrice = currentProduct.price;
    var total = document.createElement("span");
    total.innerText = productPrice * productQty.innerText;
    totalValue+=parseInt(total.innerText);
    var totalAmountDiv = document.createElement("p");
    totalAmountDiv.append(amountLabel,total)
    div1.appendChild(productImg);
    div2.append(productName, productQty, totalAmountDiv);
    pCard.append(div1, div2);
    cardList.append(pCard);
  }
  document.getElementById("total-amount").innerText = totalValue;
});
