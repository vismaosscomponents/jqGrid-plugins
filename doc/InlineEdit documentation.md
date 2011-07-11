# jqGrid-plugins

## Inline editing
This plugin is built on an already existing module (Inline Editing) in jqGrid.
To use inline edit, users clicks on the edit button. In response, jqGrid converts each editable field to a data entry cell, as seen in the demo. Cells that aren't editable don't change appearance and remain read-only. Whether an individual column is editable or read-only is controlled by setting the attribute in the ColModel. When finished, users hit the save button to send the data to the server or cancel button to restore the data.

Demo page: [http://osi.visma.com/cc/Grid/gridInlineEdit.html](http://osi.visma.com/cc/Grid/gridInlineEdit.html)
## Installation
You need to include inlineEdit.js, inlineError.js, vismaGrid.css and respect the other software requirements from the already existing module inline editing.
<pre>&lt;link href="css/grid/vismaGrid.css" rel="stylesheet" type="text/css"/&gt;
&lt;script src="js/inlineEdit.js" type="text/javascript"/&gt;
&lt;script src="js/inlineError.js" type="text/javascript"/&gt;</pre>

##Methods

   * inlineEdit
   * endInlineEdit

###inlineEdit
Calling conventions
<pre>&lt;div class="vismaGridComponent"&gt;
&lt;table id='grid_id'&gt;&lt;/table&gt; 
&lt;/div&gt; </pre>
and after defining the grid

<pre>jQuery('#grid_id').jqGrid('inlineEdit','#addButton', '#editButton', '#saveButton', '#cancelButton', newRowData, extraparam, oneditfunc, successfunc, aftersavefunc, errorfunc, afterrestorefunc);</pre>

Where:

   * grid_id: is the already constructed grid
   * addButton: is the add button for the grid
   * editButton: is the edit button
   * saveButton: is the save button
   * cancelButton: is the cancel button
   * newRowData: an array of type name:value. These are the (default) values used to fill the input fields when a new record is added (user clicks the add button)
   * extraparam: an array of type name: value. When set these values are posted along with the other values to the server
   * oneditfunc: fires after successfully accessing the row for editing, prior to allowing user access to the input fields. The row's id is passed as a parameter to this function.
   * succesfunc: if defined, this function is called immediately after the request is successful. This function is passed the data returned from the server. Depending on the data from server; this function should return true or false.
   * aftersavefunc: if defined, this function is called after the data is saved to the server. Parameters passed to this function are the rowid and the response from the server request
   * errorfunc: if defined, this function is called after the data is saved to the server. Parameters passed to this function are the rowid and the the response from the server request.
   * afterrestorefunc if defined, this function is called (in case the row is not saved with success) after restoring the row. To this function we pass the rowed

The parameters functions should not be enclosed in quotes and not entered with () - show just the name of the function.

Except when editurl is 'clientArray', when this method is called, the data from the particular row is POSTED to the server in format name: value, where the name is a name from colModel and the value is the new value. jqGrid also adds, to the posted data, the pair id: rowid.

Additionally to this we have other two options which can be set in grid options.
   
<table>
<tr>
<th>Option</th>
<th>Type</th>
<th>Description</th>
<th>Default</th>
</tr>
<tr>
<td>ajaxRowOptions</td>
<td>object</td>
<td>This option allow to set global ajax settings for the row editing when we save the data to the server. Note that with this option is possible to overwrite all current ajax setting in the save request including the complete event.</td>
<td>empty object</td>
</tr>
<tr>
<td>serializeRowData</td>
<td>postdata</td>
<td>If set this event can serialize the data passed to the ajax request when we save a row. The function should return the serialized data. This event can be used when a custom data should be passed to the server - e.g - JSON string, XML string and etc. To this event is passed the data which will be posted to the server.</td>
<td>null</td>
</tr>
</table>

###endInlineEdit
Calling conventions

<pre>jQuery('#grid_id').jqGrid('endInlineEdit', rowid, success, newrowid);</pre>

Where:

   * grid_id: is the already constructed grid
   * rowid: is the id of the row that was edited/added
   * success: (boolean) true if save was successful, false if not
   * newrowid: needed when a new row is added (if the row was just edited this can be null). When a new row is added (addButton is clicked) the id of the new row is -1. If the save was successful we need to modify the id of the row with the newrowid.

Usually this method is called in the aftersavefunc (from inlineEdit).

##Validator property in ColModel API
In ColModel API we added another property: validator, object wich contains a validator function and error message for the edited cell.

<table>
<tr>
<th>Option</th>
<th>Type</th>
<th>Description</th>
<th>Default</th>
</tr>
<tr>
<td>validatorfunction</td>
<td>function</td>
<td>If set this function is called when the input element loses focus (onblur). To this function we pass the cell value, grid id and row id. This function is used for client side validation, and should return true if the cellValue is correct or false if not. An error message will be displayed if the function return false..</td>
<td>none</td>
</tr>
<tr>
<td>errormessage</td>
<td>string</td>
<td>The error message to display when validatorfunction returned false. The error message will be displayed when the input gain focus (focusin) and hided on focusout.</td>
<td>none</td>
</tr>
</table>

###Example of validator definition in ColModel
<pre>
{name:'firstName',
 index:'firstName',
 align:'left',
 width:100,
 editable:true,
 validator:{validatorfunction: function (value, gridId, rowId) {return !isEmpty(value);},
      errormessage:"This value can't be empty!"
          }
},
</pre>

##Notes
###How is the data organized

When the row is edited and the input elements are created we set the following rules:

   * the table row becomes attribute editable="1"
   * the array savedRow (option in the grid) is filled with the values before the editing. This is a name:value pair array with additional pair id:rowed
   * if we are adding a new row to the grid the id of the new row will be -1.
   * hidden fields are not included
   * the id of the editable element is constructed as 'rowid_'+ the name from the colModel array. Example if we edit row with id=10 and the only editable element is 'myname' (from colModel) then the id becomes 10_myname.
   * the name of the editable element is constructed from the name of the colModel array - property - name
   * after the row is saved or restored the editable attribute is set to "0" and the savedRow item with id=rowid is deleted

###What is posted to the server?

   *  when the data is posted to the server we construct an object {} that contain(s):
   * the name:value pair where the name is the name of the input element represented in the row (this is for all input elements)
   * additionally we add a pair id:rowid where the rowid is the id of the row. If we are adding a new row to the grid then rowid will be -1
   * if the extraparam parameter is not empty we extend this data with the posted data
