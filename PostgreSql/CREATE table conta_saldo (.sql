CREATE table conta_saldo (
    NRCC serial primary key,
    nome varchar(100) not null,
    cpf integer not null,
    saldo float not null
);
insert into conta_saldo (NRCC, nome, cpf, saldo)
values (1000, 'J SILVA', 123, 500.0),
(1001,'A BARROS', 143, 500.0),
(1002, 'J SILVA', 123, 200.0),
(1003, 'S SALES', 223, 500.0);

select * from conta_saldo