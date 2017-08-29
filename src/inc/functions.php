<?php

if (!function_exists('json_encode')) {  
    function json_encode($value) 
    {
        if (is_int($value)) {
            return (string)$value;   
        } elseif (is_string($value)) {
	        $value = str_replace(array('\\', '/', '"', "\r", "\n", "\b", "\f", "\t"), 
	                             array('\\\\', '\/', '\"', '\r', '\n', '\b', '\f', '\t'), $value);
	        $convmap = array(0x80, 0xFFFF, 0, 0xFFFF);
	        $result = "";
	        for ($i = mb_strlen($value) - 1; $i >= 0; $i--) {
	            $mb_char = mb_substr($value, $i, 1);
	            if (mb_ereg("&#(\\d+);", mb_encode_numericentity($mb_char, $convmap, "UTF-8"), $match)) {
	                $result = sprintf("\\u%04x", $match[1]) . $result;
	            } else {
	                $result = $mb_char . $result;
	            }
	        }
	        return '"' . $result . '"';                
        } elseif (is_float($value)) {
            return str_replace(",", ".", $value);         
        } elseif (is_null($value)) {
            return 'null';
        } elseif (is_bool($value)) {
            return $value ? 'true' : 'false';
        } elseif (is_array($value)) {
            $with_keys = false;
            $n = count($value);
            for ($i = 0, reset($value); $i < $n; $i++, next($value)) {
                        if (key($value) !== $i) {
			      $with_keys = true;
			      break;
                        }
            }
        } elseif (is_object($value)) {
            $with_keys = true;
        } else {
            return '';
        }
        $result = array();
        if ($with_keys) {
            foreach ($value as $key => $v) {
                $result[] = json_encode((string)$key) . ':' . json_encode($v);    
            }
            return '{' . implode(',', $result) . '}';                
        } else {
            foreach ($value as $key => $v) {
                $result[] = json_encode($v);    
            }
            return '[' . implode(',', $result) . ']';
        }
    } 
}



 function remove_tags($html){
  $search = array ("'<script***91;^>***93;*?".">.*?</script>'si",  // Вырезает javaScript
                 "'<***91;\/\!***93;*?***91;^<>***93;*?".">'si",           // Вырезает HTML-теги
                 "'(***91;\r\n***93;)***91;\s***93;+'",                 // Вырезает пробельные символы
                 "'&(quot|#34);'i",                 // Заменяет HTML-сущности
                 "'&(amp|#38);'i",
                 "'&(lt|#60);'i",
                 "'&(gt|#62);'i",
                 "'&(nbsp|#160);'i",
                 "'&(iexcl|#161);'i",
                 "'&(cent|#162);'i",
                 "'&(pound|#163);'i",
                 "'&(copy|#169);'i",
                 "'&#(\d+);'e");                    // интерпретировать как php-код

	$replace = array ("",
                  "",
                  "\\1",
                  "\"",
                  "&",
                  "<",
                  ">",
                  " ",
                  chr(161),
                  chr(162),
                  chr(163),
                  chr(169),
                  "chr(\\1)");

	$n_text = preg_replace($search, $replace, $html);
	var_dump($html);
	return($document); 
 }

 function translit($str) {
 $str = trim($str);
 $tr = array(
	            "А"=>"a",
	            "Б"=>"b",
	            "В"=>"v",
	            "Г"=>"g",
	            "Д"=>"d",
              "Е"=>"e",
              "Ё"=>"e",
	            "Ж"=>"j",
	            "З"=>"z",
	            "И"=>"i",
	            "Й"=>"y",
	            "К"=>"k",
	            "Л"=>"l",
	            "М"=>"m",
	            "Н"=>"n",
	            "О"=>"o",
	            "П"=>"p",
	            "Р"=>"r",
	            "С"=>"s",
	            "Т"=>"t",
	            "У"=>"u",
	            "Ф"=>"f",
	            "Х"=>"h",
	            "Ц"=>"ts",
	            "Ч"=>"ch",
	            "Ш"=>"sh",
	            "Щ"=>"sch",
	            "Ъ"=>"",
	            "Ы"=>"i",
	            "Ь"=>"j",
	            "Э"=>"e",
	            "Ю"=>"yu",
	            "Я"=>"ya",
	            "а"=>"a",
	            "б"=>"b",
	            "в"=>"v",
	            "г"=>"g",
	            "д"=>"d",
	            "е"=>"e",
	            "ё"=>"e",
	            "ж"=>"j",
	            "з"=>"z",
	            "и"=>"i",
	            "й"=>"y",
	            "к"=>"k",
	            "л"=>"l",
	            "м"=>"m",
	            "н"=>"n",
	            "о"=>"o",
	            "п"=>"p",
	            "р"=>"r",
	            "с"=>"s",
	            "т"=>"t",
	            "у"=>"u",
	            "ф"=>"f",
	            "х"=>"h",
	            "ц"=>"ts",
	            "ч"=>"ch",
	            "ш"=>"sh",
	            "щ"=>"sch",
	            "ъ"=>"y",
	            "ы"=>"i",
	            "ь"=>"j",
	            "э"=>"e",
	            "ю"=>"yu",
	            "я"=>"ya",
	            " "=> "_",
	            "."=> "",
	            "/"=> "_",
	            ","=>"_",
	            "-"=>"_",
              "("=>"",
	            ")"=>"",
	            "["=>"",
	            "]"=>"",
	            "="=>"_",
	            "+"=>"_",
	            "*"=>"",
	            "?"=>"",
	            "\""=>"",
	            "'"=>"",
	            "&"=>"",
	            "%"=>"",
	            "#"=>"",
	            "@"=>"",
	            "!"=>"",
	            ";"=>"",
	            "№"=>"",
	            "^"=>"",
	            ":"=>"",
	            "~"=>"",
	            "\\"=>""
	        );
	        return strtr($str,$tr);
}
  
function retranslit($str) {
 $str = trim($str);
 $tr = array(
	            "А"=>"a",
	            "Б"=>"b",
	            "В"=>"v",
	            "Г"=>"g",
	            "Д"=>"d",
              "Е"=>"e",
              "Ё"=>"e",
	            "Ж"=>"j",
	            "З"=>"z",
	            "И"=>"i",
	            "Й"=>"y",
	            "К"=>"k",
	            "Л"=>"l",
	            "М"=>"m",
	            "Н"=>"n",
	            "О"=>"o",
	            "П"=>"p",
	            "Р"=>"r",
	            "С"=>"s",
	            "Т"=>"t",
	            "У"=>"u",
	            "Ф"=>"f",
	            "Х"=>"h",
	            "Ц"=>"ts",
	            "Ч"=>"ch",
	            "Ш"=>"sh",
	            "Щ"=>"sch",
	            "Ъ"=>"",
	            "Ы"=>"i",
	            "Ь"=>"j",
	            "Э"=>"e",
	            "Ю"=>"yu",
	            "Я"=>"ya",
	            "а"=>"a",
	            "б"=>"b",
	            "в"=>"v",
	            "г"=>"g",
	            "д"=>"d",
	            "е"=>"e",
	            "ё"=>"e",
	            "ж"=>"j",
	            "з"=>"z",
	            "и"=>"i",
	            "й"=>"y",
	            "к"=>"k",
	            "л"=>"l",
	            "м"=>"m",
	            "н"=>"n",
	            "о"=>"o",
	            "п"=>"p",
	            "р"=>"r",
	            "с"=>"s",
	            "т"=>"t",
	            "у"=>"u",
	            "ф"=>"f",
	            "х"=>"h",
	            "ц"=>"ts",
	            "ч"=>"ch",
	            "ш"=>"sh",
	            "щ"=>"sch",
	            "ъ"=>"y",
	            "ы"=>"i",
	            "ь"=>"j",
	            "э"=>"e",
	            "ю"=>"yu",
	            "я"=>"ya",
	            " "=> "_",
	            "."=> "",
	            "/"=> "_",
	            ","=>"_",
	            "-"=>"_",
              "("=>"",
	            ")"=>"",
	            "["=>"",
	            "]"=>"",
	            "="=>"_",
	            "+"=>"_",
	            "*"=>"",
	            "?"=>"",
	            "\""=>"",
	            "'"=>"",
	            "&"=>"",
	            "%"=>"",
	            "#"=>"",
	            "@"=>"",
	            "!"=>"",
	            ";"=>"",
	            "№"=>"",
	            "^"=>"",
	            ":"=>"",
	            "~"=>"",
	            "\\"=>""
	        );
	        return strtr($str,$tr);
}  
  
 
 function crop_str($string, $limit){
  $dop = "";
  $string = strip_tags($string);
	$length = mb_strlen($string);
	if($length > $limit){
	 $dop = " ... ";
	}
	$substring_limited = mb_substr($string,0, $limit+1);        //режем строку от 0 до limit
	$pos = mb_strrpos($substring_limited, ' ');
	if($pos === false){
	 $pos = $length;
	}
	if($string[$limit+1] == " " || mb_strlen($string) == mb_strlen($substring_limited)){
	 $new_str = $substring_limited;
	}
	else{
		$new_str = mb_substr($substring_limited, 0, $pos);    //берем часть обрезанной строки от 0 до последнего пробела
	}
	//var_dump($new_str);
	return($new_str . $dop);  
 }

 function check_str($str){
  if(!preg_match("/^[-a-zA-Z\x7F-\xFF0-9_.\(\)\+\s]+$/i", $str)){
   return "";
  }
  return($str);
 }
 
 function array_search_byid($array,$key,$value){
  $flag = false;
  //echo $array[5]['id'];
  for ($i=0; $i<count($array);$i++){
   if($array[$i][$key] == $value){
    $flag = true;
    return($array[$i]);
   }
  }
  return($flag);
 }
 
 function stripslashes_array($array){
  if(is_array($array)){
   foreach($array AS $key=>$value){
    $array[$key] = stripslashes($value);
  
   }
  }
  return($array);
 } 
 
 function utf_substr($str,$from,$to,$max_len = 0){
  global $text_len;
  if(!$max_len){
   $max_len = $text_len;
  }
  $str = iconv("UTF8", "CP1251", $str);
  $len = strlen($str);
  if($len > $max_len){
    $str = substr($str, $from, $to)."...";
  }
  $str = iconv("CP1251","UTF8",$str);
  return($str);
 }

function smtpmail($to, $subject, $content,$attach=false){
 global $__smtp;
 //$subject = iconv("utf-8", "iso-8859-1", $subject);
 //$content = iconv("utf-8", "iso-8859-1", $content);
 $mail = new PHPMailer(true);
 // return;
 $mail->IsSMTP();
 try {
  $mail->Charset = "UTF-8";
  $mail->Host       = $__smtp['host'];
  $mail->SMTPDebug  = $__smtp['debug'];
  $mail->SMTPAuth   = $__smtp['auth'];
  $mail->Port       = $__smtp['port'];
  $mail->Username   = $__smtp['username'];
  $mail->Password   = $__smtp['password'];
  $mail->SMTPSecure = $__smtp['secure'];
  $mail->AddReplyTo($__smtp['addreply'], $__smtp['username']);
  $mail->AddAddress($to);                //кому письмо
  $mail->SetFrom($__smtp['addreply'], $__smtp['from_name']); //от кого (желательно указывать свой реальный e-mail на используемом SMTP сервере
  $mail->AddReplyTo($__smtp['addreply'], $__smtp['username']);
  $mail->Subject = htmlspecialchars($subject);
  $mail->MsgHTML($content);
  if($attach && count($attach)){  
    for($i=0; $i<count($attach); $i++){
      $mail->AddAttachment($attach[$i]['path'],$attach[$i]['name']);
    }
  }
   $mail->Send();
   //echo "Message sent Ok!</p>\n";
  } 
  catch (phpmailerException $e) {
   //echo $e->errorMessage();
  } 
  catch (Exception $e) {
   //echo $e->getMessage();
  }
 }

function notify_admin($email,$subj,$text,$attach = false){
  $res = @smtpmail($email, $subj, $text, $attach);
}


function detect_ip() {
    $ip = false;
    if (isset($_SERVER["HTTP_X_FORWARDED_FOR"]) and preg_match("#^[0-9.]+$#", $_SERVER["HTTP_X_FORWARDED_FOR"])) {
        $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
    }
    else if (isset($_SERVER["HTTP_X_REAL_IP"]) and preg_match("#^[0-9.]+$#", $_SERVER["HTTP_X_REAL_IP"])) {
        $ip = $_SERVER["HTTP_X_REAL_IP"];
    }
    else if (preg_match("#^[0-9.]+$#", $_SERVER["REMOTE_ADDR"])) {
        $ip = $_SERVER["REMOTE_ADDR"];
    }
    return $ip;
} 


 function unic_user(){
  global $DBH;
  $ip = detect_ip(); 
  $sql_alr = "SELECT COUNT(*) AS cnt FROM `traffic` WHERE 1 AND
                `added_date` = '".date('Y-m-d')."' AND
                `ip` = '".$ip."' ";
  //echo $sql_alr;
  $row_alr = $DBH->query($sql_alr)->fetch();
  //var_dump($row_alr);
  if($row_alr['cnt'] == 0){
   $sql_ins = "INSERT INTO `traffic` SET 
              `added` = ".time().",
              `added_date` = NOW(),
              `ip` = '".$ip."' ";
   $res_ins = $DBH->query($sql_ins);           
  }              
 }

function getUnitCase( $value, $unit1, $unit2, $unit3 ){
    $value = abs( (int)$value );
    if( ($value % 100 >= 11) && ($value % 100 <= 19) ){
        return $unit3;
    }else{
        switch( $value % 10 ){
            case 1:
                return $unit1;
            case 2:case 3:case 4:
                return $unit2;
            default:
                return $unit3;
        }
    }
}

function my_mb_strlen($str){
 return(strlen(iconv("UTF-8", "CP1251", $str)));
}

function my_mb_substr($str,$from,$len){
 $str_ = iconv("UTF-8", "CP1251", $str);
 $str_ = substr($str_, $from, $len);
 $str_ = iconv("CP1251","UTF-8",$str_);
 return($str_);
}

function shortName($name){
 $max_len = 25;
 $len = my_mb_strlen($name);
 //echo $name . " :: " . $len . "<br>";
 if($len <= $max_len){
  return($name);
 }
 $arr = explode(" ", $name);
 if(count($arr) == 1){
  $short_name = my_mb_substr($name, 0, $max_len-1) . ".";
  return($short_name);
 }
 
 for($i=0; $i<count($arr); $i++){
  if(my_mb_strlen($arr[$i]) > $max_len/count($arr)){
    $arr[$i] = my_mb_substr($arr[$i], 0, $max_len/count($arr)-1) . ".";
  }
 }
 $short_name = implode(" ", $arr);
 return($short_name);
}

function get_pages($id){
 global $database;
 $pages = Array();
 $sql = "SELECT `id`,`parent`,`name`,`visible` FROM `pages` WHERE `parent` = ".$id." ORDER BY `order` ASC ";
 //echo "<br>".$sql;
 $res = $database->database_query($sql);
 //if(!$database->database_num_rows($res)){ return;};
 while($row = mysql_fetch_assoc($res)){
  $arr = Array();
  $arr['key'] = $row['id'];
  $arr['title'] = $row['name'];
  if($row['visible'] == 0){
   $arr['title'] = "<font style='color: grey;'>" . $row['name'] . "</font>";
  }
  $arr['href']  = "/admin/editpage.php?id=" . $row['id'];
  $childs = get_pages($row['id']);
  if($childs){
   $arr['children'] = $childs;
   $arr['folder'] = true;
  }
  $pages[] = $arr;
 }
 return($pages);
}

function get_catalog($id){
  global $database;
 $catalog = Array();
 $sql = "SELECT `id`,`parent`,`name`,`visible` FROM `catalog` WHERE `visible`=1 AND `parent` = ".$id." ORDER BY `order` ASC,`id` ASC ";
 //echo "<br>".$sql;
 $res = $database->database_query($sql);
 //if(!$database->database_num_rows($res)){ return;};
 while($row = mysql_fetch_assoc($res)){
  $arr = Array();
  $arr['id'] = $row['id'];
	$arr['key'] = $row['id'];
  $arr['title'] = $row['name'];
  $arr['short_title'] = crop_str($row['name'],125);
  
  $arr['folder'] = true;
  
  $arr['data']['type'] = "catalog";
  $arr['href']  = "/catalog/" . $row['id'];
  
  $arr['tooltip'] = $row['name'];
  $childs = get_catalog($row['id']);
  if($childs){
   $arr['children'] = $childs;
   //$arr['folder'] = true;
	}
  elseif(0){
	//else{
	  //$arr['href']  = "/admin/" . $row['id'];
    $arr_goods = Array();
		$sql_goods = "SELECT * FROM `goods` WHERE `visible`=1 AND `id_catalog` = ".$row['id']." ORDER BY `order` ";
    $res_goods = $database->database_query($sql_goods);
    $i=0;
		while($row_goods = $database->database_fetch_assoc($res_goods)){
		  $arr_goods[$i]['id'] = $row_goods['id'] . "_goods";
			$arr_goods[$i]['key'] = $row_goods['id'] . "_goods";
  		$arr_goods[$i]['title'] = $row_goods['name'];
  		$arr_goods[$i]['short_title'] = crop_str($row_goods['name'],85);
  		$arr_goods[$i]['tooltip'] = $row_goods['name'];
	    $arr_goods[$i]['href']  = "/goods/" . $row_goods['id'];
	    $arr_goods[$i]['data']['type'] = "goods";
	    $arr_goods[$i]['data']['image'] = "";
	    if($row_goods['image'] != ""){
			 $arr_goods[$i]['data']['image'] = "/images_goods/sm/" . $row_goods['image'];
			}
		  $i++;
		}
		if($database->database_num_rows($res_goods)){
    	$arr['children'] = $arr_goods;
    	$arr['folder'] = true;
    }
	}
  $catalog[] = $arr;
 }
 return($catalog);
}

function get_catalog_admin($id){
 global $database;
 $catalog = Array();
 $sql = "SELECT `id`,`parent`,`name`,`visible` FROM `catalog` WHERE `parent` = ".$id." ORDER BY `order` ASC,`id` ASC ";
 //echo "<br>".$sql;
 $res = $database->database_query($sql);
 //if(!$database->database_num_rows($res)){ return;};
 while($row = mysql_fetch_assoc($res)){
  $arr = Array();
  $arr['id'] = $row['id'];
	$arr['key'] = $row['id'];
  $arr['title'] = $row['name'];
  
  $arr['folder'] = true;
  
  $arr['data']['type'] = "catalog";
  $arr['href']  = "/admin/editcatalog.php?id=" . $row['id'];
  
  if($row['visible'] == 0){
	  $arr['title'] = "<span style='color: grey;'>" . $row['name'] . "</span>";
	}
  $arr['tooltip'] = $row['name'];
  $childs = get_catalog_admin($row['id']);
  if($childs){
   $arr['children'] = $childs;
   //$arr['folder'] = true;
	}
  else{
	  //$arr['href']  = "/admin/" . $row['id'];
    $arr_goods = Array();
		$sql_goods = "SELECT * FROM `goods` WHERE `id_catalog` = ".$row['id']." ORDER BY `order` ";
    $res_goods = $database->database_query($sql_goods);
    $i=0;
		while($row_goods = $database->database_fetch_assoc($res_goods)){
		  $arr_goods[$i]['id'] = $row_goods['id'] . "_goods";
			$arr_goods[$i]['key'] = $row_goods['id'] . "_goods";
  		$arr_goods[$i]['title'] = $row_goods['name'];
  		if($row_goods['visible'] == 0){
	  		$arr_goods[$i]['title'] = "<span style='color: grey;'>" . $row_goods['id'] . ": " .$row_goods['name'] . "</span>";
			}
  		$arr_goods[$i]['tooltip'] = $row_goods['name'];
	    $arr_goods[$i]['href']  = "/admin/editgoods.php?id=" . $row_goods['id'];
	    $arr_goods[$i]['data']['type'] = "goods";
		  $i++;
		}
		if($database->database_num_rows($res_goods)){
    	$arr['children'] = $arr_goods;
    	$arr['folder'] = true;
    }
	}
  $catalog[] = $arr;
 }
 return($catalog);
}

$recur_num = 0;
function recur_array($item, $key){
 global $recur_num,$database;
 //echo $k . ": " . $item->title."<br>";
 $sql_upd = "UPDATE `pages` SET `order` = ".$recur_num." WHERE `id` = ".($item->key)." LIMIT 1 ";
 $res_upd = $database->database_query($sql_upd);
 $recur_num++;
 if(count($item->children)){
   array_walk_recursive($item->children, 'recur_array'); 
 }
}

$recur_num_catalog = 0;
function recur_array_catalog($item, $key){
 global $recur_num_catalog,$database;
 //echo $k . ": " . $item->title."<br>";
 $sql_upd = "UPDATE `catalog` SET `order` = ".$recur_num_catalog." WHERE `id` = ".($item->key)." LIMIT 1 ";
 $res_upd = $database->database_query($sql_upd);
 $recur_num_catalog++;
 if(count($item->children)){
   array_walk_recursive($item->children, 'recur_array_catalog'); 
 }
}

$catalog_menu_str = "";
$global_ul_i = 0;
function print_catalog_menu($list) {
 global $catalog_menu_str,$global_ul_i;
 $class = "";
 $style = "";
 if($global_ul_i == 0){
  $class = "menu_vert";
  $style = "margin-top: 3px;";
 }
 $global_ul_i++;
    $catalog_menu_str .= "<ul class='".$class."' style='".$style."'>";
    foreach($list as $list_item) {
        $catalog_menu_str .= "<li style='min-width: 258px;'>";
        $catalog_menu_str .= "<a href='" . $list_item['href'] . "' title='" . $list_item['tooltip'] . "'>";
				if($list_item['data']['image'] != ""){
				 //$catalog_menu_str .= "<img align='center' style='margin-right: 8px;max-width: 25px;max-height: 25px;' src = '" . $list_item['data']['image'] . "' />";
				}
				 $catalog_menu_str .= $list_item['short_title'] . "</a>";
        if (array_key_exists('children', $list_item) && is_array($list_item['children']))
            print_catalog_menu($list_item['children']);
        $catalog_menu_str .= "</li>";
    }
    $catalog_menu_str .= "</ul>";
}

function read_csv($file){
  $values = Array();
	$csv_lines  = file($file);
  if(is_array($csv_lines))
  {
    //разбор csv
    $cnt = count($csv_lines);
    for($i = 0; $i < $cnt; $i++)
    {
      $line = $csv_lines[$i];
      $line = trim($line);
      //указатель на то, что через цикл проходит первый символ столбца
      $first_char = true;
      //номер столбца
      $col_num = 0;
      $length = strlen($line);
      for($b = 0; $b < $length; $b++)
      {
        //переменная $skip_char определяет обрабатывать ли данный символ
        if($skip_char != true)
        {
          //определяет обрабатывать/не обрабатывать строку
          ///print $line[$b];
          $process = true;
          //определяем маркер окончания столбца по первому символу
          if($first_char == true)
          {
            if($line[$b] == '"')
            {
              $terminator = '";';
              $process = false;
            }
            else
              $terminator = ';';
            $first_char = false;
          }

          //просматриваем парные кавычки, опредляем их природу
          if($line[$b] == '"')
          {
            $next_char = $line[$b + 1];
            //удвоенные кавычки
            if($next_char == '"')
              $skip_char = true;
            //маркер конца столбца
            elseif($next_char == ';')
            {
              if($terminator == '";')
              {
                $first_char = true;
                $process = false;
                $skip_char = true;
              }
            }
          }

          //определяем природу точки с запятой
          if($process == true)
          {
            if($line[$b] == ';')
            {
               if($terminator == ';')
               {

                  $first_char = true;
                  $process = false;
               }
            }
          }

          if($process == true)
            $column .= $line[$b];

          if($b == ($length - 1))
          {
            $first_char = true;
          }

          if($first_char == true)
          {

            $values[$i][$col_num] = $column;
            $column = '';
            $col_num++;
          }
        }
        else
          $skip_char = false;
      }
    }
  }
  return($values);
}  

function arr2utf($arr){
 for($i=0; $i<count($arr); $i++){
  for($j=0; $j<count($arr[$i]); $j++){	 
	 $arr[$i][$j] = iconv("windows-1251", "UTF-8", $arr[$i][$j]);
	}
 }
 return($arr);
}

function my_round($arg, $base){
    //arg - округляемое число, $base - "округлитель"
    $ost = $arg%$base; //вычисляем остаток от деления
    $chast = floor($arg/$base); //находим количество целых округлителей в аргументе
    /*
    if($ost >= $base/2)    $rez = ($chast+1) * $base; //выбираем направление округления
    else $rez = $chast * $base;
    */
    if($ost > 0){
     $rez = ($chast+1) * $base;
    }
    else{
     $rez = ($chast) * $base;
    }
    return $rez;
} 
?>