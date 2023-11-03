var paymentOptions = new Promise(function (resolve) {
    setTimeout(function () {
      resolve({
        'credit-card': 'Using Credit Card',
        'wallet': 'Using Wallet'
      })
    }, 2000)
  })
  
  swal({
    title: 'Select Payment Option',
    input: 'radio',
    inputOptions: paymentOptions,
    inputValidator: function (result) {
      return new Promise(function (resolve, reject) {
        if (result) {
          resolve()
        } else {
          reject('You need to select something!')
        }
      })
    }
  }).then(function (result) {
    if(result == 'credit-card'){
      navigate('/pages/payment', { replace: true });
    }else{
      // go get the amount in the wallet check if the payment amount more than the amount avalible ask 
      // the user if he wants to continue and pay the rest with stripe else cancell
    }
  })
