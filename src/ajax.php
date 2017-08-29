<?php

session_start();
error_reporting(0);
// ini_set("display_errors",1);
// include_once "./inc/db_conf.php";
//include_once "./inc/mysql.php";
// include_once "./inc/pdo.php";
// include_once "./inc/def.php";

include_once "./lib/phpmailer/config.php";
include_once "./lib/phpmailer/class.phpmailer.php";

include_once "./inc/functions.php";
// include_once "./inc/functions_bitrix24.php";

if (isset($_REQUEST['task'])) {
    $task = trim($_REQUEST['task']);
} elseif (isset($_GET['task'])) {
    $task = trim($_GET['task']);
} else {
    $task = 'main';
}
$admin_emails = Array("7iomka@gmail.com");

// echo print_r($_REQUEST);
// die;
switch ($task) {


    case "action-order":
        //пользователь
        $user_name     = trim($_REQUEST['user_name']); //имя
        $user_phone    = trim($_REQUEST['user_phone']); //тел
        $user_comments    = trim($_REQUEST['user_comments']); //комментарии

        $user_from    = trim($_REQUEST['user_from']); //Откуда
        $user_to    = trim($_REQUEST['user_to']); //Куда

        $user_date_start    = trim($_REQUEST['user_date_start']); //Дата погрузки
        $user_date_finish    = trim($_REQUEST['user_date_finish']); //Желаемая дата отгрузки

        $user_weight    = trim($_REQUEST['user_weight']); //Вес
        $user_dimensions    = trim($_REQUEST['user_dimensions']); //Габариты

        $subj = "Сообщение с сайта NST";
        $mes  = "";
        $mes .= "<html>
                    <head>
                      <title>Сообщение с сайта NST</title>
                    </head>
                  <body>";
        $mes .= "<table>";
        $mes .= "<tr><th colspan='2'>Данные заявки</th></tr>";
        $mes .= "<tr><td>Дата:</td><td>" . date('Y-m-d H:i', $time) . "</td></tr>";
        $mes .= "<tr><th colspan='2'><strong>Контактные данные клиента". ($user_comments ? " и комментарии" : "") . "</strong></th></tr>";
        $mes .= "<tr><td>Имя:</td><td>" . $user_name . "</td></tr>";
        $mes .= "<tr><td>Тел.:</td><td>" . $user_phone . "</td></tr>";
        if ($user_comments) {
          $mes .= "<tr><td>Комментарии:</td><td>" . $user_comments . "</td></tr>";
        }
        if ($user_from || $user_to) {
          $mes .= "<tr><th colspan='2'><strong>Направление груза</strong></th></tr>";
        }
        if ($user_from) {
          $mes .= "<tr><td>Откуда:</td><td>" . $user_from . "</td></tr>";
        }
        if ($user_to) {
          $mes .= "<tr><td>Куда:</td><td>" . $user_to . "</td></tr>";
        }

        if ($user_date_start || $user_date_finish) {
          $mes .= "<tr><th colspan='2'><strong>Сроки</strong></th></tr>";
        }
        if ($user_date_start) {
          $mes .= "<tr><td>Дата погрузки:</td><td>" . $user_date_start . "</td></tr>";
        }
        if ($user_date_finish) {
          $mes .= "<tr><td>Желаемая дата отгрузки:</td><td>" . $user_date_finish . "</td></tr>";
        }

        if ($user_weight || $user_dimensions) {
          $mes .= "<tr><th colspan='2'><strong>Характеристики груза</strong></th></tr>";
        }
        if ($user_weight) {
          $mes .= "<tr><td>Вес:</td><td>" . $user_weight . "</td></tr>";
        }
        if ($user_dimensions) {
          $mes .= "<tr><td>Габариты:</td><td>" . $user_dimensions . "</td></tr>";
        }

        // Отправка
        foreach ($admin_emails As $email) {
            $email = trim($email);
            notify_admin($email, $subj, $mes, $attach);
        }

        $data['is_err']   = 0;
        echo json_encode($data);
        exit;
        break;





}
exit;

?>
