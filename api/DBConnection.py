import psycopg2

class DBConnection:
    def __init__(self):
        self.host = '127.0.0.1'
        self.port = 5432
        self.database = 'regapp'
        self.user = 'postgres'
        self.password = 'posql123'
        self.connection = None
        self.cursor = None
        

    def connect(self):
        try:
            self.connection = psycopg2.connect(
                host=self.host,
                port=self.port,
                database=self.database,
                user=self.user,
                password=self.password
            )
            self.cursor = self.connection.cursor()
            print("Conexión exitosa a la base de datos.")
        except (Exception, psycopg2.Error) as error:
            print("Error al conectar a la base de datos:", error)

    def disconnect(self):
        if self.connection:
            self.cursor.close()
            self.connection.close()
            print("Conexión cerrada.")

    def execute_query(self, query, params=None):
        try:
            print(f"Consulta: {query} | {params}")
            self.cursor.execute(query, params)
            result = self.cursor.fetchall()
            self.connection.commit()
            return result
        except (Exception, psycopg2.Error) as error:
            print("Error al ejecutar la consulta:", error)
            
    def execute_mods(self, query, params=None):
        try:
            self.cursor.execute(query, params)
            self.connection.commit()
            return True
        except (Exception, psycopg2.Error) as error:
            print("Error al ejecutar la consulta:", error)
            return False

# Ejemplo de uso
#connection = DBConnection()

#connection.connect()

# Ejecutar una consulta SELECT
#query = "SELECT * FROM nombre_tabla;"
#result = connection.execute_query(query)
#print(result)

# Ejecutar una consulta INSERT
#insert_query = "INSERT INTO nombre_tabla (columna1, columna2) VALUES (valor1, valor2);"
#connection.execute_query(insert_query)

#connection.disconnect()
