function compartilhaWhatsapp() {
  window.open(
    `https://api.whatsapp.com/send?text=${encodeURIComponent(
      window.location.href
    )}`,
    "_blank"
  );
}

window.location.assign(link);
  window.open(link, "_blank");

function compartilhaTelegram() {
  window.open(
    `https://telegram.me/share/url?url=${encodeURIComponent(
      window.location.href
    )}`,
    "_blank"
  );
}

function compartilhaFacebook() {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`,
    "_blank"
  );
}

function compartilhaTweeter() {
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}`,
    "_blank"
  );
}

function compartilhaEmail() {
  window.open(
    `mailto:?subject=Artigo Spare&body=${encodeURIComponent(
      window.location.href
    )}`
  );
}
