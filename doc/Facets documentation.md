# jqGrid-plugins

## Facets
This is a plugin that adds [faceted search](http://en.wikipedia.org/wiki/Faceted_search) to jqGrid. In practice, it's a way to filter data in one or more columns. Examples could be showing all items with a particular status.

You can have more than one facet for a grid, and they can be based both on grid data (such as status active/inactive) and on queries (such as dates, this week/last week/last month/etc).

Demo page: [http://osi.visma.com/cc/Grid/gridFacets.html](http://osi.visma.com/cc/Grid/gridFacets.html)
## Installation
You need to include facets.js and vismaGrid.css
<pre>&lt;link href="css/grid/vismaGrid.css" rel="stylesheet" type="text/css"/&gt;
&lt;script src="js/facets.js" type="text/javascript"/&gt;</pre>

## Calling conventions
<pre>&lt;div class="vismaGridComponent"&gt;
&lt;div id='facets'&gt;&lt;/div&gt;
&lt;table id='grid_id'&gt;&lt;/table&gt; 
&lt;/div&gt; </pre>
and then in beforeRequest function, in your grid definition add this:

<pre>beforeRequest: function(){
if(!facetsInitialized){
jQuery('#facets').jqGrid('facets', '#grid_id', options);
facetsInitialized = true;
}
}</pre>

Where:

   * grid_id is the id of the grid to wich the facets are applied
   * options is an array of settings in name: value pairs format

## Options
<table>
<tr>
<th>Option</th>
<th>Type</th>
<th>Description</th>
<th>Default</th>
</tr>
<tr>
<td>stringifyData</td>
<td>boolean</td>
<td>If set to true the data (facets data) that will be added to the postData parameter will be in JSON string format.</td>
<td>false</td>
</tr>
</table>

In ColModel API we added another property: facet; an array which describes the parameters of the facets.

## Facets API
<table>
<tr>
<th>Option</th>
<th>Type</th>
<th>Description</th>
<th>Default</th>
</tr>
<tr>
<td>name</td>
<td>string</td>
<td>Set the name for each facet. (what will apper on the screen).</td>
<td>none</td>
</tr>
<tr>
<td>index</td>
<td>string</td>
<td>Set the index for each facet. (what is passed to server).</td>
<td>none</td>
</tr>
<tr>
<td>selected</td>
<td>boolean</td>
<td>Defines if the option is selected or not..</td>
<td>false</td>
</tr>
</table>

### Example of facet definition in ColModel
<pre><code>
{ name: "Country",
  index: "country",
  width: 100,
  formatter: showCountryName,
  editable: true,
  edittype: "select", 
  editoptions: {value: "Fi:Finland;No:Norway;Ro:Romania;Sw:Sweden"},
  facet:[{name:'All', index:'ALL', selected:true},
    {name:'Finland', index:'Fi'},
    {name:'Norway', index:'No'},
    {name:'Romania', index:'Ro'},
    {name:'Sweden', index:'Sw'}]
},
</code></pre>
### Data posted to the server
When the data is posted to the server we construct an array [] of 1 or more objects {} that contains:

* the index:val pair where the val is the index of column where the facet was defined
* the value:val pair where the val is the index of the selected facet

This array is added to the postData parameters with the name facets.