<?php

namespace App\Repositories;

use App\Models\Hotel;

class HotelRepository 
{
    private $model;

    public function __construct(Hotel $model)
	{
		$this->model = $model;
    }
    
    public function list()
    {
        return $this->model->get();
    }

    public function get($id)
    {
        return $this->model->where('HOT_ID',$id)->first();
    }

    public function update($data)
    {
        $update = $this->model->find($data['id']);

        $update->HOT_NAME = $data['name'];
        $update->HOT_ADDRESS = $data['address'];
        $update->HOT_CITY = $data['city'];
        $update->HOT_STATE = $data['state'];
        $update->HOT_COUNTRY = $data['country'];
        $update->HOT_ZIP_CODE = $data['zipCode'];
        $update->HOT_PHONE = $data['phone'];
        $update->HOT_EMAIL = $data['email'];
        $update->save();

        return $update;
    }
}
