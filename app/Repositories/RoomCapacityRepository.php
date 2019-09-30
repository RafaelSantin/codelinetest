<?php

namespace App\Repositories;

use App\Models\RoomCapacity;

class RoomCapacityRepository 
{
    private $model;

    public function __construct(RoomCapacity $model)
	{
		$this->model = $model;
    }
    
    public function list()
    {
        return $this->model->get();
    }

    public function get($id)
    {
        return $this->model->where('ROC_ID',$id)->first();
    }

    public function store($data)
    {
        $save = new $this->model;

        $save->ROC_NAME = $data['name'];
        $save->save();
        return $save;
    }

    public function delete($id)
    {
        return $this->model->where('ROC_ID',$id)->delete();
    }


    public function update($data)
    {
        $update = $this->model->find($data['id']);

        $update->ROC_NAME = $data['name'];
        $update->save();
        return $update;
    }
}
