/*
 * LICENSE *
 * The Developer of the Code is
 * Artem Demchenkov (lunoxot@mail.ru)
 *
 */

window.addEventListener("load", function() {
    imagepar.init();
}, false);

var imagepar=
{
    // for all loading pages
	
    init: function() { 
	var nbar = document.getElementById("nav-bar");   
	var elem = document.getElementById("search-container");   
	nbar.insertItem("image-spider-navbar-button", null, null, false);    
	document.persist("nav-bar", "currentset"); 

	var appcontent = document.getElementById("appcontent");   // browser 
	if(appcontent)  
	    appcontent.addEventListener("DOMContentLoaded", imagepar.onPageLoad, true);
    },  
  
    onPageLoad: function(aEvent) {  
	var doc = aEvent.originalTarget; // doc is document that triggered "onload" event  
	var is_opened = document.getElementById("imageparams_taskbar");
	if(ImageSpider_PrefService.prefHasUserValue("spider_open"))
	{	
	    if(ImageSpider_PrefService.getIntPref("spider_open")==1)
	    {
		document.getElementById("image-spider-navbar-button").image = "chrome://imageparams/skin/plaginnameactive.png";
		var is_opened = document.getElementById("imageparams_taskbar");
		is_opened.setAttribute("checked", true);
		imagepar.scan();
	    }
	}
    },
	
    // about
	
    about: function()
    {
	window.openDialog("chrome://imageparams/content/about/about.xul", "imageparams_about", "centerscreen,chrome,modal");
    },
	
    // search all frames in page
	
    documents: function(frame)
    {
	var all_documents = new Array();

	if(frame)
	{
	    var frames=frame.frames;
	    var framesLength=frames.length;

	    if(frame.document)
	    {
		all_documents.push(frame.document);
	    }

	    for(var i=0; i<framesLength; i++)
	    {
		all_documents = all_documents.concat(imagepar.documents(frames[i]));
	    }
	}
	
	return all_documents;
    },
	
    // remove our styles, scripts and developments
	
    remove: function()
    {
	var for_borders = (ImageSpider_PrefService.prefHasUserValue("for_borders")) ? ImageSpider_PrefService.getIntPref("for_borders") : 2;
		
	var content=imagepar.documents(window.top.getBrowser().selectedBrowser.contentWindow);
		
	for(var i=0; i<content.length; i++)
	{
	    for(var n=0; n<content[i].images.length; n++)
	    {
		content[i].images[n].removeAttribute("onmouseover");
		content[i].images[n].removeAttribute("onmousemove");
		content[i].images[n].removeAttribute("onmouseout");
		if(for_borders==2) content[i].images[n].style.border='none';
	    }
			
	    var For_script = content[i].getElementById("thisIsOurScript");
	    content[i].body.removeChild(For_script);
			
	    var For_style = content[i].getElementById("thisIsOurStyle");
	    content[i].body.removeChild(For_style);
	}
    },
	
    // run by all images and create our styles, scripts and developments
	
    scan: function()
    {
	var content=imagepar.documents(window.top.getBrowser().selectedBrowser.contentWindow);
		
	var font_color = (ImageSpider_PrefService.prefHasUserValue("text_color")) ? ImageSpider_PrefService.getComplexValue("text_color", Components.interfaces.nsISupportsString).data : "#000000";
	var bg_color = (ImageSpider_PrefService.prefHasUserValue("bg_color")) ? ImageSpider_PrefService.getComplexValue("bg_color", Components.interfaces.nsISupportsString).data : "#f9fbdd";
	var border_color = (ImageSpider_PrefService.prefHasUserValue("border_color")) ? ImageSpider_PrefService.getComplexValue("border_color", Components.interfaces.nsISupportsString).data : "#df0404";
	var border_tool_color = (ImageSpider_PrefService.prefHasUserValue("border_tool_color")) ? ImageSpider_PrefService.getComplexValue("border_tool_color", Components.interfaces.nsISupportsString).data : "#000000";
	var font_size = (ImageSpider_PrefService.prefHasUserValue("font_size")) ? ImageSpider_PrefService.getIntPref("font_size") : 11;
	var opacity = (ImageSpider_PrefService.prefHasUserValue("opacity")) ? ImageSpider_PrefService.getIntPref("opacity") : 8;
	var for_borders = (ImageSpider_PrefService.prefHasUserValue("for_borders")) ? ImageSpider_PrefService.getIntPref("for_borders") : 2;
		
	for(var i=0; i<content.length; i++)
	{
	    var For_style = content[i].createElement('style');
	    content[i].body.appendChild(For_style);
	    For_style.setAttribute("id", "thisIsOurStyle");
	    For_style.innerHTML=" \
				div.image_information{ \
				padding:2px; \
				-moz-opacity: 0."+opacity+"; \
				opacity: 0."+opacity+"; \
				background-color:"+bg_color+"; \
				font-size:"+font_size+"px; \
				font-family:Arial,Verdana; \
				font-weight:normal; \
				font-style:normal; \
				color:"+font_color+"; \
				border:1px solid "+border_tool_color+"; \
				text-align:left;\
				box-shadow: 0 0 10px rgba(0,0,0,0.5);\
				position:absolute; \
				z-index:999;} \
			";
			
	    var For_script = content[i].createElement('script');
	    content[i].body.appendChild(For_script);
	    For_script.setAttribute("id", "thisIsOurScript");
	    var showFunction="\
				divVis=0; \
				ourAlt=''; \
				ourTitle=''; \
				\
				function showThis(where, e)\
				{ \
					var For_content =document.createElement('div'); \
					document.body.appendChild(For_content); \
					For_content.className='image_information'; \
					For_content.setAttribute('id','image_informer'); \
					\
					var topLeft=cursorPosition(e); \
					var newX=topLeft[0]+13; \
					var newY=topLeft[1]+10; \
					For_content.style.left=newX+'px'; \
					For_content.style.top=newY+'px'; \
					\
					ourAlt=where.alt; \
					ourTitle=where.title; \
					var outHtml=''; \
					\
					if(where.src) outHtml=outHtml+'<strong>Src</strong>: '+where.src+';<br/>'; \
					if(where.align) outHtml=outHtml+'<strong>Align</strong>: '+where.align+';<br/>'; \
					if(where.naturalWidth) outHtml=outHtml+'<strong>Natural width</strong>: '+where.naturalWidth+'px;<br/>'; \
					if(where.naturalHeight) outHtml=outHtml+'<strong>Natural height</strong>: '+where.naturalHeight+'px;<br/>'; \
					if(where.width) outHtml=outHtml+'<strong>Width</strong>: '+where.width+'px;<br/>'; \
					if(where.height) outHtml=outHtml+'<strong>Height</strong>: '+where.height+'px;<br/>'; \
					if(ourAlt) outHtml=outHtml+'<strong>Alt</strong>: '+ourAlt+';<br/>'; \
					if(ourTitle) outHtml=outHtml+'<strong>Title</strong>: '+ourTitle+';<br/>'; \
					if(where.id) outHtml=outHtml+'<strong>ID</strong>: '+where.id+'<br/>'; \
					if(where.className) outHtml=outHtml+'<strong>Class</strong>: '+where.className+';<br/>'; \
					if(where.border) outHtml=outHtml+'<strong>Border</strong>: '+where.border+';<br/>'; \
					\
					For_content.innerHTML=outHtml; \
					divVis=1; \
					where.removeAttribute('alt'); \
					where.removeAttribute('title'); \
				} \
				\
				function hideThis(where) \
				{ \
					document.body.removeChild(document.getElementById('image_informer')); \
					where.setAttribute('alt',ourAlt); \
					where.setAttribute('title',ourTitle); \
					divVis=0; \
					ourAlt=''; \
					ourTitle=''; \
				} \
				\
				function moveThis(e) \
				{ \
					if(divVis==1) \
					{ \
						var topLeft=cursorPosition(e); \
						var newX=topLeft[0]+13; \
						var newY=topLeft[1]+10; \
						document.getElementById('image_informer').style.left=newX+'px'; \
						document.getElementById('image_informer').style.top=newY+'px'; \
					} \
				} \
				\
				function cursorPosition(e) \
				{ \
					var xPlusY= new Array(2); \
					\
					if (e.pageX || e.pageY) \
					{ \
						var x=e.pageX; \
						var y=e.pageY; \
					} \
					else if (e.clientX || e.clientY) \
					{ \
						var x=e.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft)-document.documentElement.clientLeft; \
						var y=e.clientY+(document.documentElement.scrollTop || document.body.scrollTop)-document.documentElement.clientTop; \
					} \
					xPlusY[0]=x; \
					xPlusY[1]=y; \
					\
					return xPlusY; \
				} \
			";
			
	    For_script.innerHTML=showFunction;
			
	    for(var n=0; n<content[i].images.length; n++)
	    {
		if(for_borders==2)
		{
		    content[i].images[n].style.border='1px solid '+border_color;
		    content[i].images[n].setAttribute("onmouseover", "showThis(this, event);");
		    content[i].images[n].setAttribute("onmouseout", "hideThis(this);");
		}
		else
		{
		    content[i].images[n].setAttribute("onmouseover", "showThis(this, event); this.style.border='1px solid "+border_color+"';");
		    content[i].images[n].setAttribute("onmouseout", "hideThis(this); this.style.border='none';");
		}
				
		content[i].images[n].setAttribute("onmousemove", "moveThis(event);");
	    }
	}
    },
	
    settings: function()
    {	
	window.openDialog("chrome://imageparams/content/settings/settings.xul", "imageparams_settings", "centerscreen,chrome,modal,resizable");
    },
	
    // run Image Spider from menu
	
    toggleImagepar: function (is_opened)
    {
	if(is_opened.getAttribute("checked"))
	{
	    imagepar.scan();
	    ImageSpider_PrefService.setIntPref("spider_open", 1);
	    document.getElementById("image-spider-navbar-button").image = "chrome://imageparams/skin/plaginnameactive.png";
	}
	else
	{
	    imagepar.remove();
	    ImageSpider_PrefService.setIntPref("spider_open", 0);
	    document.getElementById("image-spider-navbar-button").image = "chrome://imageparams/skin/plaginname.png";
	}
    },
	
    // run Image Spider from toolbar
	
    toggleImageparMenu: function ()
    { 		
	var is_opened = document.getElementById("imageparams_taskbar");
		
	if(is_opened.getAttribute("checked")=="true")
	{
	    imagepar.remove();
	    is_opened.setAttribute("checked", false);
	    ImageSpider_PrefService.setIntPref("spider_open", 0);
	    document.getElementById("image-spider-navbar-button").image = "chrome://imageparams/skin/plaginname.png";
	}
	else
	{
	    imagepar.scan();
	    is_opened.setAttribute("checked", true);
	    ImageSpider_PrefService.setIntPref("spider_open", 1);
	    document.getElementById("image-spider-navbar-button").image = "chrome://imageparams/skin/plaginnameactive.png";
	}
    },
	
    // check flag in checkbox
	
    updateImageparPopUp: function()
    {
	var content=imagepar.documents(window.top.getBrowser().selectedBrowser.contentWindow);
	var script_number=0;
		
	for(var i=0; i<content.length; i++)
	{
	    if(content[i].getElementById("thisIsOurScript"))
	    {
		script_number=script_number+1;
	    }
	}
		
	if(script_number==0)
	{
	    is_opened = document.getElementById("imageparams_taskbar");
	    document.getElementById("imageparams_taskbar").setAttribute("checked", false);
	}
	else
	{
	    is_opened = document.getElementById("imageparams_taskbar");
	    document.getElementById("imageparams_taskbar").setAttribute("checked", true);
	}
    }
}