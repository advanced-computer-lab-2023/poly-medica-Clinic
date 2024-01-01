import { HEALTH_PACKAGE_STATUS } from './Constants';

export const createPackageData = (pack) => {
    const healthPackage = {};
    healthPackage.packageId = pack._id;
    healthPackage.subscribtionDate = new Date();
    healthPackage.renewalDate = new Date(healthPackage.subscribtionDate);
    healthPackage.renewalDate.setMonth(healthPackage.renewalDate.getMonth() + 1);
    healthPackage.status = HEALTH_PACKAGE_STATUS[1];
    const packageData = {};
    packageData.healthPackage = healthPackage;
    return packageData;
};

export const isSubscribedPackage = (pack, subscribedPackage) => {
    return subscribedPackage && pack.name === subscribedPackage.name && subscribedPackage.status === HEALTH_PACKAGE_STATUS[1];
};