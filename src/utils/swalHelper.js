// try to make more resuseable

const saveAlert = async savedDate => {
  return swal({
    title: 'Hold up...',
    text: `You are about to overwrite your current save from ${savedDate}. Do you want to proceed?`,
    icon: 'warning',
    buttons: {
      cancel: 'Cancel',
      confirm: {
        text: 'Do It!',
        value: true,
        className: 'save'
      }
    }
  });
};

const loadAlert = async savedDate => {
  return swal({
    title: 'Loading Raffle...',
    text: `Loading your saved raffle from ${savedDate} will merge it with the current raffle.`,
    icon: 'warning',
    buttons: {
      cancel: 'Cancel',
      confirm: {
        text: 'Load',
        value: true,
        className: 'load'
      }
    }
  });
};

const deleteAlert = async savedDate => {
  return swal({
    title: 'Deleting Raffle...',
    text: `Delete your raffle that was saved on ${savedDate}?`,
    icon: 'error',
    buttons: {
      cancel: 'Cancel',
      confirm: {
        text: 'Delete',
        value: true,
        className: 'delete'
      }
    }
  });
};

export { saveAlert, loadAlert, deleteAlert };
