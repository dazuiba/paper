var F=window.F||{};
(function(){
    var ag=(navigator.userAgent.match(/WebKit/i));
    var Y=20,R=0,aq=1*60*1000,G=100,A=true,an=false,H=true,aA=true,h="XMLHttpRequest",T="X-Flickr-Ref",a="X-Flickr-NoLog",ay=4,y="sp";
    var aj=null,al=null,e=0,O=location.hash,D="#/",w=[],K=0,au,aa,aw=[],C={},J={},U,aE=false,ap={
        x:null,
        y:null
    },n=null,X=false,P=false,az=true,c=false,S=(ag&&aA&&an)?V:(an?ab:ac),E=(ag&&aA&&H)?av:(H?L:b),s=false,N,l,i,W=false,B=false,o=null;
    var t="_QM_",at="_AND_",I="_IS_",ae="+";
    F.iphone={
        showPage:function(aH,aG){
            if(aH){
                var aI=aj;
                aj=aH;
                if(aI){
                    setTimeout(S,0,aI,aH,aG)
                    }else{
                    ah(aH,aI)
                    }
                }
        },
showPageById:function(aI){
    var aK=ar(aI);
    if(aK){
        var aJ=-1;
        for(var aL=0,aG=w.length;aL<aG;aL++){
            if(w[aL]===aI){
                aJ=aL;
                break
            }
        }
        var aH=aJ!=-1;
    if(aH){
        w.splice(aJ,w.length)
        }
        F.iphone.showPage(aK,aH)
    }else{
    F.iphone.showPageById("404")
    }
},
showPageByHref:function(aJ,aO,aG,aK,aM,aH,aN,aQ,aL){
    if(!aH&&!aN&&aG!=="post"&&typeof C[aJ]==="string"&&((new Date()).getTime()-J[aJ])<aq){
        F.iphone.showPageById(C[aJ]);
        if(aM){
            setTimeout(aM,0,true)
            }
            return
    }
    var aP=new XMLHttpRequest();
    aP.onerror=function(){
        j(aM)
        };
        
    aP.onreadystatechange=function(){
        if(aP.readyState==4){
            af();
            if(aP.getResponseHeader("X-Flickr-Redirect")){
                document.location=aP.getResponseHeader("X-Flickr-Redirect");
                return
            }
            if(aP.getResponseHeader("X-Flickr-Delayed-Redirect")){
                setTimeout(function(){
                    document.location=aP.getResponseHeader("X-Flickr-Delayed-Redirect")
                    },1500)
                }
                if(aP.responseText===""||aP.status==="0"||aP.status===""){
                j(aM);
                return
            }
            if(aP.status=="404"){
                if(aM&&typeof aM==="function"){
                    aM(false)
                    }
                    F.iphone.showPageById("404");
                return
            }
            var aT=aP.responseText.replace(/<div.*?>\[php\].*?<\/div>/g,"");
            if(aH&&C[aJ]){
                var aS=ar(C[aJ]);
                var aV=document.createElement("div");
                aV.innerHTML=aT;
                if(!aS){
                    F.iphone.insertPages(aV.childNodes)
                    }else{
                    var aR,aU=0;
                    do{
                        aR=aV.childNodes[aU++]
                        }while(aR.nodeType!==1&&aV.childNodes[aU]);
                    aS.innerHTML=aR.innerHTML;
                    oldPage=aj;
                    aj=aS;
                    ah(aS,oldPage);
                    J[aJ]=(new Date()).getTime()
                    }
                }else{
            if(aK){
                Z(aK,aT)
                }else{
                var aV=document.createElement("div");
                aV.innerHTML=aT;
                F.iphone.insertPages(aV.childNodes)
                }
            }
        if(aM){
        setTimeout(aM,0,true)
        }
    }
};

if(!aL){
    aL=(aj&&aj.id&&aj.id.search(/\/|\?/)!==-1)?location.protocol+"//"+location.host+"/"+aj.id:""
    }
    if(!aH){
    C[aJ]=null;
    U=aJ
    }
    if(aJ.search(/handtu\.com\/nearby\/?$/)!==-1||aJ.search(/^\/nearby\/?$/)!==-1){
    if(navigator.geolocation&&typeof navigator.geolocation.getCurrentPosition==="function"){
        navigator.geolocation.getCurrentPosition(aI,aI);
        return
    }
    if(!B){
        g()
        }
        if(typeof(google)==="object"&&google.gears&&google.gears.geolocation){
        google.gears.geolocation.getCurrentPosition(aI,aI);
        return
    }
}
if(aJ.search(/handtu\.com\/abuse\/?/)!==-1&&o&&!aO){
    if(o.search(/\/$/)!==-1){
        aJ+=(aJ.search(/\?/)===-1?"?":"&")+"goback="+F.iphone.urls.domain+"/"+o
        }else{
        aJ+=(aJ.search(/\?/)===-1?"?":"&")+"goback=#"+o
        }
    }
aI();
function aI(aR){
    if(aR&&aR.coords&&aR.coords.latitude&&aR.coords.longitude){
        aJ="/nearby/"+aR.coords.latitude+","+aR.coords.longitude+"/"
        }
        if(aO){
        aP.open(aG||"GET",aJ,true);
        aP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        aP.setRequestHeader("Content-Length",aO.length);
        aP.setRequestHeader("X-Requested-With",h);
        if(aL!==""){
            aP.setRequestHeader(T,aL)
            }
            if(aQ){
            aP.setRequestHeader(a,"1")
            }
            aP.send(aO.join("&"))
        }else{
        aP.open(aG||"GET",aJ,true);
        aP.setRequestHeader("X-Requested-With",h);
        if(aL!==""){
            aP.setRequestHeader(T,aL)
            }
            if(aQ){
            aP.setRequestHeader(a,"1")
            }
            aP.send(null)
        }
    }
},
insertPages:function(aG){
    var aI;
    for(var aH=aG.length-1;aH>=0;aH--){
        var aK=aG[aH];
        if(aK.nodeType==1){
            var aJ=ar(aK.id);
            if(aJ){
                aJ.parentNode.replaceChild(aK,aJ)
                }else{
                document.body.appendChild(aK)
                }
                if(aK.style.background.toLowerCase().search(/dd3934|f4d058|rgb\(221, 57, 52\)|rgb\(244, 208, 88\)/)!==-1&&console){
                (typeof console.error==="function")?console.error(aK.innerHTML):console.log(aK.innerHTML)
                }
                if(aK.getAttribute("selected")=="true"||!aI){
                aI=aK
                }
                --aH
            }
        }
    Q(aI);
C[U]=aI.id;
J[U]=(new Date()).getTime();
if(aI){
    F.iphone.showPage(aI)
    }
},
showSelectedPage:function(aH){
    if(ad()){
        return
    }
    var aJ=(location.hash.search("/")!==-1)?location.hash.substr(D.length):location.hash.substr(1);
    var aG=aJ;
    var aL=ar(aJ);
    if(aJ){
        O=(aJ.search(D)===-1?D:"")+aJ;
        aJ=aJ.replace(new RegExp(t,"g"),"?").replace(new RegExp(I,"g"),"=").replace(new RegExp(at,"g"),"&");
        if((aJ.search("=")===-1&&aJ.search("/")===-1)||aL){
            if(aJ==="upload"){
                k()
                }
                F.iphone.showPageById(aG)
            }else{
            if(aH){
                var aK=(document.referrer.search(/m\..*?handtu\.com/)===-1)?document.referrer:null;
                var aI=(aK===null)
                }else{
                var aI=null,aK=null
                }
                F.iphone.showPageByHref("/"+aJ,null,null,null,null,null,null,aI,aK);
            if(aJ.search("people/contacts")!==-1||aJ.search("profile/contacts")!==-1){
                ak()
                }
            }
    }else{
    F.iphone.showPageById("home")
    }
},
addComment:function(aG,aL){
    aL.setAttribute("selected","progress");
    var aH=p(aL,"form");
    var aO=aH.message.value;
    if(aO===""){
        return
    }
    var aP=parseInt(aH.commentsPerPage.value,10),aN=parseInt(aH.commentsSpill.value,10),aM=parseInt(aH.commentsTotalCount.value,10)+1;
    var aJ=Math.ceil(aM/aP);
    if(aM>0&&aM%aP<=aN){
        aJ--
    }
    if(aJ===0){
        aJ=1
        }
        var aK=["method=handtu.photos.comments.addComment","photo_id="+aG,"comment_text="+encodeURIComponent(aO),"user_id="+F.iphone.globals.nsid];
    function aI(aR){
        af();
        aL.removeAttribute("selected");
        if(aR){
            d(F.iphone.format_strs.add_comment_confirmation,"confirm")
            }
        }
    function aQ(aR){
    if(!aR||aR.responseText===""||aR.status=="404"){
        aI(false);
        return
    }
    setTimeout(function(){
        var aS=U;
        if(aS.search(/\&page\=\d+/)!==-1||aS.search(/\?/)!==-1){
            aS=aS.replace(/\&page\=\d+/,"")+((aJ===1)?"":"&page="+aJ)
            }else{
            aS=aS.replace(/page\d+/,"")+((aJ===1)?"":"page"+aJ)
            }
            F.iphone.showPageByHref(aS,null,null,null,aI,true)
        },300)
    }
    z(aK,aQ)
},
addGalleryComment:function(aK,aH){
    aH.setAttribute("selected","progress");
    var aJ=p(aH,"form");
    var aI=aJ.message.value;
    if(aI===""){
        return
    }
    var aL=["method=handtu.galleries.comments.addComment","gallery_id="+F.iphone.globals.nsid+"-"+aK,"comment_text="+encodeURIComponent(aI)];
    function aG(aN){
        af();
        aH.removeAttribute("selected");
        if(aN){
            d(F.iphone.format_strs.add_comment_confirmation,"confirm")
            }
        }
    function aM(aN){
    if(!aN||aN.responseText===""||aN.status=="404"){
        aG(false);
        return
    }
    setTimeout(function(){
        var aO=U;
        F.iphone.showPageByHref(aO,null,null,null,aG,true)
        },300)
    }
    z(aL,aM)
},
editPhotoLicense:function(aH,aN){
    aN.setAttribute("selected","progress");
    var aI=p(aN,"form");
    var aG=aI.license;
    var aJ=0;
    for(var aK=0,aO=aG.length;aK<aO;aK++){
        if(aG[aK].checked){
            aJ=aG[aK].value;
            break
        }
    }
    function aL(aQ){
    af();
    aN.removeAttribute("selected");
    if(aQ){
        d(F.iphone.format_strs.edit_photo_license_confirmation,"confirm")
        }
    }
var aM=["method=handtu.photos.licenses.setLicense","photo_id="+aH,"license_id="+aJ];
function aP(aQ){
    if(!aQ||aQ.responseText===""||aQ.status=="404"){
        aL(false);
        return
    }
    setTimeout(function(){
        F.iphone.showPageByHref(U.replace(/\?type\=photo_license_edit/,""),null,null,null,aL,null,true)
        },1000)
    }
    z(aM,aP,true)
},
editPhotoPrivacy:function(aH,aL){
    aL.setAttribute("selected","progress");
    var aI=p(aL,"form");
    var aM=aI.is_public[(ag?1:0)].checked?0:1;
    var aO=0,aG=0;
    if(!aM){
        aO=aI.is_friend.checked?1:0;
        aG=aI.is_family.checked?1:0
        }
        function aJ(aP){
        af();
        aL.removeAttribute("selected");
        if(aP){
            d(F.iphone.format_strs.edit_photo_privacy_confirmation,"confirm")
            }
        }
    var aK=["method=handtu.photos.setPerms","photo_id="+aH,"is_public="+aM,"is_friend="+aO,"is_family="+aG];
function aN(aP){
    if(!aP||aP.responseText===""||aP.status=="404"){
        aJ(false);
        return
    }
    setTimeout(function(){
        F.iphone.showPageByHref(U.replace(/\?type\=photo_privacy_edit/,""),null,null,null,aJ,null,true)
        },1000)
    }
    z(aK,aN)
},
editPhotoSafety:function(aG,aM){
    aM.setAttribute("selected","progress");
    var aH=p(aM,"form");
    var aL=aH.batch_safety_level,aO;
    for(var aI=0,aN=aL.length;aI<aN;aI++){
        if(aL[aI].checked){
            aO=aL[aI].value
            }
        }
    function aJ(aQ){
    af();
    aM.removeAttribute("selected");
    if(aQ){
        d(F.iphone.format_strs.edit_photo_safety_confirmation,"confirm")
        }
    }
var aK=["method=handtu.photos.setSafetyLevel","photo_id="+aG,"safety_level="+aO];
function aP(aQ){
    if(!aQ||aQ.responseText===""||aQ.status=="404"){
        aJ(false);
        return
    }
    setTimeout(function(){
        F.iphone.showPageByHref(U.replace(/\?type\=photo_safety_edit/,""),null,null,null,aJ,null,true)
        },1000)
    }
    z(aK,aP,true)
},
editPhoto:function(aG,aI){
    aI.setAttribute("selected","progress");
    var aJ=p(aI,"form");
    var aM=aJ.title.value;
    var aL=aJ.description.value;
    var aK=["method=handtu.photos.setMeta","photo_id="+aG,"title="+encodeURIComponent(aM),"description="+encodeURIComponent(aL)];
    function aH(aO){
        af();
        aI.removeAttribute("selected");
        if(aO){
            d(F.iphone.format_strs.edit_photo_confirmation,"confirm")
            }
        }
    function aN(aQ){
    if(!aQ||aQ.responseText===""||aQ.status=="404"){
        aH(false);
        return
    }
    var aR=true;
    var aO=aQ.responseXML.documentElement.getElementsByTagName("err");
    if(aO&&aO.length){
        var aP=aO[0];
        if(aP.getAttribute("code")=="116"){
            scrollTo(0,1);
            d(F.iphone.format_strs.spam_url_warning,"warn");
            aH(false);
            aR=false
            }
        }
    if(aR){
    setTimeout(function(){
        F.iphone.showPageByHref(U.replace(/\?type\=photo_edit/,""),null,null,null,aH,null,true)
        },1000)
    }
}
z(aK,aN)
},
deletePhoto:function(aG,aI){
    aI.setAttribute("selected","progress");
    function aH(aL){
        af();
        aI.removeAttribute("selected");
        if(aL){
            d(F.iphone.format_strs.delete_photo_confirmation,"confirm")
            }
        }
    var aJ=["method=handtu.photos.delete","photo_id="+aG];
function aK(aL){
    if(!aL||aL.responseText===""||aL.status=="404"){
        aH(false);
        return
    }
    setTimeout(function(){
        F.iphone.showPageByHref(F.iphone.urls.you_photostream,null,null,null,aH,null,true)
        },1000)
    }
    z(aJ,aK)
},
editComment:function(aI,aH){
    aH.setAttribute("selected","progress");
    var aK=p(aH,"form");
    var aJ=aK.message.value;
    if(aJ===""){
        return
    }
    var aL=["method=handtu.photos.comments.editComment","comment_id="+aI,"comment_text="+encodeURIComponent(aJ),"user_id="+F.iphone.globals.nsid];
    function aG(aN){
        af();
        aH.removeAttribute("selected");
        if(aN){
            d(F.iphone.format_strs.edit_comment_confirmation,"confirm")
            }
        }
    function aM(aN){
    if(!aN||aN.responseText===""||aN.status=="404"){
        aG(false);
        return
    }
    setTimeout(function(){
        F.iphone.showPageByHref(U.replace(/\??edit_comment=\d*?$/,""),null,null,null,aG,null,true)
        },1000)
    }
    z(aL,aM)
},
deleteComment:function(aI,aH){
    aH.setAttribute("selected","progress");
    var aJ=["method=handtu.photos.comments.deleteComment","comment_id="+aI,"user_id="+F.iphone.globals.nsid];
    function aG(aL){
        af();
        aH.removeAttribute("selected");
        if(aL){
            d(F.iphone.format_strs.delete_comment_confirmation,"confirm")
            }
        }
    function aK(aL){
    if(!aL||aL.responseText===""||aL.status=="404"){
        aG(false);
        return
    }
    setTimeout(function(){
        F.iphone.showPageByHref(U.replace(/\??delete_comment=\d*?$/,""),null,null,null,aG,null,true)
        },1500)
    }
    z(aJ,aK)
},
editGalleryComment:function(aI,aH){
    aH.setAttribute("selected","progress");
    var aK=p(aH,"form");
    var aJ=aK.message.value;
    if(aJ===""){
        return
    }
    var aL=["method=handtu.galleries.comments.editComment","comment_id="+aI,"comment_text="+encodeURIComponent(aJ),"user_id="+F.iphone.globals.nsid];
    function aG(aN){
        af();
        aH.removeAttribute("selected");
        if(aN){
            d(F.iphone.format_strs.edit_comment_confirmation,"confirm")
            }
        }
    function aM(aN){
    if(!aN||aN.responseText===""||aN.status=="404"){
        aG(false);
        return
    }
    setTimeout(function(){
        F.iphone.showPageByHref(U.replace(/\??edit_comment=\d*?$/,""),null,null,null,aG,null,true)
        },1000)
    }
    z(aL,aM)
},
deleteGalleryComment:function(aI,aH){
    aH.setAttribute("selected","progress");
    var aJ=["method=handtu.galleries.comments.deleteComment","comment_id="+aI,"user_id="+F.iphone.globals.nsid];
    function aG(aL){
        af();
        aH.removeAttribute("selected");
        if(aL){
            d(F.iphone.format_strs.delete_comment_confirmation,"confirm")
            }
        }
    function aK(aL){
    if(!aL||aL.responseText===""||aL.status=="404"){
        aG(false);
        return
    }
    setTimeout(function(){
        F.iphone.showPageByHref(U.replace(/\??delete_comment=\d*?$/,""),null,null,null,aG,null,true)
        },1500)
    }
    z(aJ,aK)
},
changeRelationship:function(aK,aL,aO){
    var aG;
    switch(aO){
        case"add":
            aG="handtu.contacts.add";
            break;
        case"edit":
            aG="handtu.contacts.edit";
            break;
        case"remove":
            aG="handtu.contacts.remove"
            }
            var aJ=["method="+aG,"user_id="+aK];
    if(aO==="add"||aO==="edit"){
        var aM=false,aN=false;
        if(aL){
            aL.setAttribute("selected","progress");
            var aH=p(aL,"form");
            aM=aH.is_friend.checked;
            aN=aH.is_family.checked
            }
            aJ.push("friend="+(aM?1:0));
        aJ.push("family="+(aN?1:0))
        }
        function aI(aQ){
        af();
        aL.removeAttribute("selected");
        if(aQ){
            d(F.iphone.format_strs.change_relationship_confirmation,"confirm")
            }
        }
    function aP(aQ){
    if(!aQ||aQ.responseText===""||aQ.status=="404"){
        aI(false);
        return
    }
    setTimeout(function(){
        F.iphone.showPageByHref(F.iphone.urls.photostream_base+aK,null,null,null,aI)
        },500)
    }
    z(aJ,aP)
},
filterContactList:function(aU,aY,aT){
    if(aY){
        var aH=aU;
        aH.setAttribute("selected","progress");
        aU=aH.parentNode.getElementsByTagName("input")[0]
        }
        if(aU.className.match(/grey/)){
        aU.className=aU.className.replace(/\s*grey\s*/,"");
        aU.value="";
        return
    }else{
        if(X&&!aY){
            return
        }
    }
    var aV=aU.value.toLowerCase();
var a3=(aV==="");
if(aa==aV){
    return
}
aa=aV;
var a2=new RegExp(aV,"gi"),aQ,aG=0,aJ=[],aI;
if(X){
    function aO(){
        aH.removeAttribute("selected")
        }
        F.iphone.showPageByHref(F.iphone.urls.contact_search_base+encodeURIComponent(aV),null,null,null,aO);
    return
}
if(!a3){
    var aK,aL;
    for(var aW=0,aX,a1=n.length;aW<a1;aW++){
        aQ=aP(a2,n[aW]);
        if(aQ){
            aK=(n[aW].friend==="1"&&n[aW].family==="1")?F.iphone.format_strs.contact_list_friend_and_family:(n[aW].friend==="1"?F.iphone.format_strs.contact_list_friend:(n[aW].family==="1"?F.iphone.format_strs.contact_list_family:F.iphone.format_strs.contact_list_contact));
            aL=(n[aW].iconfarm!=="0")?("http://farm"+n[aW].iconfarm+".static.handtu.com/"+n[aW].iconserver+"/buddyicons/"+n[aW].nsid+".jpg"):("http://www.handtu.com/images/buddyicon.jpg");
            aG++;
            aI=document.createElement("li");
            aI.className="contact";
            aI.innerHTML='<a href="'+F.iphone.urls.photostream_base+(n[aW].path_alias?n[aW].path_alias:n[aW].nsid)+'/"><span class="img_block"><img src="'+aL+'" alt="" class="BuddyIconX" height="48" width="48"></span><div class="meta_block"><p class="searchable contact-username">'+aZ(n[aW].username,a2,aV.length)+'</p><p class="searchable contact-name">'+aZ(n[aW].realname,a2,aV.length)+"</p><p>"+ax(n[aW].public_photos_count)+" "+(parseInt(n[aW].public_photos_count,10)===1?F.iphone.format_strs.contact_list_item:F.iphone.format_strs.contact_list_items)+" / "+aK+"</p></div></a>";
            aJ.push(aI)
            }
        }
    }
var a0=p(aU,"ul");
var aM=r("contact-search-term","span",a0)[0];
var aR=r("no-results","li",a0)[0];
aM.innerHTML=aV;
aR.style.display=(aG===0&&!a3)?"block":"";
var aN=aU.parentNode.parentNode;
var a4=aN.getElementsByTagName("li");
for(var aW=0;aW<a4.length;){
    if(a4[aW].className.match(/^contact$/)){
        aN.removeChild(a4[aW]);
        continue
    }else{
        if(a4[aW].className.match(/^(pagination|contact-orig|group)$/)){
            a4[aW].style.display="none"
            }
        }
    aW++
}
if(aG>0){
    var aS=r("footer","div",aN)[0];
    for(var aW=0,a1=aJ.length;aW<a1;aW++){
        (aS)?aN.insertBefore(aJ[aW],aS):aN.appendChild(aJ[aW])
        }
    }else{
    if(a3){
        for(var aW=0,a1=a4.length;aW<a1;aW++){
            if(a4[aW].className.match(/^pagination$/)||a4[aW].className.match(/^contact-orig$/)||a4[aW].className.match(/^group$/)){
                a4[aW].style.display="block"
                }
            }
        }
}
function aP(a6,a5){
    if(a5.realname.search(a6)!==-1){
        return true
        }
        if(a5.username.search(a6)!==-1){
        return true
        }
        return false
    }
    function aZ(a9,a7,a5){
    if(a9.search(a7)===-1){
        return a9
        }
        var a6=a9.search(a7),a8=a6+a5;
    return a9.substring(0,a6)+"<b>"+a9.substring(a6,a8)+"</b>"+a9.substring(a8,a9.length)
    }
},
toggleFavorite:function(aG,aH){
    var aJ=(aF(aH,"favd"))?"handtu.favorites.remove":"handtu.favorites.add";
    (aF(aH,"favd"))?aD(aH,"favd"):aB(aH,"favd");
    var aI=["method="+aJ,"photo_id="+aG,"user_id="+F.iphone.globals.nsid];
    z(aI)
    },
selectAbuseCategory:function(){
    am(ar("abuse-category-form"));
    return false
    },
checkAbuseForm:function(){
    if(ar("entered_email")){
        var aH=ar("entered_email").value;
        if(aH===""){
            d(F.iphone.format_strs.report_abuse_email_empty,"warn");
            return false
            }
        }
    if(ar("spam_trap")){
    var aG=ar("spam_trap").value;
    if(aG===""){
        d(F.iphone.format_strs.report_abuse_magic_field_empty,"warn");
        return false
        }
        if(aG!="handtu"){
        d(F.iphone.format_strs.report_abuse_magic_field_incorrect,"warn");
        return false
        }
    }
return true
},
addUploadFeature:function(){
    s=(F.iphone.globals.mobile_app&&window.Device&&window.Device.platform);
    if(s){
        var aG=document.createElement("script");
        aG.src="/javascript/mobile_app.js";
        document.getElementsByTagName("head")[0].appendChild(aG)
        }
    },
showAdvSearch:function(){
    P=true;
    ar("adv-search-options").style.display="block";
    ar("adv-search-toggle").style.display="none"
    },
setSearchUI:function(aK){
    var aH=aK.options,aI="";
    for(var aJ=0,aG=aH.length;aJ<aG;aJ++){
        if(aH[aJ].selected){
            aI=aH[aJ].value;
            break
        }
    }
    if(aI==="people"){
    aB(ar("search-submit"),"solo");
    aB(ar("main-search-form"),"people");
    ar("adv-search-options").style.display="none";
    ar("adv-search-toggle").style.display="none"
    }else{
    if(P){
        aD(ar("search-submit"),"solo");
        aD(ar("main-search-form"),"people");
        ar("adv-search-options").style.display="block";
        ar("adv-search-toggle").style.display="none"
        }else{
        aD(ar("search-submit"),"solo");
        aD(ar("main-search-form"),"people");
        ar("adv-search-options").style.display="none";
        ar("adv-search-toggle").style.display="block"
        }
    }
},
setSearchFields:function(aH){
    var aI=ar("search-field"),aG=ar("search-field-welcome");
    if(aH&&aH.value){
        if(aH.id==="search-field-welcome"&&aI){
            aI.value=aH.value
            }else{
            if(aH.id==="search-field"&&aG){
                aG.value=aH.value
                }
            }
    }
},
setRelationshipUi:function(aG){
    var aJ=p(aG.el,"form");
    var aK=aJ.is_contact,aH=aJ.is_friend,aL=aJ.is_family;
    if((aH.checked||aL.checked)&&!aK.checked&&!aF(aG.el,"is_contact")){
        aK.checked=true
        }
        if((aH.checked||aL.checked)&&!aK.checked&&aF(aG.el,"is_contact")){
        aH.checked=false;
        aL.checked=false
        }
        var aM=r("contact-ok-button","a",aJ)[0],aI=r("contact-remove-button","a",aJ)[0];
    if(!aH.checked&&!aL.checked&&!aK.checked&&!aG.is_contact){
        aM.setAttribute("disabled",true);
        aB(aM,"DisabledButt")
        }else{
        aM.removeAttribute("disabled");
        aD(aM,"DisabledButt")
        }
        if(!aH.checked&&!aL.checked&&!aK.checked&&aG.is_contact){
        aM.style.display="none";
        aI.style.display="block"
        }else{
        aI.style.display="none";
        aM.style.display="block"
        }
    },
toggleCommentHTML:function(aH){
    var aI=aH.parentNode;
    var aG=r("some-html","div",aI.parentNode.parentNode)[0];
    if(aF(aI,"open")){
        aD(aI,"open");
        aG.style.display=""
        }else{
        aB(aI,"open");
        aG.style.display="block"
        }
    },
togglePrivacyBoxes:function(aG){
    var aI=p(aG,"form");
    var aH=aI.is_public[(ag?1:0)].checked?0:1;
    if(!aH){
        aI.is_friend.disabled=false;
        aI.is_family.disabled=false;
        aI.is_friend.parentNode.className="";
        aI.is_family.parentNode.className=""
        }else{
        aI.is_friend.disabled=true;
        aI.is_family.disabled=true;
        aI.is_friend.parentNode.className="disabled";
        aI.is_family.parentNode.className="disabled"
        }
    },
setRpCookie:function(){
    var aG=new Date();
    aG.setTime(aG.getTime()+(365*24*60*60*1000));
    document.cookie="flrp=1; expires="+aG.toUTCString()+"; path=/; domain=.handtu.com";
    document.cookie="flsp=0; expires=Monday, 19-Aug-1996 05:00:00 GMT; path=/; domain=.handtu.com";
    window.location.reload();
    return false
    },
setAllowWWWCookie:function(){
    if(!F.iphone.globals.redirected){
        return true
        }
        var aI=new Date();
    aI.setTime(aI.getTime()+(365*24*60*60*1000));
    document.cookie="mobile_allow_www=1; expires="+aI.toUTCString()+"; path=/; domain=.handtu.com";
    var aH=window.location.protocol+"//"+window.location.hostname.replace(/m\./,"")+"/";
    var aG=aj.id.replace(new RegExp(t,"g"),"?").replace(new RegExp(I,"g"),"=").replace(new RegExp(at,"g"),"&");
    if(aG.search("=")!==-1||aG.search("/")!==-1){
        aH+=aG
        }
        window.location.href=aH;
    return false
    }
};

addEventListener("load",function(aG){
    F.iphone.showSelectedPage(true);
    setTimeout(v,0);
    setTimeout(m,0);
    au=setInterval(m,300);
    setTimeout(function(){
        ar("large-loader").style.display="none"
        },3000)
    },false);
addEventListener("click",function(aJ){
    var aI=p(aJ.target,"a");
    if(aI&&aI.getAttribute("selected")=="progress"){
        aJ.preventDefault();
        return
    }else{
        if(aI){
            aI.blur();
            function aG(){
                af();
                aI.removeAttribute("selected")
                }
                if(aI.href.search(/^(\/|\#)/)===-1&&aI.href.search(/^https?:\/\//)===-1){
                return
            }else{
                if(aI.href&&(aI.href.search(/handtu\.com\/photos\/(.*?)\/\d+\/*/i)!==-1||aI.href.search(/handtu\.com\/photos\/(.*?)\/sets\/\d+\/*/i)!==-1||aI.href.search(/handtu\.com\/photos\/(.*?)\/collections\/\d+\/*/i)!==-1)&&aI.href.search(/m\..*?handtu\.com/i)===-1){
                    aJ.preventDefault();
                    F.iphone.showPageByHref(aI.href.replace(/http\:\/\//,"").replace(/^.*handtu\.com/i,"").replace(/\#.*$/,""),null,null,null,aG)
                    }else{
                    if(aI.href&&aI.href.search(/handtu\.com/i)!==-1&&aI.href.search(/m\..*?handtu\.com/i)===-1){
                        return
                    }else{
                        if(aI.href&&(aI.href.match(/m\..*?handtu\.com\/places\//i)||aI.href.match(/m\..*?handtu\.com\/upgrade\//i)||aI.href.match(/m\..*?handtu\.com\/groups\//i)||aI.href.match(/m\..*?handtu\.com\/photos\/tags\//i)||aI.href.match(/m\..*?handtu\.com\/help\/contact\//i)||aI.getAttribute("type")=="external")){
                            aJ.preventDefault();
                            document.location=aI.href.replace(/m\./i,"");
                            return
                        }else{
                            if(aI.href&&aI.hash&&aI.hash!="#"){
                                aI.setAttribute("selected","true");
                                var aK=ar(aI.hash.substr(1));
                                if(aK.id==="upload"){
                                    k()
                                    }
                                    F.iphone.showPage(aK);
                                setTimeout(aG,500)
                                }else{
                                if(aI==ar("backButton")||aI.getAttribute("type")=="back"){
                                    history.back()
                                    }else{
                                    if(aI.getAttribute("type")=="submit"){
                                        var aH=p(aI,"form");
                                        if(aH.enctype==="multipart/form-data"){
                                            return
                                        }
                                        aI.setAttribute("selected","progress");
                                        am(aH,null,aG)
                                        }else{
                                        if(aI.getAttribute("type")=="preview"){
                                            aI.setAttribute("selected","progress");
                                            am(p(aI,"form"),["preview=true"],aG)
                                            }else{
                                            if(aI.getAttribute("type")=="js"||aI.getAttribute("type")=="logout"||aI.getAttribute("type")=="signin"||aI.getAttribute("type")=="video_play"){
                                                return
                                            }else{
                                                if(aI.getAttribute("type")=="refresh"){
                                                    aI.setAttribute("selected","progress");
                                                    F.iphone.showPageByHref(aI.href,null,null,null,aG,null,true)
                                                    }else{
                                                    if(aI.getAttribute("type")=="report_abuse"){
                                                        aI.setAttribute("selected","progress");
                                                        if(aj&&aj.id){
                                                            o=aj.id
                                                            }
                                                            F.iphone.showPageByHref(aI.href,null,null,null,aG,null,true)
                                                        }else{
                                                        if(aI.getAttribute("type")=="disabled"){
                                                            aJ.preventDefault();
                                                            return
                                                        }else{
                                                            if(aI.getAttribute("type")=="hide_message"){
                                                                aJ.preventDefault();
                                                                ai();
                                                                return
                                                            }else{
                                                                if(aI.target=="_replace"){
                                                                    aI.setAttribute("selected","progress");
                                                                    F.iphone.showPageByHref(aI.href,null,null,aI,aG)
                                                                    }else{
                                                                    if(!aI.target){
                                                                        aI.setAttribute("selected","progress");
                                                                        if(aI.getAttribute("type")=="fetch_contacts"){
                                                                            ak()
                                                                            }
                                                                            if(aI.getAttribute("type")=="nav"||aI.getAttribute("type")=="subnav"||aI.getAttribute("type")=="fetch_contacts"){
                                                                            M()
                                                                            }
                                                                            F.iphone.showPageByHref(aI.href,null,null,null,aG)
                                                                        }else{
                                                                        return
                                                                    }
                                                                }
                                                            }
                                                    }
                                            }
                                    }
                            }
                    }
            }
    }
}
}
}
}
}
aJ.preventDefault()
}
}
},true);
addEventListener("submit",function(aJ){
    var aI=aJ.target;
    var aH=r("form-submit","input",aI)[0];
    aH.blur();
    aH.setAttribute("selected","progress");
    function aG(){
        af();
        aH.removeAttribute("selected")
        }
        if(aI){
        if(aI.onsubmit&&!aI.onsubmit()){
            aJ.preventDefault();
            return
        }
        if(aI.enctype==="multipart/form-data"){
            return
        }
        am(aI,null,aG)
        }
        aJ.preventDefault()
    },true);
function q(aG){
    if(aG.type=="touchstart"){
        aE=true;
        if(aG.touches.length==1){
            oX=aG.touches[0].pageX;
            aI=0;
            aH=0
            }
        }else{
    if(aG.type=="touchmove"){
        if(aG.touches.length==1){
            var aI=aG.touches[0].pageX;
            if(oX>aI){
                var aH=oX-aI;
                if(aH>100){
                    if(aE===true){
                        aE=false;
                        history.forward()
                        }
                    }
            }else{
        var aH=aI-oX;
        if(aH>100){
            if(aE===true){
                aE=false;
                history.back()
                }
            }
    }
}
}else{
    if(aG.type=="touchend"||aG.type=="touchcancel"){
        aE=false
        }
    }
}
}
function z(aJ,aK,aH){
    aJ.push("src=js");
    aJ.push("api_key="+F.iphone.globals.magisterLudi);
    aJ.push("auth_hash="+F.iphone.globals.auth_hash);
    aJ.push("auth_token="+F.iphone.globals.auth_token);
    aJ.push("cb="+new Date().getTime());
    var aI=new XMLHttpRequest();
    aI.onerror=function(){
        j(aK)
        };
        
    aI.onreadystatechange=function(){
        if(aI.readyState===4){
            var aL=aI.responseXML.documentElement;
            if(aL&&aL.getAttribute("stat")=="ok"){
                if(typeof aK==="function"){
                    aK(aI)
                    }
                }else{
            scrollTo(0,1);
            d(F.iphone.format_strs.no_connection_message,"warn")
            }
        }
};

if(aH){
    var aG="/services/rest/";
    aJ=aJ.join("&");
    aI.open("POST",aG,true);
    aI.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    aI.setRequestHeader("Content-length",aJ.length);
    aI.setRequestHeader("Connection","close");
    aI.send(aJ)
    }else{
    var aG="/services/rest/?"+aJ.join("&");
    aI.open("GET",aG,true);
    aI.send(null)
    }
}
function ao(aN){
    var aM="http://geo.yahoo.com/f?",aG=document.createElement("img"),aH=ar("beacon");
    if(!aN||!aH||!aH.getElementsByTagName("img")[0]){
        return false
        }
        var aI=aH.getElementsByTagName("img")[0].src;
    aI=aI.substr(aI.indexOf("?")+1);
    var aJ=aI.split("&");
    var aO={
        s:aN,
        t:(new Date()).getTime()
        };
        
    var aP=null;
    for(var aK=0,aL=aJ.length;aK<aL;aK++){
        aP=aJ[aK].split("=")[0];
        if(aO[aP]){
            aJ[aK]=aP+"="+aO[aP]
            }
        }
    aG.src=aM+aJ.join("&");
aH.appendChild(aG)
}
function f(aH,aG){
    if(F.iphone.globals.loggedin){
        ar("activity-tab").className="";
        ar("contacts-tab").className="";
        ar("you-tab").className="";
        ar("more-tab").className=""
        }else{
        ar("welcome-tab").className="";
        ar("explore-tab").className="";
        ar("nearby-tab").className="";
        ar("search-tab").className=""
        }
        if(typeof aH==="string"&&((F.iphone.globals.loggedin&&aH.match(/activity|contacts|you|more/))||(!F.iphone.globals.loggedin&&aH.match(/welcome|explore|nearby|search/)))){
        ar(aH+"-tab").className="selected"
        }
        aC(aH,aG)
    }
    function aC(aI,aH){
    var aJ="";
    switch(aI){
        case"contacts":
            aJ='<li class="first'+(aH==="uploads"?" selected":"")+'"><a href="'+F.iphone.urls.contacts_uploads+'" id="contacts_uploads_subtab" type="subnav">'+F.iphone.format_strs.iphone_recent_uploads+'</a></li><li class="last'+(aH==="list"?" selected":"")+'"><a href="'+F.iphone.urls.contacts_list+'" type="fetch_contacts" id="contacts_list_subtab">'+F.iphone.format_strs.iphone_contact_list+"</a></li>"
            }
            var aG=ar("nav_sub"),aK=ar("header");
    if(aJ===""){
        aD(aK,"show-sub-nav")
        }else{
        aB(aK,"show-sub-nav")
        }
        aG.innerHTML=aJ
    }
    function k(){
    var aG=3450,aI=1111,aH=ar("e_"+(aG+aI+4));
    if(aH&&!c){
        var aJ=["method=handtu.people.getMagicEmail","user_id="+F.iphone.globals.nsid];
        function aK(aM){
            if(!aM||!aM.responseXML||aM.status=="404"){
                return
            }
            c=true;
            var aL=aM.responseXML.documentElement.getElementsByTagName("user")[0].getAttribute("magic_email");
            aH.href="mailto:"+aL+"@photos.handtu.com";
            aH.innerHTML=aL+"@photos.handtu.com"
            }
            z(aJ,aK)
        }
    }
function ad(){
    var aJ=false,aI=false,aH=D,aG=location.search;
    search="";
    if(location.pathname!=="/"&&location.pathname!==""){
        aJ=true;
        aI=true;
        aH+=location.pathname.replace(/^\//,"");
        if(aH.search(/\/$/)===-1){
            aH+="/"
            }
        }
    if(aG!==""){
    if(aG.search(/loggedout/)!==-1){
        aI=false;
        search="?loggedout=1"
        }
        if(aG.search(new RegExp(y))!==-1){
        passNewVar=true;
        search="?"+y+"=1"
        }
        if(aG.search(/cb/)!==-1){
        aG=aG.replace(/\?cb\=\d+/,"");
        if(aG!==""&&aG.search(/\?/)===-1){
            aG=aG.replace(/\&/,"?")
            }
            aJ=true
        }
        aH+=aG.replace(/\?/,t).replace(/\&/g,at).replace(/\=/g,I);
    if(location.pathname==="/photo.gne"&&location.search.search(/id=/)!==-1){
        location.href="/photos/_/"+location.search.replace(/\?id=(\d*)/,"$1")+"/";
        return true
        }
    }
if(aJ){
    location.href="/"+search+(aI?aH:"")
    }
    return aJ
}
function ak(){
    var aG=["method=handtu.contacts.getList","page=1","per_page="+G];
    function aH(aJ){
        if(!aJ||!aJ.responseXML||aJ.status=="404"){
            return
        }
        var aK=aJ.responseXML.documentElement.getElementsByTagName("contacts")[0];
        if(parseInt(aK.getAttribute("total"),10)>G){
            X=true;
            aB(document.body,"scrumjax-search");
            return
        }
        var aM=aJ.responseXML.documentElement.getElementsByTagName("contact");
        n=[];
        for(var aL=0,aI=aM.length;aL<aI;aL++){
            n.push({
                nsid:aM[aL].getAttribute("nsid"),
                username:aM[aL].getAttribute("username"),
                iconserver:aM[aL].getAttribute("iconserver"),
                iconfarm:aM[aL].getAttribute("iconfarm"),
                ignored:aM[aL].getAttribute("ignored"),
                realname:aM[aL].getAttribute("realname"),
                friend:aM[aL].getAttribute("friend"),
                family:aM[aL].getAttribute("family"),
                public_photos_count:aM[aL].getAttribute("public_photos_count"),
                path_alias:aM[aL].getAttribute("path_alias")
                })
            }
        }
        z(aG,aH)
}
function m(){
    if(window.innerWidth!=e){
        e=window.innerWidth;
        var aG=(e<=320)?"profile":"landscape";
        document.body.setAttribute("orient",aG);
        setTimeout(scrollTo,100,0,1)
        }
        if(location.hash!=O){
        F.iphone.showSelectedPage()
        }
    }
function M(){
    var aG=ar("global-loading");
    if(aG){
        aG.style.display="block"
        }
    }
function af(){
    var aG=ar("global-loading");
    if(aG){
        aG.style.display=""
        }
    }
function ah(aK,aL){
    if(!aK){
        return
    }
    if(aL){
        aL.removeAttribute("selected")
        }
        aK.setAttribute("selected","true");
    aK.style.left="0%";
    scrollTo(0,1);
    Q(aK);
    location.href=O=D+aK.id;
    w.push(aK.id);
    var aJ=aK.getAttribute("tab"),aH=aK.getAttribute("subtab");
    f(aJ,aH);
    var aN=aK.getAttribute("spaceid");
    ao(aN);
    var aI=r("footer","div",aK);
    var aG=ar("footer");
    if(aI.length===0&&aG){
        var aM=document.createElement("div");
        aM.className="footer";
        aM.innerHTML=aG.innerHTML;
        aK.appendChild(aM)
        }
        if(az){
        ar("large-loader").style.display="none";
        az=false
        }
    }
function Q(aG){
    if(!aG.id){
        id=U.replace(/^http\:\/\/.*?handtu\.com/,"").replace(/^\//,"").replace(/\?/,t).replace(/\&/g,at).replace(/\=/g,I).replace(/\%20|\s/g,ae);
        aG.id=id
        }
    }
function x(aG,aH){
    if(aG.search(aH+"=")===-1){
        return""
        }
        return aG.replace(new RegExp("^.*?"+aH+"=(.*?)","i"),"$1").replace(/\&.*$/,"")
    }
    function ab(aL,aK,aH){
    var aI=(aH?aL:aK).getAttribute("axis");
    if(aI=="y"){
        (aH?aL:aK).style.top="100%"
        }else{
        aK.style.left="100%"
        }
        aK.setAttribute("selected","true");
    scrollTo(0,1);
    clearInterval(au);
    var aJ=100;
    aG();
    var aM=setInterval(aG,R);
    function aG(){
        aJ-=Y;
        if(aJ<=0){
            aJ=0;
            if(!aF(aK,"dialog")){
                aL.removeAttribute("selected")
                }
                clearInterval(aM);
            au=setInterval(m,300);
            ah(aK,aL)
            }
            if(aI=="y"){
            aH?aL.style.top=(100-aJ)+"%":aK.style.top=aJ+"%"
            }else{
            aL.style.left=(aH?(100-aJ):(aJ-100))+"%";
            aK.style.left=(aH?-aJ:aJ)+"%"
            }
        }
}
function V(aI,aH,aG){
    aH.style.left="100%";
    aH.setAttribute("selected","true");
    scrollTo(0,1);
    clearInterval(au);
    aI.style.webkitAnimationDuration="1s";
    aI.style.webkitAnimationName=(aG?"CtR":"CtL");
    aH.style.webkitAnimationDuration="1s";
    aH.style.webkitAnimationName=(aG?"LtC":"RtC");
    setTimeout(function(aJ){
        aI.removeAttribute("selected");
        au=setInterval(m,300);
        ah(aH,aI)
        },1000);
    aI.style.left=(aG?100:-100)+"%";
    aH.style.left="0%"
    }
    function ac(aH,aG){
    aG.style.left="100%";
    aG.setAttribute("selected","true");
    clearInterval(au);
    aH.style.left="100%";
    aG.style.left="0%";
    aH.removeAttribute("selected");
    au=setInterval(m,300);
    ah(aG,aH)
    }
    function d(aG,aH){
    if(!A||W){
        return
    }
    if(!aH||typeof aH!=="string"||aH.search(/info|warn|confirm/)===-1){
        aH="info"
        }
        if(!N||!l){
        N=ar("msg");
        l=ar("msg-p")
        }
        l.innerHTML=aG;
    N.className="";
    aB(N,"msg "+aH);
    W=true;
    E(true);
    i=setTimeout(function(){
        ai()
        },ay*1000)
    }
    function ai(){
    if(!N){
        return
    }
    clearTimeout(i);
    E(false);
    W=false
    }
    function av(aG){
    if(aG){
        b(true);
        N.style.webkitAnimationDuration=".3s";
        N.style.webkitAnimationName="msgIn";
        N.style.top="0"
        }else{
        N.style.webkitAnimationDuration=".3s";
        N.style.webkitAnimationName="msgOut";
        N.style.top="-30px";
        setTimeout(function(){
            b(false)
            },1000)
        }
    }
function L(aH){
    if(aH){
        b(true)
        }
        var aJ=30;
    aG();
    var aI=setInterval(aG,10);
    function aG(){
        aJ-=2;
        if(aJ<=0){
            aJ=0;
            clearInterval(aI);
            if(!aH){
                b(false)
                }
            }
        N.style.top=aH?"-"+aJ+"px":"-"+(30-aJ)+"px"
    }
}
function b(aG){
    N.style.display=(aG)?"block":"none"
    }
    function j(aG){
    if(aG){
        aG(false)
        }
        d(F.iphone.format_strs.no_connection_message,"warn")
    }
    function v(){
    var aG=document.createElement("div");
    aG.id="preloader";
    document.body.appendChild(aG)
    }
    function am(aI,aJ,aG){
    var aH=u(aI);
    if(aJ instanceof Array){
        aH=aH.concat(aJ)
        }
        if(aI.method.toLowerCase()==="post"){
        F.iphone.showPageByHref(aI.action,aH,aI.method,null,aG)
        }else{
        F.iphone.showPageByHref(aI.action+(aI.action.match(/\?/)?"&":"?")+aH.join("&"),null,aI.method,null,aG)
        }
    }
function u(aI){
    function aH(aJ){
        for(var aK=0;aK<aJ.length;++aK){
            if(aJ[aK].name&&((aJ[aK].type!=="radio"&&aJ[aK].type!=="checkbox")||(aJ[aK].type==="radio"&&aJ[aK].checked)||(aJ[aK].type==="checkbox"&&aJ[aK].checked))){
                aG.push(aJ[aK].name+"="+escape(aJ[aK].value))
                }
            }
        }
    var aG=[];
aH(aI.getElementsByTagName("input"));
aH(aI.getElementsByTagName("select"));
aH(aI.getElementsByTagName("textarea"));
return aG
}
function p(aH,aG){
    while(aH&&(aH.nodeType!=1||aH.localName.toLowerCase()!=aG)){
        aH=aH.parentNode
        }
        return aH
    }
    function aF(aG,aH){
    var aI=new RegExp("(^|\\s)"+aH+"($|\\s)");
    return aI.exec(aG.getAttribute("class"))!=null
    }
    function aD(aG,aH){
    var aI=new RegExp("(?:^|\\s+)"+aH+"(?:\\s+|$)");
    if(!aH||!aF(aG,aH)){
        return false
        }
        aG.className=aG.className.replace(aI," ");
    if(aF(aG,aH)){
        aD(aG,aH)
        }
        aG.className=aG.className.replace(/\s*$/,"");
    return true
    }
    function aB(aG,aH){
    if(!aF(aG,aH)){
        aG.className=[aG.className,aH].join(" ")
        }
    }
var r=(function(){
    if(document.getElementsByClassName){
        r=function(aL,aO,aK){
            aK=aK||document;
            var aG=aK.getElementsByClassName(aL),aN=(aO)?new RegExp("\\b"+aO+"\\b","i"):null,aH=[],aJ;
            for(var aI=0,aM=aG.length;aI<aM;aI++){
                aJ=aG[aI];
                if(!aN||aN.test(aJ.nodeName)){
                    aH.push(aJ)
                    }
                }
            return aH
        }
    }else{
    r=function(aR,aU,aQ){
        aU=aU||"*";
        aQ=aQ||document;
        var aK=aR.split(" "),aT=[],aG=(aU==="*"&&aQ.all)?aQ.all:aQ.getElementsByTagName(aU),aP,aM=[],aO;
        for(var aL=0,aH=aK.length;aL<aH;aL++){
            aT.push(new RegExp("(^|\\s)"+aK[aL]+"(\\s|$)"))
            }
            for(var aJ=0,aS=aG.length;aJ<aS;aJ++){
            aP=aG[aJ];
            aO=false;
            for(var aI=0,aN=aT.length;aI<aN;aI++){
                aO=aT[aI].test(aP.className);
                if(!aO){
                    break
                }
            }
            if(aO){
            aM.push(aP)
            }
        }
        return aM
}
}
return r
})();
function Z(aG,aJ){
    var aI=aG.parentNode;
    var aH=aG;
    while(aI.parentNode!=document.body){
        aI=aI.parentNode;
        aH=aH.parentNode
        }
        var aK=document.createElement(aH.localName);
    aK.innerHTML=aJ;
    aI.removeChild(aH);
    while(aK.firstChild){
        aI.appendChild(aK.firstChild)
        }
    }
function ax(aL){
    var aN=F.iphone.format_strs.dec_sep;
    var aH=F.iphone.format_strs.thou_sep;
    aL=aL.toString();
    var aM=aL.split(".");
    var aK=aM[0];
    var aI=(aM[1])?aN+aM[1]:"";
    if(aK.length<4){
        return aK+aI
        }
        var aG="";
    for(var aJ=aK.length-1;aJ>-1;aJ--){
        if(aJ<aK.length-1&&(aK.length-1-aJ)%3==0){
            aG=aH+aG
            }
            aG=aK.charAt(aJ)+aG
        }
        return aG+aI
    }
    function ar(aG){
    return document.getElementById(aG)
    }
    function g(){
    if(B||(window.google&&google.gears)){
        B=true;
        return
    }
    var aG=null;
    if(typeof GearsFactory!="undefined"){
        aG=new GearsFactory()
        }else{
        try{
            aG=new ActiveXObject("Gears.Factory");
            if(aG.getBuildInfo().indexOf("ie_mobile")!=-1){
                aG.privateSetGlobalObject(this)
                }
            }catch(aH){
        if((typeof navigator.mimeTypes!="undefined")&&navigator.mimeTypes["application/x-googlegears"]){
            aG=document.createElement("object");
            aG.style.display="none";
            aG.width=0;
            aG.height=0;
            aG.type="application/x-googlegears";
            document.documentElement.appendChild(aG)
            }
        }
}
B=true;
if(!aG){
    return
}
if(!window.google){
    google={}
}
if(!google.gears){
    google.gears={
        factory:aG
    };
    
    google.gears.geolocation=google.gears.factory.create("beta.geolocation")
    }
}
})();