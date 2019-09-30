<?php
  
namespace App\Http\Controllers;
  
use App\Repositories\RoomRepository;

use Illuminate\Http\Request;
  
class RoomController extends Controller
{
    private $repository;

    public function __construct(RoomRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        return $this->repository->list();
    }

    public function show($id)
    {
        return $this->repository->get($id);
    }

    public function store(Request $request)
    {        
        $validatedData = $request->validate(['name' => 'required','hotel'=>'required','type'=>'required']);
        $data['name'] = $validatedData['name'];
        $data['hotel'] = $validatedData['hotel'];
        // $data['capacity'] = $validatedData['capacity'];
        $data['type'] = $validatedData['type'];
        return $this->repository->store($data);
    }

    public function update(Request $request,$id)
    {        
        $validatedData = $request->validate(['name' => 'required','hotel'=>'required','type'=>'required']);
        $data['name'] = $validatedData['name'];
        $data['hotel'] = $validatedData['hotel'];
        // $data['capacity'] = $validatedData['capacity'];
        $data['type'] = $validatedData['type'];
        $data['id'] = $id;
        return $this->repository->update($data);
    }

    public function delete($id)
    {                
        return $this->repository->delete($id);
    }

    public function notAvailableDate($id)
    {                        
        return $this->repository->notAvailableDate($id);
    }
}