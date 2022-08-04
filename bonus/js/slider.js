// console.log('slider')
const slides = [
	{
		url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
		title: 'Svezia',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
	},

	{
		url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
		title: 'Perù',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
	},

	{
		url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
		title: 'Chile',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
	},
	{
		url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
		title: 'Argentina',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
	},
	{
		url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
		title: 'Colombia',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
	},
]

const firstIndex = 0;

let firstSlide, lastSlide, firstDot, lastDot;

// prendo elemento 'dots'
const dotsEl = document.querySelector('.dots');
dotsEl.innerHTML = '';

const slidesWrapperEl = document.querySelector('.slides-wrapper');
slidesWrapperEl.addEventListener('mouseenter', slidesWrapperHover);
slidesWrapperEl.addEventListener('mouseleave', slidesWrapperLeave);
slidesWrapperEl.innerHTML = '';

// funzione che crea un titolo
function createTitle(titolo) {
	const title = document.createElement('h3');
	title.className = 'slide__title';
	title.append(titolo);
	return title;
}

// funzione che crea un paragrafo
function createParagraph(description) {
	const paragrafo = document.createElement('p');
	paragrafo.className = 'slide__description';
	paragrafo.append(description);
	return paragrafo;
}

// funzione che crea 'slide__content
function createSlideContent(slide) {
	const slideContent = document.createElement('div');
	slideContent.className = 'slide__content';
	slideContent.append(createTitle(slide.title));
	slideContent.append(createParagraph(slide.description));
	return slideContent;
}

// funzione che crea un immagine
function createImage(slide) {
	const img = document.createElement('img');
	img.src = slide.url;
	return img;
}

// funzione che crea un elemento della lista
function createSlideElement(slide, i) {
	const liEl = document.createElement('li');
	liEl.className = 'slide';
	if ( i === 0 ) {
		liEl.classList.add('active');
		firstSlide = liEl;
	}
	if ( i === slides.length - 1 ) {
        lastSlide = liEl;
    }
	liEl.append(createImage(slide));
	liEl.append(createSlideContent(slide));
	return liEl;
}

// per ogni oggetto presente nell'array creo un li e un dot
// e li inserisco nella pagina
slides.forEach((slide, i) => {
	slidesWrapperEl.append(createSlideElement(slide,i));
    const dotEl = createDot(i);
    // metto dot dentro a dots
    dotsEl.append(dotEl);
});

// funzione che crea un dot
function createDot(i) {
    const dotEl = document.createElement('div');
    dotEl.className = 'dot';
    dotEl.classList.add(`dot${i+1}`);
    // aggiungo la classe active al primo dot
    if ( i === firstIndex ) {
        dotEl.classList.add('active');
    }
    // salvo primo dot
    if ( i === 0 ) {
        firstDot = dotEl;
    }

    // salvo ultimo dot
    if ( i === slides.length - 1 ) {
        lastDot = dotEl;
    }
    return dotEl;
}

for ( let i = 0; i < slides.length; i++ ) {
    // creo dot

    

    

}

const nextArrowEl = document.querySelector('.arrow-next');

// funzione che gestisce il click della freccia avanti
function nextArrowClick() {
    const activeEl = document.querySelector('.slide.active');
    activeEl.classList.remove('active');
    const activeDotEl = dotsEl.querySelector('.active');
    activeDotEl.classList.remove('active');
    if ( activeEl.nextElementSibling != null ) { // se c'è un elemento successivo lo visualizzo
        // slide
        const nextLiEl = activeEl.nextElementSibling;
        nextLiEl.classList.add('active');
        // dot
        const nextDotEl = activeDotEl.nextElementSibling;
        nextDotEl.classList.add('active');
    } else { // altrimenti visualizzo il primo
        // slide
        firstSlide.classList.add('active');
        //dot
        firstDot.classList.add('active');
    }
}

nextArrowEl.addEventListener('click', nextArrowClick);

const prevArrowEl = document.querySelector('.arrow-prev');

// funzione che gestisce il click della freccia indietro
function prevArrowClick() {
    const activeEl = document.querySelector('.slide.active');
    activeEl.classList.remove('active');
    const activeDotEl = dotsEl.querySelector('.active');
    activeDotEl.classList.remove('active');
    if ( activeEl.previousElementSibling != null ) { // se c'è un elemento precedente lo visualizzo
        // slide
        const prevLiEl = activeEl.previousElementSibling;
        prevLiEl.classList.add('active');
        // dot
        const prevDotEl = activeDotEl.previousElementSibling;
        prevDotEl.classList.add('active');
    } else { // altrimenti visualizzo l'ultimo
        //slide
        lastSlide.classList.add('active');
        //dot
        lastDot.classList.add('active');
    }
}

prevArrowEl.addEventListener('click', prevArrowClick);

dotsEl.addEventListener('click', function(){
    let dotEl = dotsEl.querySelector(':hover');
    if ( dotEl != null ) {
        let index = 0;
        // trovo l'index dell'elemento
        while( (dotEl = dotEl.previousSibling) != null ) {
            index++;
        }
        // prendo la slide corrente e la prossima da visualizzare
        const activeSlideEl = document.querySelector('.active');
        const nextActiveSlideEl = slidesWrapperEl.childNodes[index];
        
        activeSlideEl.classList.remove('active');
        nextActiveSlideEl.classList.add('active');
    
        // prendo il dot corrente e il prossimo attivo
        const activeDotEl = dotsEl.querySelector('.active');
        const nextActiveDotEl = dotsEl.childNodes[index];
    
        activeDotEl.classList.remove('active');
        nextActiveDotEl.classList.add('active');
    }
});

dotsEl.addEventListener('mouseenter', slidesWrapperHover);
dotsEl.addEventListener('mouseleave', slidesWrapperLeave);

const arrowsEl = document.querySelector('.arrows');
arrowsEl.addEventListener('mouseenter', slidesWrapperHover);
arrowsEl.addEventListener('mouseleave', slidesWrapperLeave);

let clock = setInterval(nextArrowClick, 4000);

function slidesWrapperHover() {
    clearInterval(clock);
}

function slidesWrapperLeave() {
    clock = setInterval(nextArrowClick, 3000);
}
