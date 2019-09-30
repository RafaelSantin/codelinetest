<?php
  
namespace App\Http\Controllers;
  
use App\Repositories\RoomCapacityRepository;

use Illuminate\Http\Request;
  
class RoomCapacityController extends Controller
{
    private $repository;

    public function __construct(RoomCapacityRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        return $this->repository->list();
    }

    public function get($id)
    {
        return $this->repository->get($id);
    }

    public function store(Request $request)
    {        
        $validatedData = $request->validate(['name' => 'required']);
        $data['name'] = $validatedData['name'];
        return $this->repository->store($data);
    }

    public function update(Request $request,$id)
    {        

        $validatedData = $request->validate(['name' => 'required']);
        $data['name'] = $validatedData['name'];       
        $data['id'] = $id;
        return $this->repository->update($data);
    }

    public function delete($id)
    {                
        return $this->repository->delete($id);
    }
}