//detail Product Page
$(document).ready(function() {
  var productId = window.location.search.split("=")[1];

  $.get(
    `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${productId}`,
    function(productData, status) {
      var dp_largePreviewImage = document.getElementById("dp_largePreview");
      dp_largePreviewImage.src = productData.preview;

      var dp_productName = document.getElementById("dp_productName");
      dp_productName.innerText = productData.name;
      var dp_productBrand = document.getElementById("dp_productBrand");
      dp_productBrand.innerText = productData.brand;
      var dp_productPrice = document.getElementById("dp_productPrice");
      dp_productPrice.innerText = productData.price;
      var dp_productDescription = document.getElementById(
        "dp_productDescription"
      );
      dp_productDescription.innerText = productData.description;
      var dp_previewImagesWrapper = document.getElementById("dp_previewImgs");
      var dp_productImages = productData.photos;
      var dp_borderedImageIndex = 0;

      function onImagePreviewClickHandler(e) {
        dp_largePreviewImage.src = e.target.src;
        var dp_previewImagesCollection = document.querySelectorAll(
          ".dp_preview-images img"
        );
        //1. Remove border from the previous element
        dp_previewImagesCollection[dp_borderedImageIndex].classList.remove(
          "active"
        );
        //2. Add the border to the current element
        e.target.classList.add("active");
        dp_borderedImageIndex = e.target.id;
      }

      for (var counter = 0; counter < dp_productImages.length; counter++) {
        var image = document.createElement("img");
        image.src = dp_productImages[counter];
        image.id = counter;

        if (counter === 0) {
          // First image
          image.classList.add("active");
        }

        image.addEventListener("click", onImagePreviewClickHandler);

        dp_previewImagesWrapper.appendChild(image);
      }

      var cartCount = document.getElementById("cartCount");
      var cartCounter = localStorage.getItem("cartCount");
      cartCount.innerText = cartCounter;
      // var product_arr = JSON.parse(localStorage.getItem("array"));
      // console.log(product_arr);
      function cartCountChangeHandler() {
        cartCounter++;
        cartCount.innerText = cartCounter;
        localStorage.setItem("cartCount", cartCounter);
        if (cartCounter === 1) {
          var product_arr = [];
          // console.log("working");
          var product = {};
          product.name = productData.name;
          product.img = dp_productImages[0];
          product.qty = 1;
          product.price = productData.price;
          // console.log(product);
          product_arr.push(product);
          console.log(product_arr);
          localStorage.setItem("array", JSON.stringify(product_arr));
        } else {
          var product_arr = JSON.parse(localStorage.getItem("array"));
          var flag = false;
          for (var counter = 0; counter < product_arr.length; counter++) {
            var currentProduct = product_arr[counter];
            if (currentProduct.name == productData.name) {
              flag = true;
              currentProduct.qty++;
              localStorage.setItem("array", JSON.stringify(product_arr));
              console.log(product_arr);
            } 
          }
          if(flag==false) {
            var product = {};
            product.name = productData.name;
            product.img = dp_productImages[0];
            product.qty = 1;
            product.price = productData.price;
            product_arr.push(product);
            localStorage.setItem("array", JSON.stringify(product_arr));
            console.log(product_arr);
          }
        }
      }
      var dp_atc_btn = document.getElementById("dp_atc_btn");
      dp_atc_btn.addEventListener("click", cartCountChangeHandler);
    }
  );
});
