document.addEventListener("DOMContentLoaded", function() {
        const pageTitle = encodeURIComponent(document.title);
        const pageUrl = encodeURIComponent(window.location.href);

        // WhatsApp Share URL
        document.getElementById('whatsapp-share').href = `https://api.whatsapp.com/send?text=${pageTitle} - ${pageUrl}`;

        // Twitter Share URL
        document.getElementById('twitter-share').href = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`;

        // Telegram Share URL
        document.getElementById('telegram-share').href = `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`;

        // Facebook Share URL
        document.getElementById('facebook-share').href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;

        // Pinterest Share URL
        document.getElementById('pinterest-share').href = `https://pinterest.com/pin/create/button/?url=${pageUrl}&description=${pageTitle}`;
    });
