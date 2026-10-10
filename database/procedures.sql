
USE studenthub;

DROP PROCEDURE IF EXISTS GetEventRegistrationCount;

DELIMITER //

CREATE PROCEDURE GetEventRegistrationCount(
    IN p_event_id BIGINT UNSIGNED
)
BEGIN
    SELECT
        e.id,
        e.title,
        e.event_date,
        COUNT(r.id) AS registration_count
    FROM events AS e
    LEFT JOIN registrations AS r
        ON r.event_id = e.id
    WHERE e.id = p_event_id
    GROUP BY
        e.id,
        e.title,
        e.event_date;
END //

DELIMITER ;

-- Example:
-- CALL GetEventRegistrationCount(6);
