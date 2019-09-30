<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RoomBookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('room_book')->insert(
            [
            'ROO_ID' => rand(1,10),
            'ROB_DATE_START' => '2019-06-10',
            'ROB_DATE_END' => '2019-06-12',
            'ROB_COSTUMER_NAME' => Str::random(10),
            'ROB_COSTUMER_EMAIL' => Str::random(10).'@gmail.com',
        ]); DB::table('room_book')->insert(
            [
            'ROO_ID' => rand(1,10),
            'ROB_DATE_START' => '2019-05-10',
            'ROB_DATE_END' => '2019-05-12',
            'ROB_COSTUMER_NAME' => Str::random(10),
            'ROB_COSTUMER_EMAIL' => Str::random(10).'@gmail.com',
        ]); DB::table('room_book')->insert(
            [
            'ROO_ID' => rand(1,10),
            'ROB_DATE_START' => '2019-06-23',
            'ROB_DATE_END' => '2019-06-27',
            'ROB_COSTUMER_NAME' => Str::random(10),
            'ROB_COSTUMER_EMAIL' => Str::random(10).'@gmail.com',
        ]); DB::table('room_book')->insert(
            [
            'ROO_ID' => rand(1,10),
            'ROB_DATE_START' => '2019-06-01',
            'ROB_DATE_END' => '2019-06-12',
            'ROB_COSTUMER_NAME' => Str::random(10),
            'ROB_COSTUMER_EMAIL' => Str::random(10).'@gmail.com',
        ]); DB::table('room_book')->insert(
            [
            'ROO_ID' => rand(1,10),
            'ROB_DATE_START' => '2019-07-10',
            'ROB_DATE_END' => '2019-07-12',
            'ROB_COSTUMER_NAME' => Str::random(10),
            'ROB_COSTUMER_EMAIL' => Str::random(10).'@gmail.com',
        ]); DB::table('room_book')->insert(
            [
            'ROO_ID' => rand(1,10),
            'ROB_DATE_START' => '2019-07-20',
            'ROB_DATE_END' => '2019-07-01',
            'ROB_COSTUMER_NAME' => Str::random(10),
            'ROB_COSTUMER_EMAIL' => Str::random(10).'@gmail.com',
        ]); DB::table('room_book')->insert(
            [
            'ROO_ID' => rand(1,10),
            'ROB_DATE_START' => '2019-08-08',
            'ROB_DATE_END' => '2019-08-12',
            'ROB_COSTUMER_NAME' => Str::random(10),
            'ROB_COSTUMER_EMAIL' => Str::random(10).'@gmail.com',
        ]); DB::table('room_book')->insert(
            [
            'ROO_ID' => rand(1,10),
            'ROB_DATE_START' => '2019-05-10',
            'ROB_DATE_END' => '2019-06-12',
            'ROB_COSTUMER_NAME' => Str::random(10),
            'ROB_COSTUMER_EMAIL' => Str::random(10).'@gmail.com',
        ]); DB::table('room_book')->insert(
            [
            'ROO_ID' => rand(1,10),
            'ROB_DATE_START' => '2019-06-20',
            'ROB_DATE_END' => '2019-06-22',
            'ROB_COSTUMER_NAME' => Str::random(10),
            'ROB_COSTUMER_EMAIL' => Str::random(10).'@gmail.com',
        ]); DB::table('room_book')->insert(
            [
            'ROO_ID' => rand(1,10),
            'ROB_DATE_START' => '2019-07-20',
            'ROB_DATE_END' => '2019-07-22',
            'ROB_COSTUMER_NAME' => Str::random(10),
            'ROB_COSTUMER_EMAIL' => Str::random(10).'@gmail.com',
        ]
    
    );
    }
}
