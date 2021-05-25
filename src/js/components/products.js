const catalogGoodsList = document.querySelector('.catalog__goods-list')
const catalogMore  = document.querySelector('.catalog__more')
const prodModal  = document.querySelector('[data-graph-target="prod-modal"] .modal-content')

let prodQuantity = 5
let dataLength = null

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

if (catalogGoodsList) {
  const loadProducts = (quantity = 5) => {
    fetch('../data/data.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        dataLength = data.length;

        catalogGoodsList.innerHTML = ''

        for (let i = 0; i < dataLength; i++) {
          if (i < quantity) {
            let item = data[i]
            console.log(item);

            catalogGoodsList.innerHTML += `
              <li class="catalog__googs-item">
              <article class="product">
                <div class="product__img">
                  <img src="${item.mainImage}" alt="${item.title}">

                  <div class="product__btns">
                    <button class="btn-reset product__btn" data-graph-path="prod-modal" data-id="${item.id}" aria-label="Показать информацию о товаре">
                      <svg>
                        <use xlink:href="img/sprite.svg#show"></use>
                      </svg>
                    </button>

                    <button class="btn-reset product__btn" aria-label="Добавить товар в корзину">
                      <svg>
                        <use xlink:href="img/sprite.svg#cart"></use>
                      </svg>
                    </button>
                  </div>
                </div>

                <h4 class="product__title">${item.title}</h4>
                <span class="product__price">${normalPrice(item.price)} р</span>
              </article>
            </li>
            `
          }
        }
      })
      .then(() => {
        const productTitle  = document.querySelectorAll('.product__title')

        productTitle.forEach(el => {
          $clamp(el, {clamp: '25px'});
        })

        const modal = new GraphModal({
          isOpen: (modal) => {
            const openBtnId = modal.previousActiveElement.dataset.id;

            loadModalData(openBtnId)
          },
        })
      })
  }

  loadProducts(prodQuantity)

  const loadModalData = (id = 1) => {
    fetch('../data/data.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // prodModal.innerHTML = ''

        for (let dataItem of data) {
          if (dataItem.id == id) {
            console.log(dataItem);
          }
        }
      })

  }

  catalogMore.addEventListener('click', (e) => {
    prodQuantity = prodQuantity + 3
    loadProducts(prodQuantity)

    if (prodQuantity >= dataLength) {
      catalogMore.style.display = 'none'
    } else {
      catalogMore.style.display = 'block'
    }
  })
}

