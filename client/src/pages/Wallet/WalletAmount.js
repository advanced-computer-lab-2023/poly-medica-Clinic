import React, { useState, useEffect } from 'react';
//import axios from 'axios';
 
import Typography from '@mui/material/Typography';
import { doctorAxios,patientAxios } from 'pages/utilities/AxiosConfig';


import { useUserContext } from 'hooks/useUserContext';
// import { doctorAxios } from 'pages/utilities/AxiosConfig';


 

 const WalletAmount = () => {
    const { user } = useUserContext();
    const id = user.id;
    const [amount, setWalletAmount] = useState([]); 
    useEffect (() => {
        if(user.type == 'doctor'){
           console.log(user.id);
        doctorAxios.get('/doctors/'+ id+ '/wallet')
        .then((response) => {
            console.log(response);
            setWalletAmount(JSON.stringify(response.data.walletAmount));
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
         
    }
        else{
            patientAxios.get('/patients/'+ id+ '/wallet')
            .then((response) => { 
                setWalletAmount(JSON.stringify(response.data.walletAmount));
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            }); 
        } 
    },[]);
    
   
    return (
        <div>
            <Typography variant="h1">wallet Amount</Typography>
            <Typography variant="h2">{amount}</Typography>
        </div>
      
    );

};

export default WalletAmount;


