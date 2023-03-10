!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.ReadingPositionIndicator = e())
    : (t.ReadingPositionIndicator = e());
})(this, function () {
  return (function (t) {
    function e(s) {
      if (r[s]) return r[s].exports;
      var o = (r[s] = { i: s, l: !1, exports: {} });
      return t[s].call(o.exports, o, o.exports, e), (o.l = !0), o.exports;
    }
    var r = {};
    return (
      (e.m = t),
      (e.c = r),
      (e.i = function (t) {
        return t;
      }),
      (e.d = function (t, r, s) {
        e.o(t, r) ||
          Object.defineProperty(t, r, {
            configurable: !1,
            enumerable: !0,
            get: s,
          });
      }),
      (e.n = function (t) {
        var r =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return e.d(r, "a", r), r;
      }),
      (e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (e.p = ""),
      e((e.s = 4))
    );
  })([
    function (t, e, r) {
      "use strict";
      t.exports = r(1).default;
    },
    function (t, e, r) {
      "use strict";
      function s(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var r = arguments[e];
              for (var s in r)
                Object.prototype.hasOwnProperty.call(r, s) && (t[s] = r[s]);
            }
            return t;
          },
        i = (function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var s = e[r];
              (s.enumerable = s.enumerable || !1),
                (s.configurable = !0),
                "value" in s && (s.writable = !0),
                Object.defineProperty(t, s.key, s);
            }
          }
          return function (e, r, s) {
            return r && t(e.prototype, r), s && t(e, s), e;
          };
        })();
      r(3);
      var n = r(2),
        a = (function () {
          function t(e) {
            s(this, t);
            var r = {
              progressBar: { show: !0, color: null, opacity: null },
              percentage: {
                show: !1,
                displayBeforeScroll: !1,
                color: null,
                opacity: null,
              },
              rpiArea: null,
            };
            (this.props = o({}, r, e)),
              (this.elems = {}),
              (this.state = {
                scroll: {
                  maxHeight: 1,
                  last_known_scroll_position: 0,
                  ticking: !1,
                },
                rpiArea: {},
                virtualDOM: {},
                DOM: {},
              });
          }
          return (
            i(t, [
              {
                key: "init",
                value: function () {
                  return (
                    (this._transformName = (0,
                    n.getTransformVendorPrefixAsString)()),
                    n.applyElements.call(this),
                    this._updateCalculationInformationAndSaveToState(),
                    n.applyConfiguration.call(this),
                    n.applyEventListeners.call(this),
                    this
                  );
                },
              },
              {
                key: "destroy",
                value: function () {
                  return (
                    window.removeEventListener("scroll", this._onScroll),
                    window.removeEventListener("resize", this._onResize),
                    this
                  );
                },
              },
              {
                key: "_updateRpiArea",
                value: function () {
                  if (this.elems.rpiArea) {
                    var t = this.elems.rpiArea.getBoundingClientRect(),
                      e = (0, n.getScrollPosition)();
                    this.state.rpiArea = {
                      top: t.top + e,
                      bottom: t.bottom + e,
                      height: t.height,
                    };
                  } else {
                    var r = (0, n.getDocumentHeight)();
                    this.state.rpiArea = { top: 0, bottom: r, height: r };
                  }
                },
              },
              {
                key: "_updateCalculationInformationAndSaveToState",
                value: function () {
                  this._updateRpiArea(),
                    (this.state.scroll.viewHeight = (0, n.getViewHeight)()),
                    (this.state.scroll.maxHeight =
                      this.state.rpiArea.height - this.state.scroll.viewHeight);
                },
              },
              {
                key: "_onScroll",
                value: function () {
                  var t = this;
                  (this.state.scroll.last_known_scroll_position = (0,
                  n.getScrollPosition)()),
                    this.state.scroll.ticking ||
                      window.requestAnimationFrame(function () {
                        t._updateProgressBar(
                          t.state.scroll.last_known_scroll_position || 0
                        ),
                          (t.state.scroll.ticking = !1);
                      }),
                    (this.state.scroll.ticking = !0);
                },
              },
              {
                key: "_updateProgressBar",
                value: function (t) {
                  this._updateVirtualDOM(t), this._updateDOM();
                },
              },
              {
                key: "_updateVirtualDOM",
                value: function (t) {
                  var e = this.state.scroll,
                    r = e.viewHeight,
                    s = e.maxHeight;
                  if (r >= this.state.rpiArea.height)
                    return (
                      (this.state.virtualDOM.progressBarPercentageTextContent =
                        ""),
                      void (this.state.virtualDOM.progressBarPercentage = "100")
                    );
                  if (t < this.state.rpiArea.top)
                    (this.state.virtualDOM.progressBarPercentageTextContent =
                      ""),
                      (this.state.virtualDOM.progressBarPercentage = "0"),
                      (this.state.virtualDOM.progressBarPositionStyleTransform =
                        "scaleX(0)");
                  else if (t > this.state.rpiArea.bottom - r)
                    (this.state.virtualDOM.progressBarPercentageTextContent =
                      ""),
                      (this.state.virtualDOM.progressBarPercentage = "100"),
                      (this.state.virtualDOM.progressBarPositionStyleTransform =
                        "scaleX(0)");
                  else {
                    var o = t - this.state.rpiArea.top,
                      i = Math.min(Math.round((100 * o) / Math.max(s, 1)), 100);
                    this.props.progressBar.show &&
                      (this.state.virtualDOM.progressBarPositionStyleTransform =
                        "scaleX(" + i / 100 + ")"),
                      this.props.percentage.show &&
                        (this.state.virtualDOM.progressBarPercentageTextContent =
                          i + "%"),
                      (this.state.virtualDOM.progressBarPercentage = "" + i);
                  }
                },
              },
              {
                key: "update",
                value: function () {
                  return (
                    this._updateCalculationInformationAndSaveToState(),
                    this._updateProgressBar((0, n.getScrollPosition)()),
                    this
                  );
                },
              },
              {
                key: "_updateDOM",
                value: function () {
                  var t = this.state.virtualDOM,
                    e = t.progressBarPercentageTextContent,
                    r = t.progressBarPositionStyleTransform,
                    s = t.progressBarPercentage;
                  e !== this.state.DOM.progressBarPercentageTextContent &&
                    ((this.state.DOM.progressBarPercentageTextContent = e),
                    (this.elems.progressBarPercentage.textContent = e)),
                    r !== this.state.DOM.progressBarPositionStyleTransform &&
                      ((this.state.DOM.progressBarPositionStyleTransform = r),
                      (this.elems.progressBarPosition.style[
                        this._transformName
                      ] = r)),
                    s !== this.state.DOM.progressBarPercentage &&
                      ((this.state.DOM.progressBarPercentage = s),
                      this.elems.progressBar.setAttribute("aria-valuenow", s));
                },
              },
            ]),
            t
          );
        })();
      e.default = a;
    },
    function (t, e, r) {
      "use strict";
      function s(t, e, r) {
        var s;
        return function () {
          var o = this,
            i = arguments,
            n = function () {
              (s = null), r || t.apply(o, i);
            },
            a = r && !s;
          clearTimeout(s), (s = setTimeout(n, e || 200)), a && t.apply(o, i);
        };
      }
      function o() {
        return window.pageYOffset || document.documentElement.scrollTop || 0;
      }
      function i() {
        var t = document.querySelector(".rpi-progress-bar");
        (this.elems.progressBar = t),
          (this.elems.progressBarPosition = t.querySelector(
            ".rpi-progress-bar__position"
          )),
          (this.elems.progressBarPercentage = t.querySelector(
            ".rpi-progress-bar__percentage"
          )),
          this.props.rpiArea &&
            (this.elems.rpiArea = document.querySelector(this.props.rpiArea));
      }
      function n() {
        var t = this.props,
          e = t.percentage,
          r = t.progressBar;
        r &&
          (r.color &&
            (this.elems.progressBarPosition.style.background = r.color),
          r.opacity &&
            (this.elems.progressBarPosition.style.opacity = r.opacity)),
          e &&
            (e.color &&
              (this.elems.progressBarPercentage.style.color = e.color),
            e.opacity &&
              (this.elems.progressBarPercentage.style.opacity = e.opacity),
            e.displayBeforeScroll && this._updateProgressBar(o()));
      }
      function a() {
        var t = this;
        (this._onResize = s(function () {
          t.update();
        }, 200)),
          (this._onScroll = this._onScroll.bind(this)),
          (this._onResize = this._onResize.bind(this)),
          window.addEventListener("scroll", this._onScroll),
          window.addEventListener("resize", this._onResize);
      }
      function l() {
        for (
          var t = document.createElement("div"),
            e = {
              transform: "transform",
              WebkitTransition: "webkitTransform",
              MsTransform: "msTransform",
            },
            r = 0;
          r < e.length;
          r += 1
        ) {
          var s = e[r];
          if (void 0 !== t.style[s]) return e[s];
        }
        return "transform";
      }
      function c() {
        return Math.max(
          document.documentElement.clientHeight,
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight
        );
      }
      function u() {
        return Math.max(window.innerHeight, 0);
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.debounce = s),
        (e.getScrollPosition = o),
        (e.applyElements = i),
        (e.applyConfiguration = n),
        (e.applyEventListeners = a),
        (e.getTransformVendorPrefixAsString = l),
        (e.getDocumentHeight = c),
        (e.getViewHeight = u);
    },
    function (t, e) {},
    function (t, e, r) {
      t.exports = r(0);
    },
  ]);
});
