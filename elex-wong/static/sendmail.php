<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

#require '/mnt/vendor/phpmailer/phpmailer/src/Exception.php';
#require '/mnt/vendor/phpmailer/phpmailer/src/PHPMailer.php';
#require '/mnt/vendor/phpmailer/phpmailer/src/SMTP.php';
require '/mnt/vendor/autoload.php';

// $_POST = json_decode(file_get_contents('php://input'), true);

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions

try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';                        // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'elexwongresume@gmail.com';                 // SMTP username
    $mail->Password = 'Damima123';                           // SMTP password
    #$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->SMTPSecure = 'ssl';
	#$mail->Port = 587;                                    // TCP port to connect to
	$mail->Port = 465;
	
    //Recipients
    $mail->setFrom('elexwong@gmail.com', 'Poseidon IT Solution');
    //$mail->addAddress('elexwongapex@gmail.com', 'Elex Wong Resume');     // Add a recipient
    $mail->addAddress('hr@poseidon-it.com', 'Poseidon IT Solution');     // Add a recipient
    #$mail->addAddress('ellen@example.com');               // Name is optional
    #$mail->addReplyTo('shengkai123456@gmail.com', 'Information');
    $mail->addCC('khai@poseitech.com');
    #$mail->addBCC('bcc@example.com');

    //Attachments
    $mail->addAttachment($_FILES['data']['tmp_name'],$_FILES['data']['name']);    // Optional name

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = '' . $_POST['name']  . ' Send You A Resume';
    $mail->Body    = "<p>Name: ". $_POST['name']  ."</p>";
    $mail->Body    .= "<p>NRIC Number: ". $_POST['nric']  ."</p>";
    $mail->Body    .= "<p>Email Address: ". $_POST['email']  ."</p>";
    $mail->Body    .= "<p>Contact Number: ". $_POST['number']  ."</p>";
    $mail->Body    .= "<p>Job Position: ". $_POST['position']  ."</p>";
    #$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    #print_r($_POST['name']);
    #print_r($_POST['nric']);
    #print_r($_POST['number']);
    #print_r($_POST['position']);
    #print_r($_POST['email']);
    #print_r($_FILES);

    $mail->send();
    echo 'Message has been sent';
	} catch (Exception $e) {
		echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
	}


?>