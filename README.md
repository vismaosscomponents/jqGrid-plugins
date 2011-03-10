jqGrid-plugins
==========

Facets
=====

Demo page at [http://hci.mcr.ro:8080/Grid/gridFacets.html](http://hci.mcr.ro:8080/Grid/gridFacets.html)
Instalation
---------------
You need to include facets.js, vismaGris.css and the images folder.

---++ Calling conventions

The facets div is defined, first, in html, positioned above grid definition:
<pre>&lt;div class="vismaGridComponent"&gt;</pre><pre>&lt;div id='facets'&gt;&lt;/div&gt;</pre><pre>&lt;table id='grid_id'&gt;&lt;/table&gt; </pre><pre>&lt;/div&gt; </pre>and then in beforeRequest function, in your grid definition add this:

<pre>beforeRequest: function(){</pre>

<pre>if(!facetsInitialized){</pre>

<pre>jQuery('#facets').jqGrid('facets', '#grid_id', options);</pre>

<pre>facetsInitialized = true;</pre>

<pre>}</pre>

<pre>}</pre>

Where:

   * grid_id is the id of the grid to wich the facets are applied
   * options is an array of settings in name: value pairs format

