<?php

namespace App\Repositories;

use App\Models\Room;

class RoomRepository 
{
    private $model;

    public function __construct(Room $model)
	{
		$this->model = $model;
    }
    
    public function list()
    {
        return $this->model->with('hotel')->with('type')->get();
    }

    public function get($id)
    {
        return $this->model->with('hotel')->with('type')->where('ROO_ID',$id)->first();
    }

    public function store($data)
    {
        $save = new $this->model;

        $save->ROO_NAME = $data['name'];
        $save->ROT_ID = $data['type'];
        // $save->ROC_ID = $data['capacity'];
        $save->HOT_ID = $data['hotel'];
        $save->ROO_IMAGE = '';
        $save->save();
        return $save;
    }

    public function delete($id)
    {
        return $this->model->where('ROO_ID',$id)->delete();
    }


    public function update($data)
    {
        $update = $this->model->find($data['id']);

        $update->ROO_NAME = $data['name'];
        $update->ROT_ID = $data['type'];
        // $update->ROC_ID = $data['capacity'];
        $update->HOT_ID = $data['hotel'];
        $update->save();
        return $update;
    }


    public function notAvailableDate($id)
    {
        return $this->model->with('book')->with('type')->where('ROO_ID',$id)->first();
    }
}
