<?php

/**
 * Generates a JSON file containing the list of files in the 'image-list' folder
 */

$s = '';
$s .= '{"list":[';

$il = glob('image-list/*');
for ($i = 0; $i < count($il); $i++) {
	if ( 0 != $i ) $s .= ',';
	$s .= '"' . $il[$i] . '"';
}

$s .= ']}';

echo $s;

?>