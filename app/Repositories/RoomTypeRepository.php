<?php

namespace App\Repositories;

use App\Models\RoomType;

class RoomTypeRepository 
{
    private $model;

    public function __construct(RoomType $model)
	{
		$this->model = $model;
    }
    
    public function list()
    {
        return $this->model->get();
    }

    public function get($id)
    {
        return $this->model->where('ROT_ID',$id)->first();
    }

    public function store($data)
    {
        $save = new $this->model;

        $save->ROT_NAME = $data['name'];
        $save->ROT_PRICE = $data['price'];
        $save->save();
        return $save;
    }

    public function delete($id)
    {
        return $this->model->where('ROT_ID',$id)->delete();
    }


    public function update($data)
    {
        $update = $this->model->find($data['id']);

        $update->ROT_NAME = $data['name'];
        $update->ROT_PRICE = $data['price'];
        $update->save();
        return $update;
    }
}
