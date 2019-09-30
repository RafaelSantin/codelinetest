<?php

namespace App\Repositories;

use App\Models\RoomBook;

class RoomBookRepository 
{
    private $model;

    public function __construct(RoomBook $model)
	{
		$this->model = $model;
    }
    
    public function list()
    {
        return $this->model->with('room.type')->get();
    }

    public function get($id)
    {
        return $this->model->with('room.type')->where('ROB_ID',$id)->first();
    }

    public function store($data)
    {
        $save = new $this->model;

        $save->ROO_ID = $data['room'];
        $save->ROB_DATE_END = $data['dateEnd'];
        $save->ROB_DATE_START = $data['dateStart'];
        $save->ROB_COSTUMER_NAME = $data['costumerName'];
        $save->ROB_COSTUMER_EMAIL = $data['costumerEmail'];
        $save->save();
        return $save;
    }

    public function delete($id)
    {
        return $this->model->where('ROB_ID',$id)->delete();
    }


    public function update($data)
    {
        $update = $this->model->find($data['id']);

        $update->ROO_ID = $data['room'];
        $update->ROB_DATE_END = $data['dateEnd'];
        $update->ROB_DATE_START = $data['dateStart'];
        $update->ROB_COSTUMER_NAME = $data['costumerName'];
        $update->ROB_COSTUMER_EMAIL = $data['costumerEmail'];
        $update->save();
        return $update;
    }

    public function getBookByDateRange($data)
    {
        return $this
                ->model
                ->where('ROO_ID', $data['room'])
                ->where(function($q) use ($data){
                    $q->where(function($q)use($data){
                        $q->where('ROB_DATE_END','>=', $data['dateStart']);
                        $q->where( 'ROB_DATE_START','=', $data['dateStart']);
                    });
                    $q->orWhere(function ($q) use ($data) {
                        $q->where('ROB_DATE_END', '>=',$data['dateEnd']);
                        $q->where( 'ROB_DATE_START', '<=',  $data['dateEnd']);
                    });
                    $q->orWhere(function ($q) use ($data) {
                        $q->where( 'ROB_DATE_END', '<=',  $data['dateEnd']);
                        $q->where( 'ROB_DATE_START', '>=',  $data['dateStart']);
                    });
                })
                ->first();
    }
}
