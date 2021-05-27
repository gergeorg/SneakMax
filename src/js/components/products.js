const catalogGoodsList = document.querySelector('.catalog__goods-list')
const catalogMore = document.querySelector('.catalog__more')
const prodModal = document.querySelector('[data-graph-target="prod-modal"] .modal-content')

const prodModalSlider = prodModal.querySelector('.modal-slider .swiper-wrapper')
const prodModalPreview = prodModal.querySelector('.modal-slider .modal-preview')
const prodModalInfo = prodModal.querySelector('.modal-info__wrapper')
const prodModalDescr = prodModal.querySelector('.modal-prod-descr')
const prodModalChars = prodModal.querySelector('.prod-characteristics')
const prodModalVideo = prodModal.querySelector('.prod-modal__video')

let prodQuantity = 5
let dataLength = null

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const prodSwiper = new Swiper('.modal-slider__container', {
  slidesPerView: 1,
  spaceBetween: 20,
});

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

            prodSwiper.update()
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

        prodModalInfo.innerHTML = ''
        prodModalPreview.innerHTML = ''
        prodModalDescr.innerHTML = ''
        prodModalChars.innerHTML = ''
        prodModalSlider.innerHTML = ''
        prodModalVideo.innerHTML = ''

        for (let dataItem of data) {
          if (dataItem.id == id) {
            console.log(dataItem);

            const slides = dataItem.gallery.map(image => {
              return `
              <div class="swiper-slide">
                <img class="modal-slider__image" src="${image}" alt="">
              </div>

              `
            })

            const preview = dataItem.gallery.map((image, idx) => {
              return `
                <div class="modal-preview__item" data-index="${idx}">
                  <img class="modal-preview__img" src="${image}" alt="">
                </div>
              `
            })

            const sizes = dataItem.sizes.map((size) => {
              return `
                <li class="modal-sizes__item">
                  <button class="modal-sizes__btn btn-reset">${size}</button>
                </li>
              `
            })

            prodModalSlider.innerHTML = slides.join('')
            prodModalPreview.innerHTML = preview.join('')

            prodModalInfo.innerHTML = `
                <h3 class="modal-info__title">${dataItem.title}</h3>

                <div class="modal-info__rate">
                  <img src="img/star.svg" alt="Рейтинг 5 из 5">
                  <img src="img/star.svg" alt="">
                  <img src="img/star.svg" alt="">
                  <img src="img/star.svg" alt="">
                  <img src="img/star.svg" alt="">
                </div>

                <div class="modal-info__sizes">
                  <span class="modal-info__subtitle">Выберите размер</span>

                  <ul class="modal-info__sizes-list list-reset modal-sizes">
                    ${sizes.join('')}
                  </ul>
                </div>

                <div class="modal-info__price">
                  <span class="modal-info__current-price">${dataItem.price} ₽</span>
                  <span class="modal-info__old-price">${dataItem.oldPrice ? dataItem.oldPrice + ' ₽' : ''}</span>
                </div>
            `

            // prodModal.innerHTML = `

            // `
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


