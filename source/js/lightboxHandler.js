define(['lib/news_special/bootstrap'], function (news) {

    var lightboxEl = news.$('.lightbox--overlay'),
        closeButtonEl = lightboxEl.find('.lightbox--close-button'),
        titleEl = lightboxEl.find('.lightbox--title'),
        messageEl = lightboxEl.find('.lightbox--message');

    function openLightbox(openObject) {
        var title = openObject.title,
            messageMarkup = openObject.messageMarkup;

        titleEl.text(title);
        messageEl.html(messageMarkup);
        lightboxEl.show();

    }

    function closeLightbox(e) {
        if (e && e.target !== this) {
            return;
        }

        lightboxEl.hide();
    }


    /* EVENT LISTENERS */
    news.pubsub.on('lightbox:open', openLightbox);

    news.pubsub.on('lightbox:close', closeLightbox);
    lightboxEl.on('click', closeLightbox);
    closeButtonEl.on('click', closeLightbox);
});
