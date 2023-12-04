from django.shortcuts import render
from .DBConnection import DBConnection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
import hashlib, json

# Create your views here.

connection = DBConnection()

@csrf_exempt
def login(request):
    
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            usuario = data.get('username')
            contrasena = data.get('password')
            print(data)

            if not usuario or not contrasena:
                print("except 1")
                return JsonResponse({'data': 'no_data'}, safe=False)
            iduser = 0
            checklogin = 0
            connection.connect()
            loginFields = [
                'idusuario',
                'rol',
                '1 as check'
            ]
            query = "SELECT " + ", ".join(loginFields) + f" FROM view_usuarios inner join pswd using(idusuario) where mailusuario=%s and passwd=%s;"
            queryargs = (usuario,contrasena,)
            runsql = connection.execute_query(query, queryargs)
            print(f"query: {runsql}")
            connection.disconnect()
            
            if runsql:
                checklogin = runsql[0][2]
            else:
                json_data = [
                {
                    'data': 'no_data'
                }
                ]
                print("except 2")
                return JsonResponse(json_data, safe=False)
            
            if checklogin == 1:
                #Captura de datos
                iduser = runsql[0][0]
                rol = runsql[0][1]
                
                #GENERACION DE TOKEN DE SESION
                current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
                stringtoken = f"{current_datetime},{iduser},{usuario}"
        
                # Aplica una función hash a la cadena para obtener un token único
                token = hashlib.sha256(stringtoken.encode()).hexdigest()
                
                connection.connect()
                query = f"select max(idsesion) from sesion;"
                runsql = connection.execute_query(query)
                print(runsql)
                connection.disconnect()
                
                idsesion = runsql[0][0]
                idsesion = idsesion +1
                
                connection.connect()
                query = f"INSERT INTO sesion(idsesion, tokensesion, idusuario, idestado) VALUES ('{idsesion}', '{token}', '{iduser}', 1);"
                runsql = connection.execute_mods(query)
                connection.disconnect()
                
                connection.connect()
                query = f"select nombre, apellido from view_full_usuarios where idusuario={iduser};"
                runsql = connection.execute_query(query)
                print(runsql)
                connection.disconnect()
                
                nombre = runsql[0][0]
                apellido = runsql[0][1]
                
                json_data = [
                    {
                        'username': usuario,
                        'nombre': nombre,
                        'apellido': apellido,
                        'token': token,
                        'rol': rol
                    }
                ]
                return JsonResponse(json_data, safe=False)
            else:
                print("except 3")
                json_data = [
                {
                    'data': 'no_data'
                }
                ]
                return JsonResponse(json_data, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        print("except 4")
        json_data = [
            {
                'data': 'no_data'
            }
        ]
        return JsonResponse(json_data, safe=False)

@csrf_exempt
def logout(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            token = data.get('token')

            if not token:
                return JsonResponse({'data': 'no_data'}, safe=False)

            connection.connect()
            query = f"UPDATE sesion SET idestado = 2 WHERE tokensesion = '{token}';"
            runsql = connection.execute_mods(query)
            connection.disconnect()

            return JsonResponse({'token': token, 'logout': 'ok'}, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'data': 'no_data'}, safe=False)

@csrf_exempt
def checksesion(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            tokenid = data.get('token')
            if tokenid:
                estado1 = "null"
                connection.connect()
                query = f"SELECT nombreestado FROM sesion inner join estado using(idestado) where tokensesion=%s;"
                queryargs = (tokenid,)
                runsql = connection.execute_query(query, queryargs)
                print(query)
                print(queryargs)
                print (runsql)
                connection.disconnect()
                estado1 = runsql[0][0]
                json_data = [
                {
                    'token': tokenid,
                    'estado': estado1
                }
                ]
                return JsonResponse(json_data, safe=False)
            else:
                return JsonResponse({'data': 'no_data'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        json_data = [
            {
                'data': 'no_data'
            }
        ]
        return JsonResponse(json_data, safe=False)

@csrf_exempt
def clases(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            userProf = data.get('profesor')
            if userProf:
                fields = [
                    "idseccion",
                    "asignatura",
                    "nombreasignatura"
                ]
                
                connection.connect()
                query = "SELECT " + ", ".join(fields) + f" FROM view_profesor_full_seccion where mailusuario=%s;"
                queryargs = (userProf,)
                runsql = connection.execute_query(query, queryargs)
                print(query)
                print(queryargs)
                print (runsql)
                connection.disconnect()
                
                json_data = []
                for row in runsql:
                    result = {}
                    for i, campo in enumerate(fields):
                        result[campo] = row[i]
                    json_data.append(result)
                return JsonResponse(json_data, safe=False)
            else:
                return JsonResponse({'data': 'no_data'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        json_data = [
            {
                'data': 'no_data'
            }
        ]
        return JsonResponse(json_data, safe=False)

@csrf_exempt
def clases1(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            userProf = data.get('profesor')
            if userProf:
                connection.connect()
                query = f"SELECT codasignatura||'-'||codseccion asignatura, nombreasignatura FROM seccion inner join asignatura using(idasignatura) inner join docente using(iddocente) inner join usuario using(idusuario) where mailusuario=%s;"
                queryargs = (userProf,)
                runsql = connection.execute_query(query, queryargs)
                print(query)
                print(queryargs)
                print (runsql)
                connection.disconnect()
                
                fields = [
                    "asignatura",
                    "nombreasignatura"
                ]
                
                json_data = []
                for row in runsql:
                    result = {}
                    for i, campo in enumerate(fields):
                        result[campo] = row[i]
                    json_data.append(result)
                return JsonResponse(json_data, safe=False)
            else:
                return JsonResponse({'data': 'no_data'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        json_data = [
            {
                'data': 'no_data'
            }
        ]
        return JsonResponse(json_data, safe=False)

@csrf_exempt
def asistencia(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            idseccion = data.get('idseccion')
            if idseccion:
                fields = [
                    "idSeccionAlumno",
                    "estadoasis"
                ]
                
                connection.connect()
                query = "SELECT " + ", ".join(fields) + f" FROM VIEW_REG_ASISTENCIA where idRegclase=%s;"
                queryargs = (idseccion,)
                runsql = connection.execute_query(query, queryargs)
                print(query)
                print(queryargs)
                print (runsql)
                connection.disconnect()
                
                json_data = []
                for row in runsql:
                    result = {}
                    for i, campo in enumerate(fields):
                        result[campo] = row[i]
                    json_data.append(result)
                return JsonResponse(json_data, safe=False)
            else:
                return JsonResponse({'data': 'no_data'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        json_data = [
            {
                'data': 'no_data'
            }
        ]
        return JsonResponse(json_data, safe=False)

@csrf_exempt
def asisalumno(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            mailusuario = data.get('mailusuario')
            idseccion = data.get('idseccion')

            if not idseccion or not mailusuario:
                return JsonResponse({'data': 'no_data'}, safe=False)

            fields = [
                "idSeccionAlumno"
            ]
            
            connection.connect()
            query = "SELECT " + ", ".join(fields) + f" FROM SECCION_ALUMNO inner join alumno using(idalumno) left join usuario using(idusuario) where mailusuario=%s AND idseccion=%s;"
            queryargs = (mailusuario,idseccion,)
            runsql = connection.execute_query(query, queryargs)
            connection.disconnect()
            
            if not runsql:
                return JsonResponse({'data': 'no_data'}, safe=False)
            
            idSeccionAlumno = runsql[0][0]
            
            connection.connect()
            query = f"UPDATE REGISTRO_ASISTENCIA SET estadoAsistencia = 1 WHERE idSeccionAlumno = %s;"
            queryargs = (idSeccionAlumno,)
            runsql = connection.execute_mods(query, queryargs)
            
            connection.disconnect()

            return JsonResponse({'idSeccionAlumno': idSeccionAlumno, 'cambio': 'ok'}, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'data': 'no_data'}, safe=False)

@csrf_exempt
def seccionalumno(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            idseccion = data.get('idseccion')
            if idseccion:
                fields = [
                    "idSeccionAlumno",
                    "nombrealumno",
                    "mailusuario"
                ]
                
                connection.connect()
                query = "SELECT " + ", ".join(fields) + f" FROM view_full_seccion_alumno where idseccion=%s;"
                queryargs = (idseccion,)
                runsql = connection.execute_query(query, queryargs)
                print(query)
                print(queryargs)
                print (runsql)
                connection.disconnect()
                
                json_data = []
                for row in runsql:
                    result = {}
                    for i, campo in enumerate(fields):
                        result[campo] = row[i]
                    json_data.append(result)
                return JsonResponse(json_data, safe=False)
            else:
                return JsonResponse({'data': 'no_data'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        json_data = [
            {
                'data': 'no_data'
            }
        ]
        return JsonResponse(json_data, safe=False)

@csrf_exempt
def createasistencia(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            idseccion = data.get('idseccion')
            if idseccion:
                
                connection.connect()
                query = f"INSERT INTO REGISTRO_ASISTENCIA (idRegAsistencia, estadoAsistencia, idRegclase, idSeccionAlumno) SELECT idSeccionAlumno, 2, idseccion, idSeccionAlumno FROM seccion_alumno WHERE idseccion = %s ON CONFLICT (idRegAsistencia) DO UPDATE SET estadoAsistencia = EXCLUDED.estadoAsistencia, idRegclase = EXCLUDED.idRegclase, idSeccionAlumno = EXCLUDED.idSeccionAlumno;"
                queryargs = (idseccion,)
                runsql = connection.execute_mods(query, queryargs)
                connection.disconnect()
                
                json_data = [
                    {
                        "idseccion": idseccion
                    }
                ]
                return JsonResponse(json_data, safe=False)
            else:
                return JsonResponse({'data': 'no_data'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        json_data = [
            {
                'data': 'no_data'
            }
        ]
        return JsonResponse(json_data, safe=False)