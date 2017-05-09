(function () {
  'use strict';

  window.X = function (response) {
    var createProductDOM = function(element, parent){
      var parentElement = document.querySelector(parent);
      var productItem = document.createElement('div');
      productItem.className = 'carousel-item';
      
      var productBox = document.createElement('div');
      productBox.className = 'box';

      productItem.appendChild(productBox);
      
      var productLink = document.createElement('a');
      productLink.setAttribute('target', '_blank');
      productLink.href = element.detailUrl;

      productBox.appendChild(productLink);
      
      var productImageBlock = document.createElement('div');
      productImageBlock.className = 'image';

      productLink.appendChild(productImageBlock);
      
      var productImage = document.createElement('img');
      productImage.src = element.imageName;

      productImageBlock.appendChild(productImage);
      
      var productInfo = document.createElement('div');
      productInfo.className = 'info';
      
      var productName = document.createElement('p');
      productName.className = 'name';
      productName.innerHTML = element.name.substr(0, 80) + ' ...';
      productInfo.appendChild(productName);
      
      if(element.oldPrice){
        var productOldPrice = document.createElement('p');
        productOldPrice.className = 'old-price';
        productOldPrice.innerHTML = 'De: <span>'+element.oldPrice+'</span>';
        productInfo.appendChild(productOldPrice);
      }
      
      var productPrice = document.createElement('p');
      productPrice.className = 'price';
      productPrice.innerHTML = 'Por: <strong>'+element.price+'</strong>';
      productInfo.appendChild(productPrice);
      
      if(element.productInfo.paymentConditions){
        var productConditions = document.createElement('p');
        productConditions.className = 'conditions';
        productConditions.innerHTML = element.productInfo.paymentConditions;
        var plots = parseFloat(productConditions.getElementsByTagName("strong")[1].innerHTML).toString().replace('.', ',');
        productConditions.getElementsByTagName("strong")[1].innerHTML = 'R$ '+plots;
        productInfo.appendChild(productConditions);
      }
      
      var productAddon = document.createElement('p');
      productAddon.className = 'addon';
      productAddon.innerHTML = 'sem juros';
      productInfo.appendChild(productAddon);
      
      productLink.appendChild(productInfo);
      
      parentElement.appendChild(productItem);
    };

    createProductDOM(response.data.reference.item, '.reference');
    response.data.recommendation.forEach(function (element, index) {
      createProductDOM(element, '.carousel-container');
    });

    var carousel = new Carousel('.carousel-container');
    carousel.init();
  };

})();


