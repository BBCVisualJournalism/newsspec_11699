define(['lib/news_special/bootstrap'], function (news) {

    news.pubsub.on('lightbox:open', function openLightbox(openObject) {
        var title = openObject.title,
            messageMarkup = openObject.messageMarkup;

        console.log(title, messageMarkup);
    });

});
