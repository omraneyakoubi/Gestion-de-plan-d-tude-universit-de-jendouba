var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); // Use 'cors' directly from the package

const emailRouter = express.Router();
var nodemailer = require('nodemailer');

emailRouter.route('/')
    .options(cors(), (req, res) => {
        console.log("Coming email here");
        res.sendStatus(200);
    })
    .post(cors(), (req, res, next) => {
        console.log("oooo", req.body.email);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'yakoubiomran007@gmail.com',
                pass: 'ubfakaixlnipqprj'
            }
        });

        var mailOptions = {
            from: 'surabhisahayg@gmail.com',
            to: req.body.email,
            subject: `calendrier des examens `,
            html: `Bonjour,<br>  ` + req.body.nomprenom +`<br>Le calendrier des examens pour ce semestre est maintenant disponible. Consultez-le dès maintenant pour planifier vos révisions et être prêt(e) pour chaque épreuve.`

        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send('error');
            } else {
                console.log('Email sent: ' + info.response);
                res.send('Sent Successfully');
            }
        });
    });

module.exports = emailRouter;
