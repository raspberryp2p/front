require(['jquery', 'knockout', 'pager'], function ($, ko, pager) {
    $(function () {
        extendPager(pager, ko);
        setWindowViewModels(ko);

        pager.useHTML5history = true;
        pager.Href5.history = History;

        pager.extendWithPage(vm);
        ko.applyBindings(vm, document.getElementsByTagName('html')[0]);

        var baseUrl = History.getBaseHref();
        var pageUrl = History.getPageUrl();

        pager.startHistoryJs('front');
    });
});


var extendPager = function (pager, ko) {
    // By default, we cannot use the 'target' attribute because PagerJS sets the click binding.
    pager.Href5.prototype.bind = function () {
        var self = this;
        var target = $(self.element).attr('target');
        if (target && target != '_self') {
            ko.applyBindingsToNode(self.element, {
                attr: {
                    'href': self.path
                }
            });
        } else {
            // This is the original pager.Href5.prototype.bind, see pager.js.
            ko.applyBindingsToNode(self.element, {
                attr: {
                    'href': self.path
                },
                click: function () {
                    var path = self.path();
                    if (path === '' || path === '/') {
                        path = $('base').attr('href');
                    }
                    pager.Href5.history.pushState(null, null, path);
                }
            });
        }
    };
};