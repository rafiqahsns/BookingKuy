<?php
require 'config.php';
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->post('/item','item');
$app->post('/login','login'); /* User login */
$app->post('/signup','signup'); /* User Signup  */
$app->post('/getImages', 'getImages');
$app->post('/userImage','userImage'); /* User Images */
$app->post('/getImages', 'getImages');
$app->post('/pinjam', 'pinjam');
$app->post('/history', 'history');
$app->post('/ruangan', 'ruangan');
$app->post('/editRuangan', 'editRuangan');
$app->post('/ruanganImage', 'ruanganImage');
$app->post('/listRuangan', 'listRuangan');
$app->post('/tambahRuangan', 'tambahRuangan');
/*
NOTES :
- JANGAN LUPA NAMBAHIN $app->post SETIAP BIKIN FUNGSI BARU
- JANGAN LUPA NGEBIND PDO PARAM, DAN JANGAN NGEBIND LEBIH DARI YANG DIGUNAKAN
- PDO PARAM TIPE DATA HARUS SAMA DENGAN DI DATABASE
*/

$app->run();

function item(){
  $request = \Slim\Slim::getInstance()->request();
  $data = json_decode($request->getBody());

  try {
    $db = getDB();
    $userView ='';
    $sql = "SELECT ruangan.id_ruangan, ruangan.nama, ruangan.deskripsi, ruangan.fakultas, ruangan.penjaga, ruangan.harga, ruangan.picture, users.name FROM ruangan INNER JOIN users ON ruangan.penjaga=users.user_id WHERE nama=:nama ";
    $stmt = $db->prepare($sql);
    $stmt->bindParam("nama", $data->nama, PDO::PARAM_STR);
    $stmt->execute();
    $mainCount=$stmt->rowCount();
    $userView = $stmt->fetch(PDO::FETCH_OBJ);
    $db = null;
    if($userView){
          $userView = json_encode($userView);
           echo '{"userData": ' .$userView . '}';
       } else {
          echo '{"error":{"text":"Unknown Ruangan"}}';
       }
  }
  catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}

function ruangan(){
  $request = \Slim\Slim::getInstance()->request();
  $data = json_decode($request->getBody());

  try {
    $db = getDB();
    $userView ='';
    $sql = "SELECT * FROM ruangan WHERE penjaga=:penjaga";
    $stmt = $db->prepare($sql);
    $stmt->bindParam("penjaga", $data->penjaga, PDO::PARAM_INT);
    $stmt->execute();
    $userView = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    if($userView){
          $userView = json_encode($userView);
           echo '{"hasil": ' .$userView . '}';
       } else {
          echo '{"error":{"text":"Unknown Ruangan"}}';
       }
  }
  catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}

function editRuangan(){
  $request = \Slim\Slim::getInstance()->request();
  $data = json_decode($request->getBody());
  try {
    $db = getDB();
    $sql = "UPDATE ruangan SET nama=:nama, deskripsi=:deskripsi, harga=:harga, fakultas=:fakultas, picture=:picture, kapasitas=:kapasitas WHERE id_ruangan=:id_ruangan";
    $stmt = $db->prepare($sql);
    $stmt->bindParam("nama", $data->nama, PDO::PARAM_STR);
    $stmt->bindParam("deskripsi", $data->deskripsi, PDO::PARAM_STR);
    $stmt->bindParam("fakultas", $data->fakultas, PDO::PARAM_STR);
    $stmt->bindParam("id_ruangan", $data->id_ruangan, PDO::PARAM_INT);
    $stmt->bindParam("harga", $data->harga, PDO::PARAM_STR);
    $stmt->bindParam("picture", $data->picture, PDO::PARAM_STR);
    $stmt->bindParam("kapasitas", $data->kapasitas, PDO::PARAM_INT);
    $stmt->execute();
    $db = null;
    $data = json_encode($data);
    echo '{"hasil": ' .$data . '}';
       
  }
  catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}

function tambahRuangan(){
  $request = \Slim\Slim::getInstance()->request();
  $data = json_decode($request->getBody());
  try {
    $db = getDB();
    $sql = "INSERT INTO ruangan (nama,deskripsi,harga,fakultas,penjaga,picture,kapasitas) VALUES (:nama,:deskripsi,:harga,:fakultas,:penjaga,:picture,:kapasitas)";
    $stmt = $db->prepare($sql);
    $stmt->bindParam("nama", $data->nama, PDO::PARAM_STR);
    $stmt->bindParam("deskripsi", $data->deskripsi, PDO::PARAM_STR);
    $stmt->bindParam("fakultas", $data->fakultas, PDO::PARAM_STR);
    $stmt->bindParam("penjaga", $data->penjaga, PDO::PARAM_INT);
    $stmt->bindParam("harga", $data->harga, PDO::PARAM_STR);
    $stmt->bindParam("picture", $data->picture, PDO::PARAM_STR);
    $stmt->bindParam("kapasitas", $data->kapasitas, PDO::PARAM_INT);
    $stmt->execute();
    $db = null;
    $data = json_encode($data);
    echo '{"hasil": ' .$data . '}';
       
  }
  catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}';
  }

}

/************************* USER LOGIN *************************************/
/* ### User login ### */
function login() {

    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());

    try {

        $db = getDB();
        $userData ='';
        $sql = "SELECT user_id, tipe, name, email, username, profilpic FROM users WHERE (username=:username or email=:username) and password=:password ";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("username", $data->username, PDO::PARAM_STR);
        $password=hash('sha256',$data->password);
        $stmt->bindParam("password", $password, PDO::PARAM_STR);
        $stmt->execute();
        $mainCount=$stmt->rowCount();
        $userData = $stmt->fetch(PDO::FETCH_OBJ);

        if(!empty($userData))
        {
            $user_id=$userData->user_id;
            $userData->token = apiToken($user_id);
        }

        $db = null;
         if($userData){
               $userData = json_encode($userData);
                echo '{"userData": ' .$userData . '}';
            } else {
               echo '{"error":{"text":"Bad request wrong username and password"}}';
            }


    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


/* ### User registration ### */
function signup() {
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $email=$data->email;
    $name=$data->name;
    $username=$data->username;
    $password=$data->password;

    try {

        $username_check = preg_match('~^[A-Za-z0-9_]{3,20}$~i', $username);
        $email_check = preg_match('~^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$~i', $email);
        $password_check = preg_match('~^[A-Za-z0-9!@#$%^&*()_]{6,20}$~i', $password);

        #echo $email_check.'<br/>'.$email; make this error: Unexpected token < in JSON at position 1

        if (strlen(trim($username))>0 && strlen(trim($password))>0 && strlen(trim($email))>0 && $email_check>0 && $username_check>0 && $password_check>0)
        {
            #echo 'here'; make this error: Unexpected token < in JSON at position 1
            $db = getDB();
            $userData = '';
            $sql = "SELECT user_id FROM users WHERE username=:username or email=:email";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("username", $username,PDO::PARAM_STR);
            $stmt->bindParam("email", $email,PDO::PARAM_STR);
            $stmt->execute();
            $mainCount=$stmt->rowCount();
            $created=time();
            if($mainCount==0)
            {

                /*Inserting user values*/
                $sql1="INSERT INTO users(username,password,email,name)VALUES(:username,:password,:email,:name)";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("username", $username,PDO::PARAM_STR);
                $password=hash('sha256',$data->password);
                $stmt1->bindParam("password", $password,PDO::PARAM_STR);
                $stmt1->bindParam("email", $email,PDO::PARAM_STR);
                $stmt1->bindParam("name", $name,PDO::PARAM_STR);
                $stmt1->execute();

                $userData=internalUserDetails($email);

            }

            $db = null;


            if($userData){
               $userData = json_encode($userData);
                echo '{"userData": ' .$userData . '}';
            } else {
               echo '{"error":{"text":"Enter valid data"}}';
            }


        }
        else if($username_check<=0){
			echo '{"error":{"text":"Enter valid username"}}';
        } else if($email_check<=0){
			echo '{"error":{"text":"Enter valid email"}}';
		} else if($password_check<=0){
			echo '{"error":{"text":"Enter valid password"}}';
		}
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function email() {
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $email=$data->email;

    try {

        $email_check = preg_match('~^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$~i', $email);

        if (strlen(trim($email))>0 && $email_check>0)
        {
            $db = getDB();
            $userData = '';
            $sql = "SELECT user_id FROM emailUsers WHERE email=:email";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("email", $email,PDO::PARAM_STR);
            $stmt->execute();
            $mainCount=$stmt->rowCount();
            $created=time();
            if($mainCount==0)
            {

                /*Inserting user values*/
                $sql1="INSERT INTO emailUsers(email)VALUES(:email)";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("email", $email,PDO::PARAM_STR);
                $stmt1->execute();


            }
            $userData=internalEmailDetails($email);
            $db = null;
            if($userData){
               $userData = json_encode($userData);
                echo '{"userData": ' .$userData . '}';
            } else {
               echo '{"error":{"text":"Enter valid dataaaa"}}';
            }
        }
        else{
            echo '{"error":{"text":"Enter valid data"}}';
        }
    }

    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


function userImage(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id=$data->user_id;
    $token=$data->token;
    $imageB64=$data->imageB64;
    $systemToken=apiToken($user_id);
    try {
        if($systemToken == $token){
            $db = getDB();
            $sql = "UPDATE users SET profilpic = :b64 WHERE user_id = :user_id";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
            $stmt->bindParam("b64", $imageB64, PDO::PARAM_STR);
            $stmt->execute();
            $db = null;
            echo '{"success":{"status":"uploaded"}}';
        } else{
            echo '{"error":{"text":"No access"}}';
        }
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getImages(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $user_id=$data->user_id;
    $token=$data->token;
    $username = $data->username;

    $systemToken=apiToken($user_id);
    try {
        if($systemToken == $token){
            $db = getDB();
            $sql = "SELECT * FROM users WHERE username = :username";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("username", $username, PDO::PARAM_STR);
            $stmt->execute();
            $userData = $stmt->fetch(PDO::FETCH_OBJ);
            $db = null;
            echo '{"userData": ' . json_encode($userData) . '}';
        } else{
            echo '{"error":{"text":"No access"}}';
        }
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function ruanganImage(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    try {
        
            $db = getDB();
            $sql = "SELECT picture, nama FROM ruangan WHERE id_ruangan = :id_ruangan";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id_ruangan", $data, PDO::PARAM_STR);
            $stmt->execute();
            $image = $stmt->fetch(PDO::FETCH_OBJ);
            $db = null;
            echo '{"image": ' . json_encode($image) . '}';
      
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function pinjam(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $ruangan = $data->ruangan;
    $tanggal = $data->date;
    $waktu = $data->time;
    $penyewa = $data->penyewa;
    $penjaga = $data->penjaga;
    $db = getDB();
    $sql = "SELECT ruangan, tanggal, waktu FROM history WHERE ruangan= :ruangan AND tanggal= :tanggal AND waktu = :waktu";
    $stmt = $db->prepare($sql);
    $stmt->bindParam("ruangan", $ruangan, PDO::PARAM_INT);
    $stmt->bindParam("tanggal", $tanggal, PDO::PARAM_STR);
    $stmt->bindParam("waktu", $waktu, PDO::PARAM_STR);
    $stmt->execute();
    $hasil = $stmt->fetch(PDO::FETCH_OBJ);

    if(empty($hasil)){
        $sql = "INSERT INTO history (ruangan,tanggal,waktu,penyewa,penjaga) VALUES (:ruangan,:tanggal,:waktu,:penyewa,:penjaga)";
        $stmt1 = $db->prepare($sql);
        $stmt1->bindParam("ruangan", $ruangan, PDO::PARAM_INT);
        $stmt1->bindParam("tanggal", $tanggal, PDO::PARAM_STR);
        $stmt1->bindParam("waktu", $waktu, PDO::PARAM_STR);
        $stmt1->bindParam("penyewa", $penyewa, PDO::PARAM_INT);
        $stmt1->bindParam("penjaga", $penjaga, PDO::PARAM_INT);
        $stmt1->execute();

        $sql = "SELECT * FROM history WHERE ruangan = :ruangan AND tanggal= :tanggal AND waktu = :waktu";
        $stmt2 = $db->prepare($sql);
        $stmt2->bindParam("ruangan", $ruangan, PDO::PARAM_STR);
        $stmt2->bindParam("tanggal", $tanggal, PDO::PARAM_STR);
        $stmt2->bindParam("waktu", $waktu, PDO::PARAM_STR);
        $stmt2->execute();
        $hasil2 = $stmt2->fetch(PDO::FETCH_OBJ);
        $hasil2 = json_encode($hasil2);
         echo '{"hasil": ' . $hasil2 . '}';
        $db = null;

    } else{
      $db = null;
      echo '{"error":{"text":"Ruangan Tidak Tersedia"}}';
    }
}

function history(){
  $request = \Slim\Slim::getInstance()->request();
  $data = json_decode($request->getBody());
  $penjaga = $data->penjaga;
  $db = getDB();
  $sql = "SELECT history.history_date, history.ruangan, history.tanggal, history.waktu, history.penyewa, history.status, users.name 
FROM history INNER JOIN users ON history.penyewa=users.user_id
WHERE history.penjaga = :penjaga or history.penyewa=:penjaga ORDER BY history_date DESC LIMIT 10";
  $stmt = $db->prepare($sql);
  $stmt->bindParam("penjaga", $penjaga, PDO::PARAM_STR);
  $stmt->execute();
  $hasil = $stmt->fetchAll(PDO::FETCH_OBJ);
  $hasil = json_encode($hasil);
  echo '{"hasil": ' . $hasil . '}';
  $db = null;

}

function listRuangan(){
  $request = \Slim\Slim::getInstance()->request();
  $data = json_decode($request->getBody());
  $fakultas = $data;
  $db = getDB();
  $sql = "SELECT nama FROM ruangan WHERE fakultas=:fakultas";
  $stmt = $db->prepare($sql);
  $stmt->bindParam("fakultas", $fakultas, PDO::PARAM_STR);
  $stmt->execute();
  $hasil = $stmt->fetchAll(PDO::FETCH_OBJ);
  $hasil = json_encode($hasil);
  echo '{"hasil": ' . $hasil . '}';
  $db = null;
}
































?>
