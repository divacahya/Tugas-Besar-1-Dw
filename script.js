let slideIndex = 0; // Menyimpan indeks slide saat ini
const slides = document.querySelectorAll('.Home-image'); // Mengambil semua gambar dengan kelas 'Home-image'
const totalSlides = slides.length; // Mendapatkan jumlah gambar

// Fungsi untuk menampilkan slide sesuai indeks
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none'; // Hanya menampilkan slide yang sesuai indeks
    });
}

// Fungsi untuk menggeser ke slide berikutnya
function nextSlide() {
    slideIndex = (slideIndex + 1) % totalSlides; // Increment indeks dan kembali ke awal jika mencapai akhir
    showSlide(slideIndex); // Tampilkan slide yang baru
}

// Fungsi untuk menggeser ke slide sebelumnya
function prevSlide() {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides; // Decrement indeks dan kembali ke akhir jika mencapai awal
    showSlide(slideIndex); // Tampilkan slide yang baru
}

// Timer otomatis untuk menggeser slide setiap 2 detik
let slideInterval = setInterval(nextSlide, 2000);

// Hentikan timer sementara jika pengguna mengklik tombol "Next" atau "Prev"
document.querySelector('.next').addEventListener('click', () => {
    clearInterval(slideInterval); // Hentikan interval
    nextSlide(); // Geser ke slide berikutnya
    slideInterval = setInterval(nextSlide, 3000); // Mulai lagi interval setelah klik
});

document.querySelector('.prev').addEventListener('click', () => {
    clearInterval(slideInterval); // Hentikan interval
    prevSlide(); // Geser ke slide sebelumnya
    slideInterval = setInterval(nextSlide, 3000); // Mulai lagi interval setelah klik
});

// Untuk service list
const initSlider = () => {
    const imageList = document.querySelector(".slide-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slide-wrapper .slide-button");
    const sliderScrollBar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollBar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollBar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images untuk klik
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollBar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });

    // Inisialisasi tampilan tombol slide saat halaman dimuat
    handleSlideButtons();
};

window.addEventListener("load", initSlider);

// Untuk FAQ
const q = document.querySelectorAll('.q');
const a = document.querySelectorAll('.a');
const arr = document.querySelectorAll('.arr');

for(let i = 0; i < q.length; i++) {
    q[i].addEventListener('click', () => {
        a[i].classList.toggle('a-opened');
            arr[i].classList.toggle('arrow-rotated');
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("mobile-menu");
    const navList = document.querySelector("nav ul");

    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("show");
    });
});

