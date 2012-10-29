/*
 * LICENSE *
 * The Developer of the Code is
 * Artem Demchenkov (lunoxot@mail.ru)
 *
 */
const ImageSpider_PrefService=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("ImageSpider_tutorial.");

var spiderSettings=
{		
    read: function()
    {	
	if(ImageSpider_PrefService.prefHasUserValue("text_color"))
	{
	    var font_color= ImageSpider_PrefService.getComplexValue("text_color", Components.interfaces.nsISupportsString).data;
	    document.getElementById("imageparams_text_color").color=font_color;
	}
	else
	{
	    document.getElementById("imageparams_text_color").color="#000000";
	}
		
	if(ImageSpider_PrefService.prefHasUserValue("bg_color"))
	{
	    var bg_color= ImageSpider_PrefService.getComplexValue("bg_color", Components.interfaces.nsISupportsString).data;
	    document.getElementById("imageparams_bg_color").color=bg_color;
	}
	else
	{
	    document.getElementById("imageparams_bg_color").color="#dddddd";
	}
		
	if(ImageSpider_PrefService.prefHasUserValue("border_color"))
	{
	    var border_color= ImageSpider_PrefService.getComplexValue("border_color", Components.interfaces.nsISupportsString).data;
	    document.getElementById("imageparams_border_color").color=border_color;
	}
	else
	{
	    document.getElementById("imageparams_border_color").color="#df0404";
	}
		
	if(ImageSpider_PrefService.prefHasUserValue("border_tool_color"))
	{
	    var border_tool_color= ImageSpider_PrefService.getComplexValue("border_tool_color", Components.interfaces.nsISupportsString).data;
	    document.getElementById("imageparams_border_tool_color").color=border_tool_color;
	}
	else
	{
	    document.getElementById("imageparams_border_tool_color").color="#000000";
	}
		
	if(ImageSpider_PrefService.prefHasUserValue("font_size"))
	{
	    var font_size= ImageSpider_PrefService.getIntPref("font_size");
	    document.getElementById("imageparams_text_size").value=font_size;
	}
	else
	{
	    document.getElementById("imageparams_text_size").value=12;
	}
		
	if(ImageSpider_PrefService.prefHasUserValue("opacity"))
	{
	    var opacity= ImageSpider_PrefService.getIntPref("opacity");
	    document.getElementById("imageparams_text_opacity").value=opacity;
	}
	else
	{
	    document.getElementById("imageparams_text_opacity").value=7;
	}
		
	if(ImageSpider_PrefService.prefHasUserValue("for_borders"))
	{
	    var for_borders= ImageSpider_PrefService.getIntPref("for_borders");
	    document.getElementById("imageparams_for_borders").value=for_borders;
	}
	else
	{
	    document.getElementById("imageparams_for_borders").value=2;
	}
    },
	
    resetOptions: function()
    {
	document.getElementById("imageparams_text_color").color="#000000";
	document.getElementById("imageparams_bg_color").color="#dddddd";
	document.getElementById("imageparams_border_color").color="#df0404";
	document.getElementById("imageparams_border_tool_color").color="#000000";
	document.getElementById("imageparams_text_size").value=12;
	document.getElementById("imageparams_text_opacity").value=7;
	document.getElementById("imageparams_for_borders").value=2;
    },
	
    save: function()
    {
	var supportsStringInterface=Components.interfaces.nsISupportsString;
		
	var ImageSpider_font_color=document.getElementById("imageparams_text_color");
	var string_font=Components.classes["@mozilla.org/supports-string;1"].createInstance(supportsStringInterface);
		
	var ImageSpider_bg_color=document.getElementById("imageparams_bg_color");
	var string_bg=Components.classes["@mozilla.org/supports-string;1"].createInstance(supportsStringInterface);
		
	var ImageSpider_border_color=document.getElementById("imageparams_border_color");
	var string_border=Components.classes["@mozilla.org/supports-string;1"].createInstance(supportsStringInterface);
		
	var ImageSpider_border_tool_color=document.getElementById("imageparams_border_tool_color");
	var string_border_tool=Components.classes["@mozilla.org/supports-string;1"].createInstance(supportsStringInterface);
		
	var ImageSpider_font_size=document.getElementById("imageparams_text_size").value;
		
	var ImageSpider_opacity=document.getElementById("imageparams_text_opacity").value;
		
	var ImageSpider_for_borders=document.getElementById("imageparams_for_borders").value;

	string_font.data = ImageSpider_font_color.color;
	string_bg.data = ImageSpider_bg_color.color;
	string_border.data = ImageSpider_border_color.color;
	string_border_tool.data = ImageSpider_border_tool_color.color;

	ImageSpider_PrefService.setComplexValue("text_color", supportsStringInterface, string_font);
	ImageSpider_PrefService.setComplexValue("bg_color", supportsStringInterface, string_bg);
	ImageSpider_PrefService.setComplexValue("border_color", supportsStringInterface, string_border);
	ImageSpider_PrefService.setComplexValue("border_tool_color", supportsStringInterface, string_border_tool);
		
	ImageSpider_PrefService.setIntPref("font_size", ImageSpider_font_size);
	ImageSpider_PrefService.setIntPref("opacity", ImageSpider_opacity);
	ImageSpider_PrefService.setIntPref("for_borders", ImageSpider_for_borders);
    }
}