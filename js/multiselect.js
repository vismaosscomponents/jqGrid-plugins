;
(function($){
    $.jgrid.extend({
        multiselect:function (beforeMultiselectRows, onMultiselectRows){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                if(typeof $t.p.multiselectdata == "undefined"){
                    $("#"+gID).delegate("tr", 'click', function(ev){
                        $($t).jqGrid('rowClicked', this, ev);
                    });
                }
                $($t).jqGrid('initMultiselect',beforeMultiselectRows, onMultiselectRows);
            });
        },

        initMultiselect: function(beforeMultiselectRows, onMultiselectRows){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                var rowsList=[];
                var dataIds = $("#"+gID).jqGrid('getDataIDs');
                if(dataIds.length>0){
                    for(var i=0; i<dataIds.length; i++){
                        var item = {};
                        item.index = i;
                        item.selected = false;
                        item.focused = false;
                        rowsList[dataIds[i]]=item;
                    }
                    var focusedIndex = dataIds[0];
                    item = {};
                    item.index =  rowsList[dataIds[0]].index;
                    item.selected = false;
                    item.focused = true;
                    rowsList[focusedIndex]=item;

                    var initSelection = {
                        multiselectdata:{
                            dataIds:dataIds,
                            rowsList:rowsList,
                            focusedIndex:focusedIndex,
                            beforeMultiselectRows: beforeMultiselectRows,
                            onMultiselectRows : onMultiselectRows
                        }
                    };
                    $.extend($t.p, initSelection);
                }
            });
        },

        rowClicked:function(row, ev){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                var rowId = $(row).attr('id');
                var dataIds = $t.p.multiselectdata.dataIds;
                var rowsList = $t.p.multiselectdata.rowsList;
                var focusedIndex = $t.p.multiselectdata.focusedIndex;
                if(!$.isFunction($t.p.multiselectdata.beforeMultiselectRows) || ($.isFunction($t.p.multiselectdata.beforeMultiselectRows) && $t.p.multiselectdata.beforeMultiselectRows(rowId, ev))){
                    if(ev.shiftKey){
                        if(rowsList[focusedIndex].index<rowsList[rowId].index){
                            selectBetween(focusedIndex, rowId, rowsList, dataIds, gID);
                        }
                        if(rowsList[focusedIndex].index>rowsList[rowId].index){
                            selectBetween(rowId, focusedIndex, rowsList, dataIds, gID);
                        }
                    }else{
                        if(ev.ctrlKey){
                            rowsList[rowId].focused = true;
                            rowsList[focusedIndex].focused = false;
                            focusedIndex = rowId;
                            if(!rowsList[rowId].selected){
                                rowsList[rowId].selected = true;
                                $(row).addClass('ui-state-selected');
                            }
                            else{
                                rowsList[rowId].selected = false;
                                $(row).removeClass('ui-state-selected');
                            }
                        }else{
                            focusedIndex = rowId;
                            unselectAll(rowsList, dataIds, gID);
                            rowsList[rowId].selected= true;
                            $(row).addClass('ui-state-selected');
                            rowsList[rowId].focused= true;
                        }
                    }
                    $t.p.multiselectdata.rowsList = rowsList;
                    $t.p.multiselectdata.focusedIndex = focusedIndex;
                    if($.isFunction($t.p.multiselectdata.onMultiselectRows)){
                        $t.p.multiselectdata.onMultiselectRows(rowId,ev)
                    }
                }
            });
            function unselectAll(rowsList,dataIds, gID){
                for(var i=0; i<dataIds.length; i++){
                    rowsList[dataIds[i]].selected=false;
                    rowsList[dataIds[i]].focused=false;
                    $('tr[id='+dataIds[i]+']','#'+gID).removeClass('ui-state-selected');
                }
            }
            function selectBetween(focusedIndex, endIndex, rowsList, dataIds, gID){
                var isBetween = false;
                for(var i=0; i<dataIds.length; i++){
                    if(dataIds[i]== focusedIndex){
                        isBetween = true;
                    }
                    rowsList[dataIds[i]].selected=isBetween;
                    if(isBetween){
                        $('tr[id='+dataIds[i]+']','#'+gID).addClass('ui-state-selected');
                    }
                    else{
                        $('tr[id='+dataIds[i]+']','#'+gID).removeClass('ui-state-selected');
                    }
                    if(dataIds[i]== endIndex){
                        isBetween = false;
                    }
                }
            }

        },
        getMultiselectRows:function (){
            var selRows=[];
            this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                for(var i=0; i<$t.p.multiselectdata.dataIds.length; i++){
                    if($t.p.multiselectdata.rowsList[$t.p.multiselectdata.dataIds[i]].selected){
                        selRows.push($t.p.multiselectdata.dataIds[i])
                    }
                }
            })
            return selRows;
        },
        setMultiselectRows:function(rows, scrollrows){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                if(rows){
                    for(var i=0;i<rows.length;i++){
                        if($t.p.multiselectdata.rowsList[rows[i]]){
                            if(!$.isFunction($t.p.multiselectdata.beforeMultiselectRows) || ($.isFunction($t.p.multiselectdata.beforeMultiselectRows) && $t.p.multiselectdata.beforeMultiselectRows(rows[i], null))){
                                $t.p.multiselectdata.rowsList[rows[i]].selected = true;
                                $('tr[id='+rows[i]+']','#'+gID).addClass('ui-state-selected');
                                if($.isFunction($t.p.multiselectdata.onMultiselectRows)){
                                    $t.p.multiselectdata.onMultiselectRows(rows[i],null)
                                }
                                //                                if($t.p.scrollrows===true) {
                                //                                    scrGrid($t.p.multiselectdata.rowsList[rows[i]].index);
                                //                                }
                                if(scrollrows){
                                    scrollToRow(gID, $t.p.multiselectdata.rowsList[rows[i]].index);
                                }
                            }
                        }
                    }
                }
                //old method
                //                function scrGrid(iR){
                //                    var ch = $($t.grid.bDiv)[0].clientHeight,
                //                    st = $($t.grid.bDiv)[0].scrollTop,
                //                    rpos = $t.rows[iR].offsetTop + $t.offsetTop,
                //                    rh = $t.rows[iR].clientHeight;
                //                    if(rpos+rh >= ch+st) {
                //                        $($t.grid.bDiv)[0].scrollTop = rpos-(ch+st)+rh+st;
                //                    }
                //                    else if(rpos < ch+st) {
                //                        if(rpos < st) {
                //                            $($t.grid.bDiv)[0].scrollTop = rpos;
                //                        }
                //                    }
                //                }
                function scrollToRow (gID, rowIndex) {
                    var rowHeight = jQuery("#"+gID).find('tbody').find('tr:eq(2)').height()-1; // Default height
                    jQuery("#"+gID).closest(".ui-jqgrid-bdiv").scrollTop(rowHeight * rowIndex);
                }


            })
        },
        resetMultiselectRows:function(){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                for(var i=0; i<$t.p.multiselectdata.dataIds.length; i++){
                    $t.p.multiselectdata.rowsList[$t.p.multiselectdata.dataIds[i]].selected=false;
                    $t.p.multiselectdata.rowsList[$t.p.multiselectdata.dataIds[i]].focused=false;
                    $('tr[id='+$t.p.multiselectdata.dataIds[i]+']','#'+gID).removeClass('ui-state-selected');
                }
            })
        }
    })
})(jQuery);
