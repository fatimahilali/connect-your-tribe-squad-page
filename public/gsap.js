
/**
 * @author Fatima el Hilali
 * @file gsap.js
 *
 * @description 
 * Dit script animeert boeken in een "latest-books" sectie met behulp van GSAP. 
 * De animatie laat boeken dynamisch verschijnen, bewegen en verdwijnen met een 
 * vloeiende en speelse interactie, inclusief lichteffecten en hover-animaties.
 * @bron  GSAP documentatie
 */




/**
 * Voert de animatie uit zodra de DOM volledig is geladen.
 */
document.addEventListener("DOMContentLoaded", function () {
    /**
     * Selecteert alle boeken in de sectie "latest-books".
     * @type {NodeListOf<HTMLElement>}
     */
    const books = document.querySelectorAll(".latest-books .book");
    
    /**
     * Houdt bij welk boek momenteel wordt weergegeven.
     * @type {number}
     */
    let currentIndex = 0;

    /**
     * Posities waar de boeken verschijnen, met lichte willekeurige variatie.
     * @type {Array<{top: string, left: string, rotation: number}>}
     */
    const topPositions = [
        { top: "5%", left: "25%", rotation: -6 },
        { top: "6%", left: "40%", rotation: -2 },
        { top: "4%", left: "55%", rotation: 3 },
        { top: "5%", left: "70%", rotation: 5 }
    ];

    // **Begininstellingen: alle boeken onzichtbaar in het midden**
    gsap.set(books, {
        autoAlpha: 0,
        scale: 0.8,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(0deg)",
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)"
    });

    /**
     * Toont een reeks boeken met een zachte animatie.
     */
    function showNextBooks() {
        /**
         * Bevat de boeken die in de huidige cyclus worden weergegeven.
         * @type {HTMLElement[]}
         */
        let selectedBooks = [];

        /**
         * Laat een individueel boek verschijnen met een zachte animatie.
         * @param {number} index - De index van het boek in de animatiereeks.
         * @param {number} delay - De vertraging voordat de animatie start.
         */
        function fadeInBook(index, delay) {
            let book = books[(currentIndex + index) % books.length];
            selectedBooks.push(book);

            gsap.to(book, {
                autoAlpha: 1,
                scale: 1,
                top: topPositions[index].top,
                left: topPositions[index].left,
                rotation: topPositions[index].rotation,
                duration: 2.2,
                ease: "elastic.out(1, 0.5)",
                delay: delay
            });

            // **Voegt een lichte glow toe na het verschijnen**
            setTimeout(() => {
                gsap.to(book, {
                    boxShadow: "0px 0px 25px rgba(0, 255, 255, 0.8)",
                    duration: 1.8,
                    ease: "power2.out"
                });
            }, (delay + 1.5) * 1000);
        }

        // **Laat vier boeken met vertraging verschijnen**
        fadeInBook(0, 0);
        fadeInBook(1, 0.8);
        fadeInBook(2, 1.6);
        fadeInBook(3, 2.4);

        /**
         * Laat een boek verdwijnen met een fade-out effect.
         * @param {number} index - De index van het boek binnen de geselecteerde boeken.
         * @param {number} delay - De vertraging voordat de animatie start.
         */
        function fadeOutBook(index, delay) {
            let book = selectedBooks[index];

            setTimeout(() => {
                gsap.to(book, {
                    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
                    duration: 1.5,
                    ease: "power2.inOut"
                });

                setTimeout(() => {
                    gsap.to(book, {
                        autoAlpha: 0,
                        scale: 0.8,
                        y: "+=20",
                        rotation: "+=5",
                        duration: 2.5,
                        ease: "power2.inOut",
                        onComplete: () => {
                            gsap.to(book, { y: "-=5", duration: 0.3, ease: "power1.out" });
                        }
                    });

                    // **Start de volgende set boeken als de laatste verdwijnt**
                    if (index === selectedBooks.length - 1) {
                        currentIndex = (currentIndex + 4) % books.length;
                        setTimeout(showNextBooks, 1500);
                    }
                }, 1200);
            }, delay * 2000);
        }

        // **Voegt hover-effecten toe aan de boeken**
        books.forEach(book => {
            book.addEventListener("mouseenter", () => {
                gsap.to(book, { 
                    scale: 1.05, 
                    boxShadow: "0px 0px 30px rgba(0, 255, 255, 1)", 
                    rotation: gsap.utils.random(-3, 3),
                    duration: 0.3 
                });
            });
            
            book.addEventListener("mouseleave", () => {
                gsap.to(book, { 
                    scale: 1, 
                    boxShadow: "0px 0px 25px rgba(0, 255, 255, 0.8)", 
                    duration: 0.3 
                });
            });
        });

        // **Laat boeken verdwijnen met een zachte overgang**
        fadeOutBook(0, 5);
        fadeOutBook(1, 6);
        fadeOutBook(2, 7);
        fadeOutBook(3, 8);
    }

    // **Start de eerste animatie**
    showNextBooks();
});
