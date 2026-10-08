<?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('This endpoint only accepts POST requests.');
}

$errors = [];

function clean(string $value): string {
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

function csvSafe(string $value): string {
    if (preg_match('/^[=+\-@]/', $value)) {
        return "'" . $value;
    }
    return $value;
}

$name    = clean($_POST['name'] ?? '');
$email   = clean($_POST['email'] ?? '');
$message = clean($_POST['message'] ?? '');

if (mb_strlen($name) < 2 || mb_strlen($name) > 60) {
    $errors[] = 'Name must be between 2 and 60 characters.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Enter a valid email address.';
}

if (mb_strlen($message) < 10 || mb_strlen($message) > 1000) {
    $errors[] = 'Message must be between 10 and 1000 characters.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo '<h1>Message not sent</h1><ul>';
    foreach ($errors as $error) {
        echo '<li>' . htmlspecialchars($error) . '</li>';
    }
    echo '</ul><p><a href="contact.html">Go back</a></p>';
    exit;
}

$storageDir = __DIR__ . '/storage';
if (!is_dir($storageDir)) {
    mkdir($storageDir, 0755, true);
}

$csvFile = $storageDir . '/contacts.csv';
$isNewFile = !file_exists($csvFile);

$fp = fopen($csvFile, 'a');
if ($fp === false) {
    http_response_code(500);
    exit('Could not send your message. Please try again.');
}

if (flock($fp, LOCK_EX)) {
    if ($isNewFile) {
        fputcsv($fp, ['id', 'name', 'email', 'message', 'submitted_at']);
    }

    $id = uniqid('msg_', true);
    fputcsv($fp, [
        csvSafe($id),
        csvSafe($name),
        csvSafe($email),
        csvSafe($message),
        date('Y-m-d H:i:s'),
    ]);

    flock($fp, LOCK_UN);
}
fclose($fp);

echo '<h1>Message sent</h1>';
echo '<p>Thanks, ' . htmlspecialchars($name) . '! We\'ll get back to you soon.</p>';
echo '<p><a href="index.html">Back to Home</a></p>';
