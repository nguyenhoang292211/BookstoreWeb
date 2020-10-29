CREATE DATABASE BOOKSTOREWEB
GO

USE BOOKSTOREWEB
GO


CREATE TABLE Permissions(
	id INT IDENTITY,
	permission NVARCHAR(30)
	CONSTRAINT PK_Permissions PRIMARY KEY (id)
)
GO

CREATE TABLE Account
(
	id INT IDENTITY,
	userName NVARCHAR(30) NOT NULL,
	passWord NVARCHAR(30) NOT NULL,
	idPermission INT DEFAULT 1 FOREIGN KEY REFERENCES dbo.Permissions(id)
	CONSTRAINT PK_Account PRIMARY KEY (id)
)
GO


INSERT dbo.Permissions
        ( permission )
VALUES  ( N'Customer'  -- permission - nvarchar(30)
          ), (N'Staff'), (N'Admin')

INSERT dbo.Account
        ( userName, passWord, idPermission )
VALUES  ( N'admin', -- userName - nvarchar(30)
          N'admin', -- passWord - nvarchar(30)
          3  -- idPermission - int
          ), (N'staff', N'staff', 2), (N'customer', N'customer', 1)

SELECT * FROM dbo.Account

DELETE dbo.Account WHERE id = 4