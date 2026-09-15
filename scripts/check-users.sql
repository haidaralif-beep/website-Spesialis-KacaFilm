SET NOCOUNT ON;
SELECT id, nama, LEFT(password, 30) AS password_preview, role, created_at
FROM users 
WHERE nama LIKE '%admin%' OR nama = 'admin';
