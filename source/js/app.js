define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'appInitData', 'bump-3', 'videoMarkers', 'lightboxHandler'], function (news, ShareTools, appInitData, $, videoMarkerData, lightboxHandler) {

    function addIdsToVideoMarkers(markersArray) {
        for (var i = 0; i < markersArray.length; i++) {
            markersArray[i].id = i;
        }
        return markersArray;
    }

    var settings = {
        product : 'news',
        responsive: true,
        insideIframe: true,
        quality: 'high',
        autoplay: true,
        playlistObject: {
            items: [{
                vpid: 'p02xr521'
            }]
        },
        ui: {
            controls: {
                always: true,
                mode: 'seekbar'
            },
            buffer: {
                enabled: false
            },
            fullscreen: {
                enabled: false
            },
            markers: {
                enabled: true,
                reportProgress: true
            }
        }
    };

    var videoMarkers = addIdsToVideoMarkers(videoMarkerData);
    var mediaPlayer = $('#media-player').player(settings);

    mediaPlayer.load();

    mediaPlayer.bind('playlistLoaded', function (e) {
        mediaPlayer.setData({ name: 'SMP.markers', data: videoMarkers });
    });

    mediaPlayer.bind('markerStart', function (e) {
        console.log(e);
        if (!mediaPlayer.paused()) {
            mediaPlayer.pause();
        }
        news.$('.overlay-layer').show();
    });

    mediaPlayer.bind('markerEnd', function (e) {
        console.log('End marker');
        var nextMarkerId = e.id + 1;
        if (nextMarkerId < videoMarkers.length) {
            var nextMarker = videoMarkers[nextMarkerId],
                nextChapterPosition = nextMarker.start;

            mediaPlayer.currentTime(nextChapterPosition);
        } else {
            mediaPlayer.pause();
        }
    });

    news.$('.media-player--resume-button').on('click', function () {
        mediaPlayer.play();
        news.$('.overlay-layer').hide();
    });

    news.sendMessageToremoveLoadingImage();

    news.pubsub.emit('lightbox:open', {
        title: 'The is a test',
        messageMarkup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non quam tincidunt, varius diam a, pellentesque elit. Etiam id consectetur magna. Sed eleifend et quam mattis vehicula. <strong>Nullam in erat dictum</strong>, venenatis massa ut, mollis sem. Donec pulvinar nisl non sem rutrum, nec iaculis mi venenatis. Vivamus elit neque, ullamcorper nec ultrices a, sodales et arcu. Cras sed dui tempus erat commodo facilisis ac a ligula. Suspendisse eu tellus at mauris condimentum venenatis non nec velit. Vestibulum accumsan nibh dictum lorem molestie vehicula. Sed luctus velit nulla, eu sagittis turpis hendrerit non. Nunc a malesuada mi.'
    });

});
