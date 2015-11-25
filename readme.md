# inkSpots  (prototype version)

Micro script that generates ink splatter type backgrounds based on svg images. The script works by generating a background image on a canvas and then converting that to a png data applied to the target elements

### Version
0.0.1

# Requirements
Since the current version uses SVG images to create the backgrounds on a canvas, this breaks the script in some browsers. A workaround is to use Canvg


# Usage

applyInkSpots('.classname'); //or #id
### or using Jquery:
$('.classname').inkSpots(); //or #id
	

	
License
----
MIT