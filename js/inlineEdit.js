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
    $.jgrid.extend({
        inlineEdit:function (addBtn, editBtn, saveBtn, cancelBtn, newRowData, extraparam, oneditfunc, successfunc, aftersavefunc, errorfunc, afterrestorefunc){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                var inlineEdit = {
                    addBtn:addBtn,
                    editBtn:editBtn,
                    saveBtn:saveBtn,
                    cancelBtn:cancelBtn,
                    newRowData:newRowData,
                    extraparam:extraparam,
                    oneditfunc:oneditfunc,
                    successfunc:successfunc,
                    aftersavefunc:aftersavefunc,
                    errorfunc:errorfunc,
                    afterrestorefunc:afterrestorefunc
                };
                $.extend($t.p, inlineEdit);
                $("#"+gID).delegate("input, select, textarea", 'blur', function(){
                    $($t).jqGrid('validateField', this, $(this).parents('tr').attr('id'));
                });
                $(document).delegate(addBtn, 'click', function(){
                    $($t).jqGrid('inlineAddBtnClick');
                    return false;
                });
                $("#"+gID).delegate('tr', 'dblclick', function(){
                    $($t).jqGrid('inlineEditBtnClick', $(this).attr('id'));
                    return false;
                });
                $("#"+gID).delegate(editBtn, 'click', function(){
                    $($t).jqGrid('inlineEditBtnClick', $(this).parents('tr').attr('id'));
                    return false;
                });
                $("#"+gID).delegate(saveBtn, 'click', function(){
                    $($t).jqGrid('inlineSaveBtnClick', $(this).parents('tr').attr('id'));
                    return false;
                });
                $("#"+gID).delegate(cancelBtn, 'click', function(){
                    $($t).jqGrid('inlineCancelBtnClick', $(this).parents('tr').attr('id'));
                    return false;
                });
            });
        },
        detachInlineEdit:function (){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                $("#"+gID).undelegate("input, select, textarea", 'blur');
            });
        },
        validateField:function (el, rowId){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                var value = $(el).val();
                var fieldId = $(el).attr('id');
                //                if (window.console && console.log) {
                //                                    console.log("blur "+fieldId+" "+value);
                //                }
                var fieldName = fieldId.substring(fieldId.indexOf('_')+1, fieldId.length);
                var colModel = $($t).jqGrid('getGridParam','colModel');
                for(var i = 0; i<colModel.length;i++){
                    if(colModel[i].name === fieldName && colModel[i].validator && $.isFunction(colModel[i].validator.validatorfunction)){
                        if(!colModel[i].validator.validatorfunction(value, gID, rowId)){
                            $(el).addClass('inlineEditError');
                            $(el).attr("showErrorMessage", "true");
                            $(el).inlineError({
                                errorMesage:colModel[i].validator.errormessage,
                                errorClass: 'inlineEditErrorBox'
                            });
                        }else{
                            $(el).removeClass('inlineEditError');
                            $(el).attr("showErrorMessage", "false");
                        }
                    }
                }
            });
        },
        validateAll:function (rowId){
            var res;
            this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                //if($.browser.mozilla){
                $("#"+gID + " tr[id ="+rowId+"] "+$t.p.saveBtn).focus();
                //}
                res = $($t).jqGrid('validateAllFields', rowId);
            //                if(window.console && console.log) {
            //                    console.log("validateAll: "+res);
            //                }
            });
            return res;
        },
        validateAllFields:function (rowId){
            var res;
            this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                //if in add mode we need to trigger blur on each field so it can be validate
                if(rowId == -1){
                    $("#"+gID + " tr[id ="+rowId+"] input[id^= "+rowId+"], #" +gID + " tr[id ="+rowId+"] select[id^= "+rowId+"], #" +gID + " tr[id ="+rowId+"] textarea[id^= "+rowId+"]").filter(':visible').trigger('blur');
                }
                if($("#"+gID + " tr[id ="+rowId+"] input[id^= "+rowId+"], #" +gID + " tr[id ="+rowId+"] select[id^= "+rowId+"], #" +gID + " tr[id ="+rowId+"] textarea[id^= "+rowId+"]").hasClass('inlineEditError')){
                    res= false;
                }else{
                    res= true;
                }
            });
            return res;
        },
        inlineAddBtnClick:function(){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                if(!$("#"+gID+" tr[editable=1]").length>0){
                    $("#"+gID).jqGrid('addRowData', -1, $t.p.newRowData, 'first');
                    $("#"+gID+" tr[id = -1] "+$t.p.editBtn).trigger('click');
                }
                return false;
            });
        },
        inlineEditBtnClick:function(rowId){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                if(!$("#"+gID+" tr[editable=1]").length>0){
                    $("#"+gID).jqGrid('editRow',rowId, false, $t.p.oneditfunc, $t.p.successfunc, null, $t.p.extraparam, $t.p.aftersavefunc, $t.p.errorfunc, $t.p.afterrestorefunc);
                    //                    $("#"+gID+ " tr[id ="+rowId+"] "+$t.p.cancelBtn+", #"+gID+ " tr[id ="+rowId+"] "+$t.p.saveBtn).css({
                    //                        'display':'block'
                    //                    });
                    $("#"+gID+ " tr[id ="+rowId+"] "+$t.p.editBtn).css({
                        'display':'none'
                    });
                    $("#"+gID+ " tr[id ="+rowId+"] "+$t.p.cancelBtn+", #"+gID+ " tr[id ="+rowId+"] "+$t.p.saveBtn).fadeIn('slow');
                }
            });
        },
        inlineSaveBtnClick:function(rowId){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                if($("#"+gID).jqGrid('validateAll',rowId)){
                    $("#"+gID+ " tr[id ="+rowId+"] "+$t.p.saveBtn+", #"+gID+ " tr[id ="+rowId+"] "+$t.p.cancelBtn).css({
                        'display':'none'
                    });
                    $("#"+gID+ " tr[id ="+rowId+"] .activityIndicator").css({
                        'display':'block'
                    });
                    $("#"+gID).jqGrid('saveRow',rowId, $t.p.successfunc, null, $t.p.extraparam, $t.p.aftersavefunc, $t.p.errorfunc, $t.p.afterrestorefunc);
                }
                return false;
            });
        },
        inlineCancelBtnClick:function(rowId){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                $("#"+gID).jqGrid('restoreRow',rowId, $t.p.afterrestorefunc);

                $("#"+gID+ " tr[id ="+rowId+"] "+$t.p.cancelBtn+", #"+gID+ " tr[id ="+rowId+"] "+$t.p.saveBtn).css({
                    'display':'none'
                });
                $("#"+gID+ " tr[id ="+rowId+"] "+$t.p.editBtn).css({
                    'display':'block'
                });
                $('#gridInlineError').hide();
                //$($t.p.error).hide(); not sure what this is doing here anymore
                if(rowId=='-1'){
                    $("#"+gID).delRowData('-1');
                }
                return false;
            });
        },
        endInlineEdit: function(rowId, success, newRowId, newRowData){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                $("#"+gID+ " tr[id ="+rowId+"] .activityIndicator").css({
                        'display':'none'
                    });
                $("#"+gID+ " tr[id ="+rowId+"] "+$t.p.editBtn).css({
                    'display':'block'
                });
                if(success){
                    if(rowId == -1){
                        $("#" + gID+ " tr[id =" + rowId + "]").attr("id", newRowId);
                        rowId = newRowId;
                        $($t.p.addBtn).trigger('click');
                    }
                    if(newRowData != null){
                        $($t).jqGrid('setRowData',rowId, newRowData);
                    }
                }else{
                    $($t).jqGrid('inlineEditBtnClick', rowId);
                }
            });
        }
    })
})(jQuery);
