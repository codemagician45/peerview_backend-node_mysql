module.exports.send = function(res, to, subject, message) {
	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
        service: 'Gmail',
		    auth: {
          user: "XXXXX",
          pass: "XXXXX"
        }

    });

    var mailOptions = {
	    from: 'admin@peersview.com', // sender address
	    to: to, // list of receivers
	    subject: subject, // Subject line
	    //text: 'Test Email' //, // plaintext body
	     html:  message // You can choose to send an HTML body instead
	};

	// console.log(mailOptions);
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	       //console.log(error);
	        res.json({'error': true, 'message': error});
	    }else{
	        //console.log('Message sent: ' + info.response);
				  // res.json({'error': false, 'message': 'Invite send Successfully'});
	    };
	});
}
