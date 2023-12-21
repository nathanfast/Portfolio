document.addEventListener('DOMContentLoaded', function () {
    function setFavicon() {
        const body = document.body;
        const backgroundColor = getComputedStyle(body).backgroundColor;

        // Erstelle ein unsichtbares Bild, um das Favicon zu laden
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            // Fülle das Canvas mit der Hintergrundfarbe
            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Zeichne das geladene Favicon darüber
            context.drawImage(img, 0, 0);

            // Setze das Favicon
            const favicon = document.getElementById('dynamic-favicon');
            favicon.href = canvas.toDataURL('image/x-icon');
        };

        // Lade das Favicon basierend auf der Helligkeit
        const brightness = calculateBrightness(backgroundColor);
        img.src = `img/${brightness < 128 ? 'dark' : 'light'}.ico`;
    }

    function calculateBrightness(rgb) {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        return (r * 299 + g * 587 + b * 114) / 1000;
    }

    // Setze das Favicon beim Laden der Seite
    setFavicon();
});
