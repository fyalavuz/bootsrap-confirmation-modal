bootsrap-confirmation-modal
===========================

confirmation dialog boxes for bootsrap


Example Using

var cd = new confirmationDialog();
cd.options.title = 'Are you';
cd.options.text = 'sure?';
cd.confirmCallback = function() { console.log('confirmCallback') };
cd.cancelCallback = function() { console.log('cancelCallback') };


// Optional Config
cd.confirmButtonText = 'OKKKKKKK!!';
cd.cancelButtonText = 'CANCEELLL!!';
