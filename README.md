jqGrid-plugins
==========

Facets
=====

Demo page at [http://hci.mcr.ro:8080/Grid/gridFacets.html](http://hci.mcr.ro:8080/Grid/gridFacets.html)
Instalation
---------------
You need to include facets.js, vismaGris.css and the images folder.

Calling conventions
----------------------------
<pre>&lt;div class="vismaGridComponent"&gt;
&lt;div id='facets'&gt;&lt;/div&gt;
&lt;table id='grid_id'&gt;&lt;/table&gt; 
&lt;/div&gt; </pre>
and then in beforeRequest function, in your grid definition add this:

<pre>beforeRequest: function(){</pre>
