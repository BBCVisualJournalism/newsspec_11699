define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/model', 'lib/news_special/share_tools/view'], function (news, SharetoolsModel, SharetoolsView) {

    var NSShareController = function (elm, config, namespace){
        this.namespace =  namespace || Math.floor(999999999*Math.random());

        this.elm = (elm instanceof news.$) ? elm : $(elm);
        this.model = new SharetoolsModel(config, this.namespace);
        this.view = new SharetoolsView(this.elm, this.namespace);
        // this gets called once...
        news.pubsub.on('ns:' + this.namespace + ':module:ready',
            news.$.proxy(this._initialiseModule, this));

        // this builds the share HTML fragment
        news.pubsub.emit('ns:' + this.namespace + ':request:personalshare', [this.model]);
    }

    NSShareController.prototype = {
        getNamespace: function () {
            return this.namespace;
        },
        _callFaceBook: function () {
            news.pubsub.emit('ns:' + this.namespace + ':request:launchshare', [this.model.fbShareTarget()]);
        },
        _callTwitter: function () {
            news.pubsub.emit('ns:' + this.namespace + ':request:launchshare', [this.model.twitterShareTarget()]);
        },
        _callEmail: function () {
            news.pubsub.emit('ns:' + this.namespace + ':request:launchshare:samewindow', [this.model.emailShareTarget()]);
        },
        _updateMessage: function (e) {
            this.model.setShareMessage(e);
        },
        _updateFacebookMessage: function (e) {
            this.model.setFacebookShareMessage(e);
        },
        _updateTwitterMessage: function (e) {
            this.model.setTwitterShareMessage(e);
        },
        _updateEmailMessage: function (e) {
            this.model.setEmailShareMessage(e);
        },
        _initialiseModule: function () {
            var self = this;
            news.pubsub.on('ns:sharetools:destroyAll',
                news.$.proxy(this._destroy, this));
            news.pubsub.on('ns:' + this.namespace + ':sharetools:destroy',
                news.$.proxy(this._destroy, this));

            news.pubsub.on('ns:' + this.namespace + ':share:message', function (target) { this._updateMessage(target); });

            news.pubsub.on('ns:' + this.namespace + ':share:setFacebookMessage', function (target) { this._updateFacebookMessage(target); });
            news.pubsub.on('ns:' + this.namespace + ':share:setTwitterMessage', function (target) { this._updateTwitterMessage(target); });
            news.pubsub.on('ns:' + this.namespace + ':share:setEmailMessage', function (target) { this._updateEmailMessage(target); });

            news.pubsub.on('ns:' + this.namespace + ':share:call:facebook',
                news.$.proxy(this._callFaceBook, this));

            news.pubsub.on('ns:' + this.namespace + ':share:call:twitter',
                news.$.proxy(this._callTwitter, this));

            news.pubsub.on('ns:' + this.namespace + ':share:call:email',
                news.$.proxy(this._callEmail, this));

            this.elm.find('.share__button').on('click', function (template) {
                news.pubsub.emit('ns:' + self.namespace + ':overlay:toggle', template);
            });

            this.elm.find('.share__overlay-close').on('click', function (template) {
                template.preventDefault();
                news.pubsub.emit('ns:' + self.namespace + ':overlay:close', template);
            });
        },
        _destroy: function () {
            news.pubsub.off('ns:' + this.namespace + ':sharetools:destroy');
            news.pubsub.off('ns:sharetools:destroyAll');
            news.pubsub.off('ns:' + this.namespace + ':module:ready');
            news.pubsub.off('ns:' + this.namespace + ':request:personalshare');
            news.pubsub.off('ns:' + this.namespace + ':request:launchshare');
            news.pubsub.off('ns:' + this.namespace + ':share:message');
            news.pubsub.off('ns:' + this.namespace + ':share:setFacebookMessage');
            news.pubsub.off('ns:' + this.namespace + ':share:setTwitterMessage');
            news.pubsub.off('ns:' + this.namespace + ':share:setEmailMessage');
            news.pubsub.off('ns:' + this.namespace + ':share:call:facebook');
            news.pubsub.off('ns:' + this.namespace + ':share:call:twitter');
            news.pubsub.off('ns:' + this.namespace + ':share:call:email');

            this.view.destroy();
            // remove all explicit and implicit references to enable Garbage Collection
            this.view = null;
            this.model = null;
            this.elm = null;
            this.namespace = null;
            this.__proto__ = null;
        }
    }

    return NSShareController;
});