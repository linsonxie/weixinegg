<?php
/**
 * Created by PhpStorm.
 * User: XSN
 * Date: 2016/1/26
 * Time: 14:43
 */
$prize_arr = array(
    '0' => array('id'=>1,'prize'=>'平板电脑','v'=>3),
    '1' => array('id'=>2,'prize'=>'数码相机','v'=>5),
    '2' => array('id'=>3,'prize'=>'音箱设备','v'=>10),
    '3' => array('id'=>4,'prize'=>'4G优盘','v'=>12),
    '4' => array('id'=>5,'prize'=>'Q币10元','v'=>20),
    '5' => array('id'=>6,'prize'=>'下次没准就能中哦','v'=>50),
);

foreach ($prize_arr as $key => $val) {
    $arr[$val['id']] = $val['v'];
}

$rid = getRand($arr); //根据概率获取奖项id
$res['msg'] = ($rid==6)?0:1; //如果为0则没中
$res['prize'] = $prize_arr[$rid-1]['prize']; //中奖项
echo json_encode($res);

//计算概率
function getRand($proArr) {
    $result = '';

    //概率数组的总概率精度
    $proSum = array_sum($proArr);

    //概率数组循环
    foreach ($proArr as $key => $proCur) {
        $randNum = mt_rand(1, $proSum);
        if ($randNum <= $proCur) {
            $result = $key;
            break;
        } else {
            $proSum -= $proCur;
        }
    }
    unset ($proArr);

    return $result;
}