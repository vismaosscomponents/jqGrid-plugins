# jqGrid-plugins

## FixGridWidth
Plugin that enables the jqGrid to resize when the browser window is resized.
Demo page: [http://osi.visma.com/cc/Grid/gridFacets.html](http://osi.visma.com/cc/Grid/gridFacets.html) resize the browser window.

## Installation
You need to include gridDimensions.js

## Calling conventions
<pre>&lt;div class="vismaGridComponent"&gt;
&lt;table id='grid_id'&gt;&lt;/table&gt; 
&lt;/div&gt; </pre>

<pre>
jQuery(window).bind('resize', function() {jQuery('#grid_id').jqGrid('fixGridWidth','.vismaGridComponent');}).trigger('resize');
</pre>

Where:

   * grid_id is the id of the grid
   * vismaGridComponent is the div that contains the grid; the width off this div will be applied to our grid 