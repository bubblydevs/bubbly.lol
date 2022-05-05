
"use scrict";

(function () {
    var timeouts = [];

    $(document).ready(function () {
        var links = [
            {
                name: 'Github',
                link: 'https://github.com/BubblyDisc'
            },
            {
                name: 'Spotify',
                link: 'https://open.spotify.com/user/xh906t5a2p8kh2l1fonqpdw2r'
            },
            {
                name: 'Bladelist.gg',
                link: 'https://bladelist.gg'
            },
            {
                name: 'Bubbly Studio',
                link: 'https://discord.gg/4ts8HARPkx'
            },
            {
                name: 'Bubbly#7055',
                link: 'https://bladelist.gg/users/664141231366078464'
            },
        ];

        for (var i in links) {
            var link = links[i];

            $('#marquee').append('<a href="' + link.link + '" target="_BLANK">' + link.name + '</a>');

            link = $('#marquee').children('a').last();

            if (i != links.length - 1)
                $('#marquee').append(' | ');
        }

        app.titleChanger();
        app.iconChanger([
            "assets/icons/roses/rose1.jpg",
            "assets/icons/roses/rose2.jpg",
            "assets/icons/roses/rose3.jpg",
            "assets/icons/roses/rose4.jpg",
            "assets/icons/roses/rose5.jpg",
            "assets/icons/roses/rose6.jpg",
            "assets/icons/roses/rose7.jpg",
            "assets/icons/roses/rose8.jpg",
            "assets/icons/roses/rose1.jpg",
        ]);
    });

    if ($.cookie('videoTime')) {
        app.videoElement.currentTime = $.cookie('videoTime');
        app.audioElement.currentTime = $.cookie('videoTime');
    }

    document.addEventListener('contextmenu', function (event) {
        event.preventDefault()
    });

    $(window).on('keydown', function () {
        if (event.keyCode == 123)
            return false;
        else if (event.ctrlKey && event.shiftKey && event.keyCode == 73)
            return false;
        else if (event.ctrlKey && event.keyCode == 73)
            return false;
        else if (event.ctrlKey && event.shiftKey && event.keyCode == 74)
            return false;
        else if (event.ctrlKey && event.keyCode == 74)
            return false;
    });

    document.body.onkeyup = function (e) {
        if (e.keyCode == 32 && app.skippedIntro) {
            if (app.backgroundToggler) {
                app.videoElement.play();
                app.audioElement.play();
            }
            else {
                app.videoElement.pause();
                app.audioElement.pause();
            }

            return app.backgroundToggler = !app.backgroundToggler;
        }
    }

    $('html').on('contextmenu', function (event) {
        var img = document.createElement("img");
        img.src = "assets/icons/favicon.ico";
        img.width = 16;
        img.height = 16;
        img.alt = "No";
        img.style = "position: absolute; left: " + event.pageX + "px; top: " + event.pageY + "px; z-index: 10";
        img.className = "troll" + ((app.skippedIntro) ? "" : " trollface-light");

        document.body.appendChild(img);
    });

    setInterval(function () {
        $(".troll").remove();
    }, 600);

    $(".skip").click(function () {
        skipIntro();
    });

    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);
            });
            return this;
        }
    });

    var writeLine = function (text, speed, timeout, callback) {
        timeout = (typeof timeout === "number") ? timeout : [0, callback = timeout];

        setTimeout(function () {
            var typed = new Typed("#line" + ((app.id !== 2) ? ++app.id : app.id += 2),
                {
                    strings: text,
                    typeSpeed: speed,
                    onComplete: callback
                });
        }, timeout);
    };

    (function () {
        $.getJSON('https://api.ipgeolocation.io/ipgeo?apiKey=2bdc619693544329841a3196dca3f6c0', function (data) {

            if (app.skippedIntro)
                return;

            clearCursor();

            if (app.skippedIntro)
                return;

            clearCursor();




            timeouts.push(setTimeout(function () {

                if (app.skippedIntro)
                    return;

                clearCursor();

                skipIntro();

            }, 2000));

        });

    })()

    var skipIntro = function () {

        if (app.skippedIntro)
            return;

        app.skippedIntro = true;

        timeouts.forEach(function (timeout) {
            clearTimeout(timeout);
        });

        $(".top-right").remove();

        $('#main').fadeOut(100, function () {

            $("#main").remove();

            $('#marquee').marquee({
                duration: 15000,
                gap: 420,
                delayBeforeStart: 1000,
                direction: 'left',
                duplicated: true
            });

            setTimeout(function () {
                $('.brand-header').animateCss(app.effects[Math.floor(Math.random() * app.effects.length)]);
            }, 200);

            setTimeout(function () {
                var typed = new Typed("#brand",
                    {
                        strings: app.brandDescription,
                        typeSpeed: 60,
                        onComplete: function () {
                            clearCursor()
                        }
                    });
            }, 1350);

            setTimeout(function () {
                if (!app.shouldIgnoreVideo) {
                    app.videoElement.play();
                    app.audioElement.play();
                }

                app.videoElement.addEventListener("timeupdate", function () {
                    $.cookie('videoTime', app.videoElement.currentTime, { expires: 1 });
                }, false);

                $('.marquee-container').css('visibility', 'visible').hide().fadeIn(100);

                $('.marquee-container').animateCss('zoomIn');

                $('.container').fadeIn();

                $('.background').fadeIn(200, function () {
                    if (!app.shouldIgnoreVideo)
                        $("#audio").animate({ volume: app.musicVolume }, app.musicFadeIn);
                });
            }, 200);
        });
    };

    var clearCursor = function () {
        return $("span").siblings(".typed-cursor").css("opacity", "0");
    }
})()
