    function compartilhaWhatsapp(){
        var link = "https://api.whatsapp.com/send?text=" + encodeURIComponent(window.location.href);
        window.location.assign(link);
    }

    function compartilhaTelegram(){
        window.location.assign("https://telegram.me/share/url?url=" + encodeURIComponent(window.location.href));
    }

    function compartilhaFacebook(){
        window.location.assign("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href));
    }

    function compartilhaTweeter(){
        window.location.assign("https://twitter.com/intent/tweet?url=" + encodeURIComponent(window.location.href));
    }

    function compartilhaEmail(){
        window.location.assign("https://api.addthis.com/oexchange/0.8/forward/email/offer?url=" + encodeURIComponent(window.location.href));
    }
