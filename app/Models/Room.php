<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $table = 'room';
    protected $primaryKey = 'ROO_ID';

    // public function capacity()
    // {
    //     return $this->hasOne('App\Models\RoomCapacity','ROC_ID','ROC_ID');
    // } 
    
    public function type()
    {
        return $this->hasOne('App\Models\RoomType','ROT_ID','ROT_ID');
    } 
    
    public function hotel()
    {
        return $this->hasOne('App\Models\Hotel','HOT_ID','HOT_ID');
    }

    public function book()
    {
        return $this->hasMany('App\Models\RoomBook','ROO_ID', 'ROO_ID');
    }
}
