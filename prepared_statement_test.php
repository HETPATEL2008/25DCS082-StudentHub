<?php declare(strict_types=1);

try {
    require_once __DIR__ . '/config/db_pdo.php';

    $email = 'aarav.shah@example.com';

    $stmt = $pdo->prepare(
        'SELECT id, fullname, email
         FROM students
         WHERE email = :email'
    );

    $stmt->execute([
        'email' => $email,
    ]);

    $student = $stmt->fetch();

    if ($student) {
        echo '<h2>Prepared statement successful!</h2>';
        echo '<p>ID: ' . (int) $student['id'] . '</p>';
        echo '<p>Name: ' . htmlspecialchars($student['fullname'], ENT_QUOTES, 'UTF-8') . '</p>';
        echo '<p>Email: ' . htmlspecialchars($student['email'], ENT_QUOTES, 'UTF-8') . '</p>';
    } else {
        echo '<p>No student found with that email.</p>';
    }
} catch (PDOException $exception) {
    error_log('StudentHub prepared statement test failed: ' . $exception->getMessage());

    http_response_code(500);
    echo 'The database test failed. Check the PHP error log.';
}
