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

$fullname       = clean($_POST['fullname'] ?? '');
$email          = clean($_POST['email'] ?? '');
$mobile         = clean($_POST['mobile'] ?? '');
$idno           = clean($_POST['idno'] ?? '');
$password       = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirm-password'] ?? '';
$course         = clean($_POST['course'] ?? '');
$year           = clean($_POST['year'] ?? '');
$gender         = clean($_POST['gender'] ?? '');
$terms          = $_POST['terms'] ?? '';

if (!preg_match('/^[A-Za-z ]{3,50}$/', $fullname)) {
    $errors[] = 'Full name must be 3–50 letters and spaces only.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Enter a valid email address.';
}

if (!preg_match('/^[6-9]\d{9}$/', $mobile)) {
    $errors[] = 'Enter a valid 10-digit mobile number (starts with 6–9).';
}

if (!preg_match('/^[A-Za-z0-9]{4,15}$/', $idno)) {
    $errors[] = 'ID number must be 4–15 letters/numbers only.';
}

if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/', $password)) {
    $errors[] = 'Password needs 8+ characters, uppercase, lowercase, a number, and a symbol.';
}

if ($password !== $confirmPassword) {
    $errors[] = 'Passwords do not match.';
}

if (!in_array($course, ['cse', 'ce', 'it'], true)) {
    $errors[] = 'Please select a valid course.';
}

if (!in_array($year, ['1', '2', '3', '4'], true)) {
    $errors[] = 'Please select a valid year.';
}

if (!in_array($gender, ['male', 'female', 'other'], true)) {
    $errors[] = 'Please select a gender.';
}

if ($terms !== 'on') {
    $errors[] = 'You must accept the terms and conditions.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo '<h1>Registration failed</h1><ul>';
    foreach ($errors as $error) {
        echo '<li>' . htmlspecialchars($error) . '</li>';
    }
    echo '</ul><p><a href="register.html">Go back</a></p>';
    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$storageDir = __DIR__ . '/storage';
if (!is_dir($storageDir)) {
    mkdir($storageDir, 0755, true);
}

$csvFile = $storageDir . '/registrations.csv';
$isNewFile = !file_exists($csvFile);

$fp = fopen($csvFile, 'a');
if ($fp === false) {
    http_response_code(500);
    exit('Could not save registration. Please try again.');
}

if (flock($fp, LOCK_EX)) {
    if ($isNewFile) {
        fputcsv($fp, ['id', 'fullname', 'email', 'mobile', 'idno', 'password_hash', 'course', 'year', 'gender', 'submitted_at']);
    }

    $id = uniqid('reg_', true);
    fputcsv($fp, [
        csvSafe($id),
        csvSafe($fullname),
        csvSafe($email),
        csvSafe($mobile),
        csvSafe($idno),
        $passwordHash,
        csvSafe($course),
        csvSafe($year),
        csvSafe($gender),
        date('Y-m-d H:i:s'),
    ]);

    flock($fp, LOCK_UN);
}
fclose($fp);

echo '<h1>Registration successful</h1>';
echo '<p>Welcome, ' . htmlspecialchars($fullname) . '! Your registration has been recorded.</p>';
echo '<p><a href="login.html">Go to Login</a></p>';
