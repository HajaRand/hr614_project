SHOW timezone;
SET timezone='UTC';


INSERT INTO Role (roleid, RoleName)
VALUES
    (1, 'Trainer'),
    (2, 'Trainee'),
    (3, 'Admin'),
    (4, 'Contributor');

	
	INSERT INTO Permission (PermissionId, PermissionName) VALUES
    (1,'Add exercise program'),
	(2,'Delete exercise program'),
    (3, 'Approve exercise program'),
    (4, 'Add user'),
    (5, 'Edit user'),
    (6, 'Delete user'),
	(7, 'Use exercise program'),
	(8, 'Set preferences'),
	(9, 'Use social');
	
	INSERT INTO RolePermission (roleid, PermissionId) VALUES
	(1, 1),
	(1, 2), 
	(1, 3),
	(2, 7),
	(2, 8),
	(2, 9),
	(3, 4),
	(3, 5), 
	(3, 6),
	(4, 1);
	 
 
 -----Test data ---------------------------------------------------------------
 

insert into users(UserId, FirstName, LastName, Email,Phone )
VALUES
(1, 'Rees', 'Watkins', 'rees.watkins@yahoo.co.uk','00447414025520');

-- (2, 'Bob', 'Jones', 'xxx@gmail.com','000'),
-- (3, 'Sally', 'Smith', 'xxx@gmail.com','000'),
-- (4, 'Sue', 'Newman', 'xxx@gmail.com','000'),
-- (5, 'John', 'Rodgers', 'xxx@gmail.com','000'),
-- (6, 'David', 'Goodman', 'xxx@gmail.com','000');


 -- Create UserRole Table
insert into  UserRole ( UserId, RoleId)
VALUES 
 (1, 1);
 
 -- (2, 1), 
 -- (3, 1), 
 -- (4, 1), 
 -- (5, 3), 
 -- (6, 1);
 