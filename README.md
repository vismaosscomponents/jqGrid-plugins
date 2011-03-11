#jqGrid-plugins


##Facets


Demo page at [http://hci.mcr.ro/Grid/gridFacets.html](http://hci.mcr.ro/Grid/gridFacets.html)
####Instalation

You need to include facets.js and vismaGrid.css
<pre>&lt;link href="css/grid/vismaGrid.css" rel="stylesheet" type="text/css"/&gt;
&lt;script src="js/facets.js" type="text/javascript"/&gt;</pre>

####Calling conventions

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

#### Options
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

#### Facets API
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

#####Example of facet definition in ColModel
 <pre>
{ name: "Country",
  index: "country",
  width: 100,
  formatter: showCountryName,
  editable: true,
  edittype: "select", 
  editoptions: {value: "Fi:Finland;No:Norway;Ro:Romania;Sw:Sweden"},
  facet:[{name:'All',
            index:'ALL'&#44;
            selected:true }&#44; 
           {name:'Finland',
            index:'Fi'},
           {name:'Norway',
            index:'No'},
           {name:'Romania',
            index:'Ro'},
           {name:'Sweden',
            index:'Sw'}]
},
 </pre> 
