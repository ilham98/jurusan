<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1'], function () {
	Route::post('login', 'API\LoginController@login');
	Route::get('refresh_token', 'API\TokenController@refreshToken');
    Route::get('jadwal', 'API\JadwalController@index');
    Route::get('kelas', 'API\KelasController@index');
    Route::get('hari', 'API\HariController@index');
    Route::get('mata-kuliah', 'API\MataKuliahController@index');
    Route::get('ruangan', 'API\RuanganController@index');
    Route::get('dosen', 'API\DosenController@index');
    Route::get('prodi', 'API\ProdiController@index');
    Route::get('berita', 'API\BeritaController@index');
    Route::get('modul', 'API\ModulController@index');
    Route::get('dosen/{nidn}/modul', 'API\DosenModulController@index');
    Route::get('dosen/{nidn}/jadwal', 'API\DosenJadwalController@index');
});

Route::group(['prefix' => 'v1', 'middleware' => 'auth:admin'], function () {
	Route::post('jadwal', 'API\JadwalController@store');
});

Route::group(['prefix' => 'v1', 'middleware' => 'auth:dosen'], function () {
    Route::post('modul', 'API\ModulController@store');
    Route::delete('modul/{id}', 'API\ModulController@destroy');
});