<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RoomTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('room_type')->insert(
            [
            'ROT_NAME' => Str::random(10),
            'ROT_PRICE' => rand(20,200),
        ]); DB::table('room_type')->insert(
            [
            'ROT_NAME' => Str::random(10),
            'ROT_PRICE' => rand(20,200),
        ]); DB::table('room_type')->insert(
            [
            'ROT_NAME' => Str::random(10),
            'ROT_PRICE' => rand(20,200),
        ]); DB::table('room_type')->insert(
            [
            'ROT_NAME' => Str::random(10),
            'ROT_PRICE' => rand(20,200),
        ]); DB::table('room_type')->insert(
            [
            'ROT_NAME' => Str::random(10),
            'ROT_PRICE' => rand(20,200),
        ]
    );
    }
}
