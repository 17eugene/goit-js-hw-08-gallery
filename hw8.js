import galleryItems from './gallery-items.js'

const makeGalleryItem = ({description, original, preview}) => {
    const galleryListElement = document.createElement('li');
    galleryListElement.classList.add('gallery__item');

    const galleryLink = document.createElement('a');
    galleryLink.classList.add('gallery__link');
    galleryLink.href = original;
    
    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery__image');
    galleryImage.alt = description;
    galleryImage.src = preview;
    galleryImage.setAttribute('data-source', original);
    
    galleryLink.appendChild(galleryImage);
    
    galleryListElement.append(galleryLink);

    return galleryListElement;
}

const elements = galleryItems.map(makeGalleryItem);

const galleryMarkup = document.querySelector('.gallery');

galleryMarkup.append(...elements);


const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.lightbox');
const overlay = document.querySelector('.lightbox__overlay');
const lightboxImage = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');


gallery.addEventListener('click', onGallery);
closeModalBtn.addEventListener('click', onCloseBtn);
overlay.addEventListener('click', onBackdropClick);

function onGallery(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    if (event.target.nodeName === 'IMG') {
        lightbox.classList.add('is-open');
        lightboxImage.src = event.target.dataset.source;
        lightboxImage.alt = event.target.alt;
    }
    window.addEventListener('keyup', onKeyClose)
    window.addEventListener('keydown', leafOverByArrows)
};

function onCloseBtn(event) {
    lightbox.classList.remove('is-open');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    window.removeEventListener('keyup', onKeyClose);
    window.removeEventListener('keydown', leafOverByArrows)
};

function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
        onCloseBtn();
    };
};

function onKeyClose(event) {
    if (event.code === 'Escape') {
        onCloseBtn()
    };
};

const imagesArray = galleryItems.map(item => item.original);

function leafOverByArrows(event) {
    let newIndex;
    const currentIndex = imagesArray.indexOf(lightboxImage.src)
    if (event.code === 'ArrowLeft') {
        newIndex = currentIndex - 1;
        if (newIndex === -1) {
            newIndex = imagesArray.length - 1;
        }
    } else if (event.code === 'ArrowRight') {
        newIndex = currentIndex + 1;
        if (newIndex === imagesArray.length) {
            newIndex = 0;
        }
    }
    lightboxImage.src = imagesArray[newIndex]
}






