# appMovil API v0.2 Branch

Hola, esta branch incorpora el codigo necesario para iniciar el servicio de la API utilizado en el proyecto de registro de estudiantes para su asistencia. En esta branch, se encuentran archivos asociados al proyecto en Django, un archivo tipo docker-compose y un script para rellenar la base de datos utilizada por Django.

A continuacion se detallan los pasos a seguir para ejecutar la aplicacion en un entorno Linux.

# Aclaración
Este readme no es un tutorial de instalacion de paquetería necesaria para la ejecucion del proyecto. En caso de que tu sistema operativo no admita la instalación de los paquetes necesarios para el funcionamiento, no podremos ayudarte.

Eres libre de ejecutar el proyecto utilizando otras opciones de instalacion (por ejemplo instalando PostgreSQL15 directo en tu sistema), el proyecto no está configurado para ejecutarse en un entorno unico, por lo tanto diferentes combinaciones podrían llevar al mismo resultado.

# Instalacion de paquetes

Primero, es necesario instalar python 3.11 en tu sistema y docker-ce. Este readme, no es un tutorial por lo tanto puedes seguir los siguientes links para instalar lo necesario.

 - Python -> https://www.python.org/downloads/release/python-3116/
 - Docker -> https://docs.docker.com/engine/install/
 - Docker-Compose -> https://docs.docker.com/compose/install/standalone/

Luego de haber instalado las paqueterías necesarias, recomendamos ejecutar los siguientes comandos.

Verificacion Python

    $ python3 --version

Se espera una salida asociada a Python v.3.11

Verificacion Docker-CE

    $ docker --version

Se espera una salida asociada a Docker version > 20.xx

Verificacion Docker-Compose

    $ docker-compose --version

Se espera una salida asociada a Docker compose > 2.20.x

# Creacion de entorno de ejecucion

Una vez instalada la paquetería necesaria, en necesario crear un entorno virtual de python para ejecutar el proyecto.

Para realizar esto, se debe estar en la carpeta raiz del proyecto que contiene la API y ejecutar el siguiente comando.

    $ python -m venv venv

Posterior a ello, se debe iniciar el entorno virtual.

    $ source venv/bin/activate
Luego, se deben instalar las librerias necesarias para el proyecto.

    $ pip install -r requeriments.txt
Con la ejecución de estos pasos, se ha preparado para iniciar el proyecto en django, sin embargo, antes de continuar es necesario ejecutar el contenedor de PostgreSQL15 y ejecutar el script que contiene las configuraciones de la base de datos.

# Inicializacion de Base de Datos con Docker
Luego de haber preparado el entorno virtual para la ejeucion del proyecto, es necesario iniciar el contenedor para ejecutar el proyecto correctamente.

Para ello, se debe ingresar a la carpeta ./dockers contenida en la raiz del proyecto.

En esta ruta deberemos ejecutar el siguiente comando.

    $ docker-compose up -d
Con esto, se ejecutaran los contenedores especificados en el archivo docker-compose.yml que corresponden a PostgresSQL15 y a Adminer (utilizado para administrar la base de datos)

Por defecto, el contenedor de PostgreSQL15 está configurado con el usuario "postgres" y su contraseña "posql123", los cuales se pueden modificar desde el archivo docker-compose.yml.

Posterior a la ejecucion de los contenedores, se requiere ingresar a adminer (publicado en el puerto 48081 de la ip donde se ejecuta la api), loguearnos en la base de datos y ejecutar el script que está contenido en la carpeta raiz del proyecto y su nombre del archivo es "api_database.sql"

Aqui tienes la documentacion de Adminer para las labores que se deban ejecutar en esta aplicacion.
https://www.adminer.org/en/

Siguiendo estos pasos, habrás inicializado la base de datos para el proyecto.

# Ejecucion del proyecto Django.
Para ejecutar el proyecto, debes ingresar los siguiente comandos en la ruta raiz del proyecto, estos comandos se deben ejecutar dentro del entorno virtual.

    $ python manage.py migrate
    $ python manage.py makemigrations
Luego de ejecutar estos comandos, se debe iniciar el proyecto en django.

    $ python manage.py runserver 0.0.0.0:8080
Con esto se publicará el proyecto en el puerto 8080 de la ip donde estas trabajando.

 # Pruebas de funcionalidad de la API
 Esta api, funciona unicamente con peticiones POST, por lo tanto cada consulta debe utilizar este tipo de peticion. La validacion de funcionamiento la puedes ejecutar con el siguiente comando, desde el servidor donde ejecutaste el proyecto.

    $ curl -X POST "http://127.0.0.1:8080/api/clases -H 'Content-Type: application/json' -d '{"profesor": "profe1@profesor.duoc.cl"}'
Con ello deberás tener una salida similar a la siguiente imagen.

![Imagen de WhatsApp 2023-11-29 a las 19 45 13_0b6b2fd1](https://github.com/jubillaDuoc/appMovil/assets/127602430/33e7a018-c84a-4bd0-b3d6-e030630e1b80)

Otras funcionalidades

![Imagen de WhatsApp 2023-11-13 a las 05 47 20_e8d7c394](https://github.com/jubillaDuoc/appMovil/assets/127602430/5dd08d56-5d0f-4abe-b680-8b88a4241d73)

![Imagen de WhatsApp 2023-11-13 a las 05 48 37_1aa52c1b](https://github.com/jubillaDuoc/appMovil/assets/127602430/e8fddc3e-dd4d-47f3-886b-b66dc51ca666)

![Imagen de WhatsApp 2023-11-13 a las 05 49 04_285dedad](https://github.com/jubillaDuoc/appMovil/assets/127602430/ff0f42a4-d0f9-42e9-83a9-e6076d92ac7a)

![Imagen de WhatsApp 2023-11-13 a las 05 49 46_b6cfe600](https://github.com/jubillaDuoc/appMovil/assets/127602430/7ec78f0e-e79b-4490-8589-b63f8ff432a5)

![Imagen de WhatsApp 2023-11-13 a las 05 51 25_ab00030d](https://github.com/jubillaDuoc/appMovil/assets/127602430/9e8de09f-2ab5-4589-9743-8d72069eb594)

![Imagen de WhatsApp 2023-11-14 a las 00 56 26_efa0bcfb](https://github.com/jubillaDuoc/appMovil/assets/127602430/ff9e1706-4e66-4a48-8545-ad5412058f32)

![Imagen de WhatsApp 2023-11-13 a las 05 53 54_e2b8924e](https://github.com/jubillaDuoc/appMovil/assets/127602430/cf262c16-4377-4d74-bc6f-16e3d16bc0dc)





