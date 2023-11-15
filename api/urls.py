from django.urls import path
from . import views

urlpatterns = [
    path('login',views.login,name='login'),
    path('logout',views.logout,name='logout'),
    path('checksesion',views.checksesion,name='checksesion'),
    path('clases',views.clases,name='clases'),
    path('clases1',views.clases1,name='clases1'),
    path('asistencia',views.asistencia,name='asistencia'),
    path('asisalumno',views.asisalumno,name='asisalumno'),
    path('seccionalumno',views.seccionalumno,name='seccionalumno'),
    path('createasistencia',views.createasistencia,name='createasistencia'),
]