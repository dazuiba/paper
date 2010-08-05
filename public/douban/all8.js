(function(e){
    var n="ui-sel-container",j="ui-sel-value",b="ui-sel-list",g="ui-sel-hover",a="ui-sel-active",d="ui-sel-selected",h="ui-sel-hide",i,m={
        width:"90px"
    },l=function(p){
        var o=['<div class="'+b+" "+h+'"><div class="bd"><ul>'];
        p.find("option").each(function(q,r){
            if(r.selected){
                i=r.innerHTML;
                o.push('<li class="'+h+'"><a href="#'+q+'">'+i+"</a></li>")
                }else{
                o.push('<li><a href="#'+q+'">'+r.innerHTML+"</a></li>")
                }
            });
    o.push('</ul></div><div class="ft"><span>&nbsp;</span></div></div>');
    p.wrap('<div class="'+n+'"></div>').css("display","none").parent().prepend(o.join("")).prepend('<div class="'+j+'" style="width:'+p.cfg.width+'"><a href="#current">'+i+"</a></div>");
    p.parent().find("."+b).css("width",(parseInt(p.cfg.width,10)+2)+"px")
    },k=function(o){
    o.removeClass(a);
    o.find("."+b).addClass(h)
    },f=function(o){
    if(o.hasClass(a)){
        k(o)
        }else{
        o.addClass(a);
        o.find("."+b).removeClass(h)
        }
    },c=function(p){
    var o=p.parent();
    o.find("a").click(function(s){
        var t=s.target.getAttribute("href",2).split("#")[1],q=e(s.target).parent(),r;
        if(/current/i.test(t)){
            f(o)
            }else{
            r=p[0][parseInt(t,10)];
            r.selected=true;
            if(p.cfg.callback){
                p.cfg.callback(r.text,r.value,r)
                }
                q.parent().find("."+h).removeClass(h);
            q.addClass(h);
            o.find("."+j+" a").text(r.text);
            k(o)
            }
            s.preventDefault();
        return false
        });
    o.find("."+j).mouseover(function(q){
        o.addClass(g)
        }).mouseout(function(q){
        o.removeClass(g)
        });
    e("body").click(function(q){
        k(o)
        })
    };
    
e.fn.renderDropList=function(o){
    this.cfg=o||{};
    
    for(var p in m){
        if(!o[p]){
            this.cfg[p]=m[p]
            }
        }
    l(this);
    c(this)
    }
})(jQuery);
$(function(){
    var b=$("#db-groups-cate .list li a"),a=$("#db-groups-cate .content .item"),c=0;
    b.each(function(d,e){
        $(e).addClass("tab_"+d)
        });
    a.each(function(d,e){
        $(e).addClass("item_"+d)
        });
    b.click(function(g){
        g.preventDefault();
        var f=$(g.target),d=f.parent(),h=parseInt(g.target.className.match(/tab_(\d{1,2})/i)[1],10);
        if(c===h){
            return
        }
        d.parent().find(".on").removeClass("on");
        d.addClass("on");
        a.filter(".item_"+c).fadeOut("fast");
        a.filter(".item_"+h).removeClass("hide").fadeIn("fast");
        c=h
        })
    });
(function(){
    var a,j,n=".submenu .selected",d=".submenu .menu",b,c,g,e,l,f='<div class="submenu"><div class="selected">{SELECTED}<span>+</span></div><div class="menu hide"><ul>{LIST}</ul></div></div>',k=function(p){
        var o=p.length*12+20;
        c.parent().width(o);
        g.width(e-o+4)
        },i=function(){
        var p=[],r,s;
        a=j.find("select");
        if(!a[0]){
            return
        }
        r=a[0].options[a[0].selectedIndex].text;
        for(var q=0,o=a[0].options.length;q<o;q++){
            s=a[0].options[q];
            if(r===s.text){
                p.push('<li class="hide"><a href="#'+q+'">'+s.text+"</a></li>")
                }else{
                p.push('<li><a href="#'+q+'">'+s.text+"</a></li>")
                }
            }
        a.parent().after(f.replace("{SELECTED}",r).replace("{LIST}",p.join("")));
    b=j.find(d);
    c=j.find(n);
    g=$(j.find("input")[0]);
    e=g.width();
    k(r);
    c.click(function(v){
        var u=$(v.currentTarget),t=u.hasClass("open");
        if(t){
            u.removeClass("open");
            b.addClass("hide")
            }else{
            u.addClass("open");
            b.removeClass("hide")
            }
            v.stopPropagation()
        }).mouseover(function(u){
        var t=$(u.currentTarget);
        t.parent().css("background-color","#f2f2f2")
        }).mouseout(function(u){
        var t=$(u.currentTarget);
        t.parent().css("background-color","#fff")
        });
    b.click(function(z){
        var y=z.target,x,t,u;
        if(y.tagName.toLowerCase()==="a"){
            x=parseInt(y.href.split("#")[1]);
            u=$(y).html();
            a[0].options[x].selected=true;
            c.html(u+"<span>+</span>");
            b.find(".hide").removeClass("hide");
            $(y).parent().addClass("hide");
            g[0].focus();
            z.preventDefault();
            k(u);
            if(l){
                l(x,a[0],j)
                }
            }
    });
$(document.body).click(function(t){
    c.removeClass("open");
    b.addClass("hide")
    })
},h=function(){
    var o=j.find("input[type=text]");
    if(o[0].value===""||o[0].value===o.attr("title")){
        o[0].value=o.attr("title");
        o.css("color","#d4d4d4")
        }
        o[0].rel=o.attr("title");
    o.attr("title","");
    o.focus(function(){
        if(this.value===this.rel){
            this.value="";
            $(this).css("color","#000")
            }
        }).blur(function(){
    if(this.value===""){
        this.value=this.rel;
        $(this).css("color","#d4d4d4")
        }
    })
},m=function(){
    h();
    i();
    j.submit(function(p){
        var o=$(this).find("input")[0];
        if(o.value===o.rel){
            o.value=""
            }
        })
};

$.fn.prettyField=function(o){
    j=this;
    l=o;
    m()
    }
})();
$(function(){
    $("#header .site-nav-logo a").mouseover(function(a){
        $(a.currentTarget).addClass("on")
        }).mouseout(function(a){
        $(a.currentTarget).removeClass("on")
        })
    });
