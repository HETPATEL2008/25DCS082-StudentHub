<?php 
declare(strict_types=1);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

require_once __DIR__ . '/config/db.php';

$mysqliResult = $conn->query(
    'SELECT DATABASE() AS db_name, VERSION() AS mysql_version'
);

$mysqliInfo = $mysqliResult->fetch_assoc();

require_once __DIR__ . '/config/db_pdo.php';

/** @var PDO $pdo Defined in config/db_pdo.php */
$pdoInfo = $pdo->query(
    'SELECT DATABASE() AS db_name, VERSION() AS mysql_version'
)->fetch();

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudentHub Database Test</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 760px;
            margin: 40px auto;
            padding: 0 18px;
            color: #18212f;
            line-height: 1.5;
        }

        h1 {
            color: #14532d;
        }

        section {
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            padding: 18px;
            margin: 16px 0;
        }

        .success {
            color: #166534;
            font-weight: bold;
        }

        code {
            background: #f1f5f9;
            padding: 3px 6px;
            border-radius: 4px;
        }
    </style>
</head>
<body>

    <h1>StudentHub Database Connectivity</h1>

    <p class="success">
        Both database connection tests passed.
    </p>

    <section>
        <h2>MySQLi Connection</h2>

        <p>Status: <strong>Connected</strong></p>

        <p>
            Database:
            <code><?= h((string) $mysqliInfo['db_name']) ?></code>
        </p>

        <p>
            MySQL version:
            <?= h((string) $mysqliInfo['mysql_version']) ?>
        </p>
    </section>

    <section>
        <h2>PDO Connection</h2>

        <p>Status: <strong>Connected</strong></p>

        <p>
            Database:
            <code><?= h((string) $pdoInfo['db_name']) ?></code>
        </p>

        <p>
            MySQL version:
            <?= h((string) $pdoInfo['mysql_version']) ?>
        </p>
    </section>

    <p>Practical 8 — StudentHub Database Test</p>

</body>
</html>
