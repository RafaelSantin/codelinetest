<?php

use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = public_path('image/hotel.jpg');
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = base64_encode($data);
        DB::table('hotel')->insert([
            'HOT_NAME' => 'New awesome hotel',
            'HOT_ADDRESS' => 'Costas Street',
            'HOT_CITY' => 'Orlando',
            'HOT_STATE' => 'Florida',
            'HOT_COUNTRY' => 'USA',
            'HOT_ZIP_CODE' => '123332',
            'HOT_PHONE' => '13334-43434',
            'HOT_EMAIL' => 'newawesomehotel@email.com',
            'HOT_IMAGE' =>  $base64
            ]);
    }
}      
