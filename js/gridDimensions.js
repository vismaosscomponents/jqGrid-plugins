;
(function($){
    $.jgrid.extend({
        fixGridHeight:function (){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                var rowsNo = $t.p.noOfViewableRows;
                var totalRows = $('#'+gID).jqGrid('getDataIDs').length;
                if(rowsNo>totalRows){
                    rowsNo = totalRows
                }
                rowsNo=rowsNo==0?1:rowsNo;
                $('#'+gID).jqGrid('setGridHeight',rowsNo*18+'px');
              
            });
        },
        fixGridHeightForEdit:function (){
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                var rowsNo = $t.p.noOfViewableRows;
                var totalRows = $('#'+gID).jqGrid('getDataIDs').length;
                if(rowsNo>totalRows){
                    rowsNo = totalRows
                }
                rowsNo=rowsNo<2?2:rowsNo;
                $('#'+gID).jqGrid('setGridHeight',rowsNo*18+'px');

            });
        },
        fixGridWidth : function (gridContainer) {
            return this.each(function(){
                var $t = this;
                var gID = $t.p.id;
                width = $('#'+gID).closest(gridContainer).width();
                $('#'+gID).jqGrid('setGridWidth',width, true);
            });
        },
        fixGridWidthPayroll : function (gridContainer) {
            return this.each(function(){
                var $t = this;
                var gID = $t.id;
                width = $('#'+gID).closest(gridContainer).width();
                $('#'+gID).jqGrid('setGridWidth',width, true);
            });
        }
    })
})(jQuery);

