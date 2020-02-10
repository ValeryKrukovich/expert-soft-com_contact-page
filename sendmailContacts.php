<?php

header("Content-type: application/json; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("X-Robots-Tag: noindex");
header("Pragma: no-cache");
header("Expires: -1");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {


    if (checkCaptcha($_POST['g-recaptcha-response'])) {

        $fromEmail = 'site.mailer@expert-soft.by';
        $fromPass = 'geePwehh47dFlHi';

        $toEmail = "V.Krukovich@gmail.com";

        $fromName = 'COM Site Mailer';
        $subject = 'Expert Soft COM Site Message';

        $firstName = !empty($_POST['firstName']) ? $_POST['firstName'] : '';
        $lastName = !empty($_POST['lastName']) ? $_POST['lastName'] : '';
        $email = !empty($_POST['email']) ? $_POST['email'] : '';
        $company = !empty($_POST['company']) ? $_POST['company'] : '';
        $text = !empty($_POST['message-area']) ? $_POST['message-area'] : '';

        $body = $firstName ? "<b>First name:</b> " . $firstName . "<br>" : '';
        $body .= $lastName ? "<b>Last name:</b> " . $lastName . "<br>" : '';
        $body .= $email ? "<b>Email:</b> " . $email . "<br>" : '';
        $body .= $company ? "<b>Company name:</b> " . $company . "<br>" : '';
        $body .= $text ? "<b>Message:</b><br> " . $text . "<br>" : '';

        $body .= "<hr>";
        $body .= "<b>Browser:</b> " . $_SERVER['HTTP_USER_AGENT'] . "<br>";
        $body .= "<b>Ip - Location:</b> " . '<a href="http://www.ip-adress.com/ip_tracer/' . $_SERVER['REMOTE_ADDR'] . '">' . $_SERVER['REMOTE_ADDR'] . '</a>';

        require 'lib-php/phpmailer/PHPMailer.php';
        require 'lib-php/phpmailer/SMTP.php';
        require 'lib-php/phpmailer/Exception.php';

        // Настройки
        $mail = new PHPMailer\PHPMailer\PHPMailer;

        try {
            $mail->isSMTP();
            //$mail->SMTPDebug = 3;
            $mail->Host = 'smtp.yandex.com';
            //$mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $fromEmail;
            $mail->Password = $fromPass;
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;
            $mail->setFrom($fromEmail, $fromName);
            $mail->addAddress($toEmail); // Email получателя

            // Письмо
            $mail->isHTML(true);
            $mail->CharSet = 'utf-8';
            $mail->Subject = $subject; // Заголовок письма
            $mail->Body = $body; // Текст письма


            if ($mail->send()) {
               print json_encode([ 'success' => true]);
            } else {
                header('HTTP/1.1 409 Conflict');
            }




        } catch (Exception $e) {
            print json_encode([ 'success' => false, 'error' => $e]);
            //echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            header('HTTP/1.1 409 Conflict');
        }


    } else {
        print json_encode(['success' => false,'error' => 'Captcha failed']);
    }


} else {
    header('HTTP/1.1 403 Forbidden');
}


function getCaptcha($token)
{

    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6Ld-IMQUAAAAAKFuiX6b9wJmuNjVcAxkV0YbsDN3&response={$token}");
    $responseResult = json_decode($response);
    return $responseResult;

}

function checkCaptcha($token)
{
    $result = getCaptcha($token);
    if ($result->success && $result->score > 0.5) {
        return true;
    } else {
        $this->errors[] = 'captcha failed';
        return false;
    }


}

