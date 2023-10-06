import ClinicService from "../service/clinic-service.js";

export const clinic = (app) =>{
    const service = new ClinicService();

    app.get('/all-packages', async (req,res)=>{
        const allPackages = await service.getAllPackages();
        if(allPackages.length > 0){
            res.status(200).json({allPackages});
        }else{
            res.status(404).json({message:"patients not found"});
        }
    });

    app.post('/new-package', async (req, res)=>{
        
            const {name, price, discountOfDoctor, discountOfMedicin, discountOfFamily} = req.body;
            console.log({name});
       
            const data = await service.createNewPackage(name, price, discountOfDoctor, discountOfMedicin, discountOfFamily);
        if(data){
            res.status(200).json({data});
        }else{
            res.status(500);
        }
    });

    app.patch('/edit-package/:id', async (req,res)=>{
        const updateData = req.body;
        const id = req.params.id;
        try{
            const updatedPackage = await service.updatePackage(id, updateData);
            res.status(200).json({updatedPackage});
        }catch(err){
            res.status(500).json({err : err.message});
        }
    });

    app.delete('/remove-package/:id',  async (req,res)=>{
        const id = req.params.id;
        try{
           
            const deletedPackage = await service.deletePackage(id);
            res.status(200).json({deletedPackage});
        }catch(err){
            res.status(500).json({err : err.message});
        }   
    });

}
