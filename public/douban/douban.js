Douban=new Object();
Douban.errdetail=["","未知错误","文件过大","信息不全","域名错误","分类错误","用户错误","权限不足","没有文件","保存文件错误","不支持的文件格式","超时","文件格式有误","","添加文件出错","已经达到容量上限","不存在的相册","删除失败","错误的MP3文件","有禁用的内容,请修改重试"];
var trace=function(b){
    if(!/^http:\/\/(www|movie|music\.|book|douban\.fm)/.test(location.href)&&window.console&&window.console.log){
        console.log(b)
        }
    };

var report=function(b){
    $.get("/j/report?e="+b)
    };

Douban.EventMonitor=function(){
    this.listeners=new Object()
    };

Douban.EventMonitor.prototype.broadcast=function(c,f,d){
    var b=this.listeners[f];
    if(b!=null){
        for(var e in b){
            b[e](c,d)
            }
        }
        };

Douban.EventMonitor.prototype.subscribe=function(c,d){
    var b=this.listeners[c];
    if(b){
        b.push(d)
        }else{
        this.listeners[c]=[d]
        }
    };

Douban.EventMonitor.prototype.unsubscribe=function(c,d){
    var b=this.listener[c];
    if(b!=null){
        b=b.filter(function(g,f,e){
            return g!=d
            })
        }
    };

var event_monitor=new Douban.EventMonitor();
function load_event_monitor(root){
    var re=/a_(\w+)/;
    var fns={};

    $(".j",root).each(function(i){
        var m=re.exec(this.className);
        if(m){
            var f=fns[m[1]];
            if(!f){
                f=eval("Douban.init_"+m[1]);
                fns[m[1]]=f
                }
                f&&f(this)
            }
        })
}
function request_log_ad_displays(){
    $('div[id^="daslot"]').each(function(b){
        var c=$(this).attr("id");
        params=c.split("-");
        $.get("/j/da/view?da="+params[1]+"&dag="+params[2]+"&dac="+params[3]+"&p="+params[4]+"&kws="+params[5])
        })
    }
    $(function(){
    load_event_monitor(document)
    });
Douban.prettify_form=function(b){
    $("input:submit",b).each(function(d){
        var c=$('<a href="#" class="butt"></a>').text($(this).val());
        c.click(function(){
            if(clean_tip()){
                b.submit()
                }
                return false
            });
        $(this).hide().after(c)
        })
    };

var get_form_fields=function(b){
    var c={};

    $(":input",b).each(function(e){
        var d=this.name;
        if(this.type=="radio"){
            if(this.checked){
                c[d]=this.value
                }
            }else{
        if(this.type=="checkbox"){
            if(this.checked){
                c[d]=this.value
                }
            }else{
        if(this.type=="submit"){
            if(/selected/.test(this.className)){
                c[d]=this.value
                }
            }else{
        if(d){
            c[d]=this.value
            }
        }
    }
}
if(/notnull/.test(this.className)&&this.value==""){
    $(this).prev().addClass("errnotnull");
    c.err="notnull"
    }
});
return c
};

var remote_submit_json=function(f,e,c,g){
    var d=get_form_fields(f);
    if(d.err!=undefined){
        return
    }
    $(":submit,:input",f).attr("disabled",c==false?0:1);
    var b=g||f.action;
    $.post_withck(b,d,function(h){
        e(h)
        },"json")
    };

Douban.init_evb=function(o){
    var eid=$(o).attr("id").split("-")[1];
    $(o).submit(function(){
        var url="/j/entry/"+eid+"/vote";
        $.post_withck(url,function(ret){
            var r=eval("("+ret+")");
            event_monitor.broadcast(this,"entry_"+eid+"_voted",r);
            $(o).text("你的投票已经提交，谢谢。");
            $("#nf-"+eid).hide();
            $("#nf_s-"+eid).hide()
            });
        return false
        })
    };

Douban.init_evc=function(c){
    var b=$(c).attr("id").split("-")[1];
    event_monitor.subscribe("entry_"+b+"_voted",function(d,f){
        var e=f.rec_count;
        if(e){
            $(c).text(""+e+"人推荐").removeClass("hidden")
            }
        })
};

Douban.init_enb=function(c){
    var b=$(c).attr("id").split("-")[1];
    $(c).submit(function(){
        var d="/j/entry/"+b+"/nointerest";
        $.post_withck(d,function(e){
            $(c).text("你的投票已经提交，谢谢。");
            $("#a_evb-"+b+",#evb_s-"+b).hide()
            });
        return false
        })
    };

var voteuse_act=function(b,f,e,d){
    var c="/j/"+e+"/"+f+(b?"/useful":"/useless");
    $.postJSON_withck(c,{},function(i){
        if(i.result){
            if(d){
                var h=$("#ucount"+f+"u"),g=$("#ucount"+f+"l");
                if((h.text()==i.usecount)&&(g.text()==i.totalcount-i.usecount)&&(i.result!="notself")){
                    alert("你已经投过票了")
                    }
                    h.html(i.usecount);
                g.html(i.totalcount-i.usecount)
                }else{
                $("#voteuse_"+f).html('<span class="m gtleft">你的投票已经提交，谢谢。</span>');
                $("#userate_"+f).html('<p id="userate_%s" class="pl">'+i.usecount+"/"+i.totalcount+"的人觉得此评论有用:</p>")
                }
            }
        return false
    })
};

var voteuseful=function(e,c){
    var b=e.split("-");
    var d=(b[0]=="d")?"doulist":"review";
    return voteuse_act(true,b[1],d,c)
    };

var voteuseless=function(e,c){
    var b=e.split("-");
    var d=(b[0]=="d")?"doulist":"review";
    return voteuse_act(false,b[1],d,c)
    };

Douban.init_bef=function(h){
    var b=$(h).attr("id").split("entry-")[1],g=$(".unfolder",h),d=$(".folder",h),c=$(".entry-summary",h),e=$(".entry-full",h);
    g.click(function(){
        if(e.text()==""){
            var i=$('<div class="loadtip">正在载入...</div>');
            var f=setTimeout(function(){
                $(".source",h).before(i)
                },200);
            var j="/j/entry/"+b+"/";
            $.getJSON(j,function(k){
                clearTimeout(f);
                i.hide();
                $.post_withck(j+"view",{});
                e.html(k.content).find("a").attr("target","_blank");
                e.show();
                c.hide()
                })
            }else{
            e.show();
            c.hide()
            }
            g.hide();
        d.show();
        return false
        }).hover_fold("unfolder");
    d.click(function(){
        c.show();
        e.hide();
        d.hide();
        g.show()
        }).hover_fold("folder")
    };

Douban.init_unfolder_n=function(b){
    $(b).click(function(){
        var d=$(b).attr("id").split("-")[1];
        var c="/j/note/"+d+"/full";
        $.getJSON(c,function(e){
            $("#note_"+d+"_short").hide();
            $("#note_"+d+"_full").html(e.html);
            $("#note_"+d+"_full").show();
            $("#note_"+d+"_footer").show();
            $("#naf-"+d).hide();
            $("#nau-"+d).show();
            load_event_monitor($("#note_"+d+"_full"))
            });
        return false
        }).hover_fold("unfolder")
    };

Douban.init_folder_n=function(b){
    $(b).click(function(){
        var c=$(b).attr("id").split("-")[1];
        $("#note_"+c+"_full").hide();
        $("#note_"+c+"_short").show();
        $("#note_"+c+"_footer").hide();
        $(b).hide();
        $("#naf-"+c).show()
        }).hover_fold("folder")
    };

Douban.init_unfolder=function(b){
    $(b).click(function(){
        var e=b.id.split("-")[1];
        var c=b.rel.split("-")[1];
        var d="/j/review/"+e+"/fullinfo";
        $.getJSON(d,{
            show_works:c
        },function(f){
            var g=document.createElement("div");
            g.innerHTML=f.html;
            $("#review_"+e+"_short").hide();
            $("#review_"+e+"_full").html("").append(g);
            $("#review_"+e+"_full").show();
            $("#af-"+e).hide();
            $("#au-"+e).show();
            load_event_monitor($("#review_"+e+"_full"))
            });
        return false
        }).hover_fold("unfolder")
    };

Douban.init_folder=function(b){
    $(b).click(function(){
        var c=$(b).attr("id").split("-")[1];
        $("#review_"+c+"_full").hide();
        $("#review_"+c+"_short").show();
        $(b).hide();
        $("#af-"+c).show()
        }).hover_fold("folder")
    };

Douban.init_bevf=function(i){
    var e=$(i).attr("id").split("bevs-")[1];
    var g=$(".voters_header",i);
    if(!g.length){
        return
    }
    g.hover(function(){
        $(this).addClass("clickable_title")
        },function(){
        $(this).removeClass("clickable_title")
        });
    var d=$("#vsl",i);
    var c=$(".link",i);
    var b=$("#more_voters",i);
    var f=function(k){
        var j=$(".mv",i);
        if(j.length){
            var l=j.toggle().css("display");
            c.text(l=="none"?"更多推荐者":"隐藏");
            if(b.length){
                b.toggle().css("display")
                }
            }else{
        t=$("<li>正在装载...</li>");
        if(d.length){
            d.append(t)
            }else{
            g.after(d=$('<ul id="vsl" class="user-list pl indent"></ul>'));
            d.append(t)
            }
            var h="/j/entry/"+e+"/voters?start=8";
        $.getJSON(h,function(n){
            t.css("display","none");
            t.before($(n.html));
            if(b.length){
                b.css("display","none")
                }
            });
    $(".link",i).text("隐藏")
    }
    return false
};

g.click(f);
c.click(f)
};

Douban.init_guidelink=function(b){
    $(b).click(function(){
        window.open("/help/guide1","","width=640,height=400");
        return false
        })
    };

Douban.init_closelink=function(b){
    $('<a href="#">关闭</a>').appendTo($(b)).click(function(){
        window.close();
        return false
        })
    };

function ext_links(){
    es=$(".entry-summary");
    es.each(function(c){
        var b=$(es[c]).find("a");
        b.each(function(d){
            b[d].target="_blank"
            })
        })
    }
    Douban.init_confirm_link=function(f){
    if(/recc/.test(f.name)){
        var d=f.name.split("-");
        var e=$(f).attr("href").split("/");
        var b=e[0]!="http:"?e[2]:e[4];
        var c="/j/rec_comment";
        $(f).click(function(){
            var g=confirm("真的要删除?");
            if(g){
                $.getJSON(c,{
                    rid:d[1],
                    del_comment:d[2]
                    },function(){
                    $(f).parent().parent().parent().remove()
                    })
                }
                return false
            })
        }else{
        if(/sayc/.test(f.name)){
            var d=f.name.split("-");
            var e=$(f).attr("href").split("/");
            var b=e[0]!="http:"?e[2]:e[4];
            var c="/j/saying_comment";
            $(f).click(function(){
                var g=confirm("真的要删除?");
                if(g){
                    $.getJSON(c,{
                        id:d[1],
                        del_comment:d[2]
                        },function(){
                        $(f).parent().parent().parent().remove()
                        })
                    }
                    return false
                })
            }else{
            $(f).click(function(){
                var g=f.title||$(f).text();
                return confirm("真的要"+g+"?")
                })
            }
        }
};

var populate_tag_btns=function(g,h,b,e){
    if(b.length){
        var c=$("<dl><dt>"+g+"</dt></dl>"),f=$("<dd></dd>");
        $.each(b,function(k,d){
            var j=$('<span class="tagbtn"/>').addClass(e[d.toLowerCase()]?"rdact":"gract").text(d);
            f.append(j).append(" &nbsp; ")
            });
        c.append(f);
        h.append(c)
        }
    };

Douban.init_interest_form=function(f){
    var e={},c={};

    var b=function(h){
        if(e[h]){
            c[h]=true;
            $.each(e[h],function(k,j){
                $(j).removeClass("gract").addClass("rdact")
                })
            }
        };

var d=function(h){
    if(e[h]){
        delete c[h];
        $.each(e[h],function(k,j){
            $(j).removeClass("rdact").addClass("gract")
            })
        }
    };

var g=function(){
    var h=$.trim(f.tags.value.toLowerCase()).split(" "),i={};

    $.each(h,function(k,j){
        if(j!=""){
            b(j);
            i[j]=true
            }
        });
for(t in c){
    if(!i[t]){
        d(t)
        }
    }
};

g();
if($(f).data("comment")){
    f.comment.focus()
    }else{
    if($("#foldcollect").val()=="U"){
        f.tags.focus()
        }
    }
$(f).submit(function(){
    var h=$(this).attr("action").split("/")[3];
    remote_submit_json(this,function(i){
        if(i.r!=0){
            $("#saving").remove();
            $("#submits").show();
            $("#error").html(Douban.errdetail[i.r]);
            refine_dialog();
            return
        }
        $("#collect_form_"+h).html("");
        if($(f).data("reload")){
            if(/subject\/\d+\/comments/.test(location.href)){
                location.href=location.href.split("?sort")[0]+"?sort=time"
                }else{
                if(/people\/[^\/]+\/(edittag|all|do|wish|collect)/.test(location.href)){
                    location.href=location.href
                    }else{
                    location.href=location.href.split("?")[0]
                    }
                }
        }else{
        close_dialog()
        }
    },false);
$("#submits").hide().after('<span class="m" id="saving">正在保存...</span>');
refine_dialog();
return false
});
$(f.cancel).click(function(){
    var h=$(f).attr("action").split("/")[3];
    $("#collect_form_"+h).html("")
    });
$(".tagbtn",f).each(function(j){
    var h=$(this).text().toLowerCase();
    if(e[h]){
        e[h].push(this)
        }else{
        e[h]=[this]
        }
    }).click(function(){
    var h=$(this).text();
    var k=$.trim(f.tags.value).split(" "),o=false,j=h.toLowerCase(),l;
    k=$.grep(k,function(q,p){
        if(q.toLowerCase()==j){
            d(j);
            o=true;
            return false
            }else{
            return true
            }
        });
if(!o){
    k.push(h);
    b(j)
    }
    var n=k.join(" ");
    f.tags.value=(n.length>1)?n+" ":n;
    f.tags.focus()
    });
$(f.tags).keyup(g)
};

Douban.init_stars=function(e){
    var b={
        1:"很差",
        2:"较差",
        3:"还行",
        4:"推荐",
        5:"力荐"
    },g=$("#n_rating"),c=$("#stars img"),d=function(f){
        var h=g.val()||0;
        c.each(function(k){
            var i=this.src.replace(/\w*\.gif$/,((k<f)?"sth":((k<h)?"st":"nst"))+".gif");
            this.src=i
            });
        if(f){
            $("#rateword").text(b[f])
            }else{
            $("#rateword").text(h?b[h]:"")
            }
        };

c.hover(function(){
    d(this.id.charAt(4))
    },function(){
    d(0)
    });
if(g.attr("name")){
    c.click(function(){
        var f=this.id.charAt(4);
        g.val(f);
        d(f)
        })
    }
    d()
    };

Douban.init_tries_to_listen=function(c){
    var b=$(c).attr("name");
    $(c).click(function(){
        var j=!document.all;
        if(b!=""){
            var e=b.split("-");
            var d=e[0];
            var f=e[1]
            }else{
            var d=384;
            var f=450
            }
            var i=(screen.width-d)/2;
        var g=j?(screen.height-f)/2:50;
        window.open($(c).attr("href"),"","width="+d+",height="+f+",top="+g+",left="+i+",scrollbars=0,resizable=0,status=1");
        return false
        })
    };

Douban.init_discover=function(c){
    var b=$("#discover_text")[0];
    $(c).submit(function(e){
        if(!b.value||b.value==b.title){
            return false
            }
            var d="";
        d=$(":radio:checked")[0].value;
        if(d=="event"){
            $("#discover_s").attr("action","/event/search")
            }else{
            if(d=="group"){
                $("#discover_s").attr("action","/group/search?q="+$("#discover_text").value)
                }else{
                $("#discover_s").attr("action","/subject_search")
                }
            }
    });
$(c,":radio").click(function(){
    b.focus()
    })
};

var friend_form_update=function(c,b){
    $("#divac").html(c);
    $("#submitac").submit(function(){
        this.action="/j/people/"+b+"/friend";
        remote_submit_json(this,function(d){
            $("#divac").parent().html(d.html);
            $("#tip_wait").yellow_fade();
            load_event_monitor($(c))
            });
        return false
        });
    $("#cancelac").click(function(){
        $("#divac").html("")
        })
    };

Douban.init_review_full=function(e){
    var c=$(e).attr("id").split("_");
    var d=c[1];
    var b=c[2];
    $(".link",e).click(function(){
        var f="/j/review/"+d+"/"+b;
        $.getJSON(f,function(g){
            $(e).html(g.html);
            load_event_monitor($(e))
            });
        return false
        })
    };

Douban.init_show_login=function(b){
    $(b).click(function(){
        return pop_win.load("/js/pop_win/login")
        })
    };

Douban.init_show_signup_table=function(b){
    $(b).click(function(){
        event_id=window.location.href.split("/")[4];
        return pop_win.load("/j/event/"+event_id+"/signup")
        })
    };

var set_cookie=function(f,e){
    e=e||30;
    var c=new Date();
    c.setTime(c.getTime()+(e*24*60*60*1000));
    var b="; expires="+c.toGMTString();
    for(var d in f){
        document.cookie=d+"="+f[d]+b+"; path=/"
        }
    };

function get_cookie(d){
    var f=d+"=";
    var b=document.cookie.split(";");
    for(var e=0;e<b.length;e++){
        var g=b[e];
        while(g.charAt(0)==" "){
            g=g.substring(1,g.length)
            }
            if(g.indexOf(f)==0){
            return g.substring(f.length,g.length).replace(/\"/g,"")
            }
        }
    return null
}
Douban.init_hideme=function(b){
    $(b).click(function(){
        $(this).parent().parent().parent().hide()
        })
    };

Douban.init_more=function(b){
    $(b).click(function(){
        lastObj=$(this).prev().find("input");
        ids=/(.*_)(\d+)$/.exec(lastObj.attr("id"));
        id=ids[1]+(parseInt(ids[2])+1);
        a=lastObj.clone();
        a.attr("value","");
        $(this).before("<br/>").before(a);
        a.attr("id",id).attr("name",id).wrap("<span></span>")
        })
    };

Douban.init_search_text=function(b){
    if(!b.value||b.value==b.title){
        $(b).addClass("greyinput");
        b.value=b.title
        }
        $(b).focus(function(){
        $(b).removeClass("greyinput");
        if(b.value==b.title){
            b.value=""
            }
        });
$(b).blur(function(){
    if(!b.value){
        $(b).addClass("greyinput");
        b.value=b.title
        }
    })
};

Douban.init_checkreg=function(b){
    $(b).find(".butt").click(function(){
        var c=true;
        $(b).find("input").each(function(){
            if(this.type!="submit"&&this.type!="button"){
                if(this.value==""){
                    $(this).next().css("display","inline");
                    c=false
                    }else{
                    $(this).next().css("display","none")
                    }
                }
        });
    return c
    })
};

Douban.init_click_tip=function(c){
    var b=$(c).parent().find(".blocktip");
    $(c).click(function(){
        b.show().blur_hide();
        m=b.width()+b.pos().x-$.viewport_size()[0]>0?-b.width():0;
        b.css("margin-left",m)
        });
    $(".hideme",b).click(function(){
        b.hide()
        })
    };

function clean_tip(){
    var b=$("#page_focus")[0];
    return b&&b.value!=b.title
    }
    Douban.init_submit_link=function(b){
    $(b).click(function(){
        $(b).parent().submit()
        })
    };

var nowmenu=null;
var hidemenu=function(b){
    b.find(".down").css("display","inline");
    b.find(".up").hide();
    b.next().hide();
    nowmenu=null;
    $("body").unbind("mousedown")
    };

var openmenu=function(b){
    if(nowmenu!=null){
        hidemenu(nowmenu)
        }
        b.find(".up").css("display","inline");
    b.find(".down").hide();
    b.next().show();
    nowmenu=b;
    $("body").mousedown(function(){
        if(b.parent().attr("rel")!="on"){
            hidemenu(b)
            }
        })
};

$(function(){
    $("a","#dsearch").each(function(){
        $(this).click(function(){
            if(!clean_tip()){
                return true
                }
                urls=$(this).attr("href").split("?cat=");
            $("#ssform").attr("action",urls[0]);
            if(urls[1]!=undefined){
                $('<input type="hidden" name="cat" value="'+urls[1]+'" />').appendTo($("#ssform"))
                }
                $("#ssform").submit();
            return false
            })
        });
    $(".arrow").click(function(){
        if($(this).find(".up").is(":hidden")){
            openmenu($(this))
            }else{
            hidemenu($(this))
            }
            this.blur()
        });
    $(".arrow").parent().hover(function(){
        $(this).attr("rel","on")
        },function(){
        $(this).attr("rel","off")
        });
    if($.suggest){
        $("#page_focus").suggest("/j/subject_suggest",{
            onSelect:function(){
                $(this).parents("form").append('<span><input name="add" value="1" type="hidden"/></span>').submit()
                }
            })
    }
    $(document.links).click(function(){
    for(var d=0,c=$(this);d<10&&c[0]!=document;c=c.parent(),d++){
        if(c[0].id){
            set_cookie({
                f:c[0].id
                });
            break
        }
    }
    });
var b=get_cookie("report");
if(b){
    set_cookie({
        report:""
    },0);
    $.get("/stat.html?"+b)
    }
    $(":submit").each(function(){
    if($(this).val()=="加上去"){
        $(this).click(function(){
            var c=this;
            setTimeout(function(){
                c.disabled=1
                },0)
            })
        }
    });
if($.browser.msie&&$.browser.version=="6.0"){
    $("form.miniform > :submit").hover(function(){
        $(this).addClass("hover")
        },function(){
        $(this).removeClass("hover")
        })
    }
});
var show_dialog=function(c,b){
    if($("#dialog").length){
        return
    }
    $("body").prepend('<div id="overlay"></div><div id="dialog" style="width:'+(b||550)+'px;"></div>');
    if(c!=null){
        $("#dialog").html(c)
        }else{
        $("#dialog").html("<div class='loadpop'>正在载入，请稍候...</div>")
        }
        set_overlay()
    };

var set_overlay=function(){
    var d=($.browser.msie?11:26),c=$("#dialog")[0],b=c.offsetWidth,e=(document.body.offsetWidth-b)/2+"px";
    $("#overlay").css({
        height:c.offsetHeight+d,
        width:b+26,
        left:e
    });
    c.style.left=e
    };

var close_dialog=function(){
    $("#overlay").unbind("click");
    $("#dialog,#overlay,.bgi").remove();
    if(typeof document.body.style.maxHeight=="undefined"){
        $("body","html").css({
            height:"auto",
            width:"auto"
        });
        $("html").css("overflow","")
        }
        document.onkeydown="";
    return false
    };

var refine_dialog=function(){
    if(!$("#dialog").length){
        return
    }
    var b=navigator.userAgent.toLowerCase();
    var c=0.5*($.viewport_size()[1]-$("#dialog")[0].offsetHeight)+140;
    $("#dialog,#overlay").css("top",c);
    set_overlay()
    };

Douban.init_show_full=function(b){
    $(b).click(function(){
        $(b).parents(".short").hide();
        $(b).parents(".short").next().show()
        })
    };

Douban.init_show_short=function(b){
    $(b).click(function(){
        $(b).parents(".all").hide();
        $(b).parents(".all").prev().show()
        })
    };

Douban.init_collect_btn=function(b){
    $(b).click(function(){
        if($("#hiddendialog").length){
            show_dialog($("#hiddendialog").html());
            load_event_monitor($("#dialog"))
            }else{
            show_dialog(null);
            var e=$(this).attr("name").split("-"),g=e[0],c=e[1],h=e[2],f=e[3],d="/j/subject/"+c+"/interest?"+(h?"interest="+h:"")+(f?"&rating="+f:"")+(g=="cbtn"?"&cmt=1":"");
            $.getJSON(d,function(i){
                if($("#dialog").length){
                    var l=$("<div></div>").html(i.html);
                    var s=i.tags;
                    var o=s.join(" ");
                    $("input[name=tags]",l).val((o.length>1)?o+" ":o);
                    var k={};

                    $.each(s,function(u,r){
                        k[r.toLowerCase()]=true
                        });
                    populate_tag_btns("我的标签:",$("#mytags",l),i.my_tags,k);
                    populate_tag_btns("常用标签:",$("#populartags",l),i.popular_tags,k);
                    if(g=="pbtn"||g=="cbtn"){
                        $("form",l).data("reload",1)
                        }
                        $("#dialog").html(l);
                    $("#showtags").click(function(){
                        if($("#advtags").is(":hidden")){
                            $(this).html("缩起 ▲");
                            $("#advtags").show();
                            $("#foldcollect").val("U")
                            }else{
                            $(this).html($(this).attr("rel"));
                            $("#advtags").hide();
                            $("#foldcollect").val("F")
                            }
                            $(this).blur();
                        refine_dialog()
                        });
                    var j=$("input[name=interest]"),p=$(".rate_stars"),n=function(){
                        if(j[0].checked){
                            p.hide()
                            }else{
                            p.show()
                            }
                            refine_dialog()
                        };

                    j.click(n);
                    n();
                    if($("#left_n").length){
                        $("#comment").display_limit(140,$("#left_n"))
                        }
                        if(g=="cbtn"){
                        var q=$("h2","#dialog");
                        q.text(q.text().replace("修改","写短评"));
                        if(!j[0].checked&&j[1]){
                            j[1].checked=true
                            }
                            $("form","#dialog").data("comment",1)
                        }
                        load_event_monitor(l)
                    }
                })
        }
        return false
    })
};

Douban.init_nine_collect_btn=function(b){
    $(b).click(function(){
        var e=$(this).attr("name").split("-");
        var f=e[0],c=e[1],g=e[2];
        var d="/j/subject/"+c+"/interest";
        $.getJSON(d,g&&{
            interest:g
        },function(k){
            var i=$("<div></div>").html(k.html);
            var h=k.tags;
            var j=h.join(" ");
            $("input[name=tags]",i).val((j.length>1)?j+" ":j);
            var l={};

            $.each(h,function(o,n){
                l[n.toLowerCase()]=true
                });
            populate_tag_btns("我的标签(点击添加):",$("#mytags",i),k.my_tags,l);
            populate_tag_btns("豆瓣成员常用的标签(点击添加):",$("#populartags",i),k.popular_tags,l);
            if(f=="pbtn"){
                $("form",i).data("reload",1)
                }
                $("#collect_form_"+c).html("").append('<p class="ul"></p>').append(i);
            load_event_monitor($("#collect_form_"+c))
            });
        return false
        })
    };

Douban.init_rec_btn=function(g){
    var c=$(g).attr("name").split("-"),b="/j/recommend",e="rdialog-"+c[1]+"-"+c[2],d=function(){
        var h=((c[1]=="I")&&(c[2]==undefined))?$("input",$(g).parent())[0].value:c[2],i=(c[3]==undefined)?"":c[3],f=function(k){
            if(k=="I"){
                var j=$(".text","#dialog");
                if(j.length){
                    if(j[0].value.length){
                        j[1].focus()
                        }else{
                        j[0].focus()
                        }
                    }
            }else{
        $("#dialog").find(":submit").focus()
        }
        if($(g).hasClass("novote")){
        $("form","#dialog").append('<input name="novote" value="1" type="hidden"/>')
        }
    };

if($("#"+e).length){
    show_dialog($("#"+e).html());
    load_event_monitor("#dialog");
    f(c[1])
    }else{
    $.getJSON(b,{
        type:c[1],
        uid:h,
        rec:i
    },function(j){
        show_dialog(j.html);
        if(c[1]!="I"){
            var k=$('<div id="'+e+'"></div>');
            k.html(j.html).appendTo("body").hide()
            }
            load_event_monitor("#dialog");
        f(c[1])
        })
    }
    return false
};

$(g).click(d);
if(c[1]=="I"){
    $(g).parent().parent().submit(d)
    }
};

Douban.init_rec_form=function(b){
    b.onsubmit=function(){
        $("#ban_word").remove();
        remote_submit_json(this,function(c){
            trace(c);
            if(c.ban){
                $(":submit,:input",b).attr("disabled",false);
                $(".recsubmit").before('<div class="attn" style="text-align:center" id="ban_word">你的推荐中有被禁止的内容</div >');
                return
            }
            $("#dialog").html('<div class="loadpop m">推荐已提交</div>');
            set_overlay();
            $("#rec_url_text").attr("value","http://");
            setTimeout(function(){
                $("#dialog, #overlay").fadeOut(close_dialog);
                if($("input[name=type]",b).val()=="I"){
                    document.location.reload()
                    }
                },400)
        });
    return false
    };

$(b).set_len_limit(140)
    };

Douban.init_saying_reply=function(d){
    var c=d.name.split("-");
    var b="/j/saying_comment";
    if(!d.rev){
        $(d).attr("rev","unfold")
        }
        $(d).click(function(){
        if(d.rev!="unfold"){
            $(d).parent().parent().next().remove();
            $(d).html($(d).attr("rev"));
            d.rev="unfold"
            }else{
            if(d.rel!="polling"){
                d.rel="polling";
                $.getJSON(b,{
                    id:c[2],
                    type:c[3],
                    n:c[4],
                    ni:c[5]
                    },function(e){
                    $('<div class="recreplylst"></div>').insertAfter($(d).parent().parent()).html(e.html);
                    load_event_monitor($(d).parent().parent().next());
                    $(d).attr("rev",$(d).html()).text("隐藏回应");
                    d.rel=""
                    })
                }
            }
        return false
    })
};

Douban.init_rec_reply=function(d){
    var c=d.name.split("-");
    var b="/j/rec_comment";
    if(!d.rev){
        $(d).attr("rev","unfold")
        }
        $(d).click(function(){
        if(d.rev!="unfold"){
            $(d).parent().parent().next().remove();
            $(d).html($(d).attr("rev"));
            d.rev="unfold"
            }else{
            if(d.rel!="polling"){
                d.rel="polling";
                $.getJSON(b,{
                    rid:c[2],
                    type:c[3],
                    n:c[4],
                    ni:c[5]
                    },function(e){
                    $('<div class="recreplylst"></div>').insertAfter($(d).parent().parent()).html(e.html);
                    load_event_monitor($(d).parent().parent().next());
                    $(d).attr("rev",$(d).html()).text("隐藏回应");
                    d.rel=""
                    })
                }
            }
        return false
    })
};

Douban.init_reply_form=function(b){
    $(b).attr("action",$(b).attr("rev"));
    var c=$(b).attr("name");
    $(b).submit(function(){
        remote_submit_json(this,function(f){
            var e=$(b).parent();
            $(e).html(f.html);
            load_event_monitor(e);
            if(c=="n"){
                var d=$('<span><a href="javascript:void(0)">添加回应</a></span>')
                }else{
                var d=$('<span style="margin-left:53px"><a href="javascript:void(0)">添加回应</a></span>')
                }
                $("form",e).hide().after(d);
            d.click(function(){
                $(this).prev().show();
                $(this).remove()
                })
            });
        $(":submit",b).attr("disabled",1);
        return false
        });
    $(b).set_len_limit(140)
    };

Douban.init_video_comment=function(b){
    $(b).submit(function(){
        remote_submit_json(this,function(d){
            var c=$("#comments");
            $(c).html(d.html);
            load_event_monitor(c);
            $(":submit",b).attr("disabled",0);
            $("textarea",b).attr("disabled",0);
            $("textarea",b).attr("value","")
            },true,"/j/video/add_comment");
        return false
        })
    };

Douban.init_video_del_comment=function(c){
    var b=$(c).attr("name").split("-");
    $(c).click(function(){
        var d=c.title;
        if(confirm("真的要"+d+"?")==true){
            $.postJSON_withck("/j/video/del_comment",{
                comment_id:b[1],
                video_id:b[2]
                },function(f){
                var e=$("#c-"+b[1]);
                $(e).html("")
                })
            }
            return false
        })
    };

Douban.init_noti_form=function(b){
    $(":submit",b).click(function(){
        $(this).addClass("selected")
        });
    $(b).attr("action","/j/request/");
    $(b).submit(function(){
        b.confirm.disabled=true;
        b.ignore.disabled=true;
        remote_submit_json(this,function(c){
            $(b).parent().html(c.html)
            });
        return false
        })
    };

Douban.init_editable=function(f){
    var d=$("#display",f),e=$("form",f)[0],c=$("a","#edi");
    var b=function(g){
        if(g!=undefined){
            d.text(g);
            if(d.text()==""){
                c.text("点击添加描述").addClass("sign-text")
                }else{
                c.text("修改").removeClass("sign-text")
                }
            }
        d.show();
    $(e).hide();
    $("#edi").show()
    };

b(d.text());
    if(e.name){
    $(e).set_len_limit(e.name)
    }
    $(e).submit(function(){
    remote_submit_json(e,function(g){
        b(g.desc)
        });
    $("textarea",e)[0].value="正在保存...";
    return false
    });
$(".cancel",e).click(function(){
    b()
    });
$("#edi",f).click(function(){
    $("#display,#edi").hide();
    $("input,textarea","form").attr("disabled",0);
    $("textarea",f)[0].value=d.text();
    $(e).show();
    $("textarea",f).focus();
    return false
    })
};

Douban.init_show_video=function(e){
    var c=paras($(e).attr("href"))["from"];
    $(e).css("position","relative").attr("href","javascript:void(0)").attr("target","");
    var d=$("<div></div>").addClass("video_overlay");
    $("div",e).append(d);
    var b=$("img",e).attr("name");
    $(e).click(function(){
        var f=$('<a href="javascript:void(0)">缩进</a>');
        if(c!=undefined){
            $.get("/j/recommend?from="+c)
            }
            f.click(function(){
            $(e).show();
            $(this).prev().remove();
            $(this).remove()
            });
        $(e).after(f).after($("<em>"+b+"</em>"));
        $(e).hide()
        })
    };

Douban.init_morerec=function(b){
    $(b).click(function(){
        var c=$(b).parent().next();
        if(c.is(":hidden")){
            c.show()
            }else{
            c.next().show()
            }
            $(b).remove()
        })
    };

Douban.init_search_result=function(b){
    $("#sinput").suggest("/j/subject_suggest",{
        resultsClass:"rc_results",
        onSelect:function(){
            $(b).parent().submit()
            }
        });
$(b).parent().submit(function(){
    var c=$("#sinput")[0];
    return c&&c.value!=c.title
    });
Douban.init_search_text(b)
    };

Douban.init_prompt_link=function(b){
    $(b).click(function(){
        var c=prompt(b.title||"请输入");
        if(c){
            location.href=b.href+(b.href.indexOf("?")==-1?"?":"&")+b.name+"="+encodeURIComponent(c)
            }
            return false
        })
    };

$.viewport_size=function(){
    var b=[0,0];
    if(typeof window.innerWidth!="undefined"){
        b=[window.innerWidth,window.innerHeight]
        }else{
        if(typeof document.documentElement!="undefined"&&typeof document.documentElement.clientWidth!="undefined"&&document.documentElement.clientWidth!=0){
            b=[document.documentElement.clientWidth,document.documentElement.clientHeight]
            }else{
            b=[document.body.clientWidth,document.body.clientHeight]
            }
        }
    return b
};

$.ajax_withck=function(b){
    if(b.type=="POST"){
        b.data=$.extend(b.data||{},{
            ck:get_cookie("ck")
            })
        }
        return $.ajax(b)
    };

$.postJSON_withck=function(b,c,d){
    $.post_withck(b,c,d,"json")
    };

$.post_withck=function(b,d,e,c){
    if($.isFunction(d)){
        e=d;
        d={}
    }
    return $.ajax({
    type:"POST",
    url:b,
    data:$.extend(d,{
        ck:get_cookie("ck")
        }),
    success:e,
    dataType:c||"text"
    })
};
(function(){
    var b={};

    $.tmpl=function(e,d){
        var c=b[e]=b[e]||new Function("obj","var p=[];with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%})/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/{%=(.+?)%}/g,"',$1,'").split("{%").join("');").split("%}").join("p.push('")+"');}return p.join('');");
        return c(d)
        }
    })();
String.prototype.escapeHTML=function(){
    return this.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")
    };

jQuery.fn.extend({
    pos:function(){
        var c=this[0];
        if(c.offsetParent){
            for(var d=0,b=0;c.offsetParent;c=c.offsetParent){
                d+=c.offsetLeft;
                b+=c.offsetTop
                }
                return{
                x:d,
                y:b
            }
        }else{
        return{
            x:c.x,
            y:c.y
            }
        }
},
chop:function(g,b){
    var d=[],c=[];
    for(var e=0,f=this.length;e<f;e++){
        if(!b!=!g(this[e],e)){
            d.push(this[e])
            }else{
            c.push(this[e])
            }
        }
    return[d,c]
},
sum:function(c,e){
    var b=this.length,d=zero=e?"":0;
    while(b){
        d+=this[--b][c]+(b&&e||zero)
        }
        return d
    },
set_len_limit:function(c){
    var d=this.find(":submit:first");
    var e=d.attr("value");
    var b=function(){
        if(this.value&&this.value.length>c){
            d.attr("disabled",1).attr("value","字数不能超过"+c+"字")
            }else{
            d.attr("disabled",0).attr("value",e)
            }
        };

$("textarea",this).focus(b).blur(b).keydown(b).keyup(b)
},
display_limit:function(b,g){
    var c=this,e,d=function(h){
        var f=c.val();
        if(f==e){
            return
        }
        if(f.length>=b){
            c.val(f.substring(0,b))
            }
            g.text(b-c.val().length);
        e=c.val()
        };

    this.keyup(d);
    d()
    },
set_caret:function(){
    if(!$.browser.msie){
        return
    }
    var b=function(){
        this.p=document.selection.createRange().duplicate()
        };

    this.click(b).select(b).keyup(b)
    },
insert_caret:function(c){
    var j=this[0];
    if(document.all&&j.createTextRange&&j.p){
        var i=j.p;
        i.text=i.text.charAt(i.text.length-1)==""?c+"":c
        }else{
        if(j.setSelectionRange){
            var f=j.selectionStart;
            var h=j.selectionEnd;
            var g=j.value.substring(0,f);
            var d=j.value.substring(h);
            j.value=g+c+d;
            j.focus();
            var b=c.length;
            j.setSelectionRange(f+b,f+b);
            j.blur()
            }else{
            j.value+=c
            }
        }
},
get_sel:function(){
    var b=this[0];
    return document.all&&b.createTextRange&&b.p?b.p.text:b.setSelectionRange?b.value.substring(b.selectionStart,b.selectionEnd):""
    },
blur_hide:function(){
    var c=this,b=function(){
        return false
        };

    c.mousedown(b);
    $(document.body).mousedown(function(){
        c.hide().unbind("mousedown",b);
        $(document.body).unbind("mousedown",arguments.callee)
        });
    return this
    },
yellow_fade:function(){
    var b=0,d=1,c=this;
    function e(){
        c.css({
            backgroundColor:"rgb(100%,100%,"+b+"%)"
            });
        b+=d;
        d+=0.5;
        if(b<=100){
            setTimeout(e,35)
            }else{
            c.css({
                backgroundColor:""
            })
            }
        }
    e();
return this
},
hover_fold:function(d){
    var b={
        folder:[1,3],
        unfolder:[0,2]
        },c=function(e,f){
        return function(){
            $("img",e).attr("src","/pics/arrow"+f+".gif")
            }
        };

return this.hover(c(this,b[d][0]),c(this,b[d][1]))
},
multiselect:function(d){
    var g=function(){
        return true
        },f=d.onselect||g,e=d.onremove||g,c=d.onchange||g,h=d.selclass||"sel",b=d.values||[];
    return this.click(function(){
        var k=/id(\d*)/.exec(this.className)[1],j=$.inArray(k,b);
        if(j!=-1){
            if(!e(this)){
                return
            }
            b.splice(j,1);
            $(this).removeClass(h)
            }else{
            if(!f(this)){
                return
            }
            b.push(k);
            $(this).addClass(h)
            }
            c(b);
        return false
        })
    },
initDataInput:function(){
    var b=$(this);
    if(!b.val()||b.val()===b.attr("title")){
        b.addClass("color-lightgray");
        b.val(b.attr("title"))
        }
        b.focus(function(){
        b.removeClass("color-lightgray");
        if(b.val()===b.attr("title")){
            b.val("")
            }
        }).blur(function(){
    if(!b.val()){
        b.addClass("color-lightgray");
        b.val(b.attr("title"))
        }
    })
},
setItemList:function(n){
    var c={},g="",l='<img class="gray-loader" src="/pics/spinner.gif" />',e="/pics/spinner.gif",i=".input-create",k={
        keyup:function(p){
            var o=p.target.value.replace(/ /g,"");
            if(p.keyCode===13){
                n.create.callback(c,g,o,n.limit)
                }
            }
    },d=document.body,j=new Image(),f={
    create:{
        title:"新分组",
        tips:"创建新分组"
    }
},n=$.extend(f,n),b='<span class="create-new">'+n.create.title+"</span>",h='<input class="input-create" type="text" value="" title="'+n.create.tips+'" maxlength="'+n.create.maxLen+'" />';
j.src=e;
$(this).click(function(o){
    o.stopPropagation();
    c=this;
    sglist.hide();
    g=$.isFunction(n.target)?n.target(c):n.target;
    sgarrow.removeClass(CSS_ARROW_SELECT);
    $(c).addClass(CSS_ARROW_SELECT);
    $(CSS_SET_GROUP_LIST,this).show();
    $(i).focus();
    if($.browser.msie&&$.browser.version!=="8.0"){
        sgarrow.css("z-index","");
        $(this).css("z-index",10)
        }
    });
$(CSS_SET_GROUP_LIST).delegate("li:not('.last')","click",function(v){
    v.preventDefault();
    var u=v.target,p=this,s=u.type==="checkbox"?true:false,o=$(this).children("input"),r=$(this).children("input").val(),q=(s&&o.attr("checked")||!s&&!o.attr("checked"))?"addtotag":"removefromtag";
    if(!$(CSS_LOADER,this).length){
        o.hide().after(l)
        }
        n.callback(p,q,s,g,r)
    });
$(d).click(function(o){
    $(CSS_SET_GROUP_LIST,this).hide();
    $(c).removeClass(CSS_ARROW_SELECT);
    if(newGroupNum&&newGroupNum<n.limit){
        $(i).replaceWith(b)
        }
    });
$(CSS_SET_GROUP_LIST).delegate(".create-new","click",function(){
    $(this).replaceWith(h);
    $(i).focus()
    });
$(CSS_SET_GROUP_LIST).delegate(i,"keyup",function(o){
    if($.isFunction(k[o.type])){
        k[o.type].call(this,o)
        }
    })
}
});
var check_form=function(b){
    var c=true;
    $(":input",b).each(function(){
        if((/notnull/.test(this.className)&&this.value=="")||(/most/.test(this.className)&&this.value&&this.value.length>/most(\d*)/.exec(this.className)[1])){
            $(this).next().show();
            c=false
            }else{
            if(/attn/.test($(this).next().attr("className"))){
                $(this).next().hide()
                }
            }
    });
return c
};

var paras=function(s){
    var o={};

    if(s.indexOf("?")==-1){
        return{}
    }
    var vs=s.split("?")[1].split("&");
for(var i=0;i<vs.length;i++){
    if(vs[i].indexOf("=")!=-1){
        var k=vs[i].split("=");
        eval("o."+k[0]+'="'+k[1]+'"')
        }
    }
return o
};

function delete_reply_notify(b){
    if(!delete_reply_notify.id){
        delete_reply_notify.id=b;
        show_dialog($("#confirm_delete").html(),280);
        $("#overlay").css("z-index",100)
        }
        return false
    }
    function close_delete(b){
    if(b){
        var c=delete_reply_notify.id;
        $.get("/j/remove_notify?id="+c);
        $("#reply_notify_"+c).fadeOut()
        }
        delete_reply_notify.id=null;
    close_dialog()
    }
    function moreurl(b,e){
    var d=["ref="+encodeURIComponent(location.pathname)];
    for(var c in e){
        d.push(c+"="+e[c])
        }
        set_cookie({
        report:d.join("&")
        })
    }
    function tip_win(b){
    $(b).next(".blocktip").show().blur_hide()
    }
    tip_win.hide=function(b){
    $(b).parents(".blocktip").hide()
    };

function js_parser(htm){
    var tag="script>",begin="<"+tag,end="</"+tag,pos=pos_pre=0,result=script="";
    while((pos=htm.indexOf(begin,pos))+1){
        result+=htm.substring(pos_pre,pos);
        pos+=8;
        pos_pre=htm.indexOf(end,pos);
        if(pos_pre<0){
            break
        }
        script+=htm.substring(pos,pos_pre)+";";
        pos_pre+=9
        }
        result+=htm.substring(pos_pre,htm.length);
    return{
        htm:result,
        js:function(){
            eval(script)
            }
        }
}
function center(b){
    return{
        left:(document.documentElement.offsetWidth-b.offsetWidth)/2+"px",
        top:(document.documentElement.clientHeight-b.offsetHeight)*0.45+"px"
        }
    }
function pop_win(f,e){
    if(!window.__pop_win){
        var h=document.createElement("div");
        h.className="pop_win_bg";
        document.body.appendChild(h);
        var j=document.createElement("div");
        j.className="pop_win";
        document.body.appendChild(j);
        __pop_win={
            bg:h,
            body:j,
            body_j:$(j),
            bg_j:$(h)
            }
        }
    var c=__pop_win.body,d=__pop_win.body_j,i=js_parser(f);
if(e!==true){
    i.htm='<a onclick="pop_win.close()" href="javascript:;" class="pop_win_close">X</a>'+i.htm
    }
    c.innerHTML=i.htm;
var g=center(c);
if(document.documentElement.clientHeight<c.offsetHeight){
    g.top="0";
    g.height=document.documentElement.clientHeight-40+"px";
    g.overflow="auto"
    }
    d.css({
    display:"block"
}).css(g).css({
    visibility:"visible",
    zIndex:9999
});
i.js();
pop_win.fit();
if(!window.XMLHttpRequest){
    __pop_win.bg.style.top=""
    }
}
pop_win.fit=function(){
    if(window.__pop_win){
        var c=__pop_win.body;
        __pop_win.bg_j.css({
            height:c.offsetHeight+20+"px",
            width:c.offsetWidth+20+"px",
            left:c.offsetLeft-10+"px",
            top:c.offsetTop-10+"px",
            zIndex:8888
        }).show()
        }
    };

pop_win.close=function(){
    $(__pop_win.bg).remove();
    $(__pop_win.body).remove();
    window.__pop_win=null
    };

pop_win.load=function(c,b){
    pop_win("加载中, 请稍等...");
    $.ajax({
        url:c,
        success:pop_win,
        cache:b||false,
        dataType:"html"
    });
    return false
    };

function event_init_tab(){
    $("#tongcheng_tab").click(function(){
        if($("#tongcheng_tab_block").is(":hidden")){
            show_tongcheng_tab();
            $(document.body).click(function(){
                hide_tongcheng_tab();
                $(document.body).unbind("click",arguments.callee)
                })
            }else{
            hide_tongcheng_tab()
            }
            return false
        })
    }
    function show_tongcheng_tab(){
    $("#tongcheng_tab_block").show();
    $("#tongcheng_tab span").addClass("up")
    }
    function hide_tongcheng_tab(){
    $("#tongcheng_tab_block").hide();
    $("#tongcheng_tab span").removeClass("up")
    }
    __load_bk=$.fn.load;
$.fn.load_withck=function(b,c,d){
    if($.isFunction(c)){
        d=c;
        c={}
    }
    return __load_bk.call(this,b,$.extend(c,{
    ck:get_cookie("ck")
    }),d)
};

function exp_dialog(b){
    var c=document.documentElement;
    return 0-parseInt(b.offsetHeight/2)+(TBWindowMargin=c&&c.scrollTop||document.body.scrollTop)+"px"
    }
    function exp_overlay(b){
    return 0-parseInt(b.offsetHeight/2)+(TBWindowMargin=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop)+"px"
    }
    function exp_sort_h2_over(){
    this.style.backgroundColor="#eeffee"
    }
    function exp_sort_h2_out(){
    this.style.backgroundColor=""
    }
    function getslider(h,l,d,b,j,g){
    var c=5,e=100,k=5,i=0,f=function(o){
        if(c+o>e){
            c=e;
            h[0].className="dis"
            }else{
            if(c+o<5){
                c=5;
                l[0].className="dis"
                }else{
                c+=o
                }
            }
        l[0].className=c==5?"dis":"";
    h[0].className=c==e?"dis":"";
    i=(5-c)*105;
    d.animate({
        marginLeft:i+"px"
        },{
        duration:250*Math.abs(o),
        easing:$.easing.easeOutCirc
        })
    };

return function(o){
    if(c+o>k&&k<e){
        $.postJSON_withck(b,{
            start:k,
            pp:j,
            cat_id:g
        },function(n){
            if(n.err){
                e=n.total;
                k+=n.num;
                o=n.num;
                d.html(d.html()+n.more_html);
                f(o)
                }
            })
    }else{
    f(o)
    }
}
}
Douban.init_song_interest=function(c){
    var b=$(c).attr("id").split("-")[1];
    $(c).click(function(){
        var d="/j/song/"+b+"/interest";
        var e=$(c).hasClass("interest");
        $.post_withck(d,{
            action:(e?"n":"y")
            },function(f){
            $(c).toggleClass("interest");
            if(e){
                $(c).children().attr({
                    src:"/pics/gray-heart.gif",
                    title:"我喜欢",
                    alt:"我喜欢"
                })
                }else{
                $(c).children().attr({
                    src:"/pics/red-heart.gif",
                    title:"取消'我喜欢'",
                    alt:"取消'我喜欢'"
                })
                }
            },"text");
    return false
    })
};

Douban.init_vote_comment=function(c){
    if(window.location.hostname!="movie.douban.com"){
        return
    }
    var b=$(c).prev().prev(),d=$(c).prev().val();
    $(c).click(function(){
        $.postJSON_withck("/j/comment/vote",{
            id:d
        },function(e){
            if(e.count){
                b.text(e.count)
                }else{
                alert("这条短评你已经投过票了")
                }
            })
    })
};

Douban.init_rev_text=function(d){
    if(window.location.hostname!="movie.douban.com"){
        return
    }
    var c=$(d).parents("form"),b=$("input[name=rev_submit]");
    b.click(function(){
        if($(d).val().length<50){
            var e=/subject\/(\d*)/.exec(location.href)[1];
            $.getJSON("/j/comment/check",{
                sid:e
            },function(f){
                if(f.has){
                    if(confirm("少于50字的评论将被自动转为简短评论。并替换之前发表的简短评论内容。是否继续？")){
                        c.submit()
                        }
                    }else{
                c.submit()
                }
            });
    return false
    }
    return true
    })
};

Douban.init_popup=function(b){
    $(b).click(function(){
        var c=/ (\d+)x(\d+)$/.exec(b.className);
        if(!window.open(b.href,"popup","height="+c[2]+",width="+c[1]+",toolbar=no,menubar=no,scrollbars=no,location=no,status=no")){
            location.href=b.href
            }
            return false
        })
    };

Douban.init_show_request_join_form=function(b){
    $(b).click(function(){
        group_id=window.location.href.split("/")[4];
        return pop_win.load("/j/group/"+group_id+"/request_join_form")
        })
    };

Douban.init_show_comment_form=function(b){
    $(b).click(function(){
        $(b).hide();
        $("#comment_form").show()
        })
    };

function cinema_full(){
    $("#info_area").html("正在查询，请稍等...");
    $("#info_area").load_withck("/j/movie/cinemainfo",{
        id:movie_id,
        city:at_city,
        day:delta_days,
        view:view
    })
    }
    Douban.init_add2cart=function(b){
    $(b).click(function(){
        $.post_withck("/cart",{
            add:b.name
            },function(){
            $(b).hide().next().show().yellow_fade()
            })
        })
    };

Douban.init_switch_tab=function(b){
    $(b).click(function(){
        $(".a_switch_tab").removeClass("current");
        $(b).addClass("current");
        $("#tag-loader").attr("class","loading").text("");
        $.getJSON("/j/recommended/switch",{
            tag:b.name
            },function(c){
            $(".tag-fav-cloud").replaceWith(c.tags);
            load_event_monitor(".tag-fav-cloud");
            $(".rec-list").replaceWith(c.subjects);
            load_event_monitor(".rec-list")
            });
        return false
        })
    };

Douban.init_switch_tab_movie=function(b){
    $(b).click(function(){
        $(".a_switch_tab").removeClass("current");
        url=$("#hide_full_path").attr("name")+"/switch";
        $("#tag_all").removeClass("current");
        $(".tag-fav-cloud a").removeClass("current");
        $(b).addClass("current");
        $("#tag-loader").attr("class","loading").text("");
        $.getJSON(url,{
            tag:b.name
            },function(c){
            $(".rec-list").replaceWith(c.subjects);
            load_event_monitor(".rec-list");
            $("#tag-loader").attr("class","not-loading")
            });
        return false
        })
    };

Douban.init_get_more=function(b){
    $(b).click(function(){
        page=parseInt($(b).attr("attr"))+10;
        url=$("#hide_full_path").attr("name")+"/switch";
        start=parseInt($(b).attr("start"))+10;
        $(".a_switch_tab").removeClass("current");
        $(b).addClass("current");
        tag=b.name.replace("[","","g").replace("]","","g").replace("'","","g");
        $("#tag-loader").attr("class","loading").text("");
        $.getJSON(url,{
            tag:tag,
            perpage:page,
            start:start
        },function(c){
            $(b).attr("attr",page);
            $(".rec-list").replaceWith(c.subjects);
            load_event_monitor(".rec-list");
            $("#tag-loader").attr("class","not-loading")
            });
        return false
        })
    };

Douban.init_nointerest_subject=function(b){
    $(b).click(function(){
        tag=$(".tag-fav-cloud > .current").attr("name");
        $.post_withck("/j/recommended/nointerest_subject",{
            sid:b.name
            },function(c){
            if(c=="Y"){
                $("#tag-loader").attr("class","loading").text();
                $.getJSON("/j/recommended/switch",{
                    tag:tag
                },function(d){
                    $(".tag-fav-cloud").replaceWith(d.tags);
                    load_event_monitor(".tag-fav-cloud");
                    $(".rec-list").replaceWith(d.subjects);
                    load_event_monitor(".rec-list")
                    })
                }
            });
    return false
    })
};

Douban.init_nointerest_subject_tab=function(b){
    $(b).click(function(){
        tag=$(".tag-fav-cloud > .current").attr("name");
        $.post_withck("/j/recommended/nointerest_subject",{
            sid:b.name,
            tag:$(b).attr("tag")
            },function(c){
            if(c=="Y"){
                $("#tag-loader").attr("class","loading").text();
                $.getJSON("/j/recommended/switch",{
                    tag:$(b).attr("tag")
                    },function(d){
                    $(".tag-fav-cloud").replaceWith(d.tags);
                    load_event_monitor(".tag-fav-cloud");
                    $(".rec-list").replaceWith(d.subjects);
                    load_event_monitor(".rec-list")
                    })
                }
            });
    return false
    })
};

Douban.init_nointerest_subject_movie=function(b){
    $(b).click(function(){
        url=$("#hide_full_path").attr("name")+"/nointerest_subject";
        self_item=$(this).parents(".item");
        var c=true;
        _self=this;
        if(c){
            tag=$(".tag-fav-cloud > .current").attr("name");
            total=$(".a_get_more").attr("attr");
            $.post_withck(url,{
                sid:b.name
                },function(d){
                if(d=="Y"){
                    self_item.fadeOut(function(){
                        $.getJSON($("#hide_full_path").attr("name")+"/switch",{
                            tag:tag,
                            perpage:total
                        },function(e){
                            $(".rec-list").replaceWith(e.subjects);
                            load_event_monitor(".rec-list");
                            $("#tag-loader").attr("class","not-loading")
                            })
                        })
                    }
                })
        }
        return false
    })
};

Douban.init_nointerest_subject_top=function(b){
    $(b).click(function(){
        url=$("#hide_full_path").attr("name")+"/nointerest_subject_top";
        var c=true;
        _self=this;
        if(c){
            $(_self).parents("li").fadeOut("slow",function(){
                $(this).remove()
                });
            last_num-=1;
            cover_num-=1;
            if(cover_num===0){
                $("#movie-rec").remove()
                }
                if(last_num===5){
                $(".btn-next > a").addClass("dis")
                }
                $(".detail-tip").remove();
            $.post_withck(url,{
                sid:b.name
                },function(d){
                if(d==="Y"){}
            })
        }
        return false
    })
};

Douban.init_nointerest_doulist=function(b){
    $(b).click(function(){
        $("#doulist-loader").attr("class","loading");
        $.post_withck("/j/recommended/nointerest_doulist",{
            dl_del:b.name
            },function(c){
            $(".simple-dashed-list").replaceWith(c);
            load_event_monitor(".simple-dashed-list");
            $("#doulist-loader").attr("class","not-loading")
            });
        return false
        })
    };

Douban.init_nointerest_doulist_movie=function(b){
    $(b).click(function(){
        url=$("#hide_full_path").attr("name")+"/nointerest_doulist";
        $("#doulist-loader").attr("class","loading");
        $.post_withck(url,{
            dl_del:b.name
            },function(c){
            $(".simple-dashed-list").replaceWith(c);
            load_event_monitor(".simple-dashed-list");
            $("#doulist-loader").attr("class","not-loading")
            });
        return false
        })
    };

