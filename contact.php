<?php
// contact.php — handles contact form submissions

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

// Read JSON body
$body = file_get_contents('php://input');
$data = json_decode($body, true);

// Sanitize inputs
$name    = htmlspecialchars(trim($data['name']    ?? ''));
$email   = htmlspecialchars(trim($data['email']   ?? ''));
$message = htmlspecialchars(trim($data['message'] ?? ''));

// Validate
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
    exit;
}

// ── OPTION 1: Save to a text log file ──
$log_file = 'messages.txt';
$log_entry = "---\nDate: " . date('Y-m-d H:i:s') . "\nName: $name\nEmail: $email\nMessage: $message\n\n";
file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);

// ── OPTION 2: Send email (uncomment and configure to use) ──
/*
$to      = 'hardikgehlot@example.com';   // <-- replace with your email
$subject = 'New Contact from Portfolio — ' . $name;
$body    = "Name: $name\nEmail: $email\n\nMessage:\n$message";
$headers = "From: $email\r\nReply-To: $email\r\nX-Mailer: PHP/" . phpversion();
mail($to, $subject, $body, $headers);
*/

echo json_encode(['status' => 'ok', 'message' => 'Message received.']);
?>