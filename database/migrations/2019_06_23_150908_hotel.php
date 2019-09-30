<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Hotel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hotel', function (Blueprint $table) {
            $table->bigIncrements('HOT_ID');
            $table->string('HOT_NAME');
            $table->string('HOT_ADDRESS');
            $table->string('HOT_CITY');
            $table->string('HOT_STATE');
            $table->string('HOT_COUNTRY');
            $table->string('HOT_ZIP_CODE');
            $table->string('HOT_PHONE');
            $table->string('HOT_EMAIL');
            $table->timestamps();
        });

        DB::statement("ALTER TABLE hotel ADD HOT_IMAGE LONGBLOB");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('hotel');
    }
}
