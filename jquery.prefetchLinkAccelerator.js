/**
 * jQuery Link Prefetch Accelerator plugin
 * Load links before event click.
 *
 * Created by Yosef(Vlad) Kaminskyi
 * Githab source https://github.com/moledet/jQueryPrefetchLinkAccelerator
 * Mailto: moledet[at]ukr.net
 * Version:  1.0  on 20/09/2017.
 * Dependencies:
 *      jQuery https://jquery.com/
 */
;(function($) {
    var jQueryLinkAccelarator = function (params) {
        var Accelerator ={
            selector: "body",
            fetchMethod: "preload",
            debugMode: false,
            disableLinkAccelerator:false,
            disableFormAccelerator:false,
            init:function (params) {
                for (var param in params) {
                    Accelerator[param] = params[param];
                }

                if(!this.disableLinkAccelerator){
                    this.attachLinkAccelarator();
                }

                if(!this.disableFormAccelerator){
                    this.attachFormAccelarator();
                }

            },
            preCacheHit:function (url) {
                var el = document.createElement("link");
                el.setAttribute("rel", Accelerator.fetchMethod);
                el.setAttribute("href", url);
                document.getElementsByTagName("head")[0].appendChild(el);
            },
            attachFormAccelarator:function () {
                var selector = Accelerator.selector;

                if(!$(selector).is('form')){
                    selector += ' form';
                }

                selector += ' button[type="submit"]';
                Accelerator.log('Forms selector: "' + selector+'"');
                $(selector).on('mouseover',function () {
                    var $form = $(this).closest("form");
                    console.dir($form.find('input'));
                    console.log($form.serialize());
                    Accelerator.log('Form pre submit ' + $form.attr('action'));
                    Accelerator.log('Form data to send ' + $form.serialize());
                    $.ajax({
                        url: $form.attr('action'),
                        type: $form.attr('method'),
                        data: $form.serialize(),
                        cache: true,
                        success: function(data) {
                            Accelerator.log('From preFetched');
                        }
                    });
                });

            },
            attachLinkAccelarator:function () {
                var selector = Accelerator.selector;

                if(!$(selector).is('a')){
                    selector += ' a';
                }
                Accelerator.log('Links selector: "' +selector+'"');
                $(selector).on('mouseover', function(e) {
                    Accelerator.log('Link mouse over');
                    var url = $(this).attr('href');
                    Accelerator.log(url);
                    if (url.indexOf('#') !== 0) {
                        Accelerator.preCacheHit(url);
                    }
                });
            },
            log: function () {
                if (this.debugMode) {
                    console.log(arguments);
                }
            }
        };

        Accelerator.init(params);
        return Accelerator;
    };

    $.fn.extend({
        accelerate: function(options) {
            var params = {selector:this.selector};

            params = $.extend(params,options);

            return new jQueryLinkAccelarator(params);
        }
    });
})(jQuery);