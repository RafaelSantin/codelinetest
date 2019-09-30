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

//process login was initiated but was removed on the scope change so was not continued
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('hotel')->group(function () {
    Route::get('/', 'HotelController@index');
    Route::get('/{id}', 'HotelController@show');
    Route::put('/{id}', 'HotelController@update');
});

Route::prefix('room-type')->group(function () {
    Route::post('/', 'RoomTypeController@store');
    Route::put('/{id}', 'RoomTypeController@update');
    Route::get('/', 'RoomTypeController@index');
    Route::get('/{id}', 'RoomTypeController@show');
    Route::delete('/{id}', 'RoomTypeController@delete');
});

Route::prefix('room-capacity')->group(function () {
    Route::post('/', 'RoomCapacityController@store');
    Route::put('/{id}', 'RoomCapacityController@update');
    Route::get('/', 'RoomCapacityController@index');
    Route::get('/{id}', 'RoomCapacityController@get');
    Route::delete('/{id}', 'RoomCapacityController@delete');
});

Route::prefix('room')->group(function () {
    Route::post('/', 'RoomController@store');
    Route::put('/{id}', 'RoomController@update');
    Route::get('/', 'RoomController@index');
    Route::get('/{id}', 'RoomController@show');
    Route::get('/room-not-available-date/{id}', 'RoomController@notAvailableDate');
    Route::delete('/{id}', 'RoomController@delete');
});

Route::prefix('room-book')->group(function () {
    Route::post('/', 'RoomBookController@store');
    Route::put('/{id}', 'RoomBookController@update');
    Route::get('/', 'RoomBookController@index');
    Route::get('/{id}', 'RoomBookController@show');
    Route::delete('/{id}', 'RoomBookController@delete');
});