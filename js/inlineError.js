;
(function($){
 /**
 * jqGrid extension for inline edit
 * Adrian Crapciu adrian.crapciu@visma.com
 * http://www.visma.com/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
    var helper={};
    $.inlineError={
        defaults:{
            top:15,
            left:15,
            errorClass:"inlineEditErrorBox",
            errorMesage:"error",
            id:"gridInlineError"
        }
    };

    $.fn.extend({
        inlineError : function(settings){
            settings=$.extend({},$.inlineError.defaults,settings);
            createHelper(settings);
            return this.each(function(){
                $.data(this,"inlineError",settings);
            }).focusin(show).focusout(hide);
        }
    });
    function createHelper(settings){
        if(helper.parent)return;
        helper.parent=$('<div id="'+settings.id+'"></div>').appendTo(document.body).hide();
    }
    function settings(element){
        return $.data(element,"inlineError");
    }
    function show (){
        if($(this).attr('showErrorMessage') !== 'false'){
            var errorMesage = settings(this).errorMesage;
            var errorClass = settings(this).errorClass;
            var left=$(this).offset().left;
            var top=$(this).offset().top;
            var position = $(this).position();
            position.top=$(this).outerHeight()+top;
            position.left = left;
            helper.parent.css(position).text(errorMesage).addClass(errorClass).show();
        }

    }
    function hide (){
        helper.parent.hide().empty().removeClass();
    }
})(jQuery);