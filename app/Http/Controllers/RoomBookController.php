<?php
  
namespace App\Http\Controllers;
  
use App\Repositories\RoomBookRepository;

use Illuminate\Http\Request;
  
class RoomBookController extends Controller
{
    private $repository;

    public function __construct(RoomBookRepository $repository)
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
        $validatedData = $request->validate(['room' => 'required','dateStart'=>'required','dateEnd'=>'required','costumerEmail'=>'required','costumerName'=>'required']);
        $data['room'] = $validatedData['room'];
        $dateStart = new \DateTime($validatedData['dateStart']);
        $data['dateStart'] =  date_format($dateStart,'Y-m-d');
        $dateEnd = new \DateTime($validatedData['dateEnd']);
        $data['dateEnd'] = date_format($dateEnd,'Y-m-d');
        $data['costumerEmail'] = $validatedData['costumerEmail'];
        $data['costumerName'] = $validatedData['costumerName'];

        $retDataValidation = $this->repository->getBookByDateRange($data);
        
        \Log::debug( $retDataValidation);
        
        if($retDataValidation != null)
        {
            $input = ['dataError' => false];
        }else{
            $input = ['dataError' => true];
        }
        \Log::debug( $input);

        $rules = ['dataError' => 'accepted'];
        $message = [ 'dataError.accepted' => 'Room alread booked in this date'];
       

        \Validator::make($input, $rules, $message)->validate(); // true

        return $this->repository->store($data);
    }

    public function update(Request $request,$id)
    {        
        $validatedData = $request->validate(['room' => 'required','dateStart'=>'required','dateEnd'=>'required','costumerEmail'=>'required','costumerName'=>'required']);
        $data['room'] = $validatedData['room'];
        $dateStart = new \DateTime($validatedData['dateStart']);
        $data['dateStart'] =  date_format($dateStart,'Y-m-d');
        $dateEnd = new \DateTime($validatedData['dateEnd']);
        $data['dateEnd'] = date_format($dateEnd,'Y-m-d');
        $data['costumerEmail'] = $validatedData['costumerEmail'];
        $data['costumerName'] = $validatedData['costumerName'];
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