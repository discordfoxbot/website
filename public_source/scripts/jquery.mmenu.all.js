/*	
 * jQuery mmenu v5.0.4
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Licensed under the MIT license:
 * http://en.wikipedia.org/wiki/MIT_License
 */
!function (t) {
    function n() {
        t[s].glbl || (d = {
            $wndw: t(window),
            $html: t("html"),
            $body: t("body")
        }, a = {}, l = {}, r = {}, t.each([a, l, r], function (e, t) {
            t.add = function (e) {
                e = e.split(" ");
                for (var n in e)t[e[n]] = t.mm(e[n])
            }
        }), a.mm = function (e) {
            return "mm-" + e
        }, a.add("wrapper menu vertical panel nopanel current highest opened subopened header hasheader title btn prev next first last listview nolistview selected divider spacer hidden fullsubopen"), a.umm = function (e) {
            return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e
        }, l.mm = function (e) {
            return "mm-" + e
        }, l.add("parent sub"), r.mm = function (e) {
            return e + ".mm"
        }, r.add("transitionend webkitTransitionEnd mousedown mouseup touchstart touchmove touchend click keydown"), t[s]._c = a, t[s]._d = l, t[s]._e = r, t[s].glbl = d)
    }

    var s = "mmenu", i = "5.0.4";
    if (!t[s]) {
        t[s] = function (e, t, n) {
            this.$menu = e, this._api = ["bind", "init", "update", "setSelected", "getInstance", "openPanel", "closePanel", "closeAllPanels"], this.opts = t, this.conf = n, this.vars = {}, this.cbck = {}, "function" == typeof this.___deprecated && this.___deprecated(), this._initMenu(), this._initAnchors();
            var s = this.$menu.children(this.conf.panelNodetype);
            return this._initAddons(), this.init(s), "function" == typeof this.___debug && this.___debug(), this
        }, t[s].version = i, t[s].addons = {}, t[s].uniqueId = 0, t[s].defaults = {
            extensions: [],
            onClick: {setSelected: !0},
            slidingSubmenus: !0
        }, t[s].configuration = {
            classNames: {
                panel: "Panel",
                vertical: "Vertical",
                selected: "Selected",
                divider: "Divider",
                spacer: "Spacer"
            }, clone: !1, openingInterval: 25, panelNodetype: "ul, ol, div", transitionDuration: 400
        }, t[s].prototype = {
            init: function (e) {
                e = e.not("." + a.nopanel), e = this._initPanels(e), this.trigger("init", e), this.trigger("update")
            }, update: function () {
                this.trigger("update")
            }, setSelected: function (e) {
                this.$menu.find("." + a.listview).children().removeClass(a.selected), e.addClass(a.selected), this.trigger("setSelected", e)
            }, openPanel: function (e) {
                var n = e.parent();
                if (n.hasClass(a.vertical)) {
                    var s = n.parents("." + a.subopened);
                    if (s.length)return this.openPanel(s.first());
                    n.addClass(a.opened)
                } else {
                    if (e.hasClass(a.current))return;
                    var i = t(this.$menu).children("." + a.panel), l = i.filter("." + a.current);
                    i.removeClass(a.highest).removeClass(a.current).not(e).not(l).not("." + a.vertical).addClass(a.hidden), e.hasClass(a.opened) ? l.addClass(a.highest).removeClass(a.opened).removeClass(a.subopened) : (e.addClass(a.highest), l.addClass(a.subopened)), e.removeClass(a.hidden).addClass(a.current), setTimeout(function () {
                        e.removeClass(a.subopened).addClass(a.opened)
                    }, this.conf.openingInterval)
                }
                this.trigger("openPanel", e)
            }, closePanel: function (e) {
                var t = e.parent();
                t.hasClass(a.vertical) && (t.removeClass(a.opened), this.trigger("closePanel", e))
            }, closeAllPanels: function () {
                this.$menu.find("." + a.listview).children().removeClass(a.selected).filter("." + a.vertical).removeClass(a.opened);
                var e = this.$menu.children("." + a.panel), t = e.first();
                this.$menu.children("." + a.panel).not(t).removeClass(a.subopened).removeClass(a.opened).removeClass(a.current).removeClass(a.highest).addClass(a.hidden), this.openPanel(t)
            }, togglePanel: function (e) {
                var t = e.parent();
                t.hasClass(a.vertical) && this[t.hasClass(a.opened) ? "closePanel" : "openPanel"](e)
            }, getInstance: function () {
                return this
            }, bind: function (e, t) {
                this.cbck[e] = this.cbck[e] || [], this.cbck[e].push(t)
            }, trigger: function () {
                var t = this, n = Array.prototype.slice.call(arguments), s = n.shift();
                if (this.cbck[s])for (e in this.cbck[s])this.cbck[s][e].apply(t, n)
            }, _initMenu: function () {
                this.opts.offCanvas && this.conf.clone && (this.$menu = this.$menu.clone(!0), this.$menu.add(this.$menu.find("*")).filter("[id]").each(function () {
                    t(this).attr("id", a.mm(t(this).attr("id")))
                })), this.$menu.contents().each(function () {
                    3 == t(this)[0].nodeType && t(this).remove()
                }), this.$menu.parent().addClass(a.wrapper);
                var e = [a.menu];
                this.opts.slidingSubmenus || e.push(a.vertical), this.opts.extensions = this.opts.extensions.length ? "mm-" + this.opts.extensions.join(" mm-") : "", this.opts.extensions && e.push(this.opts.extensions), this.$menu.addClass(e.join(" "))
            }, _initPanels: function (e) {
                var n = this;
                this.__findAddBack(e, "ul, ol").not("." + a.nolistview).addClass(a.listview);
                var s = this.__findAddBack(e, "." + a.listview).children();
                this.__refactorClass(s, this.conf.classNames.selected, "selected"), this.__refactorClass(s, this.conf.classNames.divider, "divider"), this.__refactorClass(s, this.conf.classNames.spacer, "spacer"), this.__refactorClass(this.__findAddBack(e, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel");
                var i = t(), r = e.add(this.__findAddBack(e, "." + a.listview).children().children(this.conf.panelNodetype)).not("." + a.nopanel);
                this.__refactorClass(r, this.conf.classNames.vertical, "vertical"), this.opts.slidingSubmenus || r.addClass(a.vertical), r.each(function () {
                    var e = t(this), s = e;
                    e.is("ul, ol") ? (e.wrap('<div class="' + a.panel + '" />'), s = e.parent()) : s.addClass(a.panel);
                    var l = e.attr("id");
                    e.removeAttr("id"), s.attr("id", l || n.__getUniqueId()), e.hasClass(a.vertical) && (e.removeClass(n.conf.classNames.vertical), s.add(s.parent()).addClass(a.vertical)), i = i.add(s);
                    var r = s.children().first(), d = s.children().last();
                    r.is("." + a.listview) && r.addClass(a.first), d.is("." + a.listview) && d.addClass(a.last)
                });
                var d = t("." + a.panel, this.$menu);
                i.each(function () {
                    var e = t(this), n = e.parent(), s = n.children("a, span");
                    if (!n.is("." + a.menu) && !e.data(l.parent)) {
                        if (n.data(l.sub, e), e.data(l.parent, n), n.parent().is("." + a.listview)) {
                            var i = e.attr("id"), r = t('<a class="' + a.next + '" href="#' + i + '" data-target="#' + i + '" />').insertBefore(s);
                            s.is("a") || r.addClass(a.fullsubopen)
                        }
                        if (!n.hasClass(a.vertical)) {
                            var d = n.closest("." + a.panel);
                            if (d.length) {
                                var i = d.attr("id");
                                e.prepend('<div class="' + a.header + '"><a class="' + a.btn + " " + a.prev + '" href="#' + i + '" data-target="#' + i + '"></a><a class="' + a.title + '">' + s.text() + "</a></div>"), e.addClass(a.hasheader)
                            }
                        }
                    }
                });
                var o = this.__findAddBack(e, "." + a.listview).children("." + a.selected).removeClass(a.selected).last().addClass(a.selected);
                o.add(o.parentsUntil("." + a.menu, "li")).filter("." + a.vertical).addClass(a.opened).end().not("." + a.vertical).each(function () {
                    t(this).parentsUntil("." + a.menu, "." + a.panel).not("." + a.vertical).first().addClass(a.opened).parentsUntil("." + a.menu, "." + a.panel).not("." + a.vertical).first().addClass(a.opened).addClass(a.subopened)
                }), o.children("." + a.panel).not("." + a.vertical).addClass(a.opened).parentsUntil("." + a.menu, "." + a.panel).not("." + a.vertical).first().addClass(a.opened).addClass(a.subopened);
                var c = d.filter("." + a.opened);
                return c.length || (c = i.first()), c.addClass(a.opened).last().addClass(a.current), i.not("." + a.vertical).not(c.last()).addClass(a.hidden).end().appendTo(this.$menu), i
            }, _initAnchors: function () {
                var e = this;
                d.$body.on(r.click + "-oncanvas", "a[href]", function (n) {
                    var i = t(this), l = !1, r = e.$menu.find(i).length;
                    for (var o in t[s].addons)if (l = t[s].addons[o].clickAnchor.call(e, i, r))break;
                    if (!l && r) {
                        var c = i.attr("href");
                        if (c.length > 1 && "#" == c.slice(0, 1)) {
                            var h = t(c, e.$menu);
                            h.is("." + a.panel) && (l = !0, e[i.parent().hasClass(a.vertical) ? "togglePanel" : "openPanel"](h))
                        }
                    }
                    if (l && n.preventDefault(), !l && r && i.is("." + a.listview + " > li > a") && !i.is('[rel="external"]') && !i.is('[target="_blank"]')) {
                        e.__valueOrFn(e.opts.onClick.setSelected, i) && e.setSelected(t(n.target).parent());
                        var u = e.__valueOrFn(e.opts.onClick.preventDefault, i, "#" == c.slice(0, 1));
                        u && n.preventDefault(), e.__valueOrFn(e.opts.onClick.blockUI, i, !u) && d.$html.addClass(a.blocking), e.__valueOrFn(e.opts.onClick.close, i, u) && e.close()
                    }
                })
            }, _initAddons: function () {
                for (var e in t[s].addons)t[s].addons[e].add.call(this), t[s].addons[e].add = function () {
                };
                for (var e in t[s].addons)t[s].addons[e].setup.call(this)
            }, __api: function () {
                var e = this, n = {};
                return t.each(this._api, function () {
                    var t = this;
                    n[t] = function () {
                        var s = e[t].apply(e, arguments);
                        return "undefined" == typeof s ? n : s
                    }
                }), n
            }, __valueOrFn: function (e, t, n) {
                return "function" == typeof e ? e.call(t[0]) : "undefined" == typeof e && "undefined" != typeof n ? n : e
            }, __refactorClass: function (e, t, n) {
                return e.filter("." + t).removeClass(t).addClass(a[n])
            }, __findAddBack: function (e, t) {
                return e.find(t).add(e.filter(t))
            }, __filterListItems: function (e) {
                return e.not("." + a.divider).not("." + a.hidden)
            }, __transitionend: function (e, t, n) {
                var s = !1, i = function () {
                    s || t.call(e[0]), s = !0
                };
                e.one(r.transitionend, i), e.one(r.webkitTransitionEnd, i), setTimeout(i, 1.1 * n)
            }, __getUniqueId: function () {
                return a.mm(t[s].uniqueId++)
            }
        }, t.fn[s] = function (e, i) {
            return n(), e = t.extend(!0, {}, t[s].defaults, e), i = t.extend(!0, {}, t[s].configuration, i), this.each(function () {
                var n = t(this);
                if (!n.data(s)) {
                    var a = new t[s](n, e, i);
                    n.data(s, a.__api())
                }
            })
        }, t[s].support = {touch: "ontouchstart" in window || navigator.msMaxTouchPoints};
        var a, l, r, d
    }
}(jQuery);
/*
 * jQuery mmenu offCanvas addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (e) {
    var t = "mmenu", o = "offCanvas";
    e[t].addons[o] = {
        setup: function () {
            if (this.opts[o]) {
                var n = this.opts[o], i = this.conf[o];
                a = e[t].glbl, this._api = e.merge(this._api, ["open", "close", "setPage"]), ("top" == n.position || "bottom" == n.position) && (n.zposition = "front"), "string" != typeof i.pageSelector && (i.pageSelector = "> " + i.pageNodetype), a.$allMenus = (a.$allMenus || e()).add(this.$menu), this.vars.opened = !1;
                var r = [s.offcanvas];
                "left" != n.position && r.push(s.mm(n.position)), "back" != n.zposition && r.push(s.mm(n.zposition)), this.$menu.addClass(r.join(" ")).parent().removeClass(s.wrapper), this.setPage(a.$page), this._initBlocker(), this["_initWindow_" + o](), this.$menu[i.menuInjectMethod + "To"](i.menuWrapperSelector)
            }
        }, add: function () {
            s = e[t]._c, n = e[t]._d, i = e[t]._e, s.add("offcanvas slideout modal background opening blocker page"), n.add("style"), i.add("resize")
        }, clickAnchor: function (e) {
            if (!this.opts[o])return !1;
            var t = this.$menu.attr("id");
            if (t && t.length && (this.conf.clone && (t = s.umm(t)), e.is('[href="#' + t + '"]')))return this.open(), !0;
            if (a.$page) {
                var t = a.$page.attr("id");
                return t && t.length && e.is('[href="#' + t + '"]') ? (this.close(), !0) : !1
            }
        }
    }, e[t].defaults[o] = {
        position: "left",
        zposition: "back",
        modal: !1,
        moveBackground: !0
    }, e[t].configuration[o] = {
        pageNodetype: "div",
        pageSelector: null,
        menuWrapperSelector: "body",
        menuInjectMethod: "prepend"
    }, e[t].prototype.open = function () {
        if (!this.vars.opened) {
            var e = this;
            this._openSetup(), setTimeout(function () {
                e._openFinish()
            }, this.conf.openingInterval), this.trigger("open")
        }
    }, e[t].prototype._openSetup = function () {
        var e = this;
        this.closeAllOthers(), a.$page.data(n.style, a.$page.attr("style") || ""), a.$wndw.trigger(i.resize + "-offcanvas", [!0]);
        var t = [s.opened];
        this.opts[o].modal && t.push(s.modal), this.opts[o].moveBackground && t.push(s.background), "left" != this.opts[o].position && t.push(s.mm(this.opts[o].position)), "back" != this.opts[o].zposition && t.push(s.mm(this.opts[o].zposition)), this.opts.extensions && t.push(this.opts.extensions), a.$html.addClass(t.join(" ")), setTimeout(function () {
            e.vars.opened = !0
        }, this.conf.openingInterval), this.$menu.addClass(s.current + " " + s.opened)
    }, e[t].prototype._openFinish = function () {
        var e = this;
        this.__transitionend(a.$page, function () {
            e.trigger("opened")
        }, this.conf.transitionDuration), a.$html.addClass(s.opening), this.trigger("opening")
    }, e[t].prototype.close = function () {
        if (this.vars.opened) {
            var e = this;
            this.__transitionend(a.$page, function () {
                e.$menu.removeClass(s.current).removeClass(s.opened), a.$html.removeClass(s.opened).removeClass(s.modal).removeClass(s.background).removeClass(s.mm(e.opts[o].position)).removeClass(s.mm(e.opts[o].zposition)), e.opts.extensions && a.$html.removeClass(e.opts.extensions), a.$page.attr("style", a.$page.data(n.style)), e.vars.opened = !1, e.trigger("closed")
            }, this.conf.transitionDuration), a.$html.removeClass(s.opening), this.trigger("close"), this.trigger("closing")
        }
    }, e[t].prototype.closeAllOthers = function () {
        a.$allMenus.not(this.$menu).each(function () {
            var o = e(this).data(t);
            o && o.close && o.close()
        })
    }, e[t].prototype.setPage = function (t) {
        t && t.length || (t = e(this.conf[o].pageSelector, a.$body), t.length > 1 && (t = t.wrapAll("<" + this.conf[o].pageNodetype + " />").parent())), t.attr("id", t.attr("id") || this.__getUniqueId()), t.addClass(s.page + " " + s.slideout), a.$page = t, this.trigger("setPage", t)
    }, e[t].prototype["_initWindow_" + o] = function () {
        a.$wndw.off(i.keydown + "-offcanvas").on(i.keydown + "-offcanvas", function (e) {
            return a.$html.hasClass(s.opened) && 9 == e.keyCode ? (e.preventDefault(), !1) : void 0
        });
        var e = 0;
        a.$wndw.off(i.resize + "-offcanvas").on(i.resize + "-offcanvas", function (t, o) {
            if (o || a.$html.hasClass(s.opened)) {
                var n = a.$wndw.height();
                (o || n != e) && (e = n, a.$page.css("minHeight", n))
            }
        })
    }, e[t].prototype._initBlocker = function () {
        var t = this;
        a.$blck || (a.$blck = e('<div id="' + s.blocker + '" class="' + s.slideout + '" />')), a.$blck.appendTo(a.$body).off(i.touchstart + "-offcanvas " + i.touchmove + "-offcanvas").on(i.touchstart + "-offcanvas " + i.touchmove + "-offcanvas", function (e) {
            e.preventDefault(), e.stopPropagation(), a.$blck.trigger(i.mousedown + "-offcanvas")
        }).off(i.mousedown + "-offcanvas").on(i.mousedown + "-offcanvas", function (e) {
            e.preventDefault(), a.$html.hasClass(s.modal) || (t.closeAllOthers(), t.close())
        })
    };
    var s, n, i, a
}(jQuery);
/*
 * jQuery mmenu autoHeight addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (t) {
    var e = "mmenu", i = "autoHeight";
    t[e].addons[i] = {
        setup: function () {
            if (this.opts.offCanvas) {
                switch (this.opts.offCanvas.position) {
                    case"left":
                    case"right":
                        return
                }
                var n = this, o = this.opts[i];
                if (this.conf[i], h = t[e].glbl, "boolean" == typeof o && o && (o = {height: "auto"}), "object" != typeof o && (o = {}), o = this.opts[i] = t.extend(!0, {}, t[e].defaults[i], o), "auto" == o.height) {
                    this.$menu.addClass(s.autoheight);
                    var u = function (t) {
                        var e = this.$menu.children("." + s.current);
                        _top = parseInt(e.css("top"), 10) || 0, _bot = parseInt(e.css("bottom"), 10) || 0, this.$menu.addClass(s.measureheight), t = t || this.$menu.children("." + s.current), t.is("." + s.vertical) && (t = t.parents("." + s.panel).not("." + s.vertical).first()), this.$menu.height(t.outerHeight() + _top + _bot).removeClass(s.measureheight)
                    };
                    this.bind("update", u), this.bind("openPanel", u), this.bind("closePanel", u), this.bind("open", u), h.$wndw.off(a.resize + "-autoheight").on(a.resize + "-autoheight", function () {
                        u.call(n)
                    })
                }
            }
        }, add: function () {
            s = t[e]._c, n = t[e]._d, a = t[e]._e, s.add("autoheight measureheight"), a.add("resize")
        }, clickAnchor: function () {
        }
    }, t[e].defaults[i] = {height: "default"};
    var s, n, a, h
}(jQuery);
/*
 * jQuery mmenu backButton addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (o) {
    var t = "mmenu", n = "backButton";
    o[t].addons[n] = {
        setup: function () {
            if (this.opts.offCanvas) {
                var i = this, e = this.opts[n];
                if (this.conf[n], a = o[t].glbl, "boolean" == typeof e && (e = {close: e}), "object" != typeof e && (e = {}), e = o.extend(!0, {}, o[t].defaults[n], e), e.close) {
                    var c = "#" + i.$menu.attr("id");
                    this.bind("opened", function () {
                        location.hash != c && history.pushState(null, document.title, c)
                    }), o(window).on("popstate", function (o) {
                        a.$html.hasClass(s.opened) ? (o.stopPropagation(), i.close()) : location.hash == c && (o.stopPropagation(), i.open())
                    })
                }
            }
        }, add: function () {
            return window.history && window.history.pushState ? (s = o[t]._c, i = o[t]._d, e = o[t]._e, void 0) : (o[t].addons[n].setup = function () {
            }, void 0)
        }, clickAnchor: function () {
        }
    }, o[t].defaults[n] = {close: !1};
    var s, i, e, a
}(jQuery);
/*
 * jQuery mmenu buttonbars addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (t) {
    var n = "mmenu", i = "buttonbars";
    t[n].addons[i] = {
        setup: function () {
            this.opts[i], this.conf[i], s = t[n].glbl, this.bind("init", function (n) {
                this.__refactorClass(t("div", n), this.conf.classNames[i].buttonbar, "buttonbar"), t("." + a.buttonbar, n).each(function () {
                    var n = t(this), i = n.children().not("input"), o = n.children().filter("input");
                    n.addClass(a.buttonbar + "-" + i.length), o.each(function () {
                        var n = t(this), a = i.filter('label[for="' + n.attr("id") + '"]');
                        a.length && n.insertBefore(a)
                    })
                })
            })
        }, add: function () {
            a = t[n]._c, o = t[n]._d, r = t[n]._e, a.add("buttonbar")
        }, clickAnchor: function () {
        }
    }, t[n].configuration.classNames[i] = {buttonbar: "Buttonbar"};
    var a, o, r, s
}(jQuery);
/*
 * jQuery mmenu counters addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (t) {
    var n = "mmenu", e = "counters";
    t[n].addons[e] = {
        setup: function () {
            var c = this, o = this.opts[e];
            this.conf[e], s = t[n].glbl, "boolean" == typeof o && (o = {
                add: o,
                update: o
            }), "object" != typeof o && (o = {}), o = this.opts[e] = t.extend(!0, {}, t[n].defaults[e], o), this.bind("init", function (n) {
                this.__refactorClass(t("em", n), this.conf.classNames[e].counter, "counter")
            }), o.add && this.bind("init", function (n) {
                n.each(function () {
                    var n = t(this).data(a.parent);
                    n && (n.children("em." + i.counter).length || n.prepend(t('<em class="' + i.counter + '" />')))
                })
            }), o.update && this.bind("update", function () {
                this.$menu.find("." + i.panel).each(function () {
                    var n = t(this), e = n.data(a.parent);
                    if (e) {
                        var s = e.children("em." + i.counter);
                        s.length && (n = n.children("." + i.listview), n.length && s.html(c.__filterListItems(n.children()).length))
                    }
                })
            })
        }, add: function () {
            i = t[n]._c, a = t[n]._d, c = t[n]._e, i.add("counter search noresultsmsg")
        }, clickAnchor: function () {
        }
    }, t[n].defaults[e] = {add: !1, update: !1}, t[n].configuration.classNames[e] = {counter: "Counter"};
    var i, a, c, s
}(jQuery);
/*
 * jQuery mmenu dividers addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (i) {
    var e = "mmenu", s = "dividers";
    i[e].addons[s] = {
        setup: function () {
            var n = this, a = this.opts[s];
            if (this.conf[s], l = i[e].glbl, "boolean" == typeof a && (a = {
                    add: a,
                    fixed: a
                }), "object" != typeof a && (a = {}), a = this.opts[s] = i.extend(!0, {}, i[e].defaults[s], a), this.bind("init", function () {
                    this.__refactorClass(i("li", this.$menu), this.conf.classNames[s].collapsed, "collapsed")
                }), a.add && this.bind("init", function (e) {
                    switch (a.addTo) {
                        case"panels":
                            var s = e;
                            break;
                        default:
                            var s = i(a.addTo, this.$menu).filter("." + d.panel)
                    }
                    i("." + d.divider, s).remove(), s.find("." + d.listview).not("." + d.vertical).each(function () {
                        var e = "";
                        n.__filterListItems(i(this).children()).each(function () {
                            var s = i.trim(i(this).children("a, span").text()).slice(0, 1).toLowerCase();
                            s != e && s.length && (e = s, i('<li class="' + d.divider + '">' + s + "</li>").insertBefore(this))
                        })
                    })
                }), a.collapse && this.bind("init", function (e) {
                    i("." + d.divider, e).each(function () {
                        var e = i(this), s = e.nextUntil("." + d.divider, "." + d.collapsed);
                        s.length && (e.children("." + d.subopen).length || (e.wrapInner("<span />"), e.prepend('<a href="#" class="' + d.subopen + " " + d.fullsubopen + '" />')))
                    })
                }), a.fixed) {
                var o = function (e) {
                    e = e || this.$menu.children("." + d.current);
                    var s = e.find("." + d.divider).not("." + d.hidden);
                    if (s.length) {
                        this.$menu.addClass(d.hasdividers);
                        var n = e.scrollTop() || 0, t = "";
                        e.is(":visible") && e.find("." + d.divider).not("." + d.hidden).each(function () {
                            i(this).position().top + n < n + 1 && (t = i(this).text())
                        }), this.$fixeddivider.text(t)
                    } else this.$menu.removeClass(d.hasdividers)
                };
                this.$fixeddivider = i('<ul class="' + d.listview + " " + d.fixeddivider + '"><li class="' + d.divider + '"></li></ul>').prependTo(this.$menu).children(), this.bind("openPanel", o), this.bind("init", function (e) {
                    e.off(t.scroll + "-dividers " + t.touchmove + "-dividers").on(t.scroll + "-dividers " + t.touchmove + "-dividers", function () {
                        o.call(n, i(this))
                    })
                })
            }
        }, add: function () {
            d = i[e]._c, n = i[e]._d, t = i[e]._e, d.add("collapsed uncollapsed fixeddivider hasdividers"), t.add("scroll")
        }, clickAnchor: function (i, e) {
            if (this.opts[s].collapse && e) {
                var n = i.parent();
                if (n.is("." + d.divider)) {
                    var t = n.nextUntil("." + d.divider, "." + d.collapsed);
                    return n.toggleClass(d.opened), t[n.hasClass(d.opened) ? "addClass" : "removeClass"](d.uncollapsed), !0
                }
            }
            return !1
        }
    }, i[e].defaults[s] = {
        add: !1,
        addTo: "panels",
        fixed: !1,
        collapse: !1
    }, i[e].configuration.classNames[s] = {collapsed: "Collapsed"};
    var d, n, t, l
}(jQuery);
/*
 * jQuery mmenu dragOpen addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (e) {
    function t(e, t, n) {
        return t > e && (e = t), e > n && (e = n), e
    }

    var n = "mmenu", o = "dragOpen";
    e[n].addons[o] = {
        setup: function () {
            if (this.opts.offCanvas) {
                var i = this, a = this.opts[o], p = this.conf[o];
                if (r = e[n].glbl, "boolean" == typeof a && (a = {open: a}), "object" != typeof a && (a = {}), a = this.opts[o] = e.extend(!0, {}, e[n].defaults[o], a), a.open) {
                    var d, f, c, u, h, l = {}, m = 0, g = !1, v = !1, w = 0, _ = 0;
                    switch (this.opts.offCanvas.position) {
                        case"left":
                        case"right":
                            l.events = "panleft panright", l.typeLower = "x", l.typeUpper = "X", v = "width";
                            break;
                        case"top":
                        case"bottom":
                            l.events = "panup pandown", l.typeLower = "y", l.typeUpper = "Y", v = "height"
                    }
                    switch (this.opts.offCanvas.position) {
                        case"right":
                        case"bottom":
                            l.negative = !0, u = function (e) {
                                e >= r.$wndw[v]() - a.maxStartPos && (m = 1)
                            };
                            break;
                        default:
                            l.negative = !1, u = function (e) {
                                e <= a.maxStartPos && (m = 1)
                            }
                    }
                    switch (this.opts.offCanvas.position) {
                        case"left":
                            l.open_dir = "right", l.close_dir = "left";
                            break;
                        case"right":
                            l.open_dir = "left", l.close_dir = "right";
                            break;
                        case"top":
                            l.open_dir = "down", l.close_dir = "up";
                            break;
                        case"bottom":
                            l.open_dir = "up", l.close_dir = "down"
                    }
                    switch (this.opts.offCanvas.zposition) {
                        case"front":
                            h = function () {
                                return this.$menu
                            };
                            break;
                        default:
                            h = function () {
                                return e("." + s.slideout)
                            }
                    }
                    var b = this.__valueOrFn(a.pageNode, this.$menu, r.$page);
                    "string" == typeof b && (b = e(b));
                    var y = new Hammer(b[0], a.vendors.hammer);
                    y.on("panstart", function (e) {
                        u(e.center[l.typeLower]), r.$slideOutNodes = h(), g = l.open_dir
                    }).on(l.events + " panend", function (e) {
                        m > 0 && e.preventDefault()
                    }).on(l.events, function (e) {
                        if (d = e["delta" + l.typeUpper], l.negative && (d = -d), d != w && (g = d >= w ? l.open_dir : l.close_dir), w = d, w > a.threshold && 1 == m) {
                            if (r.$html.hasClass(s.opened))return;
                            m = 2, i._openSetup(), i.trigger("opening"), r.$html.addClass(s.dragging), _ = t(r.$wndw[v]() * p[v].perc, p[v].min, p[v].max)
                        }
                        2 == m && (f = t(w, 10, _) - ("front" == i.opts.offCanvas.zposition ? _ : 0), l.negative && (f = -f), c = "translate" + l.typeUpper + "(" + f + "px )", r.$slideOutNodes.css({
                            "-webkit-transform": "-webkit-" + c,
                            transform: c
                        }))
                    }).on("panend", function () {
                        2 == m && (r.$html.removeClass(s.dragging), r.$slideOutNodes.css("transform", ""), i[g == l.open_dir ? "_openFinish" : "close"]()), m = 0
                    })
                }
            }
        }, add: function () {
            return "function" != typeof Hammer || Hammer.VERSION < 2 ? (e[n].addons[o].setup = function () {
            }, void 0) : (s = e[n]._c, i = e[n]._d, a = e[n]._e, s.add("dragging"), void 0)
        }, clickAnchor: function () {
        }
    }, e[n].defaults[o] = {
        open: !1,
        maxStartPos: 100,
        threshold: 50,
        vendors: {hammer: {}}
    }, e[n].configuration[o] = {width: {perc: .8, min: 140, max: 440}, height: {perc: .8, min: 140, max: 880}};
    var s, i, a, r
}(jQuery);
/*
 * jQuery mmenu fixedElements addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (i) {
    var s = "mmenu", a = "fixedElements";
    i[s].addons[a] = {
        setup: function () {
            if (this.opts.offCanvas) {
                this.opts[a], this.conf[a], t = i[s].glbl;
                var d = function (i) {
                    var s = this.conf.classNames[a].fixed;
                    this.__refactorClass(i.find("." + s), s, "fixed").appendTo(t.$body).addClass(n.slideout)
                };
                d.call(this, t.$page), this.bind("setPage", d)
            }
        }, add: function () {
            n = i[s]._c, d = i[s]._d, e = i[s]._e, n.add("fixed")
        }, clickAnchor: function () {
        }
    }, i[s].configuration.classNames[a] = {fixed: "Fixed"};
    var n, d, e, t
}(jQuery);
/*
 * jQuery mmenu footer addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (t) {
    var e = "mmenu", o = "footer";
    t[e].addons[o] = {
        setup: function () {
            var i = this.opts[o];
            if (this.conf[o], a = t[e].glbl, "boolean" == typeof i && (i = {
                    add: i,
                    update: i
                }), "object" != typeof i && (i = {}), i = this.opts[o] = t.extend(!0, {}, t[e].defaults[o], i), i.add) {
                var s = i.content ? i.content : i.title;
                t('<div class="' + n.footer + '" />').appendTo(this.$menu).append(s), this.$menu.addClass(n.hasfooter)
            }
            if (this.$footer = this.$menu.children("." + n.footer), i.update && this.$footer && this.$footer.length) {
                var d = function (e) {
                    e = e || this.$menu.children("." + n.current);
                    var s = t("." + this.conf.classNames[o].panelFooter, e).html() || i.title;
                    this.$footer[s ? "removeClass" : "addClass"](n.hidden), this.$footer.html(s)
                };
                this.bind("openPanel", d), this.bind("init", function () {
                    d.call(this, this.$menu.children("." + n.current))
                })
            }
        }, add: function () {
            n = t[e]._c, i = t[e]._d, s = t[e]._e, n.add("footer hasfooter")
        }, clickAnchor: function () {
        }
    }, t[e].defaults[o] = {
        add: !1,
        content: !1,
        title: "",
        update: !1
    }, t[e].configuration.classNames[o] = {panelFooter: "Footer"};
    var n, i, s, a
}(jQuery);
/*
 * jQuery mmenu header addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (e) {
    var t = "mmenu", a = "header";
    e[t].addons[a] = {
        setup: function () {
            var i = this.opts[a];
            if (this.conf[a], s = e[t].glbl, "boolean" == typeof i && (i = {
                    add: i,
                    update: i
                }), "object" != typeof i && (i = {}), "undefined" == typeof i.content && (i.content = ["prev", "title", "next"]), i = this.opts[a] = e.extend(!0, {}, e[t].defaults[a], i), i.add) {
                if (i.content instanceof Array) {
                    for (var d = e("<div />"), h = 0, l = i.content.length; l > h; h++)switch (i.content[h]) {
                        case"prev":
                        case"next":
                        case"close":
                            d.append('<a class="' + n[i.content[h]] + " " + n.btn + '" href="#"></a>');
                            break;
                        case"title":
                            d.append('<a class="' + n.title + '"></a>');
                            break;
                        default:
                            d.append(i.content[h])
                    }
                    d = d.html()
                } else var d = i.content;
                e('<div class="' + n.header + '" />').prependTo(this.$menu).append(d), this.$menu.addClass(n.hasheader), this.bind("init", function (e) {
                    e.removeClass(n.hasheader)
                })
            }
            if (this.$header = this.$menu.children("." + n.header), i.update && this.$header && this.$header.length) {
                var c = this.$header.find("." + n.title), o = this.$header.find("." + n.prev), f = this.$header.find("." + n.next), p = this.$header.find("." + n.close), u = function (e) {
                    e = e || this.$menu.children("." + n.current);
                    var t = e.find("." + this.conf.classNames[a].panelHeader), s = e.find("." + this.conf.classNames[a].panelPrev), d = e.find("." + this.conf.classNames[a].panelNext), h = e.data(r.parent), l = t.html(), p = s.attr("href"), u = d.attr("href"), v = !1, m = s.html(), $ = d.html();
                    switch (l || (l = e.children("." + n.header).children("." + n.title).html()), l || (l = i.title), p || (p = e.children("." + n.header).children("." + n.prev).attr("href")), i.titleLink) {
                        case"anchor":
                            var v = h ? h.children("a").not("." + n.next).attr("href") : !1;
                            break;
                        case"panel":
                            var v = p
                    }
                    c[v ? "attr" : "removeAttr"]("href", v), c[l ? "removeClass" : "addClass"](n.hidden), c.html(l), o[p ? "attr" : "removeAttr"]("href", p), o[p || m ? "removeClass" : "addClass"](n.hidden), o.html(m), f[u ? "attr" : "removeAttr"]("href", u), f[u || $ ? "removeClass" : "addClass"](n.hidden), f.html($)
                };
                if (this.bind("openPanel", u), this.bind("init", function () {
                        u.call(this, this.$menu.children("." + n.current))
                    }), this.opts.offCanvas) {
                    var v = function (e) {
                        p.attr("href", "#" + e.attr("id"))
                    };
                    v.call(this, s.$page), this.bind("setPage", v)
                }
            }
        }, add: function () {
            n = e[t]._c, r = e[t]._d, i = e[t]._e, n.add("close")
        }, clickAnchor: function () {
        }
    }, e[t].defaults[a] = {
        add: !1,
        title: "Menu",
        titleLink: "panel",
        update: !1
    }, e[t].configuration.classNames[a] = {panelHeader: "Header", panelNext: "Next", panelPrev: "Prev"};
    var n, r, i, s
}(jQuery);
/*
 * jQuery mmenu searchfield addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (e) {
    function s(e) {
        switch (e) {
            case 9:
            case 16:
            case 17:
            case 18:
            case 37:
            case 38:
            case 39:
            case 40:
                return !0
        }
        return !1
    }

    var a = "mmenu", n = "searchfield";
    e[a].addons[n] = {
        setup: function () {
            var o = this, d = this.opts[n], c = this.conf[n];
            r = e[a].glbl, "boolean" == typeof d && (d = {
                add: d,
                search: d
            }), "object" != typeof d && (d = {}), d = this.opts[n] = e.extend(!0, {}, e[a].defaults[n], d), this.bind("init", function (a) {
                if (d.add) {
                    switch (d.addTo) {
                        case"menu":
                            var n = this.$menu;
                            break;
                        case"panels":
                            var n = a;
                            break;
                        default:
                            var n = e(d.addTo, this.$menu).filter("." + t.panel)
                    }
                    n.each(function () {
                        var s = e(this);
                        if (!s.is("." + t.panel) || !s.is("." + t.vertical)) {
                            if (!s.children("." + t.search).length) {
                                var a = c.form ? "form" : "div", n = e("<" + a + ' class="' + t.search + '" />');
                                if (c.form && "object" == typeof c.form)for (var l in c.form)n.attr(l, c.form[l]);
                                n.append('<input placeholder="' + d.placeholder + '" type="text" autocomplete="off" />').prependTo(s), s.addClass(t.hassearch)
                            }
                            if (d.noResults && (s.is("." + t.menu) && (s = s.children("." + t.panel).first()), !s.children("." + t.noresultsmsg).length)) {
                                var i = s.children("." + t.listview);
                                e('<div class="' + t.noresultsmsg + '" />').append(d.noResults)[i.length ? "insertBefore" : "prependTo"](i.length ? i : s)
                            }
                        }
                    })
                }
                d.search && e("." + t.search, this.$menu).each(function () {
                    var a = e(this);
                    if ("menu" == d.addTo)var n = e("." + t.panel, o.$menu), r = o.$menu; else var n = a.closest("." + t.panel), r = n;
                    var c = a.children("input"), h = o.__findAddBack(n, "." + t.listview).children("li"), u = h.filter("." + t.divider), f = o.__filterListItems(h), p = "> a", v = p + ", > span", m = function () {
                        var s = c.val().toLowerCase();
                        n.scrollTop(0), f.add(u).addClass(t.hidden).find("." + t.fullsubopensearch).removeClass(t.fullsubopen).removeClass(t.fullsubopensearch), f.each(function () {
                            var a = e(this), n = p;
                            (d.showTextItems || d.showSubPanels && a.find("." + t.next)) && (n = v), e(n, a).text().toLowerCase().indexOf(s) > -1 && a.add(a.prevAll("." + t.divider).first()).removeClass(t.hidden)
                        }), d.showSubPanels && n.each(function () {
                            var s = e(this);
                            o.__filterListItems(s.find("." + t.listview).children()).each(function () {
                                var s = e(this), a = s.data(l.sub);
                                s.removeClass(t.nosubresults), a && a.find("." + t.listview).children().removeClass(t.hidden)
                            })
                        }), e(n.get().reverse()).each(function (s) {
                            var a = e(this), n = a.data(l.parent);
                            n && (o.__filterListItems(a.find("." + t.listview).children()).length ? (n.hasClass(t.hidden) && n.children("." + t.next).not("." + t.fullsubopen).addClass(t.fullsubopen).addClass(t.fullsubopensearch), n.removeClass(t.hidden).removeClass(t.nosubresults).prevAll("." + t.divider).first().removeClass(t.hidden)) : "menu" == d.addTo && (a.hasClass(t.opened) && setTimeout(function () {
                                o.openPanel(n.closest("." + t.panel))
                            }, 1.5 * (s + 1) * o.conf.openingInterval), n.addClass(t.nosubresults)))
                        }), r[f.not("." + t.hidden).length ? "removeClass" : "addClass"](t.noresults), this.update()
                    };
                    c.off(i.keyup + "-searchfield " + i.change + "-searchfield").on(i.keyup + "-searchfield", function (e) {
                        s(e.keyCode) || m.call(o)
                    }).on(i.change + "-searchfield", function () {
                        m.call(o)
                    })
                })
            })
        }, add: function () {
            t = e[a]._c, l = e[a]._d, i = e[a]._e, t.add("search hassearch noresultsmsg noresults nosubresults fullsubopensearch"), i.add("change keyup")
        }, clickAnchor: function () {
        }
    }, e[a].defaults[n] = {
        add: !1,
        addTo: "menu",
        search: !1,
        placeholder: "Search",
        noResults: "No results found.",
        showTextItems: !1,
        showSubPanels: !0
    }, e[a].configuration[n] = {form: !1};
    var t, l, i, r
}(jQuery);
/*
 * jQuery mmenu sectionIndexer addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (e) {
    var a = "mmenu", r = "sectionIndexer";
    e[a].addons[r] = {
        setup: function () {
            var n = this, s = this.opts[r];
            this.conf[r], d = e[a].glbl, "boolean" == typeof s && (s = {add: s}), "object" != typeof s && (s = {}), s = this.opts[r] = e.extend(!0, {}, e[a].defaults[r], s), this.bind("init", function (a) {
                if (s.add) {
                    switch (s.addTo) {
                        case"panels":
                            var r = a;
                            break;
                        default:
                            var r = e(s.addTo, this.$menu).filter("." + i.panel)
                    }
                    r.find("." + i.divider).closest("." + i.panel).addClass(i.hasindexer)
                }
                if (!this.$indexer && this.$menu.children("." + i.hasindexer).length) {
                    this.$indexer = e('<div class="' + i.indexer + '" />').prependTo(this.$menu).append('<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a><a href="##">#</a>'), this.$indexer.children().on(h.mouseover + "-searchfield " + i.touchmove + "-searchfield", function () {
                        var a = e(this).attr("href").slice(1), r = n.$menu.children("." + i.current), h = r.find("." + i.listview), d = !1, s = r.scrollTop(), t = h.position().top + parseInt(h.css("margin-top"), 10) + parseInt(h.css("padding-top"), 10) + s;
                        r.scrollTop(0), h.children("." + i.divider).not("." + i.hidden).each(function () {
                            d === !1 && a == e(this).text().slice(0, 1).toLowerCase() && (d = e(this).position().top + t)
                        }), r.scrollTop(d !== !1 ? d : s)
                    });
                    var d = function (e) {
                        n.$menu[(e.hasClass(i.hasindexer) ? "add" : "remove") + "Class"](i.hasindexer)
                    };
                    this.bind("openPanel", d), d.call(this, this.$menu.children("." + i.current))
                }
            })
        }, add: function () {
            i = e[a]._c, n = e[a]._d, h = e[a]._e, i.add("indexer hasindexer"), h.add("mouseover touchmove")
        }, clickAnchor: function (e) {
            return e.parent().is("." + i.indexer) ? !0 : void 0
        }
    }, e[a].defaults[r] = {add: !1, addTo: "panels"};
    var i, n, h, d
}(jQuery);
/*
 * jQuery mmenu toggles addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function (t) {
    var e = "mmenu", c = "toggles";
    t[e].addons[c] = {
        setup: function () {
            var n = this;
            this.opts[c], this.conf[c], l = t[e].glbl, this.bind("init", function (e) {
                this.__refactorClass(t("input", e), this.conf.classNames[c].toggle, "toggle"), this.__refactorClass(t("input", e), this.conf.classNames[c].check, "check"), t("input." + s.toggle + ", input." + s.check, e).each(function () {
                    var e = t(this), c = e.closest("li"), i = e.hasClass(s.toggle) ? "toggle" : "check", l = e.attr("id") || n.__getUniqueId();
                    c.children('label[for="' + l + '"]').length || (e.attr("id", l), c.prepend(e), t('<label for="' + l + '" class="' + s[i] + '"></label>').insertBefore(c.children("a, span").last()))
                })
            })
        }, add: function () {
            s = t[e]._c, n = t[e]._d, i = t[e]._e, s.add("toggle check")
        }, clickAnchor: function () {
        }
    }, t[e].configuration.classNames[c] = {toggle: "Toggle", check: "Check"};
    var s, n, i, l
}(jQuery);