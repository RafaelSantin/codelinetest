<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('room_book', function (Blueprint $table) {
            $table->bigIncrements('ROB_ID');
            $table->bigInteger('ROO_ID')->unsigned();
            $table->date('ROB_DATE_START');
            $table->date('ROB_DATE_END');
            $table->string('ROB_COSTUMER_NAME',200);
            $table->string('ROB_COSTUMER_EMAIL',200);
            $table->bigInteger('USER_ID')->nullable();
            $table->timestamps();
        });


        Schema::table('room_book', function (Blueprint $table) {
            $table->foreign('ROO_ID')->references('ROO_ID')->on('room');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('room_book');
    }
}
