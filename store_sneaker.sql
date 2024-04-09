create database sneaker_store;
use sneaker_store;
create table `role`(
id_role int not null auto_increment primary key,
`role` varchar(55)
);

create table `account`(
id_account int not null auto_increment primary key,
email varchar(55) unique,
`password` varchar (60) unique
);

create table `account_role`(
id_account int not null,
id_role int not null,
foreign key(id_account) references `account`(id_account),
foreign key(id_role) references `role`(id_role)
);
create table `user`(
id_user int not null auto_increment primary key,
address varchar(255),
date_of_birth varchar(255),
gender bit(1) not null,
phone_number varchar(20),
username varchar(255) not null,
id_account int not null,
foreign key(id_account) references `account`(id_account)
);

create table brand (
id_brand int not null auto_increment primary key,
name_brand varchar(255)
);

 create table product_type(
 id_product_type int not null auto_increment primary key,
 product_type varchar(255) 
 );
create table discount(
id_discount int not null auto_increment primary key,
percent double
);

create table `product`(
id int not null auto_increment primary key,
date_import varchar(255),
description_product longtext not null,
material varchar (255),
name_product varchar(255),
price double,
quantity int ,
status_product bit(1),
id_brand int,
id_discount int,
id_product_type int ,
foreign key(id_brand) references brand(id_brand),
foreign key(id_discount) references discount(id_discount),
foreign key(id_product_type) references product_type(id_product_type)
);

create table cart(
id_cart int not null auto_increment primary key,
quantity int,
id_product int not null,
foreign key(id_product) references `product`(id),
id_user int not null,
foreign key(id_user) references `user`(id_user)
);

create table image (
id_image int not null auto_increment primary key,
url longtext not null,
id_product int not null,
foreign key (id_product) references `product`(id)
);

create table `orders`(
id_orders int not null auto_increment primary key,
date_order datetime not null,
status_order bit(1) not null,
id_user int not null, 
foreign key (id_user) references `user`(id_user)
);

create table order_detail(
id_order_detail int not null auto_increment primary key,
quantity int not null,
id_product int not null,
id_order int not null,
foreign key (id_product) references `product`(id),
foreign key (id_order) references `orders`(id_orders)
);

create table color(
id int not null auto_increment primary key,
color varchar(255)
);

create table colors_product(
color_id int not null,
product_id int not null, 
foreign key(color_id) references color(id),
foreign key(product_id) references `product`(id)
);

create table size(
id int  not null auto_increment primary key,
size int
);

create table sizes_product(
size_id int not null,
product_id int not null,
foreign key(size_id) references size(id),
foreign key(product_id) references `product`(id)
)