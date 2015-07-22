define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'appInitData', 'bump-3', 'videoMarkers'], function (news, ShareTools, appInitData, $, videoMarkerData) {

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

});
