<?php
declare(strict_types=1);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$configFile = __DIR__ . '/config.local.php';

if (!is_file($configFile)) {
    $configFile = __DIR__ . '/config.sample.php';
}

$dbConfig = require $configFile;

$dsn = sprintf(
    'mysql:host=%s;port=%d;dbname=%s;charset=%s',
    $dbConfig['host'],
    (int) $dbConfig['port'],
    $dbConfig['database'],
    $dbConfig['charset'] ?? 'utf8mb4'
);

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO(
        $dsn,
        $dbConfig['username'],
        $dbConfig['password'],
        $options
    );
} catch (PDOException $exception) {
    error_log(
        'StudentHub PDO connection failed: '
        . $exception->getMessage()
    );

    http_response_code(500);
    exit(
        'Database connection failed. '
        . 'Check XAMPP and config/config.local.php.'
    );
}
