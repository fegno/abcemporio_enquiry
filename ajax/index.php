<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
include_once('sheet.php');
$required = array("name","phone","district","product");
$input = json_decode(file_get_contents('php://input'), true);
$field_errors = array() ;
$values = array();
for( $i = 0 ; $i < count($required); $i++ ){
    if(!isset($input[$required[$i]])){
        $field_errors[ $required[$i]] = "This field is required" ;
    }else{
        $values[ $required[$i]] = filter_var(trim($input[$required[$i]]), FILTER_SANITIZE_STRING);
    }
}
if(count($field_errors)>0){
    echo json_encode(array(
        "status" =>false ,
        "field_error"=>true ,
        "errors"=>$field_errors
    ));
    die();
}
date_default_timezone_set('Asia/Kolkata'); 
$values['id'] = '#'.time(); 
$values['time'] = date("F j, Y, g:i a");
insert_to_sheet($values);
echo json_encode(array(
    "status"=>true ,
))
?>