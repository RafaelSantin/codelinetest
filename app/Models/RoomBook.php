<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoomBook extends Model
{
    protected $table = 'room_book';
    protected $primaryKey = 'ROB_ID';

    // public function capacity()
    // {
    //     return $this->hasOne('App\Models\RoomCapacity','ROC_ID','ROC_ID');
    // } 
    
    public function room()
    {
        return $this->hasOne('App\Models\Room','ROO_ID','ROO_ID');
    } 
    

}
