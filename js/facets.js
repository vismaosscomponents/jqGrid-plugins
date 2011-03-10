;
(function($){
 /**
 * jqGrid extension for constructing Facets
 * Adrian Crapciu adrian.crapciu@visma.com
 * http://www.visma.com/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
    $.jgrid.extend({
        facets:function (gridId, p){
            p = $.extend({
                stringifyData:false
            }, p);
            return this.each(function(){
                this.p=p;
                if(!gridId) {
                    alert("No target grid is set!");
                    return;
                }
                this.p.gridId = gridId.indexOf("#") != -1 ? gridId : "#"+gridId;
                this.p.colModel = $(this.p.gridId).jqGrid("getGridParam",'colModel');
                this.p.colNames = $(this.p.gridId).jqGrid("getGridParam",'colNames');

                var _drawFacets = function (options){
                    var html='';
                    for(var i = 0; i<options.colModel.length;i++){
                        if(options.colModel[i].facet !== undefined){
                            html+='<ul class="'+cssClass._jgFacets+'" index="'+options.colModel[i].index+'">';
                            html+='<li class="'+cssClass._jqFacetsName+'"><span class="facet">'+options.colNames[i]+'</span></li>';
                            for(var j=0; j<options.colModel[i].facet.length;j++){
                                if(options.colModel[i].facet[j].selected !==undefined && options.colModel[i].facet[j].selected===true)
                                {
                                    html+='<li class="'+cssClass._jqFacetsSelectedItem+'" selected="yes" index="'+options.colModel[i].facet[j].index+'"><a class="facet" href="#"><span>'+options.colModel[i].facet[j].name+'</span></a></li>';
                                }
                                else{
                                    html+='<li index="'+options.colModel[i].facet[j].index+'"><a class="facet" href="#"><span>'+options.colModel[i].facet[j].name+'</span></a></li>';
                                }
                            }
                            html+='</ul>';
                        }
                    }
                    return html;
                };
                var _getFacetsPostData = function(facetsContainer, stringifyData){
                    var tmp = new Array();
                    $("#"+facetsContainer.attr('id')+' ul.'+cssClass._jgFacets).each(function(i){
                        var tmp2 = new Object;
                        index = $(this).attr('index');
                        $(this).children().filter('[selected=yes]').each(function(){
                            val = $(this).attr('index');
                            tmp2['index'] = index;
                            tmp2['value'] = val;
                            tmp[i]= tmp2;
                        });
                    });
                    if(stringifyData)
                        return JSON.stringify(tmp);
                    return tmp;
                };
                
                var cssClass={
                    _jgFacets:'jqfacets',
                    _jqFacetsName:'jqfacets-name',
                    _jqFacetsSelectedItem:'jqfacets-selected-item'
                };
                if(this.p.colModel){
                    $(this).append(_drawFacets(this.p));
                    $(this.p.gridId).appendPostData({
                        facets: _getFacetsPostData($(this), this.p.stringifyData)
                    });
                    $(this).delegate(" ul."+cssClass._jgFacets +" li:not(."+cssClass._jqFacetsName+")", 'click', function(){
                        $(this).trigger("change");
                    });

                    $(this).delegate(" ul."+cssClass._jgFacets +" li a", 'click', function(e){
                        e.preventDefault();
                    });

                    $(this).bind("change",function(e){
                        var isGridInEditMode = false;
                        isGridInEditMode =  $(this.p.gridId).find(' tr[editable=1]').length>0?true:false;
                        if(!isGridInEditMode){
                            $(e.target).attr("selected","yes" );
                            $(e.target).addClass(cssClass._jqFacetsSelectedItem).siblings().removeClass(cssClass._jqFacetsSelectedItem).removeAttr("selected");
                            $(this.p.gridId).appendPostData({
                                facets: _getFacetsPostData($(this), this.p.stringifyData)
                            });
                            $(this.p.gridId).trigger('reloadGrid');
                        }
                    });
                }else{
                    alert("Could not get grid colModel. Message from facets.js");
                    return;
                }
            });
        }
    })
})(jQuery);