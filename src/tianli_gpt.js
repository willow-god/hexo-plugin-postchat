console.log("\n %c 洪墨摘要AI 博客文章摘要AI生成工具 %c https://ai.tianli0.top/ \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;");
var tianliGPTIsRunning = !1,
    tianliGPTLastRunTime = 0,
    tianliGPTIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48px" viewBox="0 0 48 48">
    <g id="&#x673A;&#x5668;&#x4EBA;" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path d="M34.717885,5.03561087 C36.12744,5.27055371 37.079755,6.60373651 36.84481,8.0132786 L35.7944,14.3153359 L38.375,14.3153359 C43.138415,14.3153359 47,18.1768855 47,22.9402569 L47,34.4401516 C47,39.203523 43.138415,43.0650727 38.375,43.0650727 L9.625,43.0650727 C4.861585,43.0650727 1,39.203523 1,34.4401516 L1,22.9402569 C1,18.1768855 4.861585,14.3153359 9.625,14.3153359 L12.2056,14.3153359 L11.15519,8.0132786 C10.920245,6.60373651 11.87256,5.27055371 13.282115,5.03561087 C14.69167,4.80066802 16.024865,5.7529743 16.25981,7.16251639 L17.40981,14.0624532 C17.423955,14.1470924 17.43373,14.2315017 17.43948,14.3153359 L30.56052,14.3153359 C30.56627,14.2313867 30.576045,14.1470924 30.59019,14.0624532 L31.74019,7.16251639 C31.975135,5.7529743 33.30833,4.80066802 34.717885,5.03561087 Z M38.375,19.4902885 L9.625,19.4902885 C7.719565,19.4902885 6.175,21.0348394 6.175,22.9402569 L6.175,34.4401516 C6.175,36.3455692 7.719565,37.89012 9.625,37.89012 L38.375,37.89012 C40.280435,37.89012 41.825,36.3455692 41.825,34.4401516 L41.825,22.9402569 C41.825,21.0348394 40.280435,19.4902885 38.375,19.4902885 Z M14.8575,23.802749 C16.28649,23.802749 17.445,24.9612484 17.445,26.3902253 L17.445,28.6902043 C17.445,30.1191812 16.28649,31.2776806 14.8575,31.2776806 C13.42851,31.2776806 12.27,30.1191812 12.27,28.6902043 L12.27,26.3902253 C12.27,24.9612484 13.42851,23.802749 14.8575,23.802749 Z M33.1425,23.802749 C34.57149,23.802749 35.73,24.9612484 35.73,26.3902253 L35.73,28.6902043 C35.73,30.1191812 34.57149,31.2776806 33.1425,31.2776806 C31.71351,31.2776806 30.555,30.1191812 30.555,28.6902043 L30.555,26.3902253 C30.555,24.9612484 31.71351,23.802749 33.1425,23.802749 Z" id="&#x5F62;&#x72B6;&#x7ED3;&#x5408;" fill-rule="nonzero"></path>
    </g>
    </svg>`,
    tianliGPTSystem = "";
class TianliGPT {
    insertAIDiv(i, e) {
        this.removeExistingAIDiv();
        let n = document.querySelector(i);
        e = e || i;
        var t, a, o, e = document.querySelector(e);
        if (!n) {
            let e = 0,
                t = setInterval(() => {
                    e += 300, (n = document.querySelector(i)) ? clearInterval(t) : 2e4 <= e && (clearInterval(t), console.log("洪墨摘要AI：在网页显示摘要AI框架失败，原因是没有找到需要注入的位置。如果本不打算在此页面展示摘要AI，可以忽略此提醒。"))
                }, 300)
        }
        document.querySelector(".post-TianliGPT") && tianliGPTIsRunning || (tianliGPTIsRunning = !0, (t = document.createElement("div")).className = "post-TianliGPT", "undefined" != typeof tianliGPT_theme && tianliGPT_theme && t.classList.add("gpttheme_" + tianliGPT_theme.toLowerCase()), (o = document.createElement("div")).className = "tianliGPT-title", t.appendChild(o), (a = document.createElement("i")).className = "tianliGPT-title-icon", o.appendChild(a), a.innerHTML = tianliGPTIcon, (a = document.createElement("div")).className = "tianliGPT-title-text", "undefined" == typeof tianliGPT_Title ? a.textContent = "AI摘要" : a.textContent = tianliGPT_Title, o.appendChild(a), (a = document.createElement("div")).className = "tianliGPT-tag", a.id = "tianliGPT-tag", "undefined" == typeof tianliGPT_Name ? a.textContent = "TianliGPT" : a.textContent = tianliGPT_Name, o.appendChild(a), (o = document.createElement("div")).className = "tianliGPT-explanation", o.innerHTML = "undefined" == typeof tianliGPT_loadingText || tianliGPT_loadingText ? '生成中...<span class="blinking-cursor"></span>' : '<span class="blinking-cursor"></span>', t.appendChild(o), e ? e.insertBefore(t, e.firstChild) : n && n.insertBefore(t, n.firstChild))
    }
    removeExistingAIDiv() {
        var e = document.querySelector(".post-TianliGPT");
        e && e.parentElement.removeChild(e)
    }
    getVerifiedTitle() {
        let t = ["#thread_subject", ".view_tit", "h1", ".postlist_top h2"];
        var e = (document.title || "").trim(),
            i = function() {
                for (var e of t) {
                    e = document.querySelector(e);
                    if (e && e.textContent.trim()) return (e = (e = e).cloneNode(!0)).querySelectorAll("em").forEach(e => e.remove()), e.textContent.trim()
                }
                return null
            }();
        return i && e.startsWith(i) ? i.trim() : e
    }
    getTitleAndContent() {
        try {
            let a = this.getVerifiedTitle(),
                o = () => {
                    var t = document.querySelector(tianliGPT_postSelector);
                    if (!t) return "";
                    var e, t = t.cloneNode(!0),
                        i = (t.querySelectorAll(".showhide, .locked, script, style, .authi, .post-TianliGPT, .code, .terminal_frame, .share-modal, .aplayer").forEach(e => e.remove()), "Discuz" == tianliGPTSystem && t.querySelectorAll(".txtlist.cl, .view_reply.cl, ignore_js_op, #hm_qrcode, .readthread_box", ".smplayerbox", ".it618_tieclick_ajax", ".attach_nopermission").forEach(e => e.remove()), t.querySelectorAll("p, strong, font, ul, li, ol, span, td"));
                    let n = "";
                    for (e of t.querySelectorAll("h1, h2, h3, h4, h5")) n += e.innerText + " ";
                    var a, o = [];
                    for (a of i) {
                        var l = Array.from(a.childNodes).filter(e => e.nodeType === Node.TEXT_NODE).map(e => e.textContent).join("").trim().replace(/https?:\/\/[^\s]+/g, "");
                        "" !== l.trim() && o.push(l)
                    }
                    if (0 === o.length) {
                        let e = t.innerText;
                        e = e.replace(/\n/g, " ").replace(/\s+/g, " ").trim(), n += e
                    } else n = o.join(" ");
                    return n.trim()
                },
                l = o();
            if (!l) return new Promise(i => {
                let e = 0,
                    n = () => {
                        e++, console.log(`洪墨摘要AI：文章内容为空，第${e}次重试...`), setTimeout(() => {
                            if (!(l = o()) && e < 2) n();
                            else if (l) {
                                let e = a + " " + l;
                                e = e.replace(/(\s*\n\s*)+/g, " ").trim();
                                var t = "undefined" != typeof tianliGPT_wordLimit ? tianliGPT_wordLimit : 1e3;
                                i(e.slice(0, t))
                            } else console.log("洪墨摘要AI：重试3次后内容仍为空，放弃获取。如果本不打算在此页面展示摘要AI，可以忽略此提醒。"), i("")
                        }, 1e3)
                    };
                n()
            });
            let e = a + " " + l;
            e = e.replace(/(\s*\n\s*)+/g, " ").trim();
            var t = "undefined" != typeof tianliGPT_wordLimit ? tianliGPT_wordLimit : 1e3;
            return e.slice(0, t)
        } catch (e) {
            return console.log("洪墨摘要AI：可能由于一个或多个情况在本页面没有正常运行，如果本不打算在此页面展示，可以忽略此提醒，原因出在获取文章容器中的内容失败，或者可能是在文章转换过程中失败。", e), ""
        }
    }
    old_getTitleAndContent() {
        try {
            var i, n, a = document.title,
                o = document.querySelector(tianliGPT_postSelector),
                l = (o || (console.log("洪墨摘要AI：找不到文章容器。将在2秒后重新检查。"), setTimeout(() => {
                    document.querySelector(tianliGPT_postSelector) ? (tianliGPTIsRunning = !1, this.checkURLAndRun()) : console.log("洪墨摘要AI：再次检查后仍找不到文章容器。如果本页面不打算展示摘要，可以忽略此提醒。请确保代码放置在正确的位置。")
                }, 500)), o.getElementsByTagName("p")),
                r = o.querySelectorAll("h1, h2, h3, h4, h5");
            let e = "";
            for (i of r) e += i.innerText + " ";
            for (n of l) {
                var s = n.innerText.replace(/https?:\/\/[^\s]+/g, "");
                e += s
            }
            var c = a + " " + e;
            let t = 1e3;
            return "undefined" != typeof tianliGPT_wordLimit && (t = tianliGPT_wordLimit), c.slice(0, t)
        } catch (e) {
            return console.log("洪墨摘要AI：可能由于一个或多个情况在本页面没有正常运行，如果本不打算在此页面展示，可以忽略此提醒，原因出在获取文章容器中的内容失败，或者可能是在文章转换过程中失败。", e), ""
        }
    }
    async fetchTianliGPT(e) {
        let t = "";
        var i = document.querySelector("script[data-postChat_key]");
        if (i) t = i.getAttribute("data-postChat_key");
        else {
            if ("undefined" == typeof tianliGPT_key) return {
                summary: "没有获取到key，代码可能没有安装正确。如果你需要在tianli_gpt文件引用前定义tianliGPT_key变量。详细请查看文档。"
            };
            t = tianliGPT_key
        }
        if ("5Q5mpqRK5DkwT1X9Gi5e" === t) return {
            summary: "请购买 key 使用，如果你能看到此条内容，则说明代码安装正确。"
        };
        var i = window.location.href,
            n = document.title;
        if ("Discuz" === tianliGPTSystem) {
            var a = new URL(i),
                o = "undefined" != typeof tianliGPT_discuz_tid ? tianliGPT_discuz_tid : "undefined" != typeof tid ? tid : null;
            if (!o) return {
                summary: "Discuz中需要携带tid参数，变量名为：tianliGPT_discuz_tid，例如：let tianliGPT_discuz_tid = '2'，当tid不存在的页面可以设为0。不允许不包含tid参数的Discuz请求。建议使用Discuz插件实现。"
            };
            i = a.origin + "/forum.php?mod=viewthread&tid=" + o
        }
        if ("ZBlog" === tianliGPTSystem) {
            a = new URL(i), o = "undefined" != typeof tianliGPT_zblog_id ? tianliGPT_zblog_id : null;
            if (!o) return {
                summary: "ZBlog中需要携带id参数，变量名为：tianliGPT_zblog_id，例如：let tianliGPT_zblog_id = '3'。不允许不包含id参数的ZBlog请求。"
            };
            i = a.origin + "/?id=" + o
        }
        let l = "zh-CN",
            r = (document.documentElement.lang && (l = document.documentElement.lang), JSON.stringify({
                content: e,
                key: t,
                url: i,
                title: n,
                system: tianliGPTSystem,
                language: l
            }));
        async function s() {
            let e = new AbortController;
            var i = setTimeout(() => e.abort(), 1e4);
            try {
                var n = await fetch("https://summary.tianli0.top/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: r,
                        signal: e.signal
                    }),
                    a = (clearTimeout(i), await n.text());
                let t;
                try {
                    t = JSON.parse(a)
                } catch (e) {
                    return console.warn("Response is not valid JSON:", a), {
                        summary: "服务器返回了无效的响应"
                    }
                }
                if (n.ok) return {
                    summary: t.summary
                };
                {
                    let e = "";
                    if (514 === n.status) return e = "TianliGPT is only available in mainland China, and is not yet open to overseas users, so stay tuned!", this.aiShowAnimation(e), {
                        summary: e
                    };
                    if (403 === n.status) switch (t.err_code) {
                        case 1:
                            return {
                                summary: e = '你的网站设置了Referrer-Policy为same-origin，这会导致Tianli无法验证你的请求来源。TianliGPT依赖refer进行来源判断，特别是meta标签的referrer属性需要修改，至少为origin。例如：<meta name="referrer" content="origin">'
                            };
                        case 2:
                            return {
                                summary: e = "你正在使用的账户Key或tianliGPT_key没有绑定当前网站，请检查当前的密钥是否绑定了当前网站地址。可以到summary.zhheo.com中绑定。"
                            };
                        case 3:
                            return {
                                summary: e = "参数缺失，请检查是否正确配置账户Key或tianliGPT_key"
                            };
                        case 4:
                            throw document.querySelectorAll(".post-TianliGPT").forEach(e => {
                                e.style.display = "none"
                            }), e = "Key错误或余额不足，请充值后请求新的文章", new Error("洪墨摘要AI：" + e);
                        case 5:
                            return document.querySelectorAll(".post-TianliGPT").forEach(e => {
                                e.style.display = "none"
                            }), {
                                summary: e = "未知错误"
                            };
                        case 6:
                            return document.querySelectorAll(".post-TianliGPT").forEach(e => {
                                e.style.display = "none"
                            }), {
                                summary: e = "数据库错误"
                            };
                        case 7:
                            return {
                                summary: e = t.err_msg
                            };
                        default:
                            return tianliGPT.aiShowAnimation("未知错误，请检查API文档"), {
                                summary: "未知错误，请检查API文档"
                            }
                    }
                }
            } catch (e) {
                return clearTimeout(i), "AbortError" === e.name ? (console.warn("请求超时"), {
                    summary: "请求超时"
                }) : (console.error("请求失败：", e), {
                    summary: "请求失败"
                })
            }
        }
        a = await s();
        return "timeout" === a ? (console.warn("第一次请求超时，尝试第二次请求..."), "timeout" === (o = await s()) || "error" === o ? {
            summary: "目前生成摘要任务排队较多，请稍候刷新再试"
        } : o) : a
    }
    aiShowAnimation(n) {
        let a = document.querySelector(".tianliGPT-explanation");
        if (!a) return;
        if ("undefined" != typeof tianliGPT_typingAnimate && !tianliGPT_typingAnimate) return a.innerHTML = n, void(tianliGPTIsRunning = !1);
        a.style.display = "block", a.innerHTML = "undefined" == typeof tianliGPT_loadingText || tianliGPT_loadingText ? '生成中...<span class="blinking-cursor"></span>' : '<span class="blinking-cursor"></span>', document.querySelector(".tianliGPT-tag").classList.add("loadingAI");
        let o, l = 0,
            r = performance.now(),
            s = () => {
                var e, t, i;
                l < n.length && o && (t = (e = performance.now()) - r, i = n.slice(l, l + 1), (/[，。！、？,.!?]/.test(i) ? 150 : 25) <= t && (a.innerText = n.slice(0, l + 1), r = e, ++l < n.length ? a.innerHTML = n.slice(0, l) + '<span class="blinking-cursor"></span>' : (a.innerHTML = n, a.style.display = "block", tianliGPTIsRunning = !1, c.disconnect(), document.querySelector(".tianliGPT-tag").classList.remove("loadingAI"))), requestAnimationFrame(s))
            },
            c = new IntersectionObserver(e => {
                e = e[0].isIntersecting;
                (o = e) && setTimeout(() => {
                    requestAnimationFrame(s)
                }, 200)
            }, {
                threshold: 0
            });
        var e = document.querySelector(".post-TianliGPT");
        c.observe(e)
    }
    async runTianliGPT() {
        if ("undefined" != typeof tianliGPT_postSelector) {
            if ("Discuz" === tianliGPTSystem) {
                var e = document.querySelector(tianliGPT_postSelector);
                if (e)
                    if (e.querySelector('a[href*="plugin.php?id=duceapp_vip&ac=pay&referer=forum.php"]')) return
            }
            e = await get_title_content_helper();
            e && console.log("TianliGPT本次提交的内容为：" + e), this.insertAIDiv(tianliGPT_postSelector, "undefined" != typeof tianliGPT_injectDom && tianliGPT_injectDom ? tianliGPT_injectDom : tianliGPT_postSelector), "https:" !== window.location.protocol ? this.aiShowAnimation("为了保证传输的安全性和可靠性，不支持在http协议下显示文章摘要。请为网站申请证书，并在summary.zhheo.com使用https协议的地址绑定即可。如果是本地或者局域网访问，可以忽略此警告。") : this.fetchTianliGPT(e).then(e => {
                let t = e.summary,
                    i;
                "undefined" != typeof tianliGPT_BeginningText ? i = tianliGPT_BeginningText : "undefined" != typeof postChatConfig && postChatConfig.beginningText ? i = postChatConfig.beginningText : "Discuz" === tianliGPTSystem && (i = "这个帖子"), i && (t.match(/^这篇文章[\u4e00-\u9fa5]{1,2}了/) ? t = t.replace(/^这篇文章[\u4e00-\u9fa5]{1,2}了/g, "" + i) : t.match(/^这篇文章通过/) && (t = t.replace(/^这篇文章通过/g, i + "通过"))), t = t.replace(/介绍了通过/g, "通过"), this.aiShowAnimation(t)
            })
        }
    }
    checkURLAndRun() {
        var e = Date.now();
        if (!(e - tianliGPTLastRunTime < 500)) {
            tianliGPTLastRunTime = e;
            e = document.querySelector('meta[name="generator"]');
            if (e && e.content.includes("WordPress")) {
                e = new URL(window.location.href);
                if (e.searchParams.has("preview") && "true" === e.searchParams.get("preview")) return void console.log("当前页面为WordPress预览模式，不执行摘要功能。")
            }
            if ("undefined" == typeof tianliGPT_postURL) this.attemptRunTianliGPT();
            else try {
                let e;
                e = (e => {
                    try {
                        return new RegExp(e), e.startsWith("/") && e.endsWith("/") && 2 < e.length
                    } catch (e) {
                        return !1
                    }
                })(tianliGPT_postURL) ? new RegExp(tianliGPT_postURL.slice(1, -1)) : (e => {
                    e = e.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
                    return new RegExp("^" + e.split(/\*+/).join(".*") + "$")
                })(tianliGPT_postURL);
                var t = window.location.href;
                e.test(t) ? this.attemptRunTianliGPT() : console.log(`洪墨摘要AI：当前 URL '${t}' 不符合规则 '${tianliGPT_postURL}'，所以我决定不执行摘要功能。`)
            } catch (e) {
                console.error("洪墨摘要AI：我没有看懂你编写的自定义链接规则，所以我决定不执行摘要功能", e)
            }
        }
    }
    attemptRunTianliGPT() {
        let t = 0,
            i = setInterval(() => {
                try {
                    this.tianliGPTCustomBlackList(), clearInterval(i)
                } catch (e) {
                    20 <= t && (clearInterval(i), console.error("洪墨摘要AI：获取自定义黑名单超时。多次尝试失败，停止尝试。", e)), t++
                }
            }, 200)
    }
    tianliGPTCustomBlackList() {
        "undefined" != typeof tianliGPT_blacklist && tianliGPT_blacklist ? fetch(tianliGPT_blacklist).then(e => e.json()).then(e => {
            e = e.blackurls;
            let t = window.location.href;
            e.some(e => {
                return new RegExp("^" + e.replace(/\*/g, ".*") + "$").test(t)
            }) ? console.log("洪墨摘要AI：URL在黑名单中，不执行摘要") : this.runTianliGPT()
        }).catch(e => {
            console.error("洪墨摘要AI：请求黑名单失败。Error fetching blacklist:", e), this.runTianliGPT()
        }) : this.runTianliGPT()
    }
}

function postchat_checkSystemType() {
    var e;
    "undefined" != typeof postChatConfig && postChatConfig.systemType ? tianliGPTSystem = postChatConfig.systemType : (e = document.querySelector('meta[name="generator"]')) && e.content.includes("Discuz") && (tianliGPTSystem = "Discuz")
}
async function get_title_content_helper() {
    let e;
    return e = "Discuz" === tianliGPTSystem ? await window.tianliGPT.getTitleAndContent() : window.tianliGPT.old_getTitleAndContent()
}
postchat_checkSystemType(), window.tianliGPT || (window.tianliGPT = new TianliGPT), document.addEventListener("DOMContentLoaded", function() {
        postchat_checkSystemType(), window.tianliGPT.checkURLAndRun()
    }), document.addEventListener("pjax:complete", function() {
        postchat_checkSystemType(), window.tianliGPT.checkURLAndRun()
    }), document.addEventListener("pjax:success", function() {
        tianliGPTIsRunning = !1
    }), window.addEventListener("popstate", function() {
        postchat_checkSystemType(), window.tianliGPT.checkURLAndRun()
    }), window.addEventListener("hashchange", function() {
        postchat_checkSystemType(), window.tianliGPT.checkURLAndRun()
    }),
    function(i) {
        var e = i.pushState;
        i.pushState = function(t) {
            if ("function" == typeof i.onpushstate)
                if ("undefined" != typeof pjaxLoading) {
                    let e = () => {
                        pjaxLoading ? setTimeout(e, 50) : i.onpushstate({
                            state: t
                        })
                    };
                    e()
                } else setTimeout(function() {
                    i.onpushstate({
                        state: t
                    })
                }, 200);
            return e.apply(i, arguments)
        }
    }(window.history), window.history.onpushstate = function(e) {
        postchat_checkSystemType(), window.tianliGPT.checkURLAndRun()
    };