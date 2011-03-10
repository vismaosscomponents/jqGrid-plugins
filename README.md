jqGrid-plugins
==========

Facets
=====

Demo page at [http://hci.mcr.ro:8080/Grid/gridFacets.html](http://hci.mcr.ro:8080/Grid/gridFacets.html)
Instalation
---------------
You need to include facets.js, vismaGris.css.
<pre><link href="css/grid/vismaGrid.css" rel="stylesheet" type="text/css"/>
<script src="js/facets.js" type="text/javascript"></script></pre>

Calling conventions
----------------------------
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
