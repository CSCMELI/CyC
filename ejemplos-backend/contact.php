<?php
// ============================================
// SERVIDOR PHP
// ============================================
// INSTRUCCIONES:
// 1. Sube este archivo a tu servidor web
// 2. Asegúrate de que PHP tenga permisos para enviar emails
// 3. Actualiza el email de destino en la línea 30
// 4. En script.js, cambia la URL a: 'contact.php'
// ============================================

// Configurar headers para CORS y JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Solo permitir método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del formulario
$nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
$servicio = isset($_POST['servicio']) ? trim($_POST['servicio']) : '';
$mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

// Validar datos requeridos
if (empty($nombre) || empty($email) || empty($mensaje)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Campos requeridos faltantes']);
    exit;
}

// Validar formato de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email inválido']);
    exit;
}

// Email donde recibirás los mensajes
$to = 'contacto@cyc-soluciones.com'; // Cambia esto

// Asunto del email
$subject = "Nuevo contacto: " . ($servicio ?: 'Consulta general');

// Cuerpo del email (HTML)
$body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h2 { color: #00a8ff; }
        .info { background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .label { font-weight: bold; color: #555; }
    </style>
</head>
<body>
    <div class='container'>
        <h2>Nuevo mensaje de contacto</h2>
        <div class='info'>
            <p><span class='label'>Nombre:</span> " . htmlspecialchars($nombre) . "</p>
            <p><span class='label'>Email:</span> " . htmlspecialchars($email) . "</p>
            <p><span class='label'>Teléfono:</span> " . ($telefono ? htmlspecialchars($telefono) : 'No proporcionado') . "</p>
            <p><span class='label'>Servicio:</span> " . ($servicio ? htmlspecialchars($servicio) : 'No especificado') . "</p>
        </div>
        <div>
            <p><span class='label'>Mensaje:</span></p>
            <p>" . nl2br(htmlspecialchars($mensaje)) . "</p>
        </div>
    </div>
</body>
</html>
";

// Headers del email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

// Intentar enviar el email
if (mail($to, $subject, $body, $headers)) {
    // Opcional: Enviar email de confirmación al cliente
    $confirmSubject = 'Gracias por contactarnos - C & C Soluciones';
    $confirmBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #00a8ff; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>¡Gracias por contactarnos!</h2>
            <p>Hola " . htmlspecialchars($nombre) . ",</p>
            <p>Hemos recibido tu mensaje y te responderemos a la brevedad posible.</p>
            <p>Saludos,<br>Equipo de C & C Soluciones</p>
        </div>
    </body>
    </html>
    ";
    
    $confirmHeaders = "MIME-Version: 1.0" . "\r\n";
    $confirmHeaders .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $confirmHeaders .= "From: " . $to . "\r\n";
    
    mail($email, $confirmSubject, $confirmBody, $confirmHeaders);
    
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje enviado correctamente'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al enviar el email'
    ]);
}
?>
