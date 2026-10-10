<?php declare(strict_types=1);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$configFile = __DIR__ . '/config.local.php';

if (!is_file($configFile)) {
    $configFile = __DIR__ . '/config.sample.php';
}

$dbConfig = require $configFile;

try {
    $conn = new mysqli(
        $dbConfig['host'],
        $dbConfig['username'],
        $dbConfig['password'],
        $dbConfig['database'],
        (int) $dbConfig['port']
    );

    $conn->set_charset($dbConfig['charset'] ?? 'utf8mb4');
} catch (mysqli_sql_exception $exception) {
    error_log(
        'StudentHub MySQLi connection failed: '
        . $exception->getMessage()
    );

    http_response_code(500);
    exit(
        'Database connection failed. '
        . 'Check XAMPP and config/config.local.php.'
    );
}
