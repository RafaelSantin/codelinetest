<?php
  
namespace App\Http\Controllers;
  
use App\Repositories\HotelRepository;

use Illuminate\Http\Request;
  
class HotelController extends Controller
{
    private $repository;

    public function __construct(HotelRepository $repository)
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

    public function update(Request $request, $id)
    {        
        $validatedData = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'country' => 'required',
            'zipCode' => 'required',
            'phone' => 'required',
            'email' => 'required'
        ]);
         $data['name'] = $validatedData['name'];
         $data['address'] = $validatedData['address'];
         $data['city'] = $validatedData['city'];
         $data['state'] = $validatedData['state'];
         $data['country'] = $validatedData['country'];
         $data['zipCode'] = $validatedData['zipCode'];
         $data['phone'] = $validatedData['phone'];
         $data['email'] = $validatedData['email'];
         $data['id'] = $id;

        return $this->repository->update($data);
    }
}