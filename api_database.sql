/*
DROP VIEW VIEW_USUARIOS;
DROP VIEW VIEW_FULL_USUARIOS;
DROP VIEW view_full_seccion_alumno;
DROP VIEW view_profesor_full_seccion;
DROP VIEW VIEW_REG_ASISTENCIA;
DROP TABLE ESTADO CASCADE;
DROP TABLE USUARIO CASCADE;
DROP TABLE PSWD CASCADE;
DROP TABLE ALUMNO CASCADE;
DROP TABLE DOCENTE CASCADE;
DROP TABLE ASIGNATURA CASCADE;
DROP TABLE SECCION CASCADE;
DROP TABLE clase CASCADE;
DROP TABLE SECCION_ALUMNO CASCADE;
DROP TABLE REGISTRO_clases CASCADE;
DROP TABLE REGISTRO_ASISTENCIA CASCADE;
DROP SEQUENCE seq_reg_asistencia CASCADE;
*/

CREATE TABLE ESTADO (
    idEstado        INTEGER PRIMARY KEY,
    nombreEstado    VARCHAR(200) NOT NULL
);

CREATE TABLE USUARIO (
    idUsuario       INTEGER PRIMARY KEY,
    mailUsuario     VARCHAR(200) NOT NULL,
    idEstado        INTEGER NOT NULL REFERENCES ESTADO
);

CREATE TABLE SESION (
    idsesion        integer primary key,
    tokensesion     varchar(200) not null,
    idusuario       integer not null references usuario,
    idestado        integer not null references estado
);

CREATE TABLE PSWD (
    passwd          VARCHAR(200) NOT NULL,
    idUsuario       INTEGER NOT NULL PRIMARY KEY REFERENCES USUARIO
);

CREATE TABLE ALUMNO (
    idAlumno            INTEGER PRIMARY KEY,
    nombreAlumno        VARCHAR(200) NOT NULL,
    apellidoAlumno      VARCHAR(200) NOT NULL,
    idUsuario           INTEGER NOT NULL REFERENCES USUARIO,
    idEstado            INTEGER NOT NULL REFERENCES ESTADO
);

CREATE TABLE DOCENTE (
    idDocente           INTEGER PRIMARY KEY,
    nombreDocente       VARCHAR(200) NOT NULL,
    apellidoDocente     VARCHAR(200) NOT NULL,
    idUsuario           INTEGER NOT NULL REFERENCES USUARIO,
    idEstado            INTEGER NOT NULL REFERENCES ESTADO
);

CREATE TABLE ASIGNATURA (
    idAsignatura        INTEGER PRIMARY KEY,
    codAsignatura       VARCHAR(200) NOT NULL,
    nombreAsignatura    VARCHAR(200) NOT NULL
);

CREATE TABLE SECCION (
    idSeccion           INTEGER PRIMARY KEY,
    codSeccion          VARCHAR(200) NOT NULL,
    idAsignatura        INTEGER NOT NULL REFERENCES ASIGNATURA,
    idDocente           INTEGER NOT NULL REFERENCES DOCENTE
);

CREATE TABLE clase (
    idclase             INTEGER PRIMARY KEY,
    diaclase            INTEGER NOT NULL,
    horainicioclase     INTEGER NOT NULL,
    horaterminoclase    INTEGER NOT NULL,
    idSeccion           INTEGER NOT NULL REFERENCES SECCION
);

CREATE TABLE SECCION_ALUMNO (
    idSeccionAlumno     INTEGER PRIMARY KEY,
    idSeccion           INTEGER NOT NULL REFERENCES SECCION,
    idAlumno            INTEGER NOT NULL REFERENCES ALUMNO
);

CREATE TABLE REGISTRO_CLASES (
    idRegclase          INTEGER PRIMARY KEY,
    fechaRegclase       INTEGER NOT NULL,
    idclase             INTEGER NOT NULL REFERENCES clase
);

CREATE TABLE REGISTRO_ASISTENCIA (
    idRegAsistencia     INTEGER PRIMARY KEY,
    estadoAsistencia    INTEGER NOT NULL,
    idRegclase          INTEGER NOT NULL REFERENCES REGISTRO_CLASES,
    idSeccionAlumno     INTEGER NOT NULL REFERENCES SECCION_ALUMNO
);

CREATE SEQUENCE seq_reg_asistencia START WITH 1000;


CREATE VIEW VIEW_REG_ASISTENCIA AS
SELECT
    idRegAsistencia,
    idRegclase,
    idSeccionAlumno,
    CASE
        WHEN estadoAsistencia=1 THEN 'Presente'
        ELSE 'Ausente'
    END AS estadoasis
FROM REGISTRO_ASISTENCIA;

CREATE VIEW VIEW_USUARIOS AS
SELECT
    u.idUsuario,
    u.mailUsuario,
    CASE
        WHEN a.idUsuario IS NOT NULL THEN 'Alumno'
        WHEN d.idUsuario IS NOT NULL THEN 'Docente'
        ELSE 'Ninguno'
    END AS rol
FROM usuario u
LEFT JOIN alumno a ON u.idUsuario = a.idUsuario
LEFT JOIN docente d ON u.idUsuario = d.idUsuario;

CREATE VIEW VIEW_FULL_USUARIOS AS
SELECT
    u.idUsuario,
    u.mailUsuario,
    CASE
        WHEN a.idUsuario IS NOT NULL THEN 'Alumno'
        WHEN d.idUsuario IS NOT NULL THEN 'Docente'
        ELSE 'Ninguno'
    END AS rol,
    CASE
        WHEN a.nombreAlumno IS NOT NULL THEN a.nombreAlumno
        WHEN d.nombreDocente IS NOT NULL THEN d.nombreDocente
        ELSE 'Ninguno'
    END AS nombre,
    CASE
        WHEN a.apellidoAlumno IS NOT NULL THEN a.apellidoAlumno
        WHEN d.apellidoDocente IS NOT NULL THEN d.apellidoDocente
        ELSE 'Ninguno'
    END AS apellido
FROM usuario u
LEFT JOIN alumno a ON u.idUsuario = a.idUsuario
LEFT JOIN docente d ON u.idUsuario = d.idUsuario;

create view view_full_seccion_alumno as
select
    idSeccionAlumno,
    nombrealumno||' '||apellidoalumno nombrealumno,
    mailusuario,
    idseccion
from seccion_alumno
inner join alumno using(idalumno)
inner join usuario using(idusuario);

create view view_profesor_full_seccion as
SELECT
    idseccion,
    codasignatura||'-'||codseccion asignatura,
    nombreasignatura,
    mailusuario
FROM seccion
inner join asignatura using(idasignatura)
inner join docente using(iddocente)
inner join usuario using(idusuario);

INSERT INTO "estado" ("idestado", "nombreestado") VALUES
(1,	'ACTIVO'),
(2,	'INACTIVO');

INSERT INTO "registro_clases" ("idregclase", "fecharegclase", "idclase") VALUES
('2', '1', '2'),
('3', '1', '3'),
('4', '1', '4'),
('5', '1', '5'),
('6', '1', '6'),
('7', '1', '7'),
('8', '1', '8'),
('9', '1', '9'),
('10', '1', '10'),
('11', '1', '11'),
('12', '1', '12');

INSERT INTO "usuario" ("idusuario", "mailusuario", "idestado") VALUES
(1, 'j.perez1@duocuc.cl', 1),
(2, 'j.perez2@duocuc.cl', 1),
(3, 'j.perez3@duocuc.cl', 1),
(4, 'j.perez4@duocuc.cl', 1),
(5, 'j.perez5@duocuc.cl', 1),
(6, 'j.perez6@duocuc.cl', 1),
(7, 'j.perez7@duocuc.cl', 1),
(8, 'j.perez8@duocuc.cl', 1),
(9, 'j.perez9@duocuc.cl', 1),
(10, 'j.perez10@duocuc.cl', 1),
(11, 'j.perez11@duocuc.cl', 1),
(12, 'j.perez12@duocuc.cl', 1),
(13, 'j.perez13@duocuc.cl', 1),
(14, 'j.perez14@duocuc.cl', 1),
(15, 'j.perez15@duocuc.cl', 1),
(16, 'j.perez16@duocuc.cl', 1),
(17, 'j.perez17@duocuc.cl', 1),
(18, 'j.perez18@duocuc.cl', 1),
(19, 'profe1@profesor.duoc.cl', 1),
(20, 'profe2@profesor.duoc.cl', 1),
(21, 'profe3@profesor.duoc.cl', 1),
(22, 'profe4@profesor.duoc.cl', 1);

INSERT INTO "pswd" ("passwd", "idusuario") VALUES
('clave123', 1),
('clave123', 2),
('clave123', 3),
('clave123', 4),
('clave123', 5),
('clave123', 6),
('clave123', 7),
('clave123', 8),
('clave123', 9),
('clave123', 10),
('clave123', 11),
('clave123', 12),
('clave123', 13),
('clave123', 14),
('clave123', 15),
('clave123', 16),
('clave123', 17),
('clave123', 18),
('clave123', 19),
('clave123', 20),
('clave123', 21),
('clave123', 22);

INSERT INTO "alumno" ("idalumno", "nombrealumno", "apellidoalumno", "idusuario", "idestado") VALUES
(1, 'Juan1', 'Perez1', 1, 1),
(2, 'Juan2', 'Perez2', 2, 1),
(3, 'Juan3', 'Perez3', 3, 1),
(4, 'Juan4', 'Perez4', 4, 1),
(5, 'Juan5', 'Perez5', 5, 1),
(6, 'Juan6', 'Perez6', 6, 1),
(7, 'Juan7', 'Perez7', 7, 1),
(8, 'Juan8', 'Perez8', 8, 1),
(9, 'Juan9', 'Perez9', 9, 1),
(10, 'Juan10', 'Perez10', 10, 1),
(11, 'Juan11', 'Perez11', 11, 1),
(12, 'Juan12', 'Perez12', 12, 1),
(13, 'Juan13', 'Perez13', 13, 1),
(14, 'Juan14', 'Perez14', 14, 1),
(15, 'Juan15', 'Perez15', 15, 1),
(16, 'Juan16', 'Perez16', 16, 1),
(17, 'Juan17', 'Perez17', 17, 1),
(18, 'Juan18', 'Perez18', 18, 1);

INSERT INTO "docente" ("iddocente", "nombredocente", "apellidodocente", "idusuario", "idestado") VALUES
(1, 'Profe1', 'Docente1', 19, 1),
(2, 'Profe2', 'Docente2', 20, 1),
(3, 'Profe3', 'Docente3', 21, 1),
(4, 'Profe4', 'Docente4', 22, 1);

INSERT INTO "asignatura" ("idasignatura", "codasignatura", "nombreasignatura") VALUES
(1,	'ASY4131', 'Arquitectura'),
(2,	'PGY4121', 'Programacion De Aplicaciones Moviles');

INSERT INTO "seccion" ("idseccion", "codseccion", "idasignatura", "iddocente") VALUES
(1,	'011V', 1, 1),
(2,	'011V', 2, 1),
(3,	'012V', 1, 1),
(4,	'012V', 2, 1),
(5,	'013V', 1, 2),
(6,	'013V', 2, 2),
(7,	'014V', 1, 3),
(8,	'014V', 2, 3),
(9,	'015V', 1, 4),
(10, '015V', 2, 4),
(11, '016V', 1, 4),
(12, '016V', 2, 4);

INSERT INTO "clase" ("idclase", "diaclase", "horainicioclase", "horaterminoclase", "idseccion") VALUES
(1, 1, 0830, 1050, 1),
(2, 1, 1100, 1350, 2),
(3, 2, 0830, 1050, 3),
(4, 2, 1100, 1350, 4),
(5, 1, 0830, 1050, 5),
(6, 1, 1100, 1350, 6),
(7, 3, 1000, 1250, 7),
(8, 3, 1400, 1650, 8),
(9, 4, 0830, 1050, 9),
(10, 4, 1100, 1350, 10),
(11, 5, 1100, 1350, 11),
(12, 5, 1630, 1830, 11);

INSERT INTO "seccion_alumno" ("idseccionalumno", "idseccion", "idalumno") VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 1),
(5, 2, 2),
(6, 2, 3),
(7, 3, 4),
(8, 3, 5),
(9, 3, 6),
(10, 4, 4),
(11, 4, 5),
(12, 4, 6),
(13, 5, 7),
(14, 5, 8),
(15, 5, 9),
(16, 6, 7),
(17, 6, 8),
(18, 6, 9),
(19, 7, 10),
(20, 7, 11),
(21, 7, 12),
(22, 8, 10),
(23, 8, 11),
(24, 8, 12),
(25, 9, 13),
(26, 9, 14),
(27, 9, 15),
(28, 10, 13),
(29, 10, 14),
(30, 10, 15),
(31, 11, 16),
(32, 11, 17),
(33, 11, 18),
(34, 12, 16),
(35, 12, 17),
(36, 12, 18);

