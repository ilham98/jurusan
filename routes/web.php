<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/test', function() {
	return view('test');
});

Route::get('/generate/sk-pengajaran', 'Export\SkPengajaran@generate');

Route::get('/{path}', function () {
    return view('welcome');
})->where( 'path', '([A-z\d\-/_.]+)?' );