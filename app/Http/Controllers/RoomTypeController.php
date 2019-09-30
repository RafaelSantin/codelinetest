<?php
  
namespace App\Http\Controllers;
  
use App\Repositories\RoomTypeRepository;

use Illuminate\Http\Request;
  
class RoomTypeController extends Controller
{
    private $repository;

    public function __construct(RoomTypeRepository $repository)
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
        $validatedData = $request->validate(['name' => 'required','price'=>'required']);
        $data['name'] = $validatedData['name'];
        $data['price'] = $validatedData['price'];
        return $this->repository->store($data);
    }

    public function update(Request $request,$id)
    {        
        $validatedData = $request->validate(['name' => 'required', 'price' => 'required']);
        $data['name'] = $validatedData['name'];
        $data['price'] = $validatedData['price'];
        $data['id'] = $id;
        return $this->repository->update($data);
    }

    public function delete($id)
    {                
        return $this->repository->delete($id);
    }
}