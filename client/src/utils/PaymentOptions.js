import { patientAxios, paymentAxios } from './AxiosConfig';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { successfulPayment } from './PaymentUtils';
import { React, useState, useEffect } from 'react';
import { useUserContext } from 'hooks/useUserContext';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Container,
  Typography
} from '@mui/material';
import { ADMIN_TYPE_ENUM } from './Constants';
import '../assets/css/swalStyle.css';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const ChoosePayment = ({ isAddDialogOpen, setIsAddDialogOpen, items, amountToPay, type }) => {
  const [amountInWallet, setAmountInWallet] = useState(0);
  const navigate = useNavigate();
  const { user } = useUserContext();
  const userId = user.id;

  console.log('items  ', items);
  console.log('price = ', amountToPay);
  const [value, setValue] = useState('credit-card');

  useEffect(
    () => {
      if (user.type !== ADMIN_TYPE_ENUM) {
        patientAxios.get(`/patients/${userId}/wallet`).then((response) => {
          setAmountInWallet(response.data.walletAmount);
        }).
          catch(error => {
            Swal.fire('error', error, 'error');
          });
      }
    }, []);

  const handlePaymentMethod = () => {

    if (value === 'credit-card') {
      navigate('/patient/pages/payment', { state: { items, amountToPay, type }, replace: true });
    } else if (value === 'wallet') {
      if (amountInWallet >= amountToPay) {
        paymentAxios.post('/payment/wallet', { amountToPayByWallet: amountToPay, userId: userId })
          .then(
            Swal.fire('success', 'Payment Succeeded', 'success').then(() => {
              setIsAddDialogOpen(false);
              const callBackUrl = successfulPayment(userId, items, type);
              navigate(callBackUrl, { replace: true });
            }
            )
          )
          .catch((error) => {
            console.log('Error in payment with the wallet', error);
          });
      } else {
        Swal.fire({
          title: 'Pay with the credit card',
          text: 'Do you want to pay the rest of the amount using the card',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            paymentAxios.post('/payment/wallet', { amountToPayByWallet: amountInWallet, userId: userId })
              .catch((error) => {
                console.log('Error in payment with the wallet', error);
              });
            const amountToPayByCard = amountToPay - amountInWallet;
            navigate('/patient/pages/payment', { state: { items, amountToPay: amountToPayByCard, type }, replace: true });
          }
        });
      }
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const isDialogClose = () => {
    setIsAddDialogOpen(false);
  };

  return (
    <Dialog open={isAddDialogOpen} sx={{ zIndex: '9999' }}>
      <DialogTitle>Choose your payment option</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel>Payment Option</FormLabel>
          <RadioGroup
            defaultValue='credit card' name='controlled-radio-buttons-group' value={value} onChange={handleChange} sx={{ my: 2 }}
          >
            <FormControlLabel
              value='credit-card'
              control={<Radio />}
              label={
                <Container style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
                  <ListItemAvatar>
                    <Avatar>
                      <CreditCardIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Typography variant="body1" style={{ fontSize: '16px', marginLeft: '2' }}>CREDIT CARD</Typography>
                </Container>
              }
            />


            <FormControlLabel
              value='wallet'
              control={<Radio />}
              label={(
                <Container style={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountBalanceWalletIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Typography variant="body1" style={{ fontSize: '16px', marginLeft: '2' }}>{`POLY-WALLET $ ${amountInWallet}`}</Typography>
                </Container>
              )}
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={isDialogClose} color="secondary">
          Cancel
        </Button>
        <Button
          color='primary'
          onClick={handlePaymentMethod}
        >
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};
