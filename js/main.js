(function (Drupal) {
    'use strict';
    document.addEventListener('DOMContentLoaded', function() {
        // Najdeme všechny kontejnery s třídou .video-wrapper
        const videoWrappers = document.querySelectorAll('.field--name-field-media-oembed-video');

        videoWrappers.forEach(function(wrapper) {
            // Najdeme iframe uvnitř každého kontejneru
            const iframe = wrapper.querySelector('iframe');

            if (iframe) {
                // Získáme hodnoty atributů width a height z iframe
                const iframeWidthAttr = iframe.getAttribute('width');
                const iframeHeightAttr = iframe.getAttribute('height');

                // Zkontrolujeme, zda atributy existují, jsou čísla a nejsou procentuální hodnoty
                if (iframeWidthAttr && !isNaN(iframeWidthAttr) && iframeWidthAttr.indexOf('%') === -1) {
                    const originalWidth = parseInt(iframeWidthAttr, 10);
                    // Nastavíme max-width kontejneru na původní šířku iframe
                    wrapper.style.maxWidth = originalWidth + 'px';

                    if (iframeHeightAttr && !isNaN(iframeHeightAttr) && iframeHeightAttr.indexOf('%') === -1) {
                        const originalHeight = parseInt(iframeHeightAttr, 10);
                        // Vypočítáme poměr stran a nastavíme padding-bottom pro udržení tohoto poměru
                        // padding-bottom se počítá jako (výška / šířka) * 100%
                        if (originalWidth > 0) { // Ochrana proti dělení nulou
                            wrapper.style.paddingBottom = (originalHeight / originalWidth * 100) + '%';
                        }
                    } else {
                        // Fallback pro případ, že chybí atribut height, ale width je přítomen
                        // Můžete zde nastavit výchozí poměr stran, např. 16:9 (56.25%)
                        // wrapper.style.paddingBottom = '56.25%';
                        // Nebo nechat bez paddingBottom, pokud nechcete výchozí poměr
                        console.warn('Iframe má atribut width, ale chybí validní atribut height. Poměr stran nemusí být správný.', iframe);
                    }
                } else {
                    console.warn('Iframe nemá validní atribut width pro nastavení max-width.', iframe);
                    // Pokud chcete nastavit výchozí poměr stran i pro iframy bez atributů šířky/výšky
                    // wrapper.style.paddingBottom = '56.25%'; // Například pro 16:9
                }
            }
        });
    });
}(Drupal));