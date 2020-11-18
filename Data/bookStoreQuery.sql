CREATE DATABASE BOOKSTOREWEB
GO

USE BOOKSTOREWEB
GO

-- * ghi chú của Ân.


-----------1. Permission -- *done
CREATE TABLE Permissions(
	id INT IDENTITY PRIMARY KEY,
	permission  NVARCHAR(30))
-------------------------------------------------------------- insert
INSERT INTO Permissions VALUES ('admin'), ('staff'), ('shipper'), ('user')


-----------2. Account -- *done
CREATE TABLE Account(
	id INT IDENTITY PRIMARY KEY,
	userName NVARCHAR(100) NOT NULL UNIQUE,
	passWord NVARCHAR(100) NOT NULL DEFAULT '00000000',
	idPermission INT NOT NULL DEFAULT 0,   
	FOREIGN KEY (idPermission) REFERENCES Permissions(id))
------------------------------------------------------------- insert
INSERT INTO Account VALUES ('admin001', 'admin001',1), ('staff001', 'staff001',2), ('shipper001', 'shipper001',3), ('user001','user002',4),
							('user003', 'user003',4)


------3. Category -- *done
CREATE TABLE Category(
	id INT IDENTITY PRIMARY KEY,
	name NVARCHAR(100) NOT NULL DEFAULT 'Regular')
---------------------------------------------------------------------
INSERT INTO Category VALUES ('English Book'), ('Comic Book'), ('Computer Books')


------- 7. Shop --*dogin -- done model. -- Ân Trần chuyển từ số 7 lên trên này.
CREATE TABLE Shop(
	id INT IDENTITY PRIMARY KEY,
	name NVARCHAR(100),
	address NVARCHAR(100),
	phone NVARCHAR(15),
	email NVARCHAR(30),
	avatar IMAGE,
	info NVARCHAR(MAX))
-----------------------------------
INSERT INTO Shop VALUES ('GHAT2', '23- ChuSoDo Shigadama', '02342342342', 'ghat2@gmail.com','','Make you found on me')


-----4. Type -- *done
CREATE TABLE Types(
	id INT IDENTITY NOT NULL PRIMARY KEY,
	idCategory INT,
	name NVARCHAR(100) NOT NULL DEFAULT 'Regular',
	FOREIGN KEY (idCategory) REFERENCES Category(id))
---------------------------------------------------------------------------
INSERT INTO Types VALUES (1, 'Listening book'), (1, 'Speaking book'), (1,'Bilingual book'), (1,'Dictionary'),
						(2, 'Anime'), (2, 'Thriller Book'), (2,'Fiction'), (2,'Short story'),
						(3, 'Programming for Beginners'), (3,'Scratch code'),  (3,'Android programming')

------5. Product --*doing --done Model.
CREATE TABLE Product(
	id INT IDENTITY PRIMARY KEY,
	idShop INT,					--Được thêm bởi Ân Trần (26/10/2020) -- đã sửa insert.
	idType INT,
	name NVARCHAR(100) NOT NULL,
	price FLOAT NOT NULL,
	quantity INT NOT NULL DEFAULT 0,
	author NVARCHAR(100) NOT NULL DEFAULT 'Collection',
	description NVARCHAR(MAX),
	quantitySold INT NOT NULL DEFAULT 0,
	publisher NVARCHAR(100),
	rating float NOT NULL DEFAULT 3.0,
	score INT NOT NULL DEFAULT 0,
	FOREIGN KEY (idShop) REFERENCES dbo.Shop(id),
	FOREIGN KEY (idType) REFERENCES Types(id))

INSERT INTO Product VALUES (1, 1, 'Listening band 3.5 to 4.5',79000, 20,'Hyrichy Adobe', '	Our unique self-paced approach will help you build competence and 
											confidence in your programming skills. And Python is the best language ever for learning how to 
											program because of its simplicity and breadth...two features that are hard to 
											find in a single language',4, 'KMTC Publisher',4.6, 300),
						(1, 1, 'Listening band 7.0 to 9.0',79000,21,'Hyrichy Adobe', 'Our unique self-paced approach will help you build competence and 
											confidence in your programming skills. And Python is the best language ever for learning how to 
											program because of its simplicity and breadth...two features that are hard to 
											find in a single language',5, 'Starz Entertainment',3.6, 2550),
						(1, 2, 'Main meaning for Speaking Ielts test',79000,36,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',75, 'KMTC Publisher',4.9, 536),
						(1, 2, 'Speaking band 4.5 to 6.0',79000,122,'Romy Hausmann','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',50, 'Starz Entertainment',4.7, 366), 
						(1, 2, 'Suggesting in Speaking Ielts test',35000,35,'Romy Hausmann','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',13, 'KMTC Publisher',4.0, 364),
						(1, 3, 'The Foot boook',25000,1,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',55, 'KMTC Publisher',3.9,155),
						(1, 3,'Collins easy learning Italia words',155000,86,'Catherine Gildiner','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',44, 'KMTC Publisher',3.6, 233),
						(1, 4,'Oxford Dictionary 10000 word',86000,74,'Romy Hausmann','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',2, 'KMTC Publisher',1.5, 100),
						(1, 4,'Oxford Dictionary essential word',126000,66,'Romy Hausmann','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',5, 'KMTC Publisher',3.0,20),
						(1, 5,'Your Name',195000,22,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',88, 'KMTC Publisher',4.3, 400),
						(1, 5,'Sheep or ship',255000,58,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',56, 'KMTC Publisher',4.6, 299),
						(1, 5,'How the  sheep turn to moon',155000,2,'Catherine Gildiner','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',120, 'Starz Entertainment',4.8, 355),
						(1, 6, 'Edogawa Conan Detective 1',169000,3,'Catherine Gildiner','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',22, 'KMTC Publisher',4.2, 315), 
						(1, 6, 'Edogawa Conan Detective 2',99000,8,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',89, 'KMTC Publisher',4.5, 465),
						(1, 7, 'Flower on the OldMan',109000,7,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',42, 'Starz Entertainment',4.5, 306),
						(1, 7, 'Secret make Secret Woman',126000,2,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',2, 'Kindle Edition',4.2, 300), 
						(1, 8, 'Adventure of Jack and his tiny friend',79000,9,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',6, 'KMTC Publisher',4.9, 335),
						(1, 8, 'Poenic of twenty zodiacs',39000,3,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',9, 'Sling TV LLC',4.8, 265),
						(1, 8, 'Helalulu in giant land 2',89000,2,'Sigrid Nunez','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',5, 'KMTC Publisher',4.6, 342), 
						(1, 9, 'How I start my ethusiastic with coding!',99000, 7,'Sigrid Nunez','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',2, 'Kindle Edition',5, 105), 
						(1, 9, 'Your first coding programming',129000,2,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',23, 'Sling TV LLC',4.2, 300), 
						(1, 10, 'What is scatch? How your children like this?',139000,3,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',88, 'Kindle Edition',4.2,262),
						(1, 10, 'Scratching version Math- a close friend',89000,9,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',55, 'Sling TV LLC',4.8, 368),
						(1, 10, 'Scatch and your life- efficient impact, get better in every day',55000,2,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',66, 'Starz Entertainment',4.2, 359), 
						(1, 11, 'Work with Java, first step to become Android Development',68000,9,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',15, 'Kindle Edition',4.8, 325), 
						(1, 11, 'Android with Android Studio',136000,65,'Hyrichy Adobe','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',64, 'Kindle Edition',4.6, 234), 
						(1, 11, 'UX design- better for your application',13000,64,'Sigrid Nunez','Christie Tates...writing displays a wonderful combination
											of clear and simple with sparkle and intelligence...[Group is] a compelling narrative
											that empowers readers to better understand their own lives.
											Booklist (starred review)',5, 'Kindle Edition',4.6, 364)
						


		
--Create by Ân Trần, date: 26/10/2020 ===================================
--6.01. PhotoProduct. -- Ảnh của sản phẩm. --*doing --done Model.
CREATE TABLE PhotoProduct(
	id INT IDENTITY(1, 1) PRIMARY KEY,
	idProduct INT,
	photo IMAGE
    CONSTRAINT productPhoto FOREIGN KEY (idProduct) REFERENCES dbo.Product(id)
)
			
--6. Thông tin Staff
CREATE TABLE Staff(
	id INT IDENTITY (1,1) PRIMARY KEY,
	idAccount INT UNIQUE NOT NULL,
	name NVARCHAR(100),
	avatar IMAGE,
	birthDay DATE NOT NULL DEFAULT '01-01-1990',
	gender NVARCHAR(30),
	address NVARCHAR(100),
	phone NVARCHAR(15),
	email NVARCHAR(30),
	idMan INT
)
GO
ALTER TABLE dbo.Staff ADD CONSTRAINT PK_Staff_Staff FOREIGN KEY (idMan) REFERENCES dbo.Staff(id)	
INSERT INTO dbo.Staff
        (idAccount, name, avatar, birthDay, gender, address, phone, email, idMan)
VALUES (1,'Jack Handy', '', '2-2-2000', 'Male', '123- Andrew, Himston', '0123456789', 'jackcm@gmail.com', 1),
							(2,'Mark Zuckerberg', '','1-13-2002', 'Male', '63- Wales, Royal Navy', '0333875398', 'markzkb@gmail.com', 1)
GO	
-------7. Customer --*doing -- done Model
CREATE TABLE Customer(
	id INT IDENTITY (1,1) PRIMARY KEY,
	idAccount INT UNIQUE NOT NULL,
	name NVARCHAR(100),
	avatar IMAGE,
	birthDay DATE NOT NULL DEFAULT '1-1-1990',
	gender NVARCHAR(30),
	address NVARCHAR(100),
	phone NVARCHAR(15),
	email NVARCHAR(30),
	CONSTRAINT accCus FOREIGN KEY (idAccount) REFERENCES Account(id))
-------------------------------------------------------------------------------------
INSERT INTO Customer VALUES (3,'Jack Handy', '', '2-2-2000', 'Male', '123- Andrew, Himston', '0123456789', 'jackcm@gmail.com'),
							(4,'Mark Zuckerberg', '','1-13-2002', 'Male', '63- Wales, Royal Navy', '0333875398', 'markzkb@gmail.com'),
							(5,'Murah Ver', '', '10-30-2000', 'Female', '3327- CUmbria Himston', '0157856646', 'murahVer@gmail.com')
							 

-------8. Cart --*doing -- done model.

CREATE TABLE Cart(
	idCustomer INT  ,
	idProduct INT,
	idShop INT,
	quantity INT,
	CONSTRAINT useCart FOREIGN KEY (idCustomer) REFERENCES Customer(id),
	CONSTRAINT proCart FOREIGN KEY (idProduct) REFERENCES Product(id),
	CONSTRAINT shopping PRIMARY KEY (idCustomer, idProduct)
)

INSERT INTO Cart VALUES (3, 2,1, 2), (3,6, 1, 1), (3,9, 1, 2),
						(2, 2, 1, 1), (2,5, 1, 2),
						(1,3, 1, 1), (1,1, 1, 1), (1,10, 1, 2)

------- 9. Voucher --*doing --done model
CREATE TABLE Voucher(
	id INT IDENTITY (1,1) PRIMARY KEY,
	name NVARCHAR(100) NOT NULL DEFAULT 'Annual promotions',
	startDate DATETIME NOT NULL DEFAULT GETDATE(),
	endDate DATETIME NOT NULL DEFAULT GETDATE(),
	detail NVARCHAR(MAX),
	discount FLOAT NOT NULL DEFAULT 0)
INSERT INTO Voucher VALUES 
		('Summer Promotion', '1-1-2020', '6-1-2000', '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
		"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',0.2), 
		('Back to school', '10-1-2020', '12-1-2000', '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
		"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',0.3)


------- 10. Comment --*doing --done model
CREATE TABLE Comment(
	id INT IDENTITY PRIMARY KEY,
	idProduct INT NOT NULL,
	idCustomer INT NOT NULL,
	idShop INT NOT NULL,
	datePosting DATETIME  NOT NULL DEFAULT GETDATE(),
	content NVARCHAR(MAX), --=====================Dữ liệu này chuyển thành Max - nếu muốn giới hạn kí tự có thể bổ sung bên JS. Cập nhật thêm photo nếu cần thiết.
	rating INT --================================Bổ sung bởi Ân Trần ngày: 26/10/2020 -- Rate từ 1 đến 5
	CONSTRAINT proComment FOREIGN KEY (idProduct) REFERENCES Product(id),
	CONSTRAINT cusComment FOREIGN KEY (idCustomer) REFERENCES Customer(id),
	CONSTRAINT shopComment FOREIGN KEY (idShop) REFERENCES Shop(id))

INSERT INTO Comment VALUES (1,1,1,'7-1-2020', 'very beautiful, I will continue using this service', 4),
						(1,2,1,'7-2-2020', 'Book has a lucky content, suit for young people who loss your ethusiam', 5),
						(2,3,1,'7-1-2020', 'Good, Good', 5)


---------- 11.	Delivery: Các phương thức chuyển hàng. -- *doing --done Model.
CREATE TABLE Delivery(
	id INT IDENTITY PRIMARY KEY,
	name NVARCHAR(100) NOT NULL,
	feeShip FLOAT NOT NULL)
-----------------------------------------------------
INSERT INTO Delivery VALUES ('DHL Express', 170000), ('Tobo Delivery', 20000), ('GHN fast delivery',22000)

------- 12. Payment --*doing --done model
CREATE TABLE Payment(
	id INT IDENTITY PRIMARY KEY,
	name NVARCHAR(100) NOT NULL)
-------------------------------------------------------
INSERT INTO Payment VALUES ('cash'), ('VISA CARD'), ('Momo mobile money')


------ 13. Bill -- *doing -- done model.
	CREATE TABLE Bill(
		id INT IDENTITY PRIMARY KEY,
		idCustomer INT NOT NULL,
		idDelivery INT NOT NULL,
		idPayment INT NOT NULL,
		idVoucher INT DEFAULT 0,
		addressReceive NVARCHAR(100) NOT NULL,
		phone NVARCHAR(15),
		dateConfirm DATETIME NOT NULL DEFAULT GETDATE(),
		dateReceive DATE NOT NULL DEFAULT GETDATE() + 4, --Thay đổi 2 thành 4. (Số ngày này có thể do Code thiết lập để phù hợp với khoảng cách).
		feeShip float NOT NULL DEFAULT 20000,
		totalCost FLOAT NOT NULL DEFAULT 20000
		CONSTRAINT cusBill FOREIGN KEY (idCustomer) REFERENCES dbo.Customer(id),
		CONSTRAINT delBill FOREIGN KEY (idDelivery) REFERENCES  Delivery(id),
		CONSTRAINT payBill FOREIGN KEY (idPayment) REFERENCES Payment(id)
	 )

----------------------------------------
INSERT INTO Bill VALUES (1, 1,1,0,'123- Andrew, Himston','0123456789','6-27-2020', '7-2-2020', 34000, 192000), --Đã sửa dữ liệu.
						(2, 2,1,0,'63- Wales, Royal Navy','0333875398','6-26-2020', '7-2-2020',20000,99000),  
						(3, 3,1,0,'3327- CUmbria Himston','0157856646 ','6-26-2020', '7-1-2020',22000, 180000)

-------- 14. BillDetail --*doing
	CREATE TABLE BillDetail(
		id INT IDENTITY PRIMARY KEY,
		idBill INT NOT NULL,
		idProduct INT NOT NULL,
		state NVARCHAR(15) NOT NULL DEFAULT 'confirm',
		prices FLOAT NOT NULL,
		quantity INT NOT NULL DEFAULT 1,
		CONSTRAINT bilDetail FOREIGN KEY (idBill) REFERENCES Bill(id),
		CONSTRAINT proDetail FOREIGN KEY (idProduct) REFERENCES Product(id))
 INSERT INTO  BillDetail VALUES (1,1,'Complete',79000,2),
								(2,1,'Complete',79000,1),
								(3,2,'Complete', 79000,2)
		 
GO


--======================================================================================================================================= PROCEDURE.

-- Tạo procedure cho tìm kiếm tài khoản thông qua username. (Thay vì hiển thị idPremission thì sẽ hiển thị tên của Permission trong bảng).
-- Create by Ân Trần - 26/10/2020
CREATE PROC USP_SearchAccountByUserName
@userName NVARCHAR(100)
AS
BEGIN
    SELECT Account.id, userName, passWord, permission
	FROM dbo.Account INNER JOIN dbo.Permissions ON Permissions.id = Account.idPermission
	WHERE userName = @userName
END
GO

CREATE PROC USP_GetAccountsByIDPermission
@idPermission INT
AS
BEGIN
    SELECT Account.id, userName, passWord, permission
	FROM dbo.Account INNER JOIN dbo.Permissions ON Permissions.id = Account.idPermission
	WHERE idPermission = @idPermission
	ORDER BY id
END
GO

CREATE PROC USP_AddCustomer
@userName NVARCHAR(30), @passWord NVARCHAR(30), @name NVARCHAR(30), @birthDay DATE, @gender NVARCHAR(30), @address NVARCHAR(MAX), @phone NVARCHAR(30), @email NVARCHAR(30)
AS
BEGIN
    DECLARE @maxIDAccount INT
	INSERT INTO dbo.Account ( userName, password, idPermission ) VALUES  (@userName, @passWord, 1)
	SELECT @maxIDAccount = MAX(id) FROM dbo.Account
	INSERT INTO dbo.Customer (idAccount, name, birthDay, gender, address, phone, email)
	VALUES (@maxIDAccount, @name, @birthDay, @gender, @address, @phone, @email)
END
GO


CREATE PROC USP_UpdatePassWordByEmail
@password NVARCHAR(30), @email NVARCHAR(30)
AS
BEGIN
	UPDATE dbo.Account SET password = @password WHERE id IN (SELECT idAccount FROM dbo.Customer WHERE email = @email) 
END
GO

-- Lấy danh sách các đơn hàng (shipper dùng để kiểm tra và giao hàng)
CREATE PROC USP_GetListTransport
AS
BEGIN
    SELECT bi.id, bi.dateConfirm, cus.name, bi.addressReceive, bi.phone, bi.totalCost, bid.state
	FROM dbo.Bill AS bi, dbo.Customer AS cus, dbo.BillDetail AS bid
	WHERE bi.idCustomer = cus.id AND bi.id = bid.idBill
END
GO

-- Lấy danh sách các đơn hàng đã giao (shipper dùng để kiểm tra và giao hàng)
CREATE PROC USP_GetListTransportByState
@state NVARCHAR(30)
AS
BEGIN
    SELECT bi.id, bi.dateConfirm, cus.name, bi.addressReceive, bi.phone, bi.totalCost, bid.state
	FROM dbo.Bill AS bi, dbo.Customer AS cus, dbo.BillDetail AS bid
	WHERE bi.idCustomer = cus.id AND bi.id = bid.idBill AND bid.state = @state
END
GO


--======================================================================================================================================= TRIGGER.

SELECT * FROM dbo.Account
SELECT * FROM dbo.Staff
SELECT * FROM dbo.Customer
SELECT * FROM dbo.Bill
SELECT * FROM dbo.BillDetail
SELECT * FROM dbo.Delivery

UPDATE dbo.BillDetail SET state = 'shipping' WHERE idBill = 2