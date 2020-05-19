-- SELECT * FROM information_schema.tables
-- WHERE table_schema = 'project';

INSERT INTO CONTACT (Fname,Mname,Lname) VALUES (
'Diya',NULL,'Chandra'
);
set @cid := last_insert_id();
INSERT INTO ADDRESS (Contact_id,Address_type,Address,City,State,Zip)VALUES (
@cid,'Home','800 W Renner Rd','Dallas','TX','75080'
);
INSERT INTO PHONE (Contact_id,Phone_type,Area_code,Phone_Number) VALUES (
@cid,'Work','469','4692303567'
);
INSERT INTO DATES (Contact_id,Date_type,Date_value) VALUES (
@cid,'Birthday','1996-01-09'
);



