# jqGrid-plugins

## Multiselect
This plugin allows you to do rows selection in the grid, Windows Explorer multi-select style (click, shift, ctrl).

Demo page: [http://osi.visma.com/cc/Grid/gridMasterDetail.html](http://osi.visma.com/cc/Grid/gridMasterDetail.html) and check this too [http://osi.visma.com/cc/Grid/gridMultiselect.html](http://osi.visma.com/cc/Grid/gridMultiselect.html)
## Instalation
You need to include multiselect.js and vismaGrid.css.
<pre>&lt;link href="css/grid/vismaGrid.css" rel="stylesheet" type="text/css"/&gt;
&lt;script src="js/multiselect.js" type="text/javascript"/&gt;
</pre>

##Methods

   * multiselect
   * getMultiselectRows
   * resetMultiselectRows
   * setMultiselectRows

These methods can be called, of course, only on an already-constructed grid, from a button click or from an event of the grid itself:

###multiselect
Calling conventions

<pre>jQuery('#grid_id').jqGrid('multiselect', beforeMultiselectRows, onMultiselectRows);</pre>

Where:

   * grid_id: is the already constructed grid
   * beforeMultiselectRows : if defined this function is called before the row is selected. Parameters passed to this function are the rowid and the event object. This event should return boolean true or false. If the event return true the selection is done. If the event return false the row is not selected and any other action if defined does not occur.
   * onMultiselectRows: if defined this function is called after the row was selected. Parameters passed to this function are the rowid and the event object.
This method initialize the multiselect plugin. This methos needs to be called after each grid reload.

Example:
<pre>
jQuery('#grid_id').jqGrid({

   ...

   gridComplete:function(){ 

   jQuery('#grid_id').jqGrid('multiselect', beforeMultiselectRows, onMultiselectRows);}

   ... 

});</pre>

###getMultiselectRows
Calling conventions

<pre>jQuery('#grid_id').jqGrid('getMultiselectRows');</pre>

Where:

   * grid_id: is the already constructed grid
  
This method returns an array with the ids of the rows that are selected in the grid.


###resetMultiselectRows
Calling conventions

<pre>jQuery('#grid_id').jqGrid('resetMultiselectRows');</pre>

Where:

   * grid_id: is the already constructed grid
  
Returns none.
Resets (unselect) the selected rows(s).

###setMultiselectRows
Calling conventions

<pre>jQuery('#grid_id').jqGrid('setMultiselectRows', [rowsid], scrollrows);</pre>

Where:

   * grid_id: is the already constructed grid
   * [rowsid]: an array with the ids of the rows that you want to select in the grid.
   * scrollrows: boolean. If scrollrows is true then will scroll to the last row selected, otherwise not.
Selects the specific rows.