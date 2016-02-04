<?php
/**
 * Created by PhpStorm.
 * User: XSN
 * Date: 2016/1/26
 * Time: 23:06
 */

require_once "jssdk.php";
$url = $_REQUEST['param'];
$jssdk = new JSSDK("wx3127d9f0e840923b", "a6640c3a4a90fa2e4787cca816ecdbc3", $url);
$signPackage = $jssdk->GetSignPackage();
echo json_encode($signPackage);