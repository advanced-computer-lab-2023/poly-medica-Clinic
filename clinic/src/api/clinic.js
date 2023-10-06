import ClinicService from "../service/clinic-service";

export const clinic = (app) =>{
    const service = new ClinicService();

    app.get('/all-packages', async (req,res)=>{
        const allPackages = await service.getAllPackages();
        if(allPackages.length > 0){
            res.status(200).json(allPackages);
        }else{
            res.status(404).json({message:"patients not found"});
        }
    });

    app.post('/new-package', async (req, res)=>{
        const {name, price, discountOfDoctor, discountOfMedicin, discountOfFamily} = req.body;
        const {data} = await service.createNewPackage(name, price, discountOfDoctor, discountOfMedicin, discountOfFamily);
        if(data){
            res.status(200).json(data);
        }else{
            res.status(500);
        }
    });
}