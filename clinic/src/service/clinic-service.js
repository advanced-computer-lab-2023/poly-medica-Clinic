import ClinicRepository from "../database/repository/clinic-repository";

class ClinicService {
    constructor() {
        this.repository = ClinicRepository;

    }

    async getAllPackages(){
        const packages = await this.repository.getAllPackages();
        if(packages){
            return packages;
        }else{
            console.log("no data was found");
        }
        
    }
    async createNewPackage(name, price, discountOfDoctor, discountOfMedicin, discountOfFamily){
        const newPackage = await this.repository.addPackage(name, price, discountOfDoctor, discountOfMedicin, discountOfFamily);
        return {newPackage}
    }
}

export default ClinicService;