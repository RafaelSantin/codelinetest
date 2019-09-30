<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Room extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('room', function (Blueprint $table) {
            $table->bigIncrements('ROO_ID');
            $table->string('ROO_NAME');
            $table->bigInteger('HOT_ID')->unsigned();
            $table->bigInteger('ROT_ID')->unsigned();
            $table->binary('ROO_IMAGE');
            $table->timestamps();
        });


        Schema::table('room', function (Blueprint $table) {
            $table->foreign('HOT_ID')->references('HOT_ID')->on('hotel');
            $table->foreign('ROT_ID')->references('ROT_ID')->on('room_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('room');
    }
    
}
