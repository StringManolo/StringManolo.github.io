<?php

/* Create SQLITE3 database */
$db = new SQLite3("theknowledge.db");

/* Create Portadas Table (Shown at index.html/#/home) using ajax */
$db->exec("CREATE TABLE portadas(id INTERGER PRIMARY KEY, titular TEXT, linkImagen TEXT, contenido TEXT, fecha TEXT, autor TEXT)");

/* Add test parameters to Table */
$db->exec("INSERT INTO portadas(titular, linkImagen, contenido, fecha, autor) VALUES('Titular De Portada', 'https://google.com/favicon.ico', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', datetime('now'), '@XSStringManolo')");

/* Create Articles Table (Shown at index.html/#/articles) using ajax */
$db->exec("CREATE TABLE articulos(id INTERGER PRIMARY KEY, titular TEXT, linkImagen TEXT, contenido TEXT, fecha TEXT, autor TEXT)");

/* Create News Table (Shown at index.html/#/news) using ajax */
$db->exec("CREATE TABLE noticias(id INTERGER PRIMARY KEY, titular TEXT, linkImagen TEXT, contenido TEXT, fecha TEXT, autor TEXT)");

?>
