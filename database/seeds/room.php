<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('room')->insert(
            [
            'ROO_NAME' => Str::random(10),
            'HOT_ID' => 1,
            'ROT_ID' => rand(1,5),
            'ROO_IMAGE' => ''
        ]); DB::table('room')->insert(
            [
            'ROO_NAME' => Str::random(10),
            'HOT_ID' => 1,
            'ROT_ID' => rand(1,5),
            'ROO_IMAGE' => ''
        ]); DB::table('room')->insert(
            [
            'ROO_NAME' => Str::random(10),
            'HOT_ID' => 1,
            'ROT_ID' => rand(1,5),
            'ROO_IMAGE' => ''
        ]); DB::table('room')->insert(
            [
            'ROO_NAME' => Str::random(10),
            'HOT_ID' => 1,
            'ROT_ID' => rand(1,5),
            'ROO_IMAGE' => ''
        ]); DB::table('room')->insert(
            [
            'ROO_NAME' => Str::random(10),
            'HOT_ID' => 1,
            'ROT_ID' => rand(1,5),
            'ROO_IMAGE' => ''
        ]); DB::table('room')->insert(
            [
            'ROO_NAME' => Str::random(10),
            'HOT_ID' => 1,
            'ROT_ID' => rand(1,5),
            'ROO_IMAGE' => ''
        ]); DB::table('room')->insert(
            [
            'ROO_NAME' => Str::random(10),
            'HOT_ID' => 1,
            'ROT_ID' => rand(1,5),
            'ROO_IMAGE' => ''
        ]); DB::table('room')->insert(
            [
            'ROO_NAME' => Str::random(10),
            'HOT_ID' => 1,
            'ROT_ID' => rand(1,5),
            'ROO_IMAGE' => ''
        ]); DB::table('room')->insert(
            [
            'ROO_NAME' => Str::random(10),
            'HOT_ID' => 1,
            'ROT_ID' => rand(1,5),
            'ROO_IMAGE' => ''
        ]); DB::table('room')->insert(
            [
            'ROO_NAME' => Str::random(10),
            'HOT_ID' => 1,
            'ROT_ID' => rand(1,5),
            'ROO_IMAGE' => ''
        ]
    );
    }
}
