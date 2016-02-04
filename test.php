<?php
/**
 * Created by PhpStorm.
 * User: XSN
 * Date: 2016/1/26
 * Time: 17:00
 */
$type = $_REQUEST['type'];
$name = file_get_contents("php://input");
//$name = $_POST['city'];
$res['result'] = 1;
$res['msg'] = $name;

echo json_encode($_POST);